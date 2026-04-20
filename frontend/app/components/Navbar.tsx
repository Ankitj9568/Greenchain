"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl"
      style={{ background: "var(--bg-nav)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
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
        <div className="hidden items-center gap-2 md:flex">
          {["Live Demo", "How It Works", "Why Prana", "Market"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 group"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="relative z-10">{link}</span>
              <span className="absolute inset-0 rounded-lg bg-emerald-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"></span>
            </a>
          ))}
        </div>

        {/* Auth buttons + theme toggle (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#auth"
            className="relative overflow-hidden rounded-full px-5 py-2 text-sm font-medium transition-all hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 group"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            <span className="relative z-10">Sign In</span>
            <span className="absolute inset-0 bg-emerald-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
          </a>
          <a
            href="#live-demo"
            className="rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40 hover:brightness-110 transition-all"
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
            {["Live Demo", "How It Works", "Why Prana", "Market"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm transition-all hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                style={{ color: "var(--text-secondary)" }}
              >
                {link}
              </a>
            ))}
            <div className="mt-2 flex gap-3">
              <a
                href="#auth"
                className="relative overflow-hidden flex-1 rounded-full py-2.5 text-center text-sm font-medium transition-all hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 group"
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 bg-emerald-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
              </a>
              <a href="#live-demo" className="flex-1 rounded-full bg-emerald-600 py-2.5 text-center text-sm font-semibold text-white">Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
