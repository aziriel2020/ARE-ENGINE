'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ROTATING_WORDS = ['fearless.', 'raw.', 'defiant.', 'real.', 'alive.'];

export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % ROTATING_WORDS.length);
        setFade(true);
      }, 300);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Background */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '1400px', height: '900px',
        background: 'radial-gradient(ellipse 55% 50% at 50% 0%, rgba(200,255,0,0.09) 0%, rgba(200,255,0,0.025) 45%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '5%', left: '20%', width: '700px', height: '700px',
        background: 'radial-gradient(ellipse, rgba(200,255,0,0.045) 0%, transparent 65%)',
        animation: 'blob-drift-1 16s ease-in-out infinite', filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '0%', width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(80,40,255,0.03) 0%, transparent 65%)',
        animation: 'blob-drift-2 22s ease-in-out infinite', filter: 'blur(48px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, black 20%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1120px', margin: '0 auto',
        padding: 'clamp(120px, 14vw, 180px) 32px clamp(80px, 8vw, 120px)',
        position: 'relative', textAlign: 'center',
      }}>

        {/* Social proof badge */}
        <div className="hs1" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '6px 16px 6px 10px', marginBottom: '40px',
          background: 'rgba(200,255,0,0.05)', border: '1px solid rgba(200,255,0,0.2)',
          borderRadius: '99px',
        }}>
          <span className="live-dot" />
          <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.08em' }}>
            500+ artists already inside
          </span>
        </div>

        {/* Headline */}
        <h1 className="hs2" style={{
          fontSize: 'clamp(56px, 9vw, 128px)',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          letterSpacing: '-0.055em', lineHeight: 0.92,
          color: 'var(--text-primary)', marginBottom: '8px',
        }}>
          Write the song
          <br />
          only you
          <br />
          could write.
        </h1>

        {/* Rotating accent word */}
        <div className="hs2" style={{
          fontSize: 'clamp(56px, 9vw, 128px)',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          letterSpacing: '-0.055em', lineHeight: 0.92,
          marginBottom: '48px',
          background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 50%, #E8FF80 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease',
        }}>
          Make it {ROTATING_WORDS[wordIdx]}
        </div>

        {/* Sub */}
        <p className="hs3" style={{
          fontSize: 'clamp(17px, 2vw, 21px)', color: 'var(--text-secondary)',
          lineHeight: 1.75, maxWidth: '600px', margin: '0 auto 52px',
          fontWeight: 400,
        }}>
          ARE-E maps your artistic identity, then generates complete song blueprints
          that actually sound like you — graded before you read a single word.
        </p>

        {/* CTAs */}
        <div className="hs4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: '16px', padding: '15px 40px', borderRadius: '9px', fontWeight: 700 }}>
            Write My First Blueprint Free
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="#demo" className="btn-ghost" style={{ fontSize: '15px', padding: '14px 28px', borderRadius: '9px' }}>
            See It Live
          </Link>
        </div>

        <p className="hs4" style={{ fontSize: '12px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.06em' }}>
          No credit card · 5 free blueprints · Cancel anytime
        </p>

        {/* Outcome stats */}
        <div className="hs5" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: '640px', margin: '64px auto 0',
          paddingTop: '40px', borderTop: '1px solid var(--border)',
          gap: '0',
        }}>
          {[
            { value: '< 4 min',  label: 'to first A-grade' },
            { value: '0',        label: 'generic clichés' },
            { value: '5',        label: 'blueprints free' },
            { value: '14 days',  label: 'Pro trial' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              paddingRight: i < arr.length - 1 ? '24px' : '0',
              borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              marginRight: i < arr.length - 1 ? '24px' : '0',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 'clamp(20px, 2.5vw, 28px)', fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 1, marginBottom: '6px',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Ticker */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0', background: 'var(--bg-elevated)' }}>
        <div className="marquee-track">
          <div className="marquee-inner" style={{ animation: 'marquee 28s linear infinite' }}>
            {[...Array(2)].flatMap(() => [
              { glyph: '◉', text: 'Your voice. Not average.' },
              { glyph: '▶', text: 'A-grade in under 4 minutes' },
              { glyph: '◈', text: '28 quality checks on every draft' },
              { glyph: '⌘', text: 'Any language · Any genre' },
              { glyph: '◎', text: 'Gemini 2.5 Pro flagship' },
              { glyph: '◷', text: '14-day free trial on Pro' },
              { glyph: '◈', text: 'Grade S to F — know before you play it' },
              { glyph: '▶', text: '500+ artists and counting' },
            ]).map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', paddingRight: '48px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                <span style={{ color: 'rgba(200,255,0,0.5)', fontSize: '10px' }}>{item.glyph}</span>
                {item.text}
                <span style={{ color: 'var(--text-ghost)', paddingLeft: '48px' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
