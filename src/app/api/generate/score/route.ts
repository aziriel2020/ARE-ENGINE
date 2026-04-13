/**
 * POST /api/generate/score
 * Manually trigger quality scoring on an existing blueprint.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { auditLog } from '@/lib/api/audit';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { scoreBlueprint } from '@/lib/engine/quality-scorer';
import { MOCK_BLUEPRINT_1 } from '@/lib/mocks/mock-blueprint';
import { MOCK_DNA_JCAY } from '@/lib/mocks/mock-dna';
import { ScoreRequestSchema } from '@/lib/schemas/api';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = ScoreRequestSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { blueprintId } = parsed.data;

  if (IS_TEST_MODE) {
    return NextResponse.json(MOCK_BLUEPRINT_1.qualityReport);
  }

  const blueprint = await prisma.blueprint.findFirst({
    where: { id: blueprintId, userId: authCtx.userId },
    include: { dnaProfile: true },
  });

  if (!blueprint) return ERR.notFound('Blueprint');

  const dna = blueprint.dnaProfile
    ? (JSON.parse(JSON.stringify(blueprint.dnaProfile.dna)) as typeof MOCK_DNA_JCAY)
    : MOCK_DNA_JCAY;

  const report = await scoreBlueprint(blueprintId, blueprint.content, dna);

  await prisma.blueprint.update({
    where: { id: blueprintId },
    data: { qualityReport: report as object, grade: report.grade, status: 'COMPLETE' },
  });

  void auditLog(authCtx.userId, 'blueprint.scored', request, { blueprintId, grade: report.grade });

  return NextResponse.json(report);
}
