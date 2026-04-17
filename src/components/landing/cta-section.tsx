import Link from 'next/link';

export function CtaSection() {
  return (
    <section style={{ padding: 'clamp(120px, 14vw, 180px) 32px', position: 'relative', overflow: 'hidden', backgroundImage: "url('/brand/cinematic-waves.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,8,10,0.4) 0%, rgba(7,8,10,0.82) 100%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '28px' }}>
          Ready to generate
        </div>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(44px, 7vw, 90px)', fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 0.92, color: 'var(--text-primary)', marginBottom: '34px' }}>
          Give two parameters.
          <br />
          Receive the full package.
        </h2>

        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '620px', margin: '0 auto 44px' }}>
          Built for global creation and commercial speed — from singer-songwriter to Hans Zimmer inspired cinematic production concepts.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/sign-up" className="btn-primary" style={{ fontSize: '17px', padding: '16px 48px', borderRadius: '10px', fontWeight: 700 }}>
            Start Free
          </Link>
          <Link href="/docs" className="btn-ghost" style={{ fontSize: '15px', padding: '15px 32px', borderRadius: '10px' }}>
            View System Docs
          </Link>
        </div>

        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.06em' }}>
          Solo · Duet · Trio · Band · Any language · Any genre
        </p>
      </div>
    </section>
  );
}

export default CtaSection;
