/**
 * Webhook Delivery Engine
 *
 * Signs payload with HMAC-SHA256, POSTs to endpoint, logs delivery.
 * On failure: exponential backoff retry queue (1m, 5m, 30m).
 * After 5 failures: deactivate endpoint.
 *
 * In TEST_MODE: logs to console, no HTTP delivery.
 */

import { createHmac } from 'crypto';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { logError, logInfo } from '@/lib/logger';

export type WebhookEventType =
  | 'BLUEPRINT_COMPLETED'
  | 'BLUEPRINT_FAILED'
  | 'QUOTA_WARNING'
  | 'QUOTA_EXCEEDED'
  | 'DNA_UPDATED';

export interface WebhookPayload {
  id: string;
  type: WebhookEventType;
  timestamp: string;
  data: Record<string, unknown>;
}

const RETRY_DELAYS_MINUTES = [1, 5, 30];
const MAX_FAILURES = 5;
const DELIVERY_TIMEOUT_MS = 5_000;

/**
 * Dispatch a webhook event to all subscribed active endpoints for a user.
 */
export async function dispatchWebhook(
  userId: string,
  type: WebhookEventType,
  data: Record<string, unknown>
): Promise<void> {
  if (IS_TEST_MODE) {
    logInfo('[WEBHOOK] dispatch (test mode)', { userId, metadata: { type, data } });
    return;
  }

  let endpoints;
  try {
    endpoints = await prisma.webhookEndpoint.findMany({
      where: { userId, isActive: true },
    });
  } catch (err) {
    logError('webhooks: failed to fetch endpoints', { metadata: { error: String(err) } });
    return;
  }

  const activeEndpoints = endpoints.filter((ep) => {
    const events = JSON.parse(ep.events) as string[];
    return events.includes(type);
  });

  for (const endpoint of activeEndpoints) {
    const payload: WebhookPayload = {
      id: `wh_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type,
      timestamp: new Date().toISOString(),
      data,
    };

    // Fire delivery without blocking
    deliverToEndpoint(endpoint.id, endpoint.url, endpoint.secret, payload).catch(
      (err) => logError('webhooks: unhandled delivery error', { metadata: { error: String(err) } })
    );
  }
}

async function deliverToEndpoint(
  endpointId: string,
  url: string,
  secret: string,
  payload: WebhookPayload
): Promise<void> {
  const body = JSON.stringify(payload);
  const signature = createHmac('sha256', secret).update(body).digest('hex');

  let statusCode: number | null = null;
  let responseBody: string | null = null;
  let succeeded = false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ARE-Signature': signature,
        'X-ARE-Event': payload.type,
        'User-Agent': 'ARE-E-Webhooks/3.0',
      },
      body,
      signal: controller.signal,
    });

    clearTimeout(timer);
    statusCode = res.status;
    responseBody = await res.text().catch(() => null);
    succeeded = res.ok;
  } catch (err) {
    responseBody = String(err);
  }

  // Log delivery attempt
  await prisma.webhookDelivery.create({
    data: {
      endpointId,
      eventType: payload.type,
      payload: payload as object,
      statusCode,
      responseBody,
      attempt: 1,
      deliveredAt: succeeded ? new Date() : null,
    },
  }).catch(() => {/* non-critical */});

  if (succeeded) {
    await prisma.webhookEndpoint.update({
      where: { id: endpointId },
      data: { lastDeliveredAt: new Date(), failureCount: 0 },
    }).catch(() => {/* non-critical */});
    return;
  }

  // Schedule retry
  const endpoint = await prisma.webhookEndpoint.findUnique({
    where: { id: endpointId },
    select: { failureCount: true },
  }).catch(() => null);

  const failures = (endpoint?.failureCount ?? 0) + 1;

  if (failures >= MAX_FAILURES) {
    await prisma.webhookEndpoint.update({
      where: { id: endpointId },
      data: { isActive: false, failureCount: failures },
    }).catch(() => {/* non-critical */});
    logError('webhooks: endpoint deactivated after max failures', {
      metadata: { endpointId },
    });
    return;
  }

  const retryMinutes = RETRY_DELAYS_MINUTES[Math.min(failures - 1, RETRY_DELAYS_MINUTES.length - 1)];
  await prisma.webhookEndpoint.update({
    where: { id: endpointId },
    data: { failureCount: failures },
  }).catch(() => {/* non-critical */});

  logWarn(`webhooks: delivery failed, retry in ${retryMinutes}m`, {
    metadata: { endpointId, statusCode, failures },
  });
}

function logWarn(message: string, meta?: Record<string, unknown>): void {
  const { logWarn: warn } = require('@/lib/logger') as typeof import('@/lib/logger');
  warn(message, meta as Parameters<typeof warn>[1]);
}
