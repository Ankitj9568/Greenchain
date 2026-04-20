import { TrendingUp } from "lucide-react";

export default function MarketSection() {
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
              className="flex items-center gap-5 rounded-2xl p-5 sm:p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/20 group"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <TrendingUp size={24} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                  {d.value}
                </p>
                <p className="text-xs sm:text-sm" style={{ color: "var(--text-muted)" }}>{d.label}</p>
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
