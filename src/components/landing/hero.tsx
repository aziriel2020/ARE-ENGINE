import Link from 'next/link';

const PILLARS = [
  '2-input start: Artist + Theme',
  'All genres, sub-genres, and languages',
  'Solo / Duet / Trio / Full band modes',
  'Gemini 3.1 Pro flagship orchestration',
];

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(120px, 14vw, 180px) 32px clamp(90px, 10vw, 130px)',
        backgroundImage: "url('/brand/aurora-grid.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(165deg, rgba(5,6,10,0.35) 0%, rgba(5,6,10,0.9) 78%)' }} />

      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'stretch' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(200,255,0,0.26)', background: 'rgba(200,255,0,0.08)', borderRadius: '999px', padding: '6px 14px', marginBottom: '24px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: 11, letterSpacing: '0.08em', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-secondary)' }}>
                Built for premium music businesses
              </span>
            </div>

            <h1 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(52px, 8vw, 110px)', lineHeight: 0.92, letterSpacing: '-0.055em', color: 'var(--text-primary)' }}>
              Billion-dollar
              <br />
              <span style={{ background: 'linear-gradient(120deg,#C8FF00 0%, #8DFF2F 45%, #6AE6FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                song production
              </span>
              <br />
              starts with 2 words.
            </h1>

            <p style={{ marginTop: '24px', fontSize: 18, lineHeight: 1.8, maxWidth: 700, color: 'var(--text-secondary)' }}>
              Enter <strong style={{ color: 'var(--text-primary)' }}>Artist + Theme</strong>. ANIMAENGINE transforms it into a full professional package: structure, lyrics, arrangement logic, instrument direction, and execution-ready prompts.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <Link href="/sign-up" className="btn-primary" style={{ padding: '16px 34px', borderRadius: 10, fontWeight: 700, fontSize: 16 }}>
                Launch First Generation
              </Link>
              <Link href="#value" className="btn" style={{ padding: '15px 26px', borderRadius: 10, fontSize: 15 }}>
                See what you get
              </Link>
            </div>
          </div>

          <div style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'linear-gradient(180deg, rgba(20,24,30,0.84) 0%, rgba(11,13,18,0.94) 100%)', borderRadius: 18, padding: 24, boxShadow: '0 25px 60px rgba(0,0,0,0.45)' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 14 }}>
              Value Snapshot
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {PILLARS.map((pillar) => (
                <div key={pillar} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', background: 'rgba(255,255,255,0.01)' }}>
                  <span style={{ color: 'var(--accent)' }}>✦</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5 }}>{pillar}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, borderTop: '1px solid var(--border)', paddingTop: 14, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>10</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>output blocks per generation</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>Any</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>instrument family coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
