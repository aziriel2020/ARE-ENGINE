'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ROTATING = [
  'generic.',
  'hollow.',
  'obvious.',
  'not you.',
  'AI.',
];

const STATS = [
  { value: '100/100', label: 'mandatory score — every time' },
  { value: '0',       label: 'clichés — 220+ banned before writing starts' },
  { value: '10',      label: 'blocks per song — lyrics to release strategy' },
  { value: 'FR + EN', label: 'both languages — full system in each' },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ROTATING.length);
        setVisible(true);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: 'clamp(120px, 14vw, 180px) 32px clamp(80px, 10vw, 120px)', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 100%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <div className="hs1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', border: '1px solid rgba(200,255,0,0.2)', borderRadius: '99px', background: 'rgba(200,255,0,0.04)', marginBottom: '40px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px rgba(200,255,0,0.7)', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
            500+ artists generating right now
          </span>
        </div>

        <h1 className="hs2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.92, color: 'var(--text-primary)', marginBottom: '32px' }}>
          Stop writing songs
          <br />
          that sound like{' '}
          <span style={{
            background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 60%, #E8FF80 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: visible ? 1 : 0,
            transition: 'opacity 280ms ease',
            display: 'inline-block',
          }}>
            {ROTATING[idx]}
          </span>
        </h1>

        <p className="hs3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '620px', margin: '0 auto 48px', letterSpacing: '-0.01em' }}>
          ARE builds your <strong style={{ color: 'var(--text-primary)' }}>Vocal DNA</strong> first — maps your voice in 7 dimensions — then writes in your language, your emotion, your truth. Not AI&apos;s best guess. Yours.
        </p>

        <div className="hs4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: '17px', padding: '16px 48px', borderRadius: '10px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Write My First Song Free
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="#demo" className="btn" style={{ fontSize: '15px', padding: '15px 28px', borderRadius: '10px' }}>
            See a real output
          </Link>
        </div>

        <div className="hs5" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: '1px solid var(--border)', borderRadius: '14px',
          background: 'var(--bg-elevated)', overflow: 'hidden',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '24px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(18px, 2.5vw, 30px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1, marginBottom: '6px' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.03em', lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Hero;
