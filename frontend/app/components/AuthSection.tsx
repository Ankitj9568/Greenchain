"use client";

import { useState } from "react";
import { Sprout, Building2, HandHeart, ArrowRight } from "lucide-react";

export default function AuthSection() {
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
        <div className="absolute top-0 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full blur-[120px]" style={{ background: "var(--glow-g1)" }} />
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
                    : "hover:bg-(--bg-card-subtle)"}`}
                style={activeTab !== t.id ? { color: "var(--text-muted)" } : undefined}
              >
                {t.icon} <span className="hidden sm:inline">{t.label}</span>
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

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40 hover:brightness-110 transition-all">
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
