'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_BLUEPRINTS } from '@/lib/mocks/mock-blueprint';
import type { MockBlueprint } from '@/lib/mocks/mock-blueprint';

const GRADE_COLORS: Record<string, string> = {
  S: 'var(--accent)', A: 'var(--success)', B: 'var(--info)',
  C: 'var(--warning)', F: 'var(--error)',
};

export default function BlueprintsPage() {
  const [blueprints, setBlueprints] = useState<MockBlueprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/blueprints');
        if (res.ok) {
          const data = await res.json() as { blueprints: MockBlueprint[] };
          setBlueprints(data.blueprints ?? MOCK_BLUEPRINTS);
        } else {
          setBlueprints(MOCK_BLUEPRINTS);
        }
      } catch {
        setBlueprints(MOCK_BLUEPRINTS);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const filtered = filter === 'all' ? blueprints : blueprints.filter((b) => b.qualityReport.grade === filter);

  return (
    <div style={{ padding: '32px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '4px' }}>
            Blueprints
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {blueprints.length} blueprint{blueprints.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/studio" className="btn-primary" style={{ fontSize: '13px' }}>
          ▶ New Blueprint
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['all', 'S', 'A', 'B', 'C', 'F'].map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            style={{
              padding: '4px 12px',
              border: `1px solid ${filter === g ? (g === 'all' ? 'var(--accent)' : GRADE_COLORS[g]) : 'var(--border)'}`,
              borderRadius: '2px',
              background: filter === g ? 'var(--bg-hover)' : 'transparent',
              color: filter === g ? (g === 'all' ? 'var(--accent)' : GRADE_COLORS[g]) : 'var(--text-secondary)',
              fontSize: '11px',
              fontFamily: 'IBM Plex Mono, monospace',
              cursor: 'pointer',
              letterSpacing: '0.1em',
            }}
          >
            {g === 'all' ? 'ALL' : `Grade ${g}`}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px 80px 100px 80px',
          gap: '16px',
          padding: '8px 16px',
          marginBottom: '4px',
        }}
      >
        {['TITLE', 'MODEL', 'GRADE', 'COST', 'DATE'].map((h) => (
          <span key={h} className="table-header">{h}</span>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}>
          <span className="spin-glyph">◈</span> Loading blueprints...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No blueprints found.</p>
        </div>
      ) : (
        filtered.map((bp) => (
          <Link
            key={bp.id}
            href={`/studio/blueprints/${bp.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="table-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 80px 100px 80px',
                gap: '16px',
                padding: '12px 16px',
                cursor: 'pointer',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {bp.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  {bp.userPrompt.slice(0, 60)}{bp.userPrompt.length > 60 ? '...' : ''}
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', alignSelf: 'center' }}>
                {bp.modelUsed.split('-').slice(0, 3).join('-')}
              </div>
              <div style={{ alignSelf: 'center' }}>
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: GRADE_COLORS[bp.qualityReport.grade] ?? 'var(--text-secondary)',
                  }}
                >
                  {bp.qualityReport.grade}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>
                  {bp.qualityReport.aggregateScore}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', alignSelf: 'center' }}>
                ${bp.totalCostUsd.toFixed(3)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', alignSelf: 'center' }}>
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
