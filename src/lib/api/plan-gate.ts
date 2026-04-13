/**
 * Plan feature gating — checks if a user's plan allows a specific action.
 * Returns an error string on denial, null on success.
 */

import { PLAN_LIMITS, type PlanName } from '@/lib/constants/plans';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import type { Plan } from '@prisma/client';

/** Check if user can generate (not over monthly limit). Returns error message or null. */
export async function canGenerate(
  userId: string,
  plan: Plan
): Promise<string | null> {
  const limits = PLAN_LIMITS[plan as PlanName];
  if (limits.generationsPerMonth === -1) return null; // unlimited

  if (IS_TEST_MODE) {
    // In test mode always allow (usage record may not exist)
    return null;
  }

  const period = getCurrentPeriod();

  try {
    const usage = await prisma.usageRecord.findUnique({
      where: { userId_period: { userId, period } },
    });

    const used = usage?.generationsUsed ?? 0;

    if (used >= limits.generationsPerMonth) {
      return `Generation limit reached (${limits.generationsPerMonth}/month on ${plan} plan). Upgrade to continue.`;
    }

    return null;
  } catch {
    return null; // On DB error, allow rather than block
  }
}

/** Increment the generation counter for the current period. */
export async function incrementGenerationCount(
  userId: string,
  plan: Plan
): Promise<void> {
  if (IS_TEST_MODE) return;

  const limits = PLAN_LIMITS[plan as PlanName];
  const period = getCurrentPeriod();

  await prisma.usageRecord.upsert({
    where: { userId_period: { userId, period } },
    create: {
      userId,
      period,
      generationsUsed: 1,
      generationsLimit: limits.generationsPerMonth,
    },
    update: {
      generationsUsed: { increment: 1 },
    },
  });
}

/** Check feature access by plan. */
export function requireFeature(
  plan: Plan,
  feature: keyof typeof PLAN_LIMITS.FREE
): string | null {
  const limits = PLAN_LIMITS[plan as PlanName];
  const val = limits[feature];

  if (typeof val === 'boolean' && !val) {
    return `${String(feature)} is not available on the ${plan} plan. Please upgrade.`;
  }

  if (typeof val === 'number' && val === 0) {
    return `${String(feature)} requires a higher plan. Please upgrade.`;
  }

  return null;
}

/** Check if user can create another DNA profile. */
export async function canCreateDNAProfile(
  userId: string,
  plan: Plan
): Promise<string | null> {
  const limits = PLAN_LIMITS[plan as PlanName];
  if (limits.dnaProfiles === -1) return null;

  if (IS_TEST_MODE) return null;

  const count = await prisma.vocalDNAProfile.count({ where: { userId } });
  if (count >= limits.dnaProfiles) {
    return `DNA profile limit reached (${limits.dnaProfiles} on ${plan} plan). Upgrade to add more.`;
  }

  return null;
}

/** Check if user can create another API key. */
export async function canCreateApiKey(
  userId: string,
  plan: Plan
): Promise<string | null> {
  const limits = PLAN_LIMITS[plan as PlanName];
  if (limits.apiKeys === 0) {
    return `API keys are not available on the ${plan} plan. Upgrade to PRO or higher.`;
  }
  if (limits.apiKeys === -1) return null;

  if (IS_TEST_MODE) return null;

  const count = await prisma.apiKey.count({
    where: { userId, isActive: true },
  });

  if (count >= limits.apiKeys) {
    return `API key limit reached (${limits.apiKeys} on ${plan} plan). Upgrade to add more.`;
  }

  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getCurrentPeriod(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
