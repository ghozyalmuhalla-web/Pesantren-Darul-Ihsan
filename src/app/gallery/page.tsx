import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function GalleryPage() {
    const items = await prisma.gallery.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-primary-container text-white py-24 px-6 text-center">
                <h1 className="font-h1 text-h1 mb-4">Galeri Aktivitas</h1>
                <p className="font-body-lg opacity-80 max-w-2xl mx-auto">
                    Melihat lebih dekat keseharian, momen berharga, dan semangat para santri di Pesantren Modern Darul Ihsan.
                </p>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 -mt-12">
                {items.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100">
                        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">photo_library</span>
                        <p className="text-on-surface-variant">Belum ada foto galeri.</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {items.map((item: any) => (
                            <div key={item.id} className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                                    <p className="text-white font-bold text-sm">{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <section className="mt-20 max-w-[800px] mx-auto px-6 text-center">
                <p className="text-on-surface-variant italic">
                    &quot;Pendidikan bukan hanya soal mengisi pikiran, tapi juga mengukir kenangan dan membentuk adab.&quot;
                </p>
            </section>
        </main>
    );
}
