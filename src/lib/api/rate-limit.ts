/**
 * Rate limiting — Upstash sliding window in production,
 * in-memory map in TEST_MODE (no Redis required).
 */

import { IS_TEST_MODE } from '@/lib/config/env';
import { logWarn } from '@/lib/logger';
import type { Plan } from '@prisma/client';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number; // Unix ms
}

// ── In-memory fallback (TEST_MODE + missing Redis env) ─────────────────────────

interface WindowEntry {
  count: number;
  windowStart: number;
}

const memoryWindows = new Map<string, WindowEntry>();

function inMemoryRateLimit(
  key: string,
  limit: number,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const entry = memoryWindows.get(key);

  if (!entry || now - entry.windowStart >= windowMs) {
    memoryWindows.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, reset: now + windowMs };
  }

  entry.count += 1;
  memoryWindows.set(key, entry);

  if (entry.count > limit) {
    return { allowed: false, remaining: 0, reset: entry.windowStart + windowMs };
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
    reset: entry.windowStart + windowMs,
  };
}

// ── Plan-based limits (requests per minute) ────────────────────────────────────

const RATE_LIMITS: Record<Plan, number> = {
  FREE:       10,
  PRO:        60,
  STUDIO:     120,
  ENTERPRISE: 300,
};

/**
 * Check rate limit for a user.
 * @param userId  Unique key to rate-limit against
 * @param plan    User's subscription plan
 * @param route   Route identifier (for scoped limits per endpoint)
 */
export async function checkRateLimit(
  userId: string,
  plan: Plan,
  route = 'default'
): Promise<RateLimitResult> {
  const limit = RATE_LIMITS[plan];
  const key = `rl:${userId}:${route}`;

  if (IS_TEST_MODE || !process.env.UPSTASH_REDIS_REST_URL) {
    return inMemoryRateLimit(key, limit);
  }

  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, '1 m'),
      prefix: 'are_rl',
    });

    const result = await ratelimit.limit(key);
    return {
      allowed: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (err) {
    logWarn('rate-limit: upstash error, falling back to memory', {
      metadata: { error: String(err) },
    });
    return inMemoryRateLimit(key, limit);
  }
}
