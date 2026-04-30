import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
    const newsCount = await prisma.news.count();
    const galleryCount = await prisma.gallery.count();

    const stats = [
        { label: "Total Berita", value: newsCount, icon: "newspaper", href: "/admin/news", color: "text-secondary" },
        { label: "Total Galeri", value: galleryCount, icon: "photo_library", href: "/admin/gallery", color: "text-tertiary-fixed-dim" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-primary-container font-h2">Dashboard</h1>
                <p className="text-on-surface-variant text-sm mt-1">Selamat datang di panel admin Darul Ihsan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat) => (
                    <Link href={stat.href} key={stat.label}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-6">
                            <div className={`${stat.color} bg-slate-100 p-4 rounded-xl`}>
                                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-primary-container">{stat.value}</p>
                                <p className="text-sm text-on-surface-variant">{stat.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="font-bold text-on-surface mb-4">Aksi Cepat</h2>
                <div className="flex flex-wrap gap-4">
                    <Link href="/admin/news/create" className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Tambah Berita
                    </Link>
                    <Link href="/admin/gallery/create" className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-secondary text-secondary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors">
                        <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
                        Tambah Galeri
                    </Link>
                    <Link href="/" target="_blank" className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-on-surface-variant rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                        Lihat Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
