import { Reveal } from './scroll-reveal';

const CODE_LINES = [
  { tokens: [{ t: 'import', c: 'kw' }, { t: ' { AreEngine } ', c: 'txt' }, { t: 'from', c: 'kw' }, { t: " '@are-engine/sdk'", c: 'str' }, { t: ';', c: 'txt' }] },
  { tokens: [] },
  { tokens: [{ t: 'const', c: 'kw' }, { t: ' are ', c: 'txt' }, { t: '=', c: 'op' }, { t: ' new AreEngine({\n', c: 'txt' }] },
  { tokens: [{ t: '  apiKey', c: 'txt' }, { t: ': ', c: 'op' }, { t: 'process.env.ARE_API_KEY', c: 'str' }] },
  { tokens: [{ t: '});', c: 'txt' }] },
  { tokens: [] },
  { tokens: [{ t: '// Extract Vocal DNA from reference lyrics', c: 'cm' }] },
  { tokens: [{ t: 'const', c: 'kw' }, { t: ' dna ', c: 'txt' }, { t: '=', c: 'op' }, { t: ' await ', c: 'kw' }, { t: 'are.dna.extract({', c: 'txt' }] },
  { tokens: [{ t: '  artistId', c: 'txt' }, { t: ': ', c: 'op' }, { t: "'nova-hayes-01'", c: 'str' }, { t: ',', c: 'txt' }] },
  { tokens: [{ t: '  samples', c: 'txt' }, { t: ': ', c: 'op' }, { t: 'referenceLyrics', c: 'txt' }, { t: ',', c: 'txt' }] },
  { tokens: [{ t: '});', c: 'txt' }] },
  { tokens: [] },
  { tokens: [{ t: '// Stream a blueprint with real-time SSE', c: 'cm' }] },
  { tokens: [{ t: 'const', c: 'kw' }, { t: ' stream ', c: 'txt' }, { t: '=', c: 'op' }, { t: ' are.blueprints.stream({', c: 'txt' }] },
  { tokens: [{ t: '  dnaId', c: 'txt' }, { t: ': ', c: 'op' }, { t: 'dna.id', c: 'txt' }, { t: ',', c: 'txt' }] },
  { tokens: [{ t: '  genre', c: 'txt' }, { t: ': ', c: 'op' }, { t: "'rnb-soul'", c: 'str' }, { t: ',', c: 'txt' }] },
  { tokens: [{ t: '  laws', c: 'txt' }, { t: ': ', c: 'op' }, { t: 'all', c: 'kw' }, { t: ',', c: 'txt' }] },
  { tokens: [{ t: '});', c: 'txt' }] },
  { tokens: [] },
  { tokens: [{ t: 'for await ', c: 'kw' }, { t: '(', c: 'txt' }, { t: 'const', c: 'kw' }, { t: ' chunk ', c: 'txt' }, { t: 'of', c: 'kw' }, { t: ' stream) {', c: 'txt' }] },
  { tokens: [{ t: "  if (chunk.type === ", c: 'txt' }, { t: "'delta'", c: 'str' }, { t: ') process.stdout.write(chunk.text);', c: 'txt' }] },
  { tokens: [{ t: "  if (chunk.type === ", c: 'txt' }, { t: "'score'", c: 'str' }, { t: ') console.log(chunk.grade); ', c: 'txt' }, { t: '// → "A"', c: 'cm' }] },
  { tokens: [{ t: '}', c: 'txt' }] },
];

const TOKEN_COLORS: Record<string, string> = {
  kw:  'var(--accent)',
  str: '#A8FF80',
  cm:  'var(--text-tertiary)',
  op:  'var(--text-secondary)',
  txt: 'var(--text-primary)',
};

const FEATURES = [
  { icon: '◈', title: 'REST + Real-time Streaming', desc: 'Every endpoint over HTTP and SSE — stream blueprints word by word into your own UI.' },
  { icon: '◉', title: 'Node & Python SDKs', desc: 'Type-safe clients, full autocomplete, zero boilerplate on voice profiles and generations.' },
  { icon: '▶', title: 'Webhook Events', desc: 'Fire on generation start, scoring complete, grade assigned — build reactive pipelines.' },
  { icon: '⌘', title: 'Batch Generation', desc: 'Submit 50 blueprints in one call with async callbacks — built for production at scale.' },
];

export function ApiSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', top: '20%', left: '0',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(200,255,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* LEFT */}
          <Reveal>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                marginBottom: '20px',
                background: 'rgba(200,255,0,0.05)',
                border: '1px solid rgba(200,255,0,0.15)',
                borderRadius: '99px',
                fontSize: '10px',
                fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--accent)',
                letterSpacing: '0.1em',
              }}>
                AVAILABLE ON PRO &amp; ABOVE
              </div>

              <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.05em',
                lineHeight: 1.0,
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}>
                Build on
                <br />
                <span style={{
                  background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  the ARE-E API
                </span>
              </h2>

              <p style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '40px',
              }}>
                Every part of the pipeline — voice mapping, blueprint generation, 28-law
                quality scoring, grade assignment — exposed as a first-class API. Build
                voice-aware music tools without rebuilding the infrastructure.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {FEATURES.map((f) => (
                  <div key={f.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'rgba(200,255,0,0.06)',
                      border: '1px solid rgba(200,255,0,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '12px',
                      color: 'var(--accent)',
                      fontFamily: 'IBM Plex Mono, monospace',
                    }}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{f.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* RIGHT — code */}
          <Reveal delay={100}>
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}>

              {/* Chrome */}
              <div className="terminal-chrome">
                <span className="terminal-dot" style={{ background: '#FF5F57' }} />
                <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
                <span className="terminal-dot" style={{ background: '#28CA41' }} />
                <span style={{ marginLeft: '14px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
                  are-sdk / quickstart.ts
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.06em' }}>
                  TypeScript
                </span>
              </div>

              {/* Code */}
              <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', lineHeight: 1.9 }}>
                <div style={{ background: 'rgba(255,255,255,0.015)', borderRight: '1px solid var(--border)', padding: '20px 0', textAlign: 'right' }}>
                  {CODE_LINES.map((_, i) => (
                    <div key={i} style={{ color: 'var(--text-ghost)', fontSize: '11px', paddingRight: '10px', userSelect: 'none' }}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '20px 20px 24px', overflowX: 'auto' }}>
                  {CODE_LINES.map((line, i) => (
                    <div key={i} style={{ whiteSpace: 'pre' }}>
                      {line.tokens.length === 0
                        ? '\u00A0'
                        : line.tokens.map((tok, j) => (
                          <span key={j} style={{ color: TOKEN_COLORS[tok.c] ?? 'var(--text-primary)' }}>
                            {tok.t}
                          </span>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div style={{ padding: '7px 16px', borderTop: '1px solid var(--border)', background: 'rgba(200,255,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.08em' }}>◈ ARE-ENGINE SDK v3</span>
                <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)' }}>npm i @are-engine/sdk</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ApiSection;
