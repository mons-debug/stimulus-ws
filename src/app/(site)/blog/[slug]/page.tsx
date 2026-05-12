import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/ui/Lightbox";
import { ReadMoreContent } from "@/components/ui/ReadMoreContent";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug: decodeURIComponent(slug) } });
  return { title: article?.title || "مقال" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug: decodeURIComponent(slug) },
    include: { category: true, author: true, comments: { where: { approved: true }, orderBy: { createdAt: "desc" } } },
  });
  if (!article) notFound();

  const recent = await prisma.article.findMany({
    where: { published: true, id: { not: article.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true, author: true },
  });

  return (
    <>
      {/* ARTICLE HEADER */}
      <section className="py-10 lg:py-14 bg-paper">
        <div className="max-w-[880px] mx-auto px-4 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-text-light text-[10px] lg:text-[11px] mb-5 font-mono tracking-wide">
            <Link href="/" className="hover:text-coral transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-coral transition-colors">المدوّنة</Link>
            {article.category && (
              <>
                <span>/</span>
                <Link href={`/blog?category=${article.category.name}`} className="text-coral">{article.category.name}</Link>
              </>
            )}
          </div>
          {article.category && (
            <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-coral font-bold mb-4">— {article.category.name}</p>
          )}
          <h1 className="text-2xl sm:text-4xl lg:text-[52px] font-black text-navy leading-[1.1] tracking-tight mb-5">{article.title}</h1>
          {article.excerpt && (
            <p className="text-base lg:text-[22px] leading-relaxed text-text font-medium mb-8">{article.excerpt}</p>
          )}

          {/* BYLINE */}
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center py-4 border-t border-b border-rule">
            {article.author?.imageUrl ? (
              <Image src={article.author.imageUrl} alt={article.author.name} width={48} height={48} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-warm-gray flex items-center justify-center text-navy font-bold text-lg">
                {(article.author?.name || article.authorName).charAt(0)}
              </div>
            )}
            <div>
              <Link href={`/blog?author=${article.author?.slug || ""}`} className="block font-bold text-navy text-sm lg:text-base hover:text-coral transition-colors">
                {article.author?.name || article.authorName}
              </Link>
              <span className="text-xs text-text-light">
                {article.publishedAt?.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })}
                {article.author?.bio && <> · {article.author.bio}</>}
              </span>
            </div>
          </div>

          {/* LEAD IMAGE */}
          {article.featuredImage && (
            <div className="relative aspect-[16/9] mt-8 overflow-hidden">
              <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="py-10 lg:py-16 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 lg:gap-16">
            {/* Main content */}
            <article className="max-w-[720px] mx-auto lg:mx-0">
              <ReadMoreContent html={article.content} />

              {/* Gallery */}
              {article.galleryImages && article.galleryImages.length > 0 && (
                <div className="mt-10 pt-8 border-t border-rule">
                  <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase text-coral font-bold mb-5">— GALLERY · معرض الصور</h3>
                  <GalleryGrid images={article.galleryImages} />
                </div>
              )}

              {/* Attachment */}
              {article.attachmentUrl && (
                <div className="mt-8 pt-6 border-t border-rule">
                  <a href={article.attachmentUrl} target="_blank" rel="noopener noreferrer" download
                    className="inline-flex items-center gap-4 bg-white border border-rule p-5 hover:border-coral/30 transition-colors group">
                    <div className="w-12 h-12 bg-coral flex items-center justify-center flex-shrink-0">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy group-hover:text-coral transition-colors">{article.attachmentName || "تحميل الملف المرفق"}</p>
                      <p className="text-xs text-text-light font-mono tracking-wide">PDF · اضغط للتحميل</p>
                    </div>
                  </a>
                </div>
              )}

              {/* Comments */}
              {article.comments.length > 0 && (
                <div className="mt-10 pt-8 border-t border-rule">
                  <h3 className="font-mono text-[11px] tracking-[0.14em] uppercase text-coral font-bold mb-6">— COMMENTS · التعليقات ({article.comments.length})</h3>
                  <div className="space-y-5">
                    {article.comments.map((c) => (
                      <div key={c.id} className="bg-white border border-rule p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full bg-warm-gray flex items-center justify-center text-navy font-bold text-sm">{c.author.charAt(0)}</div>
                          <div>
                            <p className="font-bold text-navy text-sm">{c.author}</p>
                            <p className="font-mono text-[10px] text-text-light tracking-wide">{c.createdAt.toLocaleDateString("ar-EG")}</p>
                          </div>
                        </div>
                        <p className="text-sm text-text leading-relaxed">{c.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* SIDEBAR */}
            <aside className="hidden lg:block space-y-5 sticky top-24 self-start">
              <div className="bg-white border border-rule p-5">
                <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase text-coral font-bold mb-4">— RELATED · مقالات ذات صلة</h4>
                <div className="space-y-4">
                  {recent.map((a) => (
                    <Link key={a.id} href={`/blog/${a.slug}`} className="block hover:bg-paper p-2 -m-2 transition-colors">
                      <p className="text-sm font-bold text-navy leading-snug mb-1">{a.title}</p>
                      <p className="font-mono text-[10px] text-text-light tracking-wide">{a.publishedAt?.toLocaleDateString("ar-EG", { month: "long", day: "numeric" })}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-rule p-5">
                <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase text-coral font-bold mb-4">— SHARE · مشاركة</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2.5 bg-warm-gray font-mono text-[10px] tracking-[0.12em] uppercase text-navy font-bold hover:bg-coral hover:text-white transition-colors">X</button>
                  <button className="py-2.5 bg-warm-gray font-mono text-[10px] tracking-[0.12em] uppercase text-navy font-bold hover:bg-coral hover:text-white transition-colors">FB</button>
                  <button className="py-2.5 bg-warm-gray font-mono text-[10px] tracking-[0.12em] uppercase text-navy font-bold hover:bg-coral hover:text-white transition-colors">نسخ</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {recent.length > 0 && (
      <section className="py-16 lg:py-24 bg-paper border-t border-rule">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <span className="sg-kicker">— READ MORE · اقرأ أيضاً</span>
          <h2 className="text-2xl lg:text-[40px] font-black text-navy leading-[1.04] tracking-tight mt-3 mb-10">مقالات ذات صلة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {recent.map((a) => (
              <Link key={a.id} href={`/blog/${a.slug}`}
                className="group bg-white border border-rule flex flex-col hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(27,42,74,0.08)] transition-all">
                {a.featuredImage && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={a.featuredImage} alt={a.title} fill className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  {a.category && (
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-coral font-bold mb-3">{a.category.name}</p>
                  )}
                  <h3 className="text-lg font-extrabold text-navy leading-snug mb-3 group-hover:text-coral transition-colors line-clamp-2">{a.title}</h3>
                  <div className="flex items-center justify-between pt-3.5 border-t border-rule mt-auto">
                    <span className="font-mono text-[11px] text-text-light">{a.publishedAt?.toLocaleDateString("ar-EG", { day: "numeric", month: "long" })}</span>
                    <span className="font-mono text-[11px] text-text-light">{a.author?.name || a.authorName}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
