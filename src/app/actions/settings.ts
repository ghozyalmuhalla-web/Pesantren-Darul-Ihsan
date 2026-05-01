"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function saveFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
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
        // All text/textarea keys
        const textKeys = [
            // Hero
            "home_title",
            "home_tagline",
            "home_btn_ppdb_text",
            "home_btn_ppdb_url",
            "home_btn_curriculum_text",
            // Profile/Visi Misi
            "home_visi_heading",
            "home_about",
            "home_accreditation_label",
            "home_accreditation_grade",
            "home_accreditation_inst",
            "home_npsn_label",
            "home_npsn_number",
            "home_npsn_status",
            "home_quote",
            "home_quote_author",
            // Berita section
            "home_news_eyebrow",
            "home_news_heading",
            "home_news_link_text",
            // Fasilitas section
            "home_fasilitas_heading",
            "home_fasilitas_desc",
            "home_fasilitas_list",
            // MOU section
            "home_mou_heading",
            // Gallery section
            "home_gallery_eyebrow",
            "home_gallery_heading",
            "home_gallery_link_text",
        ];

        for (const key of textKeys) {
            const value = formData.get(key) as string;
            if (value !== null && value !== undefined) {
                await prisma.setting.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value }
                });
            }
        }

        // File upload keys
        const fileKeys = [
            "home_hero_image",
            "home_logo_kemenag",
            "home_logo_akreditasi",
            "home_about_image",
            "home_fasilitas_image",
            "home_mou_image_1",
            "home_mou_image_2",
            "home_mou_image_3",
        ];
        
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
