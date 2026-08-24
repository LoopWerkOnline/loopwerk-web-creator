# Zwembadfoto op de SSPW-casepagina

De aangeleverde zwembadfoto komt op de plek van de infographic in het blok "De oplossing —
Drie stappen naar een conceptofferte". De infographic verdwijnt niet, maar schuift eronder.

## Wat er verandert

- Boven in het lichte kaartblok komt de zwembadfoto als brede banner (16:9, netjes bijgesneden,
  afgeronde hoeken).
- Direct daaronder blijft de bestaande stappen-infographic staan.
- De rest van de pagina (stapscreenshots, cijfers, tekst) blijft ongewijzigd.

## Techniek

- Foto via `lovable-assets` als CDN-asset toevoegen en exporteren uit `src/lib/assets.ts`.
- In `src/routes/cases.sspw-zwembadconfigurator.tsx` binnen het `Section tone="ink"`-blok een
  `<img>` met `aspect-[16/9] object-cover` boven `<ConfiguratorFlow />` plaatsen, inclusief
  beschrijvende alt-tekst en `loading="lazy"`.
- Build controleren.

Als je met "de omcirkelde infographic" juist de trechter bij "Het probleem" bedoelde, laat het
weten — dan verplaats ik de foto naar dat blok.
