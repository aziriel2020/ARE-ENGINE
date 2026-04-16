import { Reveal } from './scroll-reveal';

const LAWS = [
  { id: 1,  name: 'No AI Clichés',              desc: 'Bans overused AI-generation phrases and structures' },
  { id: 2,  name: 'Concrete Sensory Detail',     desc: 'Every verse needs at least one grounded image' },
  { id: 3,  name: 'Authentic Voice Consistency', desc: 'Vocabulary and tone must align with extracted DNA' },
  { id: 4,  name: 'Structural Coherence',        desc: 'Verse/hook/bridge roles clearly differentiated' },
  { id: 5,  name: 'Narrative Arc',               desc: 'Clear progression — beginning, turn, resolution' },
  { id: 6,  name: 'Emotional Trajectory',        desc: 'Emotional intensity must build or shift purposefully' },
  { id: 7,  name: 'Lexical Authenticity',        desc: 'Word choices match the artist\'s natural register' },
  { id: 8,  name: 'No Filler Lines',             desc: 'Every line earns its place — no padding' },
  { id: 9,  name: 'Hook Memorability',           desc: 'Hook must be distinct and singable in isolation' },
  { id: 10, name: 'Syllabic Flow',               desc: 'Natural cadence — counts align to rhythmic pattern' },
  { id: 11, name: 'Opening Line Hook',           desc: 'First line must arrest attention immediately' },
  { id: 12, name: 'Show Don\'t Tell Ratio',      desc: 'Max 30% abstract statement, 70% concrete action' },
  { id: 13, name: 'Internal Logic',              desc: 'No contradictions within the same blueprint' },
  { id: 14, name: 'Cultural Specificity',        desc: 'References must match cultural context layer' },
  { id: 15, name: 'DNA Lexical Alignment',       desc: 'Core vocabulary drawn from artist\'s lexical set' },
  { id: 16, name: 'No Repetitive Rhyme Pairs',   desc: 'Avoids moon/spoon, love/above, night/right' },
  { id: 17, name: 'Tension & Release',           desc: 'Verse must build tension resolved in chorus' },
  { id: 18, name: 'Metaphor Uniqueness',         desc: 'No recycled metaphors — scored against a blacklist' },
  { id: 19, name: 'Time & Place Grounding',      desc: 'At least one specific temporal or spatial anchor' },
  { id: 20, name: 'No Forced Perfect Rhymes',    desc: 'Meaning must never be distorted to force a rhyme' },
  { id: 21, name: 'No Greeting Card Lines',      desc: 'Bans inspirational-poster platitudes entirely' },
  { id: 22, name: 'Pronoun Consistency',         desc: 'I/you/we perspective stable unless intentional' },
  { id: 23, name: 'Bridge Contrast',             desc: 'Bridge must offer harmonic or lyrical contrast' },
  { id: 24, name: 'Syllable Stress Alignment',   desc: 'Stressed syllables land on downbeats' },
  { id: 25, name: 'Metaphor Freshness',          desc: 'Each metaphor checked against freshness database' },
  { id: 26, name: 'Cultural Safety Check',       desc: 'No appropriative misrepresentations of slang' },
  { id: 27, name: 'DNA Flow Signature',          desc: 'Rhythmic delivery pattern matches DNA vector' },
  { id: 28, name: 'Singability Score',           desc: 'Final test: can a human naturally perform this?' },
];

const COLS = [
  LAWS.slice(0, 7),
  LAWS.slice(7, 14),
  LAWS.slice(14, 21),
  LAWS.slice(21, 28),
];

export function LawsSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        bottom: '-100px', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(200,255,0,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              The 28 Laws of Quality
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
              Every blueprint, every time.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Not a prompt. A post-generation scoring system — 28 dimensions evaluated independently
              on every blueprint, graded 0–100, with automatic targeted re-generation on failures.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
            {COLS.map((col, ci) => (
              <div key={ci} style={{ background: 'var(--bg-surface)' }}>
                {col.map((law, i) => (
                  <div key={law.id} style={{
                    padding: '14px 16px',
                    borderBottom: i < col.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background 150ms ease',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontFamily: 'IBM Plex Mono, monospace',
                        color: 'var(--accent)',
                        opacity: 0.6,
                        minWidth: '20px',
                        paddingTop: '1px',
                        flexShrink: 0,
                      }}>
                        {law.id.toString().padStart(2, '0')}
                      </span>
                      <div>
                        <div style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginBottom: '3px',
                          lineHeight: 1.3,
                        }}>
                          {law.name}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: 'var(--text-tertiary)',
                          fontFamily: 'IBM Plex Mono, monospace',
                          lineHeight: 1.5,
                        }}>
                          {law.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'Grade S', range: '95–100', color: 'var(--accent)' },
              { label: 'Grade A', range: '80–94',  color: 'var(--success)' },
              { label: 'Grade B', range: '65–79',  color: 'var(--info)' },
              { label: 'Grade C', range: '50–64',  color: 'var(--warning)' },
              { label: 'Grade F', range: '0–49',   color: 'var(--error)' },
            ].map(g => (
              <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: g.color,
                  letterSpacing: '-0.04em',
                  minWidth: '28px',
                }}>
                  {g.label.split(' ')[1]}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>{g.label}</div>
                  <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>{g.range} avg</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default LawsSection;
