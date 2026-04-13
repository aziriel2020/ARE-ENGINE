/**
 * GET /api/health — health check (no auth required)
 */

import { NextResponse } from 'next/server';
import { IS_TEST_MODE } from '@/lib/config/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbStatus = await checkDb();

  return NextResponse.json({
    status:    dbStatus ? 'ok' : 'degraded',
    version:   '3.0.0',
    testMode:  IS_TEST_MODE,
    timestamp: new Date().toISOString(),
    services: {
      database: dbStatus ? 'ok' : 'error',
    },
  }, {
    status: dbStatus ? 200 : 503,
  });
}

async function checkDb(): Promise<boolean> {
  try {
    const { prisma } = await import('@/lib/db');
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
