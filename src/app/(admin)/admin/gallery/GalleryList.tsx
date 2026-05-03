"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteGallery } from "@/app/actions/cms";

export default function GalleryList({ initialItems }: { initialItems: any[] }) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filtered = initialItems.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(search.toLowerCase())) ||
        (item.event && item.event.toLowerCase().includes(search.toLowerCase()))
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const toggleSelect = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleBulkDelete = async () => {
        if (confirm(`Hapus ${selected.length} foto terpilih?`)) {
            for (const id of selected) {
                await deleteGallery(id);
            }
            window.location.reload();
        }
    };

    return (
        <div className="space-y-10 animate-fade-in pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-black text-primary-container font-h2 tracking-tight">Visual Library</h1>
                    <p className="text-on-surface-variant text-sm mt-2 font-medium opacity-70">Total {initialItems.length} aset foto dalam repositori sekolah.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {selected.length > 0 && (
                        <button 
                            onClick={handleBulkDelete}
                            className="flex items-center gap-3 px-8 py-4 bg-rose-50 text-rose-600 rounded-[24px] text-sm font-bold hover:bg-rose-600 hover:text-white transition-all shadow-xl shadow-rose-900/10 active:scale-95 group"
                        >
                            <span className="material-symbols-outlined text-xl group-hover:animate-bounce">delete_sweep</span>
                            Hapus ({selected.length})
                        </button>
                    )}
                    <Link href="/admin/gallery/create" className="flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-[24px] text-sm font-bold hover:bg-blue-900 transition-all shadow-xl shadow-secondary/20 active:scale-95 group">
                        <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">add_a_photo</span>
                        Tambah Foto
                    </Link>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex items-center gap-4 w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 group focus-within:border-secondary transition-colors">
                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-secondary transition-colors">search</span>
                    <input 
                        type="text" 
                        placeholder="Cari judul, kategori, atau nama acara..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-primary-container placeholder:text-slate-300 placeholder:font-medium"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                {filtered.length > 0 && (
                    <button 
                        onClick={() => setSelected(selected.length === displayed.length ? [] : displayed.map(i => i.id))}
                        className="text-[10px] font-black text-secondary uppercase tracking-widest hover:underline px-6 whitespace-nowrap"
                    >
                        {selected.length === displayed.length ? "Batal Pilih" : "Pilih Halaman Ini"}
                    </button>
                )}
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 p-32 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                        <span className="material-symbols-outlined text-4xl">photo_library</span>
                    </div>
                    <p className="font-black text-primary-container">Empty Collection</p>
                    <p className="text-xs text-on-surface-variant mt-2 font-medium">Try different keywords or upload a new photo.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {displayed.map((item) => {
                        const isSelected = selected.includes(item.id);
                        return (
                            <div 
                                key={item.id} 
                                className={`relative bg-white rounded-[40px] shadow-sm border transition-all duration-500 overflow-hidden group ${
                                    isSelected ? "border-secondary ring-4 ring-secondary/10 scale-[0.97]" : "border-slate-100 hover:shadow-2xl hover:-translate-y-2"
                                }`}
                            >
                                <div 
                                    className="relative aspect-[4/5] cursor-pointer overflow-hidden"
                                    onClick={() => toggleSelect(item.id)}
                                >
                                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                                    
                                    {/* Selection Overlay */}
                                    <div className={`absolute top-6 left-6 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                                        isSelected ? "bg-secondary border-secondary shadow-lg scale-110" : "bg-black/20 border-white/50 backdrop-blur-md opacity-0 group-hover:opacity-100"
                                    }`}>
                                        {isSelected && <span className="material-symbols-outlined text-white text-sm font-black">check</span>}
                                    </div>

                                    {/* Action Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-8">
                                        <Link href={`/admin/gallery/${item.id}/edit`} className="w-full py-4 rounded-[20px] bg-white text-primary-container text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                            Edit Asset
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                                        <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em]">{item.category || "General"}</p>
                                    </div>
                                    <p className="font-black text-primary-container text-base group-hover:text-secondary transition-colors line-clamp-2 leading-tight">{item.title}</p>
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <span className="material-symbols-outlined text-sm">calendar_today</span>
                                            <span className="text-[10px] font-bold">2024</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-200">#{item.id.slice(-4)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-16">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="w-16 h-16 flex items-center justify-center rounded-[24px] bg-white border border-slate-100 disabled:opacity-30 shadow-sm hover:shadow-2xl hover:-translate-x-1 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">west</span>
                    </button>
                    <div className="flex gap-3">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button 
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-16 h-16 rounded-[24px] text-sm font-black transition-all ${
                                    currentPage === p ? "bg-secondary text-white shadow-2xl shadow-secondary/40 scale-110" : "bg-white text-on-surface-variant hover:bg-slate-50 border border-slate-100"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="w-16 h-16 flex items-center justify-center rounded-[24px] bg-white border border-slate-100 disabled:opacity-30 shadow-sm hover:shadow-2xl hover:translate-x-1 transition-all"
                    >
                        <span className="material-symbols-outlined text-2xl">east</span>
                    </button>
                </div>
            )}
        </div>
    );
}
