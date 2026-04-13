import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--accent)',
            }}
          >
            ARE-E
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-ghost)',
              fontFamily: 'IBM Plex Mono, monospace',
            }}
          >
            Artist Reality Engine V3.0
          </span>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Pricing', href: '/pricing' },
            { label: 'Docs', href: '/docs' },
            { label: 'Sign In', href: '/sign-in' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                fontFamily: 'IBM Plex Mono, monospace',
                transition: 'color 150ms ease',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-ghost)',
            fontFamily: 'IBM Plex Mono, monospace',
          }}
        >
          © {new Date().getFullYear()} ARE-E
        </span>
      </div>
    </footer>
  );
}

export default Footer;
