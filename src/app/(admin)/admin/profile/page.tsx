"use client";
import { useState, useActionState } from "react";
import { changePassword } from "@/app/actions/cms";
import Link from "next/link";
import GlassCard from "@/components/admin/GlassCard";

export default function AdminProfilePage() {
    const [state, formAction, pending] = useActionState(changePassword, null);

    return (
        <div className="space-y-10 max-w-2xl pb-20">
            <div>
                <h1 className="text-4xl font-black text-white font-h2 tracking-tight drop-shadow-lg">Keamanan Akun</h1>
                <p className="text-white/70 mt-2 font-medium">Ubah password akun admin Anda untuk menjaga keamanan.</p>
            </div>

            {state?.success && (
                <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 border border-emerald-100">
                    <span className="material-symbols-outlined">check_circle</span>
                    {state.success}
                </div>
            )}
            {state?.error && (
                <div className="bg-rose-50 text-rose-700 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 border border-rose-100">
                    <span className="material-symbols-outlined">error</span>
                    {state.error}
                </div>
            )}

            <GlassCard variant="panel" className="p-8 space-y-6">
                <h2 className="text-sm font-black text-primary-container border-b border-black/5 pb-3 uppercase tracking-widest">Ganti Password</h2>
                <form action={formAction} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-2">Password Lama</label>
                        <input
                            type="password"
                            name="currentPassword"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary outline-none"
                            placeholder="Masukkan password lama"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-2">Password Baru</label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary outline-none"
                            placeholder="Minimal 6 karakter"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-on-surface-variant mb-2">Konfirmasi Password Baru</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-secondary outline-none"
                            placeholder="Ulangi password baru"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full py-4 bg-secondary text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">{pending ? "progress_activity" : "lock_reset"}</span>
                        {pending ? "Menyimpan..." : "Simpan Password Baru"}
                    </button>
                </form>
            </GlassCard>
        </div>
    );
}
