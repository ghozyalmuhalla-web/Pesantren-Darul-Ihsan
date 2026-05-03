"use client";
import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    let greeting = "Selamat Malam";
    let icon = "nightlight";

    if (hours >= 5 && hours < 11) {
        greeting = "Selamat Pagi";
        icon = "wb_sunny";
    } else if (hours >= 11 && hours < 15) {
        greeting = "Selamat Siang";
        icon = "sunny";
    } else if (hours >= 15 && hours < 18) {
        greeting = "Selamat Sore";
        icon = "wb_twilight";
    }

    return (
        <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-2 text-secondary font-black tracking-widest uppercase text-[10px]">
                <span className="material-symbols-outlined text-sm">{icon}</span>
                {greeting}, Admin
            </div>
            <div className="text-2xl font-black text-primary-container tabular-nums">
                {time.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] font-bold text-slate-400">
                {time.toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
        </div>
    );
}
