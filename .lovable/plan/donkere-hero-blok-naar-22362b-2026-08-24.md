# Donkere hero-blok naar #22362B

## Wat er verandert

Het donkere blok bovenaan de homepage (de hero met "Werk dat elke week terugkomt…" en de cijferbalk) krijgt de nieuwe kleur **#22362B** — iets lichter en groener dan de huidige tint.

Alleen dat blok verandert in deze stap. Alle andere donkere vlakken blijven zoals ze zijn:

- de footer
- de donkere "Over LoopWerk + CTA"-sectie onderaan de homepage
- donkere secties op Oplossingen, Sectoren, Hoe we werken, Over LoopWerk en de SSPW-case

Na de wijziging bekijk je het resultaat in de preview en laat ik je kiezen of we de nieuwe kleur ook op die andere plekken doorvoeren (of overal, als één merkkleur).

## Technisch

- Nieuwe kleurtoken `--ink-hero` in `src/styles.css` (`#22362B` als oklch) plus mapping `--color-ink-hero` in `@theme inline`.
- In `src/routes/index.tsx` gebruikt alleen de hero-`section` `bg-ink-hero` in plaats van `bg-ink`.
- Bestaande `--ink` blijft ongemoeid, zodat de rest van de site niet verandert.
- Cream-tekst op de nieuwe achtergrond even checken op contrast (blijft ruim voldoende).
