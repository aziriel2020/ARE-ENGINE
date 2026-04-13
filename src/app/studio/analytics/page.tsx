'use client';

import { useMemo } from 'react';
import { MOCK_USAGE } from '@/lib/mocks/mock-usage';

// Pure SVG line chart component
function LineChart({
  data,
  width = 480,
  height = 120,
  color = 'var(--accent)',
  label = '',
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - 40) + 20;
    const y = height - 20 - ((v / max) * (height - 40));
    return { x, y, v };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `M ${pts[0].x} ${height - 20} ${pts.map((p) => `L ${p.x} ${p.y}`).join(' ')} L ${pts[pts.length - 1].x} ${height - 20} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {/* Area fill */}
      <path d={areaD} fill={color} fillOpacity="0.08" />
      {/* Line */}
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" />
      {/* Points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} />
      ))}
      {/* Label */}
      {label && (
        <text x="20" y="12" fontSize="9" fill="var(--text-tertiary)" fontFamily="IBM Plex Mono, monospace">
          {label}
        </text>
      )}
    </svg>
  );
}

// Bar chart
function BarChart({
  data,
  width = 480,
  height = 120,
  color = 'var(--accent)',
}: {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = (width - 40) / data.length - 4;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {data.map((d, i) => {
        const h = ((d.value / max) * (height - 40));
        const x = 20 + i * ((width - 40) / data.length) + 2;
        const y = height - 20 - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} fill={color} fillOpacity="0.7" rx="1" />
            <text x={x + barW / 2} y={height - 4} textAnchor="middle" fontSize="8" fill="var(--text-tertiary)" fontFamily="IBM Plex Mono, monospace">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AnalyticsPage() {
  const usage = MOCK_USAGE;

  const genHistory = useMemo(() =>
    [usage.current, ...usage.history].reverse().map((r) => r.generationsUsed),
    [usage]
  );

  const costHistory = useMemo(() =>
    [usage.current, ...usage.history].reverse().map((r) => r.costUsd),
    [usage]
  );

  const gradeDistData = [
    { label: 'S', value: 2 },
    { label: 'A', value: 8 },
    { label: 'B', value: 9 },
    { label: 'C', value: 3 },
    { label: 'F', value: 1 },
  ];

  const usedPct = usage.current.generationsLimit > 0
    ? Math.round((usage.current.generationsUsed / usage.current.generationsLimit) * 100)
    : 0;

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '8px' }}>Analytics</h1>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Usage, costs, and quality trends for {usage.current.period}
      </p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Generations', value: `${usage.current.generationsUsed}`, sub: `/ ${usage.current.generationsLimit > 0 ? usage.current.generationsLimit : '∞'}` },
          { label: 'AI Cost (month)', value: `$${usage.current.costUsd.toFixed(2)}`, sub: 'total' },
          { label: 'Avg Cost/Gen', value: `$${(usage.current.costUsd / Math.max(1, usage.current.generationsUsed)).toFixed(3)}`, sub: 'per generation' },
          { label: 'Tokens Consumed', value: `${(usage.current.tokensConsumed / 1_000_000).toFixed(2)}M`, sub: 'total tokens' },
        ].map((c) => (
          <div key={c.label} className="card">
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{c.label}</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.value}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Usage gauge */}
      {usage.current.generationsLimit > 0 && (
        <div className="card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Plan usage this month</span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: usedPct > 80 ? 'var(--warning)' : 'var(--text-secondary)' }}>{usedPct}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${usedPct}%`, height: '100%', background: usedPct > 80 ? 'var(--warning)' : 'var(--accent)', borderRadius: '3px', transition: 'width 500ms ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>{usage.current.generationsUsed} used</span>
            <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>{usage.current.generationsLimit - usage.current.generationsUsed} remaining</span>
          </div>
        </div>
      )}

      {/* Charts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div className="card">
          <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            GENERATIONS — LAST 12 MONTHS
          </h3>
          <LineChart data={genHistory} color="var(--accent)" label="generations/month" />
        </div>

        <div className="card">
          <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            AI COST — LAST 12 MONTHS
          </h3>
          <LineChart data={costHistory} color="var(--info)" label="USD/month" />
        </div>

        <div className="card">
          <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            GRADE DISTRIBUTION
          </h3>
          <BarChart data={gradeDistData} color="var(--accent)" />
        </div>

        <div className="card">
          <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            COST BREAKDOWN — RECENT
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {usage.costBreakdown.map((item) => (
              <div key={item.blueprintId} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.title}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)' }}>${item.costUsd.toFixed(3)}</span>
                  <br />
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
                    {item.modelUsed.split('-').slice(0, 2).join('-')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
