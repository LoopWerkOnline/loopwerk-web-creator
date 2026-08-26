# Plan: tekstkolom Uitgelicht bovenaan uitlijnen

## Doel
De tekst in de “Uitgelicht”-sectie moet net zo dicht bij de bovenkant van de sectie beginnen als bij de andere secties op de homepage.

## Huidige situatie
- In `src/routes/index.tsx` heeft de “Uitgelicht”-sectie een grid met `md:items-center`.
- De rechterkolom (browser screenshot + stappen-infographic) is aanzienlijk hoger dan de tekstkolom.
- Door `items-center` wordt de tekstkolom verticaal gecentreerd ten opzichte van die hoge rechterkolom, waardoor de kop “Slimme offerteflow” lager begint dan bij andere secties.

## Gewenste situatie
- De tekstkolom begint op dezelfde hoogte als de eyebrow/kop in andere secties.
- De rechterkolom blijft ongewijzigd.

## Wijziging
- Bestand: `src/routes/index.tsx`
- In de “Uitgelicht”-sectie (regio rond regel 203):
  ```tsx
  <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
  ```
  wijzigen naar:
  ```tsx
  <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start">
  ```

## Niet in scope
- Geen wijzigingen aan andere secties, tenzij de gebruiker aangeeft dat die hetzelfde probleem hebben.
- Geen wijzigingen aan inhoud, kleuren of typografie.
