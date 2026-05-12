import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { CountUp } from "@/components/ui/CountUp";
import { ArticleSlider } from "@/components/ui/ArticleSlider";

export const revalidate = 60;

export default async function HomePage() {
  const [articles, projects, articleCount, categories] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 7,
      include: { category: true, author: true },
    }),
    prisma.project.findMany({ orderBy: { sortOrder: "asc" }, take: 3 }),
    prisma.article.count({ where: { published: true } }),
    prisma.category.findMany({ include: { _count: { select: { articles: true } } } }),
  ]);

  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const rest = articles.slice(3, 7);

  return (
    <>
      {/* ===== HERO — Editorial masthead ===== */}
      <section className="relative bg-paper overflow-hidden pt-8 lg:pt-14 pb-10 lg:pb-16">
        <div className="sg-noise" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-8 lg:gap-14">

            {/* MASTHEAD RAIL — stats */}
            <aside className="hidden lg:block border-l border-rule pl-8">
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-coral font-bold mb-6">VOL. 06 · ISSUE 24 · MAY 2026</p>
              <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold mb-3">SINCE FOUNDING · منذ التأسيس</h4>
              {[
                { target: articleCount, suffix: "", label: "بحث ودراسة منشورة" },
                { target: projects.length, suffix: "", label: "مشروع نشط" },
                { target: 1000, suffix: "+", label: "مستفيد من برامج التدريب" },
                { target: 5, suffix: "", label: "شريك دولي ومحلي" },
              ].map((s) => (
                <div key={s.label} className="py-4 border-t border-rule">
                  <CountUp target={s.target} suffix={s.suffix} />
                  <div className="text-[13px] text-text mt-1.5">{s.label}</div>
                </div>
              ))}
              <div className="mt-6 pt-4 font-mono text-[11px] text-text-light tracking-[0.08em]">EST · ESTONIA · EU</div>
            </aside>

            {/* HEADLINE — center */}
            <div className="pt-1">
              <div className="flex items-center gap-3 mb-6 lg:mb-7 sg-rise">
                <span className="w-9 h-0.5 bg-coral" />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral font-bold">A EUROPEAN NPO · بيت فكر مستقل</span>
              </div>
              <h1 className="text-[38px] sm:text-[58px] lg:text-[82px] leading-[1.15] font-black text-navy tracking-[-0.02em] mb-6 lg:mb-7 sg-rise sg-rise-d1">
                نُنتج <span className="relative inline-block">المعرفة<span className="absolute left-0 right-0 bottom-2 lg:bottom-3 h-2.5 lg:h-3 bg-coral/[0.18] -z-10" /></span><br />
                ونصنع <span className="text-coral">الحوار</span><br />
                ونبني الجيل القادم.
              </h1>
              <p className="text-base lg:text-xl leading-relaxed text-text max-w-[55ch] mb-8 sg-rise sg-rise-d2">
                منظمة مجموعات التحفيز مؤسسة بحثية أوروبية مستقلة تعمل في مصر وأفريقيا والشرق الأوسط على إنتاج الأبحاث والدراسات، تيسير الحوار العام حول قضايا السياسة والتنمية، وبناء قدرات الشباب.
              </p>
              <div className="flex items-center gap-3 flex-wrap sg-rise sg-rise-d3">
                <Link href="/about" className="bg-coral text-white font-bold px-6 py-3 text-sm hover:bg-coral-hover btn-base flex items-center gap-2">
                  تعرّف علينا
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </Link>
                <Link href="/blog" className="border border-navy text-navy font-bold px-6 py-3 text-sm hover:bg-navy hover:text-white transition-colors">آخر الأبحاث</Link>
              </div>

              {/* Mobile stats */}
              <div className="lg:hidden flex items-center gap-6 mt-8 pt-6 border-t border-rule">
                {[
                  { num: String(articleCount) + "+", label: "مقال" },
                  { num: String(projects.length), label: "مشاريع" },
                  { num: "3", label: "مناطق" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-navy font-inter">{s.num}</div>
                    <div className="text-[10px] text-text-light">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURED ARTICLE — sliding carousel */}
            {articles.length > 0 && (
            <aside className="hidden lg:block border-r border-rule pr-7">
              <ArticleSlider articles={articles.slice(0, 4).map(a => ({
                slug: a.slug,
                title: a.title,
                featuredImage: a.featuredImage,
                categoryName: a.category?.name || null,
                authorName: a.author?.name || a.authorName,
                date: a.publishedAt?.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" }) || "",
              }))} />
            </aside>
            )}
          </div>
        </div>
      </section>

      {/* ===== TICKER — news channel style ===== */}
      <section className="bg-navy text-white py-3 overflow-hidden border-t border-white/[0.08] relative">
        <div className="absolute right-0 top-0 bottom-0 flex items-center gap-2.5 px-4 lg:px-6 z-10 bg-navy border-l border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#ff8e7a] animate-[sg-pulse-dot_1.6s_ease-out_infinite]" />
          <span className="text-[11px] tracking-wide text-[#ff8e7a] font-bold whitespace-nowrap">عاجل</span>
        </div>
        <div className="flex whitespace-nowrap">
          <div className="inline-flex gap-10 animate-[sg-marquee_35s_linear_infinite]">
            {articles.slice(0, 5).map((a) => (
              <span key={a.id} className="text-[13px] text-white/80 inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8e7a] flex-shrink-0" />
                {a.title}
                <span className="font-mono text-[10px] text-white/40 tracking-[0.06em]">{a.publishedAt?.toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}</span>
              </span>
            ))}
          </div>
          <div className="inline-flex gap-10 animate-[sg-marquee_35s_linear_infinite]">
            {articles.slice(0, 5).map((a) => (
              <span key={`dup-${a.id}`} className="text-[13px] text-white/80 inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8e7a] flex-shrink-0" />
                {a.title}
                <span className="font-mono text-[10px] text-white/40 tracking-[0.06em]">{a.publishedAt?.toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILLARS / SERVICES ===== */}
      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8 lg:mb-10">
            <div>
              <span className="sg-kicker">— OUR PROGRAMS · ٤ محاور</span>
              <h2 className="text-3xl lg:text-[56px] font-black text-navy leading-[1.15] tracking-tight mt-3">المحاور الأربعة</h2>
            </div>
            <Link href="/services" className="hidden lg:inline-flex items-center gap-2 text-coral font-bold text-sm hover:underline">جميع البرامج ←</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-rule border-r border-rule">
            {[
              { num: "٠١ / البحث", title: "البحوث والدراسات", desc: "إنتاج أبحاث تطبيقية ودراسات سياسات عامة في الاقتصاد والحوكمة والتنمية المحلية.", stat: `${articleCount} دراسة منشورة` },
              { num: "٠٢ / الحوار", title: "الحوار والنقاش العام", desc: "تنظيم منصات حوارية وموائد مستديرة تجمع الأكاديميين وصنّاع القرار والمجتمع المدني.", stat: "ندوات ومؤتمرات" },
              { num: "٠٣ / التدريب", title: "التدريب وبناء القدرات", desc: "برامج لإعداد الجيل القادم من الباحثين والمحللين في مهارات البحث الكمي والنوعي.", stat: "1000+ مستفيد" },
              { num: "٠٤ / الوعي", title: "الوعي المجتمعي", desc: "إنتاج محتوى معرفي مبسّط — مقالات وإنفوغرافيك — لجسر الفجوة بين البحث والنقاش العام.", stat: "المدوّنة والمحتوى" },
            ].map((p) => (
              <Link key={p.num} href="/services" className="group bg-white border-b border-l border-rule p-7 lg:p-8 min-h-[280px] lg:min-h-[320px] flex flex-col hover:bg-warm-gray transition-colors">
                <div className="font-mono text-[11px] tracking-[0.14em] text-coral font-bold mb-8">{p.num}</div>
                <h3 className="text-xl lg:text-[28px] font-extrabold text-navy leading-snug mb-3">{p.title}</h3>
                <p className="text-sm leading-relaxed text-text mb-auto">{p.desc}</p>
                <div className="mt-6 text-xs text-coral font-bold">{p.stat} ←</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="relative bg-navy text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-[-40px] right-16 font-serif text-[280px] lg:text-[360px] leading-none text-white/[0.04] select-none">"</div>
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8">
          <span className="sg-kicker text-[#ff8e7a]">— MANIFESTO · ما نُؤمن به</span>
          <blockquote className="text-3xl sm:text-[42px] lg:text-[56px] leading-[1.4] font-bold tracking-[-0.01em] mt-7 max-w-[24ch]">
            المعرفة <span className="text-[#ff8e7a]">ليست ترفاً</span>. هي شرط أوّلي
            لأي مجتمع يطمح إلى <span className="text-[#ff8e7a]">اختياراته الخاصة</span>.
          </blockquote>
          <cite className="not-italic block mt-9 text-sm text-white/60">— ميثاق منظمة مجموعات التحفيز</cite>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      {projects.length > 0 && (
      <section className="py-16 lg:py-24 bg-warm-gray">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10 lg:mb-12">
            <div>
              <span className="sg-kicker">— FEATURED PROJECTS · مشاريع</span>
              <h2 className="text-3xl lg:text-[56px] font-black text-navy leading-[1.15] tracking-tight mt-3">من المشاريع الجارية</h2>
            </div>
            <Link href="/projects" className="hidden lg:inline-flex items-center gap-2 text-coral font-bold text-sm hover:underline">جميع المشاريع ({projects.length}) ←</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {projects.map((project, i) => (
              <Link key={project.id} href={`/projects/${project.slug}`}
                className={`group bg-white border border-rule flex flex-col hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(27,42,74,0.1)] transition-all ${i === 0 ? "md:row-span-1" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-warm-gray">
                  {project.featuredImage ? (
                    <Image src={project.featuredImage} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : project.partnerLogos[0] ? (
                    <div className="w-full h-full flex items-center justify-center bg-warm-gray">
                      <Image src={project.partnerLogos[0]} alt="" width={140} height={60} className="opacity-40 group-hover:opacity-70 transition-opacity" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-warm-gray">
                      <span className="text-navy/10 text-4xl font-black">SGO</span>
                    </div>
                  )}
                </div>
                <div className="p-6 lg:p-7 flex-1 flex flex-col">
                  <h3 className="text-lg lg:text-[26px] font-extrabold text-navy leading-snug mb-3 group-hover:text-coral transition-colors">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-text mb-auto">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ===== IMPACT BAND ===== */}
      <section className="bg-coral text-white py-14 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            { num: `${articleCount}`, label: "بحثاً ودراسة منشورة في الاقتصاد والحوكمة والتنمية" },
            { num: "1K+", label: "مستفيد من برامج التدريب وبناء القدرات منذ التأسيس" },
            { num: String(projects.length), label: "مشاريع نُفّذت في مصر وأفريقيا والشرق الأوسط" },
            { num: "5", label: "شريكاً دولياً ومحلياً في الجامعات والمنظمات" },
          ].map((s) => (
            <div key={s.label} className="lg:border-l lg:border-white/20 lg:pl-8 last:border-0">
              <div className="text-[48px] lg:text-[72px] font-black leading-none tracking-tight font-inter mb-2">{s.num}</div>
              <div className="text-sm text-white/90 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LATEST ARTICLES ===== */}
      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10 lg:mb-12">
            <div>
              <span className="sg-kicker">— FROM THE BLOG · مقالات حديثة</span>
              <h2 className="text-3xl lg:text-[56px] font-black text-navy leading-[1.15] tracking-tight mt-3">من المدوّنة</h2>
            </div>
            <Link href="/blog" className="hidden lg:inline-flex items-center gap-2 text-coral font-bold text-sm hover:underline">جميع المقالات ({articleCount}) ←</Link>
          </div>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
            <Link href="/blog" className="flex-shrink-0 bg-navy text-white text-xs font-bold px-4 py-2 hover:bg-navy-light transition-colors">الكل</Link>
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat.id} href={`/blog?category=${cat.name}`} className="flex-shrink-0 bg-white border border-rule text-navy text-xs font-bold px-4 py-2 hover:bg-warm-gray transition-colors whitespace-nowrap">
                {cat.name} ({cat._count.articles})
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {rest.length > 0 ? rest.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group bg-white border border-rule hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(27,42,74,0.08)] transition-all">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {article.featuredImage ? (
                    <Image src={article.featuredImage} alt={article.title} fill className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-warm-gray flex items-center justify-center"><span className="text-navy/15 text-3xl font-black">SGO</span></div>
                  )}
                </div>
                <div className="p-6">
                  {article.category && (
                    <p className="text-[11px] tracking-wide uppercase text-coral font-bold mb-3">{article.category.name}</p>
                  )}
                  <h3 className="text-lg lg:text-[21px] font-extrabold text-navy leading-snug mb-3 group-hover:text-coral transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm leading-relaxed text-text mb-4 line-clamp-2">{article.excerpt || ""}</p>
                  <div className="flex items-center justify-between pt-3.5 border-t border-rule">
                    <span className="text-xs text-text-light">{article.publishedAt?.toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric" })}</span>
                    <span className="text-xs text-text-light">{article.author?.name || article.authorName}</span>
                  </div>
                </div>
              </Link>
            )) : (
              <p className="text-text-light col-span-3 text-center py-12">لا توجد مقالات إضافية حالياً</p>
            )}
          </div>

          <div className="lg:hidden text-center mt-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-coral font-bold text-sm">جميع المقالات ←</Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="py-16 lg:py-24 bg-paper border-t border-rule">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="mb-10">
            <span className="sg-kicker">— GET INVOLVED · انضم إلينا</span>
            <h2 className="text-3xl lg:text-[56px] font-black text-navy leading-[1.15] tracking-tight mt-3">ثلاث طرق لدعم العمل</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-rule border-r border-rule">
            {[
              { num: "۰۱", title: "تبرّع", desc: "تبرعك يموّل بحثاً مستقلاً ومحايداً ويُتيحه مجاناً للجميع.", href: "/donate", btn: "تبرع الآن ←", style: "bg-coral text-white" },
              { num: "۰۲", title: "تطوّع", desc: "سواء كنت باحثاً، مصمماً، أو محرراً — فريقنا يفتح أبوابه.", href: "/contact", btn: "قدّم طلباً ←", style: "border border-navy text-navy" },
              { num: "۰۳", title: "اشترك", desc: "نشرة بريدية بأهم ما نُنتجه من أبحاث ومقالات وتحليلات.", href: "/contact", btn: "اشترك بالنشرة ←", style: "bg-navy text-white" },
            ].map((c) => (
              <div key={c.num} className="bg-white border-b border-l border-rule p-8 lg:p-10">
                <div className="font-mono text-4xl font-extrabold text-coral mb-6 tracking-tight">{c.num}</div>
                <h3 className="text-2xl lg:text-[28px] font-extrabold text-navy mb-3">{c.title}</h3>
                <p className="text-sm leading-relaxed text-text mb-6">{c.desc}</p>
                <Link href={c.href} className={`inline-block font-bold px-5 py-2.5 text-sm ${c.style} hover:opacity-90 transition-opacity`}>{c.btn}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
