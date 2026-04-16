import { PublicNav } from '@/components/nav/public-nav';
import { Hero } from '@/components/landing/hero';
import { LogoStrip } from '@/components/landing/logo-strip';
import { ProblemSection } from '@/components/landing/problem-section';
import { InteractiveDemo } from '@/components/landing/interactive-demo';
import { HowItWorks } from '@/components/landing/how-it-works';
import { QualitySection } from '@/components/landing/quality-section';
import { LawsSection } from '@/components/landing/laws-section';
import { DnaSection } from '@/components/landing/dna-section';
import { ApiSection } from '@/components/landing/api-section';
import { ComparisonSection } from '@/components/landing/comparison-section';
import { ManifestoSection } from '@/components/landing/manifesto-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { SocialProof } from '@/components/landing/social-proof';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { StickyCta } from '@/components/landing/sticky-cta';

export default function HomePage() {
  return (
    <>
      <PublicNav />
      <main>
        <Hero />
        <LogoStrip />
        <ProblemSection />
        <InteractiveDemo />
        <HowItWorks />
        <QualitySection />
        <LawsSection />
        <DnaSection />
        <ApiSection />
        <ComparisonSection />
        <ManifestoSection />
        <PricingSection />
        <SocialProof />
        <CtaSection />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
