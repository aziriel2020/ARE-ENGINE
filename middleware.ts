/**
 * Next.js Middleware
 * - Clerk auth protection for /studio and /admin routes
 * - Security response headers on all routes
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/studio(.*)',
  '/admin(.*)',
  '/onboarding(.*)',
]);

const securityHeaders: Record<string, string> = {
  'X-Content-Type-Options':  'nosniff',
  'X-Frame-Options':         'DENY',
  'X-XSS-Protection':        '0',
  'Referrer-Policy':         'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.clerk.accounts.dev https://*.supabase.co https://*.sentry.io",
  ].join('; '),
};

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }
  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
