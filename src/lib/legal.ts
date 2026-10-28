/**
 * Datums van de juridische pagina's (JJJJ-MM-DD).
 * - updated: laatste inhoudelijke wijziging, getoond als "Laatst bijgewerkt".
 * - reviewed: laatste keer dat de tekst is nagelopen tegen de code.
 * `npm run check:privacy` faalt als een bestand uit `watches` later is gewijzigd dan `reviewed`.
 * Dan: tekst nalopen en zo nodig aanpassen, `updated` alleen ophogen als de tekst veranderde,
 * `reviewed` altijd op vandaag zetten.
 */
export const legal = {
  privacy: {
    updated: "2026-10-28",
    reviewed: "2026-10-28",
    // Wat we verzamelen, waar het heen gaat en wat de bezoeker te zien krijgt.
    watches: [
      "src/routes/contact.tsx",
      "src/components/scan/ScanLeadPreview.tsx",
      "src/lib/hubspot-form.ts",
      "src/lib/leads.functions.ts",
      "src/lib/leads.server.ts",
      "src/lib/company.ts",
    ],
  },
  cookies: {
    updated: "2026-09-24",
    reviewed: "2026-10-28",
    // Welke scripts en cookies er laden, en wanneer.
    watches: ["src/lib/tracking.ts", "src/components/CookieBanner.tsx", "src/routes/__root.tsx"],
  },
} as const;

/** "2026-10-28" → "28 oktober 2026" */
export function formatLegalDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  });
}
