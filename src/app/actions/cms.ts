"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { saveFile } from "@/lib/storage";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

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

    if (file && file.size > 0 && !imageUrl) {
        return { error: "Gagal mengunggah gambar berita. Pastikan 'SUPABASE_SERVICE_ROLE_KEY' sudah benar di Vercel." };
    }

    try {
        await prisma.news.create({ 
            data: { 
                title, slug, lead, content, excerpt, 
                imageUrl, imageCaption, imageAlt, 
                category, tags, metaTitle, metaDescription, 
                focusKeyword, author, status, scheduledAt, embeds 
            } 
        });
    } catch (e: any) {
        console.error("Prisma Create Error:", e);
        return { error: `Gagal menyimpan berita: ${e.message || "Kesalahan database"}` };
    }
    
    revalidatePath("/admin/news");
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

    if (file && file.size > 0 && !newImageUrl) {
        return { error: "Gagal mengunggah gambar baru. Periksa konfigurasi Supabase Anda." };
    }

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
    } catch (e: any) {
        console.error("Prisma Update Error:", e);
        return { error: `Gagal memperbarui berita: ${e.message || "Kesalahan database"}` };
    }

    revalidatePath("/admin/news");
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
    if (!imageUrl) return { error: "Gagal mengunggah gambar. Pastikan 'SUPABASE_SERVICE_ROLE_KEY' sudah benar di Vercel." };

    try {
        await prisma.gallery.create({ 
            data: { title, imageUrl, category, event, eventDate } 
        });
    } catch (e: any) {
        console.error("Gallery Create Error:", e);
        return { error: `Gagal menyimpan foto galeri: ${e.message}` };
    }

    revalidatePath("/admin/gallery");
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
        
        // Build WA notification link for admin
        const adminWaSetting = await prisma.setting.findUnique({ where: { key: 'ppdb_wa_number' } });
        const adminWa = adminWaSetting?.value || '6281234567890';
        const waMessage = encodeURIComponent(
            `*[PPDB BARU]* Pendaftaran masuk!\n\nNama: ${namaLengkap}\nAsal Sekolah: ${asalSekolah}\nWA Ortu: ${nomorWhatsapp}\n\nSegera cek dashboard: /admin/pendaftaran`
        );
        const waLink = `https://wa.me/${adminWa}?text=${waMessage}`;
        
        return { 
            success: "Pendaftaran berhasil dikirim! Panitia akan menghubungi Anda melalui WhatsApp.",
            waLink 
        };
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

export async function changePassword(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session?.userId) return { error: "Sesi tidak valid." };

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) return { error: "Semua field wajib diisi." };
    if (newPassword.length < 6) return { error: "Password baru minimal 6 karakter." };
    if (newPassword !== confirmPassword) return { error: "Konfirmasi password tidak cocok." };

    const user = await prisma.user.findUnique({ where: { id: session.userId as string } });
    if (!user) return { error: "User tidak ditemukan." };

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return { error: "Password lama salah." };

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    return { success: "Password berhasil diperbarui!" };
}
