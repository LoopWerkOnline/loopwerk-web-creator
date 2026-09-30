/**
 * Contactformulier rechtstreeks vanuit de browser naar de publieke HubSpot Forms Submission API.
 * Geen token nodig: portal- en formulier-ID zijn openbaar.
 */
const PORTAL_ID = "149185560";
const FORM_ID = "885c831f-54c3-4789-9932-ef759c4fb567";
const PATH = `/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;
const ENDPOINTS = [`https://api-eu1.hsforms.com${PATH}`, `https://api.hsforms.com${PATH}`];

export type HubspotField = { name: string; value: string };

/** HubSpot weigerde de inzending; `errorTypes` komt uit het antwoord (bv. BLOCKED_EMAIL). */
export class HubspotFormError extends Error {
  constructor(
    public status: number,
    public errorTypes: string[],
  ) {
    super(`HubSpot ${status} ${errorTypes.join(",")}`);
  }
  get blockedEmail() {
    return this.errorTypes.some((t) => t === "BLOCKED_EMAIL" || t === "BLOCKED_FREE_EMAIL_DOMAIN");
  }
}

type HubspotErrorBody = { errors?: { errorType?: string; message?: string }[] };

function readHubspotUtk(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match?.[1];
}

function buildBody(fields: HubspotField[]): string {
  const hutk = readHubspotUtk();
  return JSON.stringify({
    fields: fields
      .filter((f) => f.value.trim() !== "")
      .map((f) => ({ objectTypeId: "0-1", name: f.name, value: f.value.trim() })),
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      ...(hutk ? { hutk } : {}),
    },
  });
}

async function post(body: string): Promise<Response> {
  for (const [i, url] of ENDPOINTS.entries()) {
    const isLast = i === ENDPOINTS.length - 1;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      // Bestaat het EU-adres niet (404), probeer dan het algemene adres.
      if (res.status === 404 && !isLast) {
        console.error("[contact] HubSpot EU-adres gaf 404, probeer algemeen adres");
        continue;
      }
      return res;
    } catch (error) {
      // Netwerk- of CORS-fout op het EU-adres: nog één poging via het algemene adres.
      if (error instanceof TypeError && !isLast) {
        console.error("[contact] HubSpot EU-adres niet bereikbaar, probeer algemeen adres");
        continue;
      }
      throw error;
    }
  }
  throw new Error("HubSpot niet bereikbaar");
}

/**
 * Verstuurt de velden; lege waarden worden weggelaten. Staat een veld niet op het
 * HubSpot-formulier, dan wordt één keer opnieuw verstuurd zonder dat veld.
 * Gooit HubspotFormError bij een weigering, of een gewone fout bij een netwerkprobleem.
 */
export async function submitHubspotForm(fields: HubspotField[]): Promise<void> {
  let current = fields;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await post(buildBody(current));
    if (res.ok) return;

    const text = await res.text();
    // Alleen status en antwoord van HubSpot loggen, nooit de ingevulde gegevens.
    console.error("[contact] HubSpot antwoordde", res.status, text);
    let parsed: HubspotErrorBody = {};
    try {
      parsed = JSON.parse(text) as HubspotErrorBody;
    } catch {
      /* geen JSON */
    }
    const errors = parsed.errors ?? [];

    const notInForm = errors
      .filter((e) => e.errorType === "FIELD_NOT_IN_FORM_DEFINITION")
      .map((e) => /fields\.([a-z0-9_]+)/i.exec(e.message ?? "")?.[1])
      .filter((n): n is string => Boolean(n));
    if (attempt === 0 && notInForm.length && notInForm.length === errors.length) {
      current = current.filter((f) => !notInForm.includes(f.name));
      continue;
    }

    throw new HubspotFormError(
      res.status,
      errors.map((e) => e.errorType ?? "ONBEKEND"),
    );
  }
  throw new HubspotFormError(400, ["RETRY_FAILED"]);
}
