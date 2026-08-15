# Plan: Loopwerk website

## Product

Een complete bedrijfswebsite voor **Loopwerk** — praktische digitale tools en automatiseringen voor Nederlandse bedrijven, gebouwd met AI. Doel: bezoekers overtuigen en omzetten in aanvragen/gesprekken.

## Inspiratie uit jouw voorbeelden

Beide referenties (Lotgenoten Media, CLUB49) delen een herkenbare stijl die we als richting nemen:

- Donker, hoog contrast, grote vette typografie met korte krachtige statements ("Schaal wat kan. Bescherm wat telt.")
- Concrete cijfers en bewijs prominent in beeld (aantallen, reviews, resultaten)
- Duidelijke, herhaalde call-to-action door de hele pagina
- Secties die een methodiek/systeem uitleggen in genummerde stappen
- Ruime beeldvoering en rustige, gerichte animatie

Loopwerk krijgt een eigen invulling hiervan: zakelijk en technisch geloofwaardig, niet "hustle"-achtig.

## Sitestructuur (aparte pagina's, elk met eigen SEO)

| Pagina | Inhoud |
| --- | --- |
| `/` Home | Hero met waardepropositie, probleem/oplossing, diensten in het kort, werkwijze, resultaten, CTA |
| `/diensten` | Uitgebreide uitleg per dienst: AI-automatiseringen, maatwerk tools, integraties/koppelingen |
| `/werkwijze` | Stapsgewijs proces van intake tot oplevering en beheer |
| `/cases` | Praktijkvoorbeelden van gebouwde tools en behaalde tijdwinst |
| `/over-ons` | Verhaal achter Loopwerk, visie op AI, team |
| `/contact` | Contactformulier en directe contactgegevens |

Gedeelde navigatie en footer in de root-layout.

## Aanpak

1. **Designrichtingen.** Ik genereer 3 visuele richtingen voor de homepage, gebaseerd op jouw huisstijl en de stijl van de voorbeeldsites. Jij kiest er één.
2. **Designsysteem.** De gekozen richting wordt vastgelegd als kleur-, typografie- en spacing-tokens, zodat alle pagina's consistent zijn.
3. **Bouwen.** Eerst de homepage volledig, daarna de overige pagina's in dezelfde stijl.
4. **Content.** Nederlandse teksten, jouw logo, kleuren en afbeeldingen. Waar jij nog geen materiaal hebt, gebruik ik gegenereerde beelden en overtuigende conceptteksten die jij later kunt aanscherpen.
5. **SEO & responsive.** Per pagina unieke title, meta description en Open Graph-tags, semantische HTML, één H1 per pagina, mobiel-first.
6. **Controle.** Preview doorlopen en build valideren.

## Wat ik van jou nodig heb

- Logo (bij voorkeur SVG of PNG met transparantie)
- Merkkleuren (hex-codes)
- Beeldmateriaal dat je wilt gebruiken
- Eventueel bestaande teksten of dienstomschrijvingen

Je kunt dit in een volgend bericht uploaden; ik verwerk het tijdens de bouw.

## Contactformulier

Voor een werkend formulier dat aanvragen opslaat en/of e-mail verstuurt, zet ik Lovable Cloud aan (database + serverfuncties, geen extern account nodig). Zonder Cloud wordt het een `mailto`-link. Standaard ga ik uit van een werkend formulier met Cloud.

## Techniek

- TanStack Start met React, file-based routing per pagina
- Tailwind CSS met semantische designtokens in `src/styles.css`
- Responsive, snel en toegankelijk
