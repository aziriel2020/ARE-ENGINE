/**
 * Audit logging — writes to AuditLog table on every mutation.
 * Fire-and-forget (does not block response).
 */

import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { logInfo, logError } from '@/lib/logger';
import type { NextRequest } from 'next/server';

export async function auditLog(
  userId: string,
  action: string,
  request?: NextRequest,
  metadata?: Record<string, unknown>
): Promise<void> {
  if (IS_TEST_MODE) {
    logInfo(`[AUDIT] ${action}`, { userId, action, metadata });
    return;
  }

  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata: (metadata ?? {}) as object,
        ipAddress: request?.headers.get('x-forwarded-for') ??
                   request?.headers.get('x-real-ip') ?? null,
        userAgent: request?.headers.get('user-agent') ?? null,
      },
    });
  } catch (err) {
    // Audit failures must never block the main response
    logError('audit: write failed', { userId, action, metadata: { error: String(err) } });
  }
}
