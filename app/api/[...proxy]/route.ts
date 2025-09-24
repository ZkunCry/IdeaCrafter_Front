import type { NextRequest } from "next/server";

const apiServer = "http://localhost:3001/api/";

async function provider(
  req: NextRequest,
  ctx: { params: { proxy: string[] } }
) {
  let url = `${apiServer}${ctx.params.proxy.join("/")}`;
  console.log("@url", url);
  const search = req.nextUrl.searchParams.toString();
  if (search) {
    url += `?${search}`;
  }
  const headers = new Headers();
  req.headers.forEach((v, k) => {
    headers.append(k, v);
  });

  let body;
  try {
    body = await req.json();
  } catch {
    body = undefined;
  }

  const res = await fetch(url, {
    method: req.method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });
  console.log("@", res);
  return res;
}

export {
  provider as DELETE,
  provider as GET,
  provider as POST,
  provider as PUT,
};
