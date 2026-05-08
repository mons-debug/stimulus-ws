import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "مشروعاتنا" };

const PROJECTS = [
  { title: "تعزيز الحوار الديمقراطي في مصر", hasNed: true },
  { title: "مجموعات التحفيز السياسي المصرية", hasNed: false },
  { title: "دور الدين في الحياة العامة والمشاركة الديمقراطية", hasNed: false },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">مشروعاتنا</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span><span>مشروعاتنا</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-navy mb-4 text-center">فهم الحاضر لقيادة المستقبل</h2>
          <p className="text-text-light leading-[2] text-center mb-16">
            تقدم &quot;منظمة مجموعات التحفيز SGO&quot; مشروعاتها إما بشكل ذاتي فقط أو بالتعاون مع منظمات دولية رسمية سواء أكانت حكومية أو غير حكومية.
          </p>

          <div className="space-y-8">
            {PROJECTS.map((project) => (
              <div key={project.title} className="bg-warm-gray rounded-2xl border-2 border-navy/10 p-8 hover:border-coral/30 hover:shadow-lg transition-all">
                {project.hasNed && (
                  <div className="flex items-center justify-center gap-8 mb-6">
                    <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/ned.jpg" alt="NED" width={200} height={80} className="h-16 w-auto object-contain" />
                    <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt="SGO" width={200} height={80} className="h-16 w-auto object-contain" />
                  </div>
                )}
                <p className="text-coral text-xs font-bold mb-1">مشروع</p>
                <h3 className="text-xl font-extrabold text-navy mb-4">{project.title}</h3>
                <Link href="#" className="text-coral font-semibold text-sm hover:underline">إقرأ المزيد ←</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
