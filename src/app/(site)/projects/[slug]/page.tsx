import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

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
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>&rsaquo;</span>
            <Link href="/projects" className="hover:text-white">مشروعاتنا</Link>
            <span>&rsaquo;</span>
            <span>{project.title}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {project.partnerLogo && (
            <div className="flex items-center justify-center gap-8 mb-10">
              <Image src={project.partnerLogo} alt="Partner" width={250} height={100} className="h-20 w-auto object-contain" />
              <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt="SGO" width={250} height={100} className="h-20 w-auto object-contain" />
            </div>
          )}

          <h2 className="text-2xl font-extrabold text-navy mb-6">{project.title}</h2>
          <div className="prose-arabic" dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, "<br/>") }} />

          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-block bg-coral text-white font-bold px-8 py-3.5 rounded-xl hover:bg-coral-hover transition-colors">تواصل معنا</Link>
          </div>

          {otherProjects.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h3 className="text-xl font-bold text-navy mb-6">مشروعات أخرى</h3>
              <div className="space-y-4">
                {otherProjects.map((p) => (
                  <Link key={p.id} href={`/projects/${p.slug}`} className="block bg-warm-gray rounded-xl p-5 hover:shadow-md transition-all group">
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
