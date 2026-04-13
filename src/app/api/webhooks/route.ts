/**
 * GET  /api/webhooks — list webhook endpoints
 * POST /api/webhooks — register new endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { requireFeature } from '@/lib/api/plan-gate';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { CreateWebhookSchema } from '@/lib/schemas/api';
import { nanoid } from 'nanoid';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return NextResponse.json({ data: [] });

  const endpoints = await prisma.webhookEndpoint.findMany({
    where: { userId: authCtx.userId },
    select: {
      id: true, url: true, events: true, isActive: true,
      failureCount: true, lastDeliveredAt: true, createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: endpoints });
}

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  const featureErr = requireFeature(authCtx.plan, 'webhooks');
  if (featureErr) return ERR.planLimit(featureErr);

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = CreateWebhookSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  if (IS_TEST_MODE) {
    return NextResponse.json({
      id: 'wh_mock_001', url: parsed.data.url,
      events: parsed.data.events, secret: 'whsec_mock', isActive: true,
    }, { status: 201 });
  }

  const secret = `whsec_${nanoid(32)}`;

  const endpoint = await prisma.webhookEndpoint.create({
    data: {
      userId: authCtx.userId,
      url: parsed.data.url,
      events: JSON.stringify(parsed.data.events),
      secret,
    },
  });

  void auditLog(authCtx.userId, 'webhook.created', request, { endpointId: endpoint.id });

  // Return the secret ONCE — it can only be shown at creation
  return NextResponse.json({ ...endpoint, secret }, { status: 201 });
}
