"use client";

import { useState, useEffect, useRef } from "react";

export default function MouseBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${e.clientX - 400}px, ${e.clientY - 400}px, 0)`;
          }
          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"], .card-shadow')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-0 transition-opacity duration-300 will-change-transform rounded-full"
        style={{
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, var(--cursor-glow) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-1 transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(var(--border-subtle) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 14px 14px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.1) 80%)",
        }}
      />
      <div ref={ringRef} className="pointer-events-none fixed top-0 left-0 z-100 hidden sm:block will-change-transform">
        <div
          className="rounded-full border border-emerald-500/50 transition-all duration-300 ease-out"
          style={{
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
            width: "32px",
            height: "32px",
            backgroundColor: isHovering ? "rgba(16, 185, 129, 0.1)" : "transparent",
            boxShadow: isHovering ? "0 0 15px rgba(16, 185, 129, 0.3)" : "none",
          }}
        />
      </div>
      <div ref={dotRef} className="pointer-events-none fixed top-0 left-0 z-100 hidden sm:block will-change-transform">
        <div
          className="rounded-full bg-emerald-500 transition-opacity duration-150 ease-out"
          style={{
            transform: `translate(-50%, -50%)`,
            width: "6px",
            height: "6px",
            opacity: isHovering ? 0 : 1,
          }}
        />
      </div>
    </>
  );
}
