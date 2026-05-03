"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: "dashboard" },
    { label: "Pendaftaran", href: "/admin/pendaftaran", icon: "how_to_reg" },
    { label: "User", href: "/admin/users", icon: "group" },
    { label: "Berita", href: "/admin/news", icon: "newspaper" },
    { label: "Galeri", href: "/admin/gallery", icon: "photo_library" },
    { label: "Pengaturan Web", href: "/admin/settings", icon: "settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar on navigation
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 w-full h-18 bg-primary-container text-white flex items-center justify-between px-6 z-[60] shadow-xl backdrop-blur-md bg-opacity-90">
                <div className="flex items-center gap-3">
                    <div className="bg-white rounded-xl p-1.5 shadow-lg rotate-3">
                        <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
                    </div>
                    <span className="font-black text-xs tracking-[0.2em]">ADMIN PANEL</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <span className="material-symbols-outlined">{isSidebarOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-primary-container/40 z-[50] lg:hidden backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-[55] w-72 bg-primary-container text-white flex flex-col transition-all duration-500 ease-in-out border-r border-white/5
                ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
            `}>
                <div className="flex items-center gap-4 px-8 py-10">
                    <div className="relative w-12 h-12 bg-white rounded-2xl p-1.5 shadow-2xl shadow-blue-500/20 -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Image src="/logo.png" alt="Logo Darul Ihsan" width={40} height={40} className="object-contain" />
                    </div>
                    <div>
                        <p className="font-black text-lg leading-tight tracking-tight">DARUL IHSAN</p>
                        <p className="text-[10px] text-secondary font-black uppercase tracking-[0.3em] opacity-80">Command Center</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 px-2">Main Navigation</p>
                    {navItems.map((item) => {
                        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-500 relative overflow-hidden ${
                                    active 
                                    ? "bg-secondary text-white shadow-2xl shadow-secondary/40 translate-x-2" 
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {active && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>}
                                <span className={`material-symbols-outlined text-xl transition-all duration-500 ${active ? "scale-110" : "group-hover:scale-110"}`} style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                    {item.icon}
                                </span>
                                {item.label}
                                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
                            </Link>
                        );
                    })}
                    
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6 px-2">Public Access</p>
                        <Link 
                            href="/" 
                            target="_blank"
                            className="group flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">open_in_new</span>
                            View Live Website
                        </Link>
                    </div>
                </nav>

                <div className="p-6">
                    <div className="bg-black/20 rounded-[32px] p-2">
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-3xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all active:scale-95"
                            >
                                <span className="material-symbols-outlined text-xl">logout</span>
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 pt-20 lg:pt-0 min-h-screen">
                <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-12 animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
