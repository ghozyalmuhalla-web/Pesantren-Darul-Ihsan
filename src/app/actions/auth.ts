"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type LoginState = { error: string } | null;

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    
    // Check rate limit
    const now = Date.now();
    const attempt = loginAttempts.get(ip);
    if (attempt) {
        if (attempt.count >= MAX_ATTEMPTS && (now - attempt.lastAttempt) < BLOCK_DURATION_MS) {
            const minutesLeft = Math.ceil((BLOCK_DURATION_MS - (now - attempt.lastAttempt)) / 60000);
            return { error: `Terlalu banyak percobaan login. Coba lagi dalam ${minutesLeft} menit.` };
        }
        if ((now - attempt.lastAttempt) >= BLOCK_DURATION_MS) {
            loginAttempts.delete(ip);
        }
    }
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Email dan password wajib diisi." };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        // Track failed attempt
        const cur = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
        loginAttempts.set(ip, { count: cur.count + 1, lastAttempt: now });
        return { error: "Email atau password salah." };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        const cur = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
        loginAttempts.set(ip, { count: cur.count + 1, lastAttempt: now });
        return { error: "Email atau password salah." };
    }

    // Success — clear rate limit
    loginAttempts.delete(ip);
    await createSession(user.id, user.email);
    redirect("/admin");
}

export async function logout() {
    await destroySession();
    redirect("/login");
}
