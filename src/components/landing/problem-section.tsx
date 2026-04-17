import { Reveal } from './scroll-reveal';

const BUSINESS_OUTCOMES = [
  { title: 'Faster release velocity', text: 'Move from creative brief to executable package in minutes instead of fragmented multi-tool workflows.' },
  { title: 'Higher output consistency', text: 'Maintain quality and brand voice across artists, catalogs, and campaign formats.' },
  { title: 'Global market coverage', text: 'Create across languages, genres, and regional styles with one production system.' },
  { title: 'Enterprise-ready structure', text: 'Standardized outputs for creators, A&R, producers, and operations teams.' },
];

export function ProblemSection() {
  return (
    <section id="value" style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 14 }}>
              Business Value
            </div>
            <h2 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(34px, 5vw, 62px)', letterSpacing: '-0.05em', lineHeight: 0.97 }}>
              People don&apos;t pay for technology.
              <br />
              <span style={{ background: 'linear-gradient(120deg,#C8FF00 0%, #8DFF2F 45%, #6AE6FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                They pay for finished output.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
            {BUSINESS_OUTCOMES.map((item) => (
              <div key={item.title} style={{ border: '1px solid var(--border)', borderRadius: 14, padding: 24, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))' }}>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, letterSpacing: '-0.03em' }}>{item.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 15 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ProblemSection;
