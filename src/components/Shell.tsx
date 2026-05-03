"use client";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

    return (
        <>
            {!isAdmin && <Navigation />}
            {children}
            {!isAdmin && <Footer />}
            {!isAdmin && <WhatsAppButton />}
        </>
    );
}
