import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsList() {
    const newsItems = await prisma.news.findMany({
        where: { status: "published" },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-primary-container text-white py-24 px-6 text-center">
                <h1 className="font-h1 text-h1 mb-4">Berita & Informasi</h1>
                <p className="font-body-lg opacity-80 max-w-2xl mx-auto">
                    Ikuti perkembangan terbaru, prestasi santri, dan pengumuman resmi dari Madrasah Aliyah Swasta (MAS) Pesantren Modern Darul Ihsan.
                </p>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 -mt-12">
                {newsItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100 mt-12">
                        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">newspaper</span>
                        <p className="text-on-surface-variant font-medium">Belum ada berita untuk saat ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item: any) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.slug || item.id}`}
                                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                            >
                                {item.imageUrl && (
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {item.category && (
                                            <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="p-8 space-y-4 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-base">calendar_today</span>
                                        {new Date(item.scheduledAt || item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                        {item.author && (
                                            <>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-slate-500 capitalize">{item.author}</span>
                                            </>
                                        )}
                                    </div>
                                    <h2 className="font-h3 text-h3 text-primary-container group-hover:text-secondary transition-colors line-clamp-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-on-surface-variant line-clamp-3 text-sm leading-relaxed flex-1">
                                        {item.lead || item.excerpt || item.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..."}
                                    </p>
                                    <div className="pt-4 flex items-center gap-2 text-secondary font-bold text-sm mt-auto border-t border-slate-100">
                                        Baca Selengkapnya
                                        <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">trending_flat</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
