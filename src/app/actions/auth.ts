"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

type LoginState = { error: string } | null;

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return { error: "Email dan password wajib diisi." };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "Email atau password salah." };

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { error: "Email atau password salah." };

    await createSession(user.id, user.email);
    redirect("/admin");
}

export async function logout() {
    await destroySession();
    redirect("/login");
}
