import { Sprout, Building2, Globe } from "lucide-react";

export default function WhyPrana() {
  const cards = [
    {
      icon: <Sprout size={32} />,
      title: "Farmer Income",
      desc: "By monetizing sustainable practices, farmers unlock a completely new, direct stream of income paid straight to their bank accounts.",
      color: "emerald",
    },
    {
      icon: <Building2 size={32} />,
      title: "Corporate ESG",
      desc: "Companies can seamlessly achieve Net Zero targets and fulfill mandatory BRSR Core reporting using localized, verified credits.",
      color: "blue",
    },
    {
      icon: <Globe size={32} />,
      title: "Climate Impact",
      desc: "Incentivizing scalable agricultural shift provides immediate planetary relief and sequesters millions of tons of CO₂ organically.",
      color: "amber",
    },
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
              className="group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 card-shadow"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className={`mb-6 inline-flex p-4 rounded-xl ${
                c.color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
                c.color === "blue" ? "bg-blue-500/10 text-blue-500" :
                "bg-amber-500/10 text-amber-500"
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
