import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BrowserFrame } from "@/components/BrowserFrame";
import { VideoFrame } from "@/components/VideoFrame";
import { sspwStap1, sspwStap2, sspwStap3, sspwZwembad } from "@/lib/assets";
import demoVideo from "@/assets/SSPW_configurator_demo_V2_HQ.mp4.asset.json";

const title = "Case: zwembadconfigurator voor Sun Sauna & Poolworld | LoopWerk";
const description =
  "Hoe Jacques van Sun Sauna & Poolworld het prijsgesprek naar voren haalde: een configurator die bezoekers zelf door maten, opties en prijsrichting leidt en elke aanvraag compleet binnenbrengt.";

const configuratorUrl = "https://offer-calculator-sspw.vercel.app/";

export const Route = createFileRoute("/cases/sspw-zwembadconfigurator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseSSPW,
});

/** De aanvragen zoals ze bij SSPW binnenkwamen — herkenbaar, niet verzonnen resultaten. */
const aanvragen = [
  {
    vraag: "“Wat kost een zwembad ongeveer?”",
    wat: "Geen maat, geen uitvoering, geen budget. Het antwoord kon alle kanten op, dus volgde er een afspraak in de showroom.",
  },
  {
    vraag: "“We willen iets van 8 bij 4, met een trap.”",
    wat: "Concreter, maar filtering, waterbehandeling, verwarming en afdekking bepalen het grootste deel van de prijs. Die kwamen pas in het gesprek ter sprake.",
  },
  {
    vraag: "“Kan het ook goedkoper?”",
    wat: "Deze vraag kwam meestal na een uur praten — als het bedrag niet aansloot bij wat iemand in gedachten had.",
  },
];

const stappen = [
  {
    t: "Stap 1 — Formaat",
    d: "Kies een veelgebruikte maat of geef eigen afmetingen door. Direct zichtbaar wat er standaard bij zit.",
    img: sspwStap1,
    alt: "Stap 1 van de configurator: formaat kiezen met een overzicht van wat standaard is inbegrepen",
  },
  {
    t: "Stap 2 — Uitvoering",
    d: "Trap, verlichting, filtering, waterbehandeling en afdekking. Per keuze de meerprijs, in een meelopende samenvatting.",
    img: sspwStap2,
    alt: "Stap 2 van de configurator: opties kiezen met meerprijzen en een meelopende samenvatting",
  },
  {
    t: "Stap 3 — Prijsindicatie",
    d: "De bezoeker laat zijn gegevens achter en ziet de prijsrichting. SSPW krijgt de complete aanvraag binnen.",
    img: sspwStap3,
    alt: "Stap 3 van de configurator: gegevensformulier met de prijsindicatie",
  },
];

const uitkomsten = [
  "Mensen komen binnen met een realistisch beeld van maat, uitvoering en prijsrichting.",
  "De aanvraag staat compleet in het systeem: keuzes, afmetingen en contactgegevens, zonder overtypen.",
  "Het gesprek met Jacques begint verder — over uitvoering, niet over de basisvragen.",
  "Elke aanvraag is terug te vinden, dus opvolging hangt niet af van wie er die dag in de zaak stond.",
];

