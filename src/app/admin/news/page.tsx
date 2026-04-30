import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteNews } from "@/app/actions/cms";

export default async function NewsAdmin() {
    const newsList = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Manajemen Berita</h1>
                    <p className="text-on-surface-variant text-sm mt-1">{newsList.length} artikel tersimpan</p>
                </div>
                <Link href="/admin/news/create" className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Tambah Berita
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {newsList.length === 0 ? (
                    <div className="p-12 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-5xl mb-3 block opacity-40">newspaper</span>
                        <p>Belum ada berita. Klik &quot;Tambah Berita&quot; untuk memulai.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-on-surface-variant">Judul</th>
                                <th className="text-left px-6 py-4 font-semibold text-on-surface-variant hidden md:table-cell">Tanggal</th>
                                <th className="text-right px-6 py-4 font-semibold text-on-surface-variant">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsList.map((news: any) => (
                                <tr key={news.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-on-surface max-w-sm truncate">{news.title}</td>
                                    <td className="px-6 py-4 text-on-surface-variant hidden md:table-cell">
                                        {new Date(news.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/news/${news.id}/edit`} className="flex items-center gap-1 px-3 py-2 text-secondary border border-secondary rounded-lg hover:bg-blue-50 transition-colors text-xs font-semibold">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                                Edit
                                            </Link>
                                            <form action={async () => { "use server"; await deleteNews(news.id); }}>
                                                <button type="submit" className="flex items-center gap-1 px-3 py-2 text-error border border-error rounded-lg hover:bg-red-50 transition-colors text-xs font-semibold">
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                    Hapus
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
