import { Reveal } from './scroll-reveal';

const TESTIMONIALS = [
  {
    quote: 'ARE-E is the first tool that actually sounds like me. The DNA system captures my flow in ways I couldn\'t even articulate myself. Every blueprint feels intentional.',
    author: 'Marcus K.',
    role: 'Independent artist',
    stat: '12K streams/mo',
    initials: 'MK',
    color: '#8B5CF6',
  },
  {
    quote: 'We onboarded 6 songwriters in a week. The 28-law scoring alone saves us 3 revision cycles per session. The quality is consistent in a way I\'ve never seen from AI.',
    author: 'Sofia R.',
    role: 'A&R Manager, indie label',
    stat: 'Studio plan',
    initials: 'SR',
    color: '#0EA5E9',
  },
  {
    quote: 'I was skeptical about AI lyrics until I saw my DNA report. It mapped things about my style I\'d never consciously noticed. Now I use it as a co-writer, not a replacement.',
    author: 'Elias M.',
    role: 'Producer & songwriter',
    stat: '80M streams',
    initials: 'EM',
    color: '#F59E0B',
  },
];

const METRICS = [
  { value: '< 4 min',   label: 'avg. time to first A-grade' },
  { value: '93%+',       label: 'margin per generation' },
  { value: '28',         label: 'quality laws per blueprint' },
  { value: '90%',        label: 'cost saved via context cache' },
];

export function SocialProof() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '300px',
        background: 'radial-gradient(ellipse at center bottom, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        {/* Outcome metrics — NOT developer stats */}
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: '80px',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            overflow: 'hidden',
            background: 'var(--bg-elevated)',
          }}>
            {METRICS.map((m, i) => (
              <div key={m.label} style={{
                padding: 'clamp(24px, 3vw, 36px) 28px',
                borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(26px, 3vw, 40px)',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '10px',
                }}>
                  {m.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Section label */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{
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
              fontSize: 'clamp(24px, 3.5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.045em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
            }}>
              Built for artists who take{' '}
              <span style={{
                background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                their craft seriously.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Testimonials */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                height: '100%',
              }}>
                {/* Large quote mark */}
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '52px',
                  color: 'rgba(200,255,0,0.12)',
                  lineHeight: 1,
                  marginBottom: '-16px',
                  userSelect: 'none',
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

                {/* Author with avatar */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: t.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '12px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                  }}>
                    {t.initials}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '1px',
                    }}>
                      {t.author}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'IBM Plex Mono, monospace',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {t.role}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    color: 'var(--accent)',
                    padding: '3px 8px',
                    border: '1px solid rgba(200,255,0,0.18)',
                    borderRadius: '4px',
                    background: 'rgba(200,255,0,0.04)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {t.stat}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SocialProof;
