const STEPS = [
  {
    number: '01',
    title: 'Map Your Voice',
    body: 'Paste 3–5 lyrics samples or describe your style in plain language. ARE-E extracts your creative identity into 7 private voice dimensions — your vocabulary, emotional axis, rhythmic fingerprint, thematic space, sonic texture, structural preferences, and influence weights. Mapped once, used forever.',
    detail: 'Private and account-bound. Gets more accurate every time you generate.',
    badge: 'DNA EXTRACTION',
    glyph: '◉',
    data: [
      'lexical.tier         → street',
      'emotional.axis       → defiant',
      'rhythmic.flow        → 92 BPM',
      'influence.SCH        → 0.40',
    ],
  },
  {
    number: '02',
    title: 'Watch It Build Live',
    body: 'One click starts a 4-stage pipeline: intent decomposition, full blueprint generation via Gemini 2.5 Pro, 28-law quality scoring, and targeted re-generation of any section that fails. Every word streams to your screen as it\'s being written — no waiting, no spinning loader.',
    detail: 'Context caching delivers 90% lower API cost. Flagship model quality on every generation.',
    badge: '4-STAGE PIPELINE',
    glyph: '▶',
    data: [
      'stage 1 / intent decomposed',
      'stage 2 / blueprint generated',
      'stage 3 / 28 laws scored',
      'stage 4 / weak sections regenned',
    ],
  },
  {
    number: '03',
    title: 'Get a Grade. Know Why.',
    body: 'Every blueprint is scored against 28 discrete quality laws — no clichés, concrete sensory detail, voice alignment, flow signature, and 24 more. You get a grade from S to F with per-law reasoning. Sections that fail re-generate automatically. You always keep final override.',
    detail: 'Grade in under 4 minutes. Max 2 re-generation cycles. Full transparency on every decision.',
    badge: '28-LAW SCORING',
    glyph: '◈',
    data: [
      '01. No AI Clichés          92 ✓',
      '02. Sensory Detail         88 ✓',
      '20. No Forced Rhymes       55 ✗',
      '   → targeted regen fired',
    ],
  },
];

export function HowItWorks() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        top: '50%', right: '-200px',
        transform: 'translateY(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            How It Works
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--text-primary)',
          }}>
            Three steps.{' '}
            <span style={{
              background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Zero compromise.
            </span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '0', borderTop: '1px solid var(--border)',
              padding: 'clamp(40px, 5vw, 64px) 0', position: 'relative',
            }}>

              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: 'clamp(120px, 16vw, 220px)',
                color: 'var(--text-primary)', opacity: 0.018,
                letterSpacing: '-0.08em', lineHeight: 1,
                userSelect: 'none', pointerEvents: 'none', zIndex: 0,
              }}>
                {step.number}
              </div>

              {/* Left — copy */}
              <div style={{ paddingRight: '64px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}>
                    {step.number}
                  </span>
                  <span style={{
                    fontSize: '9px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)',
                    letterSpacing: '0.12em', padding: '3px 8px',
                    border: '1px solid rgba(200,255,0,0.2)', borderRadius: '4px', background: 'rgba(200,255,0,0.04)',
                  }}>
                    {step.badge}
                  </span>
                </div>

                <div style={{
                  width: '44px', height: '44px', background: 'var(--bg-elevated)',
                  border: '1px solid rgba(200,255,0,0.18)', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px', boxShadow: '0 0 24px rgba(200,255,0,0.06)',
                }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '18px', color: 'var(--accent)' }}>
                    {step.glyph}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700,
                  letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '16px',
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '15px', color: 'var(--text-secondary)',
                  lineHeight: 1.8, marginBottom: '20px', maxWidth: '420px',
                }}>
                  {step.body}
                </p>

                <div style={{
                  display: 'inline-flex', gap: '8px', alignItems: 'flex-start',
                  padding: '10px 14px', background: 'rgba(200,255,0,0.04)',
                  border: '1px solid rgba(200,255,0,0.1)', borderRadius: '7px',
                }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', flexShrink: 0, paddingTop: '1px' }}>→</span>
                  <span style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
                    {step.detail}
                  </span>
                </div>
              </div>

              {/* Right — preview */}
              <div style={{
                paddingLeft: '64px', borderLeft: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  width: '100%', background: 'var(--bg-surface)',
                  border: '1px solid var(--border-hover)', borderRadius: '10px', overflow: 'hidden',
                }}>
                  <div style={{
                    padding: '10px 16px', borderBottom: '1px solid var(--border)',
                    background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
                    <span style={{ marginLeft: '8px', fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.04em' }}>
                      step {i + 1} output
                    </span>
                  </div>
                  <div style={{ padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', lineHeight: 2 }}>
                    {step.data.map((line, j) => (
                      <div key={j} style={{
                        color: line.includes('✓') ? 'var(--success)' : line.includes('✗') ? 'var(--error)' : line.includes('regen') ? 'var(--accent)' : 'var(--text-secondary)',
                      }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}

          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
