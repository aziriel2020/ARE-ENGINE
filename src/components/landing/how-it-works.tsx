import { Reveal } from './scroll-reveal';

const STEPS = [
  { label: 'Input', title: 'Provide Artist + Theme', text: 'Start minimal, then optionally add advanced direction: instrumentation, vocal role splits, references, and emotional arc.' },
  { label: 'Orchestration', title: 'ARE-E reasons through the full brief', text: 'Gemini 3.1 Pro flagship orchestration handles genre logic, language control, arrangement shape, and structure planning.' },
  { label: 'Delivery', title: 'Receive a full production package', text: 'Get songwriting structure, lyrics, arrangement guidance, and execution-ready prompts in one standardized output.' },
];

export function HowItWorks() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ margin: '0 0 38px', textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(34px, 5vw, 58px)', letterSpacing: '-0.05em', lineHeight: 0.96 }}>
            Three-step premium workflow
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 24, background: 'var(--bg-elevated)', minHeight: 230 }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.11em', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 10 }}>{s.label}</div>
                <h3 style={{ margin: '0 0 12px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 27, lineHeight: 1.05, letterSpacing: '-0.04em' }}>{s.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: 15 }}>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
