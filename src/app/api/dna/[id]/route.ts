/**
 * GET    /api/dna/:id — get DNA profile
 * PUT    /api/dna/:id — update (creates new version)
 * DELETE /api/dna/:id — delete profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/api/auth';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MOCK_DNA_JCAY } from '@/lib/mocks/mock-dna';
import { VocalDNASchema } from '@/lib/schemas/vocal-dna';
import { invalidateCacheEntry } from '@/lib/engine/context-cache';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(_request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return NextResponse.json({ id: params.id, name: 'JCAY', dna: MOCK_DNA_JCAY, version: 1 });

  const profile = await prisma.vocalDNAProfile.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!profile) return ERR.notFound('DNA profile');
  return NextResponse.json(profile);
}

const UpdateDNASchema = z.object({
  name:      z.string().min(1).max(100).optional(),
  dna:       VocalDNASchema.partial().optional(),
  isDefault: z.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = UpdateDNASchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  if (IS_TEST_MODE) {
    return NextResponse.json({ id: params.id, name: parsed.data.name ?? 'JCAY', version: 2 });
  }

  const existing = await prisma.vocalDNAProfile.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('DNA profile');

  // Updates create a new version (immutable history)
  const newVersion = existing.version + 1;
  const mergedDna = parsed.data.dna
    ? { ...(existing.dna as object), ...parsed.data.dna }
    : existing.dna;

  if (parsed.data.isDefault) {
    await prisma.vocalDNAProfile.updateMany({
      where: { userId: authCtx.userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  const newProfile = await prisma.vocalDNAProfile.create({
    data: {
      userId: authCtx.userId,
      name: parsed.data.name ?? existing.name,
      version: newVersion,
      dna: mergedDna as object,
      isDefault: parsed.data.isDefault ?? existing.isDefault,
    },
  });

  // Invalidate context cache — DNA changed
  invalidateCacheEntry(authCtx.userId, params.id);

  void auditLog(authCtx.userId, 'dna.updated', request, { profileId: params.id, newVersion });
  return NextResponse.json(newProfile);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return new NextResponse(null, { status: 204 });

  const existing = await prisma.vocalDNAProfile.findFirst({
    where: { id: params.id, userId: authCtx.userId },
  });
  if (!existing) return ERR.notFound('DNA profile');

  await prisma.vocalDNAProfile.delete({ where: { id: params.id } });
  invalidateCacheEntry(authCtx.userId, params.id);

  void auditLog(authCtx.userId, 'dna.deleted', request, { profileId: params.id });
  return new NextResponse(null, { status: 204 });
}
