"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createNews(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) return { error: "Semua field wajib diisi." };
    await prisma.news.create({ data: { title, content } });
    revalidatePath("/admin/news");
    redirect("/admin/news");
}

export async function updateNews(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) return { error: "Semua field wajib diisi." };
    await prisma.news.update({ where: { id }, data: { title, content } });
    revalidatePath("/admin/news");
    redirect("/admin/news");
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
