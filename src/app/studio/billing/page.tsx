'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/toast-provider';

export default function BillingPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/billing/portal');
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to open portal');
      if (data.url) window.location.href = data.url;
      else toast({ title: 'Portal (test mode — no redirect)', variant: 'info' });
    } catch (err) {
      toast({ title: 'Failed to open billing portal', description: String(err), variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (planId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: planId }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to create checkout');
      if (data.url) window.location.href = data.url;
      else toast({ title: 'Checkout (test mode — no redirect)', variant: 'info' });
    } catch (err) {
      toast({ title: 'Failed to start checkout', description: String(err), variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '8px' }}>Billing</h1>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Manage your subscription and invoices.
      </p>

      {/* Current plan */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>
              CURRENT PLAN
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>
              PRO
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              $299/month · Renews Jan 15, 2027
            </div>
          </div>
          <button onClick={handlePortal} className="btn" style={{ fontSize: '13px' }} disabled={loading}>
            {loading ? <span className="spin-glyph">◈</span> : 'Manage Subscription →'}
          </button>
        </div>
      </div>

      {/* Upgrade options */}
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px', marginBottom: '16px' }}>
        Upgrade Plan
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { name: 'STUDIO', price: '$799', priceId: 'price_studio_monthly', feature: '500 gens/mo + 20 DNA profiles' },
          { name: 'ENTERPRISE', price: '$2,999', priceId: 'price_enterprise_monthly', feature: 'Unlimited + dedicated support' },
        ].map((plan) => (
          <div key={plan.name} className="card">
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>{plan.name}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>{plan.price}<span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>/mo</span></div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{plan.feature}</p>
            <button onClick={() => void handleCheckout(plan.priceId)} className="btn-primary" style={{ width: '100%', fontSize: '13px' }} disabled={loading}>
              Upgrade
            </button>
          </div>
        ))}
      </div>

      {/* Invoices placeholder */}
      <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px', marginBottom: '16px' }}>
        Invoices
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
        Invoices are managed via the{' '}
        <button onClick={handlePortal} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline', padding: 0 }}>
          Stripe Customer Portal
        </button>.
      </p>

      <div style={{ marginTop: '32px', padding: '20px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Need a custom plan for your label or platform?{' '}
          <Link href="/sign-up" style={{ color: 'var(--accent)' }}>
            Contact sales →
          </Link>
        </p>
      </div>
    </div>
  );
}
