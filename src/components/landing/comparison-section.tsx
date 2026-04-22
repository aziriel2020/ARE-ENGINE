import { Reveal } from './scroll-reveal';

type Cell = { value: string; sub?: string; yes?: boolean; no?: boolean };

const COLS = [
  { id: 'are-e',   label: 'ANIMAENGINE V3',        sub: 'Opus Supreme',        highlight: true  },
  { id: 'chatgpt', label: 'ChatGPT',          sub: '+ custom prompt',     highlight: false },
  { id: 'other',   label: 'Lyric Generators', sub: 'Udio / Suno / etc.',  highlight: false },
];

const ROWS: { feature: string; cells: Record<string, Cell> }[] = [
  {
    feature: 'Knows your style before writing',
    cells: {
      'are-e':   { value: '7-dimension voice profile', yes: true },
      'chatgpt': { value: 'Guesses from your prompt', no: true },
      'other':   { value: 'No identity system', no: true },
    },
  },
  {
    feature: 'Quality score on every output',
    cells: {
      'are-e':   { value: 'Grade S / A / B / C / F', yes: true },
      'chatgpt': { value: 'No scoring whatsoever', no: true },
      'other':   { value: 'No scoring whatsoever', no: true },
    },
  },
  {
    feature: 'Fixes weak sections automatically',
    cells: {
      'are-e':   { value: 'Per-section — nothing else changes', yes: true },
      'chatgpt': { value: 'You rewrite it yourself', no: true },
      'other':   { value: 'Not available', no: true },
    },
  },
  {
    feature: '90% lower cost per generation',
    cells: {
      'are-e':   { value: 'Context caching built in', yes: true },
      'chatgpt': { value: 'Full tokens every time', no: true },
      'other':   { value: 'No caching', no: true },
    },
  },
  {
    feature: 'Watch it build word by word',
    cells: {
      'are-e':   { value: 'SSE — section by section', yes: true },
      'chatgpt': { value: 'Token-level only', no: true },
      'other':   { value: 'No streaming', no: true },
    },
  },
  {
    feature: 'Every draft saved and versioned',
    cells: {
      'are-e':   { value: 'Full history with compare', yes: true },
      'chatgpt': { value: 'Chat history only', no: true },
      'other':   { value: 'Nothing saved', no: true },
    },
  },
  {
    feature: 'Build tools on top of it',
    cells: {
      'are-e':   { value: 'Full REST API + webhooks', yes: true },
      'chatgpt': { value: 'OpenAI API (generic)', yes: true },
      'other':   { value: 'Limited or none', no: true },
    },
  },
  {
    feature: 'Gets better the more you use it',
    cells: {
      'are-e':   { value: 'DNA sharpens with every run', yes: true },
      'chatgpt': { value: 'Erodes toward the average', no: true },
      'other':   { value: 'Completely static', no: true },
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
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              vs. The Alternatives
            </div>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.05, color: 'var(--text-primary)',
            }}>
              The only tool built for{' '}
              <span style={{
                background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                your voice specifically.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ border: '1px solid var(--border-hover)', borderRadius: '14px', overflow: 'hidden' }}>

            <div style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
              background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-hover)',
            }}>
              <div style={{ padding: '18px 24px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Capability
                </span>
              </div>

              {COLS.map((col) => (
                <div key={col.id} style={{
                  padding: '18px 20px', borderLeft: '1px solid var(--border)',
                  background: col.highlight ? 'rgba(200,255,0,0.04)' : 'transparent', position: 'relative',
                }}>
                  {col.highlight && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                  )}
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px',
                    letterSpacing: '-0.03em', color: col.highlight ? 'var(--accent)' : 'var(--text-secondary)', marginBottom: '2px',
                  }}>
                    {col.label}
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.02em' }}>
                    {col.sub}
                  </div>
                </div>
              ))}
            </div>

            {ROWS.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
                borderBottom: i < ROWS.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {row.feature}
                  </span>
                </div>

                {COLS.map((col) => {
                  const cell = row.cells[col.id];
                  return (
                    <div key={col.id} style={{
                      padding: '14px 20px', borderLeft: '1px solid var(--border)',
                      background: col.highlight ? 'rgba(200,255,0,0.02)' : 'transparent',
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                      {cell.yes && <CheckIcon color={col.highlight ? 'var(--accent)' : 'var(--success)'} />}
                      {cell.no && <CrossIcon />}
                      <span style={{
                        fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace',
                        color: cell.yes ? (col.highlight ? 'var(--text-primary)' : 'var(--text-secondary)') : 'var(--text-ghost)',
                        letterSpacing: '0.01em', lineHeight: 1.4,
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
