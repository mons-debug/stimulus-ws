"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { id: "home", href: "/", label: "الرئيسية", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg> },
  { id: "blog", href: "/blog", label: "مدوّنة", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg> },
  { id: "projects", href: "/projects", label: "مشاريع", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
  { id: "donate", href: "/donate", label: "تبرّع", cta: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { id: "contact", href: "/contact", label: "تواصل", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> },
];

export function AppBar() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-paper/90 backdrop-blur-xl border-t border-rule grid grid-cols-5 h-[64px] safe-bottom">
      {ITEMS.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        if (item.cta) {
          return (
            <Link key={item.id} href={item.href} className="flex flex-col items-center justify-center gap-0.5">
              <span className="bg-coral text-white rounded-full px-4 py-1.5 shadow-lg shadow-coral/30">{item.icon}</span>
              <span className="text-[9px] font-bold text-coral">{item.label}</span>
            </Link>
          );
        }
        return (
          <Link key={item.id} href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${active ? "text-coral" : "text-text-light"}`}>
            {item.icon}
            <span className="text-[9px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
