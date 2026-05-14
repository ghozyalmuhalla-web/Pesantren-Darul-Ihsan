import React from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "panel";
}

export default function GlassCard({ 
    children, 
    className = "", 
    variant = "default" 
}: GlassCardProps) {
    const baseClass = variant === "panel" ? "glass-panel" : "glass-card";
    
    return (
        <div className={`${baseClass} rounded-[40px] ${className}`}>
            {children}
        </div>
    );
}
