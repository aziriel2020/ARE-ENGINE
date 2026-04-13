const PROBLEMS = [
  {
    glyph: '◎',
    title: 'Generic output, zero identity',
    body:
      'ChatGPT generates the same hollow verses for Drake, Adele, and a 17-year-old bedroom producer. No model knows your metaphor frequency or your banned vocabulary list.',
  },
  {
    glyph: '◎',
    title: 'No quality feedback loop',
    body:
      'Other tools give you output and walk away. ARE-E scores every blueprint against 28 discrete laws, identifies failures, and re-generates the weak sections automatically.',
  },
  {
    glyph: '◎',
    title: 'Your style degrades over time',
    body:
      'The more you use generic AI tools, the more your output sounds like everyone else\'s. DNA profiles get richer with usage — the opposite of degradation.',
  },
];

export function ProblemSection() {
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
            The Problem
          </p>
          <h2
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(24px, 4vw, 40px)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            AI lyrics tools produce the same hollow,<br />
            <span style={{ color: 'var(--error)' }}>cliché-ridden output</span> for every artist.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} className="card">
              <span
                style={{
                  display: 'block',
                  fontSize: '20px',
                  color: 'var(--error)',
                  marginBottom: '12px',
                  fontFamily: 'IBM Plex Mono, monospace',
                }}
              >
                {p.glyph}
              </span>
              <h3
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '14px',
                  marginBottom: '10px',
                  color: 'var(--text-primary)',
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
