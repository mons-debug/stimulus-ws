import Link from "next/link";
import Image from "next/image";
import { WavyText } from "@/components/ui/wavy-text";
import { prisma } from "@/lib/db";

const LATEST_ARTICLES = [
  {
    title: "أسئلة الأزمات وسؤال جدوى النظام الاقتصادي",
    date: "مايو 7, 2026",
    category: "مقالات",
    image: "https://stimulusgroups.org/wp-content/uploads/2026/05/أسئلة-الأزمات.jpg",
  },
  {
    title: "لماذا يكرهون الحوكمة؟",
    date: "مايو 2, 2026",
    category: "مقالات",
    image: "https://stimulusgroups.org/wp-content/uploads/2026/05/لماذا-يكرهون-الحوكمة؟.jpg",
  },
  {
    title: "هموم المصريين .. من وراثة الاحتجاج إلى تجديد الأمل والفاعلية",
    date: "أبريل 25, 2026",
    category: "مقالات",
    image: "https://stimulusgroups.org/wp-content/uploads/2026/04/هموم-المصريين.jpg",
  },
];

export default async function HomePage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, take: 3 });

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-navy overflow-hidden">
        {/* Dot grid pattern — Aceternity style */}
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        {/* Gradient glows */}
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-coral/20 rounded-full blur-[180px]" />
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-coral/15 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center min-h-screen pt-12 pb-3 lg:pt-28 lg:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-12 items-center">
            {/* Text side — shows first on mobile */}
            <div className="text-center lg:text-right order-1">
              <div className="inline-block bg-white/10 backdrop-blur-sm text-white/80 text-[10px] lg:text-xs font-bold px-3 lg:px-4 py-1 lg:py-1.5 rounded-full mb-3 lg:mb-6 border border-white/10">
                NPO #80618910 — إيستونيا
              </div>
              <h1 className="text-[40px] sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-3 lg:mb-6">
                <WavyText text="منظمة مجموعات" /><br /><WavyText text="التحفيز" className="text-coral" delay={0.4} />
              </h1>
              <p className="text-white/60 text-sm lg:text-lg leading-relaxed mb-4 lg:mb-10 max-w-lg mx-auto lg:mr-0">
                منظمة أوروبية غير هادفة للربح تعمل على تحقيق التغيير الإيجابي في مصر وأفريقيا والشرق الأوسط
              </p>
              <div className="flex flex-wrap gap-2.5 lg:gap-3 justify-center lg:justify-start mb-1 lg:mb-0">
                <Link href="/about" className="bg-white text-navy font-bold px-4 lg:px-8 py-2 lg:py-3.5 rounded-lg lg:rounded-xl hover:bg-warm-gray transition-colors shadow-lg shadow-black/10 text-[11px] lg:text-base">من نحن</Link>
                <Link href="/contact" className="bg-coral text-white font-bold px-4 lg:px-8 py-2 lg:py-3.5 rounded-lg lg:rounded-xl hover:bg-coral-hover transition-colors shadow-lg shadow-coral/20 text-[11px] lg:text-base">تواصل معنا</Link>
              </div>
            </div>
            {/* Articles side — horizontal scroll on mobile, grid on desktop */}
            <div className="order-2">
              <div className="flex items-center justify-between mb-4 lg:mb-5">
                <h2 className="text-base lg:text-lg font-bold text-white">آخر المقالات</h2>
                <Link href="/blog" className="text-sm text-coral font-semibold hover:underline">عرض الكل ←</Link>
              </div>
              {/* Mobile: attractive horizontal cards */}
              <div className="flex lg:hidden gap-2.5 justify-center pb-1">
                {LATEST_ARTICLES.map((article) => (
                  <Link key={article.title} href="/blog" className="group relative rounded-xl overflow-hidden flex-1 max-w-[140px] border border-white/10 shadow-xl shadow-black/30">
                    <div className="aspect-[2/3]">
                      <Image src={article.image} alt={article.title} fill sizes="140px" className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500 brightness-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2">
                      <span className="inline-block bg-coral text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">{article.category}</span>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 p-2.5">
                      <h3 className="text-white font-bold text-[10px] leading-snug line-clamp-2 mb-0.5">{article.title}</h3>
                      <p className="text-white/40 text-[8px]">{article.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Desktop: featured + grid */}
              <div className="hidden lg:block">
                <Link href="/blog" className="group block relative rounded-2xl overflow-hidden mb-3 shadow-xl shadow-black/20">
                  <div className="aspect-[16/9]">
                    <Image src={LATEST_ARTICLES[0].image} alt={LATEST_ARTICLES[0].title} fill sizes="50vw" className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <span className="inline-block bg-coral text-white text-[10px] font-bold px-3 py-1 rounded-full mb-2">{LATEST_ARTICLES[0].category}</span>
                    <h3 className="text-white font-bold text-lg leading-snug mb-1 group-hover:text-coral transition-colors">{LATEST_ARTICLES[0].title}</h3>
                    <p className="text-white/50 text-xs">{LATEST_ARTICLES[0].date}</p>
                  </div>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  {LATEST_ARTICLES.slice(1).map((article) => (
                    <Link key={article.title} href="/blog" className="group relative rounded-xl overflow-hidden shadow-lg shadow-black/10">
                      <div className="aspect-[4/3]">
                        <Image src={article.image} alt={article.title} fill sizes="25vw" className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-110" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 right-0 left-0 p-4">
                        <span className="inline-block bg-coral/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full mb-1.5">{article.category}</span>
                        <h3 className="text-white font-bold text-xs leading-snug group-hover:text-coral transition-colors line-clamp-2">{article.title}</h3>
                        <p className="text-white/40 text-[10px] mt-1">{article.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ===== مشروعاتنا ===== */}
      {projects.length > 0 && (
      <section className="relative py-14 lg:py-24 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.08)_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[150px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 lg:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-[3px] bg-coral rounded-full" />
                <p className="text-coral text-xs lg:text-sm font-bold">مشروعاتنا</p>
              </div>
              <h2 className="text-2xl lg:text-4xl font-extrabold text-white leading-snug">نعمل على تحقيق التغيير<br className="hidden lg:block" /> من خلال مشاريعنا</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors text-xs lg:text-sm border border-white/10 w-fit">
              عرض جميع المشاريع
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            </Link>
          </div>

          {/* First project — featured large card */}
          <Link href={`/projects/${projects[0].slug}`}
            className="group block relative rounded-2xl lg:rounded-3xl overflow-hidden mb-4 lg:mb-6 border border-white/10 hover:border-coral/30 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative min-h-[200px] lg:min-h-[320px] bg-gradient-to-br from-coral/20 to-navy-light">
                {projects[0].partnerLogos[0] ? (
                  <Image src={projects[0].partnerLogos[0]} alt="" fill className="object-contain p-12 lg:p-16 opacity-30 group-hover:opacity-50 transition-opacity" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[80px] lg:text-[120px] font-black text-white/5">01</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                  <span className="bg-coral text-white text-[10px] lg:text-xs font-bold px-3 py-1.5 rounded-full">المشروع الرئيسي</span>
                </div>
              </div>
              <div className="p-6 lg:p-10 flex flex-col justify-center bg-white/5">
                <h3 className="text-xl lg:text-3xl font-extrabold text-white mb-3 lg:mb-4 group-hover:text-coral transition-colors leading-snug">{projects[0].title}</h3>
                <p className="text-white/50 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 line-clamp-3">{projects[0].description}</p>
                <div className="flex items-center gap-2 text-coral text-sm font-bold">
                  <span>تفاصيل المشروع</span>
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Other projects — smaller cards */}
          {projects.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {projects.slice(1).map((project, i) => (
              <Link key={project.id} href={`/projects/${project.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-coral/30 bg-white/5 p-6 lg:p-8 transition-all hover:bg-white/10">
                <div className="absolute top-0 right-0 text-[60px] lg:text-[80px] font-black text-white/[0.03] leading-none select-none">{String(i + 2).padStart(2, "0")}</div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${i === 0 ? "bg-[#3B82F6]/20" : "bg-[#25D366]/20"}`}>
                  <svg className={`w-5 h-5 ${i === 0 ? "text-[#3B82F6]" : "text-[#25D366]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <h3 className="text-base lg:text-xl font-extrabold text-white mb-2 group-hover:text-coral transition-colors leading-snug">{project.title}</h3>
                <p className="text-white/40 text-xs lg:text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>
                <span className="text-coral text-xs font-bold">إقرأ المزيد ←</span>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
      )}

      {/* ===== ABOUT + من نحن ===== */}
      <section className="py-10 lg:py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: original 50/50 split — image card left, من نحن right */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-start">
            {/* Image card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/future.jpg" alt="فهم الحاضر" width={700} height={400} className="w-full h-72 object-cover object-[center_20%] hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow">
                  <p className="text-navy text-xs font-bold">NPO #80618910</p>
                </div>
              </div>
              <div className="p-8">
                <div className="inline-block bg-coral/10 text-coral text-xs font-bold px-3 py-1 rounded-full mb-4">فهم الحاضر لقيادة المستقبل</div>
                <h2 className="text-2xl font-extrabold text-navy mb-4 leading-snug">فهم الحاضر لقيادة المستقبل</h2>
                <p className="text-text-light leading-[1.9] text-sm mb-4">
                  نسعى في &quot;منظمة مجموعات التحفيز&quot; إلى تحقيق تلاحم المجتمع وتعزيز الترابط بين أفراده عبر الحوار الذي يتجاوز الخلاف ويحترم الاختلاف والتنوع. نؤمن بأن التعاون والتضامن هما المفتاح لبناء مجتمع قوي ومزدهر.
                </p>
                <a href="https://wa.me/447506663561" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-colors text-sm shadow-lg shadow-[#25D366]/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  تواصل معنا عبر الواتساب
                </a>
              </div>
            </div>
            {/* من نحن text */}
            <div>
              <div className="inline-block bg-navy/10 text-navy text-xs font-bold px-4 py-1.5 rounded-full mb-4">منظمة مجموعات التحفيز</div>
              <h2 className="text-3xl font-extrabold text-navy mb-6">من نحن؟</h2>
              <p className="text-text-light leading-[1.9] text-sm mb-6">
                نسعى للمساهمة في نشأة نخبة مستقبلية جديدة -في مصر وأفريقيا والشرق الأوسط- يمكنها أن تبتكر حلولا تفتح آفاقا لفاعليات مجتمعية مؤثرة ومتنوعة، وقادرة على مراكمة نجاحتها باتجاه الإصلاح والنهضة والديمقراطية في أشكال مؤسسية قابلة للاستمرار لأجيال قادمة
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { text: "تطوير نخبة مستقبلية مبدعة (الفاعلين الجدد)", icon: <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
                  { text: "تحقيق تأثير اجتماعي إيجابي", icon: <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg> },
                  { text: "دعم الحوار والنقاش والتدريب", icon: <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { text: "تعزيز ثقافة العطاء والتعاون", icon: <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                ].map((item) => (
                  <div key={item.text} className="bg-white rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                    <p className="text-navy text-sm font-semibold leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-light transition-all shadow-lg shadow-navy/20 group">
                إعرف المزيد
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </Link>
            </div>
          </div>

          {/* Mobile: compact split rows */}
          <div className="lg:hidden space-y-8">
            {/* فهم الحاضر */}
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/future.jpg" alt="فهم الحاضر" width={700} height={400} className="w-full h-[160px] object-cover object-[center_20%]" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="inline-block bg-coral/10 text-coral text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1.5">فهم الحاضر لقيادة المستقبل</div>
                <h2 className="text-base font-extrabold text-navy mb-1.5 leading-snug">فهم الحاضر لقيادة المستقبل</h2>
                <p className="text-text-light leading-[1.6] text-[11px] mb-2.5">
                  نسعى إلى تحقيق تلاحم المجتمع وتعزيز الترابط بين أفراده عبر الحوار.
                </p>
                <a href="https://wa.me/447506663561" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#25D366] text-white font-bold px-3.5 py-2 rounded-lg text-[10px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  واتساب
                </a>
              </div>
            </div>
            {/* من نحن */}
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-3">
                <div className="inline-block bg-navy/10 text-navy text-[10px] font-bold px-3 py-0.5 rounded-full mb-1.5">منظمة مجموعات التحفيز</div>
                <h2 className="text-base font-extrabold text-navy mb-1.5">من نحن؟</h2>
                <p className="text-text-light leading-[1.6] text-[11px] mb-2.5">
                  نسعى للمساهمة في نشأة نخبة مستقبلية جديدة تبتكر حلولا لفاعليات مجتمعية مؤثرة.
                </p>
                <Link href="/about" className="inline-flex items-center gap-1.5 bg-navy text-white font-bold px-3.5 py-2 rounded-lg text-[10px] group">
                  إعرف المزيد
                  <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
                </Link>
              </div>
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { text: "نخبة مستقبلية", icon: <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
                    { text: "تأثير إيجابي", icon: <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg> },
                    { text: "حوار وتدريب", icon: <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                    { text: "ثقافة العطاء", icon: <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                  ].map((item) => (
                    <div key={item.text} className="bg-white rounded-lg p-2 border border-border/50 shadow-sm text-center">
                      <div className="flex justify-center mb-1">{item.icon}</div>
                      <p className="text-navy text-[9px] font-semibold leading-tight">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES — 5 columns: 4 white cards + 1 coral CTA card ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-navy mb-4">خدماتنا</h2>
            <p className="text-text-light max-w-2xl mx-auto">تقوم مجموعات التحفيز السياسي بأنشطة متعددة يمكن إجمالها تحت أربعة عناوين رئيسية</p>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-0 lg:grid lg:grid-cols-5 lg:overflow-visible scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {/* Card 1: البحوث — book-open icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto snap-start">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الأولى</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">البحوث والدراسات الأكاديمية</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 2: تحفيز النقاشات — users icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto snap-start">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الثانية</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">تحفيز النقاشات المتعلقة بالقضايا المجتمعية والسياسية</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 3: تنمية مهارات — hand-holding-heart icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto snap-start">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الثالثة</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">تنمية مهارات المهتمين بالشأن العام وقدراتهم ومعارفهم</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 4: نشر الوعي — share icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto snap-start">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الرابعة</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">نشر الوعي العام</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 5: CTA coral card with bg image */}
            <Link href="/donate" className="relative overflow-hidden p-7 text-center text-white flex flex-col justify-center items-center flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-auto snap-start">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://stimulusgroups.org/wp-content/uploads/2023/07/youth-collabor.jpg)" }} />
              <div className="absolute inset-0 bg-coral/85" />
              <div className="relative z-10">
                <h3 className="text-lg font-extrabold leading-snug mb-2">انضم إلينا في صناعة التغيير الإيجابي</h3>
                <p className="text-white/80 text-sm mb-4">مساهمتك تصنع الفارق</p>
                <span className="inline-block bg-white text-coral font-bold text-xs px-4 py-2 rounded hover:bg-warm-gray transition-colors">تواصل معنا ←</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== معًا لبناء — modern split ===== */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-5 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative col-span-2 lg:col-span-1">
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
                <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/diversity-and-teamwork-as-a-group-of-diverse-peopl-2023-01-26-00-04-28-utc.jpg" alt="Together" width={700} height={500} className="w-full h-[200px] lg:h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-2 lg:-bottom-6 lg:-left-6 bg-coral text-white rounded-xl lg:rounded-2xl p-3 lg:p-5 shadow-xl shadow-coral/20">
                <p className="text-xl lg:text-3xl font-black">+10</p>
                <p className="text-white/80 text-[10px] lg:text-xs font-semibold">سنوات من العطاء</p>
              </div>
            </div>
            {/* Text side */}
            <div className="col-span-3 lg:col-span-1">
              <div className="inline-flex items-center gap-2 mb-3 lg:mb-5">
                <span className="w-6 lg:w-8 h-[3px] bg-coral rounded-full" />
                <p className="text-coral text-xs lg:text-sm font-bold tracking-wide">نحو مستقبل مشرق</p>
              </div>
              <h2 className="text-xl lg:text-4xl font-extrabold text-navy mb-3 lg:mb-6 leading-snug">معًا لبناء مجتمع أفضل</h2>
              <p className="text-text-light leading-[1.8] lg:leading-[2] text-xs lg:text-base mb-3 lg:mb-4">
                نحن &quot;منظمة مجموعات التحفيز&quot;، نسعى جاهدين لتحقيق التغيير الإيجابي في المجتمع. ونعتقد في أن المجتمع يجب أن يسبق السلطة، وكذلك نرى أن تقوية المجتمع هو ضمانة لتحقيق &quot;حوكمة جيدة وعادلة&quot;.
              </p>
              <p className="hidden lg:block text-text-light leading-[2] mb-10">
                كما نؤمن بقوة العطاء والتعاون والتضامن لبناء مستقبل أفضل للجميع. إننا نعمل على تمكين الشباب وتقديم الفرص اللازمة للحوار والنقاش والتفاعل لتطوير قدراتهم ومهاراتهم باتجاه إكسابهم فاعلية حقيقية ومؤثرة.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 lg:gap-3 bg-navy text-white font-bold px-5 lg:px-8 py-2.5 lg:py-4 rounded-xl hover:bg-navy-light transition-all hover:shadow-lg hover:shadow-navy/20 w-fit group text-xs lg:text-base">
                تواصل معنا
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== استراتيجيتنا — reversed modern split ===== */}
      <section className="py-12 lg:py-20 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-5 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            {/* Text side */}
            <div className="order-2 lg:order-1 col-span-3 lg:col-span-1">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-[3px] bg-coral rounded-full" />
                <p className="text-coral text-sm font-bold tracking-wide">رؤية النجاح</p>
              </div>
              <h2 className="text-xl lg:text-4xl font-extrabold text-navy mb-4 lg:mb-8 leading-snug">استراتيجيتنا للتغيير الإيجابي</h2>
              <div className="space-y-5">
                {[
                  "في منظمتنا، نسعى جاهدين لتحقيق التغيير الإيجابي في المجتمع من خلال استراتيجية مدروسة وهادفة. تتمحور رؤيتنا حول إحداث تحول حقيقي وإيجاد فاعلية وفاعلين يمكنهم صناعة الفارق.",
                  "تتمثل استراتيجيتنا في توفير الدعم اللازم للشباب والشابات من خلال مشروعاتنا وخدماتنا، من خلال مشاريع وبرامج وورش نقاشية، والتشجيع على الحوار والتدريب المتميز.",
                  "إننا نولي اهتمامًا كبيرًا للشفافية والمساءلة، حيث نعمل بجدية على تحقيق الفاعلية والاستدامة في جميع أنشطتنا وضمان أعلى درجات الكفاءة والجودة.",
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 lg:gap-4 bg-white rounded-xl p-3 lg:p-5 border border-border/50 shadow-sm">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8553D" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 3 6-6"/></svg>
                    </div>
                    <p className="text-text-light leading-[1.7] lg:leading-[2] text-[11px] lg:text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Image side */}
            <div className="relative order-1 lg:order-2 col-span-2 lg:col-span-1">
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
                <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/cheerful-diverse-teenagers-2022-12-16-00-28-36-utc.jpg" alt="Youth" width={700} height={500} className="w-full h-[200px] lg:h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-2 lg:-bottom-6 lg:-right-6 bg-white rounded-xl lg:rounded-2xl p-3 lg:p-5 shadow-xl border border-border/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-coral flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-navy">+1000</p>
                    <p className="text-text-light text-xs">شاب ومشارك في برامجنا</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ساهم — Full-width bg image + dark overlay + dual button ===== */}
      <section className="parallax-section py-24">
        <div className="parallax-bg" style={{ backgroundImage: "url(https://stimulusgroups.org/wp-content/uploads/2023/07/youth-collabor.jpg)" }} />
        <div className="parallax-overlay bg-black/60" />
        <div className="parallax-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-coral text-sm font-semibold mb-3">ساهم في تحقيق التغيير الإيجابي</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">اجعل تبرعك وتطوعك الآن فرصة للأمل والتغيير</h2>
          <p className="text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            ندعوك للمشاركة في رحلتنا لتحقيق التغيير الإيجابي وتقديم المساهمة في بناء مجتمع أفضل. من خلال تبرعك ودعمك وتطوعك، يمكننا دعم الشباب والشابات وتطوير قدراتهم ومهاراتهم، وتقديم الفرص التي تحتاجها الأجيال القادمة لتحقيق طموحاتهم.
          </p>
          {/* Dual button matching original */}
          <div className="inline-flex items-center rounded-lg overflow-hidden shadow-lg">
            <Link href="/donate" className="bg-navy text-white font-bold px-10 py-4 hover:bg-navy-light transition-colors">تبرع الآن</Link>
            <span className="bg-white text-text-light px-4 py-4 text-sm font-bold">أو</span>
            <Link href="/contact" className="bg-coral text-white font-bold px-10 py-4 hover:bg-coral-hover transition-colors">تواصل معنا</Link>
          </div>
        </div>
      </section>

      {/* Blog section removed — articles already shown in hero */}
    </>
  );
}
