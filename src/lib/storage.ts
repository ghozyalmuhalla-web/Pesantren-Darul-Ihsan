import "server-only";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function saveFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null;

    if (supabaseServiceKey === "[PASTE_SERVICE_ROLE_KEY_HERE]" || !supabaseServiceKey) {
        console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is not set or still using placeholder!");
        return null;
    }

    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    // Optimize: resize + convert to WebP (Optional, skip if error)
    let buffer = rawBuffer;
    let contentType = file.type;
    let finalFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    try {
        // Only try sharp if it's an image
        if (file.type.startsWith("image/")) {
            const processed = await sharp(rawBuffer)
                .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();
            
            if (processed) {
                buffer = processed;
                contentType = "image/webp";
                finalFilename = finalFilename.replace(/\.[^/.]+$/, "") + ".webp";
            }
        }
    } catch (e) {
        console.warn("Sharp optimization failed, saving original:", e);
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
            console.error("Supabase Storage Error:", error);
            return null;
        }

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(finalFilename);

        return publicUrl;
    } catch (e) {
        console.error("Error saving file to Supabase:", e);
        return null;
    }
}
