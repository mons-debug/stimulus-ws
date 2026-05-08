import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, excerpt, categoryId, authorId, featuredImage, attachmentUrl, attachmentName, galleryImages, published } = body;
    if (!title || !content) return NextResponse.json({ error: "Title and content required" }, { status: 400 });

    const slug = title.replace(/\s+/g, "-").replace(/[^؀-ۿa-zA-Z0-9-]/g, "").substring(0, 200);
    const article = await prisma.article.create({
      data: {
        title, slug, content, excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        attachmentUrl: attachmentUrl || null,
        attachmentName: attachmentName || null,
        galleryImages: galleryImages || [],
        categoryId: categoryId || null,
        authorId: authorId || null,
        published: published ?? false,
        publishedAt: published ? new Date() : null,
      },
    });
    return NextResponse.json(article);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, content, excerpt, categoryId, authorId, featuredImage, attachmentUrl, attachmentName, galleryImages, published } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const article = await prisma.article.update({
      where: { id },
      data: {
        title, content, excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        attachmentUrl: attachmentUrl || null,
        attachmentName: attachmentName || null,
        categoryId: categoryId || null,
        galleryImages: galleryImages || [],
        authorId: authorId || null,
        published: published ?? false,
        publishedAt: published ? new Date() : null,
      },
    });
    return NextResponse.json(article);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
