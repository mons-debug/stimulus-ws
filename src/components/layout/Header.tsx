"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (!mobileOpen) {
        if (y > 300 && y > lastY.current + 8) setHidden(true);
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

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const toggleMenu = useCallback(() => setMobileOpen(prev => !prev), []);

  return (
    <>
    {/* TOPBAR — thin strip */}
    <div className={`bg-navy-dark text-white/[0.78] text-[12px] border-b border-white/[0.06] transition-all duration-300 ${hidden && !mobileOpen ? "-translate-y-full" : ""}`}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4 lg:gap-6">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#ff8e7a] hidden lg:inline">AR / EN</span>
          <span className="hidden lg:inline">منظمة غير ربحية مسجلة · NPO #80618910</span>
          <span className="lg:hidden text-[10px]">NPO #80618910</span>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors hidden lg:inline">{SITE_CONFIG.email}</a>
          <a href={`https://wa.me/${SITE_CONFIG.whatsapp?.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[10px] lg:text-[12px]">واتساب</a>
        </div>
      </div>
    </div>

    {/* MAIN HEADER */}
    <header className={`sticky top-0 z-50 bg-paper border-b border-rule transition-all duration-300 ${hidden && !mobileOpen ? "-translate-y-full" : ""}`}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-4 lg:py-5 flex items-center justify-between gap-4 lg:gap-9">
        {/* BRAND */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/logo-icon.png" alt="" width={44} height={44} className="w-10 h-10 lg:w-11 lg:h-11" />
          <div>
            <span className="block text-lg lg:text-xl font-extrabold text-navy leading-none tracking-tight">مجموعات التحفيز</span>
            <span className="block font-mono text-[9px] lg:text-[10px] tracking-[0.14em] uppercase text-text-light mt-0.5">STIMULUS GROUPS</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href}
                className={`relative px-3.5 py-2.5 text-[15px] font-medium transition-colors ${active ? "text-coral" : "text-ink hover:text-coral"}`}>
                {link.label}
                {active && <span className="absolute left-3.5 right-3.5 -bottom-[21px] h-0.5 bg-coral" />}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
          <Link href="/donate" className="bg-coral text-white font-semibold px-5 py-2.5 text-sm hover:bg-coral-hover transition-colors flex items-center gap-2">
            تبرّع
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button onClick={toggleMenu} aria-label="Toggle menu"
          className="lg:hidden p-2 relative z-[70] text-navy">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>

    {/* MOBILE OVERLAY */}
    {mobileOpen && (
      <div className="lg:hidden fixed inset-0 z-[60] animate-[fadeIn_200ms_ease-out]">
        <div className="absolute inset-0 bg-navy/95 backdrop-blur-md" onClick={toggleMenu} />
        <button onClick={toggleMenu} className="absolute top-6 left-6 z-10 text-white/70 hover:text-white transition-colors">
          <X size={28} />
        </button>
        <div className="relative flex flex-col items-center justify-center h-full animate-[scaleIn_250ms_ease-out]">
          <div className="mb-8">
            <Image src="/logo-icon.png" alt="" width={50} height={50} className="w-12 h-12 mx-auto mb-2" />
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/50 text-center">STIMULUS GROUPS</p>
          </div>
          <nav className="flex flex-col items-center gap-0.5 mb-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={toggleMenu}
                className={`text-lg font-bold py-2 px-8 transition-all ${pathname === link.href ? "text-coral" : "text-white hover:text-coral"}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/donate" onClick={toggleMenu} className="bg-coral text-white font-bold px-8 py-3 text-sm">تبرّع الآن ←</Link>
        </div>
      </div>
    )}
    </>
  );
}
