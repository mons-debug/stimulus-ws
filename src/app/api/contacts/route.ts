import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(contacts);
}

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { fullName, email, phone: phone || null, subject: subject || null, message },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
