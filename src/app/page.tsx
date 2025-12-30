import Hero from "@/components/landing/Hero"
import Header from "@/components/landing/Header";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatToAsk from "@/components/landing/WhatToAsk";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <Hero/>
      <HowItWorks/>
      <WhatToAsk/>
      <PricingSection/>
      <CTA/>
      <Footer/>
    </div>
  );
}
