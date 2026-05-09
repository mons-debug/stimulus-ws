"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

const LOGO_SRC = "https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png";
const WHITE_TEXT_MASK = { WebkitMaskImage: "linear-gradient(to left, white 60%, transparent 68%)", maskImage: "linear-gradient(to left, white 60%, transparent 68%)" } as React.CSSProperties;

function LogoWithWhiteText({ className }: { className?: string }) {
  return (
    <div className={`relative ${className || ""}`}>
      <Image src={LOGO_SRC} alt="Stimulus Groups" width={180} height={60} className="h-full w-auto" priority />
      <div className="absolute inset-0">
        <Image src={LOGO_SRC} alt="" width={180} height={60} className="h-full w-auto [filter:brightness(0)_invert(1)]" style={WHITE_TEXT_MASK} aria-hidden="true" />
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const isLg = useRef(false);

  useEffect(() => {
    const checkLg = () => { isLg.current = window.innerWidth >= 1024; };
    checkLg();
    window.addEventListener("resize", checkLg);
    return () => window.removeEventListener("resize", checkLg);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (!mobileOpen) {
        if (y > 200 && y > lastY.current + 8) setHidden(true);
        if (y < lastY.current - 3) setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMenu = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  return (
    <>
    <header
      className={[
        "fixed left-0 right-0 z-50 transition-all duration-400 ease-in-out",
        hidden && !mobileOpen ? "-top-20" : "top-0",
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — hide when menu open */}
          <Link href="/" className={`transition-opacity duration-150 ${mobileOpen ? "opacity-0 pointer-events-none" : ""}`}>
            {scrolled && !mobileOpen ? (
              <Image src={LOGO_SRC} alt={SITE_CONFIG.name} width={180} height={60} className="h-12 lg:h-14 w-auto" priority />
            ) : (
              <LogoWithWhiteText className="h-12 lg:h-14" />
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${scrolled ? "text-navy hover:text-coral hover:bg-warm-gray" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop social */}
          <div className="hidden lg:flex items-center gap-2.5">
            {[
              { href: SITE_CONFIG.social.linkedin, label: "LinkedIn", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>, hoverBg: "hover:bg-[#0A66C2] hover:border-[#0A66C2]", size: "w-4 h-4" },
              { href: SITE_CONFIG.social.instagram, label: "Instagram", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>, hoverBg: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:border-transparent", size: "w-4 h-4" },
              { href: SITE_CONFIG.social.twitter, label: "X", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>, hoverBg: "hover:bg-black hover:border-black", size: "w-3.5 h-3.5" },
              { href: SITE_CONFIG.social.facebook, label: "Facebook", icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>, hoverBg: "hover:bg-[#1877F2] hover:border-[#1877F2]", size: "w-4 h-4" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className={`group w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md ${s.hoverBg} ${scrolled ? "bg-white/80 backdrop-blur-sm border border-border/50" : "bg-white/10 border border-white/20"}`}>
                <svg className={`${s.size} group-hover:text-white transition-colors ${scrolled ? "text-navy/60" : "text-white/70"}`} fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>

          {/* Mobile hamburger — always at z-50, always visible */}
          <button onClick={toggleMenu} aria-label="Toggle menu"
            className={`lg:hidden p-2 relative z-[70] ${mobileOpen || !scrolled ? "text-white" : "text-navy"}`}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

    </header>

    {/* Mobile fullscreen overlay — OUTSIDE header to avoid stacking context issues */}
    {mobileOpen && (
      <div className="lg:hidden fixed inset-0 z-[60] animate-[fadeIn_200ms_ease-out]">
        <div className="absolute inset-0 bg-navy/95 backdrop-blur-md" onClick={toggleMenu} />
        {/* X close button */}
        <button onClick={toggleMenu} className="absolute top-6 left-6 z-10 text-white/70 hover:text-white transition-colors" aria-label="Close menu">
          <X size={28} />
        </button>
        <div className="relative flex flex-col items-center justify-center h-full animate-[scaleIn_250ms_ease-out]">
          <div className="mb-8">
            <LogoWithWhiteText className="h-12" />
          </div>
          <nav className="flex flex-col items-center gap-0.5 mb-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={toggleMenu}
                className="text-white text-lg font-bold py-2 px-8 rounded-xl hover:bg-white/10 hover:text-coral transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {[
              { href: SITE_CONFIG.social.linkedin, icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>, hoverBg: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" },
              { href: SITE_CONFIG.social.instagram, icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>, hoverBg: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:border-transparent" },
              { href: SITE_CONFIG.social.twitter, icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>, hoverBg: "hover:bg-black hover:border-black" },
              { href: SITE_CONFIG.social.facebook, icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>, hoverBg: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all ${s.hoverBg}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
