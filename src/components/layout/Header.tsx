"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png"
              alt={SITE_CONFIG.name}
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-navy hover:text-coral transition-colors rounded-lg hover:bg-warm-gray"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-sm hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href={SITE_CONFIG.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm hover:opacity-80 transition-opacity"
              aria-label="Twitter"
            >
              X
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white flex items-center justify-center text-sm hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-navy"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-semibold text-navy hover:text-coral hover:bg-warm-gray rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-4 flex items-center gap-3">
            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-sm">f</a>
            <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm">X</a>
            <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white flex items-center justify-center text-sm">IG</a>
            <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-sm">in</a>
          </div>
        </div>
      )}
    </header>
  );
}
