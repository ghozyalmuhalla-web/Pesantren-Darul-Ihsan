import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    // Search by slug first, if not found, try by ID (for backward compatibility)
    let news = await prisma.news.findUnique({ where: { slug } });
    if (!news) {
        news = await prisma.news.findUnique({ where: { id: slug } });
    }

    if (!news) return { title: "Berita Tidak Ditemukan" };

    return {
        title: news.metaTitle || `${news.title} | MAS Pesantren Modern Darul Ihsan`,
        description: news.metaDescription || news.lead || news.excerpt || `${news.title} - Baca berita selengkapnya di MAS Pesantren Modern Darul Ihsan.`,
        keywords: news.tags || news.focusKeyword || "berita pesantren, darul ihsan, madrasah aliyah",
        openGraph: {
            title: news.metaTitle || news.title,
            description: news.metaDescription || news.lead || news.excerpt || undefined,
            images: news.imageUrl ? [news.imageUrl] : undefined,
        }
    };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    let news = await prisma.news.findUnique({ where: { slug } });
    if (!news) {
        news = await prisma.news.findUnique({ where: { id: slug } });
    }

    if (!news || news.status !== "published") notFound();

    const recentNews = await prisma.news.findMany({
        where: { 
            id: { not: news.id },
            status: "published"
        },
        take: 3,
        orderBy: { scheduledAt: 'desc' }
    });

    return (
        <main className="min-h-screen bg-slate-50 pb-32 pt-32 px-6">
            <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <Link href="/news" className="inline-flex items-center gap-2 text-secondary font-bold hover:underline mb-8 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 transition-transform hover:-translate-x-1">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Kembali ke Daftar Berita
                    </Link>

                    <article className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                        {/* Header/Hero of Article */}
                        <div className="p-8 md:p-12 pb-8 space-y-6">
                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider">
                                {news.category && (
                                    <span className="bg-primary-container text-white px-4 py-2 rounded-full">
                                        {news.category}
                                    </span>
                                )}
                                <div className="flex items-center gap-2 text-secondary">
                                    <span className="material-symbols-outlined text-base">calendar_today</span>
                                    {new Date(news.scheduledAt || news.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                </div>
                            </div>

                            <h1 className="font-h1 text-3xl md:text-5xl text-primary-container leading-[1.15]">{news.title}</h1>
                            
                            {news.lead && (
                                <p className="text-xl text-on-surface-variant font-serif italic leading-relaxed border-l-4 border-secondary pl-6 py-2">
                                    {news.lead}
                                </p>
                            )}
                        </div>

                        {/* Featured Image */}
                        {news.imageUrl && (
                            <div className="w-full relative bg-slate-100">
                                <img 
                                    src={news.imageUrl} 
                                    alt={news.imageAlt || news.title} 
                                    className="w-full max-h-[500px] object-cover" 
                                />
                                {news.imageCaption && (
                                    <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-white/90 text-xs py-4 px-10 text-center italic">
                                        {news.imageCaption}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Content Body */}
                        <div className="p-8 md:p-12 pt-12">
                            <div 
                                className="prose prose-lg prose-slate max-w-none prose-p:leading-relaxed prose-headings:text-primary-container prose-a:text-secondary hover:prose-a:text-blue-800 prose-img:rounded-3xl prose-img:shadow-xl"
                                dangerouslySetInnerHTML={{ __html: news.content }} 
                            />

                            {/* Share Buttons */}
                            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <p className="font-bold text-sm text-on-surface-variant uppercase tracking-widest">Bagikan:</p>
                                    <a 
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title + " " + (typeof window !== 'undefined' ? window.location.href : ""))}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                                    >
                                        <span className="material-symbols-outlined">send</span>
                                    </a>
                                    <a 
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : "")}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                                    >
                                        <span className="material-symbols-outlined">share</span>
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm italic">
                                    <span className="material-symbols-outlined text-base">person</span>
                                    Ditulis oleh: <span className="font-bold text-on-surface-variant">{news.author || "Admin Darul Ihsan"}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-10">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="font-bold text-xl text-primary-container mb-8 flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary">rss_feed</span>
                            Berita Terbaru
                        </h3>
                        <div className="space-y-8">
                            {recentNews.map((item) => (
                                <Link key={item.id} href={`/news/${item.slug || item.id}`} className="group block">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                                        <img src={item.imageUrl || "/images/hero-main.png"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
                                        {new Date(item.scheduledAt || item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                                    </p>
                                    <h4 className="font-bold text-primary-container group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                                        {item.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                        <Link href="/news" className="block mt-10 text-center py-4 rounded-2xl bg-slate-50 text-secondary font-bold hover:bg-secondary hover:text-white transition-all">
                            Semua Berita
                        </Link>
                    </div>

                    <div className="bg-primary-container text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-2xl font-bold mb-4 relative z-10">Pendaftaran Santri Baru</h3>
                        <p className="text-white/70 text-sm mb-8 relative z-10">Bergabunglah bersama keluarga besar MAS Darul Ihsan untuk masa depan yang lebih gemilang.</p>
                        <Link href="https://ppdb.darulihsan.sch.id" className="block text-center py-4 rounded-2xl bg-secondary text-white font-bold hover:bg-white hover:text-primary-container transition-all relative z-10 shadow-lg">
                            Daftar Sekarang
                        </Link>
                    </div>
                </aside>
            </div>
        </main>
    );
}
