import { PublicNav } from '@/components/nav/public-nav';
import { PricingSection } from '@/components/landing/pricing-section';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'Pricing — ARE-E',
  description: 'Premium pricing for high-performance music generation operations.',
};

const VALUE_POINTS = [
  { title: '2-input launch', body: 'Start with Artist + Theme and scale to deep briefs only when needed.' },
  { title: 'Global output', body: 'Coverage across language, genre, sub-genre, and instrumentation style.' },
  { title: 'Production package', body: 'Structure, lyrics, arrangement logic, and execution-ready prompts.' },
  { title: 'Team-ready controls', body: 'API keys, webhooks, and usage governance built for operators.' },
];

export default function PricingPage() {
  return (
    <>
      <PublicNav />
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/brand/aurora-grid.svg')", backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.55, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,8,10,0.44), rgba(7,8,10,0.95) 42%)', pointerEvents: 'none' }} />

        <section style={{ padding: '90px 24px 50px', maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(40px,7vw,78px)', letterSpacing: '-0.055em', lineHeight: 0.92, marginBottom: '16px' }}>
              Pricing for
              <br />
              <span style={{ background: 'linear-gradient(120deg,#C8FF00 0%, #8DFF2F 45%, #6AE6FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                billion-dollar execution
              </span>
            </h1>
            <p style={{ margin: '0 auto', maxWidth: '760px', fontSize: '17px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Choose your scale: creator, studio, or enterprise. All plans keep the same core principle — minimal input, maximum production output.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
            {VALUE_POINTS.map((point) => (
              <div key={point.title} style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: '12px', padding: '18px', background: 'rgba(13,16,22,0.66)' }}>
                <div style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'IBM Plex Mono, monospace', marginBottom: '8px' }}>{point.title}</div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        <PricingSection />

        <section style={{ padding: '64px 24px 90px', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', letterSpacing: '-0.03em', marginBottom: '20px' }}>Executive FAQ</h2>
          {[
            {
              q: 'Can we start small and scale later?',
              a: 'Yes. Start with Free/Pro, validate quality and speed, then scale into Studio/Enterprise without changing workflow foundations.',
            },
            {
              q: 'Does plan tier change generation quality?',
              a: 'Core architecture remains premium. Higher tiers unlock volume, profiles, controls, and integration scale.',
            },
            {
              q: 'Can this support label and media pipelines?',
              a: 'Yes. Studio and Enterprise plans are designed for team operations, internal workflows, and API/webhook orchestration.',
            },
          ].map((faq, i) => (
            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '18px 20px', marginBottom: '10px', background: 'rgba(255,255,255,0.01)' }}>
              <h3 style={{ margin: '0 0 8px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', letterSpacing: '-0.02em' }}>{faq.q}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
