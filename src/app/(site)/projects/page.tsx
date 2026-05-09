import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "مشروعاتنا" };
export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16"><div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">مشروعاتنا</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>&rsaquo;</span><span>مشروعاتنا</span>
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
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block bg-warm-gray rounded-2xl border-2 border-navy/10 p-8 hover:border-coral/30 hover:shadow-lg transition-all group">
                {project.partnerLogo && (
                  <div className="flex items-center justify-center gap-8 mb-6">
                    <Image src={project.partnerLogo} alt="Partner" width={200} height={80} className="h-16 w-auto object-contain" />
                    <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt="SGO" width={200} height={80} className="h-16 w-auto object-contain" />
                  </div>
                )}
                <p className="text-coral text-xs font-bold mb-1">مشروع</p>
                <h3 className="text-xl font-extrabold text-navy mb-3 group-hover:text-coral transition-colors">{project.title}</h3>
                <p className="text-text-light text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                <span className="text-coral font-semibold text-sm">إقرأ المزيد &larr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
