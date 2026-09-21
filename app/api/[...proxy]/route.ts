import type { NextRequest } from "next/server";
import { API_SERVER_URL } from "@/src/constants/config";

const apiServer = `${API_SERVER_URL}/api/`;

const skippedRequestHeaders = new Set([
  "host",
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "te",
  "trailer",
  "proxy-connection",
  "content-length",
]);
const skippedResponseHeaders = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "content-encoding",
  "content-length",
]);

async function provider(
  req: NextRequest,
  ctx: { params: Promise<{ proxy: string[] }> },
) {
  const params = await ctx.params;
  let url = `${apiServer}${params.proxy.join("/")}`;

  const search = req.nextUrl.searchParams.toString();
  if (search) {
    url += `?${search}`;
  }

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!skippedRequestHeaders.has(key.toLowerCase())) {
      headers.append(key, value);
    }
  });
  if (!headers.has("x-forwarded-host")) {
    headers.set("x-forwarded-host", req.headers.get("host") ?? "");
  }
  if (!headers.has("x-forwarded-proto")) {
    headers.set("x-forwarded-proto", req.nextUrl.protocol.replace(":", ""));
  }

  let body: BodyInit | undefined = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
    });

    const responseBody = await res.arrayBuffer();
    const responseHeaders = new Headers(res.headers);
    skippedResponseHeaders.forEach((name) => responseHeaders.delete(name));

    return new Response(responseBody, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`API proxy request failed: ${req.method} ${url}`, error);

    return Response.json({ error: "Сервер API недоступен" }, { status: 502 });
  }
}

export {
  provider as DELETE,
  provider as GET,
  provider as PATCH,
  provider as POST,
  provider as PUT,
};
