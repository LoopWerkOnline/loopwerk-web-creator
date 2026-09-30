/**
 * Contactformulier rechtstreeks vanuit de browser naar de publieke HubSpot Forms Submission API.
 * Geen token nodig: portal- en formulier-ID zijn openbaar.
 */
const PORTAL_ID = "149185560";
const FORM_ID = "885c831f-54c3-4789-9932-ef759c4fb567";
const PATH = `/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;
const ENDPOINTS = [`https://api-eu1.hsforms.com${PATH}`, `https://api.hsforms.com${PATH}`];

export type HubspotField = { name: string; value: string };

function readHubspotUtk(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match?.[1];
}

/** Verstuurt de velden; lege waarden worden weggelaten. Gooit een fout bij een niet-2xx of netwerkfout. */
export async function submitHubspotForm(fields: HubspotField[]): Promise<void> {
  const hutk = readHubspotUtk();
  const body = JSON.stringify({
    fields: fields
      .filter((f) => f.value.trim() !== "")
      .map((f) => ({ objectTypeId: "0-1", name: f.name, value: f.value.trim() })),
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      ...(hutk ? { hutk } : {}),
    },
  });

  let lastError: unknown;
  for (const [i, url] of ENDPOINTS.entries()) {
    const isLast = i === ENDPOINTS.length - 1;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (res.ok) return;
      // Alleen status en antwoord van HubSpot loggen, nooit de ingevulde gegevens.
      console.error("[contact] HubSpot antwoordde", res.status, await res.text());
      // Bestaat het EU-adres niet (404), probeer dan het algemene adres.
      if (res.status === 404 && !isLast) continue;
      throw new Error(`HubSpot ${res.status}`);
    } catch (error) {
      lastError = error;
      // Netwerk- of CORS-fout op het EU-adres: nog één poging via het algemene adres.
      if (error instanceof TypeError && !isLast) {
        console.error("[contact] EU-adres niet bereikbaar, probeer algemeen adres");
        continue;
      }
      throw error;
    }
  }
  throw lastError ?? new Error("HubSpot niet bereikbaar");
}
