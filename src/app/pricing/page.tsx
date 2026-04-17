import { PublicNav } from '@/components/nav/public-nav';
import { PricingSection } from '@/components/landing/pricing-section';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'Pricing — ARE-E',
  description: 'Pricing for artists, producers, studios, labels, and platforms using ARE-E.',
};

export default function PricingPage() {
  return (
    <>
      <PublicNav />
      <main>
        <div style={{ padding: '80px 24px 0', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(28px, 5vw, 48px)',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Pricing built for
            <br />
            <span style={{ color: 'var(--accent)' }}>real production output.</span>
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Start free, validate your workflow, then scale from solo creation to team-level generation.
          </p>
        </div>

        <PricingSection />

        <section style={{ padding: '64px 24px', maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', letterSpacing: '-0.02em', marginBottom: '32px' }}>
            FAQ
          </h2>
          {[
            {
              q: 'Can I start with only two inputs?',
              a: 'Yes. You can begin with Artist + Theme and still get a full generation package. You can also add advanced details for deeper control.',
            },
            {
              q: 'Do you support global genres and languages?',
              a: 'Yes. ARE-E is designed for multilingual and cross-genre output, including niche and hybrid sub-genres.',
            },
            {
              q: 'Can I generate for duet, trio, or band formats?',
              a: 'Yes. You can define role-aware direction in your prompt and generate for solo, duet, trio, or full band structures.',
            },
            {
              q: 'Which model powers flagship generations?',
              a: 'Flagship generations are designed to run on Gemini 3.1 Pro for high-fidelity planning and composition workflows.',
            },
            {
              q: 'Can labels and platforms integrate ARE-E?',
              a: 'Yes. Pro, Studio, and Enterprise tiers include API capabilities for internal tools and production pipelines.',
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
