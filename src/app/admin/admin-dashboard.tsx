'use client';

import { useEffect, useMemo, useState } from 'react';
import { PLAN_LIMITS, type PlanName, formatPrice } from '@/lib/constants/plans';
import { MODELS } from '@/lib/engine/ai-router';

interface AdminStatsApi {
  totalUsers: number;
  activeUsers: number;
  payingUsers: number;
  totalGenerationsThisMonth: number;
  aiCostThisMonth: number;
  currentPeriod?: string;
}

interface AdminCostsApi {
  totalCostThisMonth: number;
  avgCostPerGeneration: number;
  cacheHitRate: number;
  modelBreakdown: Array<{ model: string; generations: number; totalCost: number; avgCost: number }>;
}

interface AdminUser {
  id: string;
  email: string;
  plan: PlanName;
  createdAt: string;
  orgId?: string | null;
  trialEndsAt?: string | null;
  _count?: { blueprints?: number };
}

interface ApiRow {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  purpose: string;
  auth: string;
}

const API_ROWS: ApiRow[] = [
  { method: 'POST', path: '/api/generate', purpose: 'Run full generation pipeline', auth: 'User/API Key' },
  { method: 'POST', path: '/api/generate/score', purpose: 'Quality score a package', auth: 'User/API Key' },
  { method: 'POST', path: '/api/generate/regenerate', purpose: 'Targeted section regeneration', auth: 'User/API Key' },
  { method: 'GET', path: '/api/usage', purpose: 'Current usage + limits', auth: 'User/API Key' },
  { method: 'GET', path: '/api/usage/costs', purpose: 'Per-generation costs', auth: 'User/API Key' },
  { method: 'GET', path: '/api/admin/stats', purpose: 'Platform KPI aggregation', auth: 'Admin only' },
  { method: 'GET', path: '/api/admin/users', purpose: 'User management feed', auth: 'Admin only' },
  { method: 'GET', path: '/api/admin/costs', purpose: 'Model spend analytics', auth: 'Admin only' },
  { method: 'GET', path: '/api/health', purpose: 'Service health check', auth: 'Public' },
];

const METHOD_COLOR: Record<ApiRow['method'], string> = {
  GET: 'var(--info)',
  POST: 'var(--success)',
  PUT: 'var(--warning)',
  DELETE: 'var(--error)',
};

