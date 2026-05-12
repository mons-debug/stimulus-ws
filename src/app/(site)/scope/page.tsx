import Link from "next/link";
import type { Metadata } from "next";
import { GlobeSection } from "@/components/ui/GlobeSection";

export const metadata: Metadata = { title: "نطاق العمل" };
export const revalidate = 60;

export default function ScopePage() {
  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 text-center pt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">النطاق الجغرافي للعمل</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span>
            <span>نطاق العمل</span>
          </div>
        </div>
      </section>

      <GlobeSection />

      <section className="py-16 bg-gradient-to-bl from-navy to-navy-light text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-coral text-sm font-semibold mb-2">انضم إلينا</p>
          <h2 className="text-3xl font-extrabold text-white mb-6">كن جزءًا من رحلة التغيير الإيجابي</h2>
          <p className="text-white/60 leading-relaxed mb-8">
            نسعى دائمًا للتعاون مع الأفراد والمؤسسات الراغبة في المساهمة في الإصلاح والنهضة
          </p>
          <Link href="/contact" className="inline-block bg-coral text-white font-bold px-8 py-3 rounded-lg hover:bg-coral-hover transition-colors">
            تواصل معنا
          </Link>
        </div>
      </section>
    </>
  );
}
