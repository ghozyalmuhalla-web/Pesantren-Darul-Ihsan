"use client";

import { useActionState, useState } from "react";
import { createGallery } from "@/app/actions/cms";
import Link from "next/link";

export default function CreateGalleryPage() {
    const [state, formAction, pending] = useActionState(createGallery, null);

    const [title, setTitle] = useState("");
    const [event, setEvent] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/gallery" className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Tambah Foto Galeri</h1>
                    <p className="text-on-surface-variant text-sm">Tambahkan foto baru ke galeri aktivitas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <form action={formAction} encType="multipart/form-data" className="space-y-6">
                        {state?.error && (
                            <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                                {state.error}
                            </div>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Judul Foto</label>
                                    <input
                                        name="title"
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="Contoh: Kegiatan Memanah Santri"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">File Gambar (Upload)</label>
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-blue-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Kategori (Opsional)</label>
                                    <select
                                        name="category"
                                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary"
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        <option value="Fasilitas">Fasilitas</option>
                                        <option value="Kegiatan Santri">Kegiatan Santri</option>
                                        <option value="Prestasi">Prestasi</option>
                                        <option value="Acara Tahunan">Acara Tahunan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Nama Acara / Event (Opsional)</label>
                                    <input
                                        name="event"
                                        type="text"
                                        value={event}
                                        onChange={(e) => setEvent(e.target.value)}
                                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary"
                                        placeholder="Contoh: Apel Tahunan 2026"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-on-surface-variant mb-2">Tanggal Acara (Opsional)</label>
                                    <input
                                        name="eventDate"
                                        type="datetime-local"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={pending} className="px-6 py-3 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50">
                                {pending ? "Menyimpan..." : "Simpan Foto"}
                            </button>
                            <Link href="/admin/gallery" className="px-6 py-3 bg-slate-100 text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-6">
                    <h3 className="font-bold border-b border-slate-100 pb-2 text-primary-container mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        Live Preview (Beranda)
                    </h3>
                    <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 flex-col gap-2">
                                <span className="material-symbols-outlined text-4xl">photo</span>
                                <span className="text-sm font-medium">Pilih gambar</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 flex items-end p-6">
                            <div>
                                <p className="text-white font-bold text-lg mb-1">{title || "Judul Foto"}</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {event && <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md">{event}</span>}
                                    {eventDate && <span className="bg-primary/80 backdrop-blur-sm text-white px-2 py-1 rounded-md">{new Date(eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric'})}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-4 text-center">Preview ini menampilkan bagaimana foto akan terlihat di halaman Beranda dan Galeri sesuai aspect ratio.</p>
                </div>
            </div>
        </div>
    );
}
