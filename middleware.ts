import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { API } from "./src/constants/config";

const protectedRoutes = ["/account"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const allCookies = (await cookies()).getAll();
  const accessToken = allCookies.find((c) => c.name === "access_token");
  const refreshToken = allCookies.find((c) => c.name === "refresh_token");

  if (authRoutes.includes(path) && accessToken) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  if (protectedRoutes.includes(path)) {
    try {
      const res = await fetch(`${API.BASE_URL}/auth/me`, {
        method: "POST",
        headers: {
          cookie: allCookies.map((c) => `${c.name}=${c.value}`).join("; "),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    } catch (err) {
      console.error(err);
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    if (accessToken || refreshToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/auth/:path*"],
};
