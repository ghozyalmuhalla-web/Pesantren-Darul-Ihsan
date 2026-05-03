"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function GalleryGrid({ items }: { items: any[] }) {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(12);

    const imagesForLightbox = items.map(item => ({
        url: item.imageUrl,
        title: item.title,
        category: item.category,
        date: item.eventDate || item.createdAt
    }));

    const visibleItems = items.slice(0, visibleCount);

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {visibleItems.map((item, idx) => (
                    <div 
                        key={item.id} 
                        onClick={() => setSelectedIdx(idx)}
                        className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500 bg-white cursor-zoom-in"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={500}
                            height={500}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-bold text-lg mb-1">{item.title}</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {item.category && <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md">{item.category}</span>}
                                    {item.eventDate && <span className="bg-primary/20 backdrop-blur-sm text-white px-2 py-1 rounded-md">{new Date(item.eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < items.length && (
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="px-10 py-4 bg-white border-2 border-slate-200 text-on-surface-variant rounded-full font-bold hover:border-secondary hover:text-secondary transition-all shadow-sm hover:shadow-lg active:scale-95"
                    >
                        Muat Lebih Banyak
                    </button>
                </div>
            )}

            {selectedIdx !== null && (
                <Lightbox 
                    images={imagesForLightbox} 
                    initialIndex={selectedIdx} 
                    onClose={() => setSelectedIdx(null)} 
                />
            )}
        </>
    );
}
