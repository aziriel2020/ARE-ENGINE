'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TERMINAL_LINES = [
  '◈ Extracting Vocal DNA from samples...',
  '◈ Lexical fingerprint: [street / dense / fr-0.75]',
  '◈ Emotional axis: [defiant → melancholic]',
  '◈ Rhythmic signature: [syncopated / 92 BPM]',
  '◈ Context cache hit — 80K tokens saved',
  '◈ Generating blueprint with Gemini 3.1 Pro...',
  '— [VERSE 1]',
  '— Téléphone éteint depuis trois jours, personne a rappelé',
  '— T\'as changé d\'étage, t\'as changé d\'haleine, t\'as oublié',
  '◈ Quality scoring: 28 laws evaluated',
  '◈ Grade: A  (88/100)  — 25/28 laws passed',
  '◈ Blueprint complete.',
];

export function Hero() {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < TERMINAL_LINES.length) {
        setLines((prev) => [...prev, TERMINAL_LINES[i]]);
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 320);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            border: '1px solid var(--border-accent)',
            borderRadius: '2px',
            marginBottom: '32px',
            fontSize: '11px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.1em',
          }}
        >
          <span className="spin-glyph">◈</span>
          V3.0 OPUS SUPREME — LIVE
        </div>

        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 72px)',
            fontFamily: 'Space Mono, monospace',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '24px',
            color: 'var(--text-primary)',
          }}
        >
          Your lyrics sound<br />
          <span style={{ color: 'var(--accent)' }}>like you.</span> Finally.
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          ARE-E extracts your unique Vocal DNA — then generates blueprints that pass
          28 quality laws. Not generic AI output. Your voice, systematized.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: '14px', padding: '10px 24px' }}>
            Start Free →
          </Link>
          <Link href="/pricing" className="btn" style={{ fontSize: '14px', padding: '10px 24px' }}>
            View Pricing
          </Link>
        </div>

        {/* Terminal animation */}
        <div
          style={{
            marginTop: '64px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '24px',
            textAlign: 'left',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '12px',
            lineHeight: 1.8,
            minHeight: '280px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '16px',
              opacity: 0.4,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--error)', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--warning)', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
          </div>
          {lines.map((line, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{
                color: line.startsWith('—') ? 'var(--text-primary)' : 'var(--accent)',
                opacity: 0.9,
              }}
            >
              {line}
            </div>
          ))}
          {!done && (
            <div style={{ color: 'var(--accent)' }} className="cursor-blink" />
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
