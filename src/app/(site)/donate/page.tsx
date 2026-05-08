import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "تبرع معنا" };

export default function DonatePage() {
  return (
    <>
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">تبرع معنا الآن</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>&rsaquo;</span><span>تبرع معنا</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-navy mb-4">ساهم في تحقيق التغيير الإيجابي</h2>
          <p className="text-xl text-navy/70 mb-6">اجعل تبرعك وتطوعك الآن فرصة للأمل والتغيير</p>
          <p className="text-text-light leading-relaxed mb-10">
            ندعوك للمشاركة في رحلتنا لتحقيق التغيير الإيجابي وتقديم المساهمة في بناء مجتمع أفضل. من خلال تبرعك ودعمك وتطوعك، يمكننا دعم الشباب والشابات وتطوير قدراتهم ومهاراتهم، وتقديم الفرص التي تحتاجها الأجيال القادمة لتحقيق طموحاتهم.
          </p>
          <div className="bg-warm-gray rounded-2xl p-8 border border-border mb-10">
            <p className="text-text-light text-sm">سيتم إضافة تفاصيل التبرع وطرق الدفع قريباً عبر لوحة التحكم</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-coral text-white font-bold px-8 py-3 rounded-lg hover:bg-coral-hover transition-colors">تواصل معنا</Link>
            <a href="https://wa.me/447506663561" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1da851] transition-colors">واتساب</a>
          </div>
        </div>
      </section>
    </>
  );
}
