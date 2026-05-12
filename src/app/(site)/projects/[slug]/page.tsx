import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug: decodeURIComponent(slug) } });
  return { title: project?.title || "مشروع" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug: decodeURIComponent(slug) } });
  if (!project) notFound();

  const otherProjects = await prisma.project.findMany({ where: { id: { not: project.id } }, orderBy: { sortOrder: "asc" } });

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16"><div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 text-center pt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>&rsaquo;</span>
            <Link href="/projects" className="hover:text-white">مشروعاتنا</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Partner logos boxes */}
          {project.partnerLogos && project.partnerLogos.length > 0 && (
            <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
              {project.partnerLogos.map((logo, i) => (
                <div key={i} className="bg-warm-gray border-2 border-border rounded-2xl p-6 min-w-[200px] flex items-center justify-center">
                  <Image src={logo} alt={`شريك ${i + 1}`} width={200} height={80} className="max-h-20 w-auto object-contain" />
                </div>
              ))}
            </div>
          )}

          {/* Project title + description */}
          <h2 className="text-2xl font-extrabold text-navy mb-6">{project.title}</h2>

          {/* Rich content */}
          {project.content ? (
            <div className="prose-arabic" dangerouslySetInnerHTML={{ __html: project.content }} />
          ) : (
            <p className="text-text-light leading-[2]">{project.description}</p>
          )}

          <div className="mt-12 flex gap-4">
            <Link href="/contact" className="inline-block bg-coral text-white font-bold px-8 py-3.5 rounded-xl hover:bg-coral-hover transition-colors">تواصل معنا</Link>
            <Link href="/projects" className="inline-block bg-navy text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-light transition-colors">جميع المشروعات</Link>
          </div>

          {/* Other projects */}
          {otherProjects.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h3 className="text-xl font-bold text-navy mb-6">مشروعات أخرى</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherProjects.map((p) => (
                  <Link key={p.id} href={`/projects/${p.slug}`} className="bg-warm-gray rounded-xl p-5 hover:shadow-md transition-all group">
                    <p className="text-coral text-xs font-bold mb-1">مشروع</p>
                    <p className="font-bold text-navy group-hover:text-coral transition-colors">{p.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
