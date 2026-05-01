import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Gagal mengambil pengaturan" }, { status: 500 });
    }
}
