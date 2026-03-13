"use client";

import { useState } from "react";
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
          {["Mission", "How It Works", "Platform", "Market"].map((link) => (
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
            href="#auth"
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
            {["Mission", "How It Works", "Platform", "Market"].map((link) => (
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
              <a href="#auth" className="flex-1 rounded-full bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white">Get Started</a>
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
          India&apos;s{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 bg-clip-text text-transparent" style={{ backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>
            Farmer-First
          </span>{" "}
          Carbon Credit Platform
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl"
          style={{ color: "var(--text-secondary)", animation: "fadeInUp 0.7s ease 0.2s both" }}
        >
          Connecting 125 million smallholder farmers to the global carbon economy.
          Real land. Real crops. Real proof. INR-native settlement.
          Blockchain as proof only.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
        >
          <a href="#auth" className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40 transition-all hover:brightness-110">
            <Sprout size={18} /> I&apos;m a Farmer <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#auth"
            className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all hover:border-emerald-500/50"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card-subtle)" }}
          >
            <Building2 size={18} /> I&apos;m a Corporate <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4" style={{ animation: "fadeInUp 0.7s ease 0.45s both" }}>
          {[
            { value: "38.4%", label: "Carbon Market CAGR", icon: <TrendingUp size={16} className="text-emerald-500" /> },
            { value: "740+", label: "CCTS Entities", icon: <Building2 size={16} className="text-amber-500" /> },
            { value: "₹0", label: "Prototype Cost", icon: <IndianRupee size={16} className="text-emerald-500" /> },
            { value: "12–18mo", label: "First-Mover Window", icon: <Zap size={16} className="text-amber-500" /> },
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
   MISSION
   ═══════════════════════════════════════════════ */
function Mission() {
  return (
    <section id="mission" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, var(--gradient-hero), transparent)` }} />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Our Philosophy</p>
        <h2 className="mb-8 text-3xl font-extrabold leading-snug sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
          INR First → Farmer First →{" "}
          <span className="text-emerald-600 dark:text-emerald-400">Blockchain as Proof Only</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Every carbon credit on GreenChain represents <strong style={{ color: "var(--text-primary)" }}>real land</strong>,{" "}
          <strong style={{ color: "var(--text-primary)" }}>real crops</strong>,{" "}
          <strong style={{ color: "var(--text-primary)" }}>real proof</strong>, and a{" "}
          <strong style={{ color: "var(--text-primary)" }}>real farmer</strong>. We use satellite-verified MRV, NGO-audited
          ground truth, and COP-compliant audit trails. Blockchain is used only as a tamper-proof
          certificate registry — never as live application logic or currency.
        </p>

        {/* Philosophy pillars */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: <IndianRupee size={24} />,
              title: "INR-Native Settlement",
              desc: "Farmers always receive INR via UPI/NEFT. No crypto exposure, no FX risk. Platform absorbs conversion.",
            },
            {
              icon: <Shield size={24} />,
              title: "COP-Grade Audit Trail",
              desc: "SHA-256 hash-chained immutable logs. Every credit traces from land → crop → MRV → issuance.",
            },
            {
              icon: <Satellite size={24} />,
              title: "Satellite-Verified MRV",
              desc: "Sentinel-2 NDVI via Google Earth Engine. IPCC Tier-2 methodology. No guesswork, only science.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl p-7 text-left transition-all card-shadow hover:border-emerald-500/20"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                {p.icon}
              </div>
              <h3 className="mb-2 text-base font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
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
  const roles = [
    {
      icon: <Sprout size={28} />,
      role: "Farmer",
      color: "emerald",
      steps: [
        "Register with phone OTP + KYC",
        "Draw land plot polygon on map",
        "Upload geo-tagged crop proof",
        "Receive INR payment via UPI",
      ],
    },
    {
      icon: <Building2 size={28} />,
      role: "Corporate",
      color: "blue",
      steps: [
        "Register company + GSTIN",
        "Browse credits by vintage & state",
        "Purchase verified credits via Razorpay",
        "Retire credits for BRSR ESG dashboard",
      ],
    },
    {
      icon: <HandHeart size={28} />,
      role: "NGO Partner",
      color: "amber",
      steps: [
        "Onboard as verification partner",
        "Review geo-proofs & field visits",
        "Verify or dispute farmer plots",
        "Generate COP-compliant audit reports",
      ],
    },
  ];

  const colorMap: Record<string, { border: string; icon: string; text: string; dot: string }> = {
    emerald: { border: "border-emerald-500/20", icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
    blue: { border: "border-blue-500/20", icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400", text: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
    amber: { border: "border-amber-500/20", icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
  };

  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">How It Works</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Three roles. One ecosystem.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((r) => {
            const c = colorMap[r.color];
            return (
              <div
                key={r.role}
                className={`rounded-2xl ${c.border} p-7 card-shadow`}
                style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                  {r.icon}
                </div>
                <h3 className={`mb-5 text-lg font-bold ${c.text}`} style={{ fontFamily: "var(--font-heading)" }}>
                  {r.role}
                </h3>
                <ol className="space-y-4">
                  {r.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${c.dot}`}>
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FEATURES  (Platform pillars)
   ═══════════════════════════════════════════════ */
function Features() {
  const features = [
    {
      icon: <TreePine size={22} />,
      title: "Carbon Registry",
      desc: "STCC, LTCC, and TPC credit types. Partitioned by vintage year. Fully COP-compliant status lifecycle.",
      badge: "MVP Core",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "ESG Compliance Engine",
      desc: "BRSR Core-aligned dashboards for India's top 250+ listed companies. Automatic Scope 3 value chain reporting.",
      badge: "MVP Core",
    },
    {
      icon: <Shield size={22} />,
      title: "FRPS Trust Score",
      desc: "Farmer Reliability & Practice Score. Four tiers: Bronze → Platinum. Governs commissions, marketplace priority, and contract access.",
      badge: "FRPS",
    },
    {
      icon: <Globe size={22} />,
      title: "Dual Market Engine",
      desc: "INR-first domestic marketplace with Forex overflow for international corporate buyers. Farmers always paid in INR.",
      badge: "Phase 3",
    },
    {
      icon: <Users size={22} />,
      title: "Contract Farming",
      desc: "Digital contracts, round-robin allocation, escrow payments, yield-share distribution. Built on the 2018 Act.",
      badge: "Phase 3",
    },
    {
      icon: <Lock size={22} />,
      title: "Blockchain Proof",
      desc: "ERC-1155 credit NFTs on Polygon. On-chain proof for credit_id, CO₂e, and vintage. Off-chain for everything else.",
      badge: "Phase 3",
    },
  ];

  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, var(--gradient-hero), transparent)` }} />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Platform</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            9 ecosystem layers. One integrated stack.
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
            No platform in India or globally combines carbon issuance, agri-produce marketplace,
            ESG engine, contract farming, and INR-native settlement in a single farmer-first stack.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-7 transition-all hover:border-emerald-500/20 card-shadow"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  {f.icon}
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider
                  ${f.badge === "MVP Core" ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    f.badge === "FRPS" ? "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                      "border bg-transparent text-[var(--text-muted)]"}`}
                  style={f.badge !== "MVP Core" && f.badge !== "FRPS" ? { borderColor: "var(--border)" } : undefined}
                >
                  {f.badge}
                </span>
              </div>
              <h3 className="mb-2 text-base font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
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
    { label: "Approved Agri Carbon Methodologies", value: "8", cagr: "March 2025" },
  ];

  return (
    <section id="market" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Market Opportunity</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            The most favourable entry window in India&apos;s history.
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

        {/* Quote */}
        <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "var(--quote-bg)", border: `1px solid var(--quote-border)` }}>
          <p className="text-base italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            &quot;GreenChain enters when infrastructure is nascent but regulatory demand is just becoming
            mandatory. This is the textbook optimal entry point — before incumbents form, after the
            regulation is clear.&quot;
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            — Feasibility Analysis, March 2026
          </p>
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
        {/* Quote */}
        <div className="mb-12 text-center">
          <p className="text-xl font-bold italic sm:text-2xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-secondary)" }}>
            &quot;Make sustainable farming and climate responsibility economically inevitable.&quot;
          </p>
          <p className="mt-2 text-sm font-semibold tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
            INR First <span className="mx-2 text-emerald-500/50">•</span> Farmer First <span className="mx-2 text-emerald-500/50">•</span> Blockchain as Proof
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Image src="/logo.png" alt="GreenChain Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-base font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                <span className="text-emerald-600 dark:text-emerald-400">Green</span>
                <span style={{ color: "var(--text-primary)" }}>Chain</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              National Digital Climate &amp; Rural Livelihood Infrastructure
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Platform</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="#mission" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Mission</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#platform" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Ecosystem</a></li>
              <li><a href="#market" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Market</a></li>
            </ul>
          </div>

          {/* For */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>For</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <li><a href="#auth" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Farmers</a></li>
              <li><a href="#auth" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Corporates</a></li>
              <li><a href="#auth" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">NGO Partners</a></li>
              <li><a href="#auth" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Donors</a></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Compliance</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <li>CCTS Aligned</li>
              <li>BRSR Core Ready</li>
              <li>DPDP Act 2023</li>
              <li>COP Compliant</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            © 2026 GreenChain · PRANA · Version 2.0 · Confidential
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
        <Mission />
        <HowItWorks />
        <Features />
        <MarketSection />
        <AuthSection />
      </main>
      <Footer />
    </>
  );
}
