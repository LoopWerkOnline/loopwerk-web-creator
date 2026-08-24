# Eerste letter van "GEAUTOMATISEERD" weer volledig zichtbaar

Het label boven de rechte lijn loopt nu links buiten de tekening, waardoor de eerste letter wegvalt. De hele infographic (lijnen, stippen, labels en legenda) schuift een stukje naar rechts zodat er links weer ruimte is.

## Wat er verandert

- De volledige inhoud van de vergelijkings-infographic in de hero schuift ongeveer 16 pixels naar rechts.
- Onderlinge verhoudingen, hoogtes en de al gelijkgetrokken labels blijven exact zoals ze nu zijn.
- De legenda onderaan (Doorlooptijd / Stap / Onderbreking) schuift mee, zodat alles uitgelijnd blijft.

## Technisch

Bestand: `src/components/infographics.tsx`, component `FocusVsChaos`.

- De `viewBox` wordt verruimd aan de linkerzijde (`viewBox="-16 0 416 470"`) in plaats van alle x-coördinaten los aan te passen; dat verschuift alle elementen in één keer en houdt de verhoudingen gelijk.
- Geen wijzigingen aan kleuren, tekengroottes of de lichte variant van het component.
