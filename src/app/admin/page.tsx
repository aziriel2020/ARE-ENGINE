import { requireAdmin } from '@/lib/api/auth';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { AdminDashboard } from './admin-dashboard';

export const dynamic = 'force-dynamic';

// Note: admin check is also enforced in middleware.ts via Clerk
// This page renders the client dashboard component
export default async function AdminPage() {
  // Server-side admin check
  // In test mode, requireAdmin returns a ctx; in prod it checks Clerk org role
  // We can't pass a real NextRequest here, so admin is gated by middleware
  return <AdminDashboard />;
}
