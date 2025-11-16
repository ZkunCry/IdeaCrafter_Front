// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/account", "/startup"];

export default async function middleware(req: NextRequest) {
  console.log("we are here");
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isProtected = protectedRoutes.some((r) =>
    req.nextUrl.pathname.startsWith(r)
  );

  if (!isProtected) return NextResponse.next();
  console.log(isProtected);
  if (!accessToken && !refreshToken) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("reason", "session_expired");
    return NextResponse.redirect(url);
  }
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
        method: "POST",
        headers: { cookie: `refresh_token=${refreshToken}` },
      });

      if (res.ok) {
        return NextResponse.next();
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/startup/create"],
  runtime: "nodejs",
};
