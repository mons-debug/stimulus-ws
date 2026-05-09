import Link from "next/link";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl">
      {/* Fixed sidebar */}
      <aside className="w-64 bg-navy fixed top-0 right-0 bottom-0 flex flex-col z-40 overflow-y-auto">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-white font-extrabold text-lg">SGO Admin</h1>
          <p className="text-white/50 text-xs mt-1">لوحة تحكم المنظمة</p>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {SIDEBAR.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-2 px-4 py-3 text-white/50 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
            ← العودة للموقع
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main scrollable content — just margin to avoid sidebar */}
      <div className="mr-64 bg-[#F4F4F4] p-8 pb-40">
        {children}
      </div>
    </div>
  );
}
