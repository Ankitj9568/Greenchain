"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveDemoPreview from "./components/LiveDemoPreview";
import HowItWorks from "./components/HowItWorks";
import VerifiableByDesign from "./components/VerifiableByDesign";
import WhyPrana from "./components/WhyPrana";
import TechStack from "./components/TechStack";
import MarketSection from "./components/MarketSection";
import AuthSection from "./components/AuthSection";
import Footer from "./components/Footer";
import MouseBackground from "./components/MouseBackground";

/* ═══════════════════════════════════════════════
   PAGE — COMPOSE EVERYTHING
   ═══════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <MouseBackground />
      <Navbar />
      <main>
        {/*
          Final Order:
          Hero
          ↓
          Core Engine (Demo)
          ↓
          How It Works
          ↓
          Results + Blockchain Proof (Verifiable by Design)
          ↓
          Features (future) (WhyPrana)
          ↓
          Architecture (optional) (TechStack)
          ↓
          Market (optional)
          ↓
          Auth
        */}
        <Hero />
        <LiveDemoPreview />
        <HowItWorks />
        <VerifiableByDesign />
        <WhyPrana />
        <TechStack />
        <MarketSection />
        <AuthSection />
      </main>
      <Footer />
    </>
  );
}
