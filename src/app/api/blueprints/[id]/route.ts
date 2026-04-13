/**
 * GET    /api/blueprints/:id — full blueprint with quality report
 * PATCH  /api/blueprints/:id — update rating/feedback
 * DELETE /api/blueprints/:id — soft delete
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MOCK_BLUEPRINT_1 } from '@/lib/mocks/mock-blueprint';
import { UpdateBlueprintSchema } from '@/lib/schemas/api';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(_request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return NextResponse.json(MOCK_BLUEPRINT_1);

  const blueprint = await prisma.blueprint.findFirst({
    where: { id: params.id, userId: authCtx.userId },
    include: {
      dnaProfile: { select: { id: true, name: true, version: true } },
      children: { select: { id: true, version: true, grade: true, createdAt: true } },
      parent:   { select: { id: true, version: true, grade: true, createdAt: true } },
    },
  });

  if (!blueprint) return ERR.notFound('Blueprint');
  return NextResponse.json(blueprint);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = UpdateBlueprintSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  if (IS_TEST_MODE) {
    return NextResponse.json({ ...MOCK_BLUEPRINT_1, ...parsed.data });
  }

  const existing = await prisma.blueprint.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('Blueprint');

  const updated = await prisma.blueprint.update({
    where: { id: params.id },
    data: parsed.data,
  });

  void auditLog(authCtx.userId, 'blueprint.updated', request, { blueprintId: params.id });
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return new NextResponse(null, { status: 204 });

  const existing = await prisma.blueprint.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('Blueprint');

  // Soft delete
  await prisma.blueprint.update({
    where: { id: params.id },
    data: { status: 'FAILED' }, // repurpose FAILED as deleted marker
  });

  void auditLog(authCtx.userId, 'blueprint.deleted', request, { blueprintId: params.id });
  return new NextResponse(null, { status: 204 });
}
