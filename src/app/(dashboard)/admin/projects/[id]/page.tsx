import { prisma } from "@/lib/db";
import { ProjectEditor } from "@/components/dashboard/ProjectEditor";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <ProjectEditor
      project={{
        id: project.id,
        title: project.title,
        description: project.description,
        content: project.content,
        partnerLogos: project.partnerLogos,
      }}
    />
  );
}
