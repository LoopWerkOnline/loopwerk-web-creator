# Oplossingen-overzicht als slider met foto's

De rasterweergave met zes oplossingskaarten op de pagina "Oplossingen" wordt een horizontale slider met foto's.

## Wat er verandert

- De zes kaarten komen in één schuifbare rij te staan, één (mobiel) tot twee (desktop) kaarten tegelijk in beeld.
- Navigatie: pijltjesknoppen links/rechts direct bij de sectie, plus swipen/slepen op touch en trackpad. Stipjes eronder tonen de positie.
- Elke kaart krijgt bovenaan een foto (16:9), daaronder het nummer, de titel, de korte tekst en de link "Bekijk deze richting". De hele kaart blijft klikbaar naar de detailpagina.
- Foto's worden toegewezen in de aangeleverde volgorde:
  1. Slimme offerteflow — laptop met dashboard
  2. Aanvragen compleet binnenkrijgen — materiaalstalen op tafel
  3. Calculaties en prijsindicaties versnellen — rekenmachine met berekeningen
  4. Gegevens automatisch verwerken — tablet met grafieken
  5. Opvolging automatiseren — man aan de telefoon met notitieblok
  6. Ander terugkerend werk — nog geen foto; deze kaart krijgt voorlopig een rustig vlak in huisstijlkleur met het nummer groot in beeld, tot je een zesde foto aanlevert.

## Technisch

- Foto's worden via de asset-CLI naar de CDN gezet en als pointer opgenomen; een optioneel `image`/`imageAlt`-veld komt bij `Solution` in `src/lib/content.ts`.
- De slider wordt een kleine client-component (scroll-snap container + knoppen), zonder extra library, in lijn met de bestaande stijl (border-line, cream/shell, copper accenten).
- Alleen `src/routes/oplossingen.index.tsx`, `src/lib/content.ts` en een nieuwe slidercomponent worden aangeraakt; de detailpagina's blijven ongewijzigd.
