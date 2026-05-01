"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: "dashboard" },
    { label: "User", href: "/admin/users", icon: "group" },
    { label: "Berita", href: "/admin/news", icon: "newspaper" },
    { label: "Galeri", href: "/admin/gallery", icon: "photo_library" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-container text-white flex flex-col fixed inset-y-0 left-0 z-40">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <span className="material-symbols-outlined text-2xl text-tertiary-fixed-dim">admin_panel_settings</span>
                    <div>
                        <p className="font-bold text-sm leading-tight">Panel Admin</p>
                        <p className="text-[11px] text-on-primary-container">Darul Ihsan CMS</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-1 p-4 flex-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? "bg-white/20 text-white" : "text-on-primary-container hover:bg-white/10"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <form action={logout}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-on-primary-container hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">logout</span>
                            Keluar
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
