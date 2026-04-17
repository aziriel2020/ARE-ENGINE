import Link from 'next/link';

export function CtaSection() {
  return (
    <section style={{ padding: 'clamp(120px, 14vw, 180px) 32px', position: 'relative', overflow: 'hidden', backgroundImage: "url('/brand/aurora-grid.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,8,10,0.55), rgba(7,8,10,0.86))' }} />
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <h2 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(46px, 8vw, 100px)', letterSpacing: '-0.055em', lineHeight: 0.92 }}>
          Artist + Theme.
          <br />
          <span style={{ background: 'linear-gradient(120deg,#C8FF00 0%, #8DFF2F 45%, #6AE6FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Full production package.
          </span>
        </h2>
        <p style={{ margin: '22px auto 40px', maxWidth: 680, color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.8 }}>
          Start with two parameters. Scale to deep direction. Deliver enterprise-grade creative output.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/sign-up" className="btn-primary" style={{ padding: '16px 42px', borderRadius: 10, fontWeight: 700 }}>Start Now</Link>
          <Link href="/pricing" className="btn" style={{ padding: '15px 30px', borderRadius: 10 }}>See Pricing</Link>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
