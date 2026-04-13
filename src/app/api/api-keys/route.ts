/**
 * GET  /api/api-keys — list keys (prefix only, never full key)
 * POST /api/api-keys — create new API key (full key shown ONCE)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { requireAuth } from '@/lib/api/auth';
import { canCreateApiKey } from '@/lib/api/plan-gate';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { CreateApiKeySchema } from '@/lib/schemas/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) {
    return NextResponse.json({
      data: [{
        id: 'key_mock_001', name: 'Test Key', keyPrefix: 'are_k_ab',
        permissions: ['generate', 'blueprints:read'], isActive: true,
        createdAt: new Date().toISOString(), lastUsedAt: null,
      }],
    });
  }

  const keys = await prisma.apiKey.findMany({
    where: { userId: authCtx.userId, isActive: true },
    select: {
      id: true, name: true, keyPrefix: true, permissions: true,
      isActive: true, createdAt: true, lastUsedAt: true, expiresAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: keys });
}

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = CreateApiKeySchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const limitErr = await canCreateApiKey(authCtx.userId, authCtx.plan);
  if (limitErr) return ERR.planLimit(limitErr);

  if (IS_TEST_MODE) {
    const mockKey = 'are_k_testkey_mockkeyvalue12345678901234';
    return NextResponse.json({
      id: 'key_mock_001', name: parsed.data.name,
      key: mockKey,  // shown ONCE
      keyPrefix: mockKey.slice(0, 8),
    }, { status: 201 });
  }

  const { nanoid } = await import('nanoid');
  const rawKey = `are_k_${nanoid(40)}`;
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const keyPrefix = rawKey.slice(0, 12);

  const apiKey = await prisma.apiKey.create({
    data: {
      userId: authCtx.userId,
      name: parsed.data.name,
      keyHash,
      keyPrefix,
      permissions: JSON.stringify(parsed.data.permissions),
      ipWhitelist: JSON.stringify(parsed.data.ipWhitelist),
      expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
    },
  });

  void auditLog(authCtx.userId, 'api_key.created', request, { keyId: apiKey.id });

  // Return full key ONCE — never stored in plain text
  return NextResponse.json({
    id:        apiKey.id,
    name:      apiKey.name,
    key:       rawKey,   // ← shown only here
    keyPrefix: apiKey.keyPrefix,
    createdAt: apiKey.createdAt,
  }, { status: 201 });
}
