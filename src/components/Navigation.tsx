"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/", icon: "home" },
        { name: "Academic", href: "/academic", icon: "school" },
        { name: "Fasilitas", href: "/fasilitas", icon: "business" },
        { name: "News", href: "/news", icon: "newspaper" },
        { name: "Profile", href: "/profile", icon: "person" },
    ];

    return (
        <>
            <header className="sticky top-0 w-full flex justify-between items-center px-6 py-4 max-w-[1280px] mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Logo Darul Ihsan" width={48} height={48} className="object-contain" />
                    <h1 className="text-xl font-bold text-blue-900 dark:text-blue-50 tracking-tight font-serif">MAS Pesantren Modern Darul Ihsan</h1>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link: any) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-serif py-1 transition-colors ${isActive
                                    ? "text-blue-700 dark:text-blue-300 border-b-2 border-blue-700 font-bold"
                                    : "text-slate-600 dark:text-slate-400 font-medium hover:text-blue-700"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
                <button className="bg-blue-800 text-white px-5 py-2.5 rounded-full font-button text-sm hover:bg-blue-900 transition-all shadow-md">
                    PPDB Online
                </button>
            </header>

            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe pt-2 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_rgba(15,23,42,0.05)] md:hidden rounded-t-2xl">
                {links.map((link: any) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex flex-col items-center justify-center px-3 py-1 transition-all rounded-xl ${isActive
                                ? "text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50"
                                }`}
                        >
                            <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                {link.icon}
                            </span>
                            <span className="font-serif text-[10px] uppercase tracking-wider mt-1">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
