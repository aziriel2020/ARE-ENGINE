import { Reveal } from './scroll-reveal';

export function ProblemSection() {
  return (
    <section style={{
      padding: 'clamp(96px, 12vw, 140px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,59,92,0.02) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
              color: 'rgba(255,59,92,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px',
            }}>
              You already know the problem
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)',
              marginBottom: '28px',
            }}>
              You can hear it in two seconds.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF8080 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                That AI sound.
              </span>
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto' }}>
              The forced rhymes. The vague emotion. The lyrics that could belong to anyone.
              Every AI tool writes the same song — because none of them know who you are
              before they start writing.
            </p>
          </div>
        </Reveal>

        {/* The two experiences */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)' }}>

          {/* Left: old way */}
          <Reveal delay={0}>
            <div style={{ padding: '40px 36px', background: 'rgba(255,59,92,0.03)', height: '100%' }}>
              <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'rgba(255,59,92,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="rgba(255,59,92,0.5)" strokeWidth="1"/><path d="M4 4l4 4M8 4l-4 4" stroke="rgba(255,59,92,0.5)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                Every other tool
              </div>
              {[
                'You type a vague prompt.',
                'You get lyrics.',
                'They sound like a template.',
                'You edit for two hours.',
                'You still hate them.',
                'You start over.',
              ].map((line, i) => (
                <div key={i} style={{
                  padding: '12px 0',
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5,
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                }}>
                  <span style={{ color: 'rgba(255,59,92,0.4)', marginTop: '2px', flexShrink: 0, fontSize: '13px' }}>✕</span>
                  {line}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: ARE-E way */}
          <Reveal delay={80}>
            <div style={{ padding: '40px 36px', background: 'rgba(200,255,0,0.02)', borderLeft: '1px solid rgba(200,255,0,0.1)', height: '100%' }}>
              <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'rgba(200,255,0,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5.5" stroke="rgba(200,255,0,0.5)" strokeWidth="1"/><path d="M3.5 6l2 2 3.5-3.5" stroke="rgba(200,255,0,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                With ARE-E
              </div>
              {[
                'You share 5 of your existing lyrics.',
                'We map exactly who you are as an artist.',
                'We generate a complete blueprint — for you.',
                'It comes back graded before you read it.',
                'You refine a draft that already sounds like you.',
                'You\'re done in 20 minutes.',
              ].map((line, i) => (
                <div key={i} style={{
                  padding: '12px 0',
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.5,
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                }}>
                  <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0, fontSize: '13px' }}>✓</span>
                  {line}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bottom truth strip */}
        <Reveal delay={120}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', marginTop: '2px', borderRadius: '0 0 14px 14px', overflow: 'hidden' }}>
            {[
              { stat: '0', text: 'other AI tools map your identity before writing' },
              { stat: '0', text: 'other AI tools grade your output automatically' },
              { stat: '0', text: 'other AI tools get better the more you use them' },
            ].map((t, i) => (
              <div key={i} style={{ padding: '24px 20px', background: 'var(--bg-surface)', textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: '40px', color: 'rgba(255,59,92,0.7)', letterSpacing: '-0.06em', lineHeight: 1, marginBottom: '10px',
                }}>
                  {t.stat}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6 }}>
                  {t.text}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default ProblemSection;
