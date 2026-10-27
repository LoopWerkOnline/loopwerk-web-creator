import { env, notifyFrom } from "./leads.server";

/**
 * Server-only. Controleert per koppeling of hij is ingesteld en of hij echt antwoordt.
 * Geeft nooit sleutels of waarden terug, alleen de status. Gebruikt door /api/status.
 */

type Check = { ingesteld: boolean; status: "ok" | "fout" | "niet ingesteld"; detail?: string };

const TIMEOUT_MS = 8000;
let cache: { at: number; body: unknown } | undefined;

async function probe(url: string, init: RequestInit): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
}

async function hubspotObject(token: string, object: string): Promise<Check> {
  try {
    const res = await probe(`https://api.hubapi.com/crm/v3/objects/${object}?limit=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) return { ingesteld: true, status: "ok" };
    return {
      ingesteld: true,
      status: "fout",
      detail:
        res.status === 401
          ? "token ongeldig"
          : res.status === 403
            ? `token mist rechten voor ${object}`
            : `HTTP ${res.status}`,
    };
  } catch (error) {
    return { ingesteld: true, status: "fout", detail: String(error) };
  }
}

async function resend(): Promise<Check> {
  const key = env("RESEND_API_KEY");
  const from = notifyFrom();
  if (!key) return { ingesteld: false, status: "niet ingesteld", detail: "mist RESEND_API_KEY" };
  try {
    const res = await probe("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${key}` },
    });
    // Een sleutel met alleen verzendrechten mag domeinen niet lezen; dat is prima.
    if (res.status === 401) {
      const text = await res.text();
      if (text.includes("restricted"))
        return { ingesteld: true, status: "ok", detail: "verzendsleutel" };
      return { ingesteld: true, status: "fout", detail: "sleutel ongeldig" };
    }
    if (!res.ok) return { ingesteld: true, status: "fout", detail: `HTTP ${res.status}` };
    const data = (await res.json()) as { data?: { name: string; status: string }[] };
    const domain = from.split("@")[1]?.replace(/>.*$/, "").trim();
    const match = data.data?.find((d) => d.name === domain);
    if (!match)
      return { ingesteld: true, status: "fout", detail: `domein ${domain} niet in Resend` };
    return match.status === "verified"
      ? { ingesteld: true, status: "ok" }
      : { ingesteld: true, status: "fout", detail: `domein ${domain}: ${match.status}` };
  } catch (error) {
    return { ingesteld: true, status: "fout", detail: String(error) };
  }
}

export async function getStatus() {
  // Hooguit eens per minuut echt controleren, zodat de route geen API-limieten opmaakt.
  if (cache && Date.now() - cache.at < 60_000) return cache.body;

  const token = env("HUBSPOT_PRIVATE_APP_TOKEN");
  const [contacts, companies, deals, mail] = await Promise.all([
    token ? hubspotObject(token, "contacts") : null,
    token ? hubspotObject(token, "companies") : null,
    token ? hubspotObject(token, "deals") : null,
    resend(),
  ]);
  const notSet: Check = {
    ingesteld: false,
    status: "niet ingesteld",
    detail: "mist HUBSPOT_PRIVATE_APP_TOKEN",
  };

  const body = {
    gecontroleerd: new Date().toISOString(),
    hubspot: {
      formulieren: {
        ingesteld: true,
        status: "ok",
        detail: "contact en scan via het HubSpot-contactformulier (openbaar formulier-ID)",
      } satisfies Check,
      contacten: contacts ?? notSet,
      bedrijven: companies ?? notSet,
      deals: deals ?? notSet,
    },
    mail,
    tracking: {
      ga4: { ingesteld: true, status: "ok", detail: "standaard-ID in de code" } satisfies Check,
      hubspot_tracking: (import.meta.env["VITE_HUBSPOT_PORTAL_ID"]
        ? { ingesteld: true, status: "ok" }
        : {
            ingesteld: false,
            status: "niet ingesteld",
            detail: "mist VITE_HUBSPOT_PORTAL_ID (daarna opnieuw deployen)",
          }) satisfies Check,
    },
  };
  cache = { at: Date.now(), body };
  return body;
}
