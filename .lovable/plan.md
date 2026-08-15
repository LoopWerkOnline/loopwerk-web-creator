# Plan: Loopwerk website

## Product

Een complete bedrijfswebsite voor **Loopwerk** — praktische digitale tools en automatiseringen voor Nederlandse bedrijven, gebouwd met AI. Doel: bezoekers zien in één oogopslag wat Loopwerk voor hen kan betekenen en krijgen het gevoel dat hún probleem opgelost wordt.

## Visuele richting

Gebaseerd op jouw voorbeelden (Lotgenoten Media, CLUB49) en de aangeleverde infographic-screenshots:

- **Kleurpalet.** Cream `#FCF5ED` als basisvlak, dark ink `#1F241F` voor tekst en donkere secties, forest green `#496049` als merkkleur voor vlakken en diagrammen, soft sage `#BAC2B1` voor rustige achtergronden en lijnen, copper orange `#FF6F4E` uitsluitend voor primaire acties en accenten. Het contrast tussen crème en dark ink neemt de rol over van het zwart/wit in jouw voorbeelden — warmer, maar even scherp.
- **Infographics als dragende beeldtaal.** Geen stockfoto's, maar zelfgetekende SVG-diagrammen in de stijl van jouw voorbeelden: puntenlijnen, verbindingen, iconenrijen met korte labels — in forest green en sage op crème, met copper als markering van het beslissende punt. Denk: "8 uur handmatig werk" versus "40 minuten geautomatiseerd", opgebouwd als visuele vergelijking.
- **Handgeschreven accenten.** Koppen combineren een strakke sans-serif met handgeschreven woorden en onderstrepingen/omcirkelingen in copper — persoonlijk en gemaakt, niet gegenereerd.
- **Rust en ruimte.** Veel witruimte, grote typografie, korte krachtige statements. Afwisseling tussen lichte crème-secties en enkele diepe dark-ink-secties voor ritme. Terughoudende animatie: elementen die rustig in beeld tekenen, niets dat opdringt.
- **Vertrouwen.** Concrete cijfers, echte case-informatie en heldere uitleg in plaats van vage AI-beloftes.


## Sitestructuur (aparte pagina's, elk met eigen SEO)

| Pagina | Inhoud |
| --- | --- |
| `/` Home | Hero met scherpe waardepropositie, probleem/oplossing als infographic, diensten in het kort, werkwijze, uitgelichte case (SSPW), CTA |
| `/diensten` | Per dienst uitgewerkt: maatwerk tools & configurators, AI-automatiseringen, koppelingen/integraties. Elk met een eigen infographic |
| `/werkwijze` | Het proces van intake tot oplevering en beheer, visueel als stappenlijn |
| `/cases` | Overzicht van gebouwde tools |
| `/cases/sspw-zwembadconfigurator` | Uitgewerkte case (zie hieronder) |
| `/over-ons` | Verhaal achter Loopwerk, visie op AI, wie erachter zit |
| `/contact` | Contactformulier en directe contactgegevens |

Gedeelde navigatie en footer in de root-layout.

## Uitgelichte case: SSPW zwembadconfigurator

Als bewijsstuk krijgt deze case een eigen pagina, opgebouwd als verhaal:

1. **De situatie** — offertes voor zwembaden zijn complex en kosten veel handmatig uitzoekwerk.
2. **De oplossing** — een configurator in 3 stappen waarmee de bezoeker zelf zijn zwembad samenstelt, met per optie helder wat inbegrepen is en wat erbij komt kijken.
3. **Het resultaat** — de eigenaar ontvangt automatisch een conceptofferte met alle klantgegevens; elke aanvraag wordt opgeslagen als lead.
4. **Infographic** — de flow van de drie stappen naar offerte + leadopslag, in de zwart/wit-diagramstijl.
5. Link naar de live tool op sspw.nl.

Deze case wordt ook op de homepage samengevat als concreet voorbeeld van "dit soort tools bouwen wij".

## Aanpak

1. **Designrichtingen.** Ik genereer 3 visuele richtingen voor de homepage binnen deze zwart/wit-infographic-stijl met handgeschreven accenten. Jij kiest er één.
2. **Designsysteem.** De gekozen richting wordt vastgelegd als kleur-, typografie- en spacing-tokens, inclusief het handgeschreven lettertype, zodat alle pagina's consistent zijn.
3. **Bouwen.** Eerst de homepage volledig, daarna de overige pagina's in dezelfde stijl.
4. **Infographics.** De diagrammen bouw ik als schaalbare SVG in de code (scherp op elk scherm, snel, en later aanpasbaar) in plaats van als platte afbeelding.
5. **Content.** Nederlandse teksten, jouw logo en kleuren. Waar materiaal ontbreekt schrijf ik overtuigende conceptteksten die jij kunt aanscherpen — zonder verzonnen cijfers of reviews.
6. **SEO & responsive.** Per pagina unieke title, meta description en Open Graph-tags, semantische HTML, één H1 per pagina, mobiel-first.
7. **Controle.** Preview doorlopen en build valideren.

## Wat ik van jou nodig heb

- Logo (bij voorkeur SVG of PNG met transparantie)
- Merkkleuren (hex-codes)
- Eventuele screenshots van de SSPW-configurator voor de casepagina
- Concrete resultaten van die case (bijv. bespaarde tijd of aantal leads), als je die wilt tonen

Je kunt dit later uploaden; ik verwerk het zodra het er is.

## Contactformulier

Voor een werkend formulier dat aanvragen opslaat en/of doorstuurt per e-mail zet ik Lovable Cloud aan (database + serverfuncties, geen extern account nodig). Standaard ga ik hiervan uit.

## Techniek

- TanStack Start met React, file-based routing per pagina
- Tailwind CSS met semantische designtokens in `src/styles.css`
- Infographics als inline SVG-componenten
- Responsive, snel en toegankelijk
