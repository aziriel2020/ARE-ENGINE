/**
 * Standard API error response builders.
 */

import { NextResponse } from 'next/server';

export interface ApiErrorBody {
  error: string;
  code: string;
  details?: unknown;
}

export function apiError(
  status: number,
  error: string,
  code: string,
  details?: unknown
): NextResponse<ApiErrorBody> {
  return NextResponse.json({ error, code, details }, { status });
}

export const ERR = {
  unauthorized:   () => apiError(401, 'Authentication required',         'AUTH_REQUIRED'),
  forbidden:      () => apiError(403, 'Access denied',                   'FORBIDDEN'),
  notFound:       (r: string) => apiError(404, `${r} not found`,         'NOT_FOUND'),
  badRequest:     (msg: string) => apiError(400, msg,                    'BAD_REQUEST'),
  planLimit:      (msg: string) => apiError(402, msg,                    'PLAN_LIMIT'),
  rateLimited:    () => apiError(429, 'Rate limit exceeded',             'RATE_LIMITED'),
  serverError:    (msg = 'Internal server error') =>
                    apiError(500, msg,                                   'SERVER_ERROR'),
  zodError:       (issues: unknown) =>
                    apiError(400, 'Validation failed',                   'VALIDATION_ERROR', issues),
} as const;
