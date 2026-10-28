import { confirmationEmail, teamEmail } from "./email-templates";
import type { LeadInput } from "./leads.functions";

/**
 * Server-only. Configuratie komt uit env-variabelen (Vercel → Settings → Environment Variables):
 * Leads worden opgeslagen in HubSpot (geen eigen database).
 * - HUBSPOT_PORTAL_ID / HUBSPOT_FORM_SCAN — optioneel; standaard het openbare portal en het contactformulier
 * - HUBSPOT_PRIVATE_APP_TOKEN — optioneel (deal aanmaken); HUBSPOT_DEAL_PIPELINE / HUBSPOT_DEAL_STAGE
 *   overschrijven de pijplijn ("default" = Loopwerk trajecten) en fase ("Nieuwe aanvraag")
 * - RESEND_API_KEY — meldingsmail + bevestiging; LEAD_NOTIFY_TO / LEAD_NOTIFY_FROM optioneel
 * Ontbreekt een optionele variabele, dan wordt die stap overgeslagen.
 */

const MIN_FILL_MS = 3000;

export async function handleLead(lead: LeadInput): Promise<{ ok: true }> {
  // Bots krijgen een normaal "gelukt", maar er gebeurt niets.
  if (lead.website || Date.now() - lead.startedAt < MIN_FILL_MS) {
    return { ok: true };
  }

  // Beide kanalen tegelijk: valt er één uit, dan komt de lead via de andere nog binnen.
  const steps = [
    ["hubspot", hubspotFlow(lead)],
    ["mail", notifyTeam(lead)],
  ] as const;
  const results = await Promise.allSettled(steps.map(([, p]) => p));

  let delivered = false;
  results.forEach((r, i) => {
    if (r.status === "rejected")
      console.error(`[leads] ${steps[i]?.[0] ?? "stap"} mislukt:`, r.reason);
    else if (r.value) delivered = true;
  });

  // Alleen als niets de lead heeft ontvangen, krijgt de bezoeker een foutmelding.
  if (!delivered) throw new Error("Lead kon nergens worden opgeslagen");
  await sendConfirmation(lead).catch((e) => console.error("[leads] bevestiging mislukt:", e));
  return { ok: true };
}

/**
 * Contactformulier: de inzending zelf ging al vanuit de browser naar HubSpot.
 * Hier alleen nog de meldingsmail en de deal (geen Supabase, geen tweede formulierinzending).
 */
export async function handleContactFollowUp(
  lead: LeadInput,
  opts: { fallback?: boolean } = {},
): Promise<{ ok: true; delivered: boolean }> {
  if (lead.website || Date.now() - lead.startedAt < MIN_FILL_MS)
    return { ok: true, delivered: true };

  const results = await Promise.allSettled([createHubspotDeal(lead), notifyTeam(lead)]);
  let delivered = false;
  results.forEach((r, i) => {
    if (r.status === "rejected")
      console.error(`[contact] ${i === 0 ? "deal" : "mail"} mislukt:`, r.reason);
    else if (r.value) delivered = true;
  });

  // Noodvangnet: de browser kreeg HubSpot niet bereikt. Dan via de server nog een poging.
  if (opts.fallback && !delivered) {
    try {
      delivered = await sendToHubspot(lead);
    } catch (error) {
      console.error("[contact] HubSpot via server mislukt:", error);
    }
  }
  // Bevestiging naar de bezoeker: na een geslaagde HubSpot-inzending, of als de vangnetten werkten.
  if (!opts.fallback || delivered) {
    await sendConfirmation(lead).catch((e) => console.error("[contact] bevestiging mislukt:", e));
  }
  return { ok: true, delivered };
}

/** Ontvanger en afzender van de mails. Geen geheimen: standaardwaarden, te overschrijven via env. */
export const notifyTo = () => env("LEAD_NOTIFY_TO") ?? "info@loopwerkonline.nl";
export const notifyFrom = () => env("LEAD_NOTIFY_FROM") ?? "LoopWerk <noreply@loopwerkonline.nl>";

export function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

/** Eerst de formulierinzending (tracking), daarna de deal; een fout in stap 1 stopt stap 2 niet. */
async function hubspotFlow(lead: LeadInput): Promise<boolean> {
  let sent = false;
  try {
    sent = await sendToHubspot(lead);
  } catch (error) {
    console.error("[leads] hubspot formulier mislukt:", error);
  }
  return (await createHubspotDeal(lead)) || sent;
}

