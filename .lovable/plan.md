# Nieuw logomerk in de header

Het nagetekende kruis-icoon links naast "LoopWerk" wordt vervangen door het geüploade ronde pijl-icoon. De afmeting van het merk en de rest van de lockup (woordmerk + tagline) blijven exact zoals nu.

## Wat er verandert

- Het geüploade icoon wordt bijgesneden (de lege ruimte rondom wordt weggehaald) zodat het beeldmerk net zo groot oogt als het huidige icoon.
- Het icoon komt als CDN-asset in het project en vervangt de getekende SVG in de logo-component.
- Het logo wordt op alle plekken gebruikt waar de component nu al staat: header (donkere en lichte variant) en footer.
- Omdat het icoon donkergroen is, krijgt het op donkere achtergronden (footer, mobiel menu) een lichte weergave zodat het zichtbaar blijft. De vorm blijft identiek.

## Technisch

- Bijsnijden van `ChatGPT_Image_Aug_24_2026_at_06_25_02_PM-Photoroom.png` naar de bounding box van het merk, daarna `lovable-assets create` → `src/assets/loopwerk-mark.png.asset.json`.
- `src/components/Logo.tsx`: de inline `<svg>` vervangen door `<img src={mark.url} alt="" className="h-9 w-9 shrink-0" />`; voor `variant="cream"` een CSS-filter (brightness/invert-achtig) of `opacity`-loze lichte weergave toepassen zodat het merk op donkere vlakken leesbaar blijft.
- Geen wijzigingen aan tekstgroottes, spacing of gebruik van de component elders.
