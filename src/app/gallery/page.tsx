import prisma from "@/lib/prisma";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const selectedCategory = category || "Semua";

    // Fetch all unique categories that exist in DB
    const allItems = await prisma.gallery.findMany({
        select: { category: true }
    });
    
    const categoryCounts: Record<string, number> = {};
    allItems.forEach(item => {
        if (item.category) categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    const categories = ["Semua", ...Object.keys(categoryCounts)];

    // Fetch items based on selected category, ordered by eventDate DESC, then createdAt DESC
    const items = await prisma.gallery.findMany({
        where: selectedCategory === "Semua" ? undefined : { category: selectedCategory },
        orderBy: [
            { eventDate: "desc" },
            { createdAt: "desc" }
        ],
    });

    return (
        <main className="min-h-screen bg-slate-50 pb-20 pt-20">
            {/* Header */}
            <div className="bg-primary-container text-white py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                <div className="relative z-10">
                    <h1 className="font-h1 text-h1 mb-6">Galeri Aktivitas</h1>
                    <p className="font-body-lg opacity-80 max-w-2xl mx-auto italic">
                        &quot;Melihat lebih dekat keseharian, momen berharga, dan semangat para santri di Pesantren Modern Darul Ihsan.&quot;
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 -mt-10 relative z-20">
                {/* Category Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16 bg-white/80 backdrop-blur-md p-3 rounded-3xl shadow-xl border border-white/20 max-w-fit mx-auto">
                    {categories.map((cat: any) => (
                        <Link 
                            key={cat} 
                            href={cat === "Semua" ? "/gallery" : `/gallery?category=${encodeURIComponent(cat)}`}
                            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                                selectedCategory === cat 
                                ? "bg-secondary text-white shadow-lg scale-105" 
                                : "text-on-surface-variant hover:bg-slate-100"
                            }`}
                        >
                            {cat}
                            {cat !== "Semua" && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === cat ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>
                                    {categoryCounts[cat]}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-[40px] p-32 text-center shadow-sm border border-slate-100">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <span className="material-symbols-outlined text-5xl text-slate-200">photo_library</span>
                        </div>
                        <p className="text-xl font-bold text-primary-container mb-2">Belum ada foto</p>
                        <p className="text-on-surface-variant italic">Kategori ini belum memiliki koleksi foto saat ini.</p>
                    </div>
                ) : (
                    <GalleryGrid items={items} />
                )}
            </div>
        </main>
    );
}
