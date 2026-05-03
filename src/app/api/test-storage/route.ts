import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey === "[PASTE_SERVICE_ROLE_KEY_HERE]") {
        return NextResponse.json({ 
            error: "Environment variables missing or placeholder",
            url: supabaseUrl,
            keyLength: supabaseServiceKey?.length || 0,
            isPlaceholder: supabaseServiceKey === "[PASTE_SERVICE_ROLE_KEY_HERE]"
        });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    try {
        // Test 1: List Buckets
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        if (bucketError) {
            return NextResponse.json({ phase: "List Buckets", error: bucketError });
        }

        // Test 2: Check/Create 'uploads' bucket
        const bucketName = "uploads";
        const hasBucket = buckets.find(b => b.name === bucketName);
        
        if (!hasBucket) {
            const { error: createError } = await supabase.storage.createBucket(bucketName, { public: true });
            if (createError) return NextResponse.json({ phase: "Create Bucket", error: createError });
        }

        // Test 3: Try Upload dummy file
        const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(`test-${Date.now()}.txt`, "Hello World", { contentType: "text/plain" });

        if (uploadError) {
            return NextResponse.json({ phase: "Upload Test", error: uploadError });
        }

        return NextResponse.json({ success: true, message: "Storage is working perfectly!" });
    } catch (e: any) {
        return NextResponse.json({ error: "Exception caught", message: e.message });
    }
}
