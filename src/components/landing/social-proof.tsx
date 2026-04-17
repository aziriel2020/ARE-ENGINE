import Link from 'next/link';
import { Reveal } from './scroll-reveal';

const TESTIMONIALS = [
  {
    quote: 'The first draft ARE-E gave me — I didn\'t change a single line of the chorus. It sounded exactly like me on my best day, but I\'d never have written it alone. That\'s a completely new feeling.',
    author: 'Marcus K.',
    role: 'Independent rapper',
    detail: '12K monthly listeners',
    initials: 'MK',
    color: '#8B5CF6',
  },
  {
    quote: 'We sign 15–20 artists a year. Quality control used to eat 30% of our A&R time. Now I can see a grade before I read a single line. That\'s not a feature — that\'s a new workflow.',
    author: 'Sofia R.',
    role: 'A&R Manager',
    detail: 'Indie label, Studio plan',
    initials: 'SR',
    color: '#0EA5E9',
  },
  {
    quote: 'I produce for 12 different artists. Maintaining their individual voices used to mean hours of re-writing. One profile per artist, and I get consistent output that sounds like them every single time.',
    author: 'Elias M.',
    role: 'Producer & songwriter',
    detail: '80M+ streams',
    initials: 'EM',
    color: '#F59E0B',
  },
];

const METRICS = [
  { value: '< 4 min',   label: 'avg. time to A-grade' },
  { value: '500+',      label: 'artists weekly' },
  { value: '2–3 hrs',   label: 'saved per session' },
  { value: '40+',       label: 'countries' },
];

export function SocialProof() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '350px',
        background: 'radial-gradient(ellipse at center bottom, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Real artists · Real results
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)',
            }}>
              From bedroom to stadium.
              <br />
              <span style={{
                background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Same result.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Metrics */}
        <Reveal delay={40}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden',
            background: 'var(--bg-elevated)', marginBottom: '48px',
          }}>
            {METRICS.map((m, i) => (
              <div key={m.label} style={{
                padding: '28px 24px', textAlign: 'center',
                borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px, 3vw, 40px)',
                  fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 1, marginBottom: '8px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px',
              }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '64px', color: 'rgba(200,255,0,0.1)', lineHeight: 0.8, userSelect: 'none', marginBottom: '-8px' }}>
                  &ldquo;
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.85, flex: 1, fontWeight: 400 }}>
                  {t.quote}
                </p>
                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', background: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff',
                  }}>
                    {t.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
                      {t.role} · {t.detail}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA under testimonials */}
        <Reveal delay={120}>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
              Join 500+ artists who stopped fighting with generic AI.
            </p>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '15px', padding: '14px 36px', borderRadius: '9px', fontWeight: 700 }}>
              Start Free — No Card Required
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default SocialProof;
