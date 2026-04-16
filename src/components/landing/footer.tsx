import Link from 'next/link';

const LINKS = {
  Product: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Studio', href: '/studio' },
    { label: 'API Docs', href: '/docs' },
    { label: 'Changelog', href: '/docs' },
  ],
  Account: [
    { label: 'Sign In', href: '/sign-in' },
    { label: 'Sign Up', href: '/sign-up' },
    { label: 'Billing', href: '/studio/billing' },
    { label: 'Settings', href: '/studio/settings' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
    { label: 'Security', href: '/' },
  ],
};

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-elevated)' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '64px 32px 40px' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '56px',
          paddingBottom: '48px',
          borderBottom: '1px solid var(--border)',
        }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '28px', height: '28px',
                background: 'var(--accent)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 12px rgba(200,255,0,0.2)',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '11px', color: '#000', letterSpacing: '-0.05em' }}>AE</span>
              </div>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                ARE-E
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em' }}>V3</span>
            </div>

            <p style={{
              fontSize: '13px',
              color: 'var(--text-tertiary)',
              lineHeight: 1.7,
              maxWidth: '280px',
              marginBottom: '24px',
              fontFamily: 'IBM Plex Mono, monospace',
            }}>
              AI lyrics generation with Vocal DNA, 28-law quality scoring, and real-time SSE streaming.
            </p>

            {/* API status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                display: 'inline-block',
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--success)',
                boxShadow: '0 0 6px rgba(0,232,122,0.5)',
              }} />
              <span style={{
                fontSize: '11px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.04em',
              }}>
                All systems operational
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <div style={{
                fontSize: '10px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-ghost)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                {group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((item) => (
                  <Link key={item.href + item.label} href={item.href} style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    letterSpacing: '0.02em',
                    transition: 'color 150ms ease',
                  }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <span style={{
            fontSize: '11px',
            color: 'var(--text-ghost)',
            fontFamily: 'IBM Plex Mono, monospace',
          }}>
            © {new Date().getFullYear()} ARE-E · Artist Reality Engine V3.0 Opus Supreme
          </span>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {[
              { glyph: '◈', label: 'Gemini 2.5 Pro' },
              { glyph: '◉', label: '28-Law Quality' },
              { glyph: '▶', label: 'SSE Streaming' },
            ].map((item) => (
              <span key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-ghost)', letterSpacing: '0.04em',
              }}>
                <span style={{ color: 'rgba(200,255,0,0.35)', fontSize: '9px' }}>{item.glyph}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
