import { Reveal } from './scroll-reveal';
import Link from 'next/link';

const OUTCOMES = [
  {
    number: '01',
    eyebrow: 'YOUR IDENTITY',
    headline: 'The AI finally knows who you are.',
    body: 'Before generating a single word, ARE-E maps your creative identity — your vocabulary, your emotional axis, your rhythmic fingerprint — into a private profile that shapes everything we write for you. Not a prompt. A fingerprint. And it sharpens every time you use it.',
    proof: 'Artists report their first blueprint sounds like a collaborator who\'s known them for years.',
    color: 'var(--accent)',
  },
  {
    number: '02',
    eyebrow: 'YOUR QUALITY',
    headline: 'Every draft graded before you read it.',
    body: 'You\'ve never seen an AI tool do this: 28 quality checkpoints run automatically on every blueprint. Weak sections rewrite themselves before you ever see them. You receive a graded draft — Grade A or better — not raw output you have to fix for hours.',
    proof: 'Average time from click to A-grade blueprint: under 4 minutes.',
    color: 'var(--success)',
  },
  {
    number: '03',
    eyebrow: 'YOUR TIME',
    headline: 'From blank page to done. In minutes.',
    body: 'Stop spending entire nights on a first draft that still sounds wrong. Watch your blueprint appear word by word, section by section, live in your browser. Pick it up, refine it, make it yours — you\'re doing the creative work that matters, not the mechanical work that drains you.',
    proof: 'Users report saving 2–3 hours per session versus writing from scratch.',
    color: 'var(--info)',
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: '0', right: '-100px', width: '600px', height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              What you actually get
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)',
            }}>
              Three things no other
              <br />
              <span style={{
                background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                tool gives you.
              </span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {OUTCOMES.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                gap: '0', borderTop: '1px solid var(--border)',
                padding: 'clamp(48px, 6vw, 72px) 0',
                position: 'relative',
              }}>
                {/* Number */}
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(80px, 10vw, 130px)', letterSpacing: '-0.08em',
                  color: item.color, opacity: 0.07, lineHeight: 1,
                  userSelect: 'none', paddingTop: '8px',
                }}>
                  {item.number}
                </div>

                {/* Content */}
                <div style={{ paddingLeft: '0' }}>
                  <div style={{
                    fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
                    color: item.color, letterSpacing: '0.15em', marginBottom: '16px', opacity: 0.8,
                  }}>
                    {item.eyebrow}
                  </div>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px, 3vw, 38px)',
                    fontWeight: 700, letterSpacing: '-0.045em', color: 'var(--text-primary)',
                    lineHeight: 1.1, marginBottom: '20px',
                  }}>
                    {item.headline}
                  </h3>
                  <p style={{
                    fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8,
                    maxWidth: '560px', marginBottom: '24px',
                  }}>
                    {item.body}
                  </p>
                  <div style={{
                    display: 'inline-flex', gap: '10px', alignItems: 'flex-start',
                    padding: '12px 16px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                  }}>
                    <span style={{ color: item.color, fontSize: '12px', flexShrink: 0, paddingTop: '2px' }}>→</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6, fontStyle: 'italic' }}>
                      {item.proof}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>

        <Reveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '15px', padding: '14px 36px', borderRadius: '9px', fontWeight: 700 }}>
              Get All Three — Free
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

export default HowItWorks;
