import { createFileRoute } from "@tanstack/react-router";

import xsl from "@/lib/sitemap.xsl?raw";

/** Opmaak voor /sitemap.xml in de browser. Eigen route, zodat het Content-Type altijd klopt. */
export const Route = createFileRoute("/sitemap.xsl")({
  server: {
    handlers: {
      GET: () =>
        new Response(xsl, {
          headers: {
            "content-type": "text/xsl; charset=utf-8",
            "cache-control": "public, max-age=3600",
            "x-robots-tag": "noindex",
          },
        }),
    },
  },
});
