import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "خدماتنا" };

const PROGRAMS = [
  {
    num: "٠١ / RESEARCH",
    title: "البحوث والدراسات الأكاديمية",
    desc: "إنتاج أبحاث تطبيقية ودراسات سياسات عامة في الاقتصاد، الحوكمة، والتنمية المحلية، مع منهجية شفافة ومراجعة من الأقران. وتتعلق بالبحوث والدراسات الأكاديمية وأوراق السياسات.",
    items: [
      { bold: "دراسات سياسات عامة", text: "تحليل معمّق للقضايا الاقتصادية والسياسية مع توصيات عملية" },
      { bold: "أوراق بحثية أكاديمية", text: "أبحاث محكّمة تُنشر باللغتين العربية والإنجليزية" },
      { bold: "مسوحات ميدانية", text: "جمع بيانات أصيلة من الميدان عبر استبيانات ومقابلات معمّقة" },
    ],
    stats: [{ num: "42+", label: "دراسة منشورة" }, { num: "3", label: "فئات بحثية" }, { num: "10+", label: "سنوات" }],
  },
  {
    num: "٠٢ / DIALOGUE",
    title: "تحفيز النقاشات المجتمعية والسياسية",
    desc: "من خلال الندوات والحوارات وورش العمل والمناظرات والمقابلات، التي تركز على التحفيز الإيجابي في التفاعل مع القضايا المثارة المرتبطة بالمشكلات الاجتماعية والسياسية والاقتصادية والتنموية.",
    items: [
      { bold: "ندوات وحوارات عامة", text: "منصات حوارية تجمع الأكاديميين وصنّاع القرار والمجتمع المدني" },
      { bold: "موائد مستديرة", text: "جلسات نقاشية مغلقة حول الملفات الأكثر إلحاحاً" },
      { bold: "مناظرات وورش عمل", text: "تفاعل مباشر مع الجمهور حول القضايا الاجتماعية والسياسية" },
    ],
    stats: [{ num: "12+", label: "ندوة سنوياً" }, { num: "500+", label: "مشارك" }, { num: "3", label: "دول" }],
  },
  {
    num: "٠٣ / TRAINING",
    title: "تنمية مهارات المهتمين بالشأن العام",
    desc: "عبر الدورات التدريبية القصيرة والمتوسطة وطويلة المدى، وعبر المحاضرات والورش والندوات الحوارية والكتابات التي تستهدف الشباب خصوصاً، وتركز على الطابع العملي والتدريبي.",
    items: [
      { bold: "برامج زمالة بحثية", text: "برنامج إقامي لإعداد الجيل القادم من الباحثين والمحللين" },
      { bold: "دورات تدريبية", text: "في مهارات البحث الكمي والنوعي وكتابة السياسات" },
      { bold: "ورش عمل متخصصة", text: "تدريب عملي مكثف على منهجيات البحث والتحليل" },
    ],
    stats: [{ num: "1000+", label: "مستفيد" }, { num: "6", label: "دفعات" }, { num: "7", label: "محافظات" }],
  },
  {
    num: "٠٤ / AWARENESS",
    title: "نشر الوعي العام",
    desc: "عبر الوسائط المختلفة فيما يتعلق بمقدمات تعريفية بالعلوم الاجتماعية والإنسانية، وما يرتبط منها بقضايا الشأن العام وحياة الناس اليومية. نسعى إلى تحفيز المحتوى الإيجابي.",
    items: [
      { bold: "مقالات ودراسات مبسّطة", text: "محتوى معرفي يجسر الفجوة بين البحث الأكاديمي والنقاش العام" },
      { bold: "إنفوغرافيك وتصاميم", text: "تصوير بصري للبيانات والنتائج البحثية بشكل مبسط وجذاب" },
      { bold: "محتوى رقمي", text: "إنتاج محتوى للمنصات الرقمية يصل لجمهور أوسع" },
    ],
    stats: [{ num: "45+", label: "مقال منشور" }, { num: "3", label: "منصات" }, { num: "∞", label: "وصول" }],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-white/50 text-[10px] lg:text-xs mb-4 font-mono tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-white/70">خدماتنا</span>
          </div>
          <h1 className="text-[28px] sm:text-[38px] lg:text-[56px] font-black text-white leading-[1.05] tracking-tight">
            أربعة برامج،<br />هدف <span className="text-coral">واحد</span>.
          </h1>
          <p className="text-white/60 text-[13px] lg:text-lg leading-relaxed mt-4 max-w-[60ch]">
            تقوم مجموعات التحفيز بأنشطة متعددة يمكن إجمالها تحت أربعة عناوين رئيسية.
          </p>
        </div>
      </section>

      {PROGRAMS.map((prog, i) => (
        <section key={prog.num} className={`py-16 lg:py-24 border-b border-rule ${i % 2 === 0 ? "bg-paper" : "bg-warm-gray"}`}>
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className="font-mono text-sm tracking-[0.18em] text-coral font-bold mb-5">{prog.num}</div>
              <h2 className="text-2xl lg:text-[48px] font-black text-navy leading-[1.05] tracking-tight mb-6">{prog.title}</h2>
              <p className="text-[15px] lg:text-[17px] leading-[1.65] text-text mb-7">{prog.desc}</p>
              <Link href="/contact" className="inline-block bg-coral text-white font-bold px-6 py-3 text-sm hover:bg-coral-hover transition-colors">تواصل معنا ←</Link>
            </div>
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <ul className="space-y-0">
                {prog.items.map((item) => (
                  <li key={item.bold} className="py-4 border-t border-rule last:border-b grid grid-cols-[24px_1fr] gap-3 items-start">
                    <span className="text-coral font-extrabold text-lg mt-0.5">✓</span>
                    <div>
                      <b className="block text-base text-navy mb-1">{item.bold}</b>
                      <span className="text-sm text-text leading-relaxed">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {prog.stats.map((s) => (
                  <div key={s.label} className="p-4 bg-white border border-rule">
                    <div className="text-2xl lg:text-[32px] font-extrabold text-navy leading-none tracking-tight font-inter mb-1.5">{s.num}</div>
                    <div className="text-[11px] text-text-light font-mono tracking-[0.06em] uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 lg:py-24 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <span className="sg-kicker text-[#ff8e7a]">— GET INVOLVED</span>
          <h2 className="text-3xl lg:text-[48px] font-black leading-[1.1] tracking-tight mt-4 mb-6">هل تريد المشاركة في برامجنا؟</h2>
          <p className="text-white/60 text-sm lg:text-base leading-relaxed mb-8">سواء كنت باحثاً، مصمماً، أو مهتماً بالشأن العام — نرحب بتواصلك ومشاركتك.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/contact" className="bg-coral text-white font-bold px-8 py-3.5 text-sm hover:bg-coral-hover transition-colors">تواصل معنا ←</Link>
            <Link href="/donate" className="border border-white/30 text-white font-bold px-8 py-3.5 text-sm hover:bg-white/10 transition-colors">تبرع الآن</Link>
          </div>
        </div>
      </section>
    </>
  );
}
