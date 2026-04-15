const SAMPLE_LAWS = [
  { id: 1,  name: 'No AI Clichés',           score: 92, passed: true },
  { id: 2,  name: 'Concrete Sensory Detail',  score: 88, passed: true },
  { id: 11, name: 'Opening Line Hook',        score: 95, passed: true },
  { id: 12, name: 'Show Don\'t Tell Ratio',   score: 84, passed: true },
  { id: 15, name: 'DNA Lexical Alignment',    score: 91, passed: true },
  { id: 20, name: 'No Forced Perfect Rhymes', score: 55, passed: false },
  { id: 21, name: 'No Greeting Card Lines',   score: 96, passed: true },
  { id: 25, name: 'Metaphor Freshness',       score: 89, passed: true },
];

export function QualitySection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}>

          {/* LEFT — copy */}
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
              Quality Guarantee
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}>
              28 laws. Every blueprint.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                No exceptions.
              </span>
            </h2>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '20px',
            }}>
              The 28-Law methodology is not a system prompt — it&apos;s a post-generation
              scoring rubric. Every blueprint is evaluated after generation against 28
              quality dimensions, scored 0–100, with aggregate pass/fail logic.
            </p>
            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '40px',
            }}>
              Failed laws trigger <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>targeted re-generation of specific sections</strong> —
              not the whole blueprint. Maximum 2 re-generation cycles. Final grade with full per-law reasoning.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Scored 0–100 per law with reasoning',
                'Grade S / A / B / C / F displayed',
                'Automatic targeted re-generation on fail',
                'Full override control — accept any grade',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(200,255,0,0.1)',
                    border: '1px solid rgba(200,255,0,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — quality report widget */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-hover)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
          }}>

            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg-elevated)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}>
                  Quality Report
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                  Nuits Froides
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--text-tertiary)',
                  marginBottom: '2px',
                }}>
                  88/100
                </div>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '24px',
                  color: 'var(--success)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}>
                  A
                </div>
              </div>
            </div>

            {/* Score bar */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>Overall score</span>
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--success)' }}>7/8 laws passed</span>
              </div>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  width: '88%',
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--success) 0%, var(--accent) 100%)',
                  borderRadius: '2px',
                }} />
              </div>
            </div>

            {/* Law rows */}
            {SAMPLE_LAWS.map((law, i) => (
              <div key={law.id} style={{
                padding: '9px 20px',
                borderBottom: i < SAMPLE_LAWS.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                background: law.passed ? 'transparent' : 'rgba(255,60,60,0.02)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: law.passed ? 'var(--success)' : 'var(--error)',
                    boxShadow: law.passed ? '0 0 4px rgba(0,255,136,0.5)' : '0 0 4px rgba(255,60,60,0.5)',
                  }} />
                  <span style={{
                    fontSize: '12px',
                    color: law.passed ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {law.id.toString().padStart(2, '0')}. {law.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <div style={{
                    width: '56px',
                    height: '3px',
                    background: 'var(--border)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${law.score}%`,
                      height: '100%',
                      background: law.passed ? 'var(--success)' : 'var(--error)',
                      opacity: 0.85,
                    }} />
                  </div>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: law.passed ? 'var(--text-tertiary)' : 'var(--error)',
                    minWidth: '28px',
                    textAlign: 'right',
                  }}>
                    {law.score}
                  </span>
                </div>
              </div>
            ))}

            <div style={{ padding: '10px 20px' }}>
              <span style={{
                fontSize: '11px',
                color: 'var(--text-ghost)',
                fontFamily: 'IBM Plex Mono, monospace',
              }}>
                + 20 more laws evaluated
              </span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .quality-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default QualitySection;
