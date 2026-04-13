'use client';

import { useState, useEffect } from 'react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  payingUsers: number;
  mrr: number;
  totalGenerations: number;
  aiCostMonth: number;
  avgQualityScore: number;
}

const MOCK_STATS: AdminStats = {
  totalUsers: 1_247,
  activeUsers: 389,
  payingUsers: 87,
  mrr: 24_613,
  totalGenerations: 8_941,
  aiCostMonth: 892,
  avgQualityScore: 82,
};

// SVG bar chart for quick stats
function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color }} />
      </div>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'var(--text-tertiary)', minWidth: '32px', textAlign: 'right' }}>
        {value.toLocaleString()}
      </span>
    </div>
  );
}

interface MockUser {
  id: string;
  email: string;
  plan: string;
  generationsThisMonth: number;
  lastActive: string;
}

const MOCK_USERS: MockUser[] = [
  { id: 'u1', email: 'artist@example.com', plan: 'PRO', generationsThisMonth: 47, lastActive: '2026-04-12' },
  { id: 'u2', email: 'studio@label.fr', plan: 'STUDIO', generationsThisMonth: 312, lastActive: '2026-04-13' },
  { id: 'u3', email: 'indie@music.io', plan: 'PRO', generationsThisMonth: 23, lastActive: '2026-04-10' },
  { id: 'u4', email: 'beatmaker@gmail.com', plan: 'FREE', generationsThisMonth: 5, lastActive: '2026-04-08' },
  { id: 'u5', email: 'corp@enterprise.com', plan: 'ENTERPRISE', generationsThisMonth: 1_240, lastActive: '2026-04-13' },
];

const PLAN_COLORS: Record<string, string> = {
  FREE: 'var(--text-tertiary)',
  PRO: 'var(--accent)',
  STUDIO: 'var(--info)',
  ENTERPRISE: 'var(--success)',
};

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>(MOCK_STATS);
  const [users, setUsers] = useState<MockUser[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'costs'>('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/users'),
        ]);
        if (statsRes.ok) setStats((await statsRes.json()) as AdminStats);
        if (usersRes.ok) {
          const data = (await usersRes.json()) as { users?: MockUser[] };
          if (data.users) setUsers(data.users);
        }
      } catch {
        // Use mock data on failure
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.plan.toLowerCase().includes(search.toLowerCase())
  );

  const margin = stats.mrr > 0 ? Math.round(((stats.mrr - stats.aiCostMonth) / stats.mrr) * 100) : 0;

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '4px' }}>Admin Dashboard</h1>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
            ⚡ INTERNAL — DO NOT SHARE
          </p>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>
          Last refreshed: now
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
        {(['overview', 'users', 'costs'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 20px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`, color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* KPI grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Total Users', value: stats.totalUsers.toLocaleString(), color: 'var(--text-primary)' },
              { label: 'Active (30d)', value: stats.activeUsers.toLocaleString(), color: 'var(--info)' },
              { label: 'Paying', value: stats.payingUsers.toLocaleString(), color: 'var(--success)' },
              { label: 'MRR', value: `$${stats.mrr.toLocaleString()}`, color: 'var(--accent)' },
              { label: 'AI Cost (mo)', value: `$${stats.aiCostMonth.toLocaleString()}`, color: 'var(--warning)' },
              { label: 'Margin', value: `${margin}%`, color: 'var(--success)' },
              { label: 'Generations', value: stats.totalGenerations.toLocaleString(), color: 'var(--info)' },
              { label: 'Avg Quality', value: `${stats.avgQualityScore}/100`, color: 'var(--accent)' },
            ].map((kpi) => (
              <div key={kpi.label} className="card">
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{kpi.label}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '22px', fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
              </div>
            ))}
          </div>

          {/* Conversion funnel */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', marginBottom: '16px', color: 'var(--text-secondary)' }}>CONVERSION FUNNEL</h3>
            {[
              { label: 'Signups', value: stats.totalUsers, max: stats.totalUsers },
              { label: 'Onboarding complete', value: Math.round(stats.totalUsers * 0.73), max: stats.totalUsers },
              { label: 'First generation', value: Math.round(stats.totalUsers * 0.58), max: stats.totalUsers },
              { label: 'Upgraded to paid', value: stats.payingUsers, max: stats.totalUsers },
            ].map((step) => (
              <div key={step.label} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{step.label}</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {Math.round((step.value / step.max) * 100)}%
                  </span>
                </div>
                <MiniBar value={step.value} max={step.max} color="var(--accent)" />
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by email or plan..." style={{ maxWidth: '400px' }} />
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 100px', gap: '16px', padding: '8px 16px' }}>
              {['EMAIL', 'PLAN', 'GENS', 'LAST ACTIVE'].map((h) => (
                <span key={h} className="table-header">{h}</span>
              ))}
            </div>
            {loading && <div style={{ padding: '24px', textAlign: 'center', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}><span className="spin-glyph">◈</span></div>}
            {filteredUsers.map((u) => (
              <div key={u.id} className="table-row" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 100px', gap: '16px', padding: '12px 16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{u.email}</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: PLAN_COLORS[u.plan] ?? 'var(--text-secondary)', letterSpacing: '0.05em' }}>{u.plan}</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>{u.generationsThisMonth}</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-tertiary)' }}>{u.lastActive}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'costs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { model: 'Gemini 3.1 Pro', calls: 742, cost: `$${(742 * 0.227).toFixed(0)}`, pct: '83%' },
            { model: 'Gemini 2.5 Flash', calls: 312, cost: `$${(312 * 0.008).toFixed(0)}`, pct: '15%' },
            { model: 'Claude Sonnet 4.6', calls: 23, cost: `$${(23 * 0.15).toFixed(0)}`, pct: '2%' },
          ].map((m) => (
            <div key={m.model} className="card">
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>{m.model}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{m.cost}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.calls} calls · {m.pct} of spend</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
