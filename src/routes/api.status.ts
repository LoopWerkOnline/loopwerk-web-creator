import { createFileRoute } from "@tanstack/react-router";

/** Status van alle koppelingen (database, HubSpot, mail, tracking). Geeft geen geheimen terug. */
export const Route = createFileRoute("/api/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { getStatus, testHubspotForm } = await import("@/lib/status.server");
        const wantsFormTest = new URL(request.url).searchParams.has("hubspot-test");
        const body = wantsFormTest ? await testHubspotForm() : await getStatus();
        return new Response(JSON.stringify(body, null, 2), {
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
