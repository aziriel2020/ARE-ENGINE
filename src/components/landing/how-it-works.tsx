const STEPS = [
  {
    number: '01',
    glyph: '◉',
    title: 'Extract Vocal DNA',
    body: 'Paste 3–5 lyrics samples or describe your style in natural language. ARE-E decomposes your creative identity into 7 machine-readable vectors: lexical, emotional, rhythmic, thematic, sonic, structural, and influence.',
    detail: 'Stored as versioned JSON. Non-portable. Grows richer with every generation.',
    badge: 'DNA EXTRACTION',
  },
  {
    number: '02',
    glyph: '▶',
    title: 'Generate via 4-Stage Pipeline',
    body: 'Intent Decomposition → Blueprint Generation (Gemini 2.5 Pro with context caching) → 28-Law Quality Scoring → Targeted Re-generation. Every section streams to your screen in real-time.',
    detail: '90% cost reduction on repeat generations via cached DNA context.',
    badge: 'REAL-TIME STREAM',
  },
  {
    number: '03',
    glyph: '◈',
    title: 'Score, Grade & Refine',
    body: 'Every blueprint is evaluated against 28 discrete quality laws scored 0–100. Failed laws trigger automatic re-generation of specific sections — not the whole blueprint. You receive a grade (S/A/B/C/F) with full per-law reasoning.',
    detail: 'Override accepted on any grade. Maximum 2 re-generation cycles. Full transparency.',
    badge: '28-LAW SCORING',
  },
];

export function HowItWorks() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            How It Works
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            Three steps.{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Zero compromise.
            </span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              position: 'relative',
              padding: '40px 32px',
              borderLeft: i === 0 ? '1px solid var(--border)' : 'none',
              borderRight: '1px solid var(--border)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}>

              {/* Step number + badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <span style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--text-ghost)',
                  letterSpacing: '0.1em',
                }}>
                  {step.number}
                </span>
                <span style={{
                  fontSize: '9px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--accent)',
                  letterSpacing: '0.12em',
                  padding: '3px 8px',
                  border: '1px solid rgba(200,255,0,0.2)',
                  borderRadius: '4px',
                  background: 'rgba(200,255,0,0.04)',
                }}>
                  {step.badge}
                </span>
              </div>

              {/* Glyph */}
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--bg-elevated)',
                border: '1px solid rgba(200,255,0,0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 0 20px rgba(200,255,0,0.05)',
              }}>
                <span style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '18px',
                  color: 'var(--accent)',
                }}>
                  {step.glyph}
                </span>
              </div>

              {/* Content */}
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}>
                {step.body}
              </p>

              {/* Detail */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', flexShrink: 0, paddingTop: '1px' }}>→</span>
                <span style={{
                  fontSize: '12px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.6,
                }}>
                  {step.detail}
                </span>
              </div>

              {/* Connector arrow (not on last) */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: '-13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  width: '24px',
                  height: '24px',
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '8px', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>›</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .hiw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default HowItWorks;
