# Plan: Gekronkelde lijn in sectorenblok precies centreren op breed scherm

Op de homepage onder "Sectoren" staat de connector (gekronkelde copper lijn + handgeschreven tekstbubbel) op laptop-breedte niet precies in het midden tussen de sectortitel en de flip-foto. Tablet en mobiel staan goed, dus alleen de desktop-layout wordt aangepast.

## Aanpassing

### `src/routes/index.tsx` — sectorenlijst

1. Verander de desktop grid van:
   ```
   md:grid-cols-[1fr_14rem_18rem]
   ```
   naar:
   ```
   md:grid-cols-[1fr_14rem_1fr]
   ```
   Hierdoor krijgen de titelkolom en de fotokolom evenveel ruimte, waardoor de vaste 14rem connector-kolom exact in het midden van de rij komt te liggen.

2. Wikkel de flip-foto (of de tekst-fallback) in een container met `md:max-w-[18rem] md:justify-self-end` zodat de afbeelding niet over de hele 1fr-kolom uitrekt, maar rechts blijft uitgelijnd op dezelfde breedte als voorheen.

3. Laat de connector-SVG en tekstbubbel ongewijzigd; ze staan al gecentreerd binnen hun eigen kolom.

## Niet in scope

- Mobiele en tablet-layout blijven onveranderd.
- De vorm van de lijn, de tekstbubbel-stijl en de flip-hover blijven hetzelfde.
- Geen wijzigingen in `src/lib/content.ts` of de sector-detailpagina's.

## Vervolgstap

Na goedkeuring pas ik de grid aan en controleer het resultaat in de preview op een breed scherm.
