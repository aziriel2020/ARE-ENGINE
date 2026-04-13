/**
 * POST /api/webhooks/stripe — Stripe webhook handler
 * NO Clerk auth — uses Stripe signature verification.
 */

import { NextRequest, NextResponse } from 'next/server';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { logError, logInfo } from '@/lib/logger';
import type { Plan } from '@prisma/client';

export const dynamic = 'force-dynamic';

const STRIPE_PLAN_MAP: Record<string, Plan> = {
  // Map Stripe price IDs to plan names. Configure in Stripe dashboard.
  price_pro_monthly:        'PRO',
  price_studio_monthly:     'STUDIO',
  price_enterprise_monthly: 'ENTERPRISE',
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig  = request.headers.get('stripe-signature') ?? '';

  if (IS_TEST_MODE) {
    logInfo('stripe-webhook: test mode, skipping signature check');
    return NextResponse.json({ received: true });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    logError('stripe-webhook: STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    const stripe = (await import('stripe')).default;
    const client = new stripe(process.env.STRIPE_SECRET_KEY!);
    event = client.webhooks.constructEvent(body, sig, webhookSecret) as unknown as typeof event;
  } catch (err) {
    logError('stripe-webhook: signature verification failed', {
      metadata: { error: String(err) },
    });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    await handleStripeEvent(event.type, event.data.object);
  } catch (err) {
    logError('stripe-webhook: handler error', {
      metadata: { type: event.type, error: String(err) },
    });
    // Return 200 so Stripe doesn't retry
  }

  return NextResponse.json({ received: true });
}

async function handleStripeEvent(
  type: string,
  obj: Record<string, unknown>
): Promise<void> {
  switch (type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const customerId  = obj['customer'] as string;
      const status      = obj['status'] as string;
      const items       = (obj['items'] as { data: { price: { id: string } }[] })?.data ?? [];
      const priceId     = items[0]?.price?.id ?? '';
      const plan: Plan  = STRIPE_PLAN_MAP[priceId] ?? 'FREE';

      if (status === 'active' || status === 'trialing') {
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { plan, stripeSubscriptionId: obj['id'] as string },
        });
        logInfo('stripe-webhook: subscription updated', { metadata: { customerId, plan } });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const customerId = obj['customer'] as string;
      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { plan: 'FREE', stripeSubscriptionId: null },
      });
      logInfo('stripe-webhook: subscription cancelled', { metadata: { customerId } });
      break;
    }

    case 'invoice.payment_failed': {
      const customerId = obj['customer_email'] as string;
      logError('stripe-webhook: payment failed', { metadata: { customerId } });
      break;
    }

    default:
      logInfo(`stripe-webhook: unhandled event ${type}`);
  }
}
