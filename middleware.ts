import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/account", "/startup"];

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const isProtected = protectedRoutes.some((r) =>
    req.nextUrl.pathname.startsWith(r),
  );
  if (!isProtected) return NextResponse.next();
  console.log(!accessToken && !refreshToken);
  if (!accessToken && !refreshToken) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("reason", "session_expired");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/startup/create"],
  runtime: "nodejs",
};
