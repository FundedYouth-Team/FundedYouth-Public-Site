// Cloudflare Pages Function — proxies the public sessions feed
// /api/calendar/* → https://cdn.fundedyouth.org/feeds/calendar/*
// Adds CORS headers and lets us cache responses on the edge.

export const onRequest: PagesFunction = async (context) => {
  const { request, params } = context;

  const pathSegments = params.path as string[];
  const calendarPath = pathSegments ? pathSegments.join("/") : "";

  const url = new URL(request.url);
  const upstreamUrl = `https://cdn.fundedyouth.org/feeds/calendar/${calendarPath}${url.search}`;

  const upstream = await fetch(upstreamUrl, {
    method: request.method,
    cf: { cacheTtl: 60, cacheEverything: true },
  });

  const body = await upstream.arrayBuffer();
  const contentType =
    upstream.headers.get("content-type") ?? "application/json; charset=utf-8";

  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
  });
};