function CaseSSPW() {
  return (
    <>
      <Section tone="hero">
        <Eyebrow tone="sage">Case · Sun Sauna &amp; Poolworld</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.08] md:text-6xl">
          Een configurator die het <span className="hand text-[1.1em]">prijsgesprek</span> naar voren
          haalt
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
          Voor Jacques begon een aanvraag vaak pas echt in de zaak. Klanten kwamen langs om samen een
          zwembad samen te stellen. Zo’n gesprek kon al snel een uur duren — om er soms pas bij de
          uiteindelijke prijs achter te komen dat die helemaal niet aansloot bij wat de klant in
          gedachten had.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={configuratorUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Probeer de configurator
          </a>
          <Link
            to="/contact"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Bespreek je proces
          </Link>
        </div>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <Eyebrow>Het bedrijf</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight">Bouwkundige zwembaden, elk project anders</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Sun Sauna &amp; Poolworld levert en bouwt zwembaden op maat. Geen catalogusproduct: maat,
              afwerking, techniek en afdekking verschillen per tuin en per wens. Precies daarom is een
              prijs pas te geven als de belangrijkste keuzes bekend zijn — en precies daarom liep het
              eerste gesprek altijd vol met uitvragen.
            </p>
          </div>
          <figure className="overflow-hidden rounded-xl border border-line">
            <img
              src={sspwZwembad}
              alt="Bouwkundig zwembad in de tuin bij een woning"
              className="block aspect-video w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </Section>

      <Section>
        <Eyebrow>De aanvragen</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl leading-tight">
          Dit is wat er binnenkwam voordat er iets gebouwd was
        </h2>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {aanvragen.map((a) => (
            <div key={a.vraag} className="rounded-xl border border-line bg-shell p-7">
              <p className="hand text-2xl leading-snug text-forest">{a.vraag}</p>
              <p className="mt-4 text-base leading-relaxed text-ink/75">{a.wat}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/75">
          Elke aanvraag was op zichzelf prima. Alleen: het uitzoekwerk lag telkens bij SSPW, en het
          echte antwoord kwam pas aan het eind van een showroomgesprek. Dat deel kan de klant grotendeels
          zelf doorlopen — mits je hem goed door de keuzes leidt.
        </p>
      </Section>

      <Section tone="ink">
        <Eyebrow tone="sage">Wat we bouwden</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">
          Drie stappen van eerste idee naar complete aanvraag
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
          Samen met SSPW bouwden we een configurator die klanten vooraf door de belangrijkste keuzes en
          de bijbehorende prijsrichting leidt. Hieronder zie je hem in werking.
        </p>
        <div className="mt-10">
          <VideoFrame
            src={demoVideo.url}
            alt="Demo van de SSPW-zwembadconfigurator: van opties kiezen tot complete aanvraag"
            label="Zwembadconfigurator — demo"
            variant="dark"
          />
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {stappen.map((s) => (
            <div key={s.t}>
              <BrowserFrame src={s.img} alt={s.alt} label={s.t} />
              <h3 className="mt-5 text-2xl text-cream">{s.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-cream/70">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            href={configuratorUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Doorloop de configurator zelf
          </a>
        </div>
      </Section>

      <Section tone="shell">
        <Eyebrow>Hoe we het aanpakten</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl leading-tight">
          Eerst het gesprek uittekenen, daarna pas schermen
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Meeluisteren met de zaak",
              d: "Welke vragen stelt Jacques altijd, in welke volgorde, en waar haakt een klant af? Dat gesprek is het uitgangspunt geworden voor de stappen in de tool.",
            },
            {
              n: "02",
              t: "Prijsregels vastleggen",
              d: "Maten, opties en meerprijzen zijn omgezet naar regels die SSPW zelf herkent, zodat de uitkomst een prijsrichting is die klopt met de praktijk.",
            },
            {
              n: "03",
              t: "Bouwen en bijstellen",
              d: "Een werkende versie, samen doorlopen, teksten en volgorde aangescherpt. Geen groot traject vooraf, wel een tool die aansluit bij hoe er verkocht wordt.",
            },
          ].map((s) => (
            <li key={s.n} className="rounded-xl border border-line bg-cream p-7">
              <p className="font-display text-3xl text-copper">{s.n}</p>
              <h3 className="mt-3 text-2xl leading-snug">{s.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink/75">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <Eyebrow>Wat het oplevert</Eyebrow>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
          <p className="text-2xl leading-snug">
            Het gesprek gaat over uitvoering in plaats van over basisvragen — en elke aanvraag komt
            compleet binnen.
          </p>
          <ul className="space-y-4 text-ink/75">
            {uitkomsten.map((li) => (
              <li key={li} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                <span className="text-base leading-relaxed">{li}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 max-w-3xl rounded-xl border border-line bg-shell p-7 text-base leading-relaxed text-ink/75">
          Eerlijk erbij: een configurator vervangt het vakgesprek niet. Een zwembad blijft maatwerk en
          de definitieve prijs komt van SSPW zelf. Wat de tool doet, is de eerste ronde uitvragen
          overnemen zodat het gesprek daarna verder begint.
        </p>
      </Section>

      <Section tone="ink">
        <Eyebrow tone="sage">Verder praten</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">
          Begint jouw verkoopgesprek ook telkens bij nul?
        </h2>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
          <Link
            to="/cases"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Bekijk alle cases
          </Link>
          <a
            href="https://www.sspw.nl"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Bekijk sspw.nl
          </a>
        </div>
      </Section>
    </>
  );
}
