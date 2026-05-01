"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function saveFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    try {
        await mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        return `/uploads/${filename}`;
    } catch (e) {
        console.error("Error saving file:", e);
        return null;
    }
}

export async function saveHomeSettings(prevState: any, formData: FormData) {
    try {
        const keys = [
            "home_title",
            "home_tagline",
            "home_about",
            "home_accreditation_grade",
            "home_accreditation_inst",
            "home_npsn_number",
            "home_npsn_status",
            "home_quote",
            "home_quote_author"
        ];

        // Save text settings
        for (const key of keys) {
            const value = formData.get(key) as string;
            if (value !== null && value !== undefined) {
                await prisma.setting.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value }
                });
            }
        }

        // Handle File Uploads
        const fileKeys = ["home_hero_image", "home_logo_kemenag", "home_logo_akreditasi", "home_about_image"];
        
        for (const key of fileKeys) {
            const file = formData.get(key) as File;
            if (file && file.size > 0) {
                const url = await saveFile(file);
                if (url) {
                    await prisma.setting.upsert({
                        where: { key },
                        update: { value: url },
                        create: { key, value: url }
                    });
                }
            }
        }

        revalidatePath("/");
        revalidatePath("/admin/settings");
        return { success: "Pengaturan berhasil disimpan!" };
    } catch (error) {
        console.error("Failed to save settings:", error);
        return { error: "Terjadi kesalahan saat menyimpan pengaturan." };
    }
}
