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
  });
  const categories = await prisma.category.findMany();

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-white/50 text-[10px] lg:text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>‹</span>
            <Link href="/blog" className="hover:text-white transition-colors">مدونة</Link>
            {article.category && (
              <>
                <span>‹</span>
                <span className="text-white/70">{article.category.name}</span>
              </>
            )}
          </div>
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug max-w-3xl">{article.title}</h1>
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <span>{article.publishedAt?.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</span>
            {article.category && (
              <span className="bg-coral/20 text-coral px-2.5 py-0.5 rounded-full text-[10px] font-bold">{article.category.name}</span>
            )}
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          <article className="lg:col-span-2">
            {/* Author card */}
            <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border mb-4 lg:mb-6 flex items-center gap-3 lg:gap-4">
              {article.author?.imageUrl ? (
                <Image src={article.author.imageUrl} alt={article.author.name} width={56} height={56} className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-base lg:text-xl flex-shrink-0">
                  {(article.author?.name || article.authorName).charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Link href={`/blog?author=${article.author?.slug || ""}`} className="font-bold text-navy hover:text-coral transition-colors text-sm lg:text-base">
                  {article.author?.name || article.authorName}
                </Link>
                {article.author?.bio && <p className="text-text-light text-[10px] lg:text-xs mt-0.5 truncate">{article.author.bio}</p>}
              </div>
              {article.category && (
                <Link href={`/blog?category=${article.category.name}`} className="hidden sm:block mr-auto bg-coral/10 text-coral text-xs font-bold px-3 py-1.5 rounded-full hover:bg-coral/20 transition-colors flex-shrink-0">
                  {article.category.name}
                </Link>
              )}
            </div>

            <div className="bg-white rounded-xl lg:rounded-2xl p-5 sm:p-8 lg:p-12 border border-border">
              {article.featuredImage && (
                <div className="mb-5 lg:mb-8 rounded-lg lg:rounded-xl overflow-hidden -mx-1 lg:mx-0">
                  <Image src={article.featuredImage} alt={article.title} width={800} height={450} className="w-full object-cover" />
                </div>
              )}
              <ReadMoreContent html={article.content} />

              {/* Gallery with lightbox */}
              {article.galleryImages && article.galleryImages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-lg font-bold text-navy mb-4">معرض الصور</h3>
                  <GalleryGrid images={article.galleryImages} />
                </div>
              )}

              {article.attachmentUrl && (
                <div className="mt-8 pt-6 border-t border-border">
                  <a href={article.attachmentUrl} target="_blank" rel="noopener noreferrer" download
                    className="inline-flex items-center gap-3 bg-coral/5 border border-coral/20 rounded-xl px-6 py-4 hover:bg-coral/10 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-coral flex items-center justify-center flex-shrink-0">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy group-hover:text-coral transition-colors">{article.attachmentName || "تحميل الملف المرفق"}</p>
                      <p className="text-xs text-text-light">اضغط للتحميل</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
            {article.comments.length > 0 && (
              <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border mt-8">
                <h2 className="text-xl font-bold text-navy mb-6">التعليقات ({article.comments.length})</h2>
                <div className="space-y-6">
                  {article.comments.map((c) => (
                    <div key={c.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm">{c.author.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-navy text-sm">{c.author}</p>
                          <p className="text-xs text-text-light">{c.createdAt.toLocaleDateString("ar-EG")}</p>
                        </div>
                      </div>
                      <p className="text-text-light text-sm leading-relaxed">{c.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-navy mb-4">مقالات اخرى</h3>
              <ul className="space-y-4">
                {recent.map((a) => (
                  <li key={a.id}>
                    <Link href={`/blog/${a.slug}`} className="block hover:bg-warm-gray rounded-lg p-2 -m-2 transition-colors">
                      <p className="text-sm font-semibold text-navy leading-snug">{a.title}</p>
                      <p className="text-xs text-text-light mt-1">{a.publishedAt?.toLocaleDateString("ar-EG")}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-navy mb-4">الفئات</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}><Link href="/blog" className="text-sm text-text-light hover:text-coral transition-colors">{cat.name}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
