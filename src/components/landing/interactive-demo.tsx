'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from './scroll-reveal';

const PRESETS = [
  {
    id: 'french-trap',
    label: 'French Trap',
    artist: 'Lil Sombre',
    vectors: [
      { name: 'Lexical Tier',    value: 88, tag: 'street / verlan' },
      { name: 'Emotional Axis',  value: 72, tag: 'defiant' },
      { name: 'Rhythmic Flow',   value: 91, tag: 'syncopated' },
      { name: 'Imagery Density', value: 65, tag: 'sparse / raw' },
      { name: 'Rhyme Scheme',    value: 79, tag: 'slant / internal' },
      { name: 'Cultural Layer',  value: 94, tag: 'banlieue' },
      { name: 'Voice Signature', value: 83, tag: 'deadpan' },
    ],
    lyrics: [
      '[VERSE 1]',
      "Téléphone éteint depuis trois jours, personne a rappelé",
      "T'as changé d'étage, t'as changé d'haleine, t'as oublié",
      "J'compte les billets dans le noir, le plafond me répond pas",
      "Ma mère dit prie, mon frerot dit cash, moi j'dis pas le choix",
      '',
      '[HOOK]',
      'Nuits froides, cœur blindé — ouais',
      "J'avance dans le brouillard mais j'lâche pas",
    ],
    grade: 'A',
    score: 91,
  },
  {
    id: 'uk-drill',
    label: 'UK Drill',
    artist: 'M1llz',
    vectors: [
      { name: 'Lexical Tier',    value: 95, tag: 'road / slang' },
      { name: 'Emotional Axis',  value: 60, tag: 'cold / stoic' },
      { name: 'Rhythmic Flow',   value: 97, tag: 'triplet / synth' },
      { name: 'Imagery Density', value: 82, tag: 'cinematic' },
      { name: 'Rhyme Scheme',    value: 85, tag: 'multisyllabic' },
      { name: 'Cultural Layer',  value: 92, tag: 'south london' },
      { name: 'Voice Signature', value: 74, tag: 'menacing' },
    ],
    lyrics: [
      '[VERSE 1]',
      'Shoulder check at the opp block, leng on me still',
      'These man talk figures, my figures make their figures look ill',
      'Dark nights, tunnel vision — road life pays the bills',
      'My bro did a spin and he never came back, how does that feel',
      '',
      '[HOOK]',
      "Ride out, no feeling — it's all chess",
      "When you're living in the shh you can't second guess",
    ],
    grade: 'A',
    score: 88,
  },
  {
    id: 'rnb-soul',
    label: 'R&B Soul',
    artist: 'Nova Hayes',
    vectors: [
      { name: 'Lexical Tier',    value: 76, tag: 'poetic / intimate' },
      { name: 'Emotional Axis',  value: 93, tag: 'vulnerable' },
      { name: 'Rhythmic Flow',   value: 68, tag: 'melismatic' },
      { name: 'Imagery Density', value: 90, tag: 'sensory rich' },
      { name: 'Rhyme Scheme',    value: 71, tag: 'near / free' },
      { name: 'Cultural Layer',  value: 82, tag: 'neo-soul' },
      { name: 'Voice Signature', value: 96, tag: 'signature' },
    ],
    lyrics: [
      '[VERSE 1]',
      'Sunday morning, your cologne still lives in the sheets',
      "I keep the window cracked — I don't want the ghost to leave",
      "Three missed calls on Tuesday, I watched 'em fade to grey",
      'Love is architecture — you took the load-bearing walls away',
      '',
      '[HOOK]',
      "I'm not okay — and that's okay now",
      "Learning how to breathe without your sound",
    ],
    grade: 'S',
    score: 96,
  },
];

type Phase = 'idle' | 'extracting' | 'generating' | 'scoring' | 'done';

