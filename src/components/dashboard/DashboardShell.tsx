"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const SIDEBAR = [
  { label: "لوحة التحكم", href: "/admin", icon: "⬡" },
  { label: "المقالات", href: "/admin/articles", icon: "✎" },
  { label: "الكُتّاب", href: "/admin/authors", icon: "👤" },
  { label: "المشروعات", href: "/admin/projects", icon: "📋" },
  { label: "الشركاء", href: "/admin/partners", icon: "🤝" },
  { label: "الفئات", href: "/admin/categories", icon: "📂" },
  { label: "التعليقات", href: "/admin/comments", icon: "💬" },
  { label: "رسائل التواصل", href: "/admin/contacts", icon: "✉" },
  { label: "المشتركين", href: "/admin/subscribers", icon: "👥" },
  { label: "الإعدادات", href: "/admin/settings", icon: "⚙" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div dir="rtl">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-navy h-14 flex items-center justify-between px-4">
        <button onClick={() => setOpen(true)} className="text-white p-1">
          <Menu size={24} />
        </button>
        <h1 className="text-white font-bold text-sm">SGO Admin</h1>
        <div className="w-8" />
      </div>

      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <>
        {/* Mobile backdrop */}
        {open && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 animate-[fadeIn_200ms_ease-out]" onClick={() => setOpen(false)} />
        )}

        <aside className={[
          "w-64 bg-navy fixed top-0 bottom-0 flex flex-col z-50 overflow-y-auto transition-transform duration-300",
          "right-0",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        ].join(" ")}>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h1 className="text-white font-extrabold text-lg">SGO Admin</h1>
              <p className="text-white/50 text-xs mt-0.5">لوحة تحكم المنظمة</p>
            </div>
            <button onClick={() => setOpen(false)} className="lg:hidden text-white/50 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>
          <nav className="p-3 space-y-0.5 flex-1">
            {SIDEBAR.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${active ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/10"}`}>
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-white/10 space-y-0.5">
            <Link href="/" className="flex items-center gap-2 px-4 py-2.5 text-white/50 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
              ← العودة للموقع
            </Link>
            <LogoutButton />
          </div>
        </aside>
      </>

      {/* Main content */}
      <div className="lg:mr-64 bg-[#F4F4F4] min-h-screen pt-14 lg:pt-0 p-4 lg:p-8 pb-24">
        {children}
      </div>
    </div>
  );
}
