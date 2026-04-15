'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TERMINAL_LINES = [
  { text: '◈ Extracting Vocal DNA from 847 samples...', type: 'system' },
  { text: '  lexical.vocabularyTier  → street', type: 'data' },
  { text: '  emotional.primaryAxis   → defiant', type: 'data' },
  { text: '  rhythmic.defaultFlow    → syncopated / 92 BPM', type: 'data' },
  { text: '  influences.weight[SCH]  → 0.40', type: 'data' },
  { text: '◈ Context cache hit — 80,312 tokens saved ($0.00)', type: 'success' },
  { text: '◈ Generating with Gemini 2.5 Pro...', type: 'system' },
  { text: '  [VERSE 1]', type: 'lyrics-label' },
  { text: '  Téléphone éteint depuis trois jours, personne a rappelé', type: 'lyrics' },
  { text: "  T'as changé d'étage, t'as changé d'haleine, t'as oublié", type: 'lyrics' },
  { text: '◈ Scoring 28 laws...', type: 'system' },
  { text: '  Grade A  — 88/100  — 25/28 laws passed ✓', type: 'grade' },
];

const STATS = [
  { value: '28', label: 'Quality Laws' },
  { value: '7', label: 'DNA Vectors' },
  { value: '3', label: 'AI Models' },
  { value: '80K', label: 'Tokens Cached' },
];

export function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleLines((n) => {
        if (n >= TERMINAL_LINES.length) {
          setDone(true);
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 280);
    return () => clearInterval(id);
  }, []);

  const getLineColor = (type: string) => {
    if (type === 'system') return 'var(--accent)';
    if (type === 'success') return 'var(--success)';
    if (type === 'grade') return 'var(--accent)';
    if (type === 'lyrics-label') return 'var(--text-tertiary)';
    if (type === 'lyrics') return 'var(--text-primary)';
    return 'var(--text-secondary)';
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.06) 0%, rgba(200,255,0,0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(80px, 10vw, 140px) 32px clamp(80px, 8vw, 120px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
      }}>

        {/* LEFT — Copy */}
        <div style={{ maxWidth: '560px' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            marginBottom: '36px',
            background: 'rgba(200,255,0,0.06)',
            border: '1px solid rgba(200,255,0,0.2)',
            borderRadius: '99px',
            fontSize: '11px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.08em',
          }}>
            <span className="spin-glyph" style={{ fontSize: '8px' }}>◈</span>
            V3.0 OPUS SUPREME — LIVE
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '28px',
            color: 'var(--text-primary)',
          }}>
            Your lyrics<br />
            sound like<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>you.</span>{' '}
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Finally.</span>
          </h1>

          {/* Body */}
          <p style={{
            fontSize: '17px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '44px',
            fontWeight: 400,
          }}>
            ARE-E extracts your Vocal DNA across 7 identity vectors, then generates
            song blueprints scored against 28 quality laws. Not generic AI output —
            your voice, systematized at model scale.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '52px' }}>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '15px', padding: '12px 28px', borderRadius: '8px' }}>
              Start Free
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/pricing" className="btn-ghost" style={{ fontSize: '15px', padding: '12px 24px', borderRadius: '8px' }}>
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            borderTop: '1px solid var(--border)',
            paddingTop: '28px',
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                paddingRight: '20px',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                marginRight: i < STATS.length - 1 ? '20px' : '0',
              }}>
                <div style={{
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Terminal */}
        <div style={{ position: 'relative' }}>

          {/* Glow behind terminal */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(20px)',
          }} />

          {/* Terminal window */}
          <div style={{
            position: 'relative',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-hover)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset',
          }}>
            {/* Terminal chrome */}
            <div style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
              <span style={{
                marginLeft: '12px',
                fontSize: '11px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.05em',
              }}>
                are-engine / pipeline
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: '20px 22px 24px',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '12.5px',
              lineHeight: 1.9,
              minHeight: '340px',
            }}>
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className="animate-fade-in-up"
                  style={{
                    color: getLineColor(line.type),
                    fontWeight: line.type === 'grade' ? 500 : 400,
                    animationDelay: '0ms',
                  }}
                >
                  {line.text}
                </div>
              ))}
              {!done && visibleLines < TERMINAL_LINES.length && (
                <div style={{ color: 'var(--accent)' }} className="cursor-blink" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-terminal { display: none; }
        }
      `}</style>
    </section>
  );
}

export default Hero;
