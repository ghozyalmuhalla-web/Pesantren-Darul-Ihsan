"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LightboxProps {
    images: { url: string; title: string; category?: string; date?: string }[];
    initialIndex: number;
    onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
            if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [images.length, onClose]);

    const current = images[currentIndex];

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-10">
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white hover:text-secondary transition-colors z-[210] bg-white/10 p-3 rounded-full"
            >
                <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
                <button 
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 md:left-10 text-white hover:text-secondary transition-colors z-[210] bg-white/10 p-4 rounded-full hidden md:block"
                >
                    <span className="material-symbols-outlined text-4xl">chevron_left</span>
                </button>

                <div className="relative w-full h-full max-w-5xl max-h-[80vh] group">
                    <Image 
                        src={current.url} 
                        alt={current.title} 
                        fill 
                        className="object-contain" 
                        unoptimized
                    />
                </div>

                <button 
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 md:right-10 text-white hover:text-secondary transition-colors z-[210] bg-white/10 p-4 rounded-full hidden md:block"
                >
                    <span className="material-symbols-outlined text-4xl">chevron_right</span>
                </button>
            </div>

            <div className="mt-8 text-center text-white max-w-2xl">
                <p className="text-2xl font-bold mb-2">{current.title}</p>
                <div className="flex justify-center gap-4 text-sm text-white/60 font-bold uppercase tracking-widest">
                    <span>{current.category}</span>
                    {current.date && <span>• {new Date(current.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric'})}</span>}
                </div>
                <p className="mt-4 text-xs text-white/40">Gunakan panah keyboard untuk navigasi • ESC untuk menutup</p>
            </div>
        </div>
    );
}
