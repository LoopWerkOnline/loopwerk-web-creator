# Sectorpagina "Bouw & Installatie" — verhalende versie

Deze pagina wordt losgetrokken van het generieke sectorsjabloon (`sectoren.$slug.tsx`) en krijgt een eigen, verhalende route. De rest van de sectorpagina's blijft ongewijzigd.

Aanspreekvorm: **je/jullie** (conform de rest van de site). Alle aangeleverde "u"-teksten worden omgezet met behoud van formulering en ritme.

## Het verhaal op de pagina

1. **Hero** — "De klant vraagt een prijs. Je krijgt er eerst tien vragen bij." Met een subtiele visuele reeks: losse aanvraag links → ontbrekende informatie in het midden → een complete, gestructureerde aanvraag rechts. CTA's: "Bekijk waar het werk ontstaat" en "Bespreek je aanvraagproces".
2. **De echte aanvraag** — een realistisch mailtje van Peter over een warmtepomp, ernaast de "anatomie" van wat nog onbekend is (woningtype, oppervlakte, huidige installatie, verbruik, foto's, planning). Afsluiter: "En dus begint het vragen stellen."
3. **Wat er na 'versturen' gebeurt** — het grote visuele moment: de verticale processtroom van aanvraag binnen tot advies/offerte, met kleine echte kanttekeningen ("Heeft u foto's?", "Even de calculator erbij."). Statement: het waardevolle gesprek begint pas veel later.
4. **Het Loopwerk-moment** — dezelfde klant, maar nu als complete aanvraagkaart (situatie, verbruik, voorkeur, bijlagen, planning, gewenste vervolgstap). Statement: "Dezelfde klant. Dezelfde interesse. Een totaal ander startpunt."
5. **Wat er naar voren schuift** — vijf onderdelen als stukjes van een echt aanvraagproces, elk met een klein stukje UI: slimmer uitvragen (voorwaardelijke vraag), klanten laten kiezen (Basis/Comfort/Uitgebreid als voorbeeld), regels direct toepassen (routering), berekeningen meenemen (opbouw naar prijsrichting) en gegevens doorzetten naar je eigen systeem/opvolging.
6. **Wat het oplevert / wat we volgen** — nuchter en zonder verzonnen percentages: wat je erna kunt zien (completere aanvragen, minder heen-en-weer, snellere eerste reactie).
7. **Eerlijkheidssectie** — "Soms blijkt bestaande software prima te passen. Dan zeggen we dat ook." Plus: "AI waar het helpt. Gewone automatisering waar dat beter werkt."
8. **Slot-CTA** — "Wat gebeurt er bij jullie nadat iemand op 'versturen' klikt?" met "Breng een aanvraag met ons in kaart" en "Plan een kennismaking".

Geen stockfoto's met bouwhelmen, geen feature-cardraster, geen dashboards of AI-beeldtaal. Wel: e-mails, aanvraagkaarten, formuliervelden, procesregels, ontbrekende-informatie-states.

## Techniek

- Nieuwe route `src/routes/sectoren.bouw-en-installatie.tsx` (specifieke route wint van `$slug`), met eigen `head()`-metadata.
- Nieuwe herbruikbare componenten in `src/components/sector-story.tsx`: `IncomingRequest`, `WhatHappensNext`, `BeforeAfterRequest`, `MovedForward`, `WhatWeMeasure` — de basis van een Loopwerk-beeldtaal die andere sectorpagina's later kunnen hergebruiken met eigen voorbeelden.
- Uitsluitend bestaande tokens uit `src/styles.css` (cream, ink, forest, sage, copper, line) en de bestaande `Section`/`Eyebrow`-primitives.
- Desktop: horizontale, ruime editorial processen. Mobiel: dezelfde processen als leesbare verticale stroom, niet verkleind.
- Subtiele fade/verschuif-animaties bij scroll, alleen waar ze de volgorde verduidelijken.
- Interne links naar de bestaande oplossingenpagina's blijven bestaan onderaan.
