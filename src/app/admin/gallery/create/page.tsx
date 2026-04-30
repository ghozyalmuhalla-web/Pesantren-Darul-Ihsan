"use client";

import { useActionState } from "react";
import { createGallery } from "@/app/actions/cms";
import Link from "next/link";

export default function CreateGalleryPage() {
    const [state, formAction, pending] = useActionState(createGallery, null);

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

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl">
                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                            {state.error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">Judul Foto</label>
                        <input
                            name="title"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="Contoh: Kegiatan Memanah Santri"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">URL Gambar</label>
                        <input
                            name="imageUrl"
                            type="url"
                            required
                            className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary"
                            placeholder="https://..."
                        />
                        <p className="text-xs text-on-surface-variant mt-1">Masukkan URL link gambar dari internet (Google Drive, Imgur, dsb.)</p>
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
        </div>
    );
}
