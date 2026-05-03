"use client";
import { useState, useEffect } from "react";

export default function Counter({ value, duration = 1000 }: { value: number, duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) return;

        let totalMiliseconds = duration;
        let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;

        let timer = setInterval(() => {
            start += Math.ceil(end / (duration / incrementTime));
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
}
