/**
 * PUT    /api/webhooks/:id — update endpoint
 * DELETE /api/webhooks/:id — delete endpoint
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { UpdateWebhookSchema } from '@/lib/schemas/api';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { id: string } };

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = UpdateWebhookSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  if (IS_TEST_MODE) return NextResponse.json({ id: params.id, ...parsed.data });

  const existing = await prisma.webhookEndpoint.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('Webhook endpoint');

  const updated = await prisma.webhookEndpoint.update({
    where: { id: params.id },
    data: {
      ...(parsed.data.url      ? { url: parsed.data.url }                           : {}),
      ...(parsed.data.events   ? { events: JSON.stringify(parsed.data.events) }     : {}),
      ...(parsed.data.isActive !== undefined ? { isActive: parsed.data.isActive }   : {}),
    },
  });

  void auditLog(authCtx.userId, 'webhook.updated', request, { endpointId: params.id });
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return new NextResponse(null, { status: 204 });

  const existing = await prisma.webhookEndpoint.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('Webhook endpoint');

  await prisma.webhookEndpoint.delete({ where: { id: params.id } });
  void auditLog(authCtx.userId, 'webhook.deleted', request, { endpointId: params.id });
  return new NextResponse(null, { status: 204 });
}
