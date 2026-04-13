'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_DNA_PROFILES } from '@/lib/mocks/mock-dna';
import type { VocalDNA } from '@/lib/schemas/vocal-dna';
import { useToast } from '@/components/ui/toast-provider';

const DNA_VECTORS = ['lexical', 'emotional', 'rhythmic', 'thematic', 'sonic', 'structural', 'influences'] as const;
type VectorKey = typeof DNA_VECTORS[number];

// Radar for DNA vectors
function DnaRadar({ dna }: { dna: VocalDNA }) {
  const scores: Record<VectorKey, number> = {
    lexical: dna.lexical.slangDensity * 100,
    emotional: dna.emotional.intensityRange[1] * 10,
    rhythmic: dna.rhythmic.syllableDensity === 'dense' ? 85 : dna.rhythmic.syllableDensity === 'moderate' ? 60 : 40,
    thematic: dna.thematic.coreThemes.length * 14,
    sonic: dna.sonic.instrumentalAffinities.length * 10,
    structural: dna.structural.avgVerseLines * 4,
    influences: dna.influences.directInfluences.length * 15,
  };
  const cx = 140, cy = 140, r = 100, n = DNA_VECTORS.length;
  const points = DNA_VECTORS.map((v, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const val = Math.min(100, Math.max(0, scores[v])) / 100;
    return {
      x: cx + r * val * Math.cos(angle),
      y: cy + r * val * Math.sin(angle),
      labelX: cx + (r + 20) * Math.cos(angle),
      labelY: cy + (r + 20) * Math.sin(angle),
      gridX: cx + r * Math.cos(angle),
      gridY: cy + r * Math.sin(angle),
    };
  });
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 280 280" width={280} height={280} style={{ overflow: 'visible' }}>
      {[0.25, 0.5, 0.75, 1].map((level, li) => {
        const gp = DNA_VECTORS.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(' ');
        return <polygon key={li} points={gp} fill="none" stroke="var(--border)" strokeWidth="1" />;
      })}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.gridX} y2={p.gridY} stroke="var(--border)" strokeWidth="1" />
      ))}
      <polygon points={polyPoints} fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth="1.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.labelX} y={p.labelY} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="IBM Plex Mono, monospace">
          {DNA_VECTORS[i]}
        </text>
      ))}
    </svg>
  );
}

export default function DnaDetailPage() {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const [dna, setDna] = useState<VocalDNA | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVector, setActiveVector] = useState<VectorKey>('lexical');

  useEffect(() => {
    const idx = parseInt(params.id, 10);
    const found = MOCK_DNA_PROFILES[isNaN(idx) ? 0 : idx] ?? MOCK_DNA_PROFILES[0];
    setDna(found);
    setLoading(false);
  }, [params.id]);

  const handleSave = () => {
    toast({ title: 'DNA profile saved', description: 'New version created.', variant: 'success' });
  };

  if (loading || !dna) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>
        <span className="spin-glyph">◈</span> Loading DNA profile...
      </div>
    );
  }

  const vectorData: Record<VectorKey, Record<string, unknown>> = {
    lexical: dna.lexical as unknown as Record<string, unknown>,
    emotional: dna.emotional as unknown as Record<string, unknown>,
    rhythmic: dna.rhythmic as unknown as Record<string, unknown>,
    thematic: dna.thematic as unknown as Record<string, unknown>,
    sonic: dna.sonic as unknown as Record<string, unknown>,
    structural: dna.structural as unknown as Record<string, unknown>,
    influences: dna.influences as unknown as Record<string, unknown>,
  };

  return (
    <div style={{ padding: '32px' }}>
      <Link href="/studio/dna" style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', display: 'inline-flex', gap: '4px', marginBottom: '16px' }}>
        ← Vocal DNA
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', letterSpacing: '-0.02em' }}>
            {dna.artistName}
          </h1>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
            Version {dna.version} · {new Date(dna.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/studio" className="btn" style={{ fontSize: '12px' }}>
            Test Generation
          </Link>
          <button onClick={handleSave} className="btn-primary" style={{ fontSize: '12px' }}>
            Save New Version
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Radar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <DnaRadar dna={dna} />
          {/* Vector selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
            {DNA_VECTORS.map((v) => (
              <button
                key={v}
                onClick={() => setActiveVector(v)}
                style={{
                  padding: '6px 12px',
                  border: `1px solid ${activeVector === v ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '2px',
                  background: activeVector === v ? 'var(--accent-dim)' : 'transparent',
                  color: activeVector === v ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '11px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms ease',
                  textTransform: 'capitalize',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Vector editor */}
        <div>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px', textTransform: 'capitalize', marginBottom: '20px' }}>
            {activeVector}
          </h2>
          <div
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '20px',
              fontFamily: 'IBM Plex Mono, monospace',
            }}
          >
            {Object.entries(vectorData[activeVector]).map(([key, val]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border)',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'camelCase' as string }}>
                  {key}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--accent)', maxWidth: '60%', textAlign: 'right', wordBreak: 'break-word' }}>
                  {Array.isArray(val)
                    ? (val as unknown[]).join(', ')
                    : typeof val === 'object' && val !== null
                    ? JSON.stringify(val)
                    : String(val)}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', marginTop: '12px' }}>
            Full vector editing available in settings. Saving creates a new version — previous versions are preserved.
          </p>
        </div>
      </div>
    </div>
  );
}
