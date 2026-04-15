'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '30px',
            height: '30px',
            background: 'var(--accent)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(200,255,0,0.3)',
          }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: '#000',
              letterSpacing: '-0.05em',
            }}>AE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--text-primary)',
              letterSpacing: '-0.04em',
            }}>ARE-E</span>
            <span style={{
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              fontFamily: 'IBM Plex Mono, monospace',
              letterSpacing: '0.08em',
              fontWeight: 400,
            }}>V3</span>
          </div>
        </Link>

        {/* Center links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[
            { href: '/pricing', label: 'Pricing' },
            { href: '/docs', label: 'Docs' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: '6px 14px',
                fontSize: '14px',
                borderRadius: '6px',
                color: pathname === href ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: pathname === href ? 'var(--bg-hover)' : 'transparent',
                transition: 'all 150ms ease',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SignedOut>
            <Link href="/sign-in" className="btn-ghost" style={{ fontSize: '14px', padding: '7px 18px', borderRadius: '7px' }}>
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '14px', padding: '7px 18px', borderRadius: '7px' }}>
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/studio" className="btn-primary" style={{ fontSize: '14px', padding: '7px 18px', borderRadius: '7px' }}>
              Studio →
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default PublicNav;
