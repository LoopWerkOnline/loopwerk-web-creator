# Plan: Creatieve visuele flow tussen sectortitel en foto

Gebruiker heeft gekozen voor richting **v2 — Editorial path flow**: een handgetekende, gestippelde copper lijn tussen de sectortitel (links) en de flip-foto (rechts), met een korte handgeschreven kernzin in de tussenruimte.

## Wat we gaan bouwen

De "Sectoren"-sectie op de homepage krijgt per sectorrij een visueel verbindend element tussen de titel en de foto. De bestaande flip-foto bij hover blijft intact.

## Aanpassingen

### 1. Data-uitbreiding (`src/lib/content.ts`)
- Voeg aan elk `Sector`-object een optioneel `flowLabel` toe.
- Geef elke sector een korte, eigen handgeschreven tag, passend bij de richting:
  - Bouw & installatie — "van opname naar offerte"
  - Maakindustrie & machinebouw — "configureren zonder engineering"
  - Handel & groothandel — "prijs en voorwaarden helder"
  - Mobiliteit & transport — "opties helder uitgeschreven"

### 2. Sectoren-rij op de homepage (`src/routes/index.tsx`)
- Verander de huidige 2-koloms layout (`md:grid-cols-[1fr_18rem]`) in een 3-koloms layout:
  - Links: sectortitel.
  - Midden: connector (SVG) + handgeschreven label.
  - Rechts: bestaande flip-foto (18rem breed).
- Gebruik de bestaande hand-lettertype class voor de `flowLabel`.
- Zorg dat de titel en het label op dezelfde verticale lijn blijven uitlijnen.

### 3. Visuele connector
- Een subtiele SVG-lijn in copper (`--copper`) met `stroke-dasharray`, die visueel van de titel naar de foto loopt.
- Twee kleine copper stippen aan begin en eind.
- De lijn krijg een lage opacity zodat het niet het beeld gaat domineren.

### 4. Responsief gedrag
- Op desktop (`md:` en groter): 3-koloms opzet met connector.
- Op mobiel: titel en foto onder elkaar; de connector verbergen of vereenvoudigen zodat de lijst overzichtelijk blijft.

### 5. Stijlregels
- Geen hardcoded kleuren; gebruik bestaande tokens (`--copper`, `--ink`, `--sage`, `--cream`).
- Behoud de huidige typografie, afstanden en flip-CSS-utility.
- Controleer dat de sector-detailpagina (`/sectoren/$slug`) niet breekt door de data-uitbreiding.

## Niet in scope
- Aanpassen aan de sector-detailpagina's (behalve type-compatibiliteit).
- Nieuwe afbeeldingen of animaties buiten de gekozen richting.
- Wijzigen van de navigatie "Voor wie".

## Vervolgstap
Na goedkeuring implementeren we deze wijzigingen en bekijken we het resultaat in de preview.
