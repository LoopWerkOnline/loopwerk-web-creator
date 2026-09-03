# Video in uitgelichte oplossing op homepage

De screenshot in de "Uitgelicht"-sectie op de homepage (het omcirkelde stuk) wordt vervangen door de aangeleverde SSPW-configurator-demo-video. De video behoudt dezelfde grootte en verhouding als de huidige afbeelding.

## Wat er verandert

- Op `/src/routes/index.tsx` vervangen we het `<BrowserFrame>`-blok in de "Uitgelicht"-sectie door een video in hetzelfde browserframe-achtige kader.
- De video wordt geüpload als Lovable Asset en opgeslagen in `src/assets/SSPW_configurator_demo_V2_HQ.mp4.asset.json`.
- Er komt een kleine `VideoFrame`-component in `src/components/VideoFrame.tsx` die het browserframe-kader hergebruikt, maar in plaats van een `<img>` een `<video>` toont.
- De video krijgt dezelfde afmetingen als de huidige afbeelding: 100% breedte, autoplay, muted, loop, en inline afgespeeld. Bedieningsknoppen blijven zichtbaar zodat bezoekers kunnen pauzeren.
- Het label in het kader blijft "Zwembadconfigurator — demo".
- De `ConfiguratorFlow`-infographic blijft onder de video staan.

## Technisch

- Upload via `lovable-assets create --file /mnt/user-uploads/SSPW_configurator_demo_V2_HQ.mp4 --filename SSPW_configurator_demo_V2_HQ.mp4`.
- Importeer de asset-pointer in `src/routes/index.tsx`.
- Maak `src/components/VideoFrame.tsx` op basis van `BrowserFrame`, met props: `src`, `alt`, `label`, `className`.
- Vervang in `src/routes/index.tsx` regels 225-229 door `<VideoFrame src={demoVideo.url} alt="..." label="..." />`.
- Geen wijzigingen aan andere secties of pagina's.
