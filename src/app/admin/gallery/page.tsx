import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteGallery } from "@/app/actions/cms";
import Image from "next/image";

export default async function GalleryAdmin() {
    const items = await prisma.gallery.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Manajemen Galeri</h1>
                    <p className="text-on-surface-variant text-sm mt-1">{items.length} foto tersimpan</p>
                </div>
                <Link href="/admin/gallery/create" className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Tambah Foto
                </Link>
            </div>

            {items.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">photo_library</span>
                    <p>Belum ada foto. Klik &quot;Tambah Foto&quot; untuk memulai.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
                            <div className="relative h-48">
                                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
                            </div>
                            <div className="p-4">
                                <p className="font-semibold text-on-surface text-sm truncate">{item.title}</p>
                                <div className="flex gap-2 mt-3">
                                    <form action={async () => { "use server"; await deleteGallery(item.id); }} className="flex-1">
                                        <button type="submit" className="w-full flex items-center justify-center gap-1 px-3 py-2 text-error border border-error rounded-lg hover:bg-red-50 transition-colors text-xs font-semibold">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
