import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({ include: { _count: { select: { articles: true } } } });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const slug = name.replace(/\s+/g, "-");
    const category = await prisma.category.create({ data: { name, slug } });
    return NextResponse.json(category);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
