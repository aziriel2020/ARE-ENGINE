'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const NAV_ITEMS = [
  { href: '/studio',             label: 'Generate',   icon: '▶' },
  { href: '/studio/blueprints',  label: 'Blueprints', icon: '◈' },
  { href: '/studio/dna',         label: 'Vocal DNA',  icon: '◉' },
  { href: '/studio/analytics',   label: 'Analytics',  icon: '◎' },
  { href: '/studio/api-keys',    label: 'API Keys',   icon: '⌘' },
  { href: '/studio/webhooks',    label: 'Webhooks',   icon: '⬡' },
  { href: '/studio/billing',     label: 'Billing',    icon: '◷' },
  { href: '/studio/settings',    label: 'Settings',   icon: '◧' },
];

const NAV_GROUPS = [
  { label: 'Create', items: NAV_ITEMS.slice(0, 3) },
  { label: 'Manage', items: NAV_ITEMS.slice(3, 6) },
  { label: 'Account', items: NAV_ITEMS.slice(6) },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/studio') return pathname === '/studio';
    return pathname.startsWith(href);
  };

  return (
    <aside style={{
      width: '240px',
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
    }}>

      {/* Logo */}
      <div style={{
        padding: '24px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: 'var(--accent)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 12px rgba(200,255,0,0.25)',
          }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '12px', color: '#000', letterSpacing: '-0.05em' }}>AE</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              ARE-E
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.06em', marginTop: '2px' }}>
              STUDIO
            </div>
          </div>
        </Link>
      </div>

      {/* Nav groups */}
      <nav style={{ padding: '16px 0', flex: 1 }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: '4px' }}>
            <div style={{
              padding: '8px 20px 4px',
              fontSize: '9px',
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'var(--text-ghost)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px 8px 20px',
                    margin: '1px 8px',
                    borderRadius: '7px',
                    fontSize: '13.5px',
                    fontWeight: active ? 500 : 400,
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: active ? 'var(--bg-active)' : 'transparent',
                    transition: 'all 100ms ease',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: active ? 'var(--accent)' : 'var(--text-ghost)',
                    width: '14px',
                    flexShrink: 0,
                    transition: 'color 100ms ease',
                  }}>
                    {item.icon}
                  </span>
                  {item.label}
                  {active && (
                    <div style={{
                      marginLeft: 'auto',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      boxShadow: '0 0 6px var(--accent)',
                      flexShrink: 0,
                    }} />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserButton afterSignOutUrl="/" />
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}>Account</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
