import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { BlogViewToggle } from "@/components/ui/BlogViewToggle";

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

  const featured = !categoryFilter && !authorFilter && currentPage === 1 ? articles[0] : null;
  const gridArticles = featured ? articles.slice(1) : articles;

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-white/50 text-[10px] lg:text-xs mb-4 font-mono tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-white/70">المدوّنة</span>
          </div>
          <h1 className="text-[28px] sm:text-[38px] lg:text-[56px] font-black text-white leading-[1.05] tracking-tight">المدوّنة والمقالات.</h1>
          <p className="text-white/60 text-[13px] lg:text-lg leading-relaxed mt-4">{totalCount} مقالاً وبحثاً منشوراً — تُحدَّث باستمرار.</p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
      <section className="py-10 lg:py-14 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] bg-white border border-rule overflow-hidden">
            <div className="relative min-h-[200px] lg:min-h-[480px] bg-warm-gray overflow-hidden">
              {featured.featuredImage && (
                <Image src={featured.featuredImage} alt={featured.title} fill className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-700" />
              )}
            </div>
            <div className="p-6 lg:p-12 flex flex-col">
              <div className="inline-flex items-center gap-2 bg-coral text-white font-mono text-[10px] tracking-[0.14em] uppercase font-bold px-3 py-1.5 self-start mb-5">مقال مميّز</div>
              {featured.category && (
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-coral font-bold mb-4">{featured.category.name}</p>
              )}
              <h2 className="text-xl lg:text-[36px] font-black text-navy leading-snug tracking-tight mb-4 group-hover:text-coral transition-colors">{featured.title}</h2>
              <p className="text-[15px] lg:text-[17px] leading-relaxed text-text mb-6 line-clamp-3">{featured.excerpt || ""}</p>
              <div className="flex items-center gap-3 pt-5 border-t border-rule mt-auto">
                {featured.author?.imageUrl && (
                  <Image src={featured.author.imageUrl} alt="" width={48} height={48} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover" />
                )}
                <div>
                  <b className="block text-sm lg:text-[15px] text-navy">{featured.author?.name || featured.authorName}</b>
                  <span className="font-mono text-[11px] text-text-light tracking-wide">{featured.publishedAt?.toLocaleDateString("ar-u-nu-latn", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      )}

      {/* FILTER BAR */}
      <div className="bg-paper py-4 lg:py-5 border-t border-b border-rule sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide items-center flex-wrap">
          <Link href="/blog" className={`px-3 py-2 font-mono text-[11px] tracking-[0.08em] uppercase font-semibold border transition-colors ${!categoryFilter && !authorFilter ? "bg-navy border-navy text-white" : "bg-white border-rule text-text hover:border-coral hover:text-coral"}`}>
            الكل<span className="opacity-60 mr-1.5">{totalCount}</span>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/blog?category=${cat.name}`}
              className={`px-3 py-2 font-mono text-[11px] tracking-[0.08em] uppercase font-semibold border transition-colors whitespace-nowrap ${categoryFilter === cat.name ? "bg-navy border-navy text-white" : "bg-white border-rule text-text hover:border-coral hover:text-coral"}`}>
              {cat.name}<span className="opacity-60 mr-1.5">{cat._count.articles}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID */}
      <section className="py-10 lg:py-16 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {categoryFilter && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-text-light">تصفية حسب:</span>
              <span className="font-mono text-[11px] bg-coral/10 text-coral font-bold px-3 py-1">{categories.find(c => c.slug === categoryFilter || c.name === categoryFilter)?.name || categoryFilter}</span>
              <Link href="/blog" className="text-xs text-text-light hover:text-coral">✕ إزالة</Link>
            </div>
          )}

          {gridArticles.length === 0 ? (
            <div className="bg-warm-gray text-center py-16">
              <p className="text-text-light text-lg">لا توجد مقالات في هذه الفئة</p>
            </div>
          ) : (
            <>
              {/* Mobile: toggle view */}
              <BlogViewToggle articles={gridArticles.map(a => ({
                id: a.id, slug: a.slug, title: a.title, featuredImage: a.featuredImage,
                authorName: a.authorName,
                publishedAt: a.publishedAt?.toLocaleDateString("ar-u-nu-latn", { month: "short", day: "numeric" }) || "",
                categoryName: a.category?.name || null,
                authorDisplayName: a.author?.name || a.authorName,
              }))} />

              {/* Desktop: card grid */}
              <div className="hidden lg:grid grid-cols-3 gap-6">
                {gridArticles.map((article) => (
                  <Link key={article.id} href={`/blog/${article.slug}`}
                    className="group bg-white border border-rule flex flex-col hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(27,42,74,0.08)] transition-all">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {article.featuredImage ? (
                        <Image src={article.featuredImage} alt={article.title} fill className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-warm-gray flex items-center justify-center"><span className="text-navy/15 text-3xl font-black">SGO</span></div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      {article.category && (
                        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-coral font-bold mb-3">{article.category.name}</p>
                      )}
                      <h3 className="text-[21px] font-extrabold text-navy leading-snug mb-3 group-hover:text-coral transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-sm leading-relaxed text-text mb-auto line-clamp-2">{article.excerpt || ""}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-rule mt-4">
                        <span className="text-xs text-text-light">{article.publishedAt?.toLocaleDateString("ar-u-nu-latn", { day: "numeric", month: "long", year: "numeric" })}</span>
                        <span className="text-xs text-text-light">{article.author?.name || article.authorName}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 lg:mt-14">
              {currentPage > 1 && (
                <Link href={`/blog?${categoryFilter ? `category=${categoryFilter}&` : ""}page=${currentPage - 1}`}
                  className="px-4 py-2 bg-white border border-rule text-sm font-bold text-navy hover:bg-warm-gray transition-colors">السابق</Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link key={p} href={`/blog?${categoryFilter ? `category=${categoryFilter}&` : ""}page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold transition-colors ${p === currentPage ? "bg-navy text-white" : "bg-white border border-rule text-navy hover:bg-warm-gray"}`}>
                  {p}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={`/blog?${categoryFilter ? `category=${categoryFilter}&` : ""}page=${currentPage + 1}`}
                  className="px-4 py-2 bg-white border border-rule text-sm font-bold text-navy hover:bg-warm-gray transition-colors">التالي</Link>
              )}
            </div>
          )}
          <p className="text-center text-text-light text-xs mt-4">{totalCount} مقال</p>
        </div>
      </section>

      {/* TOPICS BAND */}
      <section className="py-16 lg:py-24 bg-navy text-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <span className="sg-kicker text-[#ff8e7a]">— TOPICS · المحاور</span>
          <h2 className="text-3xl lg:text-[56px] font-black text-white leading-[1.04] tracking-tight mt-3 mb-10">تصفّح حسب الموضوع</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/10 border-r border-white/10">
            {categories.map((cat, i) => (
              <Link key={cat.id} href={`/blog?category=${cat.name}`}
                className="border-b border-l border-white/10 p-6 lg:p-7 hover:bg-white/[0.04] transition-colors">
                <div className="font-mono text-[11px] tracking-[0.14em] text-[#ff8e7a] font-bold mb-6">{String(i + 1).padStart(2, "0")}</div>
                <h4 className="text-lg lg:text-[22px] font-extrabold mb-3">{cat.name}</h4>
                <p className="font-mono text-[11px] tracking-[0.08em] text-white/50">{cat._count.articles} مقال</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
