import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Eén ingang voor alle leads van de site (contactformulier en scan).
 * Draait op de server: opslaan in Supabase, doorsturen naar HubSpot en een
 * notificatiemail naar het team. De server-logica staat in leads.server.ts
 * zodat env-variabelen nooit in de client-bundle belanden.
 */

const shared = {
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional(),
  /** Honeypot: onzichtbaar veld, hoort leeg te blijven. */
  website: z.string().max(500).optional(),
  /** Moment (ms) waarop het formulier geopend werd; te snel invullen = bot. */
  startedAt: z.number(),
  hutk: z.string().max(200).optional(),
  pageUri: z.string().max(500).optional(),
};

const leadSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("contact"),
    name: z.string().trim().min(1).max(200),
    phone: z.string().trim().max(50).optional(),
    message: z.string().trim().max(5000).optional(),
    ...shared,
    // Bij contact is de bedrijfsnaam verplicht (overschrijft de optionele uit `shared`).
    company: z.string().trim().min(1).max(200),
  }),
  z.object({
    kind: z.literal("scan"),
    firstName: z.string().trim().min(1).max(100),
    answers: z
      .record(z.unknown())
      .refine((v) => JSON.stringify(v).length <= 5000, "answers too large"),
    score: z
      .object({ total: z.number(), bandLabel: z.string() })
      .passthrough()
      .refine((v) => JSON.stringify(v).length <= 5000, "score too large"),
    richting: z.string().max(200),
    process: z.string().max(200),
    ...shared,
  }),
]);

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: LeadInput) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { handleLead } = await import("./leads.server");
    return handleLead(data);
  });

/**
 * Vervolgstap na een geslaagde HubSpot-inzending van het contactformulier:
 * meldingsmail naar het team en een deal in HubSpot. Slaat niets op in Supabase.
 */
const contactFollowUpSchema = z.object({
  kind: z.literal("contact"),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().max(5000).optional(),
  website: z.string().max(500).optional(),
  startedAt: z.number(),
  pageUri: z.string().max(500).optional(),
  /** true = HubSpot weigerde het formulier; dan deal/mail en zo nodig noodopslag. */
  fallback: z.boolean().optional(),
});

export const contactFollowUp = createServerFn({ method: "POST" })
  .inputValidator((data: z.infer<typeof contactFollowUpSchema>) =>
    contactFollowUpSchema.parse(data),
  )
  .handler(async ({ data }) => {
    const { handleContactFollowUp } = await import("./leads.server");
    const { fallback, ...lead } = data;
    return handleContactFollowUp(lead, { fallback: fallback === true });
  });

/** Leest de HubSpot-trackingcookie (alleen gezet als de HubSpot-trackingcode draait). */
export function readHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match?.[1];
}
