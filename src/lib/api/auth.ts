/**
 * Auth extraction for API routes.
 * Supports both Clerk session auth (web) and x-are-api-key header (B2B).
 */

import { auth } from '@clerk/nextjs/server';
import { createHash } from 'crypto';
import type { NextRequest } from 'next/server';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import type { Plan } from '@prisma/client';
import { logError } from '@/lib/logger';

export interface AuthContext {
  userId: string;
  orgId: string | null;
  plan: Plan;
  authMethod: 'clerk' | 'api_key';
  apiKeyPermissions: string[];
}

const TEST_USER_ID = 'user_test_000';

/** Validate an x-are-api-key header value. Returns AuthContext or null. */
async function validateApiKey(rawKey: string): Promise<AuthContext | null> {
  if (IS_TEST_MODE) {
    return {
      userId: TEST_USER_ID,
      orgId: null,
      plan: 'PRO',
      authMethod: 'api_key',
      apiKeyPermissions: ['generate', 'blueprints:read', 'blueprints:write', 'dna:read', 'usage:read'],
    };
  }

  try {
    const keyHash = createHash('sha256').update(rawKey).digest('hex');
    const apiKey = await prisma.apiKey.findUnique({
      where: { keyHash },
      include: { user: { select: { plan: true, deletedAt: true } } },
    });

    if (
      !apiKey ||
      !apiKey.isActive ||
      apiKey.user.deletedAt !== null ||
      (apiKey.expiresAt && apiKey.expiresAt < new Date())
    ) {
      return null;
    }

    // Update lastUsedAt (fire and forget — don't block response)
    prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    }).catch(() => {/* ignore */});

    const perms: string[] = JSON.parse(apiKey.permissions) as string[];

    return {
      userId: apiKey.userId,
      orgId: null,
      plan: apiKey.user.plan,
      authMethod: 'api_key',
      apiKeyPermissions: perms,
    };
  } catch (err) {
    logError('auth: api key validation error', { metadata: { error: String(err) } });
    return null;
  }
}

/**
 * Ensure a User row exists for this Clerk user ID.
 * Called lazily on first authenticated request — no Clerk webhook required.
 */
async function ensureUserExists(
  userId: string,
  email?: string | null
): Promise<Plan> {
  try {
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: email ?? `${userId}@clerk.local`,
        plan: 'FREE',
      },
      select: { plan: true },
    });
    return user.plan;
  } catch {
    // Non-critical — fall through with FREE plan
    return 'FREE';
  }
}

/**
 * Extract and validate auth from a request.
 * Returns AuthContext or null (unauthenticated).
 */
export async function requireAuth(request: NextRequest): Promise<AuthContext | null> {
  // 1. API key takes precedence
  const rawKey = request.headers.get('x-are-api-key');
  if (rawKey) return validateApiKey(rawKey);

  // 2. Clerk session
  if (IS_TEST_MODE) {
    return {
      userId: TEST_USER_ID,
      orgId: null,
      plan: 'PRO',
      authMethod: 'clerk',
      apiKeyPermissions: [],
    };
  }

  try {
    const session = await auth();
    if (!session.userId) return null;

    // Lazily create the User row on first request — no Clerk webhook needed
    const plan = await ensureUserExists(
      session.userId,
      (session as { sessionClaims?: { email?: string } }).sessionClaims?.email
    );

    return { userId: session.userId, orgId: session.orgId ?? null, plan, authMethod: 'clerk', apiKeyPermissions: [] };
  } catch {
    return null;
  }
}

/** Check that an API-key auth has the required permission. */
export function hasApiKeyPermission(ctx: AuthContext, permission: string): boolean {
  if (ctx.authMethod === 'clerk') return true; // Clerk sessions have full access
  return ctx.apiKeyPermissions.includes(permission);
}

/** Admin check — only org-level admins (Clerk orgRole) or hardcoded list. */
export async function requireAdmin(request: NextRequest): Promise<AuthContext | null> {
  const ctx = await requireAuth(request);
  if (!ctx) return null;
  if (IS_TEST_MODE) return ctx;

  // In production: check Clerk org membership role
  try {
    const session = await auth();
    if (session.userId && session.orgRole === 'org:admin') return ctx;
    return null;
  } catch {
    return null;
  }
}
