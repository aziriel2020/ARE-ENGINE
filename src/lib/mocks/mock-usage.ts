/**
 * Mock usage records for TEST_MODE and seed data.
 */

import type { PlanName } from '@/lib/constants/plans';
import { PLAN_LIMITS } from '@/lib/constants/plans';

export interface MockUsageRecord {
  period: string;
  generationsUsed: number;
  generationsLimit: number;
  tokensConsumed: number;
  costUsd: number;
}

export interface MockUsageSummary {
  current: MockUsageRecord;
  history: MockUsageRecord[];
  plan: PlanName;
  costBreakdown: {
    blueprintId: string;
    title: string;
    modelUsed: string;
    inputTokens: number;
    outputTokens: number;
    cachedTokens: number;
    costUsd: number;
    date: string;
  }[];
}

function getPeriod(monthsAgo = 0): string {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function buildMockUsage(plan: PlanName = 'PRO'): MockUsageSummary {
  const limit = PLAN_LIMITS[plan].generationsPerMonth;

  const current: MockUsageRecord = {
    period: getPeriod(0),
    generationsUsed: 23,
    generationsLimit: limit,
    tokensConsumed: 1_886_000,
    costUsd: 2.34,
  };

  const history: MockUsageRecord[] = Array.from({ length: 11 }, (_, i) => ({
    period: getPeriod(i + 1),
    generationsUsed: Math.floor(Math.random() * (limit > 0 ? Math.min(limit, 80) : 80)),
    generationsLimit: limit,
    tokensConsumed: Math.floor(Math.random() * 5_000_000),
    costUsd: parseFloat((Math.random() * 8).toFixed(2)),
  }));

  const costBreakdown = [
    {
      blueprintId: 'bp_mock_001',
      title: 'Nuits Froides',
      modelUsed: 'gemini-2.5-pro-preview-05-06',
      inputTokens: 82_000,
      outputTokens: 2_800,
      cachedTokens: 80_000,
      costUsd: 0.072,
      date: new Date(Date.now() - 2 * 86400_000).toISOString(),
    },
    {
      blueprintId: 'bp_mock_002',
      title: 'Le Prix du Silence',
      modelUsed: 'gemini-2.5-pro-preview-05-06',
      inputTokens: 82_000,
      outputTokens: 2_600,
      cachedTokens: 80_000,
      costUsd: 0.068,
      date: new Date(Date.now() - 5 * 86400_000).toISOString(),
    },
    {
      blueprintId: 'bp_mock_003',
      title: 'Bloc Code',
      modelUsed: 'gemini-2.5-flash-preview-04-17',
      inputTokens: 12_000,
      outputTokens: 2_200,
      cachedTokens: 0,
      costUsd: 0.009,
      date: new Date(Date.now() - 8 * 86400_000).toISOString(),
    },
  ];

  return { current, history, plan, costBreakdown };
}

export const MOCK_USAGE = buildMockUsage('PRO');
