# Sectorenblok op de homepage: foto's met flip-hover

Het omcirkelde blok "We kennen het werk waar de tijd in gaat zitten" wordt een rij van vier
sectorkaarten met de aangeleverde stockfoto's.

## Wat er verandert

- Per sector staat links de titel en rechts de foto (dezelfde volgorde als in de navigatie):
  1. Bouw & installatie — bouwvakker/steigerfoto
  2. Maakindustrie & machinebouw — machine/graafmachinefoto
  3. Handel & groothandel — badkamer/sanitairfoto
  4. Mobiliteit & transport — vrachtwagenfoto
- De beschrijvende tekst staat niet meer standaard in beeld.
- Bij hover (of tap op mobiel) draait de afbeelding om (3D-flip) en verschijnt op de achterkant
  de bijbehorende tekst in de merkkleuren, met de link naar de sectorpagina.
- Op mobiel/touch: geen hover, dus de kaart toont daar titel + tekst zonder flip zodat de
  informatie bereikbaar blijft.

## Techniek

- De vier uploads via `lovable-assets` als CDN-assets toevoegen en koppelen in `src/lib/content.ts`
  (nieuw veld `image` per sector).
- In `src/routes/index.tsx` de lijst met sectoren vervangen door een grid van flipkaarten.
- Flip via een kleine utility in `src/styles.css` (`perspective`, `transform-style: preserve-3d`,
  `backface-visibility: hidden`) met `prefers-reduced-motion`-fallback naar een fade.
- Alt-teksten per foto; build controleren.
