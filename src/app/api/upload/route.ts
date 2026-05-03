import { NextRequest, NextResponse } from "next/server";
import { saveFile } from "@/lib/storage";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const url = await saveFile(file);
        
        if (!url) {
            return NextResponse.json({ error: "Failed to save file to storage" }, { status: 500 });
        }

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
