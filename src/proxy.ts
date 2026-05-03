import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path.startsWith("/admin")) {
        const cookie = request.cookies.get("session")?.value;
        const session = cookie ? await decrypt(cookie) : null;
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (path === "/login") {
        const cookie = request.cookies.get("session")?.value;
        const session = cookie ? await decrypt(cookie) : null;
        if (session) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
