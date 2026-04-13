/**
 * GET /api/usage/history — last 12 months of usage
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

  if (IS_TEST_MODE) return NextResponse.json({ data: MOCK_USAGE.history });

  // Generate the last 12 period strings
  const periods: string[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    periods.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  const records = await prisma.usageRecord.findMany({
    where: { userId: authCtx.userId, period: { in: periods } },
    orderBy: { period: 'desc' },
  });

  // Fill in missing periods with zeros
  const data = periods.map((period) => {
    const record = records.find((r) => r.period === period);
    return {
      period,
      generationsUsed:  record?.generationsUsed ?? 0,
      generationsLimit: record?.generationsLimit ?? 0,
      tokensConsumed:   record?.tokensConsumed ?? 0,
      costUsd:          record?.costUsd ?? 0,
    };
  });

  return NextResponse.json({ data });
}
