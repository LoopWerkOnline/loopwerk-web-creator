# Homepage accentkleur aanpassen naar #D6C7A5

## Doel
Alle oranje/copper accenten op de homepage (`/`) wijzigen naar de nieuwe kleur `#D6C7A5`. Overige pagina's blijven ongemoeid totdat jij aangeeft dat dit ook moet.

## Aanpassingen

### 1. Nieuwe kleur-token toevoegen
- Bestand: `src/styles.css`
- Onder de LoopWerk merkkleuren in `@theme inline` toevoegen:
  ```css
  --color-home-accent: var(--home-accent);
  ```
- In `:root` toevoegen:
  ```css
  --home-accent: #D6C7A5;
  ```
- Dit maakt `bg-home-accent`, `text-home-accent` en `border-home-accent` beschikbaar zonder de bestaande `--copper` token te verstoren.

### 2. Vervang copper op de homepage
- Bestand: `src/routes/index.tsx`
- Vervang op deze plekken `bg-copper` → `bg-home-accent` en `text-copper` → `text-home-accent`:
  1. Hero primaire CTA "Bespreek je proces".
  2. Hero statistieken cijfers ("20 u", "3 stappen", "1 tool").
  3. Eyebrow "Herkenbaar?".
  4. Oplossingen nummerbadges ("01" t/m "06").
  5. Sectoren: gekronkelde lijn, cirkels en tekstbubbel rand/tekst.
  6. Uitgelichte case eyebrow "UITGELICHTE CASE".
  7. Uitgelichte case CTA "Lees de hele case".
  8. "Hoe we werken" nummerbadges ("01" t/m "03").
  9. Over + CTA button "Bespreek je proces".
- Voor de handgeschreven `.hand` tekst (hero "handwerk" en case-quote) voegen we op die specifieke elementen `text-home-accent` toe als override, zodat de global `.hand` utility ongemoeid blijft voor andere pagina's.

### 3. Randkleur aanpassen
- Sectoren tekstbubbel gebruikt `border-copper/20`; dit wordt `border-home-accent/20`.

### 4. Verificatie
- `bun run build` draaien.
- Visuele check via preview / Playwright screenshot van homepage.

## Niet in scope
- Andere pagina's dan `/`.
- Aanpassing van de global `--copper` token.
- Wijzigingen aan knopvormgeving of layout.

## Vervolgvraag
Na implementatie vraag ik of de nieuwe accentkleur ook doorgevoerd moet worden op de overige pagina's (Oplossingen, Cases, Contact, Over ons).
