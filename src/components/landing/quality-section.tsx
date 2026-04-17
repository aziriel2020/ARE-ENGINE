import { Reveal } from './scroll-reveal';

const BLOCKS = [
  'Creative thesis + emotional arc',
  'Section-by-section songwriting architecture',
  'Hook strategy + recall moments',
  'Arrangement intent + instrument strategy',
  'Role mapping for solo/duet/trio/band',
  'Performance direction and delivery notes',
  'Generation prompts for downstream systems',
  'Quality scoring and improvement targets',
  'Variation routes for alternate takes',
  'Execution summary for production teams',
];

export function QualitySection() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', backgroundImage: "url('/brand/cinematic-waves.svg')", backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,8,12,0.82)' }} />
      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 42 }}>
            <h2 style={{ margin: '0 0 14px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(34px, 5vw, 58px)', letterSpacing: '-0.05em', lineHeight: 0.96 }}>
              Full package. Professional structure.
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75 }}>
              This is designed to replace scattered creative workflows with one decisive, production-ready system.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: 18, overflow: 'hidden', background: 'rgba(14,18,24,0.72)' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              10-block generation output
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
              {BLOCKS.map((item, idx) => (
                <div key={item} style={{ padding: '14px 18px', borderTop: idx > 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', borderRight: idx % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', fontSize: 14, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', marginRight: 8 }}>{String(idx + 1).padStart(2, '0')}</span>{item}
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
