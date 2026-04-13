'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--accent)',
              letterSpacing: '-0.02em',
            }}
          >
            ARE-E
          </span>
          <span
            style={{
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              fontFamily: 'IBM Plex Mono, monospace',
              letterSpacing: '0.1em',
            }}
          >
            V3.0
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link
            href="/pricing"
            style={{
              fontSize: '13px',
              color: pathname === '/pricing' ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'color 150ms ease',
            }}
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            style={{
              fontSize: '13px',
              color: pathname === '/docs' ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'color 150ms ease',
            }}
          >
            Docs
          </Link>

          <SignedOut>
            <Link href="/sign-in" className="btn" style={{ fontSize: '13px', padding: '6px 16px' }}>
              Sign in
            </Link>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '13px', padding: '6px 16px' }}>
              Start Free →
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/studio" className="btn-primary" style={{ fontSize: '13px', padding: '6px 16px' }}>
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
