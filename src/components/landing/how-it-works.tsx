const STEPS = [
  {
    glyph: '◈',
    number: '01',
    title: 'Extract DNA',
    body:
      'Paste 3–5 lyrics samples or describe your style. ARE-E\'s AI decomposes your creative identity into 7 machine-readable vectors: lexical, emotional, rhythmic, thematic, sonic, structural, and influence.',
    detail: 'Stored as versioned JSONB. Non-portable. Grows richer with every generation.',
  },
  {
    glyph: '▶',
    number: '02',
    title: 'Generate',
    body:
      '4-stage pipeline: Intent Decomposition → Blueprint Generation (Gemini 3.1 Pro with context caching) → Quality Scoring → Targeted Re-generation. Streamed in real-time, section by section.',
    detail: '90% cost reduction on repeat generations via cached DNA context.',
  },
  {
    glyph: '◉',
    number: '03',
    title: 'Score & Refine',
    body:
      'Every blueprint is evaluated against 28 discrete quality laws. Failed laws trigger automatic re-generation of specific sections — not the whole blueprint. You get a grade (S/A/B/C/F) with per-law reasoning.',
    detail: 'You can override and accept any grade. Full transparency on why sections passed or failed.',
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            How It Works
          </p>
          <h2
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(24px, 4vw, 40px)',
              letterSpacing: '-0.02em',
            }}
          >
            Three steps. Zero compromise.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: '24px',
                padding: '32px 0',
                borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ textAlign: 'right', paddingTop: '4px' }}>
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {step.number}
                </span>
                <br />
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '20px',
                    color: 'var(--accent)',
                  }}
                >
                  {step.glyph}
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '18px',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '10px',
                  }}
                >
                  {step.body}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--accent)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    opacity: 0.8,
                  }}
                >
                  → {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
