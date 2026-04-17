import { Reveal } from './scroll-reveal';

const DELIVERABLES = [
  {
    title: 'Songwriting Architecture',
    points: ['Story arc and emotional progression', 'Section-by-section lyric structure', 'Hook strategy for replay value'],
  },
  {
    title: 'Production Direction',
    points: ['BPM / key / arrangement guidance', 'Instrument stack and texture plan', 'Role split for solo, duet, trio, or band'],
  },
  {
    title: 'Generation-Ready Specs',
    points: ['Prompt blocks for AI music systems', 'Performance intent and vocal direction', 'Regeneration targets if needed'],
  },
];

const CHECKS = [
  'Alignment check against your requested artist direction',
  'Theme coherence check from intro to outro',
  'Language and phrasing consistency check',
  'Arrangement viability check for real production',
  'Commercial clarity check (hook + payoff)',
  'Final package formatting check for execution speed',
];

export function QualitySection() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/brand/cinematic-waves.svg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.55, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,8,10,0.76) 0%, rgba(7,8,10,0.9) 100%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              What you get
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)', marginBottom: '16px' }}>
              A full professional package.
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Not just a draft lyric.
              </span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '740px', margin: '0 auto' }}>
              Enter two parameters — <strong style={{ color: 'var(--text-primary)' }}>Artist + Theme</strong> — and optionally go deep with your own details. ARE-E returns a production-grade structure built for speed, quality, and execution.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '26px' }}>
            {DELIVERABLES.map((card) => (
              <div key={card.title} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '24px' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', letterSpacing: '-0.02em', marginBottom: '14px', color: 'var(--text-primary)' }}>{card.title}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {card.points.map((point) => (
                    <li key={point} style={{ display: 'flex', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--accent)' }}>✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg-surface)', padding: '24px' }}>
            <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Internal validation before delivery
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 18px' }}>
              {CHECKS.map((check) => (
                <div key={check} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)' }}>•</span>
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default QualitySection;
