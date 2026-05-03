"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Home", href: "/", icon: "home" },
        { name: "Profil", href: "/profile", icon: "person" },
        { name: "Akademik", href: "/academic", icon: "school" },
        { name: "Fasilitas", href: "/fasilitas", icon: "business" },
        { name: "PPDB", href: "/ppdb", icon: "how_to_reg" },
        { name: "News", href: "/news", icon: "newspaper" },
        { name: "Galeri", href: "/gallery", icon: "photo_library" },
    ];

    const isHome = pathname === "/";

    return (
        <>
            <header 
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
                    isScrolled || !isHome 
                    ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm" 
                    : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl p-1.5 shadow-md group-hover:scale-105 transition-transform">
                            <Image src="/logo.png" alt="Logo Darul Ihsan" width={40} height={40} className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className={`text-sm md:text-base font-bold tracking-tight transition-colors ${isScrolled || !isHome ? "text-primary-container" : "text-primary-container md:text-blue-900"}`}>
                                MAS DARUL IHSAN
                            </h1>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 ${isScrolled || !isHome ? "text-secondary" : "text-secondary"}`}>
                                Modern Boarding School
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                                        isActive
                                        ? "bg-secondary/10 text-secondary"
                                        : isScrolled || !isHome 
                                            ? "text-on-surface-variant hover:bg-slate-100" 
                                            : "text-blue-900/70 hover:bg-white/20 hover:text-blue-900"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link href="/ppdb" className="hidden md:flex bg-secondary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95">
                            Daftar Sekarang
                        </Link>
                        
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-xl transition-colors ${isScrolled || !isHome ? "bg-slate-100 text-slate-900" : "bg-white/20 text-blue-900"}`}
                        >
                            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Slide-down Menu */}
                <div className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 transition-all duration-500 overflow-hidden ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                                    pathname === link.href 
                                    ? "bg-secondary/5 border-secondary/20 text-secondary" 
                                    : "bg-slate-50 border-slate-100 text-slate-600"
                                }`}
                            >
                                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                                <span className="text-xs font-bold uppercase tracking-wider">{link.name}</span>
                            </Link>
                        ))}
                        <Link 
                            href="/ppdb" 
                            className="col-span-2 bg-secondary text-white py-4 rounded-2xl font-bold text-center shadow-lg"
                        >
                            Informasi PPDB
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Bar (Alternative for quick access) */}
            <nav className="fixed bottom-4 left-4 right-4 z-50 flex justify-around items-center h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-white/20 shadow-2xl lg:hidden rounded-2xl overflow-hidden px-2">
                {links.slice(0, 5).map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-all rounded-xl ${
                                isActive
                                ? "text-secondary font-black scale-110"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                        >
                            <span className="material-symbols-outlined text-2xl" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {link.icon}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter mt-0.5">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
