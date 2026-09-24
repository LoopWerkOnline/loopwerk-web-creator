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

Lees alleen wat relevant is voor de taak; vat kort samen wat je hebt gelezen. Open of kopieer nooit bestanden met wachtwoorden, tokens of recovery codes, en zet nooit bedrijfs- of klantgegevens in de code.

## Positionering (samenvatting, bron: Tone of Voice Rules)

- Loopwerk verbetert het stuk tussen een klantvraag en het moment waarop een bedrijf kan adviseren, calculeren, offreren of opvolgen.
- Kernbelofte: **Meer uit iedere aanvraag. Minder werk per aanvraag.**
- Techniek volgt op het probleem. AI alleen waar het aantoonbaar helpt.
- Volgorde in teksten: probleem → wat er nu gebeurt → wat Loopwerk verandert → effect → pas dan techniek.
- Geen percentages zonder bewijs. Geen "digitale transformatie", "end-to-end", "AI-powered" e.d.
- CTA's: hoofdknop "Bespreek je proces" → `/contact`; tweede knop "Doe de scan" → `/scan`.

## Techniek

- TanStack Start + React + Tailwind, gebouwd met Lovable. Content staat grotendeels in `src/lib/content.ts`.
- Supabase: `contact_requests` (insert-only voor anon, RLS aan). Migraties in `supabase/migrations/`.
- Geen API-keys of tokens in de code; gebruik environment variables / Supabase secrets.
- Dit project is gekoppeld aan Lovable: geen force-push of history rewrites (zie `AGENTS.md`).
