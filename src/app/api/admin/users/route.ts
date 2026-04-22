/**
 * GET /api/admin/users — searchable user list (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/api/auth';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const QuerySchema = z.object({
  q:     z.string().optional(),
  plan:  z.enum(['FREE', 'PRO', 'STUDIO', 'ENTERPRISE']).optional(),
  page:  z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export async function GET(request: NextRequest) {
  const authCtx = await requireAdmin(request);
  if (!authCtx) return ERR.forbidden();

  const { searchParams } = new URL(request.url);
  const parsed = QuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { q, plan, page, limit } = parsed.data;

  if (IS_TEST_MODE) {
    return NextResponse.json({
      data: [{
        id: 'user_test_000', email: 'test@animaengine.io', plan: 'PRO',
        createdAt: new Date().toISOString(), deletedAt: null,
      }],
      total: 1, page, limit, hasMore: false,
    });
  }

  const where = {
    deletedAt: null as null,
    ...(plan ? { plan } : {}),
    ...(q ? { email: { contains: q } } : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true, email: true, plan: true, orgId: true,
        createdAt: true, trialEndsAt: true,
        _count: { select: { blueprints: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ data: users, total, page, limit, hasMore: page * limit < total });
}
