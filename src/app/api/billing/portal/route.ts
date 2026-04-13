/**
 * GET /api/billing/portal — get Stripe Customer Portal URL
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { logError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) {
    return NextResponse.json({ url: 'https://billing.stripe.com/p/mock-portal-session' });
  }

  const user = await prisma.user.findUnique({
    where: { id: authCtx.userId },
    select: { stripeCustomerId: true },
  });

  if (!user?.stripeCustomerId) {
    return ERR.badRequest('No active subscription found. Subscribe to a plan first.');
  }

  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/studio/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    logError('billing: portal session error', { userId: authCtx.userId, metadata: { error: String(err) } });
    return ERR.serverError('Failed to create billing portal session');
  }
}
