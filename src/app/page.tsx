import { PublicNav } from '@/components/nav/public-nav';
import { Hero } from '@/components/landing/hero';
import { LogoStrip } from '@/components/landing/logo-strip';
import { ProblemSection } from '@/components/landing/problem-section';
import { InteractiveDemo } from '@/components/landing/interactive-demo';
import { HowItWorks } from '@/components/landing/how-it-works';
import { QualitySection } from '@/components/landing/quality-section';
import { SocialProof } from '@/components/landing/social-proof';
import { PricingSection } from '@/components/landing/pricing-section';
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
        <SocialProof />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
