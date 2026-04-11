"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./components/ThemeProvider";
import {
  Leaf,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  Menu,
  X,
  Sprout,
  Building2,
  HandHeart,
  Globe,
  Lock,
  TrendingUp,
  ChevronRight,
  Zap,
  TreePine,
  Satellite,
  IndianRupee,
  Sun,
  Moon,
  Monitor,
  MapPin,
  Play,
  CheckCircle2,
  Activity,
  Cpu
} from "lucide-react";

/* ═══════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════ */
function ThemeToggle() {
  const { theme, cycle } = useTheme();

  const icon =
    theme === "light" ? <Sun size={16} /> :
      theme === "dark" ? <Moon size={16} /> :
        <Monitor size={16} />;

  const label =
    theme === "light" ? "Light" :
      theme === "dark" ? "Dark" :
        "System";

  return (
    <button
      onClick={cycle}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
      style={{
        background: "var(--bg-card-subtle)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-subtle)",
      }}
      title={`Theme: ${label}. Click to cycle.`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{ background: "var(--bg-nav)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="GreenChain Logo"
            width={36}
            height={36}
            className="rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow"
          />
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-emerald-600 dark:text-emerald-400">Green</span>
            <span style={{ color: "var(--text-primary)" }}>Chain</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {["How It Works", "Live Demo", "Why Prana", "Market"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              style={{ color: "var(--text-muted)" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Auth buttons + theme toggle (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#auth"
            className="rounded-full px-5 py-2 text-sm font-medium transition-all hover:text-emerald-600 dark:hover:text-emerald-400"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            Sign In
          </a>
          <a
            href="#live-demo"
            className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40 hover:brightness-110 transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile burger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} style={{ color: "var(--text-muted)" }} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="px-5 pb-6 pt-4 md:hidden" style={{ background: "var(--bg-nav-mobile)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="flex flex-col gap-4">
            {["How It Works", "Live Demo", "Why Prana", "Market"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className="text-sm hover:text-emerald-600 dark:hover:text-emerald-400"
                style={{ color: "var(--text-secondary)" }}
              >
                {link}
              </a>
            ))}
            <div className="mt-2 flex gap-3">
              <a
                href="#auth"
                className="flex-1 rounded-full py-2.5 text-center text-sm font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                Sign In
              </a>
              <a href="#live-demo" className="flex-1 rounded-full bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white">Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: "var(--glow-g1)" }} />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full blur-[100px]" style={{ background: "var(--glow-g2)" }} />
        <div className="absolute top-1/3 left-[16%] h-[200px] w-[200px] rounded-full blur-[80px]" style={{ background: "var(--glow-amber)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {/* Headline */}
        <h1
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
          style={{ fontFamily: "var(--font-heading)", animation: "fadeInUp 0.7s ease 0.1s both", color: "var(--text-primary)" }}
        >
          AI-Powered Land Intelligence<br />for{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 bg-clip-text text-transparent" style={{ backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>
            Carbon & Climate Value
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--text-secondary)", animation: "fadeInUp 0.7s ease 0.2s both" }}
        >
          Convert satellite data into sustainability insights, carbon credits, and real income.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
        >
          <a href="#live-demo" className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40 transition-all hover:brightness-110">
            <Play size={18} /> Run Live Demo <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all hover:border-emerald-500/50"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card-subtle)" }}
          >
            How it works <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4" style={{ animation: "fadeInUp 0.7s ease 0.45s both" }}>
          {[
            { value: "38.4%", label: "Carbon Market CAGR", icon: <TrendingUp size={16} className="text-emerald-500" /> },
            { value: "AI + NDVI", label: "Satellite Analysis", icon: <Satellite size={16} className="text-amber-500" /> },
            { value: "₹ INR", label: "Direct Farmer Value", icon: <IndianRupee size={16} className="text-emerald-500" /> },
            { value: "Instant", label: "Verification Proof", icon: <Zap size={16} className="text-amber-500" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 card-shadow backdrop-blur-sm"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="mb-1 flex items-center justify-center gap-2">
                {stat.icon}
                <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{stat.value}</span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    {
      icon: <MapPin size={28} />,
      title: "Select your land on map",
      desc: "Farmers easily outline their plot or pin their location using our mobile-friendly interface.",
    },
    {
      icon: <Satellite size={28} />,
      title: "AI analyzes satellite data",
      desc: "Our engine fetches multi-spectral Sentinel-2 data to calculate historic and current NDVI indexes.",
    },
    {
      icon: <Cpu size={28} />,
      title: "Get sustainability score",
      desc: "Vegetation health, soil trends, and weather patterns are synthesized into a unified Trust Score.",
    },
    {
      icon: <IndianRupee size={28} />,
      title: "Earn carbon value in INR",
      desc: "Verified sustainable practices are minted as carbon credits and sold to corporates. Farmers paid directly.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, var(--gradient-hero), transparent)` }} />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-14 xl:text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Core Pipeline</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Land → Intelligence → Value
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4 relative">
          {/* Timeline connecting line (hidden on mobile) */}
          <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-emerald-500/10 via-emerald-500/50 to-emerald-500/10"></div>

          {steps.map((s, i) => (
            <div key={s.title} className="relative mt-8 md:mt-0 px-2 text-center group">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent p-[1px] transition-transform group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-2xl backdrop-blur-md" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                   <div className="text-emerald-600 dark:text-emerald-400">
                     {s.icon}
                   </div>
                </div>
              </div>
              <div className="absolute top-[28px] left-1/2 -translate-x-1/2 -translate-y-[60px] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10">
                {i + 1}
              </div>
              <h3 className="mb-3 text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   LIVE DEMO PREVIEW (MOCK)
   ═══════════════════════════════════════════════ */
function LiveDemoPreview() {
  const [step, setStep] = useState(0); // 0 = Map Select, 1 = Loading AI, 2 = Results
  const [loadingText, setLoadingText] = useState("Initializing neural engine...");

  const runDemo = () => {
    setStep(1);
    const phrases = [
      "Analyzing multi-spectral satellite data...",
      "Calculating Normalized Difference Vegetation Index (NDVI)...",
      "Generating IPCC-compliant carbon estimate...",
      "Finalizing ecosystem valuation..."
    ];
    let i = 0;
    
    const interval = setInterval(() => {
      setLoadingText(phrases[i]);
      i++;
      if (i >= phrases.length) {
        clearInterval(interval);
        setTimeout(() => setStep(2), 800);
      }
    }, 1200);
  };

  const resetDemo = () => setStep(0);

  return (
    <section id="live-demo" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">Live Preview</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            See the Engine in Action
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
            Experience our MVP logic. Select a dummy land plot and watch our AI convert satellite imagery into financial carbon value.
          </p>
        </div>

        {/* Demo Window */}
        <div className="overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl card-shadow" style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border)" }}>
          
          {/* Header bar mimicking an app/browser */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-4 text-xs font-mono font-medium opacity-50 tracking-wider">prana.greenchain.io/engine</span>
          </div>

          <div className="relative h-[400px] w-full p-6 flex flex-col items-center justify-center">

            {/* STATE 0: Map Select */}
            {step === 0 && (
              <div className="flex h-full w-full flex-col items-center justify-center text-center animate-fade-in">
                {/* CSS Map Mockup */}
                <div className="relative mb-8 h-48 w-full max-w-md overflow-hidden rounded-xl bg-emerald-900/10" style={{ border: "1px dashed var(--border)"}}>
                   {/* Abstract map lines */}
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--text-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                   <div className="absolute top-1/2 left-1/2 h-24 w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-emerald-500 bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                     <MapPin className="text-emerald-500 animate-bounce" size={24}/>
                   </div>
                </div>
                <h3 className="mb-2 text-xl font-bold" style={{ color: "var(--text-primary)" }}>Plot 42 - Maharashtra</h3>
                <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>Total Area: 2.4 Hectares • Crop: Sugarcane</p>
                <button onClick={runDemo} className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors">
                  <Activity size={18} /> Analyze Satellite Data
                </button>
              </div>
            )}

            {/* STATE 1: Loading / AI inference */}
            {step === 1 && (
              <div className="flex flex-col items-center justify-center text-center w-full h-full animate-pulse">
                {/* Glowing orb scanner */}
                <div className="relative mb-10 h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-r-2 border-amber-500 animate-[spin_2s_reverse_infinite]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Satellite className="text-emerald-500" size={32} />
                  </div>
                  {/* Scan line effect */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                </div>
                <h3 className="text-lg font-mono font-bold tracking-tight text-emerald-500 dark:text-emerald-400">{loadingText}</h3>
              </div>
            )}

            {/* STATE 2: Output Dashboard */}
            {step === 2 && (
              <div className="w-full h-full flex flex-col justify-center animate-fade-in">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>Analysis Complete</h3>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={14}/> Verified
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                  <div className="flex flex-col justify-center rounded-xl p-5" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Sustainability Score</p>
                    <p className="text-4xl font-black text-amber-500">78<span className="text-xl text-amber-500/50">/100</span></p>
                    <p className="mt-2 text-[10px]" style={{ color: "var(--text-muted)" }}>High vegetation density (NDVI: 0.65)</p>
                  </div>
                  <div className="flex flex-col justify-center rounded-xl p-5" style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border-subtle)" }}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Carbon Credits</p>
                    <p className="text-4xl font-black text-blue-500">2.4<span className="text-xl text-blue-500/50"> tons</span></p>
                    <p className="mt-2 text-[10px]" style={{ color: "var(--text-muted)" }}>CO₂e sequestered annually</p>
                  </div>
                  <div className="flex flex-col justify-center rounded-xl p-5 border border-emerald-500/30 bg-emerald-500/5 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <IndianRupee size={100} />
                    </div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Estimated Value</p>
                    <p className="text-4xl font-black text-emerald-600 dark:text-emerald-500">₹3,200</p>
                    <p className="mt-2 text-[10px] text-emerald-600/70 dark:text-emerald-400/70">Direct matching available.</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                   <button onClick={resetDemo} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity">
                     Reset Demo ↺
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}}/>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WHY PRANA / GREENCHAIN
   ═══════════════════════════════════════════════ */
function WhyPrana() {
  const cards = [
    {
      icon: <Sprout size={32} />,
      title: "Farmer Income",
      desc: "By monetizing sustainable practices, farmers unlock a completely new, direct stream of income paid straight to their bank accounts.",
      color: "emerald"
    },
    {
      icon: <Building2 size={32} />,
      title: "Corporate ESG",
      desc: "Companies can seamlessly achieve Net Zero targets and fulfill mandatory BRSR Core reporting using localized, verified credits.",
      color: "blue"
    },
    {
      icon: <Globe size={32} />,
      title: "Climate Impact",
      desc: "Incentivizing scalable agricultural shift provides immediate planetary relief and sequesters millions of tons of CO₂ organically.",
      color: "amber"
    }
  ];

  return (
    <section id="why-prana" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Value Proposition</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Why Prana / GreenChain
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl p-8 transition-transform hover:-translate-y-1 card-shadow"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className={`mb-6 inline-flex p-4 rounded-xl ${
                c.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : 
                c.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                'bg-amber-500/10 text-amber-500'
              }`}>
                {c.icon}
              </div>
              <h3 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                {c.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MARKET OPPORTUNITY
   ═══════════════════════════════════════════════ */
function MarketSection() {
  const data = [
    { label: "India Voluntary Carbon Market (2030)", value: "$1.16 Bn", cagr: "38.4% CAGR" },
    { label: "CCTS-Obligated Industrial Entities", value: "740", cagr: "Binding targets" },
    { label: "BRSR Core Mandatory Companies (FY25-26)", value: "250+", cagr: "Expanding to 500+" },
    { label: "Approved Agri Carbon Methodologies", value: "8", cagr: "March 2026" },
  ];

  return (
    <section id="market" className="py-24 sm:py-32 relative">
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to top, transparent, var(--gradient-hero), transparent)` }} />
      <div className="relative mx-auto max-w-5xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Market Opportunity</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            The most favourable entry window.
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
            CCTS compliance started 2025. BRSR Core is mandatory this financial year.
            Corporate buyers are actively seeking verified credits <em>right now</em>.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {data.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-5 rounded-2xl p-6 card-shadow"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                  {d.value}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{d.label}</p>
                <span className="mt-1 inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {d.cagr}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   AUTH CTA SECTION
   ═══════════════════════════════════════════════ */
function AuthSection() {
  const [activeTab, setActiveTab] = useState<"farmer" | "corporate" | "ngo">("farmer");

  const tabs = [
    { id: "farmer" as const, label: "Farmer", icon: <Sprout size={16} /> },
    { id: "corporate" as const, label: "Corporate", icon: <Building2 size={16} /> },
    { id: "ngo" as const, label: "NGO", icon: <HandHeart size={16} /> },
  ];

  const content: Record<string, { title: string; desc: string; cta: string; fields: string[] }> = {
    farmer: {
      title: "Start earning from your land",
      desc: "Register with your phone number, draw your plot on the map, and start earning carbon credits in INR.",
      cta: "Register as Farmer",
      fields: ["Full Name", "Phone Number (OTP)", "State / District"],
    },
    corporate: {
      title: "Meet your ESG targets",
      desc: "Browse verified, COP-compliant carbon credits from Indian farmers. BRSR-aligned dashboard included.",
      cta: "Register as Corporate",
      fields: ["Company Name", "GSTIN", "Work Email"],
    },
    ngo: {
      title: "Become a verification partner",
      desc: "Verify farmer plots, review geo-proofs, and help build India's most trusted carbon registry.",
      cta: "Apply as NGO Partner",
      fields: ["Organization Name", "Contact Person", "Email"],
    },
  };

  const c = content[activeTab];

  return (
    <section id="auth" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "var(--glow-g1)" }} />
      </div>

      <div className="relative mx-auto max-w-3xl px-5">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Join GreenChain</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Be part of India&apos;s climate infrastructure.
          </h2>
        </div>

        {/* Auth card */}
        <div
          className="overflow-hidden rounded-3xl shadow-2xl shadow-emerald-900/5 dark:shadow-emerald-900/10 backdrop-blur-sm"
          style={{ background: "var(--bg-card-subtle4)", border: "1px solid var(--border)" }}
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold transition-all
                  ${activeTab === t.id
                    ? "border-b-2 border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                    : "hover:bg-[var(--bg-card-subtle)]"}`}
                style={activeTab !== t.id ? { color: "var(--text-muted)" } : undefined}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div className="p-8 sm:p-10">
            <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{c.title}</h3>
            <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>{c.desc}</p>

            <div className="space-y-4">
              {c.fields.map((field) => (
                <div key={field}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{field}</label>
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--input-border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              ))}
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40 hover:brightness-110 transition-all">
              {c.cta} <ArrowRight size={16} />
            </button>

            <p className="mt-5 text-center text-xs" style={{ color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <a href="#" className="font-semibold text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400">
                Sign in →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: "var(--bg-page)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-12 text-center">
          <p className="text-xl font-bold italic sm:text-2xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-secondary)" }}>
            &quot;Make sustainable farming and climate responsibility economically inevitable.&quot;
          </p>
          <p className="mt-2 text-sm font-semibold tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
            INR First <span className="mx-2 text-emerald-500/50">•</span> Farmer First <span className="mx-2 text-emerald-500/50">•</span> AI Verified
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            © 2026 GreenChain · PRANA · Phase 0 MVP · Confidential
          </p>
          <div className="flex gap-4 text-xs" style={{ color: "var(--text-faint)" }}>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Privacy</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Terms</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE — COMPOSE EVERYTHING
   ═══════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <LiveDemoPreview />
        <WhyPrana />
        <MarketSection />
        <AuthSection />
      </main>
      <Footer />
    </>
  );
}