/** Fase-ID van "Nieuwe aanvraag" in de pijplijn "Loopwerk trajecten" (portal 149185560). */
const DEFAULT_DEAL_STAGE = "6132543700";

async function hubspotApi(token: string, path: string, body?: unknown, method = "POST") {
  const res = await fetch(`https://api.hubapi.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body === undefined ? null : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HubSpot API ${path} ${res.status}: ${await res.text()}`);
  return (await res.json()) as { id?: string; results?: { id: string }[] };
}

/** Contact aanmaken of bijwerken (op e-mail) en er een deal aan koppelen. */
async function createHubspotDeal(lead: LeadInput): Promise<boolean> {
  const token = env("HUBSPOT_PRIVATE_APP_TOKEN");
  if (!token) return false;

  const contactProps: Record<string, string> =
    lead.kind === "contact"
      ? { email: lead.email, firstname: lead.name.split(" ")[0] ?? lead.name }
      : {
          email: lead.email,
          firstname: lead.firstName,
          scan_score: String(lead.score.total),
          scan_richting: lead.richting,
          scan_proces: lead.process,
        };
  if (lead.company) contactProps["company"] = lead.company;

  const upsert = await hubspotApi(token, "/crm/v3/objects/contacts/batch/upsert", {
    inputs: [{ idProperty: "email", id: lead.email, properties: contactProps }],
  });
  const contactId = upsert.results?.[0]?.id;
  if (!contactId) throw new Error("HubSpot upsert returned no contact id");

  const companyId = lead.company ? await findOrCreateCompany(token, lead) : undefined;
  if (companyId) {
    await hubspotApi(
      token,
      `/crm/v4/objects/contact/${contactId}/associations/default/company/${companyId}`,
      undefined,
      "PUT",
    );
  }

  const who = lead.kind === "contact" ? lead.name : lead.firstName;
  const description =
    lead.kind === "contact" ? lead.message || "Geen toelichting gegeven." : scanSummary(lead);

  await hubspotApi(token, "/crm/v3/objects/deals", {
    properties: {
      dealname: `${lead.kind === "contact" ? "Website" : "Scan"}: ${lead.company || who}`,
      pipeline: env("HUBSPOT_DEAL_PIPELINE") ?? "default",
      dealstage: env("HUBSPOT_DEAL_STAGE") ?? DEFAULT_DEAL_STAGE,
      description: description.slice(0, 5000),
    },
    associations: [
      {
        to: { id: contactId },
        types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
      },
      ...(companyId
        ? [
            {
              to: { id: companyId },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 5 }],
            },
          ]
        : []),
    ],
  });
  return true;
}

/** Bedrijf zoeken op naam; bestaat het niet, dan aanmaken met de bron van deze lead. */
async function findOrCreateCompany(token: string, lead: LeadInput): Promise<string | undefined> {
  const name = lead.company?.trim();
  if (!name) return undefined;

  const found = await hubspotApi(token, "/crm/v3/objects/companies/search", {
    filterGroups: [{ filters: [{ propertyName: "name", operator: "EQ", value: name }] }],
    limit: 1,
  });
  const existing = found.results?.[0]?.id;
  if (existing) return existing;

  const created = await hubspotApi(token, "/crm/v3/objects/companies", {
    properties: {
      name,
      eerste_bron: lead.kind === "contact" ? "website_contact" : "loopwerk_scan",
    },
  });
  return created.id;
}

/** Openbare HubSpot-gegevens (geen geheim). Scan gebruikt standaard het contactformulier. */
const HUBSPOT_PORTAL = "149185560";
const HUBSPOT_CONTACT_FORM = "885c831f-54c3-4789-9932-ef759c4fb567";