export function AdminDashboard() {
  const [tab, setTab] = useState<'overview' | 'users' | 'costs' | 'apis' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<AdminStatsApi | null>(null);
  const [costs, setCosts] = useState<AdminCostsApi | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');

  const [apiStatus, setApiStatus] = useState<Record<string, 'ok' | 'warn' | 'down'>>({});
  const [featureFlags, setFeatureFlags] = useState({
    generationEnabled: true,
    adminWritesEnabled: false,
    strictRateLimit: true,
    costGuardrails: true,
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, costsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/users?limit=100'),
          fetch('/api/admin/costs'),
        ]);

        if (statsRes.ok) setStats((await statsRes.json()) as AdminStatsApi);
        if (costsRes.ok) setCosts((await costsRes.json()) as AdminCostsApi);

        if (usersRes.ok) {
          const payload = (await usersRes.json()) as { data?: AdminUser[] };
          setUsers(payload.data ?? []);
        }
      } finally {
        setLoading(false);
      }
    };

    const probeApis = async () => {
      const checks = await Promise.all(
        API_ROWS.map(async (row) => {
          try {
            const res = await fetch(row.path, { method: row.method === 'GET' ? 'GET' : 'OPTIONS' });
            if (res.status >= 200 && res.status < 300) return [row.path, 'ok'] as const;
            if (res.status === 401 || res.status === 403 || res.status === 405) return [row.path, 'warn'] as const;
            return [row.path, 'down'] as const;
          } catch {
            return [row.path, 'down'] as const;
          }
        })
      );
      setApiStatus(Object.fromEntries(checks));
    };

    void load();
    void probeApis();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();
      return !q || u.email.toLowerCase().includes(q) || u.plan.toLowerCase().includes(q);
    });
  }, [users, search]);

  const mrrEstimate = useMemo(() => {
    return users.reduce((sum, u) => sum + PLAN_LIMITS[u.plan].price, 0) / 100;
  }, [users]);

  const margin = useMemo(() => {
    if (!stats?.aiCostThisMonth || mrrEstimate <= 0) return 0;
    return Math.round(((mrrEstimate - stats.aiCostThisMonth) / mrrEstimate) * 100);
  }, [stats, mrrEstimate]);

  return (
    <div style={{ padding: '28px 30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '26px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', letterSpacing: '-0.04em' }}>
            ARE-E Command Center
          </h1>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em' }}>
            ADMIN / PLATFORM / API / COMMERCIAL CONTROL
          </p>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>
          {loading ? 'Refreshing…' : `Period: ${stats?.currentPeriod ?? 'live'}`}
        </span>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '20px', gap: 8 }}>
        {(['overview', 'users', 'costs', 'apis', 'settings'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '9px 14px',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
              color: tab === t ? 'var(--text-primary)' : 'var(--text-secondary)',
              textTransform: 'capitalize',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '12px', marginBottom: '22px' }}>
            {[
              ['Users', (stats?.totalUsers ?? users.length).toLocaleString(), 'var(--text-primary)'],
              ['Active 30d', (stats?.activeUsers ?? 0).toLocaleString(), 'var(--info)'],
              ['Paying', (stats?.payingUsers ?? 0).toLocaleString(), 'var(--success)'],
              ['MRR (est.)', `$${mrrEstimate.toLocaleString()}`, 'var(--accent)'],
              ['AI Cost (mo)', `$${(stats?.aiCostThisMonth ?? 0).toFixed(2)}`, 'var(--warning)'],
              ['Margin', `${margin}%`, 'var(--success)'],
              ['Generations (mo)', (stats?.totalGenerationsThisMonth ?? 0).toLocaleString(), 'var(--info)'],
              ['Cache hit rate', `${Math.round((costs?.cacheHitRate ?? 0) * 100)}%`, 'var(--accent)'],
            ].map(([label, value, color]) => (
              <div key={label} className="card">
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>{label}</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: String(color), letterSpacing: '-0.03em' }}>{value}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: '12px' }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px' }}>Revenue by Plan</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
              {(Object.keys(PLAN_LIMITS) as PlanName[]).map((plan) => {
                const count = users.filter((u) => u.plan === plan).length;
                const monthly = (PLAN_LIMITS[plan].price / 100) * count;
                return (
                  <div key={plan} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12, background: 'var(--bg-elevated)' }}>
                    <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', marginBottom: 6 }}>{plan}</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>${monthly.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{count} accounts</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div>
          <input
            className="input"
            placeholder="Search by email or plan"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '420px', marginBottom: '12px' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 140px', gap: '16px', padding: '8px 16px' }}>
            {['EMAIL', 'PLAN', 'BLUEPRINTS', 'CREATED'].map((h) => (
              <span key={h} className="table-header">{h}</span>
            ))}
          </div>
          {filteredUsers.map((u) => (
            <div key={u.id} className="table-row" style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 140px', gap: '16px', padding: '12px 16px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{u.email}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: u.plan === 'FREE' ? 'var(--text-tertiary)' : 'var(--accent)' }}>{u.plan}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>{u._count?.blueprints ?? 0}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-tertiary)' }}>{new Date(u.createdAt).toISOString().slice(0, 10)}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'costs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '12px' }}>
          {(costs?.modelBreakdown ?? []).map((m) => (
            <div key={m.model} className="card">
              <div style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>{m.model}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, marginBottom: 5 }}>${m.totalCost.toFixed(2)}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{m.generations} generations</div>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>avg ${m.avgCost.toFixed(4)} / generation</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'apis' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 260px 1fr 120px 90px', gap: '16px', padding: '8px 16px' }}>
            {['METHOD', 'PATH', 'PURPOSE', 'AUTH', 'STATUS'].map((h) => (
              <span key={h} className="table-header">{h}</span>
            ))}
          </div>
          {API_ROWS.map((row) => (
            <div key={row.path} className="table-row" style={{ display: 'grid', gridTemplateColumns: '80px 260px 1fr 120px 90px', gap: '16px', padding: '12px 16px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: METHOD_COLOR[row.method] }}>{row.method}</span>
              <code style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-primary)' }}>{row.path}</code>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.purpose}</span>
              <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>{row.auth}</span>
              <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: apiStatus[row.path] === 'ok' ? 'var(--success)' : apiStatus[row.path] === 'warn' ? 'var(--warning)' : 'var(--error)' }}>
                {(apiStatus[row.path] ?? 'down').toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="card">
            <h3 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px' }}>Feature Controls</h3>
            {(Object.keys(featureFlags) as Array<keyof typeof featureFlags>).map((key) => (
              <label key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{key}</span>
                <input
                  type="checkbox"
                  checked={featureFlags[key]}
                  onChange={(e) => setFeatureFlags((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
              </label>
            ))}
          </div>

          <div className="card">
            <h3 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px' }}>Model Routing</h3>
            {Object.entries(MODELS).map(([tier, cfg]) => (
              <div key={tier} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)' }}>{tier.toUpperCase()}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{cfg.model}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>${cfg.inputCostPer1M}/$ {cfg.outputCostPer1M} per 1M tokens</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px' }}>Commercial Plan Matrix</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {(Object.keys(PLAN_LIMITS) as PlanName[]).map((plan) => (
                <div key={plan} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', marginBottom: 4 }}>{plan}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 5 }}>{formatPrice(PLAN_LIMITS[plan].price)}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{PLAN_LIMITS[plan].generationsPerMonth < 0 ? 'Unlimited' : PLAN_LIMITS[plan].generationsPerMonth} gens / month</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
