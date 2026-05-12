import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "من نحن" };

const VALUES = [
  { num: "01", title: "الحرية", desc: "نؤمن بالحرية كأساس لأي عمل بحثي. لا انتماء حزبي ولا أجندة خفيّة." },
  { num: "02", title: "الشفافية", desc: "منهجياتنا ومصادر تمويلنا وتقاريرنا المالية كاملةً متاحة للجميع." },
  { num: "03", title: "الاحتراف", desc: "احترام العلم والتخصص والاحتراف في كل ما ننتجه من أبحاث ودراسات." },
  { num: "04", title: "المجتمع أولاً", desc: "المجتمع الفعال قبل السلطة القوية. نؤمن بتقوية المجتمع كضمانة للحوكمة الرشيدة." },
  { num: "05", title: "التعاون", desc: "نستثمر في الشراكات والتعاون مع التنوع لتحقيق أثر أكبر وأعمق." },
  { num: "06", title: "الجيل القادم", desc: "نستثمر في الشباب لأن استمرار العمل البحثي مرهون باستمرار من يقوم به." },
];

const TEAM = [
  { name: "د. ياسر فتحي", role: "رئيس المنظمة", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st1.png" },
  { name: "د. خالد فؤاد", role: "باحث رئيسي", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st2.png" },
  { name: "أحمد محسن", role: "باحث", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st3.png" },
  { name: "أ. د. سمير عبد العزيز الوسيمي", role: "مستشار أول", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st4.png" },
];

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-white/50 text-[10px] lg:text-xs mb-4 font-mono tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-white/70">من نحن</span>
          </div>
          <h1 className="text-[28px] sm:text-[38px] lg:text-[56px] font-black text-white leading-[1.05] tracking-tight">
            بيت فكر مستقل،<br />يعمل على المدى الطويل.
          </h1>
          <p className="text-white/60 text-[13px] lg:text-lg leading-relaxed mt-4 max-w-[60ch]">
            منظمة أوروبية غير هادفة للربح مقرها إيستونيا، تعمل في مصر وأفريقيا والشرق الأوسط على إنتاج المعرفة وتيسير الحوار العام وبناء قدرات الجيل القادم.
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-3 mt-6 text-white/50 text-xs font-mono tracking-wide">
            <div>التأسيس <b className="text-white block mt-0.5">إيستونيا · أوروبا</b></div>
            <div>التسجيل <b className="text-white block mt-0.5">NPO #80618910</b></div>
            <div>الفريق <b className="text-white block mt-0.5">باحثون ومتعاونون</b></div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <span className="sg-kicker">— OUR STORY · القصة</span>
            <h2 className="text-3xl lg:text-[64px] font-black text-navy leading-[1.05] tracking-tight mt-3">
              بدأنا من <span className="text-coral">سؤال واحد</span>
            </h2>
          </div>
          <div>
            <p className="text-lg lg:text-[22px] leading-relaxed font-medium text-navy mb-6">
              نسعى للمساهمة في نشأة نخبة مستقبلية جديدة يمكنها أن تبتكر حلولاً تفتح آفاقاً لفاعليات مجتمعية مؤثرة ومتنوعة.
            </p>
            <p className="text-[15px] lg:text-[17px] leading-[1.75] text-text mb-4">
              تأسست منظمة مجموعات التحفيز انطلاقاً من قناعة بأن المجتمع يحتاج إلى مؤسسات بحثية مستقلة تعمل على المدى الطويل، وتُنتج معرفة بمعايير مهنية صارمة، وتُتيحها للجميع.
            </p>
            <p className="text-[15px] lg:text-[17px] leading-[1.75] text-text mb-4">
              دفعتنا رحلتنا لتقدير تنوع تجارب الإصلاح في بلادنا عبر التاريخ، مع الحاجة لاتساع دائرة الفهم لتشمل مساحة واسعة من التجارب الإنسانية وخبراتها المتعددة.
            </p>
            <p className="text-[15px] lg:text-[17px] leading-[1.75] text-text">
              نحن لسنا مرتبطين بأي حزب أو تيار سياسي. نعمل بشفافية كاملة ونؤمن بأن المعرفة العامة هي أقصر طريق نحو مجتمعات أكثر عدلاً واستقراراً.
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-16 lg:py-24 bg-warm-gray">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <span className="sg-kicker">— VISION & MISSION · الرؤية والرسالة</span>
          <h2 className="text-3xl lg:text-[56px] font-black text-navy leading-[1.04] tracking-tight mt-3 mb-10">ماذا نريد ولماذا</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-rule border-r border-rule">
            <div className="bg-white border-b border-l border-rule p-8 lg:p-10">
              <div className="font-mono text-[11px] tracking-[0.14em] text-coral font-bold mb-6">VISION · الرؤية</div>
              <h3 className="text-xl lg:text-2xl font-extrabold text-navy mb-4">رؤيتنا</h3>
              <p className="text-[15px] leading-[1.75] text-text">المساهمة في نشأة نخبة مستقبلية جديدة يمكنها أن تبتكر حلولاً تفتح آفاقاً لفاعليات مجتمعية جديدة ومتنوعة، وقادرة على مراكمة نجاحتها باتجاه الإصلاح والنهضة والديمقراطية.</p>
            </div>
            <div className="bg-white border-b border-l border-rule p-8 lg:p-10">
              <div className="font-mono text-[11px] tracking-[0.14em] text-coral font-bold mb-6">MISSION · الرسالة</div>
              <h3 className="text-xl lg:text-2xl font-extrabold text-navy mb-4">رسالتنا</h3>
              <p className="text-[15px] leading-[1.75] text-text">نعمل على توسيع دائرة الحوار الفعال وتحفيزه من المهتمين بالشأن العام، حول مشكلات مصر وأفريقيا والعالم العربي والشرق الأوسط. رسالتنا تحفيزية، وأدواتنا معرفية وبحثية.</p>
            </div>
            <div className="bg-white border-b border-l border-rule p-8 lg:p-10">
              <div className="font-mono text-[11px] tracking-[0.14em] text-coral font-bold mb-6">PHILOSOPHY · الفلسفة</div>
              <h3 className="text-xl lg:text-2xl font-extrabold text-navy mb-4">فلسفتنا</h3>
              <p className="text-[15px] leading-[1.75] text-text">تحويل أفكار الخبرات الإنسانية المتنوعة للإصلاح والنهضة إلى حالة حوار إيجابي فعال، يطور القدرات ويفتح الآفاق ويسهل التعاون ويمهد لواقع جديد.</p>
            </div>
            <div className="bg-white border-b border-l border-rule p-8 lg:p-10">
              <div className="font-mono text-[11px] tracking-[0.14em] text-coral font-bold mb-6">AUDIENCE · الجمهور</div>
              <h3 className="text-xl lg:text-2xl font-extrabold text-navy mb-4">شباب الأمل</h3>
              <p className="text-[15px] leading-[1.75] text-text">جمهورنا الأول هو الشباب المصري والعربي الراغب في خدمة بلاده والإسهام في الإصلاح والنهضة وتمكين الديمقراطية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 lg:py-24 bg-navy text-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <span className="sg-kicker text-[#ff8e7a]">— VALUES · ميثاقنا</span>
          <h2 className="text-3xl lg:text-[56px] font-black text-white leading-[1.04] tracking-tight mt-3 mb-10">على ماذا لا نتنازل</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {VALUES.map((v) => (
              <div key={v.num} className="p-7 lg:p-8 bg-white/[0.04] border border-white/10">
                <div className="font-mono text-[12px] tracking-[0.14em] text-[#ff8e7a] font-bold mb-4">{v.num}</div>
                <h3 className="text-xl lg:text-[22px] font-extrabold mb-3">{v.title}</h3>
                <p className="text-sm leading-relaxed text-white/[0.78]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <span className="sg-kicker">— TEAM · الفريق القيادي</span>
          <h2 className="text-3xl lg:text-[56px] font-black text-navy leading-[1.04] tracking-tight mt-3 mb-10">من يقود العمل</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-white border border-rule">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
                <div className="p-5 lg:p-6">
                  <h4 className="text-base lg:text-lg font-extrabold text-navy mb-1">{m.name}</h4>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-coral uppercase mb-3">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
