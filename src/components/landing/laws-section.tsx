import { Reveal } from './scroll-reveal';

const LAWS = [
  { id: 1,  name: 'No AI Clichés',              desc: 'Every cliché is caught and banned before you see it' },
  { id: 2,  name: 'Concrete Sensory Detail',     desc: 'Forces real, grounded images — no vague abstraction' },
  { id: 3,  name: 'Authentic Voice Consistency', desc: 'Your tone holds across every verse, every line' },
  { id: 4,  name: 'Structural Coherence',        desc: 'Verses build, choruses land, bridges shift — every time' },
  { id: 5,  name: 'Narrative Arc',               desc: 'There is a story. It goes somewhere. It means something.' },
  { id: 6,  name: 'Emotional Trajectory',        desc: 'The feeling builds, shifts, resolves. No flatlines.' },
  { id: 7,  name: 'Lexical Authenticity',        desc: 'Uses your words and register — not default AI vocabulary' },
  { id: 8,  name: 'No Filler Lines',             desc: 'Every line earns its position. Nothing exists to fill space.' },
  { id: 9,  name: 'Hook Memorability',           desc: 'The chorus lives in your head after one listen' },
  { id: 10, name: 'Syllabic Flow',               desc: 'The cadence works in your mouth, not just on the page' },
  { id: 11, name: 'Opening Line Hook',           desc: 'The first line makes you stop and pay attention' },
  { id: 12, name: 'Show Don\'t Tell Ratio',      desc: 'Images carry emotion — direct statements stay under 30%' },
  { id: 13, name: 'Internal Logic',              desc: 'Nothing contradicts itself within the same song' },
  { id: 14, name: 'Cultural Specificity',        desc: 'Every reference is real, specific, and earned' },
  { id: 15, name: 'DNA Lexical Alignment',       desc: 'Your core vocabulary runs through every section' },
  { id: 16, name: 'No Repetitive Rhyme Pairs',   desc: 'moon/spoon, love/above, night/right — all banned' },
  { id: 17, name: 'Tension & Release',           desc: 'The verse builds pressure. The chorus releases it.' },
  { id: 18, name: 'Metaphor Uniqueness',         desc: 'Every metaphor checked against a blacklist of overused images' },
  { id: 19, name: 'Time & Place Grounding',      desc: 'A real location, a real moment — not vague setting' },
  { id: 20, name: 'No Forced Perfect Rhymes',    desc: 'Meaning is never sacrificed to make a rhyme work' },
  { id: 21, name: 'No Greeting Card Lines',      desc: 'Inspirational platitudes are banned completely' },
  { id: 22, name: 'Pronoun Consistency',         desc: 'The point of view holds unless you intentionally shift it' },
  { id: 23, name: 'Bridge Contrast',             desc: 'The bridge does something genuinely different' },
  { id: 24, name: 'Syllable Stress Alignment',   desc: 'Natural word stress lands on the musical downbeat' },
  { id: 25, name: 'Metaphor Freshness',          desc: 'Freshness scored against a live database — not gut feeling' },
  { id: 26, name: 'Cultural Safety Check',       desc: 'Slang and cultural references reviewed for authenticity' },
  { id: 27, name: 'DNA Flow Signature',          desc: 'Your rhythmic pattern is traceable through every bar' },
  { id: 28, name: 'Singability Score',           desc: 'The final test: can a human naturally sing this?' },
];

const COLS = [LAWS.slice(0, 7), LAWS.slice(7, 14), LAWS.slice(14, 21), LAWS.slice(21, 28)];

export function LawsSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      background: 'var(--bg-elevated)',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
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
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1.0,
              color: 'var(--text-primary)', marginBottom: '16px',
            }}>
              Every blueprint, every time.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Not a system prompt — a post-generation scoring engine. Every blueprint is evaluated
              against 28 independent quality dimensions, scored 0–100, graded S through F.
              Fail a law and only that section re-generates. You see every score, every reason.
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
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
                        color: 'var(--accent)', opacity: 0.6, minWidth: '20px', paddingTop: '1px', flexShrink: 0,
                      }}>
                        {law.id.toString().padStart(2, '0')}
                      </span>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '3px', lineHeight: 1.3 }}>
                          {law.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.5 }}>
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
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Grade S', range: '95–100', color: 'var(--accent)', note: 'Exceptional' },
              { label: 'Grade A', range: '80–94',  color: 'var(--success)', note: 'Strong' },
              { label: 'Grade B', range: '65–79',  color: 'var(--info)', note: 'Solid' },
              { label: 'Grade C', range: '50–64',  color: 'var(--warning)', note: 'Needs work' },
              { label: 'Grade F', range: '0–49',   color: 'var(--error)', note: 'Rejected' },
            ].map(g => (
              <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                  fontSize: '20px', color: g.color, letterSpacing: '-0.04em', minWidth: '16px',
                }}>
                  {g.label.split(' ')[1]}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-secondary)' }}>{g.note}</div>
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
