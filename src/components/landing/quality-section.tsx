'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from './scroll-reveal';

const SAMPLE_LAWS = [
  { id: 1,  name: 'No AI Clichés',           score: 92, passed: true },
  { id: 2,  name: 'Concrete Sensory Detail',  score: 88, passed: true },
  { id: 11, name: 'Opening Line Hook',        score: 95, passed: true },
  { id: 12, name: "Show Don't Tell Ratio",    score: 84, passed: true },
  { id: 15, name: 'DNA Lexical Alignment',    score: 91, passed: true },
  { id: 20, name: 'No Forced Perfect Rhymes', score: 55, passed: false },
  { id: 21, name: 'No Greeting Card Lines',   score: 96, passed: true },
  { id: 25, name: 'Metaphor Freshness',       score: 89, passed: true },
];

function useCountUp(target: number, triggered: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const timeout = setTimeout(() => {
      let start: number;
      const duration = 900;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 2);
        setVal(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [triggered, target, delay]);
  return val;
}

function AnimatedRow({ law, triggered, rowDelay }: { law: typeof SAMPLE_LAWS[0]; triggered: boolean; rowDelay: number }) {
  const score = useCountUp(law.score, triggered, rowDelay);

  return (
    <div style={{
      padding: '9px 20px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      background: law.passed ? 'transparent' : 'rgba(255,59,92,0.02)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          flexShrink: 0,
          background: law.passed ? 'var(--success)' : 'var(--error)',
          boxShadow: law.passed ? '0 0 5px rgba(0,232,122,0.6)' : '0 0 5px rgba(255,59,92,0.6)',
        }} />
        <span style={{
          fontSize: '12px',
          color: law.passed ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontFamily: 'IBM Plex Mono, monospace',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {law.id.toString().padStart(2, '0')}. {law.name}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div style={{ width: '56px', height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            width: triggered ? `${law.score}%` : '0%',
            height: '100%',
            background: law.passed ? 'var(--success)' : 'var(--error)',
            transition: triggered ? `width 0.8s cubic-bezier(0.16,1,0.3,1) ${rowDelay}ms` : 'none',
          }} />
        </div>
        <span style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '11px',
          color: law.passed ? 'var(--text-tertiary)' : 'var(--error)',
          minWidth: '24px',
          textAlign: 'right',
        }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export function QualitySection() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.unobserve(el); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* LEFT */}
          <Reveal>
            <div>
              <div style={{
                fontSize: '10px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Quality Guarantee
              </div>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.045em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}>
                28 laws. Every blueprint.
                <br />
                <span style={{
                  background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  No exceptions.
                </span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                The 28-Law methodology is a post-generation scoring rubric — not a system prompt.
                Every blueprint is evaluated against 28 quality dimensions, scored 0–100, with aggregate pass/fail logic.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '36px' }}>
                Failed laws trigger <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>targeted re-generation of specific sections only</strong> — not the whole blueprint. Max 2 cycles.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Scored 0–100 per law with full reasoning',
                  'Grade S / A / B / C / F assigned per blueprint',
                  'Automatic targeted re-generation on fail',
                  'Full override — accept any grade at any time',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(200,255,0,0.08)',
                      border: '1px solid rgba(200,255,0,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* RIGHT — animated quality report */}
          <Reveal delay={100}>
            <div
              ref={ref}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-hover)',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.03) inset',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Quality Report
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>Nuits Froides</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                    {useCountUp(88, triggered)}/100
                  </div>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                    fontSize: '24px', color: 'var(--success)', letterSpacing: '-0.04em', lineHeight: 1,
                  }}>
                    A
                  </div>
                </div>
              </div>

              {/* Overall bar */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>Overall score</span>
                  <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--success)' }}>7/8 passing</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: triggered ? '88%' : '0%',
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--success) 0%, var(--accent) 100%)',
                    transition: triggered ? 'width 1s cubic-bezier(0.16,1,0.3,1)' : 'none',
                  }} />
                </div>
              </div>

              {/* Law rows */}
              {SAMPLE_LAWS.map((law, i) => (
                <AnimatedRow key={law.id} law={law} triggered={triggered} rowDelay={i * 60} />
              ))}

              <div style={{ padding: '10px 20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  + 20 more laws evaluated
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default QualitySection;
