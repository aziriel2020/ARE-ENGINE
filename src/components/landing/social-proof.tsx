const TESTIMONIALS = [
  {
    quote: 'ARE-E is the first tool that actually sounds like me. The DNA system captures my flow in ways I couldn\'t even articulate myself. Every blueprint feels intentional.',
    author: 'Marcus K.',
    role: 'Independent artist',
    stat: '12K streams/mo',
  },
  {
    quote: 'We onboarded 6 songwriters in a week. The 28-law scoring alone saves us 3 revision cycles per session. The quality is consistent in a way I\'ve never seen from AI.',
    author: 'Sofia R.',
    role: 'A&R Manager',
    stat: 'Indie label',
  },
  {
    quote: 'I was skeptical about AI lyrics until I saw my DNA report. It mapped things about my style I\'d never consciously noticed. Now I use it as a co-writer, not a replacement.',
    author: 'Elias M.',
    role: 'Producer & songwriter',
    stat: '80M streams',
  },
];

const METRICS = [
  { value: '28',    label: 'Quality laws per blueprint' },
  { value: '93%+',  label: 'Margin per generation' },
  { value: '90%',   label: 'Cost reduction via cache' },
  { value: '4',     label: 'Generation pipeline stages' },
];

export function SocialProof() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '300px',
        background: 'radial-gradient(ellipse at center bottom, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        {/* Metrics bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          marginBottom: '72px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'var(--bg-elevated)',
        }}>
          {METRICS.map((m, i) => (
            <div key={m.label} style={{
              padding: '28px 24px',
              borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                {m.value}
              </div>
              <div style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                fontFamily: 'IBM Plex Mono, monospace',
                letterSpacing: '0.04em',
                lineHeight: 1.4,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            From Artists & Teams
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            Built for artists who take{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              their craft seriously.
            </span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'border-color 200ms ease, box-shadow 200ms ease',
            }}>
              {/* Quote mark */}
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '48px',
                color: 'rgba(200,255,0,0.15)',
                lineHeight: 1,
                marginBottom: '-12px',
              }}>
                &ldquo;
              </div>

              <p style={{
                fontSize: '14px',
                color: 'var(--text-primary)',
                lineHeight: 1.8,
                flex: 1,
              }}>
                {t.quote}
              </p>

              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    marginBottom: '2px',
                  }}>
                    {t.author}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}>
                    {t.role}
                  </div>
                </div>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--accent)',
                  padding: '3px 8px',
                  border: '1px solid rgba(200,255,0,0.2)',
                  borderRadius: '4px',
                  background: 'rgba(200,255,0,0.04)',
                  letterSpacing: '0.05em',
                }}>
                  {t.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

export default SocialProof;
