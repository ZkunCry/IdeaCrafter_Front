import type { NextRequest } from "next/server";

const apiServer = `${process.env.API_SERVER_URL || "http://localhost:3001"}/api/`;

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
    if (key.toLowerCase() !== "host") {
      headers.append(key, value);
    }
  });

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
  provider as POST,
  provider as PUT,
};
