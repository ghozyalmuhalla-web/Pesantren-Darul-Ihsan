import "server-only";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

export async function saveFile(file: File | null): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!file || file.size === 0) return { success: true, url: undefined };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    if (supabaseServiceKey === "[PASTE_SERVICE_ROLE_KEY_HERE]" || !supabaseServiceKey) {
        return { success: false, error: "Kunci Supabase (Service Role) belum diisi di Vercel." };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    // Optimize: resize + convert to WebP (Optional, skip if error)
    let buffer = rawBuffer;
    let contentType = file.type;
    // Sanitize filename: remove emojis and special chars
    const safeName = file.name
        .replace(/\.[^/.]+$/, "") // remove extension
        .replace(/[^\x00-\x7F]/g, "") // remove non-ascii (emojis)
        .replace(/[^a-zA-Z0-9.-]/g, "_") // replace others with underscore
        .replace(/_{2,}/g, "_"); // remove double underscores
    
    const extension = file.name.split('.').pop() || "";
    let finalFilename = `${Date.now()}-${safeName}.${extension}`;

    try {
        if (file.type.startsWith("image/")) {
            const processed = await sharp(rawBuffer)
                .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();
            
            if (processed) {
                buffer = Buffer.from(processed);
                contentType = "image/webp";
                finalFilename = `${Date.now()}-${safeName}.webp`;
            }
        }
    } catch (e) {
        console.warn("Sharp optimization failed:", e);
    }

    const bucket = "uploads";

    try {
        const { error } = await supabase.storage
            .from(bucket)
            .upload(finalFilename, buffer, {
                contentType: contentType,
                upsert: true,
            });

        if (error) {
            if (error.message.includes("bucket not found")) {
                const { error: createError } = await supabase.storage.createBucket(bucket, { public: true });
                if (createError) return { success: false, error: `Gagal membuat bucket: ${createError.message}` };
                
                const { error: retryError } = await supabase.storage.from(bucket).upload(finalFilename, buffer, { contentType, upsert: true });
                if (retryError) return { success: false, error: `Gagal upload ulang: ${retryError.message}` };
            } else {
                return { success: false, error: `Supabase Error: ${error.message}` };
            }
        }

        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(finalFilename);
        return { success: true, url: publicUrl };
    } catch (e: any) {
        return { success: false, error: `Koneksi Supabase Gagal: ${e.message}` };
    }
}
