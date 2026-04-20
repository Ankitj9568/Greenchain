import { MapPin, Satellite, Cpu, IndianRupee } from "lucide-react";

export default function HowItWorks() {
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
          <div className="hidden md:block absolute top-13 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-emerald-500/10 via-emerald-500/50 to-emerald-500/10"></div>

          {steps.map((s, i) => (
            <div key={s.title} className="relative mt-8 md:mt-0 px-2 text-center group">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-transparent p-px transition-transform group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-2xl backdrop-blur-md" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                  <div className="text-emerald-600 dark:text-emerald-400">
                    {s.icon}
                  </div>
                </div>
              </div>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 -translate-y-15 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10">
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
