/**
 * GET /api/webhooks/:id/deliveries — list recent delivery attempts
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { id: string } };

export async function GET(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return NextResponse.json({ data: [] });

  // Verify ownership
  const endpoint = await prisma.webhookEndpoint.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!endpoint) return ERR.notFound('Webhook endpoint');

  const deliveries = await prisma.webhookDelivery.findMany({
    where: { endpointId: params.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true, eventType: true, statusCode: true,
      attempt: true, deliveredAt: true, createdAt: true,
    },
  });

  return NextResponse.json({ data: deliveries });
}
