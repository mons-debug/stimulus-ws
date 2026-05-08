import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const { title, description, content, partnerLogos } = await req.json();
    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    const slug = title.replace(/\s+/g, "-").substring(0, 100);
    const project = await prisma.project.create({
      data: { title, slug, description: description || "", content: content || "", partnerLogos: partnerLogos || [] },
    });
    return NextResponse.json(project);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description, content, partnerLogos } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const project = await prisma.project.update({
      where: { id },
      data: { title, description, content: content || "", partnerLogos: partnerLogos || [] },
    });
    return NextResponse.json(project);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
