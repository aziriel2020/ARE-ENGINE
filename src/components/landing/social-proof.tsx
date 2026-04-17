import Link from 'next/link';
import { Reveal } from './scroll-reveal';

const QUOTES = [
  'We replaced fragmented briefing with one professional generation system.',
  'Output quality is consistent enough to operationalize across teams.',
  'From cinematic scoring directions to mainstream hooks, it performs.',
];

export function SocialProof() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden', backgroundImage: "url('/brand/spotlight-noise.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.72), rgba(8,10,14,0.88))' }} />
      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <h2 style={{ margin: '0 0 34px', textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(34px, 5vw, 58px)', letterSpacing: '-0.05em', lineHeight: 0.96 }}>
            Trusted by high-performance creative teams
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {QUOTES.map((q, i) => (
            <Reveal key={q} delay={i * 70}>
              <div style={{ border: '1px solid rgba(255,255,255,0.13)', borderRadius: 14, padding: 24, background: 'rgba(14,18,24,0.72)', minHeight: 180 }}>
                <div style={{ color: 'var(--accent)', fontSize: 34, lineHeight: 1, marginBottom: 6 }}>“</div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75 }}>{q}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/sign-up" className="btn-primary" style={{ padding: '14px 30px', borderRadius: 10, fontWeight: 700 }}>
              Build My First Package
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default SocialProof;
