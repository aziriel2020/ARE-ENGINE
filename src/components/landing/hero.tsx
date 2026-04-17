'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ROTATING = [
  'Pop',
  'Drill',
  'Afro',
  'R&B',
  'Cinematic',
  'Latin',
  'EDM',
  'Classical crossover',
];

const STATS = [
  { value: '2', label: 'inputs to start: Artist + Theme' },
  { value: '1', label: 'generation returns a full pro package' },
  { value: 'Any', label: 'language, genre, sub-genre, and arrangement' },
  { value: '∞', label: 'detail level: solo, duet, trio, or full band' },
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
      }, 220);
    }, 2100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: 'clamp(120px, 14vw, 180px) 32px clamp(80px, 10vw, 120px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '980px', height: '620px', background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div className="hs1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', border: '1px solid rgba(200,255,0,0.2)', borderRadius: '99px', background: 'rgba(200,255,0,0.04)', marginBottom: '40px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px rgba(200,255,0,0.7)', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
            Built for artists, producers, labels, and media teams
          </span>
        </div>

        <h1 className="hs2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.95, color: 'var(--text-primary)', marginBottom: '28px' }}>
          Type <span style={{ color: 'var(--accent)' }}>Artist + Theme</span>.
          <br />
          Get a complete track package for{' '}
          <span
            style={{
              background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 60%, #E8FF80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: visible ? 1 : 0,
              transition: 'opacity 250ms ease',
              display: 'inline-block',
            }}
          >
            {ROTATING[idx]}
          </span>
          .
        </h1>

        <p className="hs3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '720px', margin: '0 auto 44px', letterSpacing: '-0.01em' }}>
          ARE-E is a production intelligence system that can generate for every genre and sub-genre, in any language, for solo artists, duets, trios, or bands. It builds lyrics, structure, arrangement direction, performance intent, and generation-ready prompts in one run.
        </p>

        <div className="hs4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: '17px', padding: '16px 40px', borderRadius: '10px', fontWeight: 700 }}>
            Start Free Generation
          </Link>
          <Link href="#demo" className="btn" style={{ fontSize: '15px', padding: '15px 28px', borderRadius: '10px' }}>
            See 2-input workflow
          </Link>
        </div>

        <div className="hs5" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)', borderRadius: '14px', background: 'var(--bg-elevated)', overflow: 'hidden' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '22px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1, marginBottom: '6px' }}>
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
