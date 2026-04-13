const TESTIMONIALS = [
  {
    quote:
      'ARE-E is the first tool that actually sounds like me. The DNA system captures my flow in ways I couldn\'t even articulate myself.',
    author: 'Marcus K.',
    role: 'Independent artist, 12K streams/month',
  },
  {
    quote:
      'We onboarded 6 songwriters in a week. The quality scoring alone saves us 3 revision cycles per session.',
    author: 'Sofia R.',
    role: 'A&R Manager, indie label',
  },
  {
    quote:
      'I was skeptical about AI lyrics until I saw my DNA report. It mapped things about my style I\'d never consciously noticed.',
    author: 'Elias M.',
    role: 'Producer & songwriter, 80M streams',
  },
];

const STATS = [
  { value: '28', label: 'Quality Laws' },
  { value: '93%+', label: 'Margin/generation' },
  { value: '90%', label: 'Cost reduction via cache' },
  { value: '4-stage', label: 'Generation pipeline' },
];

export function SocialProof() {
  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px',
            marginBottom: '64px',
            padding: '32px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  marginTop: '4px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: '0.05em',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Social Proof
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {t.author}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    marginTop: '2px',
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
