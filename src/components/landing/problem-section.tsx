const PROBLEMS = [
  {
    index: '01',
    title: 'Generic output, zero identity',
    body: 'ChatGPT generates the same hollow verses for Drake, Adele, and a 17-year-old bedroom producer. No model knows your metaphor frequency, your banned vocabulary, or your structural signatures.',
    contrast: 'ARE-E maps 7 identity vectors before writing a single word.',
  },
  {
    index: '02',
    title: 'No quality feedback loop',
    body: 'Other tools give you output and walk away. There is no standard for "good" — just vibes and refresh buttons. You iterate blindly until something feels right.',
    contrast: 'ARE-E scores every blueprint against 28 discrete laws with grades and per-law reasoning.',
  },
  {
    index: '03',
    title: 'Your style degrades over time',
    body: 'The more you use generic AI tools, the more your catalog starts to sound like everyone else\'s. Homogenization is the silent cost of convenience.',
    contrast: 'DNA profiles get richer with usage. More data, sharper fingerprint, truer voice.',
  },
];

export function ProblemSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Subtle red glow for "problem" mood */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(255,60,60,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--error)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: 0.8,
          }}>
            The Problem
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            Every AI lyrics tool produces the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FF4444 0%, #FF8080 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              same hollow output.
            </span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
              borderTop: '1px solid var(--border)',
              padding: 'clamp(28px, 3vw, 40px) 0',
            }}>
              {/* Left: problem */}
              <div style={{ paddingRight: '48px', borderRight: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--text-ghost)',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                    paddingTop: '3px',
                  }}>
                    {p.index}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.75,
                    }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: ARE-E solution */}
              <div style={{
                paddingLeft: '48px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  padding: '16px 20px',
                  background: 'rgba(200,255,0,0.03)',
                  border: '1px solid rgba(200,255,0,0.1)',
                  borderRadius: '10px',
                }}>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    color: 'var(--accent)',
                    fontSize: '12px',
                    flexShrink: 0,
                    paddingTop: '1px',
                  }}>◈</span>
                  <p style={{
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 500 }}>ARE-E: </span>
                    {p.contrast}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Mobile stacking */}
      <style>{`
        @media (max-width: 720px) {
          .problem-row { grid-template-columns: 1fr !important; }
          .problem-solution { border-left: none !important; padding-left: 0 !important; padding-top: 20px; }
          .problem-problem { border-right: none !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}

export default ProblemSection;
