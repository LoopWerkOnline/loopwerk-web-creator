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
    message: z.string().trim().min(1).max(5000),
    ...shared,
  }),
  z.object({
    kind: z.literal("scan"),
    firstName: z.string().trim().min(1).max(100),
    answers: z.record(z.unknown()),
    score: z.object({ total: z.number(), bandLabel: z.string() }).passthrough(),
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

/** Leest de HubSpot-trackingcookie (alleen gezet als de HubSpot-trackingcode draait). */
export function readHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match?.[1];
}
