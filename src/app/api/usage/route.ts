/**
 * GET /api/usage — current month usage + limits
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MOCK_USAGE } from '@/lib/mocks/mock-usage';
import { PLAN_LIMITS } from '@/lib/constants/plans';
import type { PlanName } from '@/lib/constants/plans';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) return NextResponse.json(MOCK_USAGE.current);

  const period = getCurrentPeriod();
  const limits = PLAN_LIMITS[authCtx.plan as PlanName];

  const usage = await prisma.usageRecord.findUnique({
    where: { userId_period: { userId: authCtx.userId, period } },
  });

  return NextResponse.json({
    period,
    plan: authCtx.plan,
    generationsUsed: usage?.generationsUsed ?? 0,
    generationsLimit: limits.generationsPerMonth,
    tokensConsumed: usage?.tokensConsumed ?? 0,
    costUsd: usage?.costUsd ?? 0,
    limits,
  });
}

function getCurrentPeriod(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
