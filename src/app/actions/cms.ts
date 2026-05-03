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
    } catch (e) {
        console.error(e);
        return { error: "Gagal menyimpan berita. Slug mungkin sudah digunakan." };
    }
    redirect("/admin/news");
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
    } catch (e) {
        console.error(e);
        return { error: "Gagal memperbarui berita. Slug mungkin sudah digunakan." };
    }
    redirect("/admin/news");
}

export async function deleteNews(id: string) {
    await prisma.news.delete({ where: { id } });
    revalidatePath("/admin/news");
}

export async function createGallery(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string || null;
    const event = formData.get("event") as string || null;
    
    const eventDateStr = formData.get("eventDate") as string;
    const eventDate = eventDateStr ? new Date(eventDateStr) : null;

    if (!title) return { error: "Judul foto wajib diisi." };

    const file = formData.get("image") as File;
    const imageUrl = await saveFile(file);
    if (!imageUrl) return { error: "Gambar wajib diunggah." };

    try {
        await prisma.gallery.create({ 
            data: { title, imageUrl, category, event, eventDate } 
        });
        revalidatePath("/admin/gallery");
    } catch (e) {
        console.error(e);
        return { error: "Gagal menyimpan foto galeri." };
    }
    redirect("/admin/gallery");
}

export async function updateGallery(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string || null;
    const event = formData.get("event") as string || null;
    
    const eventDateStr = formData.get("eventDate") as string;
    const eventDate = eventDateStr ? new Date(eventDateStr) : null;

    if (!title) return { error: "Judul foto wajib diisi." };

    const file = formData.get("image") as File;
    const newImageUrl = await saveFile(file);

    const dataToUpdate: any = { title, category, event, eventDate };
    if (newImageUrl) {
        dataToUpdate.imageUrl = newImageUrl;
    }

    try {
        await prisma.gallery.update({ 
            where: { id }, 
            data: dataToUpdate 
        });
        revalidatePath("/admin/gallery");
    } catch (e) {
        console.error(e);
        return { error: "Gagal memperbarui foto galeri." };
    }
    redirect("/admin/gallery");
}

export async function deleteGallery(id: string) {
    await prisma.gallery.delete({ where: { id } });
    revalidatePath("/admin/gallery");
}

import bcrypt from "bcryptjs";

export async function createUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Email dan password wajib diisi." };
    if (password.length < 6) return { error: "Password minimal 6 karakter." };

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        revalidatePath("/admin/users");
        return { success: "User berhasil ditambahkan." };
    } catch (e) {
        return { error: "Email sudah terdaftar." };
    }
}

export async function deleteUser(id: string) {
    const userCount = await prisma.user.count();
    if (userCount <= 1) return { error: "Tidak bisa menghapus user terakhir." };
    
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
}

export async function submitPendaftaran(prevState: any, formData: FormData) {
    const namaLengkap = formData.get("namaLengkap") as string;
    const tempatLahir = formData.get("tempatLahir") as string;
    const tanggalLahirStr = formData.get("tanggalLahir") as string;
    const jenisKelamin = formData.get("jenisKelamin") as string;
    const asalSekolah = formData.get("asalSekolah") as string;
    const namaAyah = formData.get("namaAyah") as string;
    const namaIbu = formData.get("namaIbu") as string;
    const nomorWhatsapp = formData.get("nomorWhatsapp") as string;
    const alamat = formData.get("alamat") as string;

    if (!namaLengkap || !tempatLahir || !tanggalLahirStr || !jenisKelamin || !asalSekolah || !namaAyah || !namaIbu || !nomorWhatsapp || !alamat) {
        return { error: "Semua kolom wajib diisi." };
    }

    try {
        await prisma.pendaftaran.create({
            data: {
                namaLengkap,
                tempatLahir,
                tanggalLahir: new Date(tanggalLahirStr),
                jenisKelamin,
                asalSekolah,
                namaAyah,
                namaIbu,
                nomorWhatsapp,
                alamat
            }
        });
        revalidatePath("/admin/pendaftaran");
        return { success: "Pendaftaran berhasil dikirim! Panitia akan menghubungi Anda melalui WhatsApp." };
    } catch (e) {
        console.error(e);
        return { error: "Gagal mengirim pendaftaran. Silakan coba lagi." };
    }
}

export async function updatePendaftaranStatus(id: string, status: string) {
    try {
        await prisma.pendaftaran.update({
            where: { id },
            data: { status }
        });
        revalidatePath("/admin/pendaftaran");
        return { success: "Status berhasil diperbarui." };
    } catch (e) {
        return { error: "Gagal memperbarui status." };
    }
}

export async function deletePendaftaran(id: string) {
    try {
        await prisma.pendaftaran.delete({ where: { id } });
        revalidatePath("/admin/pendaftaran");
        return { success: "Pendaftaran berhasil dihapus." };
    } catch (e) {
        return { error: "Gagal menghapus pendaftaran." };
    }
}
