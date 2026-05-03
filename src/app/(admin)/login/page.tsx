"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(login, null);

    return (
        <main className="min-h-screen flex items-center justify-center bg-surface-container-lowest">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
                <div className="text-center space-y-2 mb-8">
                    <span className="material-symbols-outlined text-4xl text-secondary">admin_panel_settings</span>
                    <h1 className="text-2xl font-bold text-primary-container font-h2">Admin Login</h1>
                    <p className="text-sm text-on-surface-variant">Masuk untuk mengelola konten website</p>
                </div>

                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center font-medium">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary text-sm outline-none"
                            placeholder="admin@darulihsan.sch.id"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-on-surface-variant mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary text-sm outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full py-4 bg-secondary text-white rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-md disabled:opacity-50"
                    >
                        {pending ? "Authenticating..." : "Login"}
                    </button>
                </form>
            </div>
        </main>
    );
}
