"use client";
import { useState } from "react";
import Link from "next/link";
import { deleteNews } from "@/app/actions/cms";

export default function NewsList({ initialNews }: { initialNews: any[] }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filtered = initialNews.filter(n => 
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        (n.category && n.category.toLowerCase().includes(search.toLowerCase()))
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-primary-container font-h2 tracking-tight">Article Repository</h1>
                    <p className="text-on-surface-variant text-sm mt-2 font-medium opacity-70">Total {initialNews.length} konten berita telah dipublikasikan.</p>
                </div>
                <Link href="/admin/news/create" className="flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-[24px] text-sm font-bold hover:bg-blue-900 transition-all shadow-xl shadow-secondary/20 active:scale-95 group">
                    <span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">add</span>
                    Tulis Berita Baru
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6">
                <div className="flex-1 flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 group focus-within:border-secondary transition-colors">
                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-secondary transition-colors">search</span>
                    <input 
                        type="text" 
                        placeholder="Cari judul berita atau kategori..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-primary-container placeholder:text-slate-300 placeholder:font-medium"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                {filtered.length === 0 ? (
                    <div className="p-32 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                            <span className="material-symbols-outlined text-4xl">newspaper</span>
                        </div>
                        <p className="font-black text-primary-container">No Articles Found</p>
                        <p className="text-xs text-on-surface-variant mt-2 font-medium">Try different keywords or create a new post.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                    <th className="py-6 px-10">Judul Berita & Status</th>
                                    <th className="py-6 px-10">Kategori</th>
                                    <th className="py-6 px-10">Tanggal Publish</th>
                                    <th className="py-6 px-10 text-right">Manajemen</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {displayed.map((news) => (
                                    <tr key={news.id} className="hover:bg-slate-50/30 transition-all group">
                                        <td className="py-6 px-10">
                                            <div className="max-w-md">
                                                <p className="font-black text-primary-container text-base group-hover:text-secondary transition-colors line-clamp-1">{news.title}</p>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{news.status || 'published'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-10">
                                            <span className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {news.category || "Umum"}
                                            </span>
                                        </td>
                                        <td className="py-6 px-10 text-xs font-bold text-on-surface-variant">
                                            {new Date(news.scheduledAt || news.createdAt).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </td>
                                        <td className="py-6 px-10 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link href={`/news/${news.slug || news.id}`} target="_blank" className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm" title="Lihat di Web">
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                </Link>
                                                <Link href={`/admin/news/${news.id}/edit`} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm" title="Edit Berita">
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </Link>
                                                <button 
                                                    onClick={async () => {
                                                        if (confirm("Hapus berita ini?")) {
                                                            await deleteNews(news.id);
                                                            window.location.reload();
                                                        }
                                                    }}
                                                    className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                                    title="Hapus Berita"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 disabled:opacity-30 shadow-sm hover:shadow-xl hover:-translate-x-1 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">west</span>
                    </button>
                    <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                        <span className="text-xs font-black text-secondary">Halaman {currentPage}</span>
                        <span className="text-xs font-bold text-slate-300">/</span>
                        <span className="text-xs font-black text-primary-container">{totalPages}</span>
                    </div>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 disabled:opacity-30 shadow-sm hover:shadow-xl hover:translate-x-1 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">east</span>
                    </button>
                </div>
            )}
        </div>
    );
}
