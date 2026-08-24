# Case-blok van de homepage halen

Het omcirkelde blok is de sectie "Case — SSPW: van elk gesprek opnieuw uitvragen naar een
complete aanvraag", inclusief de link "Lees de case" en het diagram ernaast.

## Wat er verandert

- Deze sectie verdwijnt van de homepage. De pagina gaat dan van het blok "Slimme offerteflow"
  direct naar "Hoe we werken".
- De casepagina zelf (`/cases/sspw-zwembadconfigurator`) en het overzicht `/cases` blijven
  ongewijzigd bestaan en blijven bereikbaar via de navigatie.

## Techniek

- In `src/routes/index.tsx` de `{/* Case */}`-sectie (regels 189-211) verwijderen.
- Ongebruikte import `BaseAndCustom` opruimen als die daarna nergens anders op de pagina
  wordt gebruikt.
- Build controleren.
