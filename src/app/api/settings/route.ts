import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Gagal mengambil pengaturan" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        await prisma.setting.deleteMany();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Gagal mereset pengaturan" }, { status: 500 });
    }
}
