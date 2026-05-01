"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
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
        await writeFile(path.join(uploadDir, filename), buffer);
        return `/uploads/${filename}`;
    } catch (e) {
        console.error("Error saving file:", e);
        return null;
    }
}

export async function createNews(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    if (!title || !content) return { error: "Judul dan isi berita wajib diisi." };

    const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const lead = formData.get("lead") as string || null;
    const excerpt = formData.get("excerpt") as string || null;
    const imageCaption = formData.get("imageCaption") as string || null;
    const imageAlt = formData.get("imageAlt") as string || null;
    const category = formData.get("category") as string || null;
    const tags = formData.get("tags") as string || null;
    const metaTitle = formData.get("metaTitle") as string || null;
    const metaDescription = formData.get("metaDescription") as string || null;
    const focusKeyword = formData.get("focusKeyword") as string || null;
    const author = formData.get("author") as string || null;
    const status = formData.get("status") as string || "published";
    const embeds = formData.get("embeds") as string || null;
    
    const scheduledAtStr = formData.get("scheduledAt") as string;
    const scheduledAt = scheduledAtStr ? new Date(scheduledAtStr) : null;

    const file = formData.get("image") as File;
    const imageUrl = await saveFile(file);

    try {
        await prisma.news.create({ 
            data: { 
                title, slug, lead, content, excerpt, 
                imageUrl, imageCaption, imageAlt, 
                category, tags, metaTitle, metaDescription, 
                focusKeyword, author, status, scheduledAt, embeds 
            } 
        });
        revalidatePath("/admin/news");
        redirect("/admin/news");
    } catch (e) {
        console.error(e);
        return { error: "Gagal menyimpan berita. Slug mungkin sudah digunakan." };
    }
}

export async function updateNews(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    if (!title || !content) return { error: "Judul dan isi berita wajib diisi." };

    const slug = formData.get("slug") as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const lead = formData.get("lead") as string || null;
    const excerpt = formData.get("excerpt") as string || null;
    const imageCaption = formData.get("imageCaption") as string || null;
    const imageAlt = formData.get("imageAlt") as string || null;
    const category = formData.get("category") as string || null;
    const tags = formData.get("tags") as string || null;
    const metaTitle = formData.get("metaTitle") as string || null;
    const metaDescription = formData.get("metaDescription") as string || null;
    const focusKeyword = formData.get("focusKeyword") as string || null;
    const author = formData.get("author") as string || null;
    const status = formData.get("status") as string || "published";
    const embeds = formData.get("embeds") as string || null;
    
    const scheduledAtStr = formData.get("scheduledAt") as string;
    const scheduledAt = scheduledAtStr ? new Date(scheduledAtStr) : null;

    const file = formData.get("image") as File;
    const newImageUrl = await saveFile(file);

    const dataToUpdate: any = {
        title, slug, lead, content, excerpt, 
        imageCaption, imageAlt, 
        category, tags, metaTitle, metaDescription, 
        focusKeyword, author, status, scheduledAt, embeds
    };

    if (newImageUrl) {
        dataToUpdate.imageUrl = newImageUrl;
    }

    try {
        await prisma.news.update({ 
            where: { id }, 
            data: dataToUpdate
        });
        revalidatePath("/admin/news");
        redirect("/admin/news");
    } catch (e) {
        console.error(e);
        return { error: "Gagal memperbarui berita. Slug mungkin sudah digunakan." };
    }
}

export async function deleteNews(id: string) {
    await prisma.news.delete({ where: { id } });
    revalidatePath("/admin/news");
}

export async function createGallery(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string;
    if (!title || !imageUrl) return { error: "Semua field wajib diisi." };
    await prisma.gallery.create({ data: { title, imageUrl } });
    revalidatePath("/admin/gallery");
    redirect("/admin/gallery");
}

export async function deleteGallery(id: string) {
    await prisma.gallery.delete({ where: { id } });
    revalidatePath("/admin/gallery");
}
