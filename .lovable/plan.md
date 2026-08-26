# Plan: Case-sectie verwijderen van homepage

## Doel
Verwijder de "Case"-sectie op de homepage, zodat de "Uitgelicht"-sectie direct overgaat in de "Hoe we werken"-sectie.

## Wijziging
- Bestand: `src/routes/index.tsx`
- Verwijder de hele `{/* Case */}`-sectie (regels 235-257 in de huidige versie).
- De sectie bevat de titel "SSPW: van elk gesprek opnieuw uitvragen naar een complete aanvraag", een beschrijving, een "Lees de case"-link en de `BaseAndCustom`-infographic.
- De SSPW-casepagina (`/cases/sspw-zwembadconfigurator`) en de Cases-overzichtspagina blijven ongewijzigd en bereikbaar via de navigatie.

## Impact
- Homepage heeft één sectie minder.
- Geen verwijzingen naar `BaseAndCustom` in `src/routes/index.tsx` meer; de import kan blijven staan omdat het component elders ook gebruikt wordt, maar wordt niet meer gebruikt op deze route.
- Geen functionele wijzigingen aan navigatie, routing of andere pagina's.
