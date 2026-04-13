/**
 * GET /api/blueprints — paginated, filterable blueprint list
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { checkRateLimit } from '@/lib/api/rate-limit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MOCK_BLUEPRINTS } from '@/lib/mocks/mock-blueprint';
import { ListBlueprintsQuerySchema } from '@/lib/schemas/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  const rl = await checkRateLimit(authCtx.userId, authCtx.plan, 'blueprints');
  if (!rl.allowed) return ERR.rateLimited();

  const { searchParams } = new URL(request.url);
  const parsed = ListBlueprintsQuerySchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { page, limit, grade, dnaProfileId, sortBy, sortOrder } = parsed.data;

  if (IS_TEST_MODE) {
    const filtered = grade
      ? MOCK_BLUEPRINTS.filter((b) => b.qualityReport.grade === grade)
      : MOCK_BLUEPRINTS;

    return NextResponse.json({
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      hasMore: page * limit < filtered.length,
    });
  }

  const where = {
    userId: authCtx.userId,
    deletedAt: null as null,
    ...(grade ? { grade } : {}),
    ...(dnaProfileId ? { dnaProfileId } : {}),
  };

  const [blueprints, total] = await Promise.all([
    prisma.blueprint.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true, title: true, userPrompt: true, grade: true,
        status: true, modelUsed: true, totalCostUsd: true,
        createdAt: true, updatedAt: true, rating: true,
        dnaProfileId: true, regenerationCount: true,
      },
    }),
    prisma.blueprint.count({ where }),
  ]);

  return NextResponse.json({
    data: blueprints,
    total,
    page,
    limit,
    hasMore: page * limit < total,
  });
}
