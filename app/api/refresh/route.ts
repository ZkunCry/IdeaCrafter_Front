import { NextResponse } from "next/server";
import { API } from "@/src/constants/config";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader?.includes("refresh_token")) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const res = await fetch(`${API.BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { cookie: cookieHeader },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    const setCookies = res.headers.getSetCookie();

    if (setCookies?.length) {
      for (const cookie of setCookies) {
        response.headers.append("Set-Cookie", cookie);
      }
    }
    return response;
  } catch (e) {
    console.error("Error refreshing token:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
