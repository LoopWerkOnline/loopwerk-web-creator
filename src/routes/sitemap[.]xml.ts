import { createFileRoute } from "@tanstack/react-router";

import { blogPosts } from "@/lib/blog";
import { cases } from "@/lib/cases";
import { solutions } from "@/lib/content";

const SITE_URL = "https://www.loopwerkonline.nl";

/** Vaste pagina's. Oplossingen, cases en blogs komen automatisch uit de content. */
const staticPages = [
  "/",
  "/oplossingen",
  "/cases",
  "/blog",
  "/over-loopwerk",
  "/scan",
  "/contact",
  "/privacy",
  "/cookies",
];

function buildSitemap(): string {
  const urls: { loc: string; lastmod?: string }[] = [
    ...staticPages.map((path) => ({ loc: path })),
    ...solutions.map((s) => ({ loc: `/oplossingen/${s.slug}` })),
    ...cases.map((c) => ({ loc: c.href })),
    ...blogPosts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE_URL}${u.loc === "/" ? "/" : u.loc}</loc>${
          u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""
        }\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
