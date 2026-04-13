'use client';

// Pure SVG radar chart for DNA visualization
const DNA_VECTORS = [
  { label: 'Lexical', value: 0.78 },
  { label: 'Emotional', value: 0.82 },
  { label: 'Rhythmic', value: 0.91 },
  { label: 'Thematic', value: 0.74 },
  { label: 'Sonic', value: 0.85 },
  { label: 'Structural', value: 0.69 },
  { label: 'Influence', value: 0.77 },
];

function RadarChart() {
  const cx = 160;
  const cy = 160;
  const r = 110;
  const n = DNA_VECTORS.length;

  // Calculate points for each vector
  const points = DNA_VECTORS.map((v, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * v.value * Math.cos(angle),
      y: cy + r * v.value * Math.sin(angle),
      labelX: cx + (r + 24) * Math.cos(angle),
      labelY: cy + (r + 24) * Math.sin(angle),
      gridX: cx + r * Math.cos(angle),
      gridY: cy + r * Math.sin(angle),
    };
  });

  // Grid levels
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
      {/* Grid */}
      {gridLevels.map((level, li) => {
        const gridPoints = DNA_VECTORS.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            key={li}
            points={gridPoints}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        );
      })}

      {/* Spokes */}
      {points.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.gridX}
          y2={p.gridY}
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={polyPoints}
        fill="var(--accent-dim)"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
      ))}

      {/* Labels */}
      {points.map((p, i) => {
        const v = DNA_VECTORS[i];
        return (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="IBM Plex Mono, monospace"
          >
            {v.label}
          </text>
        );
      })}
    </svg>
  );
}

export function DnaSection() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Chart */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <RadarChart />
          </div>

          {/* Text */}
          <div>
            <p
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Vocal DNA System
            </p>
            <h2
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              7 vectors.<br />
              <span style={{ color: 'var(--accent)' }}>One fingerprint.</span>
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              The Vocal DNA System decomposes your creative identity into 7 machine-readable
              vectors stored as versioned JSONB. Two requests with identical DNA always produce
              outputs in the same stylistic space.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {DNA_VECTORS.map((v) => (
                <div key={v.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--text-secondary)',
                      width: '72px',
                      textAlign: 'right',
                    }}
                  >
                    {v.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '3px',
                      background: 'var(--border)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${v.value * 100}%`,
                        height: '100%',
                        background: 'var(--accent)',
                        opacity: 0.8,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--text-tertiary)',
                      width: '32px',
                    }}
                  >
                    {Math.round(v.value * 100)}%
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                marginTop: '20px',
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--accent)',
                opacity: 0.7,
              }}
            >
              → DNA is non-portable. Grows richer with every generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DnaSection;
