/**
 * GET /api/admin/costs — AI cost analysis across all users (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MODELS } from '@/lib/engine/ai-router';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAdmin(request);
  if (!authCtx) return ERR.forbidden();

  if (IS_TEST_MODE) {
    return NextResponse.json({
      totalCostThisMonth: 38.42,
      avgCostPerGeneration: 0.10,
      cacheHitRate: 0.78,
      modelBreakdown: [
        { model: MODELS.flagship.model, generations: 312, totalCost: 35.20, avgCost: 0.113 },
        { model: MODELS.fast.model,     generations: 72,  totalCost: 3.22,  avgCost: 0.045 },
      ],
    });
  }

  const now = new Date();
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const blueprints = await prisma.blueprint.findMany({
    where: { createdAt: { gte: periodStart }, status: 'COMPLETE' },
    select: { modelUsed: true, totalCostUsd: true, cachedTokens: true, inputTokens: true },
  });

  const totalCost = blueprints.reduce((s, b) => s + b.totalCostUsd, 0);
  const totalCached = blueprints.reduce((s, b) => s + b.cachedTokens, 0);
  const totalInput  = blueprints.reduce((s, b) => s + b.inputTokens, 0);
  const cacheHitRate = totalInput > 0 ? totalCached / totalInput : 0;

  // Group by model
  const byModel: Record<string, { generations: number; totalCost: number }> = {};
  for (const b of blueprints) {
    if (!byModel[b.modelUsed]) byModel[b.modelUsed] = { generations: 0, totalCost: 0 };
    byModel[b.modelUsed].generations++;
    byModel[b.modelUsed].totalCost += b.totalCostUsd;
  }

  const modelBreakdown = Object.entries(byModel).map(([model, stats]) => ({
    model,
    generations: stats.generations,
    totalCost:   Math.round(stats.totalCost * 10_000) / 10_000,
    avgCost:     stats.generations > 0
      ? Math.round((stats.totalCost / stats.generations) * 10_000) / 10_000
      : 0,
  }));

  return NextResponse.json({
    totalCostThisMonth: Math.round(totalCost * 10_000) / 10_000,
    avgCostPerGeneration: blueprints.length > 0
      ? Math.round((totalCost / blueprints.length) * 10_000) / 10_000
      : 0,
    cacheHitRate: Math.round(cacheHitRate * 1000) / 1000,
    modelBreakdown,
  });
}
