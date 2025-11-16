import type { NextRequest } from "next/server";

const apiServer = "http://localhost:3001/api/";

async function provider(
  req: NextRequest,
  ctx: { params: { proxy: string[] } }
) {
  const params = ctx.params;
  let url = `${apiServer}${params.proxy.join("/")}`;

  const search = req.nextUrl.searchParams.toString();
  if (search) {
    url += `?${search}`;
  }

  const headers = new Headers();
  req.headers.forEach((value, key) => headers.append(key, value));

  let body: BodyInit | undefined = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  // Пробрасываем ответ от backend без изменений
  const responseBody = await res.arrayBuffer();
  const responseHeaders = new Headers(res.headers);

  return new Response(responseBody, {
    status: res.status,
    statusText: res.statusText,
    headers: responseHeaders,
  });
}

export {
  provider as DELETE,
  provider as GET,
  provider as POST,
  provider as PUT,
};
