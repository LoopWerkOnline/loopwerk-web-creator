# Sectoren-connector uitlijnen

## Doel
De oranje kronkel-lijn met tekst-pill in de sectorenlijst op de homepage moet precies visueel in het midden komen te liggen tussen de sectortitel (links) en de flip-foto (rechts). Per sectorrij mag de verticale positie verschillen; de rijen hoeven dus niet op één horizontale lijn te staan.

## Aanpak
1. **Huidige structuur herzien.** De lijn zit nu in een vaste middelste kolom (`md:grid-cols-[1fr_14rem_18rem]`). Deze structuur beperkt de lijn tot de middenkolom in plaats van hem tussen titel en foto uit te lijnen.
2. **Nieuwe layout voor de sectorrij.** Gebruik een flex- of grid-opzet waarbij de lijn met de tekst-pill horizontaal wordt gecentreerd tussen de titel en de foto. Opties:
   - De lijn over de volle breedte tussen titel en foto laten lopen, met de pill op 50% van die afstand.
   - Een driekoloms-grid behouden maar de lijn `absolute` positioneren tussen de linker- en rechterkolom.
3. **Per-rij verticale vrijheid.** Zorg dat elke sectorrij zijn eigen hoogte kan bepalen op basis van de inhoud (titel, foto, eventueel meerdere regels), zonder dat alles geforceerd op dezelfde baseline staat. De lijn loopt dan vanuit het midden van de ruimte tussen titel en foto.
4. **Tekst-pill positionering.** De pill blijft leesbaar, gecentreerd op de lijn en eventueel iets vergroot/verschuind zodat hij de lijn niet afsnijdt.
5. **Responsiviteit.** Op mobiel blijft de lijn en pill achterwegen of wordt vereenvoudigd, zoals nu.
6. **Visueel verifiëren.** Preview openen en controleren dat de lijn voor elke sector midden tussen titel en foto ligt.

## Deliverable
Aangepaste `src/routes/index.tsx` (sectoren-sectie) met de uitgelijnde connector en tekst-pill.
