import { createFileRoute } from "@tanstack/react-router";

import { absoluteUrl, getSiteSections } from "@/lib/site-pages";

/** XML-sitemap voor zoekmachines; in de browser opgemaakt via /sitemap.xsl. */
function buildSitemap(): string {
  const urls = getSiteSections()
    .flatMap((s) => s.pages)
    .map(
      (p) =>
        `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
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
