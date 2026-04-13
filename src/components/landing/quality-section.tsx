const SAMPLE_LAWS = [
  { id: 1, name: 'No AI Clichés', score: 92, passed: true },
  { id: 2, name: 'Concrete Sensory Detail', score: 88, passed: true },
  { id: 11, name: 'Opening Line Hook', score: 95, passed: true },
  { id: 12, name: 'Show Don\'t Tell Ratio', score: 84, passed: true },
  { id: 15, name: 'DNA Lexical Alignment', score: 91, passed: true },
  { id: 20, name: 'No Forced Perfect Rhymes', score: 55, passed: false },
  { id: 21, name: 'No Greeting Card Lines', score: 96, passed: true },
  { id: 25, name: 'Metaphor Freshness', score: 89, passed: true },
];

export function QualitySection() {
  return (
    <section
      style={{
        padding: '80px 24px',
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <div>
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
              Quality Guarantee
            </p>
            <h2
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              28 laws. Every blueprint.<br />
              <span style={{ color: 'var(--accent)' }}>No exceptions.</span>
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              The 28-Law methodology is not a system prompt — it&apos;s a post-generation
              scoring rubric. Every blueprint is evaluated after generation against 28
              quality dimensions, scored 0–100, with aggregate pass/fail.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Failed laws trigger targeted re-generation of specific sections.
              Maximum 2 re-generation cycles. Final grade displayed with full
              per-law reasoning.
            </p>
          </div>

          {/* Sample quality report */}
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Quality Report — Nuits Froides
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  88/100
                </span>
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--success)',
                  }}
                >
                  A
                </span>
              </div>
            </div>
            {SAMPLE_LAWS.map((law) => (
              <div
                key={law.id}
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: law.passed ? 'var(--success)' : 'var(--error)', fontSize: '10px' }}>
                    {law.passed ? '●' : '●'}
                  </span>
                  <span style={{ fontSize: '12px', color: law.passed ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {law.id.toString().padStart(2, '0')}. {law.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '3px',
                      background: 'var(--border)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${law.score}%`,
                        height: '100%',
                        background: law.passed ? 'var(--success)' : 'var(--error)',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '11px',
                      color: law.passed ? 'var(--text-secondary)' : 'var(--error)',
                      minWidth: '28px',
                      textAlign: 'right',
                    }}
                  >
                    {law.score}
                  </span>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
                +20 more laws evaluated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QualitySection;
