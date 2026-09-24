# Loopwerk website — context voor Claude

## Altijd eerst: context ophalen (Microsoft 365)

Lees bij de start van elke sessie, vóór je inhoudelijk werk doet, deze bronnen via de Microsoft 365-connector:

1. **Outlook** — recente mails (laatste ~2 weken) van l.kempen@loopwerkonline.nl. Let op klantcontact, leveranciers (Supabase, Vercel, Lovable, HubSpot) en afspraken. Negeer login-links, beveiligingsmeldingen en nieuwsbrieven.
2. **SharePoint-site `loopwerkgroup` → Gedeelde documenten** — de mappenstructuur:
   - `01 - Company/` — o.a. `Loopwerk_Positionering_Tone_of_Voice_Rules.md` (leidend voor alle teksten) en `Business Model/`
   - `05 - Projects/` — klantprojecten (o.a. SSPW-Offertecalculator)
   - `08 - SOPs/` — werkinstructies (Claude/GitHub/Vercel/Supabase)
   - `10 - Website/Content/` — positioneringsbrief, contentaanzet, `Website to-do.xlsx`
   - `Website to-do.xlsx` (root) — actuele takenlijst van de website
3. **OneDrive `Ai Business Ideeen/`** — oudere strategie (`00-Overzicht/`, `01-Strategie/`). `_archief/` is verouderd.

### Loggen
Leg na elke sessie met relevante uitkomsten (beslissingen, opgeleverd werk, openstaande input, signalen uit mail) een korte regel vast in **`07 - Operations/Logboek.md`** op de SharePoint-site `loopwerkgroup` (nieuwste bovenaan). Werk waar nodig ook de status bij in `Website to-do.xlsx`.

Lees alleen wat relevant is voor de taak; vat kort samen wat je hebt gelezen. Open of kopieer nooit bestanden met wachtwoorden, tokens of recovery codes, en zet nooit bedrijfs- of klantgegevens in de code.

## Positionering (samenvatting, bron: Tone of Voice Rules)

- Loopwerk verbetert het stuk tussen een klantvraag en het moment waarop een bedrijf kan adviseren, calculeren, offreren of opvolgen.
- Kernbelofte: **Meer uit iedere aanvraag. Minder werk per aanvraag.**
- Techniek volgt op het probleem. AI alleen waar het aantoonbaar helpt.
- Volgorde in teksten: probleem → wat er nu gebeurt → wat Loopwerk verandert → effect → pas dan techniek.
- Geen percentages zonder bewijs. Geen "digitale transformatie", "end-to-end", "AI-powered" e.d.
- CTA's: hoofdknop "Bespreek je proces" → `/contact`; tweede knop "Doe de scan" → `/scan`.
- **AI in de boodschap:** AI krijgt een grotere rol, maar voorlopig via blogs (`src/lib/blog.ts`), niet via een nieuw AI-blok op de site zonder akkoord van Levi. Altijd concreet: wat AI doet en wat de mens doet; bij prijzen/rekenregels bewust géén AI.

## Techniek

- Google Analytics 4: Measurement ID `G-13SJXB5RW7` (standaard in `src/lib/tracking.ts`, laadt pas na cookietoestemming — nooit de Google-snippet los in de site plakken).
- HubSpot-portal: LoopWerk, ID 149185560, regio eu1. Contact-eigenschappen `scan_score`, `scan_richting`, `scan_proces`; bedrijfseigenschappen `loopwerk_sector`, `aanvragen_per_maand`, `loopwerk_knelpunt`, `huidige_systemen`, `eerste_bron`; nulmeting-velden op deals (`nulmeting_*_voor/_na`). Pijplijn `default` heet "Loopwerk trajecten" (fase-ID's 6132543700 t/m 6132543706). Gratis account: geen extra pijplijnen, geen formulieren via de connector, verwijderen kan niet via de connector.

- TanStack Start + React + Tailwind, gebouwd met Lovable. Content staat grotendeels in `src/lib/content.ts`.
- Supabase: `contact_requests` en `scan_leads` (insert-only voor anon, RLS aan). Migraties in `supabase/migrations/`; nieuwe tabellen altijd met expliciete `GRANT`.
- Leads (contact + scan) lopen via `submitLead` in `src/lib/leads.functions.ts` → `src/lib/leads.server.ts`: opslaan in Supabase, doorsturen naar HubSpot (Forms API), notificatiemail via Resend. Honeypot + minimale invultijd tegen spam.
- Env-variabelen (als secret instellen, nooit in code): `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_CONTACT`, `HUBSPOT_FORM_SCAN`, `HUBSPOT_PRIVATE_APP_TOKEN` (deals), `VITE_HUBSPOT_PORTAL_ID`, `VITE_HUBSPOT_REGION`, `VITE_GA4_ID`, `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`. Ontbreken ze, dan wordt die stap overgeslagen.
- Geen API-keys of tokens in de code; gebruik environment variables / Supabase secrets.
- Dit project is gekoppeld aan Lovable: geen force-push of history rewrites (zie `AGENTS.md`).
