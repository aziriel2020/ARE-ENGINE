import Link from 'next/link';

export function CtaSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 140px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Large center glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, rgba(200,255,0,0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 14px',
          marginBottom: '36px',
          background: 'rgba(200,255,0,0.06)',
          border: '1px solid rgba(200,255,0,0.2)',
          borderRadius: '99px',
          fontSize: '11px',
          fontFamily: 'IBM Plex Mono, monospace',
          color: 'var(--accent)',
          letterSpacing: '0.08em',
        }}>
          <span style={{ fontSize: '8px' }}>◈</span>
          FREE TIER AVAILABLE — NO CREDIT CARD
        </div>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(36px, 5.5vw, 72px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: 'var(--text-primary)',
          marginBottom: '28px',
        }}>
          Your DNA.
          <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
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
          fontSize: '17px',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          marginBottom: '48px',
          maxWidth: '520px',
          margin: '0 auto 48px',
        }}>
          Extract your first Vocal DNA profile in 5 minutes.
          5 blueprints included on the free tier — no commitment required.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/sign-up"
            className="btn-primary"
            style={{
              fontSize: '16px',
              padding: '14px 36px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
            }}
          >
            Start Free
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/pricing"
            className="btn-ghost"
            style={{
              fontSize: '15px',
              padding: '13px 28px',
              borderRadius: '8px',
            }}
          >
            View Pricing
          </Link>
        </div>

        <p style={{
          marginTop: '24px',
          fontSize: '11px',
          color: 'var(--text-ghost)',
          fontFamily: 'IBM Plex Mono, monospace',
          letterSpacing: '0.04em',
        }}>
          No credit card · No lock-in · Cancel anytime
        </p>

        {/* Trust row */}
        <div style={{
          marginTop: '56px',
          paddingTop: '40px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { glyph: '◈', label: 'Powered by Gemini 2.5 Pro' },
            { glyph: '◉', label: '28-Law quality scoring' },
            { glyph: '▶', label: 'Real-time SSE streaming' },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '12px',
                color: 'var(--accent)',
              }}>
                {item.glyph}
              </span>
              <span style={{
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.03em',
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CtaSection;
