import Link from 'next/link';

const LINKS = {
  Product: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'Studio', href: '/studio' },
  ],
  Account: [
    { label: 'Sign In', href: '/sign-in' },
    { label: 'Sign Up', href: '/sign-up' },
  ],
};

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-elevated)',
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '48px 32px 32px',
      }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: '64px',
          marginBottom: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border)',
          alignItems: 'start',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '26px',
                height: '26px',
                background: 'var(--accent)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(200,255,0,0.2)',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#000',
                  letterSpacing: '-0.05em',
                }}>AE</span>
              </div>
              <div>
                <span style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.04em',
                }}>ARE-E</span>
                <span style={{
                  marginLeft: '6px',
                  fontSize: '10px',
                  color: 'var(--text-ghost)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: '0.08em',
                }}>V3</span>
              </div>
            </div>
            <p style={{
              fontSize: '13px',
              color: 'var(--text-tertiary)',
              lineHeight: 1.65,
              maxWidth: '280px',
              fontFamily: 'IBM Plex Mono, monospace',
            }}>
              Artist Reality Engine — AI lyrics generation with Vocal DNA, 28-law quality scoring, and real-time streaming.
            </p>
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
                marginBottom: '12px',
              }}>
                {group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      fontFamily: 'IBM Plex Mono, monospace',
                      letterSpacing: '0.02em',
                      transition: 'color 150ms ease',
                    }}
                  >
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
          gap: '12px',
        }}>
          <span style={{
            fontSize: '11px',
            color: 'var(--text-ghost)',
            fontFamily: 'IBM Plex Mono, monospace',
          }}>
            © {new Date().getFullYear()} ARE-E · Artist Reality Engine V3.0 Opus Supreme
          </span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {[
              { label: 'Gemini 2.5 Pro', glyph: '◈' },
              { label: 'SSE Streaming',  glyph: '▶' },
              { label: '28-Law Quality', glyph: '◉' },
            ].map((item) => (
              <span key={item.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-ghost)',
                letterSpacing: '0.04em',
              }}>
                <span style={{ color: 'rgba(200,255,0,0.4)', fontSize: '9px' }}>{item.glyph}</span>
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
