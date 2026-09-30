import { createFileRoute } from "@tanstack/react-router";

/** Status van alle koppelingen (database, HubSpot, mail, tracking). Geeft geen geheimen terug. */
export const Route = createFileRoute("/api/status")({
  server: {
    handlers: {
      GET: async () => {
        const { getStatus } = await import("@/lib/status.server");
        return new Response(JSON.stringify(await getStatus(), null, 2), {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
            "x-robots-tag": "noindex",
          },
        });
      },
    },
  },
});
