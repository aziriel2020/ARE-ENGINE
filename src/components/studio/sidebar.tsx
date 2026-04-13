'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const NAV_ITEMS = [
  { href: '/studio', label: 'Generate', glyph: '▶' },
  { href: '/studio/blueprints', label: 'Blueprints', glyph: '◈' },
  { href: '/studio/dna', label: 'Vocal DNA', glyph: '◉' },
  { href: '/studio/analytics', label: 'Analytics', glyph: '◎' },
  { href: '/studio/api-keys', label: 'API Keys', glyph: '⌘' },
  { href: '/studio/webhooks', label: 'Webhooks', glyph: '⬡' },
  { href: '/studio/billing', label: 'Billing', glyph: '◷' },
  { href: '/studio/settings', label: 'Settings', glyph: '◧' },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/studio') return pathname === '/studio';
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        background: 'var(--bg-elevated)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--accent)',
            }}
          >
            ARE-E
          </span>
          <span
            style={{
              fontSize: '9px',
              color: 'var(--text-ghost)',
              fontFamily: 'IBM Plex Mono, monospace',
              letterSpacing: '0.1em',
            }}
          >
            STUDIO
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 0', flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                fontSize: '13px',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: active ? 'var(--bg-hover)' : 'transparent',
                borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                transition: 'all 150ms ease',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '12px',
                  color: active ? 'var(--accent)' : 'var(--text-ghost)',
                  width: '16px',
                  flexShrink: 0,
                }}
              >
                {item.glyph}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <UserButton afterSignOutUrl="/" />
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Account</span>
      </div>
    </aside>
  );
}

export default Sidebar;
