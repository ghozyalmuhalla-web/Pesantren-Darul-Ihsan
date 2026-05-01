"use client";

import { useActionState, useState } from "react";
import { createNews } from "@/app/actions/cms";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function CreateNewsPage() {
    const [state, formAction, pending] = useActionState(createNews, null);
    const [activeTab, setActiveTab] = useState("content"); // content, seo, media, publish

    return (
        <div className="space-y-6 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/admin/news" className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Tambah Berita Baru</h1>
                    <p className="text-on-surface-variant text-sm">Tulis artikel berita, pengumuman, atau kegiatan pesantren.</p>
                </div>
            </div>

            {state?.error && (
                <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                    {state.error}
                </div>
            )}

            <form action={formAction} className="flex flex-col lg:flex-row gap-6">
                
                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    {/* Tabs Navigation */}
                    <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        {[
                            { id: "content", label: "Konten & Teks", icon: "edit_document" },
                            { id: "media", label: "Media & Foto", icon: "perm_media" },
                            { id: "seo", label: "SEO & Meta", icon: "travel_explore" }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-colors ${
                                    activeTab === tab.id 
                                    ? "bg-secondary text-white" 
                                    : "bg-white text-on-surface-variant hover:bg-slate-50 border-r last:border-r-0 border-slate-200"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                        {/* TAB: CONTENT */}
                        <div className={activeTab === "content" ? "block" : "hidden"}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Judul Utama Berita (Headline) <span className="text-red-500">*</span></label>
                                    <input name="title" type="text" required placeholder="Contoh: Pembukaan Penerimaan Santri Baru 2026" className="w-full px-4 py-3 text-lg font-bold bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Paragraf Pembuka (Lead / Intro)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Alinea pertama yang merangkum 5W+1H untuk menarik pembaca.</p>
                                    <textarea name="lead" rows={3} placeholder="Tulis ringkasan singkat kejadian di sini..." className="w-full px-4 py-3 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary resize-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Isi Berita Lengkap <span className="text-red-500">*</span></label>
                                    <RichTextEditor name="content" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Sisipkan Konten (Embeds)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Masukkan link YouTube, post Instagram, atau TikTok untuk disematkan.</p>
                                    <input name="embeds" type="text" placeholder="https://youtube.com/..." className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>
                            </div>
                        </div>

                        {/* TAB: MEDIA */}
                        <div className={activeTab === "media" ? "block" : "hidden"}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Gambar Utama (Thumbnail)</label>
                                    <input type="file" name="image" accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-blue-900 border border-slate-200 p-1 rounded-xl" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Keterangan Gambar (Caption)</label>
                                    <input name="imageCaption" type="text" placeholder="Contoh: Santri sedang mengikuti ujian tahfidz." className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Alt Text Gambar (Untuk SEO)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Deskripsikan gambar untuk mesin pencari Google.</p>
                                    <input name="imageAlt" type="text" placeholder="Contoh: Suasana ujian tahfidz di masjid pesantren" className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>
                            </div>
                        </div>

                        {/* TAB: SEO & META */}
                        <div className={activeTab === "seo" ? "block" : "hidden"}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Judul SEO (Meta Title)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Judul yang akan muncul di hasil pencarian Google. Biarkan kosong jika sama dengan Judul Utama.</p>
                                    <input name="metaTitle" type="text" placeholder="Maksimal 60 karakter..." className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Deskripsi SEO (Meta Description)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Ringkasan artikel yang muncul di bawah judul di Google. Maksimal 160 karakter.</p>
                                    <textarea name="metaDescription" rows={3} placeholder="Tulis deskripsi meta di sini..." className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary resize-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Kata Kunci Fokus (Focus Keyword)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Kata kunci utama yang ditargetkan untuk artikel ini.</p>
                                    <input name="focusKeyword" type="text" placeholder="Contoh: pendaftaran pesantren 2026" className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-primary-container mb-2">Slug Kustom (URL)</label>
                                    <p className="text-xs text-on-surface-variant mb-2">Opsional. Jika dikosongkan, URL akan dibuat otomatis dari judul.</p>
                                    <input name="slug" type="text" placeholder="pendaftaran-santri-baru-2026" className="w-full px-4 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary font-mono" />
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
                            <select name="status" className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary">
                                <option value="published">Langsung Terbitkan</option>
                                <option value="draft">Simpan sebagai Draf</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Jadwalkan Tayang (Opsional)</label>
                            <input name="scheduledAt" type="datetime-local" className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary" />
                        </div>

                        <button type="submit" disabled={pending} className="w-full py-3 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2">
                            {pending ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : <span className="material-symbols-outlined text-[18px]">save</span>}
                            {pending ? "Menyimpan..." : "Simpan Berita"}
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                        <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">category</span>
                            Kategori & Tag
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Kategori Utama</label>
                            <select name="category" className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary">
                                <option value="Berita Utama">Berita Utama</option>
                                <option value="Akademik">Akademik</option>
                                <option value="Kegiatan Santri">Kegiatan Santri</option>
                                <option value="Pengumuman">Pengumuman</option>
                                <option value="Prestasi">Prestasi</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Tag Terkait</label>
                            <input name="tags" type="text" placeholder="Pisahkan dengan koma..." className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-on-surface-variant mb-2">Penulis (Author)</label>
                            <input name="author" type="text" placeholder="Nama Jurnalis/Editor" defaultValue="Admin Darul Ihsan" className="w-full px-3 py-2 text-sm bg-surface-container-low border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-secondary" />
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}
