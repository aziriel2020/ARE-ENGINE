import Link from 'next/link';

export function CtaSection() {
  return (
    <section style={{ padding: 'clamp(120px, 14vw, 180px) 32px', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '1000px', height: '800px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.09) 0%, rgba(200,255,0,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <div style={{
          fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px',
        }}>
          Your move
        </div>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 8vw, 108px)',
          fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.92,
          color: 'var(--text-primary)', marginBottom: '40px',
        }}>
          The song you&apos;ve been
          <br />
          trying to write is
          <br />
          <span style={{
            background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 50%, #E8FF80 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            5 minutes away.
          </span>
        </h2>

        <p style={{
          fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.75,
          maxWidth: '540px', margin: '0 auto 52px',
        }}>
          Map your voice. Generate your first blueprint. See what it feels like
          to get back a draft that actually sounds like you.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/sign-up" className="btn-primary" style={{
            fontSize: '17px', padding: '16px 48px', borderRadius: '10px',
            display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 700,
          }}>
            Start Writing Free
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/pricing" className="btn-ghost" style={{ fontSize: '15px', padding: '15px 32px', borderRadius: '10px' }}>
            View Pricing
          </Link>
        </div>

        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.06em' }}>
          5 free blueprints · No credit card · Cancel whenever
        </p>

        {/* Trust strip */}
        <div style={{
          marginTop: '80px', paddingTop: '52px', borderTop: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
        }}>
          {[
            { glyph: '◈', title: 'Powered by the best', sub: 'Gemini 2.5 Pro on every generation — no shortcuts' },
            { glyph: '◉', title: 'Graded, not guessed', sub: '28 quality checks before you see a single word' },
            { glyph: '▶', title: 'Watch it happen live', sub: 'Every word streams to your screen in real time' },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '24px 20px', background: 'var(--bg-elevated)',
              border: '1px solid var(--border)', borderRadius: '12px',
            }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '18px', color: 'var(--accent)', display: 'block', marginBottom: '12px' }}>
                {item.glyph}
              </span>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CtaSection;
