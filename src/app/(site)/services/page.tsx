import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "خدماتنا" };

const SERVICES = [
  {
    label: "المجموعة الأولى",
    title: "البحوث والدراسات الأكاديمية",
    content: "وتتعلق بالبحوث والدراسات الأكاديمية وأوراق السياسات، من خلال فرق مجموعات التحفيز متعددة التخصصات والمجالات. تنطلق البحوث والدراسات من مواضيع حية تمس فئات واسعة من المواطنين، وتحظى باهتمام ونقاشات واسعة. توجه هذه البحوث والدراسات بمضمونها ولغتها إلى الجمهور العام المعني بهذه القضية.",
  },
  {
    label: "المجموعة الثانية",
    title: "تحفيز النقاشات المتعلقة بالقضايا المجتمعية والسياسية",
    content: "من خلال الندوات والحوارات وورش العمل والمناظرات والمقابلات، التي تركز على التحفيز الإيجابي في التفاعل مع القضايا المثارة المرتبطة بالمشكلات الاجتماعية والسياسية والاقتصادية والتنموية.",
  },
  {
    label: "المجموعة الثالثة",
    title: "تنمية مهارات المهتمين بالشأن العام وقدراتهم ومعارفهم",
    content: "عبر الدورات التدريبية القصيرة والمتوسطة وطويلة المدى، وعبر المحاضرات والورش والندوات الحوارية والكتابات التي تستهدف الشباب خصوصا، وتركز على الطابع العملي والتدريبي.",
  },
  {
    label: "المجموعة الرابعة",
    title: "نشر الوعي العام",
    content: "عبر الوسائط المختلفة فيما يتعلق بمقدمات تعريفية بالعلوم الاجتماعية والإنسانية، وما يرتبط منها بقضايا الشأن العام وحياة الناس اليومية. تسعى مجموعات التحفيز إلى تحفيز المحتوى الإيجابي الموثوق الذي يقدم وعيا علميا مواكبا لاحتياجات الواقع.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">خدماتنا</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span>
            <span>خدماتنا</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-coral mb-4">تقوم منظمة مجموعات التحفيز بأنشطة متعددة يمكن إجمالها تحت أربعة عناوين رئيسية</h2>
        </div>
      </section>

      {SERVICES.map((service, i) => (
        <section key={service.title} className={`py-16 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-coral text-sm font-bold mb-2">{service.label}</p>
            <h2 className="text-2xl font-extrabold text-navy mb-6">{service.title}</h2>
            <p className="text-text-light leading-[2]">{service.content}</p>
          </div>
        </section>
      ))}

      <section className="py-12 bg-white text-center">
        <Link href="/contact" className="inline-block bg-navy text-white font-bold px-8 py-3 rounded-lg hover:bg-navy-light transition-colors">تواصل معنا</Link>
      </section>

      <section className="py-16 bg-gradient-to-bl from-navy to-navy-light text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-coral text-sm font-semibold mb-2">الجمهور والمناطق المستهدفة</p>
          <h2 className="text-3xl font-extrabold text-white mb-6">شباب الأمل وأفراد المجتمع المحتاج</h2>
          <p className="text-white/60 leading-relaxed">جمهورنا الأول هو الشباب المصري والعربي الراغب في خدمة بلاده والإسهام في الإصلاح والنهضة وتمكين الديمقراطية.</p>
        </div>
      </section>
    </>
  );
}
