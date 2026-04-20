import { ArrowRight, Play, ChevronRight, TrendingUp, Satellite, IndianRupee, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: "var(--glow-g1)" }} />
        <div className="absolute bottom-1/4 right-1/4 h-75 w-75 rounded-full blur-[100px]" style={{ background: "var(--glow-g2)" }} />
        <div className="absolute top-1/3 left-[16%] h-50 w-50 rounded-full blur-[80px]" style={{ background: "var(--glow-amber)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {/* Headline */}
        <h1
          className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
          style={{ fontFamily: "var(--font-heading)", animation: "fadeInUp 0.7s ease 0.1s both", color: "var(--text-primary)" }}
        >
          AI-Powered Land Intelligence<br />for{" "}
          <span className="bg-linear-to-r from-emerald-500 via-emerald-400 to-amber-400 bg-clip-text text-transparent" style={{ backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>
            Carbon & Climate Value
          </span>
        </h1>

        {/* Subheadline — updated messaging */}
        <div className="mx-auto mb-10 max-w-2xl text-center" style={{ animation: "fadeInUp 0.7s ease 0.2s both" }}>
          <p className="text-lg leading-relaxed sm:text-xl" style={{ color: "var(--text-secondary)" }}>
            We use AI to measure sustainability and blockchain to make it verifiable.
          </p>
          <p className="mt-2 text-sm sm:text-base opacity-70" style={{ color: "var(--text-muted)" }}>
            Carbon credits. Real income. For 125M Indian farmers.
          </p>
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
        >
          <a href="#live-demo" className="group flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/40 transition-all hover:brightness-110">
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
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6" style={{ animation: "fadeInUp 0.7s ease 0.45s both" }}>
          {[
            { value: "38.4%", label: "Carbon Market CAGR", icon: <TrendingUp size={16} className="text-emerald-500" /> },
            { value: "AI + NDVI", label: "Satellite Analysis", icon: <Satellite size={16} className="text-amber-500" /> },
            { value: "₹ INR", label: "Direct Farmer Value", icon: <IndianRupee size={16} className="text-emerald-500" /> },
            { value: "Instant", label: "Verification Proof", icon: <Zap size={16} className="text-amber-500" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 sm:p-5 card-shadow backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30 group"
              style={{ background: "var(--bg-card-subtle)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="mb-1 flex items-center justify-center gap-2">
                {stat.icon}
                <span className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{stat.value}</span>
              </div>
              <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
