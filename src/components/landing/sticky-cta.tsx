'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const footerRef = useRef<Element | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const footer = footerRef.current ?? document.querySelector('footer');
      if (footer) footerRef.current = footer;

      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(scrollRatio > 0.45 && !footerVisible);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      animation: 'slide-in-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 10px 10px 20px',
        background: 'rgba(8,8,8,0.95)',
        border: '1px solid rgba(200,255,0,0.2)',
        borderRadius: '99px',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 32px rgba(200,255,0,0.08)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          fontFamily: 'IBM Plex Mono, monospace',
          letterSpacing: '0.02em',
        }}>
          Start free — no credit card required
        </span>

        <Link href="/sign-up" className="btn-primary" style={{ fontSize: '13px', padding: '8px 22px', borderRadius: '99px' }}>
          Get Started
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <button
          onClick={() => { setDismissed(true); setVisible(false); }}
          style={{
            width: '28px', height: '28px',
            borderRadius: '50%',
            border: '1px solid var(--border-hover)',
            background: 'transparent',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 150ms ease',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default StickyCta;
