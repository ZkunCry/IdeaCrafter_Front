import type { NextRequest } from "next/server";

const apiServer = "http://localhost:3001/api/";

async function provider(
  req: NextRequest,
  ctx: { params: { proxy: string[] } }
) {
  const params = await ctx.params;
  let url = `${apiServer}${params.proxy.join("/")}`;
  let body;
  const search = req.nextUrl.searchParams.toString();
  console.log("@url", url);
  if (search) {
    url += `?${search}`;
  }
  const headers = new Headers();
  req.headers.forEach((v, k) => {
    headers.append(k, v);
  });

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
