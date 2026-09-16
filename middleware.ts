import { NextResponse, type NextRequest } from "next/server";

// Plain path prefixes: matcher syntax such as "/account/:path*" is only valid in
// `config.matcher`, and never matches a real pathname through startsWith().
const protectedRoutes = ["/account", "/startup/create"];

const isProtectedPath = (pathname: string) =>
  protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (!isProtectedPath(req.nextUrl.pathname)) return NextResponse.next();

  if (!accessToken && !refreshToken) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("reason", "session_expired");
    // Bring the user back to the page they asked for once they sign in.
    url.searchParams.set(
      "redirect",
      `${req.nextUrl.pathname}${req.nextUrl.search}`,
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/startup/create"],
  runtime: "nodejs",
};
