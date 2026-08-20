# Aanvullingen op de huidige LoopWerk-website

De site heeft nu een sterke structuur: heldere navigatie, zes oplossingen, vier sectoren, een concrete case met echte cijfers, een werkwijze-pagina, Over LoopWerk en een werkend contactformulier. De volgende aanvullingen zorgen voor meer vertrouwen, betere conversie en meer organisch verkeer.

## Prioriteit 1 — Vertrouwen en social proof

- **Klantlogo-strip** op de homepage en case-pagina, beginnend met SSPW (later makkelijk uitbreidbaar).
- **Testimonial-blok** op de homepage: 1-2 korte quotes. Later kan dit doorgroeien naar een aparte pagina.
- **"Waarom LoopWerk"** micro-blok op de homepage: drie korte garanties (eerlijk advies, korte lijnen, werkende basis).

## Prioriteit 2 — Veelgestelde vragen (FAQ)

- Nieuwe route `/veelgestelde-vragen` met categorieën: aanpak, kosten, techniek en samenwerking.
- Link vanuit de footer, de contactpagina en het mobiele menu.
- FAQ-JSON-LD schema voor SEO-rich-snippets.

## Prioriteit 3 — Prijs- en aanpakpagina

- Nieuwe route `/prijs` die het prijsmodel uitlegt: intakegesprek, vaste basis, maatwerkmodules en een voorbeeldbandbreedte.
- Geen offertes op de site, wel verwachtingsmanagement.

## Prioriteit 4 — Contact en juridische basis

- **Contactpagina verrijken** met e-mailadres, telefoonnummer en eventueel een Calendly-link.
- **Privacy-pagina** (`/privacy`) en een **cookie-toestemmingsbanner**.
- **404-pagina** met vriendelijke tekst en links naar oplossingen en contact.

## Prioriteit 5 — SEO en techniek

- `sitemap.xml` en correcte canonical tags.
- JSON-LD `Organization` schema op de homepage.
- Favicon / apple-touch-icon.
- Analytics-integratie (bijvoorbeeld Google Analytics 4 of Plausible) indien gewenst.

## Prioriteit 6 — Interactief lead magnet

- Mini **"Procescheck"** op de homepage: 3-5 vragen over handmatig werk.
- Het resultaat geeft aan welke oplossingsrichting past, meteen gevolgd door een CTA naar het contactformulier.

## Prioriteit 7 — Content / kennisbank

- Nieuwe route `/kennisbank` met artikelen rond herkenbare problemen, bijvoorbeeld:
  - "Hoeveel kost een offerteflow echt?"
  - "Wanneer is automatiseren niet de moeite waard?"
- Goed voor SEO en voor bezoekers die nog niet direct klaar zijn voor contact.

## Technische invulling

- Nieuwe routes onder `src/routes/`: `veelgestelde-vragen.tsx`, `prijs.tsx`, `privacy.tsx`, `kennisbank.index.tsx`, `kennisbank.$slug.tsx`.
- Aanpassen `SiteHeader` en `SiteFooter` voor de nieuwe links.
- Behouden huidige design tokens, typografie en toon.
- Contact_requests-tabel blijft bestaan; de Procescheck kan opslaan als lead of alleen anoniem doorzetten naar contact.

## Nog vast te leggen

- Wil je alle prioriteiten tegelijk bouwen, of eerst een paar?
- Heb je al klantquotes / logo-toestemming van SSPW?
- Welk e-mailadres en telefoonnummer mogen op de contactpagina?
- Wil je een Calendly- of afsprakenlink gebruiken?
- Heb je een voorkeur voor analytics (GA4, Plausible, geen)?
