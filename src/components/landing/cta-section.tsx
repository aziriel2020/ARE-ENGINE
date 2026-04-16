import Link from 'next/link';

export function CtaSection() {
  return (
    <section style={{
      padding: 'clamp(96px, 12vw, 160px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Large center glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '700px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, rgba(200,255,0,0.025) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Fine grid pattern — masked to center ellipse */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 10%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}>

        {/* Icon */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          background: 'rgba(200,255,0,0.08)',
          border: '1px solid rgba(200,255,0,0.2)',
          borderRadius: '14px',
          marginBottom: '36px',
          boxShadow: '0 0 40px rgba(200,255,0,0.1)',
        }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '22px', color: 'var(--accent)' }}>◈</span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(44px, 7vw, 96px)',
          fontWeight: 700,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          color: 'var(--text-primary)',
          marginBottom: '32px',
        }}>
          Your DNA.
          <br />
          <span style={{
            background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 45%, #E8FF80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Your blueprint.
          </span>
          <br />
          Your sound.
        </h2>

        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          marginBottom: '52px',
          maxWidth: '520px',
          margin: '0 auto 52px',
        }}>
          Extract your first Vocal DNA profile in 5 minutes.
          5 free blueprints — no credit card required.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/sign-up"
            className="btn-primary"
            style={{
              fontSize: '16px',
              padding: '15px 40px',
              borderRadius: '9px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
            }}
          >
            Start Free — No Card Required
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/pricing"
            className="btn-ghost"
            style={{ fontSize: '15px', padding: '14px 28px', borderRadius: '9px' }}
          >
            View Pricing
          </Link>
        </div>

        <p style={{
          marginTop: '20px',
          fontSize: '11px',
          color: 'var(--text-ghost)',
          fontFamily: 'IBM Plex Mono, monospace',
          letterSpacing: '0.06em',
        }}>
          No credit card · No lock-in · Cancel anytime
        </p>

        {/* Trust strip */}
        <div style={{
          marginTop: '72px',
          paddingTop: '48px',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {[
            {
              glyph: '◈',
              title: 'Gemini 2.5 Pro',
              sub: 'Flagship model with context caching',
            },
            {
              glyph: '◉',
              title: '28-Law Quality',
              sub: 'Every blueprint graded S through F',
            },
            {
              glyph: '▶',
              title: 'Real-time Streaming',
              sub: '4-stage pipeline · SSE delivery',
            },
          ].map((item) => (
            <div key={item.title} style={{
              padding: '20px 16px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
            }}>
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '16px',
                color: 'var(--accent)',
                display: 'block',
                marginBottom: '10px',
              }}>
                {item.glyph}
              </span>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}>
                {item.title}
              </div>
              <div style={{
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-tertiary)',
                lineHeight: 1.5,
              }}>
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
