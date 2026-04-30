import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) notFound();

    return (
        <main className="min-h-screen bg-white pb-20 pt-32 px-6">
            <div className="max-w-[800px] mx-auto">
                <Link href="/news" className="inline-flex items-center gap-2 text-secondary font-bold hover:underline mb-8">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Kembali ke Berita
                </Link>

                <article className="space-y-8">
                    <header className="space-y-6">
                        <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            {new Date(news.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                        <h1 className="font-h1 text-h1 text-primary-container leading-tight">{news.title}</h1>
                    </header>

                    <hr className="border-slate-100" />

                    <div className="prose prose-slate max-w-none prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:text-lg">
                        {news.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && <p key={index} className="mb-6">{paragraph}</p>
                        ))}
                    </div>
                </article>

                <section className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                    <h3 className="font-bold text-primary-container mb-2">Informasi Penting</h3>
                    <p className="text-on-surface-variant text-sm">
                        Artikel ini diterbitkan secara resmi oleh bagian Humas MAS Pesantren Modern Darul Ihsan. Untuk konfirmasi lebih lanjut, silakan hubungi administrasi pesantren.
                    </p>
                </section>
            </div>
        </main>
    );
}
