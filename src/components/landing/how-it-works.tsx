import { Reveal } from './scroll-reveal';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    eyebrow: 'INPUT',
    headline: 'Start with Artist + Theme. Add any detail you want.',
    body: 'You can keep it minimal (two parameters) or go deep with mood arcs, instrumentation wishes, cultural references, vocal roles, and delivery constraints. The system scales from simple to expert-level briefs.',
    detail: 'Fast start for beginners · deep control for professionals',
    color: 'var(--accent)',
  },
  {
    number: '02',
    eyebrow: 'INTELLIGENCE',
    headline: 'ARE-E interprets intent across genre, language, and arrangement.',
    body: 'The engine is designed for global music creation: cross-genre hybrids, local slang layers, orchestral/cinematic directions, electronic structures, and ensemble formats like duet, trio, and band writing.',
    detail: 'Genre and sub-genre coverage · single artist to full ensemble',
    color: 'var(--success)',
  },
  {
    number: '03',
    eyebrow: 'OUTPUT',
    headline: 'Receive a full production package in one generation.',
    body: 'Each run returns a complete structure: songwriting package, role-aware performance intent, arrangement guidance, and executable generation prompts. The pipeline is built to run on Gemini 3.1 Pro for high-fidelity reasoning and composition planning.',
    detail: 'Built for production value, not demo text',
    color: 'var(--info)',
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Workflow
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)' }}>
              Simple to start.
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Powerful at full depth.
              </span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', borderTop: '1px solid var(--border)', padding: 'clamp(48px, 6vw, 72px) 0' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(80px, 10vw, 130px)', letterSpacing: '-0.08em', color: item.color, opacity: 0.07, lineHeight: 1, userSelect: 'none', paddingTop: '8px' }}>
                  {item.number}
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: item.color, letterSpacing: '0.15em', marginBottom: '16px', opacity: 0.8 }}>
                    {item.eyebrow}
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.045em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px' }}>
                    {item.headline}
                  </h3>
                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '620px', marginBottom: '14px' }}>
                    {item.body}
                  </p>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: item.color, opacity: 0.65, letterSpacing: '0.04em' }}>
                    {item.detail}
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
              Create My First Package
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HowItWorks;
