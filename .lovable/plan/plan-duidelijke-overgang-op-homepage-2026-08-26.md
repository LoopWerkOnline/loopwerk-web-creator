# Plan: duidelijke overgang op homepage

## Doel
Zorgen voor een even duidelijke sectie-overgang tussen "Uitgelicht" en "Hoe we werken" als tussen de andere blokken op de homepage, en de gevraagde titeltekst aanpassen.

## Wijzigingen

1. **Titeltekst aanpassen in "Hoe we werken"**
   - Bestand: `src/routes/index.tsx`
   - Wijzig de `h2` op regel ~240 van:
     ```
     Kijken wat er gebeurt, bepalen wat het waard is, dan pas bouwen
     ```
     naar:
     ```
     Kijken naar jou proces, bepalen wat beter kan, dan pas bouwen
     ```

2. **Visuele overgang herstellen**
   - Bestand: `src/routes/index.tsx`
   - Verander de `Section` van "Hoe we werken" van `tone="shell"` naar `tone="cream"`.
   - Dit sluit aan bij het bestaande ritme van de homepage:
     ```text
     Hero        = ink
     Herkenning  = cream
     Oplossingen = shell
     Sectoren    = cream
     Uitgelicht  = shell
     Hoe we werken = cream  (gewijzigd)
     Over + CTA  = ink
     ```
   - De achtergrondkleur wisselt daardoor net als tussen de andere secties, waardoor de overgang direct zichtbaar wordt zonder extra decoratieve elementen.

3. **Controle responsive gedrag**
   - De wijziging heeft geen invloed op mobiele of tablet-weergave; de padding en grid van `Section` blijven ongewijzigd.

## Niet in scope
- Geen wijzigingen aan navigatie, footer of andere pagina's.
- Geen nieuwe componenten of afbeeldingen toevoegen.
