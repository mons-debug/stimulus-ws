import { prisma } from "@/lib/db";
import { ArticleEditor } from "@/components/dashboard/ArticleEditor";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const [categories, authors] = await Promise.all([
    prisma.category.findMany(),
    prisma.author.findMany({ select: { id: true, name: true } }),
  ]);

  return (
    <ArticleEditor
      article={{
        id: article.id,
        title: article.title,
        content: article.content,
        excerpt: article.excerpt || "",
        featuredImage: article.featuredImage || "",
        attachmentUrl: article.attachmentUrl || "",
        attachmentName: article.attachmentName || "",
        galleryImages: article.galleryImages || [],
        categoryId: article.categoryId || "",
        authorId: article.authorId || "",
        published: article.published,
      }}
      categories={categories}
      authors={authors}
    />
  );
}
