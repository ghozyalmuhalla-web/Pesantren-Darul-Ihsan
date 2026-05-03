import "server-only";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function saveFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    // Optimize: resize + convert to WebP
    let buffer: Buffer;
    try {
        buffer = await sharp(rawBuffer)
            .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();
    } catch {
        // If sharp fails (e.g., not an image), use original
        buffer = rawBuffer;
    }

    const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-");
    const filename = `${Date.now()}-${baseName}.webp`;
    const bucket = "uploads";

    try {
        const { error } = await supabase.storage
            .from(bucket)
            .upload(filename, buffer, {
                contentType: "image/webp",
                upsert: true,
            });

        if (error) {
            console.error("Supabase Storage Error:", error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filename);

        return publicUrl;
    } catch (e) {
        console.error("Error saving file to Supabase:", e);
        return null;
    }
}
