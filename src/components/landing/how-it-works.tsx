import { Reveal } from './scroll-reveal';
import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    eyebrow: 'VOCAL DNA',
    headline: 'The AI knows who you are before it writes a single word.',
    body: 'Every other AI starts with your prompt. ARE starts with you. Before writing, it maps your creative identity across 7 dimensions: your emotional core, geographic and cultural register, flow and delivery signature, imagery world, vocabulary density, generational codes, and the central contradiction that makes you human. That map — your Vocal DNA — shapes every line.',
    proof: 'Artists describe the first output as "a collaborator who\'s known my work for years."',
    detail: '7-dimension identity mapping · Vocal DNA built before word one',
    color: 'var(--accent)',
  },
  {
    number: '02',
    eyebrow: 'THE THREE LAWS',
    headline: 'The Ghost Line. The Ugly Emotion. The Tear-Drop Detail.',
    body: 'These three elements appear in every song ARE generates — no exceptions. The Ghost Line is the truth the narrator can\'t say out loud, whose absence creates depth. The Ugly Emotion is the shameful, selfish feeling that makes it human. The Tear-Drop Detail is the physical object or gesture that breaks you. Together they\'re why ARE lyrics make listeners feel found, not impressed.',
    proof: '"My bridge made me uncomfortable. That\'s how I knew it was real." — beta songwriter.',
    detail: 'Ghost Line + Ugly Emotion + Tear-Drop Detail · Mandatory in every generation',
    color: 'var(--success)',
  },
  {
    number: '03',
    eyebrow: 'THE COMPLETE PACKAGE',
    headline: 'Not just lyrics. 10 complete blocks. Ready to record.',
    body: 'ARE delivers a full professional package every time: emotional architecture and theme analysis, Artist DNA extraction, complete lyrics with inline rhyme documentation, production blueprint (BPM, key, instrument stack, mix specs), energy curve, hook analysis, brutal 100/100 quality audit, Suno and Udio AI prompts ready to paste, and a release strategy with cultural timing. One generation. Everything done.',
    proof: 'Average time from input to complete 10-block output: under 4 minutes.',
    detail: '10 blocks per output · Suno + Udio prompts included · French and English both fully supported',
    color: 'var(--info)',
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '0', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              How ARE works
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)' }}>
              Three things no other
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                tool gives you.
              </span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                borderTop: '1px solid var(--border)',
                padding: 'clamp(48px, 6vw, 72px) 0',
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: 'clamp(80px, 10vw, 130px)', letterSpacing: '-0.08em',
                  color: item.color, opacity: 0.07, lineHeight: 1,
                  userSelect: 'none', paddingTop: '8px',
                }}>
                  {item.number}
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: item.color, letterSpacing: '0.15em', marginBottom: '16px', opacity: 0.8 }}>
                    {item.eyebrow}
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.045em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px' }}>
                    {item.headline}
                  </h3>
                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '20px' }}>
                    {item.body}
                  </p>
                  <div style={{ display: 'inline-flex', gap: '10px', alignItems: 'flex-start', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', marginBottom: '14px' }}>
                    <span style={{ color: item.color, fontSize: '12px', flexShrink: 0, paddingTop: '2px' }}>→</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6, fontStyle: 'italic' }}>
                      {item.proof}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: item.color, opacity: 0.55, letterSpacing: '0.04em' }}>
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
