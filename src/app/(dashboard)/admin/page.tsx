import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [articleCount, commentCount, contactCount, subscriberCount] = await Promise.all([
    prisma.article.count({ where: { published: true } }),
    prisma.comment.count(),
    prisma.contactSubmission.count(),
    prisma.newsletterSubscriber.count(),
  ]);

  const stats = [
    { label: "المقالات المنشورة", count: articleCount, href: "/admin/articles", color: "bg-coral" },
    { label: "التعليقات", count: commentCount, href: "/admin/comments", color: "bg-navy" },
    { label: "رسائل التواصل", count: contactCount, href: "/admin/contacts", color: "bg-[#25D366]" },
    { label: "مشتركين النشرة", count: subscriberCount, href: "/admin/subscribers", color: "bg-[#3B82F6]" },
  ];

  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { category: true },
  });

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-extrabold text-navy mb-4 lg:mb-8">لوحة التحكم</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-all group">
            <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4`}>
              {s.count}
            </div>
            <p className="text-navy font-bold text-lg">{s.count}</p>
            <p className="text-text-light text-sm">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">آخر المقالات</h2>
          <Link href="/admin/articles" className="text-coral text-sm font-semibold hover:underline">عرض الكل</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-right py-3 px-4 text-text-light font-semibold">العنوان</th>
                <th className="text-right py-3 px-4 text-text-light font-semibold">الفئة</th>
                <th className="text-right py-3 px-4 text-text-light font-semibold">التاريخ</th>
                <th className="text-right py-3 px-4 text-text-light font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((a) => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-warm-gray/50">
                  <td className="py-3 px-4 font-medium text-navy">{a.title}</td>
                  <td className="py-3 px-4 text-text-light">{a.category?.name || "-"}</td>
                  <td className="py-3 px-4 text-text-light">{a.publishedAt?.toLocaleDateString("ar-EG")}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${a.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {a.published ? "منشور" : "مسودة"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
