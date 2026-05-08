import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ProjectsListPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-navy">المشروعات</h1>
        <Link href="/admin/projects/new" className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm">+ مشروع جديد</Link>
      </div>
      <div className="space-y-4 max-w-3xl">
        {projects.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-6 border border-border flex items-center justify-between">
            <div>
              <p className="font-bold text-navy text-lg">{p.title}</p>
              <p className="text-text-light text-sm mt-1 line-clamp-1">{p.description}</p>
              {p.partnerLogos.length > 0 && <p className="text-xs text-coral mt-1">{p.partnerLogos.length} شريك</p>}
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href={`/admin/projects/${p.id}`} className="text-coral text-sm font-semibold hover:underline">تعديل</Link>
              <Link href={`/projects/${p.slug}`} target="_blank" className="text-navy text-sm font-semibold hover:underline">عرض</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
