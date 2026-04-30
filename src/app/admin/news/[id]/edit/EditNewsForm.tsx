"use client";

import { useActionState } from "react";
import { updateNews } from "@/app/actions/cms";
import Link from "next/link";

type News = { id: string; title: string; content: string };

export default function EditNewsForm({ news }: { news: News }) {
    const [state, formAction, pending] = useActionState(updateNews, null);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/news" className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Edit Berita</h1>
                    <p className="text-on-surface-variant text-sm">Perbarui konten artikel</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl">
                <form action={formAction} className="space-y-6">
                    <input type="hidden" name="id" value={news.id} />
                    {state?.error && (
                        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
                            {state.error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">Judul Berita</label>
                        <input name="title" type="text" required defaultValue={news.title} className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2">Isi Berita</label>
                        <textarea name="content" required rows={8} defaultValue={news.content} className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary resize-none" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={pending} className="px-6 py-3 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50">
                            {pending ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                        <Link href="/admin/news" className="px-6 py-3 bg-slate-100 text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
