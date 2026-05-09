import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const partners = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(partners);
}

export async function POST(req: Request) {
  try {
    const { name, logoUrl, country, website } = await req.json();
    if (!name || !country) return NextResponse.json({ error: "Name and country required" }, { status: 400 });
    const partner = await prisma.partner.create({ data: { name, logoUrl: logoUrl || null, country, website: website || null } });
    return NextResponse.json(partner);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, logoUrl, country, website } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const partner = await prisma.partner.update({ where: { id }, data: { name, logoUrl, country, website } });
    return NextResponse.json(partner);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.partner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
