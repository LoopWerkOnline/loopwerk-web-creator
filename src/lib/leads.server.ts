import { createClient } from "@supabase/supabase-js";

import type { Database, Json } from "@/integrations/supabase/types";
import type { LeadInput } from "./leads.functions";

/**
 * Server-only. Configuratie komt uit env-variabelen (Lovable/Vercel secrets):
 * - SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY — opslag (insert-only via RLS)
 * - HUBSPOT_PORTAL_ID, HUBSPOT_FORM_CONTACT, HUBSPOT_FORM_SCAN — optioneel (formulierinzending)
 * - HUBSPOT_PRIVATE_APP_TOKEN — optioneel (deal aanmaken); HUBSPOT_DEAL_PIPELINE / HUBSPOT_DEAL_STAGE
 *   overschrijven de pijplijn ("default" = Loopwerk trajecten) en fase ("Nieuwe aanvraag")
 * - RESEND_API_KEY, LEAD_NOTIFY_TO, LEAD_NOTIFY_FROM — optioneel
 * Ontbreekt een optionele variabele, dan wordt die stap overgeslagen.
 */

const MIN_FILL_MS = 3000;

export async function handleLead(lead: LeadInput): Promise<{ ok: true }> {
  // Bots krijgen een normaal "gelukt", maar er gebeurt niets.
  if (lead.website || Date.now() - lead.startedAt < MIN_FILL_MS) {
    return { ok: true };
  }

  await saveToSupabase(lead);

  // Opslag is gelukt; HubSpot en mail mogen de bezoeker niet blokkeren.
  const results = await Promise.allSettled([hubspotFlow(lead), notifyTeam(lead)]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[leads]", r.reason);
  }

  return { ok: true };
}

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function supabaseClient() {
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_PUBLISHABLE_KEY");
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY");

  return createClient<Database>(url, key, {
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);
        // Nieuwe Supabase-keys zijn geen JWT; niet als Bearer meesturen.
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function saveToSupabase(lead: LeadInput) {
  const supabase = supabaseClient();

  const { error } =
    lead.kind === "contact"
      ? await supabase.from("contact_requests").insert({
          name: lead.name,
          email: lead.email,
          company: lead.company || null,
          phone: lead.phone || null,
          message: lead.message,
        })
      : await supabase.from("scan_leads").insert({
          first_name: lead.firstName,
          email: lead.email,
          company: lead.company || null,
          answers: lead.answers as Json,
          score: lead.score as Json,
          richting: lead.richting,
        });

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

/** Eerst de formulierinzending (tracking), daarna de deal; een fout in stap 1 stopt stap 2 niet. */
async function hubspotFlow(lead: LeadInput) {
  try {
    await sendToHubspot(lead);
  } catch (error) {
    console.error("[leads]", error);
  }
  await createHubspotDeal(lead);
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
async function createHubspotDeal(lead: LeadInput) {
  const token = env("HUBSPOT_PRIVATE_APP_TOKEN");
  if (!token) return;

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
    lead.kind === "contact"
      ? lead.message
      : `Loopwerk Scan: ${lead.score.bandLabel} (${lead.score.total}/100). Proces: ${lead.process || "-"}. Richting: ${lead.richting}.`;

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

async function sendToHubspot(lead: LeadInput) {
  const portalId = env("HUBSPOT_PORTAL_ID");
  const formGuid = env(lead.kind === "contact" ? "HUBSPOT_FORM_CONTACT" : "HUBSPOT_FORM_SCAN");
  if (!portalId || !formGuid) return;

  const fields: Record<string, string | undefined> =
    lead.kind === "contact"
      ? {
          firstname: lead.name.split(" ")[0],
          lastname: lead.name.split(" ").slice(1).join(" ") || undefined,
          email: lead.email,
          company: lead.company,
          phone: lead.phone,
          message: lead.message,
        }
      : {
          firstname: lead.firstName,
          email: lead.email,
          company: lead.company,
          scan_score: String(lead.score.total),
          scan_richting: lead.richting,
          scan_proces: lead.process,
        };

  const body = {
    fields: Object.entries(fields)
      .filter(([, value]) => value)
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value })),
    context: {
      hutk: lead.hutk,
      pageUri: lead.pageUri,
      pageName: lead.kind === "contact" ? "Contact" : "Loopwerk Scan",
    },
  };

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
  );
  if (!res.ok) throw new Error(`HubSpot ${res.status}: ${await res.text()}`);
}

async function notifyTeam(lead: LeadInput) {
  const apiKey = env("RESEND_API_KEY");
  const to = env("LEAD_NOTIFY_TO");
  const from = env("LEAD_NOTIFY_FROM");
  if (!apiKey || !to || !from) return;

  const subject =
    lead.kind === "contact"
      ? `Nieuwe aanvraag via de site: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`
      : `Nieuwe scan: ${lead.firstName}${lead.company ? ` (${lead.company})` : ""} — ${lead.score.total}/100`;

  const lines =
    lead.kind === "contact"
      ? [
          `Naam: ${lead.name}`,
          `E-mail: ${lead.email}`,
          `Bedrijf: ${lead.company || "-"}`,
          `Telefoon: ${lead.phone || "-"}`,
          "",
          lead.message,
        ]
      : [
          `Naam: ${lead.firstName}`,
          `E-mail: ${lead.email}`,
          `Bedrijf: ${lead.company || "-"}`,
          `Proces: ${lead.process || "-"}`,
          `Uitkomst: ${lead.score.bandLabel} (${lead.score.total}/100)`,
          `Richting: ${lead.richting}`,
        ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject,
      text: lines.join("\n"),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
