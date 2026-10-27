import { env, notifyFrom, notifyTo } from "./leads.server";

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

let lastFormTest = 0;

/**
 * Proefinzending naar het HubSpot-contactformulier, om te zien wat HubSpot terugstuurt.
 * Maakt/actualiseert één vast testcontact. Hooguit eens per 5 minuten.
 */
export async function testHubspotForm() {
  if (Date.now() - lastFormTest < 5 * 60_000) return { overgeslagen: "max 1 test per 5 minuten" };
  lastFormTest = Date.now();
  const path = "/submissions/v3/integration/submit/149185560/885c831f-54c3-4789-9932-ef759c4fb567";
  const fields = [
    ["firstname", "Websitetest"],
    ["lastname", "Statuscheck"],
    ["email", "websitetest@loopwerkonline.nl"],
    ["company", "LoopWerk test"],
  ].map(([name, value]) => ({ objectTypeId: "0-1", name, value }));
  const out: Record<string, unknown> = {};
  for (const host of ["https://api-eu1.hsforms.com", "https://api.hsforms.com"]) {
    try {
      const res = await fetch(host + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: { pageUri: "https://www.loopwerkonline.nl/contact", pageName: "Statuscheck" },
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      out[host] = { status: res.status, antwoord: (await res.text()).slice(0, 1500) };
    } catch (error) {
      out[host] = { fout: String(error) };
    }
  }
  return out;
}

let lastMailTest = 0;

/** Proefmail via Resend naar de meldingsontvanger, om te zien wat Resend terugstuurt. Hooguit eens per 5 minuten. */
export async function testMail() {
  if (Date.now() - lastMailTest < 5 * 60_000) return { overgeslagen: "max 1 test per 5 minuten" };
  lastMailTest = Date.now();
  const key = env("RESEND_API_KEY");
  if (!key) return { fout: "mist RESEND_API_KEY" };
  const to = notifyTo()
    .split(",")
    .map((s) => s.trim());
  const from = notifyFrom();
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: "Testmail website LoopWerk",
        text: "Dit is een testmail van de website (statuscheck). Komt deze aan, dan werkt de meldingsmail.",
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return { naar: to, van: from, status: res.status, antwoord: (await res.text()).slice(0, 1500) };
  } catch (error) {
    return { fout: String(error) };
  }
}
