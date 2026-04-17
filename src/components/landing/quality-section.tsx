'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from './scroll-reveal';

const SAMPLE_LAWS = [
  { id: 1,  name: 'No AI Clichés',           score: 92, passed: true },
  { id: 2,  name: 'Concrete Sensory Detail',  score: 88, passed: true },
  { id: 11, name: 'Opening Line Hook',        score: 95, passed: true },
  { id: 12, name: "Show Don't Tell",          score: 84, passed: true },
  { id: 15, name: 'Voice Alignment',          score: 91, passed: true },
  { id: 20, name: 'No Forced Rhymes',         score: 55, passed: false },
  { id: 21, name: 'No Clichéd Lines',         score: 96, passed: true },
  { id: 25, name: 'Fresh Metaphors',          score: 89, passed: true },
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
        setVal(Math.round(target * (1 - Math.pow(1 - p, 2))));
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
      padding: '9px 20px', borderBottom: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
      background: law.passed ? 'transparent' : 'rgba(255,59,92,0.02)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
          background: law.passed ? 'var(--success)' : 'var(--error)',
          boxShadow: law.passed ? '0 0 5px rgba(0,232,122,0.6)' : '0 0 5px rgba(255,59,92,0.6)',
        }} />
        <span style={{ fontSize: '12px', color: law.passed ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {law.id.toString().padStart(2, '0')}. {law.name}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div style={{ width: '56px', height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            width: triggered ? `${law.score}%` : '0%', height: '100%',
            background: law.passed ? 'var(--success)' : 'var(--error)',
            transition: triggered ? `width 0.8s cubic-bezier(0.16,1,0.3,1) ${rowDelay}ms` : 'none',
          }} />
        </div>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: law.passed ? 'var(--text-tertiary)' : 'var(--error)', minWidth: '24px', textAlign: 'right' }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export function QualitySection() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const headerScore = useCountUp(88, triggered);

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
      padding: 'clamp(96px, 12vw, 140px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', top: '-50px', right: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          <Reveal>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
                You get a grade. Not a guess.
              </div>
              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1.0,
                color: 'var(--text-primary)', marginBottom: '24px',
              }}>
                Other tools give you output.
                <br />
                <span style={{
                  background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  We give you a verdict.
                </span>
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>
                Every blueprint runs through 28 quality checkpoints before you ever read it.
                You get a grade — S through F — with the exact reason every check passed
                or failed. Sections that don&apos;t make the cut rewrite themselves automatically.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: '✓', text: 'Grade S to F — know the quality before you read a line' },
                  { icon: '✓', text: 'Weak sections fix themselves. Nothing else changes.' },
                  { icon: '✓', text: 'Exact reasoning for every passed and failed check' },
                  { icon: '✓', text: 'Override anything — your creative judgment wins, always' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div ref={ref} style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-hover)',
              borderRadius: '14px', overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.03) inset',
            }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid var(--border)',
                background: 'var(--bg-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    Quality Report
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>Nuits Froides</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                    {headerScore}/100
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '24px', color: 'var(--success)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    A
                  </div>
                </div>
              </div>

              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>Overall score</span>
                  <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--success)' }}>7/8 passing</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: triggered ? '88%' : '0%', height: '100%',
                    background: 'linear-gradient(90deg, var(--success) 0%, var(--accent) 100%)',
                    transition: triggered ? 'width 1s cubic-bezier(0.16,1,0.3,1)' : 'none',
                  }} />
                </div>
              </div>

              {SAMPLE_LAWS.map((law, i) => (
                <AnimatedRow key={law.id} law={law} triggered={triggered} rowDelay={i * 60} />
              ))}

              <div style={{ padding: '10px 20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  + 20 more quality checks run automatically
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
