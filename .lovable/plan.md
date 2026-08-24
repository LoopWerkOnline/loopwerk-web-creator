Cases-pagina: foto in plaats van infographic

## Doel
- De zwembad-stockfoto die nu op de SSPW-casepagina staat, verplaatsen naar de Cases-overzichtspagina.
- Op de Cases-overzichtspagina de huidige `ConfiguratorFlow`-infographic vervangen door deze stockfoto.
- De foto verwijderen uit de SSPW-casepagina.

## Te wijzigen bestanden

1. `src/routes/cases.index.tsx`
   - Importeer `sspwZwembad` uit `@/lib/assets`.
   - Verwijder de import van `ConfiguratorFlow` uit `@/components/infographics`.
   - Vervang in het SSPW-case-kaartje de infographic (`<ConfiguratorFlow className="w-full" />`) door een `<img>` met `src={sspwZwembad}` en passende `alt`-tekst.
   - Zorg dat de foto netjes rechts in de gridcel valt, zonder de rest van de layout te verstoren.

2. `src/routes/cases.sspw-zwembadconfigurator.tsx`
   - Verwijder de import van `sspwZwembad` uit `@/lib/assets`.
   - Verwijder de `<img>` met `src={sspwZwembad}` in de "De oplossing"-sectie, zodat alleen de drie stappen-screenshots en de `ConfiguratorFlow` overblijven.
   - Laat de rest van de pagina intact.

## Niet wijzigen
- De `ConfiguratorFlow` component zelf blijft bestaan; hij wordt alleen niet meer op de Cases-overzichtspagina gebruikt.
- De kleuren, typografie en overige pagina's blijven ongewijzigd.

## Verificatie
- Controleer dat de Cases-overzichtspagina de foto toont in plaats van de infographic.
- Controleer dat de SSPW-casepagina geen foto meer bevat in het "De oplossing"-blok.
- Build/typecheck moet slagen.
