import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(authors);
}

export async function POST(req: Request) {
  try {
    const { name, bio, imageUrl } = await req.json();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const slug = name.replace(/\s+/g, "-");
    const author = await prisma.author.create({ data: { name, slug, bio: bio || null, imageUrl: imageUrl || null } });
    return NextResponse.json(author);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, bio, imageUrl } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const author = await prisma.author.update({ where: { id }, data: { name, bio: bio || null, imageUrl: imageUrl || null } });
    return NextResponse.json(author);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.author.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
