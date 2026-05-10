import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";

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
      {/* ===== HERO — Featured article + secondary grid ===== */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.15)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-10 lg:pb-16">
          {/* Org badge */}
          <div className="flex items-center justify-between mb-6 lg:mb-10">
            <div>
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight">منظمة مجموعات <span className="text-coral">التحفيز</span></h1>
              <p className="text-white/40 text-xs lg:text-sm mt-1">أبحاث · حوارات · تمكين الشباب</p>
            </div>
            <Link href="/about" className="hidden lg:inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
              NPO #80618910 — إيستونيا
            </Link>
          </div>

          {/* Featured + secondary */}
          {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
            {/* Featured article — large */}
            <Link href={`/blog/${featured.slug}`} className="lg:col-span-2 group relative rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[420px]">
              {featured.featuredImage && (
                <Image src={featured.featuredImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-5 lg:p-8">
                {featured.category && (
                  <span className="inline-block bg-coral text-white text-[10px] lg:text-xs font-bold px-3 py-1 rounded-full mb-3">{featured.category.name}</span>
                )}
                <h2 className="text-xl lg:text-3xl font-extrabold text-white leading-snug mb-2 group-hover:text-coral transition-colors">{featured.title}</h2>
                <div className="flex items-center gap-3 text-white/50 text-xs lg:text-sm">
                  <span>{featured.author?.name || featured.authorName}</span>
                  <span>·</span>
                  <span>{featured.publishedAt?.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>
            </Link>

            {/* Secondary articles */}
            <div className="flex flex-row lg:flex-col gap-3 lg:gap-5">
              {secondary.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group relative rounded-xl overflow-hidden flex-1 min-h-[140px] lg:min-h-0">
                  {article.featuredImage && (
                    <Image src={article.featuredImage} alt={article.title} fill className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-3 lg:p-5">
                    {article.category && (
                      <span className="inline-block bg-coral/90 text-white text-[8px] lg:text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5">{article.category.name}</span>
                    )}
                    <h3 className="text-white font-bold text-xs lg:text-base leading-snug group-hover:text-coral transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-white/40 text-[10px] lg:text-xs mt-1 hidden lg:block">{article.publishedAt?.toLocaleDateString("ar-EG", { month: "long", day: "numeric" })}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          )}

          {/* Quick stats bar */}
          <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-10 mt-6 lg:mt-10 pt-6 border-t border-white/10">
            <div className="text-center lg:text-right">
              <p className="text-2xl lg:text-3xl font-black text-white">{articleCount}+</p>
              <p className="text-white/40 text-[10px] lg:text-xs">مقال ودراسة</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center lg:text-right">
              <p className="text-2xl lg:text-3xl font-black text-white">{projects.length}</p>
              <p className="text-white/40 text-[10px] lg:text-xs">مشاريع نشطة</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center lg:text-right">
              <p className="text-2xl lg:text-3xl font-black text-white">3</p>
              <p className="text-white/40 text-[10px] lg:text-xs">مناطق جغرافية</p>
            </div>
            <div className="hidden lg:block w-px h-8 bg-white/10" />
            <div className="hidden lg:block text-right">
              <p className="text-2xl lg:text-3xl font-black text-white">+10</p>
              <p className="text-white/40 text-xs">سنوات من العطاء</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Latest articles grid ===== */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 lg:mb-10">
            <div>
              <h2 className="text-xl lg:text-3xl font-extrabold text-navy">آخر المقالات والأبحاث</h2>
              <p className="text-text-light text-xs lg:text-sm mt-1">تابع أحدث إصداراتنا في البحث والحوار والتنمية</p>
            </div>
            <Link href="/blog" className="hidden lg:inline-flex items-center gap-2 text-coral font-bold text-sm hover:underline">
              عرض الكل
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            </Link>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 lg:mb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
            <Link href="/blog" className="flex-shrink-0 bg-navy text-white text-xs font-bold px-4 py-2 rounded-full">الكل</Link>
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat.id} href={`/blog?category=${cat.name}`} className="flex-shrink-0 bg-warm-gray text-navy text-xs font-bold px-4 py-2 rounded-full hover:bg-coral/10 transition-colors whitespace-nowrap">
                {cat.name} ({cat._count.articles})
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {rest.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-[16/10]">
                  {article.featuredImage ? (
                    <Image src={article.featuredImage} alt={article.title} fill className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-warm-gray flex items-center justify-center"><span className="text-navy/20 text-3xl font-black">SGO</span></div>
                  )}
                  {article.category && (
                    <span className="absolute top-2 right-2 bg-coral text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{article.category.name}</span>
                  )}
                </div>
                <h3 className="text-sm lg:text-base font-bold text-navy leading-snug group-hover:text-coral transition-colors line-clamp-2 mb-1.5">{article.title}</h3>
                <p className="text-text-light text-[10px] lg:text-xs">{article.author?.name || article.authorName} · {article.publishedAt?.toLocaleDateString("ar-EG", { month: "short", day: "numeric" })}</p>
              </Link>
            ))}
          </div>

          <div className="lg:hidden text-center mt-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-coral font-bold text-sm">
              عرض جميع المقالات
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== About strip — mission + identity ===== */}
      <section className="py-10 lg:py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[3px] bg-coral rounded-full" />
                <p className="text-coral text-xs lg:text-sm font-bold">من نحن</p>
              </div>
              <h2 className="text-xl lg:text-3xl font-extrabold text-navy mb-4 leading-snug">نسعى لنشأة نخبة مستقبلية جديدة قادرة على صناعة التغيير</h2>
              <p className="text-text-light text-sm leading-[1.9] mb-6">
                منظمة مجموعات التحفيز هي منظمة أوروبية غير هادفة للربح مقرها إيستونيا، تعمل في مصر وأفريقيا والشرق الأوسط على تمكين الشباب وتعزيز الحوار المجتمعي من خلال البحوث والدراسات والتدريب.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="bg-navy text-white font-bold px-6 py-2.5 rounded-xl hover:bg-navy-light transition-colors text-sm">إعرف المزيد</Link>
                <a href="https://wa.me/447506663561" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#1da851] transition-colors text-sm flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  واتساب
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/future.jpg" alt="فهم الحاضر" width={600} height={400} className="w-full h-[250px] lg:h-[320px] object-cover object-[center_20%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="text-navy text-xs font-bold">NPO #80618910</p>
                  <p className="text-text-light text-[10px]">إيستونيا — أوروبا</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-xl lg:text-3xl font-extrabold text-navy mb-2">مجالات عملنا</h2>
            <p className="text-text-light text-sm max-w-xl mx-auto">أربعة محاور رئيسية نعمل من خلالها على تحقيق رؤيتنا</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {[
              { title: "البحوث والدراسات", desc: "دراسات أكاديمية وأوراق سياسات", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, color: "bg-coral/10 text-coral" },
              { title: "تحفيز النقاشات", desc: "ندوات وحوارات ومناظرات", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: "bg-[#3B82F6]/10 text-[#3B82F6]" },
              { title: "تنمية المهارات", desc: "تدريب وتطوير قدرات الشباب", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>, color: "bg-[#25D366]/10 text-[#25D366]" },
              { title: "نشر الوعي", desc: "محتوى إيجابي وتوعية مجتمعية", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>, color: "bg-purple-100 text-purple-600" },
            ].map((s) => (
              <Link key={s.title} href="/services" className="group bg-warm-gray rounded-xl lg:rounded-2xl p-5 lg:p-7 border border-border hover:border-coral/20 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-4`}>{s.icon}</div>
                <h3 className="text-sm lg:text-base font-bold text-navy mb-1 group-hover:text-coral transition-colors">{s.title}</h3>
                <p className="text-text-light text-[10px] lg:text-xs leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Projects ===== */}
      {projects.length > 0 && (
      <section className="py-10 lg:py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 lg:mb-10">
            <div>
              <h2 className="text-xl lg:text-3xl font-extrabold text-navy">مشروعاتنا</h2>
              <p className="text-text-light text-xs lg:text-sm mt-1">مشاريع مؤثرة لتحقيق التغيير الإيجابي</p>
            </div>
            <Link href="/projects" className="text-coral font-bold text-sm hover:underline">عرض الكل</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}
                className="group bg-white rounded-xl lg:rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  {project.featuredImage ? (
                    <Image src={project.featuredImage} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : project.partnerLogos[0] ? (
                    <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                      <Image src={project.partnerLogos[0]} alt="" width={140} height={60} className="opacity-50 group-hover:opacity-80 transition-opacity" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                      <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt="" width={100} height={40} className="opacity-15" />
                    </div>
                  )}
                </div>
                <div className="p-4 lg:p-5">
                  <h3 className="text-sm lg:text-base font-bold text-navy leading-snug group-hover:text-coral transition-colors mb-1.5">{project.title}</h3>
                  <p className="text-text-light text-xs leading-relaxed line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ===== Split section — معًا لبناء + استراتيجيتنا ===== */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/diversity-and-teamwork-as-a-group-of-diverse-peopl-2023-01-26-00-04-28-utc.jpg" alt="Together" width={700} height={450} className="w-full h-[250px] lg:h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-coral text-white rounded-xl lg:rounded-2xl p-3 lg:p-5 shadow-xl">
                <p className="text-xl lg:text-3xl font-black">+10</p>
                <p className="text-white/80 text-[10px] lg:text-xs font-semibold">سنوات من العطاء</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[3px] bg-coral rounded-full" />
                <p className="text-coral text-xs lg:text-sm font-bold">نحو مستقبل مشرق</p>
              </div>
              <h2 className="text-xl lg:text-3xl font-extrabold text-navy mb-4 leading-snug">معًا لبناء مجتمع أفضل</h2>
              <p className="text-text-light text-sm leading-[1.9] mb-6">
                نؤمن بأن المجتمع يجب أن يسبق السلطة، وأن تقوية المجتمع هو ضمانة لتحقيق حوكمة جيدة وعادلة. نعمل على تمكين الشباب وتقديم الفرص اللازمة للحوار والنقاش والتفاعل.
              </p>
              <div className="space-y-3">
                {[
                  "تحقيق التغيير الإيجابي من خلال استراتيجية مدروسة وهادفة",
                  "توفير الدعم اللازم للشباب من خلال مشاريع وبرامج وورش نقاشية",
                  "الالتزام بالشفافية والمساءلة في جميع أنشطتنا",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                    </div>
                    <p className="text-text-light text-xs lg:text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA — Parallax ===== */}
      <section className="parallax-section py-16 lg:py-24">
        <div className="parallax-bg" style={{ backgroundImage: "url(https://stimulusgroups.org/wp-content/uploads/2023/07/youth-collabor.jpg)" }} />
        <div className="parallax-overlay bg-black/60" />
        <div className="parallax-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-coral text-sm font-semibold mb-3">ساهم في تحقيق التغيير الإيجابي</p>
          <h2 className="text-2xl lg:text-4xl font-extrabold mb-4">اجعل تبرعك فرصة للأمل والتغيير</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            ندعوك للمشاركة في رحلتنا لتحقيق التغيير الإيجابي وبناء مجتمع أفضل
          </p>
          <div className="inline-flex items-center rounded-xl overflow-hidden shadow-lg">
            <Link href="/donate" className="bg-navy text-white font-bold px-8 py-3.5 hover:bg-navy-light transition-colors text-sm">تبرع الآن</Link>
            <span className="bg-white text-text-light px-3 py-3.5 text-xs font-bold">أو</span>
            <Link href="/contact" className="bg-coral text-white font-bold px-8 py-3.5 hover:bg-coral-hover transition-colors text-sm">تواصل معنا</Link>
          </div>
        </div>
      </section>
    </>
  );
}
