import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [articleCount, draftCount, commentCount, pendingComments, contactCount, newContacts, subscriberCount, partnerCount] = await Promise.all([
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

  const stats = [
    { label: "مقالات منشورة", count: articleCount, href: "/admin/articles", color: "bg-coral", icon: "✎" },
    { label: "مسودات", count: draftCount, href: "/admin/articles", color: "bg-yellow-500", icon: "📝" },
    { label: "تعليقات معلقة", count: pendingComments, href: "/admin/comments", color: "bg-navy", icon: "💬" },
    { label: "رسائل جديدة", count: newContacts, href: "/admin/contacts", color: "bg-[#25D366]", icon: "✉" },
    { label: "المشتركين", count: subscriberCount, href: "/admin/subscribers", color: "bg-[#3B82F6]", icon: "👥" },
    { label: "الشركاء", count: partnerCount, href: "/admin/partners", color: "bg-purple-500", icon: "🤝" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h1 className="text-xl lg:text-3xl font-extrabold text-navy">لوحة التحكم</h1>
        <Link href="/admin/articles/new" className="bg-coral text-white font-bold px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl hover:bg-coral-hover transition-colors text-xs lg:text-sm">+ مقال جديد</Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 mb-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-5 border border-border hover:shadow-md transition-all text-center">
            <div className={`w-8 h-8 lg:w-10 lg:h-10 ${s.color} rounded-lg lg:rounded-xl flex items-center justify-center text-white text-sm lg:text-base mx-auto mb-2`}>
              {s.icon}
            </div>
            <p className="text-lg lg:text-2xl font-black text-navy">{s.count}</p>
            <p className="text-text-light text-[10px] lg:text-xs">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent articles */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base lg:text-lg font-bold text-navy">آخر المقالات</h2>
            <Link href="/admin/articles" className="text-coral text-xs font-semibold hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {recentArticles.map((a) => (
              <Link key={a.id} href={`/admin/articles/${a.id}`} className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-warm-gray transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy truncate">{a.title}</p>
                  <p className="text-[10px] text-text-light">{a.category?.name} · {a.publishedAt?.toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}</p>
                </div>
                <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${a.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {a.published ? "منشور" : "مسودة"}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent comments */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base lg:text-lg font-bold text-navy">آخر التعليقات</h2>
            <Link href="/admin/comments" className="text-coral text-xs font-semibold hover:underline">عرض الكل ({commentCount})</Link>
          </div>
          {recentComments.length === 0 ? (
            <p className="text-text-light text-sm text-center py-6">لا توجد تعليقات</p>
          ) : (
            <div className="space-y-3">
              {recentComments.map((c) => (
                <div key={c.id} className={`p-3 rounded-lg border ${c.approved ? "border-border bg-warm-gray/30" : "border-yellow-200 bg-yellow-50"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-navy">{c.author}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${c.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {c.approved ? "مقبول" : "معلق"}
                    </span>
                  </div>
                  <p className="text-xs text-text-light line-clamp-2 mb-1">{c.content}</p>
                  <p className="text-[10px] text-text-light">المقال: {c.article?.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent contacts */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base lg:text-lg font-bold text-navy">رسائل التواصل</h2>
            <Link href="/admin/contacts" className="text-coral text-xs font-semibold hover:underline">عرض الكل ({contactCount})</Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-text-light text-sm text-center py-6">لا توجد رسائل</p>
          ) : (
            <div className="space-y-2">
              {recentContacts.map((c) => (
                <div key={c.id} className={`p-3 rounded-lg border ${!c.read ? "border-coral/20 bg-coral/5" : "border-border"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-navy">{c.fullName}</p>
                    {!c.read && <span className="bg-coral text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">جديد</span>}
                  </div>
                  <p className="text-xs text-text-light truncate">{c.message}</p>
                  <p className="text-[10px] text-text-light mt-1">{c.email} · {c.createdAt.toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border">
          <h2 className="text-base lg:text-lg font-bold text-navy mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/admin/articles/new" className="bg-coral/5 border border-coral/20 rounded-xl p-3 text-center hover:bg-coral/10 transition-colors">
              <span className="text-lg block mb-1">✎</span>
              <p className="text-xs font-bold text-navy">كتابة مقال</p>
            </Link>
            <Link href="/admin/comments" className="bg-navy/5 border border-navy/10 rounded-xl p-3 text-center hover:bg-navy/10 transition-colors">
              <span className="text-lg block mb-1">💬</span>
              <p className="text-xs font-bold text-navy">مراجعة التعليقات</p>
            </Link>
            <Link href="/admin/projects/new" className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center hover:bg-purple-100 transition-colors">
              <span className="text-lg block mb-1">📋</span>
              <p className="text-xs font-bold text-navy">مشروع جديد</p>
            </Link>
            <Link href="/" target="_blank" className="bg-green-50 border border-green-100 rounded-xl p-3 text-center hover:bg-green-100 transition-colors">
              <span className="text-lg block mb-1">🌐</span>
              <p className="text-xs font-bold text-navy">زيارة الموقع</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
