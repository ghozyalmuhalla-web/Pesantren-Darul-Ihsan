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

    return (
        <main className="min-h-screen bg-slate-50 pb-20 pt-32 px-6">
            <div className="max-w-[800px] mx-auto">
                <Link href="/news" className="inline-flex items-center gap-2 text-secondary font-bold hover:underline mb-8 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Kembali ke Daftar Berita
                </Link>

                <article className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                    {/* Header/Hero of Article */}
                    <div className="p-10 pb-8 space-y-6">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider">
                            {news.category && (
                                <span className="bg-primary-container text-white px-3 py-1.5 rounded-full">
                                    {news.category}
                                </span>
                            )}
                            <div className="flex items-center gap-2 text-secondary">
                                <span className="material-symbols-outlined text-base">calendar_today</span>
                                {new Date(news.scheduledAt || news.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                            </div>
                            {news.author && (
                                <div className="flex items-center gap-2 text-slate-500">
                                    <span className="material-symbols-outlined text-base">person</span>
                                    {news.author}
                                </div>
                            )}
                        </div>

                        <h1 className="font-h1 text-4xl lg:text-5xl text-primary-container leading-[1.1]">{news.title}</h1>
                        
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
                                <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-white/90 text-sm py-3 px-10 text-center italic">
                                    {news.imageCaption}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content Body */}
                    <div className="p-10 pt-12">
                        <div 
                            className="prose prose-lg prose-slate max-w-none prose-headings:text-primary-container prose-a:text-secondary hover:prose-a:text-blue-800 prose-img:rounded-2xl prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: news.content }} 
                        />

                        {/* Embeds if any */}
                        {news.embeds && (
                            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <p className="text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider">Tautan Terkait / Media Eksternal</p>
                                <a href={news.embeds} target="_blank" rel="noopener noreferrer" className="text-secondary break-all hover:underline flex items-center gap-2">
                                    <span className="material-symbols-outlined">link</span>
                                    {news.embeds}
                                </a>
                            </div>
                        )}

                        {/* Tags */}
                        {news.tags && (
                            <div className="mt-12 pt-8 border-t border-slate-100">
                                <div className="flex flex-wrap gap-2">
                                    {news.tags.split(',').map((tag, idx) => (
                                        <span key={idx} className="bg-slate-100 text-on-surface-variant px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer">
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </main>
    );
}
