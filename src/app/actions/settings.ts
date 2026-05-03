"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { saveFile } from "@/lib/storage";

async function upsertSetting(key: string, value: string) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
}

export async function saveSettings(prevState: any, formData: FormData) {
    try {
        // ── HOME ──
        const homeTextKeys = [
            "home_title", "home_tagline", "home_btn_ppdb_text", "home_btn_ppdb_url", "home_btn_curriculum_text",
            "home_visi_heading", "home_about",
            "home_accreditation_label", "home_accreditation_grade", "home_accreditation_inst",
            "home_npsn_label", "home_npsn_number", "home_npsn_status",
            "home_quote", "home_quote_author",
            "home_news_eyebrow", "home_news_heading", "home_news_link_text",
            "home_fasilitas_heading", "home_fasilitas_desc", "home_fasilitas_list",
            "home_mou_heading",
            "home_gallery_eyebrow", "home_gallery_heading", "home_gallery_link_text",
            "home_hero_brightness", "home_hero_overlay_opacity",
            "home_mou_images",
        ];
        const homeFileKeys = ["home_hero_image", "home_logo_kemenag", "home_logo_akreditasi", "home_about_image", "home_fasilitas_image", "home_mou_images"];

        // ── ACADEMIC ──
        const academicTextKeys = [
            "academic_header_title", "academic_header_desc",
            "academic_focus_1_title", "academic_focus_1_desc",
            "academic_focus_2_title", "academic_focus_2_desc",
            "academic_focus_3_title", "academic_focus_3_desc",
            "academic_focus_4_title", "academic_focus_4_desc",
            "academic_prog_1_title", "academic_prog_1_items",
            "academic_prog_2_title", "academic_prog_2_items",
            "academic_prog_3_title", "academic_prog_3_items",
            "academic_prog_4_title", "academic_prog_4_items",
            "academic_prog_5_title", "academic_prog_5_items",
            "academic_prog_6_title", "academic_prog_6_items",
            "academic_prog_7_title", "academic_prog_7_items",
            "academic_cta_title", "academic_cta_desc", "academic_cta_btn_text", "academic_cta_btn_url",
        ];

        // ── PROFILE ──
        const profileTextKeys = [
            "profile_header_title", "profile_header_tagline",
            "profile_tentang_title", "profile_tentang_p1", "profile_tentang_p2",
            "profile_visi_text", "profile_misi_items",
            "profile_prestasi_1_title", "profile_prestasi_1_items",
            "profile_prestasi_2_title", "profile_prestasi_2_items",
            "profile_prestasi_3_title", "profile_prestasi_3_items",
            "profile_prestasi_4_title", "profile_prestasi_4_items",
            "profile_prestasi_5_title", "profile_prestasi_5_items",
            "profile_asatidz_1_name", "profile_asatidz_1_role",
            "profile_asatidz_2_name", "profile_asatidz_2_role",
            "profile_asatidz_3_name", "profile_asatidz_3_role",
            "profile_asatidz_4_name", "profile_asatidz_4_role",
        ];
        const profileFileKeys = [
            "profile_tentang_image", "profile_struktur_image",
            "profile_prestasi_img_1", "profile_prestasi_img_2", "profile_prestasi_img_3", "profile_prestasi_img_4",
            "profile_asatidz_1_img", "profile_asatidz_2_img", "profile_asatidz_3_img", "profile_asatidz_4_img",
        ];

        // ── FOOTER ──
        const footerTextKeys = [
            "footer_school_name", "footer_address", "footer_email",
            "footer_instagram_url", "footer_instagram_label",
            "footer_tiktok_url", "footer_tiktok_label",
            "footer_copyright",
        ];

        // ── FASILITAS PAGE ──
        const fasilitasTextKeys = [
            "fasilitas_header_title", "fasilitas_header_desc",
            "fasilitas_section_title", "fasilitas_section_desc", "fasilitas_list",
            "fasilitas_programs_title",
            "fasilitas_prog_1_title", "fasilitas_prog_1_items",
            "fasilitas_prog_2_title", "fasilitas_prog_2_items",
            "fasilitas_prog_3_title", "fasilitas_prog_3_items",
            "fasilitas_prog_4_title", "fasilitas_prog_4_items",
            "fasilitas_prog_5_title", "fasilitas_prog_5_items",
            "fasilitas_prog_6_title", "fasilitas_prog_6_items",
            "fasilitas_prog_7_title", "fasilitas_prog_7_items",
        ];
        const fasilitasFileKeys = [
            "fasilitas_poster_1", "fasilitas_poster_2", "fasilitas_poster_3", "fasilitas_poster_4"
        ];

        // ── PPDB ──
        const ppdbTextKeys = [
            "ppdb_title", "ppdb_subtitle", "ppdb_syarat", "ppdb_wa_number", "ppdb_brosur_url"
        ];

        const allTextKeys = [...homeTextKeys, ...academicTextKeys, ...profileTextKeys, ...footerTextKeys, ...fasilitasTextKeys, ...ppdbTextKeys];
        const allFileKeys = [...homeFileKeys, ...profileFileKeys, ...fasilitasFileKeys];

        for (const key of allTextKeys) {
            const value = formData.get(key) as string;
            if (value !== null && value !== undefined) await upsertSetting(key, value);
        }
        // These keys support MULTIPLE images (carousel / gallery)
        const multiImageKeys = ["home_hero_image", "home_mou_images", "home_about_image", "home_fasilitas_image"];

        for (const key of allFileKeys) {
            const files = formData.getAll(key) as File[];
            const validFiles = files.filter(f => f && f.size > 0);
            const existingUrlsJson = formData.get(`${key}_existing`) as string;

            let existingUrls: string[] = [];
            try {
                if (existingUrlsJson) {
                    existingUrls = JSON.parse(existingUrlsJson);
                }
            } catch (e) {
                // ignore parse errors
            }

            // Upload new files
            const newUrls: string[] = [];
            for (const file of validFiles) {
                const result = await saveFile(file);
                if (result.success && result.url) newUrls.push(result.url);
            }

            if (multiImageKeys.includes(key)) {
                // Multi-image: keep existing (that weren't deleted) + add new
                const finalUrls = [...existingUrls, ...newUrls];
                if (finalUrls.length > 0) {
                    await upsertSetting(key, JSON.stringify(finalUrls));
                }
            } else {
                // Single-image: if new file uploaded → replace. Otherwise keep existing.
                if (newUrls.length > 0) {
                    await upsertSetting(key, newUrls[0]);
                } else if (existingUrls.length > 0) {
                    await upsertSetting(key, existingUrls[0]);
                }
            }
        }


        revalidatePath("/");
        revalidatePath("/academic");
        revalidatePath("/profile");
        revalidatePath("/fasilitas");
        revalidatePath("/admin/settings");
        return { success: "Semua pengaturan berhasil disimpan!" };
    } catch (error) {
        console.error("Failed to save settings:", error);
        return { error: "Terjadi kesalahan saat menyimpan." };
    }
}
