# Labels in de hero-infographic gelijktrekken

De twee labels boven de infographic ("GEAUTOMATISEERD" en "HANDMATIG") krijgen dezelfde grootte, kleur en dezelfde afstand tot de tekening eronder. "HANDMATIG" komt exact gecentreerd boven de bovenste stip van de zigzaglijn, "GEAUTOMATISEERD" exact gecentreerd boven de rechte lijn.

## Wat er verandert

- Beide labels: identieke tekengrootte en identieke kleur/transparantie (nu is links de sage-lijnkleur en rechts de crèmekleur op 60%).
- "GEAUTOMATISEERD" wordt gecentreerd boven de rechte lijn in plaats van links uitgelijnd.
- "HANDMATIG" wordt gecentreerd boven de bovenste stip van de zigzag.
- De zigzaglijn schuift een paar pixels naar beneden zodat de bovenste stip op dezelfde hoogte staat als de bovenste stip van de rechte lijn. Daardoor is de witruimte tussen label en tekening voor beide kolommen exact gelijk en staan de labels op dezelfde hoogte.

## Technisch

Bestand: `src/components/infographics.tsx`, component `FocusVsChaos`.

- `chaos`-punten: y-waarden +10 zodat het eerste punt op y=40 ligt (gelijk aan de eerste stip van de rechte lijn); onderste punten iets inkorten zodat alles binnen de viewBox blijft. `noise`-punten in dezelfde mate meeschuiven.
- Labels: beide `<text>` op `y="18"`, `fontSize="11"`, `textAnchor="middle"`, met dezelfde `fill` en `opacity`; x = 70 (rechte lijn) en x = 250 (zigzag-top).
- Geen wijziging aan de legenda of de lichte variant van het component.
