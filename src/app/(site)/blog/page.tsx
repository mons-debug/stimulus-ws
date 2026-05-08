import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "مدونة" };
export const revalidate = 60;

const PER_PAGE = 12;

type Props = { searchParams: Promise<{ category?: string; author?: string; page?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const categoryFilter = params.category;
  const authorFilter = params.author;
  const currentPage = parseInt(params.page || "1");

  const encodedFilter = categoryFilter ? encodeURIComponent(categoryFilter) : null;
  const where = {
    published: true as const,
    ...(encodedFilter ? { category: { OR: [{ slug: categoryFilter }, { slug: encodedFilter }, { name: categoryFilter }] } } : {}),
    ...(authorFilter ? { author: { slug: authorFilter } } : {}),
  };

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      include: { category: true, author: true },
      skip: (currentPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.article.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const [categories, authors] = await Promise.all([
    prisma.category.findMany({ include: { _count: { select: { articles: true } } } }),
    prisma.author.findMany({ include: { _count: { select: { articles: true } } } }),
  ]);

  return (
    <>
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            {categoryFilter ? categories.find(c => c.slug === categoryFilter)?.name || "مدونة" : "مدونة"}
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>&rsaquo;</span>
            <Link href="/blog" className="hover:text-white">مدونة</Link>
            {categoryFilter && (
              <>
                <span>&rsaquo;</span>
                <span>{categories.find(c => c.slug === categoryFilter)?.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {categoryFilter && (
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm text-text-light">تصفية حسب:</span>
                  <span className="bg-coral/10 text-coral text-sm font-bold px-3 py-1 rounded-full">
                    {categories.find(c => c.slug === categoryFilter)?.name}
                  </span>
                  <Link href="/blog" className="text-xs text-text-light hover:text-coral">✕ إزالة التصفية</Link>
                </div>
              )}
              {articles.length === 0 ? (
                <div className="bg-warm-gray rounded-2xl p-12 text-center">
                  <p className="text-text-light text-lg">لا توجد مقالات في هذه الفئة</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {articles.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`} className="group bg-warm-gray rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all">
                      <div className="aspect-video relative overflow-hidden">
                        {article.featuredImage ? (
                          <Image src={article.featuredImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full bg-navy/10 flex items-center justify-center"><span className="text-navy/30 text-4xl">SGO</span></div>
                        )}
                        {article.category && (
                          <span className="absolute top-3 right-3 bg-coral text-white text-[10px] font-bold px-3 py-1 rounded">{article.category.name}</span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-navy group-hover:text-coral transition-colors leading-snug mb-2 line-clamp-2">{article.title}</h3>
                        {article.author ? (
                          <p className="text-xs text-text-light mb-1">{article.author.name}</p>
                        ) : (
                          <p className="text-xs text-text-light mb-1">{article.authorName}</p>
                        )}
                        <p className="text-xs text-text-light mb-3">{article.publishedAt?.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</p>
                        <span className="text-coral text-sm font-semibold">إقرأ المزيد &larr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {currentPage > 1 && (
                    <Link href={`/blog?${categoryFilter ? `category=${categoryFilter}&` : ""}page=${currentPage - 1}`}
                      className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-navy hover:bg-warm-gray transition-colors">
                      السابق
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={`/blog?${categoryFilter ? `category=${categoryFilter}&` : ""}page=${p}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${p === currentPage ? "bg-coral text-white" : "bg-white border border-border text-navy hover:bg-warm-gray"}`}>
                      {p}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link href={`/blog?${categoryFilter ? `category=${categoryFilter}&` : ""}page=${currentPage + 1}`}
                      className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold text-navy hover:bg-warm-gray transition-colors">
                      التالي
                    </Link>
                  )}
                </div>
              )}
              <p className="text-center text-text-light text-xs mt-4">{totalCount} مقال</p>
            </div>
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-warm-gray rounded-2xl p-6 border border-border">
                <input type="search" placeholder="بحث..." className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
              </div>
              <div className="bg-warm-gray rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-navy mb-4">آخر المقالات</h3>
                <ul className="space-y-4">
                  {articles.slice(0, 3).map((a) => (
                    <li key={a.id}>
                      <Link href={`/blog/${a.slug}`} className="block hover:bg-white rounded-lg p-2 -m-2 transition-colors">
                        <p className="text-sm font-semibold text-navy leading-snug">{a.title}</p>
                        <p className="text-xs text-text-light mt-1">{a.publishedAt?.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-warm-gray rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-navy mb-4">الفئات</h3>
                <ul className="space-y-3">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/blog?category=${cat.name}`}
                        className={`flex items-center justify-between text-sm transition-colors rounded-lg p-2 -m-2 ${categoryFilter === cat.name ? "bg-coral/10 text-coral font-bold" : "text-text-light hover:text-coral hover:bg-white"}`}
                      >
                        <span>{cat.name}</span>
                        <span className="bg-white text-text-light text-xs px-2 py-0.5 rounded-full">{cat._count.articles}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-warm-gray rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-navy mb-3">الكاتب</h3>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  <Link href="/blog" className={`block text-sm px-3 py-2 rounded-lg transition-colors ${!authorFilter ? "bg-coral text-white font-bold" : "text-text-light hover:bg-white hover:text-coral"}`}>
                    الكل
                  </Link>
                  {authors.map((auth) => (
                    <Link key={auth.id} href={`/blog?author=${auth.slug}`}
                      className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors ${authorFilter === auth.slug ? "bg-coral text-white font-bold" : "text-text-light hover:bg-white hover:text-coral"}`}>
                      <span className="truncate">{auth.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${authorFilter === auth.slug ? "bg-white/20" : "bg-white"}`}>{auth._count.articles}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
