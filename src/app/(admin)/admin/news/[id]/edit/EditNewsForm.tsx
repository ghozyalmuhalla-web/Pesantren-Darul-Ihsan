"use client";

import { useActionState } from "react";
import { updateNews } from "@/app/actions/cms";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

type News = {
    id: string; title: string; slug: string | null; lead: string | null; content: string;
    excerpt: string | null; imageUrl: string | null; imageCaption: string | null; imageAlt: string | null;
    category: string | null; tags: string | null; metaTitle: string | null; metaDescription: string | null;
    focusKeyword: string | null; author: string | null; status: string; scheduledAt: Date | null; embeds: string | null;
};

export default function EditNewsForm({ news }: { news: News }) {
    const [state, formAction, pending] = useActionState(updateNews, null);

    return (
        <div className="space-y-6 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/admin/news" className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Edit Berita</h1>
                    <p className="text-on-surface-variant text-sm">Perbarui konten artikel berita ini.</p>
                </div>
            </div>

            {state?.error && (
                <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                    {state.error}
                </div>
            )}

            <form action={formAction} encType="multipart/form-data" className="flex flex-col lg:flex-row gap-6">
                <input type="hidden" name="id" value={news.id} />
                
                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    {/* Form Sections */}

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                        {/* SECTION: CONTENT */}
                        <div className="space-y-6">
                            <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">edit_document</span>
                                Konten & Teks
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Judul Utama Berita (Headline) <span className="text-red-500">*</span></label>
                                    <input name="title" type="text" defaultValue={news.title} required className="w-full px-4 py-3 text-lg font-bold bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Paragraf Pembuka (Lead / Intro)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Alinea pertama yang merangkum 5W+1H.</p>
                                    <textarea name="lead" rows={3} defaultValue={news.lead || ""} className="w-full px-4 py-3 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary resize-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Isi Berita Lengkap <span className="text-red-500">*</span></label>
                                    <RichTextEditor name="content" defaultValue={news.content} />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Sisipkan Konten (Embeds)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Masukkan link YouTube, post Instagram, atau TikTok.</p>
                                    <input name="embeds" type="text" defaultValue={news.embeds || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>
                            </div>
                        </div>
                        {/* SECTION: MEDIA */}
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">perm_media</span>
                                Media & Foto
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Gambar Utama (Thumbnail)</label>
                                    {news.imageUrl && (
                                        <div className="mb-4">
                                            <p className="text-xs text-on-surface-variant mb-1">Gambar saat ini:</p>
                                            <img src={news.imageUrl} alt={news.imageAlt || "Thumbnail"} className="h-40 rounded-xl object-cover border border-slate-200" />
                                        </div>
                                    )}
                                    <input type="file" name="image" accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-blue-900 border border-slate-200 p-1 rounded-xl" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Keterangan Gambar (Caption)</label>
                                    <input name="imageCaption" type="text" defaultValue={news.imageCaption || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Alt Text Gambar (Untuk SEO)</label>
                                    <input name="imageAlt" type="text" defaultValue={news.imageAlt || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>
                            </div>
                        </div>
                        {/* SECTION: SEO & META */}
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                            <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                                SEO & Meta
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Judul SEO (Meta Title)</label>
                                    <input name="metaTitle" type="text" defaultValue={news.metaTitle || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Deskripsi SEO (Meta Description)</label>
                                    <textarea name="metaDescription" rows={3} defaultValue={news.metaDescription || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary resize-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Kata Kunci Fokus (Focus Keyword)</label>
                                    <input name="focusKeyword" type="text" defaultValue={news.focusKeyword || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Slug Kustom (URL)</label>
                                    <input name="slug" type="text" defaultValue={news.slug || ""} className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary font-mono" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sidebar: Publishing & Meta */}
                <div className="w-full lg:w-[350px] space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                        <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">publish</span>
                            Penerbitan
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Status</label>
                            <select name="status" defaultValue={news.status} className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary">
                                <option value="published">Terbit</option>
                                <option value="draft">Draf</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Jadwalkan Tayang</label>
                            <input name="scheduledAt" type="datetime-local" defaultValue={news.scheduledAt ? new Date(news.scheduledAt.getTime() - news.scheduledAt.getTimezoneOffset() * 60000).toISOString().slice(0,16) : ""} className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary" />
                        </div>

                        <button type="submit" disabled={pending} className="w-full py-3 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                            {pending ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
                            {pending ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                        <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">category</span>
                            Kategori & Tag
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Kategori Utama</label>
                            <select name="category" defaultValue={news.category || "Berita Utama"} className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary">
                                <option value="Berita Utama">Berita Utama</option>
                                <option value="Akademik">Akademik</option>
                                <option value="Kegiatan Santri">Kegiatan Santri</option>
                                <option value="Pengumuman">Pengumuman</option>
                                <option value="Prestasi">Prestasi</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Tag Terkait</label>
                            <input name="tags" type="text" defaultValue={news.tags || ""} placeholder="Pisahkan dengan koma..." className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Penulis (Author)</label>
                            <input name="author" type="text" defaultValue={news.author || "Admin Darul Ihsan"} className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
