import { prisma } from "@/lib/db";
import { ArticleEditor } from "@/components/dashboard/ArticleEditor";

export default async function NewArticlePage() {
  const [categories, authors] = await Promise.all([
    prisma.category.findMany(),
    prisma.author.findMany({ select: { id: true, name: true } }),
  ]);
  return <ArticleEditor categories={categories} authors={authors} />;
}
