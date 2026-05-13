import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const entries = Object.entries(body) as [string, string][];
    await Promise.all(
      entries.map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
