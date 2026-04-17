import Link from 'next/link';
import { Reveal } from './scroll-reveal';

const TESTIMONIALS = [
  {
    quote: 'We stopped briefing five tools for one release. ARE-E gives us the songwriting logic, arrangement path, and execution prompts in one package.',
    author: 'Nadia K.',
    role: 'Executive Producer',
    detail: 'Global catalog team',
    initials: 'NK',
    color: '#8B5CF6',
  },
  {
    quote: 'The power is range. Pop, drill, cinematic, hybrid orchestral — we can brief everything from one interface and keep quality predictable.',
    author: 'Marco L.',
    role: 'Music Director',
    detail: 'Film & media studio',
    initials: 'ML',
    color: '#F59E0B',
  },
  {
    quote: 'The duet and trio role logic is what sold us. We now create voice-part structures much faster for real sessions.',
    author: 'Ari V.',
    role: 'A&R + Song Camp Lead',
    detail: 'Multi-artist roster',
    initials: 'AV',
    color: '#0EA5E9',
  },
  {
    quote: 'From Hans Zimmer-inspired cinematic concepts to modern commercial hooks, the system handles both ends without collapsing into generic output.',
    author: 'Lea R.',
    role: 'Composer / Producer',
    detail: 'Trailer + streaming projects',
    initials: 'LR',
    color: '#10B981',
  },
  {
    quote: 'We launch with two parameters and scale depth only when needed. That makes the workflow usable for both juniors and senior creatives.',
    author: 'Daniel S.',
    role: 'Head of Creative Ops',
    detail: 'Label-tech pipeline',
    initials: 'DS',
    color: '#EC4899',
  },
  {
    quote: 'Fast briefing, global language coverage, real arrangement guidance: this is productized creative infrastructure, not a toy generator.',
    author: 'Mina T.',
    role: 'Founder',
    detail: 'AI-native music startup',
    initials: 'MT',
    color: '#6366F1',
  },
];

const METRICS = [
  { value: '2', label: 'core inputs to launch (Artist + Theme)' },
  { value: '10', label: 'structured output blocks per generation' },
  { value: 'Any', label: 'genre, sub-genre, and language coverage' },
  { value: 'Pro', label: 'package built for production execution' },
];

export function SocialProof() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/brand/spotlight-noise.svg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,8,10,0.74) 0%, rgba(7,8,10,0.88) 100%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Market feedback
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)' }}>
              Teams use ARE-E because it ships.
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Fast brief in. Usable package out.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={40}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', background: 'var(--bg-elevated)', marginBottom: '48px' }}>
            {METRICS.map((m, i) => (
              <div key={m.label} style={{ padding: '28px 24px', textAlign: 'center', borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(20px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 1, marginBottom: '8px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px', height: '100%' }}>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.75, flex: 1 }}>{t.quote}</p>
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff' }}>
                    {t.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{t.author}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>{t.role} · {t.detail}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '15px', padding: '14px 36px', borderRadius: '9px', fontWeight: 700 }}>
              Start with Artist + Theme
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default SocialProof;
