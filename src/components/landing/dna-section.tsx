'use client';

const DNA_VECTORS = [
  { label: 'Lexical',    value: 0.78, description: 'Vocabulary tier, register & banned words' },
  { label: 'Emotional',  value: 0.82, description: 'Primary affect axis & emotional trajectory' },
  { label: 'Rhythmic',   value: 0.91, description: 'Default flow, BPM range & cadence patterns' },
  { label: 'Thematic',   value: 0.74, description: 'Subject matter, motifs & symbolism space' },
  { label: 'Sonic',      value: 0.85, description: 'Phonemic preferences & sound texture' },
  { label: 'Structural', value: 0.69, description: 'Verse/chorus ratio & section architecture' },
  { label: 'Influence',  value: 0.77, description: 'Artist influences & stylistic weights' },
];

function RadarChart() {
  const cx = 160;
  const cy = 160;
  const r = 108;
  const n = DNA_VECTORS.length;

  const points = DNA_VECTORS.map((v, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * v.value * Math.cos(angle),
      y: cy + r * v.value * Math.sin(angle),
      labelX: cx + (r + 28) * Math.cos(angle),
      labelY: cy + (r + 28) * Math.sin(angle),
      gridX: cx + r * Math.cos(angle),
      gridY: cy + r * Math.sin(angle),
    };
  });

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      viewBox="0 0 320 320"
      width="320"
      height="320"
      style={{ overflow: 'visible' }}
      aria-label="Vocal DNA radar chart"
    >
      {/* Glow fill */}
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(200,255,0,0.12)" />
          <stop offset="100%" stopColor="rgba(200,255,0,0.02)" />
        </radialGradient>
      </defs>

      {/* Grid polygons */}
      {gridLevels.map((level, li) => {
        const gridPts = DNA_VECTORS.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            key={li}
            points={gridPts}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Spokes */}
      {points.map((p, i) => (
        <line
          key={i}
          x1={cx} y1={cy}
          x2={p.gridX} y2={p.gridY}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* Data polygon fill */}
      <polygon points={polyPoints} fill="url(#radarGlow)" />

      {/* Data polygon stroke */}
      <polygon
        points={polyPoints}
        fill="none"
        stroke="rgba(200,255,0,0.7)"
        strokeWidth="1.5"
      />

      {/* Data point circles */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="var(--bg-base)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx={p.x} cy={p.y} r="2" fill="var(--accent)" />
        </g>
      ))}

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="rgba(255,255,255,0.45)"
          fontFamily="IBM Plex Mono, monospace"
          letterSpacing="0.04em"
        >
          {DNA_VECTORS[i].label.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

export function DnaSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Large background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>

          {/* LEFT — radar chart */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: '-24px',
                background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.06) 0%, transparent 70%)',
                filter: 'blur(16px)',
                pointerEvents: 'none',
              }} />
              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-hover)',
                borderRadius: '16px',
                padding: '28px',
                position: 'relative',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    Vocal DNA Profile
                  </span>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '10px',
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                  }}>
                    v2.3
                  </span>
                </div>
                <RadarChart />
              </div>
            </div>
          </div>

          {/* RIGHT — text + bars */}
          <div>
            <div style={{
              display: 'inline-block',
              fontSize: '10px',
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Vocal DNA System
            </div>

            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>
              7 vectors.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                One fingerprint.
              </span>
            </h2>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '32px',
            }}>
              ARE-E decomposes your creative identity into 7 machine-readable
              vectors stored as versioned JSON. Two requests with identical DNA
              always produce outputs in the same stylistic space — your voice,
              systematized at model scale.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DNA_VECTORS.map((v) => (
                <div key={v.label}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--text-secondary)',
                      width: '68px',
                      flexShrink: 0,
                    }}>
                      {v.label}
                    </span>
                    <div style={{
                      flex: 1,
                      height: '3px',
                      background: 'var(--border)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${v.value * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(200,255,0,0.7) 0%, var(--accent) 100%)',
                      }} />
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--text-tertiary)',
                      width: '32px',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}>
                      {Math.round(v.value * 100)}%
                    </span>
                  </div>
                  <div style={{
                    marginLeft: '80px',
                    fontSize: '11px',
                    color: 'var(--text-ghost)',
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}>
                    {v.description}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '28px',
              padding: '14px 16px',
              background: 'rgba(200,255,0,0.04)',
              border: '1px solid rgba(200,255,0,0.12)',
              borderRadius: '8px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', flexShrink: 0, paddingTop: '1px' }}>→</span>
              <span style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                DNA is non-portable and proprietary to your account. Grows richer and more accurate with every generation.
              </span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .dna-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default DnaSection;
