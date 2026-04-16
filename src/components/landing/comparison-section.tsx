import { Reveal } from './scroll-reveal';

type Cell = { value: string; sub?: string; yes?: boolean; no?: boolean };

const COLS = [
  { id: 'are-e',   label: 'ARE-E V3',        sub: 'Opus Supreme', highlight: true  },
  { id: 'chatgpt', label: 'ChatGPT',          sub: '+ custom prompt', highlight: false },
  { id: 'other',   label: 'Lyric Generators', sub: 'Udio / Suno / etc.', highlight: false },
];

const ROWS: { feature: string; cells: Record<string, Cell> }[] = [
  {
    feature: 'Vocal DNA System',
    cells: {
      'are-e':   { value: '7 identity vectors', yes: true },
      'chatgpt': { value: 'None', no: true },
      'other':   { value: 'None', no: true },
    },
  },
  {
    feature: '28-Law Quality Scoring',
    cells: {
      'are-e':   { value: 'Grade S / A / B / C / F', yes: true },
      'chatgpt': { value: 'No scoring', no: true },
      'other':   { value: 'No scoring', no: true },
    },
  },
  {
    feature: 'Targeted Re-generation',
    cells: {
      'are-e':   { value: 'Per-section only', yes: true },
      'chatgpt': { value: 'Full regenerate', no: true },
      'other':   { value: 'Not available', no: true },
    },
  },
  {
    feature: 'Context Caching',
    cells: {
      'are-e':   { value: '90% cost reduction', yes: true },
      'chatgpt': { value: 'None', no: true },
      'other':   { value: 'None', no: true },
    },
  },
  {
    feature: 'Real-time Streaming',
    cells: {
      'are-e':   { value: 'SSE — section by section', yes: true },
      'chatgpt': { value: 'Token stream only', no: true },
      'other':   { value: 'No streaming', no: true },
    },
  },
  {
    feature: 'Blueprint Versioning',
    cells: {
      'are-e':   { value: 'Full history', yes: true },
      'chatgpt': { value: 'Chat history only', no: true },
      'other':   { value: 'None', no: true },
    },
  },
  {
    feature: 'API + Webhooks',
    cells: {
      'are-e':   { value: 'Full REST API', yes: true },
      'chatgpt': { value: 'OpenAI API', yes: true },
      'other':   { value: 'Limited / none', no: true },
    },
  },
  {
    feature: 'Style over time',
    cells: {
      'are-e':   { value: 'Gets sharper with use', yes: true },
      'chatgpt': { value: 'Degrades / homogenizes', no: true },
      'other':   { value: 'Static', no: true },
    },
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6.5" stroke={color} strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M4.5 7l2 2 3.5-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6.5" stroke="var(--text-ghost)" strokeWidth="1" fill="none"/>
      <path d="M5 5l4 4M9 5l-4 4" stroke="var(--text-ghost)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ComparisonSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-elevated)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              fontSize: '10px',
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              vs. The Alternatives
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.045em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
            }}>
              Why serious artists{' '}
              <span style={{
                background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                choose ARE-E.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{
            border: '1px solid var(--border-hover)',
            borderRadius: '14px',
            overflow: 'hidden',
          }}>

            {/* Column headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-hover)',
            }}>
              {/* Feature label col */}
              <div style={{ padding: '18px 24px' }}>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--text-ghost)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Feature
                </span>
              </div>

              {COLS.map((col) => (
                <div key={col.id} style={{
                  padding: '18px 20px',
                  borderLeft: '1px solid var(--border)',
                  background: col.highlight ? 'rgba(200,255,0,0.04)' : 'transparent',
                  position: 'relative',
                }}>
                  {col.highlight && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    }} />
                  )}
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    letterSpacing: '-0.03em',
                    color: col.highlight ? 'var(--accent)' : 'var(--text-secondary)',
                    marginBottom: '2px',
                  }}>
                    {col.label}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    color: 'var(--text-ghost)',
                    letterSpacing: '0.02em',
                  }}>
                    {col.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {ROWS.map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
                borderBottom: i < ROWS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                {/* Feature name */}
                <div style={{
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    {row.feature}
                  </span>
                </div>

                {/* Cell values */}
                {COLS.map((col) => {
                  const cell = row.cells[col.id];
                  return (
                    <div key={col.id} style={{
                      padding: '14px 20px',
                      borderLeft: '1px solid var(--border)',
                      background: col.highlight ? 'rgba(200,255,0,0.02)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      {cell.yes && <CheckIcon color={col.highlight ? 'var(--accent)' : 'var(--success)'} />}
                      {cell.no && <CrossIcon />}
                      <span style={{
                        fontSize: '12px',
                        fontFamily: 'IBM Plex Mono, monospace',
                        color: cell.yes
                          ? (col.highlight ? 'var(--text-primary)' : 'var(--text-secondary)')
                          : 'var(--text-ghost)',
                        letterSpacing: '0.01em',
                        lineHeight: 1.4,
                      }}>
                        {cell.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default ComparisonSection;
