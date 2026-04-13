/**
 * GET /api/admin/stats — platform-wide stats (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAdmin(request);
  if (!authCtx) return ERR.forbidden();

  if (IS_TEST_MODE) {
    return NextResponse.json({
      totalUsers: 42, activeUsers: 18, payingUsers: 12,
      mrr: 15_969_00,  // cents
      totalGenerationsThisMonth: 384,
      avgQualityGrade: 'B',
      aiCostThisMonth: 38.42,
      margin: 0.94,
    });
  }

  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86_400_000);
  const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const [totalUsers, activeUsers, payingUsers, usageAgg, costAgg] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { deletedAt: null, updatedAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { deletedAt: null, plan: { not: 'FREE' } } }),
    prisma.usageRecord.aggregate({
      where: { period: currentPeriod },
      _sum: { generationsUsed: true, costUsd: true },
    }),
    prisma.blueprint.aggregate({
      where: { createdAt: { gte: periodStart }, status: 'COMPLETE' },
      _sum: { totalCostUsd: true },
    }),
  ]);

  return NextResponse.json({
    totalUsers,
    activeUsers,
    payingUsers,
    totalGenerationsThisMonth: usageAgg._sum.generationsUsed ?? 0,
    aiCostThisMonth: costAgg._sum.totalCostUsd ?? 0,
    currentPeriod,
  });
}
