import Calculator from "@/components/home/calculator";
import { CryptoTickerContainer } from "@/components/home/crypto-ticker-container";
import FAQ from "@/components/home/faq";
import Feature from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Pricing from "@/components/home/pricing";
import Stats from "@/components/home/stats";
import { TestimonialsSection } from "@/components/home/testimonials";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function Home() {
  return (
    <MarketingLayout>
      <div className="grid gap-12">
        <CryptoTickerContainer />
        <Hero />
        <Pricing />
        <Calculator />
        <HowItWorks />
        <Feature />
        <TestimonialsSection />
        <Stats />
        <FAQ />
      </div>
    </MarketingLayout>
  );
}
