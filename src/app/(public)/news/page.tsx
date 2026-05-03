import prisma from "@/lib/prisma";
import Link from "next/link";

const PER_PAGE = 9;

export default async function NewsList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page: pageStr } = await searchParams;
    const page = Math.max(1, parseInt(pageStr || "1"));
    const skip = (page - 1) * PER_PAGE;

    const [newsItems, totalCount] = await Promise.all([
        prisma.news.findMany({
            where: { status: "published" },
            orderBy: { createdAt: "desc" },
            take: PER_PAGE,
            skip,
        }),
        prisma.news.count({ where: { status: "published" } }),
    ]);

    const totalPages = Math.ceil(totalCount / PER_PAGE);

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-primary-container text-white py-24 px-6 text-center">
                <h1 className="font-h1 text-h1 mb-4">Berita &amp; Informasi</h1>
                <p className="font-body-lg opacity-80 max-w-2xl mx-auto">
                    Ikuti perkembangan terbaru, prestasi santri, dan pengumuman resmi dari MAS Pesantren Modern Darul Ihsan.
                </p>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 -mt-12">
                {newsItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100 mt-12">
                        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">newspaper</span>
                        <p className="text-on-surface-variant font-medium">Belum ada berita untuk saat ini.</p>
                    </div>
                ) : (
                    <>
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-3 mt-16">
                                {page > 1 && (
                                    <Link
                                        href={`/news?page=${page - 1}`}
                                        className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-secondary font-bold hover:bg-secondary hover:text-white transition-all shadow-sm flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-base">arrow_back</span>
                                        Sebelumnya
                                    </Link>
                                )}
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <Link
                                            key={p}
                                            href={`/news?page=${p}`}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                                                p === page
                                                    ? "bg-secondary text-white shadow-lg"
                                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-secondary hover:text-white"
                                            }`}
                                        >
                                            {p}
                                        </Link>
                                    ))}
                                </div>
                                {page < totalPages && (
                                    <Link
                                        href={`/news?page=${page + 1}`}
                                        className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-secondary font-bold hover:bg-secondary hover:text-white transition-all shadow-sm flex items-center gap-2"
                                    >
                                        Berikutnya
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                )}
                            </div>
                        )}

                        <p className="text-center text-sm text-slate-400 mt-6">
                            Menampilkan {skip + 1}–{Math.min(skip + PER_PAGE, totalCount)} dari {totalCount} berita
                        </p>
                    </>
                )}
            </div>
        </main>
    );
}
