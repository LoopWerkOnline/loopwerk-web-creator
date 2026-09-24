import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const title = "Werkwijze | zo verloopt een traject met LoopWerk";
const description =
  "Van eerste gesprek tot werkende tool: wat er in elke stap gebeurt, wat je van ons krijgt en wat we van jou nodig hebben.";

const steps: { n: string; t: string; b: string; jij: string }[] = [
  {
    n: "01",
    t: "Kennismaken",
    b: "Je vertelt waar het werk blijft hangen. Wij stellen vragen tot we snappen wat er na een aanvraag gebeurt. Vrijblijvend, en je praat meteen met de mensen die het bouwen.",
    jij: "Een uur tijd en een paar voorbeelden van echte aanvragen.",
  },
  {
    n: "02",
    t: "Proces doorlopen en meten",
    b: "We lopen het proces stap voor stap door en leggen vast hoe het nu gaat: hoe lang een aanvraag kost, hoe vaak er informatie ontbreekt, hoe lang het duurt tot er een offerte ligt. Dat is de nulmeting.",
    jij: "Toegang tot de mensen die het werk nu doen, en inzicht in de huidige formulieren, mails of Excel-bestanden.",
  },
  {
    n: "03",
    t: "Voorstel",
    b: "Je krijgt een voorstel met wat we bouwen, wat het oplevert en wat het kost. Levert het te weinig op, of past standaardsoftware beter, dan zeggen we dat hier. Voordat er iets gebouwd is.",
    jij: "Een besluit: door, aanpassen of niet.",
  },
  {
    n: "04",
    t: "Bouwen",
    b: "We starten vanuit een bestaande basis en maken op maat wat bij jullie werk hoort: jullie vragen, producten, prijzen en regels. Tussendoor zie je werkende versies, geen rapporten.",
    jij: "Korte feedback op tussenversies.",
  },
  {
    n: "05",
    t: "Live en bijstellen",
    b: "De tool gaat live op jullie site of in jullie systemen. De eerste echte aanvragen kijken we mee en stellen we bij waar nodig.",
    jij: "Laten weten wat in de praktijk anders loopt dan gedacht.",
  },
  {
    n: "06",
    t: "Nameten",
    b: "Na livegang meten we dezelfde punten als bij de nulmeting. Dan zie je zwart op wit wat er veranderd is, zonder mooie praatjes.",
    jij: "Niets extra. We gebruiken dezelfde meetpunten als aan het begin.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Wat kost het?",
    a: "Dat hangt af van wat er gebouwd moet worden. Na de procesanalyse krijg je een voorstel met een vaste scope en prijs, zodat je vooraf weet waar je aan toe bent. Het eerste gesprek is vrijblijvend.",
  },
  {
    q: "Hoe lang duurt een traject?",
    a: "Dat hangt af van de omvang, en de planning staat in het voorstel. We beginnen liever klein, met één onderdeel dat snel werkt, dan met een groot project dat pas na maanden iets oplevert.",
  },
  {
    q: "Moeten we nieuwe software aanschaffen?",
    a: "Meestal niet. We bouwen waar het kan op wat je al gebruikt: je website, je Excel-bestanden, je CRM of je boekhoudpakket.",
  },
  {
    q: "Voor wie is dit geschikt?",
    a: "Voor bedrijven waar aanvragen te complex zijn voor een standaardformulier, te specifiek voor standaardsoftware, en waar te veel terugkerend werk in zit om het zo te laten.",
  },
  {
    q: "Gebruiken jullie AI?",
    a: "Alleen waar het aantoonbaar helpt, bijvoorbeeld om ontbrekende informatie in een aanvraag te herkennen of een mail om te zetten naar nette gegevens. Voor rekenregels en prijzen gebruiken we vaste logica: sneller en voorspelbaarder.",
  },
  {
    q: "Wat als standaardsoftware beter past?",
    a: "Dan zeggen we dat. Ook als dat betekent dat wij niets bouwen.",
  },
  {
    q: "Wat gebeurt er na oplevering?",
    a: "Je houdt een vast aanspreekpunt. Afspraken over beheer, aanpassingen en wat er gebeurt als iets niet werkt, leggen we vooraf vast in het voorstel.",
  },
  {
    q: "Hoe gaan jullie om met onze gegevens?",
    a: "Zorgvuldig en volgens de AVG. We verwerken alleen wat nodig is voor de tool, en afspraken over gegevens leggen we vast voordat we beginnen.",
  },
];

export const Route = createFileRoute("/werkwijze")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Werkwijze,
});

function Werkwijze() {
  return (
    <>
      <Section tone="hero">
        <Reveal>
          <Eyebrow tone="sage">Werkwijze</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
            Eerst snappen hoe het werk loopt. Dan pas{" "}
            <span className="hand text-[1.1em]">bouwen</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
            Geen lang adviestraject en geen dik rapport. We kijken naar wat er nu gebeurt na een
            aanvraag, meten het, en bouwen alleen wat aantoonbaar werk scheelt.
          </p>
        </Reveal>
      </Section>

      <Section tone="cream">
        <Reveal>
          <Eyebrow>Het traject</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
            Zes stappen, van gesprek tot gemeten resultaat
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.n} className="list-none border-t border-line pt-6">
              <Reveal delay={(i % 2) * 0.08}>
                <span className="eyebrow text-home-accent">{s.n}</span>
                <h3 className="mt-3 text-2xl">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{s.b}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  <span className="font-semibold text-ink/80">Wat we van jou nodig hebben: </span>
                  {s.jij}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <Eyebrow>Veelgestelde vragen</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              Wat je waarschijnlijk wilt weten
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Staat je vraag er niet bij? Stel hem gewoon, dan krijg je een eerlijk antwoord.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="divide-y divide-line border-y border-line">
              {faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none text-home-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <Reveal>
          <h2 className="max-w-2xl text-3xl leading-tight md:text-4xl">
            Benieuwd wat er in jullie proces te winnen valt?
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
            <Link
              to="/scan"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Doe de scan
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
