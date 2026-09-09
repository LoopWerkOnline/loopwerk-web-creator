import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { VideoFrame } from "@/components/VideoFrame";
import { Reveal } from "@/components/Reveal";
const demoVideo = "/cases/SSPW_configurator_demo_V2_HQ.mp4";

const sspwZwembad = "/cases/sspw-belfeld.jpg";

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
    wat: "Deze vraag kwam meestal na een uur praten, als het bedrag niet aansloot bij wat iemand in gedachten had.",
  },
];

const uitkomsten = [
  "Mensen komen binnen met een realistisch beeld van maat, uitvoering en prijsrichting.",
  "De aanvraag staat compleet in het systeem: keuzes, afmetingen en contactgegevens, zonder overtypen.",
  "Het gesprek met Jacques gaat verder over uitvoering, niet over de basisvragen.",
  "Elke aanvraag is terug te vinden, dus opvolging hangt niet af van wie er die dag in de zaak stond.",
];

function CaseSSPW() {
  return (
    <>
      <Section tone="hero">
        <Reveal>
          <img src="/cases/sspw-logo.png" alt="Logo van Sun Sauna & Poolworld" className="h-24 w-auto rounded-xl md:h-28" />
          <div className="mt-6">
            <Eyebrow tone="sage">Case · Sun Sauna &amp; Poolworld</Eyebrow>
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.08] md:text-6xl">
            Hoe Sun Sauna &amp; Poolworld het <span className="hand text-[1.1em]">prijsgesprek</span> naar
            voren haalde
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
            Voor Jacques begon een aanvraag vaak pas echt in de zaak. Klanten kwamen langs om samen een
            zwembad samen te stellen. Zo’n gesprek kon al snel een uur duren, en soms kwam pas bij de
            uiteindelijke prijs naar voren dat die helemaal niet aansloot bij wat de klant in
            gedachten had.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={configuratorUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
        </Reveal>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>De uitdaging</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight md:text-5xl">
              Elk gesprek begon opnieuw bij nul
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Sun Sauna &amp; Poolworld levert en bouwt zwembaden op maat. Geen catalogusproduct:
              maat, afwerking, techniek en afdekking verschillen per tuin en per wens. Precies
              daarom is een prijs pas te geven als de belangrijkste keuzes bekend zijn, en precies
              daarom liep het eerste gesprek altijd vol met uitvragen.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Elke aanvraag was op zichzelf prima. Alleen: het uitzoekwerk lag telkens bij SSPW, en
              het echte antwoord kwam pas aan het eind van een showroomgesprek. Dat deel kan de
              klant grotendeels zelf doorlopen, mits je hem goed door de keuzes leidt.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-xl border border-line">
              <img
                src={sspwZwembad}
                alt="Bouwkundig zwembad, project van Sun Sauna & Poolworld te Belfeld"
                className="block aspect-video w-full object-cover"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="text-2xl leading-snug">Dit is wat er binnenkwam, elke week weer</h3>
          </Reveal>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {aanvragen.map((a, i) => (
              <Reveal key={a.vraag} delay={i * 0.08} className="rounded-xl border border-line bg-cream p-7">
                <p className="hand text-2xl leading-snug text-forest">{a.vraag}</p>
                <p className="mt-4 text-base leading-relaxed text-ink/75">{a.wat}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <Eyebrow tone="sage">De aanpak</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight md:text-5xl">
              Van eerste idee naar complete aanvraag
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">
              Samen met SSPW bouwden we een configurator die klanten vooraf door de belangrijkste
              keuzes en de bijbehorende prijsrichting leidt. Maat, uitvoering en opties worden
              stapsgewijs duidelijk, met een meelopende samenvatting van de prijs.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">
              Aan het eind laat de bezoeker zijn gegevens achter en ziet hij de prijsrichting. SSPW
              krijgt de complete aanvraag binnen: keuzes, afmetingen en contactgegevens, zonder
              overtypen.
            </p>
            <div className="mt-8">
              <a
                href={configuratorUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Doorloop de configurator zelf
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <VideoFrame
              src={demoVideo}
              alt="Demo van de SSPW-zwembadconfigurator: van opties kiezen tot complete aanvraag"
              label="Zwembadconfigurator demo"
              variant="dark"
            />
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Het resultaat</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
          <Reveal>
            <p className="text-2xl leading-snug">
              Het gesprek gaat over uitvoering in plaats van over basisvragen, en elke aanvraag
              komt compleet binnen.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Mensen komen beter voorbereid binnen en hebben eerder een realistisch beeld van wat
              mogelijk is. Het gesprek met Jacques begint daardoor een stuk verder.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4 text-ink/75">
              {uitkomsten.map((li) => (
                <li key={li} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-home-accent" />
                  <span className="text-base leading-relaxed">{li}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="mt-10 max-w-2xl rounded-2xl border border-line bg-shell p-8 md:p-10">
          <p className="hand text-3xl leading-snug text-forest md:text-4xl">
            Een configurator vervangt het vakgesprek niet.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Een zwembad blijft maatwerk en de definitieve prijs komt van SSPW zelf. Wat de tool doet,
            is de eerste ronde uitvragen overnemen zodat het gesprek daarna verder begint.
          </p>
        </Reveal>
      </Section>

      <Section tone="ink">
        <Reveal>
          <Eyebrow tone="sage">Verder praten</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">
            Begint jouw verkoopgesprek ook telkens bij nul?
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
        </Reveal>
      </Section>
    </>
  );
}
