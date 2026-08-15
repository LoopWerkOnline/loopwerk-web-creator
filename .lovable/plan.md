# Plan: Loopwerk website

## Product

Een complete bedrijfswebsite voor **Loopwerk** — praktische digitale tools en automatiseringen voor Nederlandse bedrijven, gebouwd met AI. Doel: bezoekers zien in één oogopslag wat Loopwerk voor hen kan betekenen en krijgen het gevoel dat hún probleem opgelost wordt.

## Visuele richting

Gebaseerd op jouw voorbeelden (Lotgenoten Media, CLUB49) en de aangeleverde infographic-screenshots:

- **Kleurpalet.** Cream `#FCF5ED` als basisvlak, dark ink `#1F241F` voor tekst en donkere secties, forest green `#496049` als merkkleur voor vlakken en diagrammen, soft sage `#BAC2B1` voor rustige achtergronden en lijnen, copper `#FF6F4E` uitsluitend voor primaire acties en accenten. Het contrast tussen crème en dark ink neemt de rol over van het zwart/wit in jouw voorbeelden — warmer, maar even scherp.
- **Typografie.** Instrument Serif voor koppen (dezelfde editorial rust als in de SSPW-configurator), Instrument Sans voor bodytekst en UI, plus een handgeschreven schrift als accent.
- **Infographics als dragende beeldtaal.** Geen stockfoto's, maar zelfgetekende SVG-diagrammen in de stijl van jouw voorbeelden: puntenlijnen, verbindingen, iconenrijen met korte labels — in forest green en sage op crème, met copper als markering van het beslissende punt.
- **Handgeschreven accenten.** Koppen combineren de serif met handgeschreven woorden en onderstrepingen/omcirkelingen in copper — persoonlijk en gemaakt, niet gegenereerd. Terughoudend ingezet: enkele woorden per pagina, niet elke kop.
- **Rust en ruimte.** Veel witruimte, grote typografie, korte krachtige statements. Afwisseling tussen lichte crème-secties en enkele diepe dark-ink-secties voor ritme. Terughoudende animatie: elementen die rustig in beeld tekenen, niets dat opdringt.
- **Vertrouwen.** Concrete cijfers, echte case-informatie en heldere uitleg in plaats van vage AI-beloftes. Geen stockfoto's, geen AI-agency clichés.
- **Logo.** De bestaande LoopWerk-lockup (donkergroen/copper kruis + "WORKFLOWS. CONNECTED.") blijft leidend. Omdat er alleen een screenshot is, teken ik het logo na als schone SVG in de merkkleuren, zodat het scherp is op elk scherm en werkt op zowel crème als dark ink.



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

Als bewijsstuk krijgt deze case een eigen pagina, opgebouwd als verhaal en gevoed door de cijfers uit jullie intake bij SSPW:

1. **De situatie in cijfers** — 20 serieuze aanvragen per maand, 10 à 15 showroomgesprekken van elk ~1 uur, plus ~1 uur opvolging per gesprek. Circa 7 gesprekken lopen dood op prijs, 3 worden klant. Gemiddelde orderwaarde € 30.000. Belangrijkste afhaakredenen: te duur of concurrent.
2. **De kern van het probleem** — visueel gemaakt als infographic: van ~20 tot 30 uur gesprek- en opvolgtijd per maand gaat een groot deel op aan mensen die op prijs afhaken. Die selectie kan vóór het gesprek plaatsvinden in plaats van erna.
3. **De oplossing** — een configurator in 3 stappen (Formaat → Uitvoering → Prijsindicatie) waarmee de bezoeker zelf zijn zwembad samenstelt, met per stap helder wat standaard inbegrepen is en wat een optie kost.
4. **Het resultaat** — de bezoeker kent zijn prijsbandbreedte vóór het contact; SSPW ontvangt automatisch een conceptofferte met alle klantgegevens en elke aanvraag wordt opgeslagen als lead. Gesprekken gaan daardoor over uitvoering in plaats van over budget.
5. **Beeld** — de aangeleverde screenshots van de drie stappen, in een nette browser-frame-presentatie, plus een SVG-flowdiagram van stap 1 → 2 → 3 → conceptofferte + lead.
6. Link naar de live configurator.

Op de homepage wordt deze case kort samengevat als concreet bewijs: "dit soort tools bouwen wij".

Alle getoonde cijfers komen letterlijk uit jullie intake; ik verzin er niets bij. Waar we een besparing claimen, reken ik die transparant door vanuit deze cijfers.

## Aanpak



1. **Designrichtingen.** Ik genereer 3 visuele richtingen voor de homepage binnen dit palet en deze infographic-stijl met handgeschreven accenten. Jij kiest er één.
2. **Designsysteem.** De vijf kleuren worden vastgelegd als semantische designtokens (achtergrond, tekst, merkkleur, rustig vlak, primaire actie), samen met typografie en spacing, inclusief het handgeschreven lettertype — zodat alle pagina's consistent zijn.

3. **Bouwen.** Eerst de homepage volledig, daarna de overige pagina's in dezelfde stijl.
4. **Infographics.** De diagrammen bouw ik als schaalbare SVG in de code (scherp op elk scherm, snel, en later aanpasbaar) in plaats van als platte afbeelding.
5. **Content.** Nederlandse teksten, jouw logo en kleuren. Waar materiaal ontbreekt schrijf ik overtuigende conceptteksten die jij kunt aanscherpen — zonder verzonnen cijfers of reviews.
6. **SEO & responsive.** Per pagina unieke title, meta description en Open Graph-tags, semantische HTML, één H1 per pagina, mobiel-first.
7. **Controle.** Preview doorlopen en build valideren.

## Wat ik van jou nodig heb

- Logo (bij voorkeur SVG of PNG met transparantie)

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
