"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselProps {
    images: string[] | string;
    className?: string;
    overlay?: boolean;
    autoPlay?: boolean;
    interval?: number;
    alt?: string;
    objectFit?: "cover" | "contain";
    brightness?: number;
    overlayOpacity?: number;
    fallback?: string;
    overlayTheme?: "dark" | "white-gradient";
}

export default function Carousel({ 
    images, 
    className = "", 
    overlay = true, 
    autoPlay = true, 
    interval = 5000,
    alt = "Carousel slide",
    objectFit = "cover",
    brightness = 100,
    overlayOpacity = 90,
    fallback = "/images/hero-main.webp",
    overlayTheme = "dark"
}: CarouselProps) {
    const getInitialList = () => {
        let list: string[] = [];
        if (Array.isArray(images)) {
            list = images;
        } else if (typeof images === 'string') {
            try {
                if (images.trim().startsWith("[")) {
                    list = JSON.parse(images);
                } else {
                    list = [images];
                }
            } catch (e) {
                list = [images];
            }
        }
        return list.filter(Boolean);
    };

    const [imageList, setImageList] = useState<string[]>(getInitialList);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setImageList(getInitialList());
    }, [images]);

    useEffect(() => {
        if (!autoPlay || imageList.length <= 1) return;
        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % imageList.length);
        }, interval);
        return () => clearInterval(timer);
    }, [imageList.length, autoPlay, interval]);

    if (imageList.length === 0) return null;

    const finalBrightness = overlayTheme === "white-gradient" ? Math.max(brightness, 100) : brightness;

    return (
        <div className={`overflow-hidden ${className} w-full h-full`}>
            <div className="w-full h-full relative">
                {imageList.map((src, i) => (
                    <div 
                        key={i} 
                        className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        style={{ filter: `brightness(${finalBrightness}%)` }}
                    >
                        <Image 
                            src={src} 
                            alt={alt} 
                            fill 
                            className={objectFit === "cover" ? "object-cover" : "object-contain"} 
                            unoptimized 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== fallback) {
                                    target.src = fallback;
                                } else {
                                    target.style.display = 'none';
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
            
            {overlay && (
                overlayTheme === "white-gradient" ? (
                    <div 
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{ opacity: overlayOpacity / 100 }}
                    >
                        {/* Soft white background blend to lift brightness (reduced to 5% for better image visibility) */}
                        <div className="absolute inset-0 bg-white/5"></div>
                        {/* Horizontal gradient focusing readability on the left text content (softened) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-white/70 to-transparent"></div>
                        {/* Vertical gradient focusing readability on the header navigation (softened top brightness) */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-transparent"></div>
                    </div>
                ) : (
                    <div 
                        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10 pointer-events-none"
                        style={{ opacity: overlayOpacity / 100 }}
                    ></div>
                )
            )}
            
            {/* Indicators */}
            {imageList.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 flex gap-2 z-20">
                    {imageList.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setIndex(i)}
                            className={`w-10 h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-secondary w-16" : "bg-white/40 hover:bg-white/60"}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
