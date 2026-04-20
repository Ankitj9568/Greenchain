import { Satellite, Lock, CheckCircle2 } from "lucide-react";

export default function VerifiableByDesign() {
  const pillars = [
    {
      icon: <Satellite size={28} />,
      title: "AI Computes Value",
      desc: "Our engine analyzes multi-spectral satellite imagery to quantify exactly how much carbon your land sequesters — no guesswork.",
      color: "emerald" as const,
    },
    {
      icon: <Lock size={28} />,
      title: "Blockchain Ensures Integrity",
      desc: "Every credit is minted as a tamper-proof ERC-1155 NFT on Polygon. No double-counting. No fraud. Fully auditable.",
      color: "purple" as const,
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: "Credits Are Tamper-Proof",
      desc: "Anyone can independently verify a credit's data hash on-chain. The math is transparent, the proof is permanent.",
      color: "amber" as const,
    },
  ];

  return (
    <section id="verifiable" className="py-24 sm:py-32 relative">
      <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, var(--gradient-hero), transparent)` }} />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-purple-500">Proof Layer</p>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Verifiable by Design
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
            We use AI to measure sustainability and blockchain to make it verifiable. Every step is transparent, every credit is provable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl card-shadow"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className={`mb-6 inline-flex p-4 rounded-xl ${
                c.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
                c.color === "purple" ? "bg-purple-500/10 text-purple-500" :
                "bg-amber-500/10 text-amber-500"
              }`}>
                {c.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
