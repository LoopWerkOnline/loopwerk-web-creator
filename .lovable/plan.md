# Video groter maken en infographic verwijderen op homepage

In de "Uitgelicht"-sectie op de homepage wordt de SSPW-demo-video groter weergegeven en de `ConfiguratorFlow`-infographic die eronder staat wordt verwijderd.

## Wat er verandert

- Verwijder `<ConfiguratorFlow className="mt-8 w-full" />` uit de "Uitgelicht"-sectie in `src/routes/index.tsx`.
- Maak de video kolom breder zodat de video groter wordt, bijvoorbeeld door de desktop-grid te wijzigen van `md:grid-cols-[1fr_1.1fr]` naar `md:grid-cols-[1fr_1.6fr]`.
- Behoud de `VideoFrame`-component en het label "Zwembadconfigurator — demo".
- Geen wijzigingen aan andere secties of pagina's.

## Technisch

- Pas `src/routes/index.tsx` aan: verwijder regel 230 (`<ConfiguratorFlow ... />`).
- Pas de gridverhouding op regel 203 aan zodat de rechterkolom (video) meer ruimte krijgt.
- Controleer dat de video op desktop en mobiel goed schaalt zonder de tekstkolom te klein te maken.
