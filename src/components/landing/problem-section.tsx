import { Reveal } from './scroll-reveal';

const LEFT = [
  'Writes in generic, borrowed vocabulary — not yours',
  'Pulls clichés from a pool of 10 million overused lines',
  'Has no idea who you are as an artist',
  'Names emotions instead of showing them',
  'Gives you raw text you spend hours trying to fix',
  'Sounds like AI doing an impression of a songwriter',
];

const RIGHT = [
  'Builds your Vocal DNA (7 dimensions) before word one',
  '220+ banned clichés — each replaced with a living alternative',
  'Maps your emotional axis, imagery world, register, flow',
  'Camera rule: films actions and objects, never names feelings',
  'Delivers 10 complete blocks — lyrics to release strategy',
  'Passes 16 Supreme Laws + 10 Perfection Modules. Or rewrites.',
];

const TRUTHS = [
  { stat: '0', text: 'other AI tools build your Vocal DNA before writing' },
  { stat: '0', text: 'other AI tools have a 220+ cliché kill list per language' },
  { stat: '0', text: 'other AI tools deliver a production blueprint + Suno/Udio prompts' },
];

export function ProblemSection() {
  return (
    <section style={{
      padding: 'clamp(96px, 12vw, 140px) 32px',
      borderTop: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{ position: 'absolute', top: '10%', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(255,59,92,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              The problem
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)', marginBottom: '20px' }}>
              You already know what&apos;s wrong.
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                It doesn&apos;t sound like you.
              </span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
              Every AI tool writes the same song for everyone. Because they never ask who you are first.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>

            {/* Left — every other AI */}
            <div style={{ background: 'rgba(255,59,92,0.03)', padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--error)', boxShadow: '0 0 6px rgba(255,59,92,0.5)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--error)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Every other AI tool
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

            {/* Right — ARE */}
            <div style={{ background: 'rgba(200,255,0,0.02)', padding: '36px 32px', borderLeft: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px rgba(200,255,0,0.5)' }} />
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Acoustic Reality Engine
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

        {/* Truth strip */}
        <Reveal delay={120}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}>
            {TRUTHS.map((t, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '40px', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 1, marginBottom: '8px' }}>
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
