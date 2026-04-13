/**
 * DELETE /api/api-keys/:id — revoke API key
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { id: string } };

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return new NextResponse(null, { status: 204 });

  const existing = await prisma.apiKey.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('API key');

  await prisma.apiKey.update({
    where: { id: params.id },
    data: { isActive: false },
  });

  void auditLog(authCtx.userId, 'api_key.revoked', request, { keyId: params.id });
  return new NextResponse(null, { status: 204 });
}
