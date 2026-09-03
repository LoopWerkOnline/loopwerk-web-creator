# Plan: uitgelichte case-blok aanpassen

## Doel
Het uitgelichte case-blok op de homepage (Sun Sauna & Poolworld / SSPW) moet groter aanvoelen en in het donkere forest-green van Loopwerk worden uitgevoerd, zonder de rest van de pagina aan te passen.

## Keuzes uit de vragen
- **Opzet:** op grote schermen breder naast elkaar, op kleinere laptop/tablet stapelt de video boven de tekst zodat de video nooit te klein wordt.
- **Kleur:** donker forest-green als sectie-achtergrond, met crèmekleurige tekst.

## Wijzigingen

### 1. Sectie-achtergrond donker forest-green maken
- `src/components/Section.tsx` uitbreiden met een `forest`-tone-variant: `bg-forest text-cream`.
- In `src/routes/index.tsx` het uitgelichte case-blok wijzigen van `<Section tone="shell">` naar `<Section tone="forest">`.
- Tekstkleuren in het blok aanpassen aan de donkere achtergrond:
  - eyebrow: copper
  - titel: cream
  - vraag/quote: sage of cream
  - bodytekst: cream/75
  - secundaire link: cream met underline
- De CTA-knop blijft copper.
- De bodytekst vervangen door de nieuwe tekst over Jacques:
  - “Voor Jacques begon een aanvraag vaak pas echt in de zaak. Klanten kwamen langs om samen een zwembad samen te stellen. Zo’n gesprek kon al snel een uur duren — om er soms pas bij de uiteindelijke prijs achter te komen dat die helemaal niet aansloot bij wat de klant in gedachten had.”
  - “Samen met SSPW bouwden we daarom een configurator die klanten vooraf door de belangrijkste keuzes en de bijbehorende prijsrichting leidt. Zo komen mensen beter voorbereid binnen, hebben ze eerder een realistisch beeld van wat mogelijk is en begint het gesprek met Jacques een stuk verder.”

### 2. Layout: video meer ruimte geven
- In `src/routes/index.tsx` het grid van het case-blok aanpassen:
  - `grid-cols-1` op mobiel/tablet
  - `lg:grid-cols-[1.65fr_1fr]` op grote schermen, zodat de video links meer dan 60% van de breedte krijgt.
- Verticale uitlijning bovenaan (`items-start`) behouden op desktop.
- Op tablet/mobiel komt de video boven de tekst te staan; de tekst blijft rustig onderaan uitgelijnd.

### 3. VideoFrame op donkere achtergrond afstemmen
- Indien nodig de rand/achtergrond van `VideoFrame` in dit blok aanpassen zodat het frame niet visueel "drijft" op de groene achtergrond (bijv. donkerdere chrome of subtiele crème rand).

### 4. Geen extra elementen toevoegen
- Geen statistieken, icoonkaarten of verzonnen resultaten.
- Behoud de bestaande tekst en links (`Lees de hele case` en `Bekijk de configurator`).

## Bestanden die worden aangepast
- `src/components/Section.tsx`
- `src/routes/index.tsx`

## Niet in scope
- Herontwerp van andere homepage-secties.
- Wijzigingen aan de case-detailpagina of de configurator-link.
