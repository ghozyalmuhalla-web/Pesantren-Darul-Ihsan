"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends ImageProps {
    fallback?: string;
}

export default function SafeImage({ src, fallback = "/images/hero-main.png", ...props }: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={() => {
                if (imgSrc !== fallback) {
                    setImgSrc(fallback);
                }
            }}
        />
    );
}
