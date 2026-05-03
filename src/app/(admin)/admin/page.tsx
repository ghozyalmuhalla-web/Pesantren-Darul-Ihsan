import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Counter from "@/components/admin/Counter";
import Clock from "@/components/admin/Clock";

export default async function AdminDashboard() {
    const newsCount = await prisma.news.count();
    const galleryCount = await prisma.gallery.count();
    const userCount = await prisma.user.count();
    const ppdbCount = await prisma.pendaftaran.count();

    const recentNews = await prisma.news.findMany({
        take: 5,
        orderBy: { createdAt: "desc" }
    });

    const recentGallery = await prisma.gallery.findMany({
        take: 4,
        orderBy: { createdAt: "desc" }
    });

    const stats = [
        { label: "Pendaftar PPDB", value: ppdbCount, icon: "how_to_reg", href: "/admin/pendaftaran", color: "text-emerald-600", bg: "bg-emerald-50", desc: "Calon santri baru" },
        { label: "Berita Aktif", value: newsCount, icon: "article", href: "/admin/news", color: "text-secondary", bg: "bg-blue-50", desc: "Konten dipublikasikan" },
        { label: "Foto Galeri", value: galleryCount, icon: "collections", href: "/admin/gallery", color: "text-amber-600", bg: "bg-amber-50", desc: "Aset visual sekolah" },
        { label: "User Admin", value: userCount, icon: "shield_person", href: "/admin/users", color: "text-indigo-600", bg: "bg-indigo-50", desc: "Pengelola sistem" },
    ];

    return (
        <div className="space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-primary-container font-h2 tracking-tight">Command Center</h1>
                    <p className="text-on-surface-variant text-base mt-2 font-medium opacity-70 italic">&quot;Membentuk masa depan Qur&apos;ani melalui manajemen digital yang unggul.&quot;</p>
                </div>
                <Clock />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 p-1 bg-slate-100/50 rounded-[48px]">
                <Link href="/admin/news/create" className="flex items-center justify-center gap-3 px-8 py-6 bg-secondary text-white rounded-[40px] text-sm font-bold hover:bg-blue-900 transition-all shadow-xl shadow-secondary/20 active:scale-95 group">
                    <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
                    Tulis Berita
                </Link>
                <Link href="/admin/gallery/create" className="flex items-center justify-center gap-3 px-8 py-6 bg-white border border-slate-200 text-on-surface-variant rounded-[40px] text-sm font-bold hover:bg-slate-50 transition-all active:scale-95 group shadow-sm">
                    <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">add_photo_alternate</span>
                    Upload Foto
                </Link>
                <Link href="/admin/pendaftaran" className="flex items-center justify-center gap-3 px-8 py-6 bg-white border border-slate-200 text-on-surface-variant rounded-[40px] text-sm font-bold hover:bg-slate-50 transition-all active:scale-95 group shadow-sm">
                    <span className="material-symbols-outlined text-2xl group-hover:bounce transition-all">how_to_reg</span>
                    Cek PPDB
                </Link>
                <Link href="/admin/settings" className="flex items-center justify-center gap-3 px-8 py-6 bg-white border border-slate-200 text-on-surface-variant rounded-[40px] text-sm font-bold hover:bg-slate-50 transition-all active:scale-95 group shadow-sm">
                    <span className="material-symbols-outlined text-2xl group-hover:rotate-45 transition-transform">settings</span>
                    Pengaturan
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <Link href={stat.href} key={stat.label} className="group relative">
                        <div className="absolute inset-0 bg-secondary/5 rounded-[40px] translate-y-3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.bg} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
                            <div className="flex items-start justify-between mb-6">
                                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-sm`}>
                                    <span className="material-symbols-outlined text-3xl font-bold">{stat.icon}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-200 group-hover:text-secondary transition-colors">arrow_outward</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-4xl font-black text-primary-container tracking-tight">
                                    <Counter value={stat.value} />
                                </p>
                                <p className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">{stat.label}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-2">{stat.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Recent News Activity */}
                <div className="lg:col-span-8 bg-white rounded-[48px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                    <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined font-bold">newspaper</span>
                            </div>
                            <h2 className="font-black text-xl text-primary-container tracking-tight">Recent Activity</h2>
                        </div>
                        <Link href="/admin/news" className="px-5 py-2 bg-slate-100 text-[10px] font-black text-on-surface-variant uppercase tracking-widest rounded-full hover:bg-secondary hover:text-white transition-all">Lihat Semua</Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentNews.length === 0 ? (
                            <div className="p-20 text-center text-slate-400">
                                <span className="material-symbols-outlined text-6xl opacity-10">edit_note</span>
                                <p className="mt-4 font-bold">Belum ada berita yang diterbitkan.</p>
                            </div>
                        ) : (
                            recentNews.map((news) => (
                                <Link key={news.id} href={`/admin/news/${news.id}/edit`} className="group flex items-center gap-8 p-8 hover:bg-slate-50/50 transition-all">
                                    <div className="relative w-24 h-20 rounded-[24px] overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                        <Image src={news.imageUrl || "/images/hero-main.png"} alt={news.title} fill className="object-cover" unoptimized />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Published</span>
                                        </div>
                                        <h3 className="font-black text-lg text-primary-container truncate group-hover:text-secondary transition-colors">{news.title}</h3>
                                        <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {new Date(news.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Gallery Quick Access */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white rounded-[48px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="font-black text-xl text-primary-container tracking-tight">Visual Assets</h2>
                            <Link href="/admin/gallery" className="text-[10px] font-black text-secondary uppercase tracking-widest hover:underline">Semua</Link>
                        </div>
                        <div className="p-8 grid grid-cols-2 gap-6">
                            {recentGallery.map((item) => (
                                <Link key={item.id} href={`/admin/gallery/${item.id}/edit`} className="group relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 shadow-sm border-4 border-white">
                                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-125 transition-transform duration-700" unoptimized />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                        <span className="material-symbols-outlined text-white text-xl">edit</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links / Server Health */}
                    <div className="bg-primary-container rounded-[48px] p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            System Status
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                                    <span>Database Health</span>
                                    <span className="text-emerald-400">99.9%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[2px]">
                                    <div className="bg-emerald-400 w-[99.9%] h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                                    <span>Server Load</span>
                                    <span className="text-secondary">Low</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[2px]">
                                    <div className="bg-secondary w-[12%] h-full rounded-full shadow-[0_0_10px_rgba(var(--secondary-rgb),0.5)]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Version</p>
                                <p className="text-sm font-black text-secondary mt-1">v2.1.0-darulihsan</p>
                            </div>
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-white/20">verified_user</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

