# Plan: inhoud uit "Aanzet Levi" doorvoeren op de site

Het document is geen herstart, maar een aanscherping. De kern die nu op de site ontbreekt:
**bekend probleem → bestaande oplossingsrichting → passend maken voor het bedrijf**, plus een
tweede binnenkomstroute via **sectoren** voor bedrijven die hun probleem nog niet benoemen.
Ook belangrijk: SSPW eerlijk als "implementatie in voorbereiding" tonen in plaats van als
afgerond resultaat.

## Wat er verandert in de structuur

Huidige navigatie: Home · Diensten · Werkwijze · Cases · Over ons · Contact
Nieuwe navigatie: **Home · Oplossingen · Sectoren · Cases · Hoe we werken · Over Loopwerk · Contact**

| Nu | Straks |
| --- | --- |
| `/diensten` | wordt `/oplossingen` — overzicht van de 6 oplossingsrichtingen uit het document, elk met eigen subpagina |
| — | `/oplossingen/slimme-offerteflow` (uitgelicht) + subpagina's voor de overige richtingen |
| — | `/sectoren` overzicht + 5 sectorpagina's (bouw & installatie, maakindustrie & machinebouw, handel & groothandel, mobiliteit & transport, maatwerk & projectverkoop) |
| `/werkwijze` | wordt `/hoe-we-werken`, met nadruk op wat standaard is en waar maatwerk begint |
| `/cases` | zelfde plek, casestructuur uit het document (situatie → probleem → oplossing → maatwerk → nieuwe werkwijze → status) |
| `/over-ons` | wordt `/over-loopwerk` |

Oude URL's blijven werken via een redirect, zodat de gedeelde preview-link en eventuele
verwijzingen niet breken.

Vaste CTA overal: **"Bespreek je proces"** (vervangt "Plan een gesprek").

## Homepage in de volgorde uit het document

1. Hero — "Minder handwerk in processen die iedere week terugkomen."
2. Herkenningsblok — het verhaal van de aanvraag die vier handmatige stappen kost
3. Oplossingen — de zes richtingen kort, doorklikbaar
4. Sectoren — vertaalslag naar het soort bedrijf van de bezoeker
5. Uitgelichte oplossing — Slimme Offerteflow, concreet gemaakt met een infographic
6. Cases — SSPW als bewijs van wat we bouwen
7. Hoe we werken — standaard versus maatwerk
8. Over Loopwerk
9. CTA — Bespreek je proces

De cijferbalk met "20 u handwerk" verhuist naar de SSPW-case: dat zijn cijfers van die klant,
niet van Loopwerk. Op de homepage komt daarvoor in de plaats het herkenningsblok.

## Tone of voice

Alle bestaande teksten gaan langs de niet/wel-tabel uit het document: geen "digitale
transformatie", geen geclaimde resultaten, wel concrete stappen. Ook de aanspreekvorm wordt
consistent: het document schrijft "je/jullie", de huidige site "u". Zie de vraag hieronder.

## Eerlijk over status

De SSPW-case krijgt bovenaan een duidelijke statusmelding: implementatie in voorbereiding.
De intakecijfers blijven staan als beschrijving van de uitgangssituatie, niet als behaald
resultaat. Zodra de tool live is, vullen we tijd, volledigheid van aanvragen en conversie aan.

## Infographics

Nieuwe SVG-diagrammen in dezelfde stijl:
- **Basis + maatwerk** — een bestaande bouwsteen die per bedrijf wordt aangevuld met producten,
  regels, uitzonderingen en systemen
- **Slimme offerteflow** — van vraag naar complete aanvraag naar voorstel

## Screenshots van de SSPW-configurator

De live tool (offer-calculator-sspw.vercel.app) is doorlopen; van elke stap zijn schermafbeeldingen
beschikbaar. Die gebruik ik als bewijsmateriaal:

- **Casepagina SSPW** — de drie stappen onder elkaar in een strak browserframe, elk met een korte
  uitleg ernaast: welk deel van het gesprek deze stap vervangt.
- **Homepage, blok "uitgelichte oplossing"** — één bijgesneden detail (de optielijst met
  meerprijzen) naast de tekst over de Slimme Offerteflow.
- **Oplossingspagina Slimme Offerteflow** — dezelfde beelden, uitgebreider toegelicht.

De screenshots worden als CDN-asset opgenomen, met alt-teksten en lazy loading. Het prijsscherm na
verzending ontbreekt nog: dat vraagt een echte formulierinzending bij SSPW. Aan te leveren door
jullie, of ik verstuur eenmalig een duidelijk herkenbare testaanvraag.


## Techniek

- Nieuwe routes onder `src/routes/`, oude paden als redirect
- Oplossings- en sectorcontent in één datamodule, zodat overzicht, subpagina's en homepageblokken
  uit dezelfde bron komen
- Per pagina unieke title, meta description en Open Graph-tags
- Bestaand designsysteem en contactformulier blijven ongewijzigd

## Volgorde van uitvoeren

1. Navigatie, routes en redirects
2. Homepage herbouwen in de nieuwe volgorde
3. Oplossingen-overzicht en -subpagina's
4. Sectorenpagina's
5. Cases herschrijven volgens het vaste stramien, inclusief SSPW-status
6. Hoe we werken en Over Loopwerk aanscherpen
7. Nieuwe infographics
8. Preview doorlopen en build valideren

## Nog vast te leggen

- **Aanspreekvorm**: het document gebruikt "je/jullie", de site nu "u". Ik stel voor de hele site
  om te zetten naar "je/jullie" — past beter bij de nuchtere toon.
- **Sectoren**: alle vijf publiceren, of eerst de twee waar jullie nu actief op inzetten?
- **Oplossingen**: krijgen alle zes een eigen subpagina, of alleen de Slimme Offerteflow en de
  rest als blok op het overzicht?
- **Cases**: is SSPW voorlopig de enige case?
