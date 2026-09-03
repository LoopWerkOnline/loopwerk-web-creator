Alle hoofdpagina-heroes donkergroen maken zoals de homepage

Doel
De bovenste sectie (hero/header) van elke hoofdpagina krijgt dezelfde donkergroene achtergrond als de homepage-hero (`bg-ink-hero`), met crèmekleurige tekst (`text-cream`).

Pagina's die worden aangepast
- `/cases/` — huidig `<Section>` (cream) → donkergroene hero
- `/cases/sspw-zwembadconfigurator` — huidig `<Section>` (cream) → donkergroene hero
- `/oplossingen/` — huidig `<Section tone="shell">` → donkergroene hero
- `/oplossingen/$slug` — huidig `<Section tone="shell">` → donkergroene hero
- `/over-loopwerk` — huidig `<Section tone="shell">` → donkergroene hero
- `/contact` — huidig `<Section>` (cream) → donkergroene hero

Aanpak
1. Vervang in elke route de eerste `<Section ...>` door een volledige `<section className="bg-ink-hero text-cream">` met de bestaande `mx-auto max-w-6xl px-5 py-20 md:py-28` wrapper, of pas de `Section`-component aan met een nieuw `tone="hero"` token.
2. Pas tekstkleuren aan zodat headings, body en eyebrow leesbaar zijn op donkergroen:
   - hoofdtekst: `text-cream`
   - ondersteunende tekst: `text-cream/75`
   - eyebrow: `text-sage`
3. Behoud bestaande typografie, afmetingen en CTA-stijl.
4. Bouw de site en controleer visueel per pagina op desktop en mobiel.

Niet aanpassen
- De sticky site-header blijft zoals hij is (transparant/cream).
- Secties onder de hero behouden hun huidige achtergrondkleur.
