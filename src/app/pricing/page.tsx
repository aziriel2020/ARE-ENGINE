import { PublicNav } from '@/components/nav/public-nav';
import { PricingSection } from '@/components/landing/pricing-section';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'Pricing — ARE-E',
  description: 'Simple, transparent pricing for every stage of your creative career.',
};

export default function PricingPage() {
  return (
    <>
      <PublicNav />
      <main>
        <div style={{ padding: '80px 24px 0', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(28px, 5vw, 48px)',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Simple pricing.<br />
            <span style={{ color: 'var(--accent)' }}>Serious value.</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            93–97% margin per generation. The savings are passed directly to you
            through competitive pricing and context caching.
          </p>
        </div>
        <PricingSection />

        {/* FAQ */}
        <section style={{ padding: '64px 24px', maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', letterSpacing: '-0.02em', marginBottom: '32px' }}>
            FAQ
          </h2>
          {[
            {
              q: 'What happens when I hit my generation limit?',
              a: 'You\'ll receive a warning at 80% usage. Once you hit the limit, generation is paused until the next billing cycle. You can upgrade at any time.',
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes. Cancel from the billing portal at any time. You keep access until the end of your billing period.',
            },
            {
              q: 'What is a "generation"?',
              a: 'One complete blueprint generation, including all 4 pipeline stages (Intent Decomposition, Blueprint Generation, Quality Scoring, and any Targeted Re-generation). Up to 2 re-generation cycles are included in the count.',
            },
            {
              q: 'Is my Vocal DNA data portable?',
              a: 'You own your data. Export it anytime from Settings. That said, DNA profiles trained on ARE-E\'s knowledge base produce better results within the platform — the methodology is the moat, not a lock-in.',
            },
            {
              q: 'What AI models are used?',
              a: 'Primary: Gemini 3.1 Pro ($2/$12 per 1M tokens). Fast tier: Gemini 2.5 Flash ($0.30/$2.50). Fallback: Claude Sonnet 4.6. Context caching reduces cost by 90% on repeat generations with the same DNA profile.',
            },
          ].map((faq, i) => (
            <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '8px' }}>{faq.q}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
