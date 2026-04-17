import { Reveal } from './scroll-reveal';

const LEFT = [
  'Generic prompts with no artist identity model',
  'Weak output outside one language or one market',
  'No serious path from idea to production details',
  'No support for ensemble writing (duet / trio / band)',
  'No consistent quality control before delivery',
  'You still spend hours rewriting everything',
];

const RIGHT = [
  'Starts with 2 inputs: Artist + Theme, then expands with your optional direction',
  'Designed for all languages, global scenes, and hybrid styles',
  'Returns a professional package: writing + musical intent + generation specs',
  'Can design role-aware parts for lead voice, harmonies, duet, trio, or band',
  'Runs an internal quality pipeline before final output is returned',
  'Built to reduce production time from concept to usable draft',
];

const TRUTHS = [
  { stat: '2', text: 'parameters to launch (Artist + Theme)' },
  { stat: '10', text: 'structured output blocks in each generation package' },
  { stat: 'Global', text: 'coverage across language, genre, and instrumentation systems' },
];

export function ProblemSection() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Why creators switch
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)', marginBottom: '20px' }}>
              People don&apos;t buy "AI".
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                They buy finished songs faster.
              </span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.75 }}>
              ARE-E focuses on what matters commercially: clear direction in, production-ready value out.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(255,59,92,0.03)', padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--error)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--error)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Typical generators
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {LEFT.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--error)', fontSize: '14px', flexShrink: 0, marginTop: '2px', opacity: 0.7 }}>✕</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(200,255,0,0.02)', padding: '36px 32px', borderLeft: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ARE-E system
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {RIGHT.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}>
            {TRUTHS.map((t, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 1, marginBottom: '8px' }}>
                  {t.stat}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5 }}>
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
