/**
 * POST /api/billing/checkout — create Stripe Checkout session
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { auditLog } from '@/lib/api/audit';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { CheckoutSessionSchema } from '@/lib/schemas/api';
import { PLAN_LIMITS } from '@/lib/constants/plans';
import type { PlanName } from '@/lib/constants/plans';
import { logError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

// Map plan names to Stripe price IDs (configure in Stripe dashboard + env)
const PLAN_PRICE_IDS: Record<Exclude<PlanName, 'FREE'>, string> = {
  PRO:        process.env.STRIPE_PRICE_PRO        ?? 'price_pro_monthly',
  STUDIO:     process.env.STRIPE_PRICE_STUDIO     ?? 'price_studio_monthly',
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE ?? 'price_enterprise_monthly',
};

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = CheckoutSessionSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { plan } = parsed.data;

  if (IS_TEST_MODE) {
    return NextResponse.json({ url: `https://checkout.stripe.com/mock-session-${plan.toLowerCase()}` });
  }

  const user = await prisma.user.findUnique({
    where: { id: authCtx.userId },
    select: { email: true, stripeCustomerId: true },
  });

  if (!user) return ERR.notFound('User');

  const trialDays = PLAN_LIMITS[plan as PlanName].trialDays;

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: authCtx.userId },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: authCtx.userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: PLAN_PRICE_IDS[plan], quantity: 1 }],
      subscription_data: trialDays > 0 ? { trial_period_days: trialDays } : undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/studio/billing?success=1`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=1`,
      tax_id_collection: { enabled: true },
      automatic_tax:     { enabled: true },
    });

    void auditLog(authCtx.userId, 'billing.checkout_started', request, { plan });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    logError('billing: checkout session error', { userId: authCtx.userId, metadata: { error: String(err) } });
    return ERR.serverError('Failed to create checkout session');
  }
}
