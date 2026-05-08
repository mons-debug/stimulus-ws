import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    include: { category: true, _count: { select: { comments: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-navy">المقالات</h1>
        <Link href="/admin/articles/new" className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm">+ مقال جديد</Link>
      </div>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-warm-gray border-b border-border">
              <th className="text-right py-4 px-6 text-text-light font-semibold">العنوان</th>
              <th className="text-right py-4 px-6 text-text-light font-semibold">الفئة</th>
              <th className="text-right py-4 px-6 text-text-light font-semibold">التعليقات</th>
              <th className="text-right py-4 px-6 text-text-light font-semibold">التاريخ</th>
              <th className="text-right py-4 px-6 text-text-light font-semibold">الحالة</th>
              <th className="text-right py-4 px-6 text-text-light font-semibold">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-border/50 hover:bg-warm-gray/30 transition-colors">
                <td className="py-4 px-6">
                  <Link href={`/admin/articles/${a.id}`} className="hover:text-coral transition-colors">
                    <p className="font-bold text-navy leading-snug">{a.title}</p>
                    <p className="text-xs text-text-light mt-1">{a.authorName}</p>
                  </Link>
                </td>
                <td className="py-4 px-6">
                  {a.category && <span className="bg-coral/10 text-coral text-xs font-bold px-2.5 py-1 rounded-full">{a.category.name}</span>}
                </td>
                <td className="py-4 px-6 text-text-light">{a._count.comments}</td>
                <td className="py-4 px-6 text-text-light text-xs">{a.publishedAt?.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" })}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${a.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {a.published ? "منشور" : "مسودة"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <Link href={`/admin/articles/${a.id}`} className="text-coral text-xs font-semibold hover:underline">تعديل</Link>
                  <span className="mx-2 text-border">|</span>
                  <Link href={`/blog/${a.slug}`} className="text-navy text-xs font-semibold hover:underline" target="_blank">عرض</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
