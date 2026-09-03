# Plan: "Voor wie" en "Hoe we werken" verwijderen

## Doel
De pagina's **Voor wie** (`/sectoren` + alle sectorpagina's) en **Hoe we werken** (`/hoe-we-werken`)
verdwijnen volledig uit de site. De homepage blijft zoals hij is (beide secties blijven staan),
maar zonder links naar de verwijderde pagina's. Oude URL's leiden door naar de homepage.

## Aanpassingen

### 1. Routes verwijderen
- `src/routes/sectoren.index.tsx`
- `src/routes/sectoren.$slug.tsx`
- `src/routes/sectoren.bouw-en-installatie.tsx`
- `src/routes/hoe-we-werken.tsx`

### 2. Oude URL's doorsturen naar de homepage
- `src/routes/werkwijze.tsx` — bestaande redirect wijzigen van `/hoe-we-werken` naar `/`.
- Nieuwe redirect-routes toevoegen zodat `/sectoren`, `/sectoren/...` en `/hoe-we-werken`
  allemaal naar `/` doorsturen (zelfde patroon als de bestaande `/diensten`- en
  `/over-ons`-redirects).

### 3. Navigatie (SiteHeader)
- Desktop: het "Voor wie" mega-menu en het item "Hoe we werken" verwijderen.
- Mobiel menu: de links "Voor wie" en "Hoe we werken" verwijderen.
- Overig menu blijft: Oplossingen, Cases, Over LoopWerk, Bespreek je proces.
- Ongebruikte imports (`sectors` uit content) opruimen.

### 4. Footer (SiteFooter)
- Links "Sectoren" en "Hoe we werken" uit de footer verwijderen.

### 5. Links weghalen waar pagina's verdwijnen (homepage blijft verder ongemoeid)
- `src/routes/index.tsx`: de flip-cards in de "Voor wie"-sectie zijn nu `Link` naar
  `/sectoren/$slug` — kaarten blijven er exact hetzelfde uitzien, maar worden geen link meer.
  De tekstlink "Lees hoe we werken" onder de "Hoe we werken"-sectie verdwijnt.
- `src/routes/oplossingen.$slug.tsx`: de link naar `/sectoren/$slug` onderaan
  oplossingspagina's verwijderen.

### 6. Opruimen
- `src/components/sector-story.tsx` (alleen gebruikt door de verwijderde sectorpagina) verwijderen.
- `sectors`-data in `src/lib/content.ts` blijft bestaan — de homepage flip-cards gebruiken die nog.

## Niet in scope
- De homepage-secties "Voor wie" en "Hoe we werken" blijven volledig zoals ze zijn (teksten,
  foto's, flip-effect, infographics).
- Oplossingen-pagina's, Cases en Over LoopWerk blijven ongewijzigd.

## Technische details
- Geen backend- of datawijzigingen.
- Na het verwijderen van routes worden alle `Link to`-verwijzingen ernaar opgeruimd, anders
  faalt de typecheck (`FileRoutesByPath`).
- Build draaien ter validatie.
