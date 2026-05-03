import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "super-secret-key-darul-ihsan-xyz-123";
const key = new TextEncoder().encode(secretKey);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("session")?.value;

    // Protected routes
    if (pathname.startsWith("/admin")) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            await jwtVerify(session, key, {
                algorithms: ["HS256"],
            });
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect logged in users away from login page
    if (pathname === "/login" && session) {
        try {
            await jwtVerify(session, key, {
                algorithms: ["HS256"],
            });
            return NextResponse.redirect(new URL("/admin", request.url));
        } catch (error) {
            // Invalid session
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};

