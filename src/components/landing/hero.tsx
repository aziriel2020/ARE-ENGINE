'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TERMINAL_LINES = [
  { text: '◈  Vocal DNA extraction started', type: 'system', ln: 1 },
  { text: '   lexical.tier          →  street / vernacular', type: 'data', ln: 2 },
  { text: '   emotional.axis        →  defiant / nostalgic', type: 'data', ln: 3 },
  { text: '   rhythmic.flow         →  syncopated @ 92 BPM', type: 'data', ln: 4 },
  { text: '   influence.SCH         →  0.40  MHD 0.22', type: 'data', ln: 5 },
  { text: '◈  Context cache hit — 80,312 tokens saved ($0.00)', type: 'success', ln: 6 },
  { text: '◈  Generating via Gemini 2.5 Pro...', type: 'system', ln: 7 },
  { text: '   [VERSE 1]', type: 'label', ln: 8 },
  { text: '   Téléphone éteint depuis trois jours, personne a rappelé', type: 'lyrics', ln: 9 },
  { text: "   T'as changé d'étage, t'as changé d'haleine, t'as oublié", type: 'lyrics', ln: 10 },
  { text: '◈  Scoring 28 laws...', type: 'system', ln: 11 },
  { text: '   Grade A  ·  88 / 100  ·  25 / 28 laws passed ✓', type: 'grade', ln: 12 },
];

const TICKER_ITEMS = [
  { glyph: '◉', text: 'Vocal DNA — 7 identity vectors' },
  { glyph: '▶', text: 'Real-time SSE streaming' },
  { glyph: '◈', text: '28-Law quality scoring' },
  { glyph: '⌘', text: '90% cost reduction via context cache' },
  { glyph: '◎', text: 'Gemini 2.5 Pro flagship model' },
  { glyph: '◷', text: '14-day free trial on Pro' },
  { glyph: '◈', text: 'Grade S / A / B / C / F per blueprint' },
  { glyph: '▶', text: '4-stage generation pipeline' },
];

const STATS = [
  { value: '28',  label: 'Quality Laws' },
  { value: '7',   label: 'DNA Vectors' },
  { value: '90%', label: 'Cost Saved' },
  { value: '80K', label: 'Tokens Cached' },
];

