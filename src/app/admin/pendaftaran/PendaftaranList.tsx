"use client";
import { useState } from "react";
import { updatePendaftaranStatus, deletePendaftaran } from "@/app/actions/cms";

export default function PendaftaranList({ initialList }: { initialList: any[] }) {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filtered = initialList.filter(item => {
        const matchesSearch = item.namaLengkap.toLowerCase().includes(search.toLowerCase()) || 
                             item.asalSekolah.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === "Semua" || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleStatusUpdate = async (id: string, status: string) => {
        if (confirm(`Ubah status menjadi ${status}?`)) {
            await updatePendaftaranStatus(id, status);
            window.location.reload();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Hapus data pendaftaran ini? Aksi ini tidak dapat dibatalkan.")) {
            await deletePendaftaran(id);
            window.location.reload();
        }
    };

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-primary-container font-h2 tracking-tight">Student Admissions</h1>
                    <p className="text-on-surface-variant text-sm mt-2 font-medium opacity-70">Total {initialList.length} pendaftaran masuk tahun ini.</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex items-center gap-4 w-full bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 group focus-within:border-secondary transition-colors">
                    <span className="material-symbols-outlined text-slate-400 group-focus-within:text-secondary transition-colors">search</span>
                    <input 
                        type="text" 
                        placeholder="Cari nama santri atau asal sekolah..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-primary-container placeholder:text-slate-300 placeholder:font-medium"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest whitespace-nowrap opacity-50">Filter Status:</span>
                    <select 
                        className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-black outline-none cursor-pointer focus:border-secondary transition-colors"
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="Semua">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden overflow-x-auto hover:shadow-2xl transition-shadow duration-500">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Submitted</th>
                            <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student Info</th>
                            <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Origin School</th>
                            <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                            <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Status</th>
                            <th className="text-right px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {displayed.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-8 py-32 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                        <span className="material-symbols-outlined text-4xl">person_search</span>
                                    </div>
                                    <p className="font-black text-primary-container">No Applications Found</p>
                                    <p className="text-xs text-on-surface-variant mt-2 font-medium">Try adjusting your search or filters.</p>
                                </td>
                            </tr>
                        ) : (
                            displayed.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-all group">
                                    <td className="px-8 py-6 text-xs font-black text-slate-400">
                                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-primary-container text-base group-hover:text-secondary transition-colors">{item.namaLengkap}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="material-symbols-outlined text-[10px] text-slate-300">cake</span>
                                            <p className="text-[10px] text-on-surface-variant font-bold">{item.tempatLahir}, {new Date(item.tanggalLahir).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-on-surface-variant">{item.asalSekolah}</td>
                                    <td className="px-8 py-6">
                                        <a href={`https://wa.me/${item.nomorWhatsapp.replace(/^0/, '62')}`} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">
                                            <span className="material-symbols-outlined text-sm font-bold">chat</span>
                                            WhatsApp
                                        </a>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${
                                            item.status === 'Diterima' ? 'bg-emerald-100 text-emerald-700' :
                                            item.status === 'Ditolak' ? 'bg-rose-100 text-rose-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex justify-end gap-2">
                                            <div className="relative group/menu">
                                                <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-2xl transition-all group-hover:shadow-sm">
                                                    <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                                                </button>
                                                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-2xl border border-slate-100 rounded-[24px] py-3 z-50 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all -translate-y-2 group-hover/menu:translate-y-0 duration-300">
                                                    <p className="px-5 py-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">Update Status</p>
                                                    <button onClick={() => handleStatusUpdate(item.id, 'Diterima')} className="w-full text-left px-5 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                                        Diterima
                                                    </button>
                                                    <button onClick={() => handleStatusUpdate(item.id, 'Ditolak')} className="w-full text-left px-5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-sm">cancel</span>
                                                        Ditolak
                                                    </button>
                                                    <button onClick={() => handleStatusUpdate(item.id, 'Pending')} className="w-full text-left px-5 py-2.5 text-xs font-bold text-amber-600 hover:bg-amber-50 flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                                        Pending
                                                    </button>
                                                    <div className="h-px bg-slate-50 my-2"></div>
                                                    <button onClick={() => handleDelete(item.id)} className="w-full text-left px-5 py-2.5 text-xs font-bold text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                        Hapus Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 disabled:opacity-30 shadow-sm hover:shadow-xl hover:-translate-x-1 transition-all"
                    >
                        <span className="material-symbols-outlined">west</span>
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
                        <span className="material-symbols-outlined">east</span>
                    </button>
                </div>
            )}
        </div>
    );
}
