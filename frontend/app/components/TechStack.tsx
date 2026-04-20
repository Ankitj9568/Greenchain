import { Satellite, Lock, IndianRupee } from "lucide-react";

export default function TechStack() {
  const pillars = [
    {
      icon: <Satellite size={28} />,
      title: "Google Earth Engine MRV",
      desc: "Instant multi-spectral satellite ingestion (Sentinel-2) to establish verifiable NDVI growth models per geo-fenced plot.",
    },
    {
      icon: <Lock size={28} />,
      title: "Polygon Blockchain Proof",
      desc: "Every carbon credit is minted as a tamper-proof ERC-1155 NFT on the Polygon network to prevent double-spending and ensure COP-compliant auditability.",
    },
    {
      icon: <IndianRupee size={28} />,
      title: "INR Settlement Layer",
      desc: "Abstracts completely away from crypto volatility. Ecosystem value is settled directly via standard API banking into rural bank accounts.",
    },
  ];

  return (
    <section id="technology" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500">Core Architecture</p>
          <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
            Built for Scale & Trust
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl p-8 transition-transform hover:-translate-y-1 card-shadow"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
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