export function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  // Looping terminal animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const run = () => {
      setVisibleLines(0);
      setDone(false);
      let n = 0;
      interval = setInterval(() => {
        n++;
        setVisibleLines(n);
        if (n >= TERMINAL_LINES.length) {
          clearInterval(interval);
          setDone(true);
          timeout = setTimeout(run, 4500); // restart after pause
        }
      }, 255);
    };

    run();
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const lineColor = (type: string) => {
    if (type === 'system')  return 'var(--accent)';
    if (type === 'success') return 'var(--success)';
    if (type === 'grade')   return 'var(--accent)';
    if (type === 'label')   return 'var(--text-tertiary)';
    if (type === 'lyrics')  return 'var(--text-primary)';
    return 'var(--text-secondary)';
  };

  const tickerRow = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── BACKGROUND ─────────────────────────────────────────────────── */}

      {/* Primary radial glow */}
      <div style={{
        position: 'absolute',
        top: '-15%', left: '50%',
        transform: 'translateX(-50%)',
        width: '1200px', height: '800px',
        background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(200,255,0,0.08) 0%, rgba(200,255,0,0.02) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Animated blob 1 */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '35%',
        width: '680px', height: '680px',
        background: 'radial-gradient(ellipse, rgba(200,255,0,0.05) 0%, transparent 65%)',
        animation: 'blob-drift-1 14s ease-in-out infinite',
        filter: 'blur(48px)',
        pointerEvents: 'none',
      }} />

      {/* Animated blob 2 — subtle cool tint for depth */}
      <div style={{
        position: 'absolute',
        top: '35%', right: '5%',
        width: '440px', height: '440px',
        background: 'radial-gradient(ellipse, rgba(60,80,255,0.025) 0%, transparent 65%)',
        animation: 'blob-drift-2 20s ease-in-out infinite',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Fine grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── MAIN GRID ───────────────────────────────────────────────────── */}

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(96px, 12vw, 160px) 32px clamp(80px, 8vw, 120px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        position: 'relative',
      }}>

        {/* LEFT — copy with stagger animation */}
        <div style={{ maxWidth: '600px' }}>

          {/* Live badge — stagger 1 */}
          <div className="hs1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px 6px 10px',
            marginBottom: '36px',
            background: 'rgba(200,255,0,0.05)',
            border: '1px solid rgba(200,255,0,0.18)',
            borderRadius: '99px',
            fontSize: '11px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.09em',
          }}>
            <span className="live-dot" />
            V3.0 OPUS SUPREME — LIVE
          </div>

          {/* Headline — stagger 2 */}
          <h1 className="hs2" style={{
            fontSize: 'clamp(60px, 8.5vw, 116px)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            marginBottom: '32px',
            color: 'var(--text-primary)',
          }}>
            Your lyrics
            <br />
            sound like
            <br />
            <span style={{
              background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 45%, #E8FF80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>you.</span>
            {' '}
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.72em', letterSpacing: '-0.03em', fontWeight: 300 }}>
              Finally.
            </span>
          </h1>

          {/* Body — stagger 3 */}
          <p className="hs3" style={{
            fontSize: '17px',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '48px',
            fontWeight: 400,
            maxWidth: '480px',
          }}>
            ARE-E extracts your Vocal DNA across 7 identity vectors, then generates
            song blueprints scored against 28 quality laws. Not generic AI —
            your voice, systematized at model scale.
          </p>

          {/* CTAs — stagger 4 */}
          <div className="hs4" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '15px', padding: '13px 32px', borderRadius: '8px' }}>
              Start Free
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/pricing" className="btn-ghost" style={{ fontSize: '15px', padding: '12px 26px', borderRadius: '8px' }}>
              View Pricing
            </Link>
          </div>

          {/* Stats strip — stagger 5 */}
          <div className="hs5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                paddingRight: i < STATS.length - 1 ? '20px' : '0',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                marginRight: i < STATS.length - 1 ? '20px' : '0',
              }}>
                <div style={{
                  fontSize: 'clamp(22px, 2.5vw, 32px)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '5px',
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

        {/* RIGHT — terminal — stagger 6 */}
        <div className="hs6" style={{ position: 'relative' }}>

          <div style={{
            position: 'absolute', inset: '-40px',
            background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)',
            filter: 'blur(24px)',
            pointerEvents: 'none',
          }} />

          <div className="terminal-window" style={{ position: 'relative' }}>

            {/* Chrome */}
            <div className="terminal-chrome">
              <span className="terminal-dot" style={{ background: '#FF5F57' }} />
              <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <span className="terminal-dot" style={{ background: '#28CA41' }} />
              <span style={{ marginLeft: '14px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
                are-engine / pipeline.ts
              </span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)' }}>
                <span className="live-dot" style={{ width: '5px', height: '5px' }} />
                LIVE
              </span>
            </div>

            {/* Body with line numbers */}
            <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', lineHeight: 2, minHeight: '360px' }}>
              {/* Gutter */}
              <div style={{ background: 'rgba(255,255,255,0.015)', borderRight: '1px solid var(--border)', padding: '20px 0', textAlign: 'right' }}>
                {TERMINAL_LINES.slice(0, visibleLines).map((line) => (
                  <div key={line.ln} style={{ color: 'var(--text-ghost)', fontSize: '11px', paddingRight: '10px', userSelect: 'none' }}>
                    {line.ln}
                  </div>
                ))}
              </div>

              {/* Lines */}
              <div style={{ padding: '20px 20px 24px' }}>
                {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="animate-fade-in-up" style={{ color: lineColor(line.type), fontWeight: line.type === 'grade' ? 600 : 400, animationDelay: '0ms' }}>
                    {line.text}
                  </div>
                ))}
                {!done && visibleLines < TERMINAL_LINES.length && <div className="cursor-blink" />}
              </div>
            </div>

            {/* Status bar */}
            <div style={{ padding: '7px 16px', borderTop: '1px solid var(--border)', background: 'rgba(200,255,0,0.03)', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.08em' }}>◈ ARE-ENGINE</span>
              <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', marginLeft: 'auto' }}>Gemini 2.5 Pro · SSE · UTF-8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker marquee */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '13px 0', background: 'var(--bg-elevated)' }}>
        <div className="marquee-track">
          <div className="marquee-inner" style={{ animation: 'marquee 22s linear infinite' }}>
            {tickerRow.map((item, i) => (
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
