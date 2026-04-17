const BEFORE_LINES = [
  { label: 'VERSE 1', color: 'var(--text-tertiary)' },
  { text: "I'm feeling lost inside my heart,",    color: 'var(--text-secondary)' },
  { text: 'The pain tears my world apart,',        color: 'var(--text-secondary)' },
  { text: 'Every single day feels cold,',          color: 'var(--text-secondary)' },
  { text: "As my story gets too old.",             color: 'var(--text-secondary)' },
  { label: 'CHORUS', color: 'var(--text-tertiary)' },
  { text: "I'll rise up from the fall,",           color: 'var(--text-secondary)' },
  { text: 'Standing tall through it all,',         color: 'var(--text-secondary)' },
];

const AFTER_LINES = [
  { label: 'VERSE 1', color: 'rgba(200,255,0,0.5)' },
  { text: 'Téléphone éteint depuis trois jours,', color: 'var(--text-primary)' },
  { text: 'personne a rappelé',                   color: 'var(--text-primary)' },
  { text: "T'as changé d'étage, t'as changé",    color: 'var(--text-primary)' },
  { text: "d'haleine, t'as oublié",               color: 'var(--text-primary)' },
  { label: 'CHORUS', color: 'rgba(200,255,0,0.5)' },
  { text: "J'aurais dû garder le silence,",       color: 'var(--text-primary)' },
  { text: "au lieu d'appeler ta clémence",        color: 'var(--text-primary)' },
];

export function ProblemSection() {
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
        inset: 0,
        background: 'radial-gradient(ellipse 40% 60% at 20% 50%, rgba(255,59,92,0.025) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 80% 50%, rgba(200,255,0,0.025) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--error)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: 0.75,
          }}>
            Why Every Other Tool Fails You
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 1.05,
            color: 'var(--text-primary)',
          }}>
            Generic AI sounds like{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FF4444 0%, #FF8080 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              everyone.
            </span>
            <br />
            ARE-E sounds like{' '}
            <span style={{
              background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              you.
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 1fr',
          gap: '0',
          alignItems: 'stretch',
          marginBottom: '72px',
        }}>

          {/* BEFORE card */}
          <div style={{
            background: 'rgba(255,59,92,0.03)',
            border: '1px solid rgba(255,59,92,0.12)',
            borderRadius: '12px 0 0 12px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,59,92,0.1)',
              background: 'rgba(255,59,92,0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                border: '1.5px solid rgba(255,59,92,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'var(--error)', fontSize: '11px', lineHeight: 1 }}>✕</span>
              </div>
              <span style={{
                fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--error)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8,
              }}>
                Any Generic AI Tool
              </span>
              <span style={{
                marginLeft: 'auto', fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
                color: 'rgba(255,59,92,0.4)', padding: '2px 6px',
                border: '1px solid rgba(255,59,92,0.15)', borderRadius: '3px',
              }}>
                No Identity
              </span>
            </div>

            <div style={{ padding: '24px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12.5px', lineHeight: 2 }}>
              {BEFORE_LINES.map((line, i) => (
                <div key={i} style={{
                  color: 'label' in line ? line.color : line.color,
                  fontSize: 'label' in line ? '10px' : '12.5px',
                  letterSpacing: 'label' in line ? '0.12em' : '0',
                  textTransform: 'label' in line ? 'uppercase' : 'none',
                  marginTop: 'label' in line && i > 0 ? '12px' : 0,
                  opacity: 'label' in line ? 1 : 0.55,
                }}>
                  {'label' in line ? line.label : line.text}
                </div>
              ))}
            </div>

            <div style={{
              margin: '0 20px 20px', padding: '12px 16px',
              background: 'rgba(255,59,92,0.06)', border: '1px solid rgba(255,59,92,0.12)', borderRadius: '7px',
            }}>
              <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'rgba(255,59,92,0.6)', marginBottom: '4px' }}>
                ✕ QUALITY CHECK FAILED
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Clichés detected · No voice mapping · Could be anyone
              </div>
            </div>
          </div>

          {/* Center divider */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', position: 'relative' }}>
            <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, transparent, var(--border), transparent)' }} />
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'var(--bg-surface)', border: '1px solid var(--border-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1,
            }}>
              <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>VS</span>
            </div>
            <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, transparent, var(--border), transparent)' }} />
          </div>

          {/* AFTER card */}
          <div style={{
            background: 'rgba(200,255,0,0.02)',
            border: '1px solid rgba(200,255,0,0.18)',
            borderRadius: '0 12px 12px 0',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(200,255,0,0.04)',
          }}>
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid rgba(200,255,0,0.12)',
              background: 'rgba(200,255,0,0.04)', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                border: '1.5px solid rgba(200,255,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'var(--accent)', fontSize: '10px', lineHeight: 1 }}>✓</span>
              </div>
              <span style={{
                fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace',
                color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                ARE-E Engine
              </span>
              <span style={{
                marginLeft: 'auto', fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace',
                color: 'rgba(200,255,0,0.6)', padding: '2px 6px',
                border: '1px solid rgba(200,255,0,0.2)', borderRadius: '3px',
              }}>
                DNA v2.3
              </span>
            </div>

            <div style={{ padding: '24px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12.5px', lineHeight: 2 }}>
              {AFTER_LINES.map((line, i) => (
                <div key={i} style={{
                  color: 'label' in line ? line.color : line.color,
                  fontSize: 'label' in line ? '10px' : '12.5px',
                  letterSpacing: 'label' in line ? '0.12em' : '0',
                  textTransform: 'label' in line ? 'uppercase' : 'none',
                  marginTop: 'label' in line && i > 0 ? '12px' : 0,
                }}>
                  {'label' in line ? line.label : line.text}
                </div>
              ))}
            </div>

            <div style={{
              margin: '0 20px 20px', padding: '12px 16px',
              background: 'rgba(200,255,0,0.04)', border: '1px solid rgba(200,255,0,0.12)',
              borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', marginBottom: '4px' }}>
                  ✓ 28-LAW QUALITY REPORT
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Voice matched · 25/28 laws passed · Grade A
                </div>
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '28px', color: 'var(--success)', letterSpacing: '-0.04em' }}>
                A
              </div>
            </div>
          </div>
        </div>

        {/* Three problem callouts */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px', background: 'var(--border)', borderRadius: '12px', overflow: 'hidden',
        }}>
          {[
            {
              num: '01',
              title: 'It sounds like everyone\'s first draft',
              body: 'ChatGPT writes the same hollow verse for a platinum artist and a bedroom producer. It has no concept of your vocabulary, your emotional axis, or what makes you sound like you.',
            },
            {
              num: '02',
              title: 'You get output. You never get better.',
              body: 'Every other tool hands you lyrics and disappears. ARE-E scores every blueprint against 28 quality laws, shows you exactly what passed and what failed, and re-generates the weak sections automatically.',
            },
            {
              num: '03',
              title: 'The more you use AI, the less you sound like yourself.',
              body: 'Generic tools erode your voice into the average. ARE-E Vocal DNA profiles grow richer, sharper, and more precise with every generation. Compounding identity — not dilution.',
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: '28px 24px', background: 'var(--bg-elevated)' }}>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-ghost)', letterSpacing: '0.1em', marginBottom: '12px' }}>
                {item.num}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '16px', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProblemSection;
