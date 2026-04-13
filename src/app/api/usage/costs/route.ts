/**
 * GET /api/usage/costs — per-generation AI cost breakdown
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MOCK_USAGE } from '@/lib/mocks/mock-usage';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return NextResponse.json({ data: MOCK_USAGE.costBreakdown });

  const blueprints = await prisma.blueprint.findMany({
    where: { userId: authCtx.userId, status: 'COMPLETE' },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true, title: true, modelUsed: true,
      inputTokens: true, outputTokens: true, cachedTokens: true,
      totalCostUsd: true, createdAt: true, grade: true,
    },
  });

  const total = blueprints.reduce((sum, b) => sum + b.totalCostUsd, 0);

  return NextResponse.json({
    data: blueprints.map((b) => ({
      blueprintId:  b.id,
      title:        b.title,
      modelUsed:    b.modelUsed,
      inputTokens:  b.inputTokens,
      outputTokens: b.outputTokens,
      cachedTokens: b.cachedTokens,
      costUsd:      b.totalCostUsd,
      grade:        b.grade,
      date:         b.createdAt.toISOString(),
    })),
    totalCostUsd: Math.round(total * 10_000) / 10_000,
  });
}
