import { PublicNav } from '@/components/nav/public-nav';
import { Hero } from '@/components/landing/hero';
import { ProblemSection } from '@/components/landing/problem-section';
import { HowItWorks } from '@/components/landing/how-it-works';
import { QualitySection } from '@/components/landing/quality-section';
import { DnaSection } from '@/components/landing/dna-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { SocialProof } from '@/components/landing/social-proof';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <QualitySection />
        <DnaSection />
        <PricingSection />
        <SocialProof />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
