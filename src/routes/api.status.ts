import { createFileRoute } from "@tanstack/react-router";

/** Status van alle koppelingen (database, HubSpot, mail, tracking). Geeft geen geheimen terug. */
export const Route = createFileRoute("/api/status")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { getStatus, testHubspotForm, testMail, testConfirmation } =
          await import("@/lib/status.server");
        const params = new URL(request.url).searchParams;
        const body = params.has("hubspot-test")
          ? await testHubspotForm()
          : params.has("mail-test")
            ? await testMail()
            : params.has("confirm-test")
              ? await testConfirmation(params.get("confirm-test") ?? "")
              : await getStatus();
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
