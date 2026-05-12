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
          <Link href="/donate" className="bg-coral text-white font-semibold px-5 py-2.5 text-sm hover:bg-coral-hover btn-base flex items-center gap-2">
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

    {/* MOBILE DRAWER — slides from right (RTL) */}
    <div className={`lg:hidden fixed inset-0 z-[60] ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-navy/60 transition-opacity duration-200 ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={toggleMenu} />
      <div className={`absolute top-0 bottom-0 right-0 w-[min(86%,360px)] bg-paper flex flex-col transition-transform duration-250 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-rule">
          <span className="text-[17px] font-extrabold text-navy">مجموعات التحفيز</span>
          <button onClick={toggleMenu} className="w-10 h-10 flex items-center justify-center">
            <X size={20} className="text-navy" />
          </button>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href} onClick={toggleMenu}
              className={`flex items-center justify-between px-3.5 py-3.5 text-base font-semibold transition-colors ${pathname === link.href ? "text-coral bg-coral/[0.06]" : "text-ink hover:bg-warm-gray"}`}>
              {link.label}
              <span className="font-mono text-[10px] text-text-light tracking-[0.1em]">{String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}
        </nav>
        <div className="p-5 border-t border-rule flex flex-col gap-2.5">
          <Link href="/donate" onClick={toggleMenu} className="bg-coral text-white font-semibold py-3 text-sm text-center w-full flex items-center justify-center gap-2">
            تبرّع
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="border border-navy text-navy font-semibold py-3 text-sm text-center w-full">تواصل معنا</Link>
          <p className="font-mono text-[10px] tracking-[0.12em] text-text-light text-center mt-2">NPO #80618910 · ESTONIA</p>
        </div>
      </div>
    </div>
    </>
  );
}
