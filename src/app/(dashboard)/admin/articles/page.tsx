import { prisma } from "@/lib/db";
import Link from "next/link";

const PER_PAGE = 15;

type Props = { searchParams: Promise<{ page?: string }> };

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");

  const [articles, totalCount, publishedCount, draftCount] = await Promise.all([
    prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
      include: { category: true, _count: { select: { comments: true } } },
      skip: (currentPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.article.count({ where: { published: false } }),
  ]);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-navy">المقالات</h1>
          <p className="text-xs text-text-light mt-1">
            <b className="text-coral">{totalCount} مقال</b> · {publishedCount} منشور · {draftCount} مسوّدة
          </p>
        </div>
        <Link href="/admin/articles/new" className="bg-coral text-white font-bold px-4 py-2.5 text-sm hover:bg-coral-hover transition-colors inline-flex items-center gap-2 w-fit">
          + مقال جديد
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white border border-rule">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="border-b border-rule bg-paper">
              <th className="text-right py-3.5 px-5 font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold">العنوان</th>
              <th className="text-right py-3.5 px-5 font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold">الفئة</th>
              <th className="text-right py-3.5 px-5 font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold">الحالة</th>
              <th className="text-right py-3.5 px-5 font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold">التاريخ</th>
              <th className="text-right py-3.5 px-5 font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-rule last:border-0 hover:bg-paper transition-colors">
                <td className="py-4 px-5">
                  <Link href={`/admin/articles/${a.id}`} className="hover:text-coral transition-colors">
                    {a.category && <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-coral font-bold block mb-1">— {a.category.name}</span>}
                    <span className="font-bold text-navy">{a.title}</span>
                    <span className="block text-xs text-text-light mt-0.5">{a.authorName}</span>
                  </Link>
                </td>
                <td className="py-4 px-5 text-text-light text-xs">{a.category?.name || "—"}</td>
                <td className="py-4 px-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase font-bold ${a.published ? "bg-green-100/80 text-green-700" : "bg-gray-100 text-text-light"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${a.published ? "bg-green-600" : "bg-gray-400"}`} />
                    {a.published ? "PUB" : "DRAFT"}
                  </span>
                </td>
                <td className="py-4 px-5 font-mono text-xs text-text-light">{a.publishedAt?.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" })}</td>
                <td className="py-4 px-5">
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${a.id}`} className="text-coral text-xs font-bold hover:underline">تعديل</Link>
                    <Link href={`/blog/${a.slug}`} target="_blank" className="text-navy text-xs font-bold hover:underline">عرض</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-2">
        {articles.map((a) => (
          <Link key={a.id} href={`/admin/articles/${a.id}`} className="block bg-white border border-rule p-4 hover:border-coral/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {a.category && <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-coral font-bold block mb-1">— {a.category.name}</span>}
                <p className="font-bold text-navy text-sm leading-snug line-clamp-2">{a.title}</p>
                <p className="text-[11px] text-text-light mt-1">{a.authorName} · {a.publishedAt?.toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}</p>
              </div>
              <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] uppercase font-bold ${a.published ? "bg-green-100/80 text-green-700" : "bg-gray-100 text-text-light"}`}>
                <span className={`w-1 h-1 rounded-full ${a.published ? "bg-green-600" : "bg-gray-400"}`} />
                {a.published ? "PUB" : "DRAFT"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {currentPage > 1 && (
            <Link href={`/admin/articles?page=${currentPage - 1}`} className="px-3 py-2 bg-white border border-rule text-sm font-bold text-navy hover:bg-paper transition-colors">السابق</Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link key={p} href={`/admin/articles?page=${p}`}
              className={`w-9 h-9 flex items-center justify-center text-sm font-bold transition-colors ${p === currentPage ? "bg-navy text-white" : "bg-white border border-rule text-navy hover:bg-paper"}`}>
              {p}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link href={`/admin/articles?page=${currentPage + 1}`} className="px-3 py-2 bg-white border border-rule text-sm font-bold text-navy hover:bg-paper transition-colors">التالي</Link>
          )}
        </div>
      )}
      <p className="text-center text-text-light text-xs mt-3 font-mono tracking-wide">{totalCount} ARTICLES · PAGE {currentPage} OF {totalPages}</p>
    </div>
  );
}
