"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Start fading out after 1.5s
    const timer = setTimeout(() => setLoading(false), 1500);
    // Remove from DOM entirely after 2.5s
    const domTimer = setTimeout(() => setShow(false), 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(domTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] transition-all duration-700 ease-in-out ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none scale-105"
      }`}
    >
      {/* Soft emerald glow background */}
      <div className="absolute h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px]" />
      
      {/* Center Logo with scaling pulse */}
      <div className="relative animate-pulseGlow rounded-3xl p-6" style={{ animation: "pulseGlow 2s infinite" }}>
        <Image
          src="/logo.png"
          alt="GreenChain Logo"
          width={90}
          height={90}
          className="animate-pulse"
        />
      </div>
      
      {/* Loading progress bar at bottom */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-emerald-500 rounded-full transition-all duration-[1.5s] ease-out w-full" style={{ width: loading ? '10%' : '100%' }} />
      </div>
    </div>
  );
}