export function InteractiveDemo() {
  const [selectedId, setSelectedId] = useState(PRESETS[0].id);
  const [phase, setPhase] = useState<Phase>('idle');
  const [extractedCount, setExtractedCount] = useState(0);
  const [streamedLines, setStreamedLines] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [scoreVal, setScoreVal] = useState(0);
  const [showGrade, setShowGrade] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const preset = PRESETS.find(p => p.id === selectedId) ?? PRESETS[0];

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const push = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const reset = () => {
    clear();
    setPhase('idle');
    setExtractedCount(0);
    setStreamedLines(0);
    setCharCount(0);
    setScoreVal(0);
    setShowGrade(false);
  };

  const run = () => {
    reset();
    setPhase('extracting');

    // Extract 7 DNA vectors one-by-one
    preset.vectors.forEach((_, i) => {
      push(() => setExtractedCount(i + 1), 120 * (i + 1));
    });

    const genStart = 120 * 7 + 400;
    push(() => setPhase('generating'), genStart);

    // Stream lyrics line by line
    preset.lyrics.forEach((_, i) => {
      push(() => setStreamedLines(i + 1), genStart + 260 * (i + 1));
    });

    const scoreStart = genStart + 260 * preset.lyrics.length + 400;
    push(() => { setPhase('scoring'); setScoreVal(0); }, scoreStart);

    // Count up score
    const duration = 900;
    const steps = 30;
    for (let s = 1; s <= steps; s++) {
      push(() => {
        setScoreVal(Math.round(preset.score * (s / steps)));
      }, scoreStart + (duration / steps) * s);
    }

    push(() => {
      setPhase('done');
      setShowGrade(true);
    }, scoreStart + duration + 200);
  };

  useEffect(() => {
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  useEffect(() => () => clear(), []);

  const gradeColor = preset.grade === 'S' ? 'var(--accent)' : 'var(--success)';

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '0', left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Live Demo
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1.0,
              color: 'var(--text-primary)',
              marginBottom: '16px',
            }}>
              See your voice in the machine.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Choose a style profile. Watch ARE-E extract the voice DNA, stream a full blueprint live,
              and score it against 28 laws in under 4 minutes. No setup. No waiting.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          {/* Preset selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelectedId(p.id); }}
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  border: selectedId === p.id ? '1px solid var(--accent)' : '1px solid var(--border-hover)',
                  background: selectedId === p.id ? 'rgba(200,255,0,0.06)' : 'transparent',
                  color: selectedId === p.id ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

            {/* LEFT — DNA panel */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              borderRadius: '14px',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Vocal DNA</span>
                  <span style={{ marginLeft: '12px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)' }}>{preset.artist}</span>
                </div>
                {phase === 'extracting' && (
                  <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="live-dot" style={{ width: '5px', height: '5px' }} />
                    EXTRACTING
                  </span>
                )}
                {(phase === 'generating' || phase === 'scoring' || phase === 'done') && (
                  <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--success)', letterSpacing: '0.08em' }}>7 / 7 COMPLETE</span>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                {preset.vectors.map((v, i) => {
                  const revealed = extractedCount > i || phase === 'generating' || phase === 'scoring' || phase === 'done';
                  return (
                    <div key={v.name} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: revealed ? 'var(--text-secondary)' : 'var(--text-ghost)', transition: 'color 300ms ease' }}>
                          {v.name}
                        </span>
                        <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: revealed ? 'var(--accent)' : 'var(--text-ghost)', transition: 'color 300ms ease' }}>
                          {revealed ? v.tag : '...'}
                        </span>
                      </div>
                      <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          width: revealed ? `${v.value}%` : '0%',
                          height: '100%',
                          background: `linear-gradient(90deg, var(--accent) 0%, rgba(200,255,0,0.4) 100%)`,
                          transition: revealed ? 'width 0.7s cubic-bezier(0.16,1,0.3,1)' : 'none',
                          borderRadius: '2px',
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — output panel */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              borderRadius: '14px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Blueprint Output</span>
                {phase === 'generating' && (
                  <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="live-dot" style={{ width: '5px', height: '5px' }} />
                    GENERATING
                  </span>
                )}
                {phase === 'scoring' && (
                  <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--warning)', letterSpacing: '0.08em' }}>SCORING...</span>
                )}
                {phase === 'done' && (
                  <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--success)', letterSpacing: '0.08em' }}>COMPLETE</span>
                )}
              </div>

              <div style={{ flex: 1, padding: '20px', minHeight: '240px', position: 'relative' }}>
                {phase === 'idle' && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px' }}>
                    Press Run to start the pipeline
                  </div>
                )}
                {phase !== 'idle' && preset.lyrics.slice(0, streamedLines).map((line, i) => (
                  <div key={i} style={{
                    fontFamily: line.startsWith('[') ? 'IBM Plex Mono, monospace' : 'Space Grotesk, sans-serif',
                    fontSize: line.startsWith('[') ? '10px' : '13px',
                    color: line === '' ? 'transparent' : line.startsWith('[') ? 'var(--accent)' : 'var(--text-primary)',
                    lineHeight: 1.7,
                    letterSpacing: line.startsWith('[') ? '0.1em' : '-0.01em',
                    opacity: 0,
                    animation: 'fade-in-up 0.4s ease forwards',
                    animationDelay: `${i * 30}ms`,
                  }}>
                    {line || '\u00A0'}
                  </div>
                ))}
                {!['idle', 'done'].includes(phase) && streamedLines < preset.lyrics.length && (
                  <div className="cursor-blink" />
                )}
              </div>

              {/* Score footer */}
              {(phase === 'scoring' || phase === 'done') && (
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--border)',
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', marginBottom: '2px' }}>28-LAW SCORE</div>
                    <div style={{ height: '3px', width: '120px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${scoreVal}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--success), var(--accent))',
                        transition: 'width 0.05s linear',
                      }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {scoreVal}/100
                    </span>
                    {showGrade && (
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 700,
                        fontSize: '28px',
                        color: gradeColor,
                        letterSpacing: '-0.05em',
                        animation: 'grade-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
                      }}>
                        {preset.grade}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Run button */}
        <Reveal delay={160}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px', gap: '12px' }}>
            <button
              onClick={run}
              disabled={phase !== 'idle' && phase !== 'done'}
              className="btn-primary"
              style={{
                fontSize: '15px',
                padding: '13px 40px',
                borderRadius: '8px',
                opacity: (phase !== 'idle' && phase !== 'done') ? 0.5 : 1,
                cursor: (phase !== 'idle' && phase !== 'done') ? 'not-allowed' : 'pointer',
                transition: 'opacity 200ms ease',
              }}
            >
              {phase === 'idle' ? 'Run Pipeline' : phase === 'done' ? 'Run Again' : 'Running...'}
              {phase === 'idle' && (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" />
                </svg>
              )}
            </button>
            {phase !== 'idle' && (
              <button
                onClick={reset}
                className="btn-ghost"
                style={{ fontSize: '14px', padding: '12px 24px', borderRadius: '8px' }}
              >
                Reset
              </button>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default InteractiveDemo;
