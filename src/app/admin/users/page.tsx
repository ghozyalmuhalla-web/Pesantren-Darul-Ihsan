import prisma from "@/lib/prisma";

export default async function UsersAdminPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Manajemen User</h1>
                    <p className="text-on-surface-variant text-sm">Daftar pengguna yang memiliki akses ke panel admin.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-sm font-semibold text-on-surface-variant">
                                <th className="py-4 px-6">ID</th>
                                <th className="py-4 px-6">Email</th>
                                <th className="py-4 px-6">Tanggal Dibuat</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{user.id}</td>
                                    <td className="py-4 px-6 font-medium text-primary-container">{user.email}</td>
                                    <td className="py-4 px-6 text-on-surface-variant">
                                        {new Date(user.createdAt).toLocaleDateString("id-ID", {
                                            day: "numeric", month: "long", year: "numeric",
                                            hour: "2-digit", minute: "2-digit"
                                        })}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="py-12 text-center text-on-surface-variant">
                                        Tidak ada data user.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
