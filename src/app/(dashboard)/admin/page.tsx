import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [articleCount, draftCount, commentCount, pendingComments, contactCount, unreadContacts, subscriberCount, partnerCount] = await Promise.all([
    prisma.article.count({ where: { published: true } }),
    prisma.article.count({ where: { published: false } }),
    prisma.comment.count(),
    prisma.comment.count({ where: { approved: false } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.newsletterSubscriber.count(),
    prisma.partner.count(),
  ]);

  const [recentArticles, recentComments, recentContacts] = await Promise.all([
    prisma.article.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { category: true } }),
    prisma.comment.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { article: { select: { title: true, slug: true } } } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return (
    <div>
      {/* Welcome strip */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6 lg:mb-8">
        <div>
          <h2 className="text-xl lg:text-[32px] font-extrabold text-navy tracking-tight mb-1">مرحباً بك 👋</h2>
          <p className="text-text-light text-sm">إليك ملخص أداء المنصة اليوم. <b className="text-coral">{pendingComments} تعليقات</b> في انتظار المراجعة.</p>
        </div>
        <div className="mt-3 lg:mt-0">
          <Link href="/admin/articles/new" className="bg-coral text-white font-bold px-5 py-2.5 text-sm hover:bg-coral-hover transition-colors inline-flex items-center gap-2">
            + مقال جديد
          </Link>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 bg-white border border-rule mb-6">
        {[
          { label: "ARTICLES", num: articleCount, sub: "مقالات منشورة", icon: "✎" },
          { label: "DRAFTS", num: draftCount, sub: "مسودات", icon: "📝" },
          { label: "COMMENTS", num: pendingComments, sub: "تعليقات معلّقة", icon: "💬" },
          { label: "CONTACTS", num: unreadContacts, sub: "رسائل جديدة", icon: "✉" },
        ].map((kpi, i) => (
          <div key={kpi.label} className={`p-5 lg:p-7 ${i > 0 ? "border-r border-rule" : ""} ${i >= 2 ? "border-t lg:border-t-0 border-rule" : ""}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{kpi.icon}</span>
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold">{kpi.label}</span>
            </div>
            <div className="text-3xl lg:text-4xl font-extrabold text-navy tracking-tight font-inter leading-none mb-2">{kpi.num}</div>
            <div className="text-xs text-text-light">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 lg:gap-6 mb-6">
        {/* Recent articles */}
        <div className="bg-white border border-rule">
          <div className="flex items-center justify-between p-5 border-b border-rule">
            <h3 className="text-[15px] font-extrabold text-navy">آخر المقالات</h3>
            <Link href="/admin/articles" className="font-mono text-[10px] tracking-[0.12em] uppercase text-coral font-bold hover:underline">عرض الكل ←</Link>
          </div>
          <div>
            {recentArticles.map((a) => (
              <Link key={a.id} href={`/admin/articles/${a.id}`} className="flex items-center justify-between gap-3 px-5 py-4 border-b border-rule last:border-0 hover:bg-paper transition-colors">
                <div className="flex-1 min-w-0">
                  {a.category && <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-coral font-bold block mb-1">{a.category.name}</span>}
                  <p className="text-[13.5px] font-bold text-navy truncate">{a.title}</p>
                </div>
                <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase font-bold ${a.published ? "bg-green-100/80 text-green-700" : "bg-gray-100 text-text-light"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${a.published ? "bg-green-600" : "bg-gray-400"}`} />
                  {a.published ? "PUB" : "DRAFT"}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-rule">
          <div className="flex items-center justify-between p-5 border-b border-rule">
            <h3 className="text-[15px] font-extrabold text-navy">النشاط الأخير</h3>
            <Link href="/admin/comments" className="font-mono text-[10px] tracking-[0.12em] uppercase text-coral font-bold hover:underline">التعليقات ({commentCount}) ←</Link>
          </div>
          <div>
            {recentComments.length === 0 ? (
              <p className="text-text-light text-sm text-center py-8">لا توجد تعليقات</p>
            ) : (
              recentComments.map((c) => (
                <div key={c.id} className="flex gap-3 px-5 py-3.5 border-b border-rule last:border-0 items-start">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-[11px] font-bold ${c.approved ? "bg-green-100 text-green-700" : "bg-coral/10 text-coral"}`}>
                    {c.approved ? "✓" : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] text-ink leading-snug"><b className="text-navy">{c.author}</b> علّق</p>
                    <p className="font-mono text-[11px] text-text-light tracking-wide mt-1 truncate">{c.article?.title}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Secondary grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 lg:gap-6">
        {/* Recent contacts */}
        <div className="bg-white border border-rule">
          <div className="flex items-center justify-between p-5 border-b border-rule">
            <h3 className="text-[15px] font-extrabold text-navy">رسائل التواصل</h3>
            <Link href="/admin/contacts" className="font-mono text-[10px] tracking-[0.12em] uppercase text-coral font-bold hover:underline">عرض الكل ({contactCount}) ←</Link>
          </div>
          <div>
            {recentContacts.length === 0 ? (
              <p className="text-text-light text-sm text-center py-8">لا توجد رسائل</p>
            ) : (
              recentContacts.map((c) => (
                <div key={c.id} className={`px-5 py-4 border-b border-rule last:border-0 ${!c.read ? "bg-coral/[0.03]" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[13.5px] font-bold text-navy">{c.fullName}</p>
                    {!c.read && <span className="font-mono text-[9px] tracking-[0.14em] uppercase bg-coral text-white px-2 py-0.5 font-bold">NEW</span>}
                  </div>
                  <p className="text-xs text-text truncate">{c.message}</p>
                  <p className="font-mono text-[10px] text-text-light tracking-wide mt-1">{c.email} · {c.createdAt.toLocaleDateString("ar-u-nu-latn", { month: "short", day: "numeric" })}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-rule">
          <div className="p-5 border-b border-rule">
            <h3 className="text-[15px] font-extrabold text-navy">إجراءات سريعة</h3>
          </div>
          <div>
            {[
              { icon: "✎", label: "كتابة مقال جديد", href: "/admin/articles/new" },
              { icon: "💬", label: "مراجعة التعليقات", href: "/admin/comments" },
              { icon: "📋", label: "إضافة مشروع", href: "/admin/projects/new" },
              { icon: "🤝", label: "إدارة الشركاء", href: "/admin/partners" },
              { icon: "⚙", label: "الإعدادات", href: "/admin/settings" },
              { icon: "🌐", label: "زيارة الموقع", href: "/" },
            ].map((a) => (
              <Link key={a.href} href={a.href} target={a.href === "/" ? "_blank" : undefined}
                className="flex items-center gap-3.5 px-5 py-4 border-b border-rule last:border-0 hover:bg-paper transition-colors text-[13.5px] text-ink">
                <span className="text-base">{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
