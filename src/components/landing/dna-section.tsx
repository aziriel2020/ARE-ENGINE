'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from './scroll-reveal';

const DNA_VECTORS = [
  { label: 'Lexical',    value: 0.78, description: 'Vocabulary tier, register & banned words' },
  { label: 'Emotional',  value: 0.82, description: 'Primary affect axis & emotional trajectory' },
  { label: 'Rhythmic',   value: 0.91, description: 'Default flow, BPM range & cadence patterns' },
  { label: 'Thematic',   value: 0.74, description: 'Subject matter, motifs & symbolism space' },
  { label: 'Sonic',      value: 0.85, description: 'Phonemic preferences & sound texture' },
  { label: 'Structural', value: 0.69, description: 'Verse/chorus ratio & section architecture' },
  { label: 'Influence',  value: 0.77, description: 'Artist influences & stylistic weights' },
];

function calcPerimeter(points: { x: number; y: number }[]) {
  return points.reduce((sum, p, i) => {
    const next = points[(i + 1) % points.length];
    return sum + Math.sqrt((next.x - p.x) ** 2 + (next.y - p.y) ** 2);
  }, 0);
}

function RadarChart({ animated }: { animated: boolean }) {
  const cx = 160, cy = 160, r = 108;
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
  const polyStr = points.map((p) => `${p.x},${p.y}`).join(' ');
  const perimeter = calcPerimeter(points);

  return (
    <svg viewBox="0 0 320 320" width="320" height="320" style={{ overflow: 'visible' }} aria-label="Vocal DNA radar chart">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(200,255,0,0.14)" />
          <stop offset="100%" stopColor="rgba(200,255,0,0.03)" />
        </radialGradient>
      </defs>

      {/* Grid polygons */}
      {gridLevels.map((level, li) => {
        const gPts = DNA_VECTORS.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon key={li} points={gPts} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        );
      })}

      {/* Spokes */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.gridX} y2={p.gridY} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      {/* Data fill */}
      <polygon points={polyStr} fill="url(#radarFill)" />

      {/* Data stroke — animated draw-in */}
      <polygon
        points={polyStr}
        fill="none"
        stroke="rgba(200,255,0,0.75)"
        strokeWidth="1.5"
        strokeDasharray={perimeter}
        strokeDashoffset={animated ? 0 : perimeter}
        style={{ transition: animated ? 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
      />

      {/* Data point dots */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x} cy={p.y} r="5"
            fill="var(--bg-base)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity={animated ? 1 : 0}
            style={{ transition: animated ? `opacity 0.3s ease ${300 + i * 100}ms` : 'none' }}
          />
          <circle
            cx={p.x} cy={p.y} r="2.5"
            fill="var(--accent)"
            opacity={animated ? 1 : 0}
            style={{ transition: animated ? `opacity 0.3s ease ${300 + i * 100}ms` : 'none' }}
          />
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
          fontSize="9.5"
          fill="rgba(255,255,255,0.35)"
          fontFamily="IBM Plex Mono, monospace"
          letterSpacing="0.05em"
        >
          {DNA_VECTORS[i].label.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

export function DnaSection() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

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
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div ref={ref} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-32px',
                  background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-hover)',
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
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
                  <RadarChart animated={animated} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — text + bars */}
          <Reveal delay={120}>
            <div>
              <div style={{
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
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}>
                7 vectors.
                <br />
                <span style={{
                  background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
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
                lineHeight: 1.8,
                marginBottom: '32px',
              }}>
                ARE-E decomposes your creative identity into 7 machine-readable vectors
                stored as versioned JSON. Two requests with identical DNA always produce
                outputs in the same stylistic space — your voice at model scale.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DNA_VECTORS.map((v, i) => (
                  <div key={v.label}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3px' }}>
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
                          width: animated ? `${v.value * 100}%` : '0%',
                          height: '100%',
                          background: 'linear-gradient(90deg, rgba(200,255,0,0.6) 0%, var(--accent) 100%)',
                          transition: animated ? `width 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms` : 'none',
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
                background: 'rgba(200,255,0,0.03)',
                border: '1px solid rgba(200,255,0,0.1)',
                borderRadius: '8px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                  DNA is non-portable and proprietary to your account. Grows richer and more accurate with every generation.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default DnaSection;