/** Leesbare samenvatting van de scan, voor HubSpot en de meldingsmail. */
function scanSummary(lead: Extract<LeadInput, { kind: "scan" }>): string {
  const answers = Object.entries(lead.answers)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");
  return [
    `LoopWerk Scan: ${lead.score.bandLabel} (${lead.score.total}/100)`,
    `Proces: ${lead.process || "-"}`,
    `Richting: ${lead.richting}`,
    answers ? `\nAntwoorden:\n${answers}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Formulierinzending via de HubSpot Forms API (server-side). Velden die niet op het formulier staan worden weggelaten. */
async function sendToHubspot(lead: LeadInput): Promise<boolean> {
  const portalId = env("HUBSPOT_PORTAL_ID") ?? HUBSPOT_PORTAL;
  const formGuid =
    (lead.kind === "scan" ? env("HUBSPOT_FORM_SCAN") : env("HUBSPOT_FORM_CONTACT")) ??
    HUBSPOT_CONTACT_FORM;

  const fields: Record<string, string | undefined> =
    lead.kind === "contact"
      ? {
          firstname: lead.name.split(" ")[0],
          lastname: lead.name.split(" ").slice(1).join(" ") || undefined,
          email: lead.email,
          company: lead.company,
          phone: lead.phone,
          loopwerk_knelpunt: lead.message,
          loopwerk_leadbron: "websiteformulier",
        }
      : {
          firstname: lead.firstName,
          email: lead.email,
          company: lead.company,
          scan_score: String(lead.score.total),
          scan_richting: lead.richting,
          scan_proces: lead.process,
          loopwerk_knelpunt: scanSummary(lead).slice(0, 5000),
          loopwerk_leadbron: "scan",
        };

  const post = async (names: string[]) => {
    const body = {
      fields: Object.entries(fields)
        .filter(([name, value]) => value && names.includes(name))
        .map(([name, value]) => ({ objectTypeId: "0-1", name, value })),
      context: {
        ...(lead.hutk ? { hutk: lead.hutk } : {}),
        ...(lead.pageUri ? { pageUri: lead.pageUri } : {}),
        pageName: lead.kind === "contact" ? "Contact" : "LoopWerk Scan",
      },
    };
    return fetch(
      `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
  };

  let names = Object.keys(fields);
  let res = await post(names);
  if (res.status === 400) {
    const text = await res.text();
    const missing = [...text.matchAll(/fields\.([a-z0-9_]+)/gi)].map((m) => m[1]);
    if (text.includes("FIELD_NOT_IN_FORM_DEFINITION") && missing.length) {
      names = names.filter((n) => !missing.includes(n));
      res = await post(names);
    } else {
      throw new Error(`HubSpot 400: ${text}`);
    }
  }
  if (!res.ok) throw new Error(`HubSpot ${res.status}: ${await res.text()}`);
  return true;
}

/** Gegevens in de vorm die de mailtemplates verwachten. */
function mailLead(lead: LeadInput) {
  const base = {
    email: lead.email,
    company: lead.company,
    phone: lead.kind === "contact" ? lead.phone : undefined,
  };
  return lead.kind === "contact"
    ? {
        ...base,
        kind: "contact" as const,
        name: lead.name,
        firstName: lead.name.split(" ")[0] ?? lead.name,
        message: lead.message,
      }
    : {
        ...base,
        kind: "scan" as const,
        name: lead.firstName,
        firstName: lead.firstName,
        process: lead.process,
        scoreLabel: lead.score.bandLabel,
        score: lead.score.total,
        richting: lead.richting,
        summary: scanSummary(lead),
      };
}

async function sendMail(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return true;
}

/** Meldingsmail naar het team (LEAD_NOTIFY_TO, standaard info@). Beantwoorden gaat naar de aanvrager. */
async function notifyTeam(lead: LeadInput): Promise<boolean> {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) return false;
  const mail = teamEmail(mailLead(lead));
  return sendMail(apiKey, {
    from: notifyFrom(),
    to: notifyTo()
      .split(",")
      .map((s) => s.trim()),
    reply_to: lead.email,
    ...mail,
  });
}

/**
 * Bevestigingsmail naar de bezoeker. Afzender: LEAD_CONFIRM_FROM of anders LEAD_NOTIFY_FROM.
 * Antwoorden gaan naar het team (eerste adres uit LEAD_NOTIFY_TO).
 */
async function sendConfirmation(lead: LeadInput): Promise<boolean> {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) return false;
  const replyTo = notifyTo().split(",")[0]?.trim();
  const mail = confirmationEmail(mailLead(lead));
  return sendMail(apiKey, {
    from: env("LEAD_CONFIRM_FROM") ?? notifyFrom(),
    to: [lead.email],
    ...(replyTo ? { reply_to: replyTo } : {}),
    ...mail,
  });
}
