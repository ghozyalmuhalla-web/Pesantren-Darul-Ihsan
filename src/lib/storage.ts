import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function saveFile(file: File | null): Promise<string | null> {
    if (!file || file.size === 0) return null;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const bucket = 'uploads';

    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (error) {
            console.error("Supabase Storage Error:", error);
            return null;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filename);

        return publicUrl;
    } catch (e) {
        console.error("Error saving file to Supabase:", e);
        return null;
    }
}
