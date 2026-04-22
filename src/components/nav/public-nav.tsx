'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function PublicNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.035)'}`,
      background: scrolled ? 'linear-gradient(180deg, rgba(3,4,7,0.94), rgba(3,4,7,0.9))' : 'linear-gradient(180deg, rgba(3,4,7,0.82), rgba(3,4,7,0.72))',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      transition: 'background 200ms ease, border-color 200ms ease, height 200ms ease',
    }}>
      <nav style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: `0 32px`,
        height: scrolled ? '56px' : '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'height 200ms ease',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: scrolled ? '26px' : '30px',
            height: scrolled ? '26px' : '30px',
            background: 'var(--accent)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(200,255,0,0.28)',
            transition: 'width 200ms ease, height 200ms ease',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: scrolled ? '11px' : '13px',
              color: '#000',
              letterSpacing: '-0.05em',
              transition: 'font-size 200ms ease',
            }}>AN</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--text-primary)',
              letterSpacing: '-0.04em',
            }}>ANIMAENGINE</span>
            <span style={{
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              fontFamily: 'IBM Plex Mono, monospace',
              letterSpacing: '0.08em',
            }}>PRIME</span>
          </div>
        </Link>

        {/* Center links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {[
            { href: '/pricing', label: 'Pricing' },
            { href: '/docs',    label: 'Docs' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '6px 14px',
              fontSize: '14px',
              borderRadius: '6px',
              color: pathname === href ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: pathname === href ? 'rgba(255,255,255,0.06)' : 'transparent',
              transition: 'all 150ms ease',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SignedOut>
            <Link href="/sign-in" className="btn-ghost" style={{ fontSize: '14px', padding: '7px 16px', borderRadius: '7px' }}>
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
