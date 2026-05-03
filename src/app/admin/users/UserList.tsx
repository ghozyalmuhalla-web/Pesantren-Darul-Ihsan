"use client";
import { useActionState } from "react";
import { createUser, deleteUser } from "@/app/actions/cms";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button 
            type="submit" 
            disabled={pending}
            className="w-full md:w-auto px-6 py-3 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-all disabled:opacity-50 shadow-lg shadow-blue-900/10"
        >
            {pending ? "Menambahkan..." : "Tambah Admin"}
        </button>
    );
}

export default function UserList({ users }: { users: any[] }) {
    const [state, formAction] = useActionState(createUser, null);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold text-primary-container font-h2">Manajemen User</h1>
                <p className="text-on-surface-variant text-sm mt-1">Kelola hak akses administrator website Darul Ihsan.</p>
            </div>

            {/* Add User Form */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                <h2 className="text-lg font-bold text-primary-container mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">person_add</span>
                    Tambah Admin Baru
                </h2>
                <form action={formAction} className="grid md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Alamat Email</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            placeholder="admin@darulihsan.sch.id"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                        />
                    </div>
                    <SubmitButton />
                </form>
                {state?.error && <p className="mt-4 text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-lg">{state.error}</p>}
                {state?.success && <p className="mt-4 text-sm font-bold text-green-500 bg-green-50 px-4 py-2 rounded-lg">{state.success}</p>}
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <h2 className="font-bold text-primary-container">Daftar Administrator</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">
                                <th className="py-5 px-8">Email Admin</th>
                                <th className="py-5 px-8">Terdaftar Sejak</th>
                                <th className="py-5 px-8 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                {user.email[0].toUpperCase()}
                                            </div>
                                            <span className="font-bold text-primary-container">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8 text-sm text-on-surface-variant">
                                        {new Date(user.createdAt).toLocaleDateString("id-ID", {
                                            day: "numeric", month: "long", year: "numeric"
                                        })}
                                    </td>
                                    <td className="py-5 px-8 text-right">
                                        <button 
                                            onClick={async () => {
                                                if (confirm("Hapus user ini?")) {
                                                    await deleteUser(user.id);
                                                }
                                            }}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Hapus Admin"
                                        >
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
