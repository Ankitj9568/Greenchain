export default function Footer() {
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
