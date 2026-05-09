import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "من نحن" };

const VALUES = [
  "الحرية",
  "احترام العلم والتخصص والاحتراف",
  "المجتمع الفعال قبل السلطة القوية",
  "التأثير الفعّال",
  "التعاون والتضامن",
  "الحوار والديمقراطية",
  "الكرامة وحقوق الإنسان",
  "الابتكار والإبداع",
];

const TEAM = [
  { name: "د. ياسر فتحي", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st1.png" },
  { name: "خالد فؤاد", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st2.png" },
  { name: "أحمد محسن", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st3.png" },
  { name: "أ. د. سمير عبد العزيز الوسيمي", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/st4.png" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16"><div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">&quot;مجموعات التحفيز&quot; من نحن؟</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span>
            <span>من نحن</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-navy mb-8">قصتنا</h2>
          <div className="text-text-light leading-[2] space-y-6">
            <p>بدأت قصتنا بسؤالين: لماذا يفقد الناس في مجتمعنا قدرتهم على التأثير والإسهام في نهضة البلاد وتطورها؟ ولماذا ترتفع الآمال والطموحات لزعماء أو حركات أو تيارات أو أحزاب ثم تهوي إلى انكسارات شديدة أمام صعوبات الواقع وتحديات السلطة؟</p>
            <p>حفزنا ذلك لنبدأ رحلة من البحث والفهم، ولا نتعجل الإجابة أو إسقاط التجارب والانطباعات الخاصة، واستمتعنا برحلة الفهم والبحث من عدة زوايا وتخصصات ومقاربات مختلفة.</p>
            <p>دفعتنا رحلتنا لتقدير تنوع تجارب الإصلاح في بلادنا عبر التاريخ، مع الحاجة لاتساع دائرة الفهم لتشمل مساحة واسعة من التجارب الإنسانية وخبراتها المتعددة.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-extrabold text-navy mb-4">رؤيتنا</h2>
            <p className="text-text-light leading-[2]">المساهمة في نشأة نخبة مستقبلية جديدة يمكنها أن تبتكر حلولا تفتح آفاقا لفاعليات مجتمعية جديدة ومتنوعة، وقادرة على مراكمة نجاحتها باتجاه الإصلاح والنهضة والديمقراطية.</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-navy mb-4">الغاية</h2>
            <p className="text-text-light leading-[2]">الغاية الكبرى هي فتح آفاق واقعية وممكنة لتحسين حياة الناس من خلال تطوير المنظومة الاقتصادية والسياسية، دون الاستنزاف في صراعات تولد العنف وتفقد الأمل.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-navy mb-6">فلسفتنا</h2>
          <div className="text-text-light leading-[2] space-y-4">
            <p>تحويل أفكار الخبرات الإنسانية المتنوعة للإصلاح والنهضة إلى حالة حوار إيجابي فعال، يطور القدرات ويفتح الآفاق ويسهل التعاون ويمهد لواقع جديد.</p>
            <p>ومن أجل ذلك تصبح عملية البحث في التجارب الإنسانية المتنوعة للإصلاح والنهضة هي عماد مهم، ويصبح تنوع الأفكار والتخصصات والقدرات عملا مهما لتحقيق أفضل استفادة مثلى من هذه التجارب.</p>
          </div>
          <h2 className="text-2xl font-extrabold text-navy mb-6 mt-12">رسالتنا</h2>
          <div className="text-text-light leading-[2] space-y-4">
            <p>نحن &quot;منظمة مجموعات التحفيز&quot; نعمل على توسيع دائرة الحوار الفعال وتحفيزه من المهتمين بالشأن العام، حول مشكلات مصر وأفريقيا والعالم العربي والشرق الأوسط.</p>
            <p>رسالتنا تحفيزية، وأدواتنا معرفية وبحثية، وطريقتنا حوارية اتصالية، وسياستنا تعتمد على التعاون مع التنوع.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-gray">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-coral mb-10">القيم</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div key={v} className="bg-white rounded-xl p-6 border border-border text-center">
                <div className="w-12 h-12 bg-coral/10 rounded-xl mx-auto mb-3 flex items-center justify-center text-coral text-xl">★</div>
                <p className="text-sm font-bold text-navy">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-bl from-navy to-navy-light text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-coral text-sm font-semibold mb-2">الجمهور والمناطق المستهدفة</p>
          <h2 className="text-3xl font-extrabold text-white mb-6">شباب الأمل وأفراد المجتمع المحتاج</h2>
          <p className="text-white/60 leading-relaxed">جمهورنا الأول هو الشباب المصري والعربي الراغب في خدمة بلاده والإسهام في الإصلاح والنهضة وتمكين الديمقراطية، حيث نركز على جمهورية مصر العربية، والمنطقة العربية، وأفريقيا والشرق الأوسط.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-coral text-sm font-semibold mb-2">فريقنا</p>
          <h2 className="text-3xl font-extrabold text-navy mb-4">القوة الدافعة للتغيير الإيجابي</h2>
          <p className="text-text-light mb-12 max-w-2xl mx-auto">نحن فريق متحمس وملهم، نعمل بروح الفريق الواحد لتحقيق رؤيتنا والتأثير الإيجابي في المجتمع.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="text-center">
                <Image src={m.image} alt={m.name} width={200} height={200} className="rounded-2xl mx-auto mb-4 bg-warm-gray" />
                <p className="font-bold text-navy text-sm">{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
