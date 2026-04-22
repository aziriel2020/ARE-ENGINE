import { Reveal } from './scroll-reveal';

const LINES = [
  { text: 'Every AI tool is making music worse.', accent: false },
  { text: "ANIMAENGINE is built to reverse that.", accent: true },
];

const TRUTHS = [
  {
    stat: '94%',
    claim: 'of AI lyrics are indistinguishable from each other — by design',
    sub: 'They trained on the same data. They produce the same output. Same clichés, same structure, same dead metaphors — regardless of who\'s asking.',
  },
  {
    stat: '$0',
    claim: 'of value from a tool that doesn\'t know who you are before it writes',
    sub: 'Knowing your style isn\'t a feature. It\'s the baseline. ANIMAENGINE built the entire pipeline around your identity — not around a prompt.',
  },
  {
    stat: '∞',
    claim: 'return on a tool that makes your voice sharper with every single use',
    sub: 'Voice profiles compound. Quality scores improve. Every generation makes the next one better. That\'s the opposite of how AI usually works.',
  },
];

export function ManifestoSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 140px) 32px',
      position: 'relative', overflow: 'hidden', background: 'var(--bg-void)',
    }}>

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(200,255,0,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: '0', left: '0', right: '0', height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, var(--border-hover) 30%, var(--accent) 50%, var(--border-hover) 70%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '0', left: '0', right: '0', height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, var(--border-hover) 30%, var(--accent) 50%, var(--border-hover) 70%, transparent 100%)',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px',
            }}>
              The State of AI Music — And Why It Has to Change
            </div>
            {LINES.map((line, i) => (
              <div key={i} style={{
                fontSize: 'clamp(36px, 6vw, 80px)',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                letterSpacing: '-0.05em', lineHeight: 0.95,
                marginBottom: i === 0 ? '12px' : '0',
                color: line.accent ? 'transparent' : 'var(--text-primary)',
                background: line.accent ? 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 50%, #E8FF80 100%)' : 'none',
                WebkitBackgroundClip: line.accent ? 'text' : 'unset',
                WebkitTextFillColor: line.accent ? 'transparent' : 'unset',
                backgroundClip: line.accent ? 'text' : 'unset',
              }}>
                {line.text}
              </div>
            ))}

            <p style={{
              fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.8,
              maxWidth: '560px', margin: '40px auto 0',
            }}>
              Artists deserve tools that amplify their identity — not erase it.
              The music industry doesn&apos;t need more content. It needs more character.
              ANIMAENGINE is how you keep yours.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px', background: 'var(--border)', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)',
        }}>
          {TRUTHS.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: '36px 32px', background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: i === 1 ? 'linear-gradient(90deg, transparent, var(--accent), transparent)' : 'transparent',
                }} />

                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(44px, 5vw, 64px)', letterSpacing: '-0.06em',
                  lineHeight: 1, color: 'var(--accent)', marginBottom: '16px',
                }}>
                  {t.stat}
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500, marginBottom: '12px' }}>
                  {t.claim}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.7 }}>
                  {t.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ManifestoSection;
