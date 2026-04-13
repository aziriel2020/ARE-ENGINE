import Link from 'next/link';

export function CtaSection() {
  return (
    <section
      style={{
        padding: '80px 24px',
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '32px',
            color: 'var(--accent)',
          }}
        >
          ◈
        </span>
        <h2
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 'clamp(28px, 5vw, 48px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: '20px 0',
          }}
        >
          Your DNA.<br />
          <span style={{ color: 'var(--accent)' }}>Your blueprint.</span><br />
          Your sound.
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '36px',
          }}
        >
          Start free. Extract your first DNA profile in 5 minutes.
          5 blueprints included — no credit card required.
        </p>
        <Link
          href="/sign-up"
          className="btn-primary"
          style={{ fontSize: '15px', padding: '12px 32px', display: 'inline-flex' }}
        >
          Start Free →
        </Link>
        <p
          style={{
            marginTop: '16px',
            fontSize: '11px',
            color: 'var(--text-ghost)',
            fontFamily: 'IBM Plex Mono, monospace',
          }}
        >
          No credit card. No lock-in. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

export default CtaSection;
