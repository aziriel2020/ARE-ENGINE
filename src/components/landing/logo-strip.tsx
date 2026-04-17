const LOGOS = [
  { name: 'GLOBAL COMPOSER NETWORK', weight: 700, spacing: '-0.04em' },
  { name: 'CINEMATIC SCORING COLLECTIVE', weight: 300, spacing: '0.08em' },
  { name: 'A&R OPERATIONS LAB', weight: 600, spacing: '-0.02em' },
  { name: 'SONG CAMP ALLIANCE', weight: 400, spacing: '0.08em' },
  { name: 'MEDIA MUSIC STUDIO', weight: 700, spacing: '-0.05em' },
  { name: 'LABEL INNOVATION GROUP', weight: 300, spacing: '0.1em' },
  { name: 'PRODUCTION DESIGN UNIT', weight: 600, spacing: '-0.03em' },
  { name: 'COMPOSER-TECH GUILD', weight: 700, spacing: '-0.04em' },
];

const ROW = [...LOGOS, ...LOGOS];

export function LogoStrip() {
  return (
    <section style={{
      padding: 'clamp(48px, 6vw, 64px) 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-elevated)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Used by global songwriting, scoring, and production workflows
      </div>

      <div className="marquee-track">
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 32s linear infinite', alignItems: 'center' }}>
          {ROW.map((logo, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0', paddingRight: '56px', whiteSpace: 'nowrap' }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: logo.weight, fontSize: '13px', color: 'var(--text-primary)', opacity: 0.18, letterSpacing: logo.spacing, textTransform: 'uppercase' }}>
                {logo.name}
              </span>
              <span style={{ marginLeft: '56px', width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text-ghost)', display: 'inline-block', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoStrip;
