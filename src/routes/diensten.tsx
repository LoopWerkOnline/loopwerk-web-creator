import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";

const title = "Diensten — tools, automatisering en AI | LoopWerk";
const description =
  "Configurators, offerte- en leadflows, koppelingen tussen systemen en AI waar het echt helpt. Concreet werk voor Nederlandse bedrijven.";

export const Route = createFileRoute("/diensten")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Diensten,
});

const services = [
  {
    n: "01",
    t: "Configurators en rekentools",
    d: "Laat klanten zelf samenstellen en direct een realistische prijsindicatie zien. Uw team praat daarna alleen nog met mensen die de bandbreedte kennen.",
  },
  {
    n: "02",
    t: "Offerte- en leadflows",
    d: "Van aanvraag tot conceptofferte in één stroom. Klantgegevens worden opgeslagen, opvolging staat klaar, niets valt tussen wal en schip.",
  },
  {
    n: "03",
    t: "Koppelingen tussen systemen",
    d: "Website, administratie, CRM en mail met elkaar verbinden, zodat gegevens één keer worden ingevoerd in plaats van vier keer.",
  },
  {
    n: "04",
    t: "AI waar het echt helpt",
    d: "Documenten samenvatten, aanvragen classificeren, standaardantwoorden voorbereiden. Altijd met een mens die de eindcontrole houdt.",
  },
  {
    n: "05",
    t: "Interne dashboards",
    d: "Eén scherm met de cijfers waarop u stuurt, live uit uw eigen data in plaats van uit een maandelijkse Excel.",
  },
  {
    n: "06",
    t: "Doorontwikkeling en onderhoud",
    d: "Een tool die blijft werken en meegroeit met uw proces. Wij blijven aanspreekbaar na oplevering.",
  },
];

function Diensten() {
  return (
    <>
      <Section>
        <Eyebrow>Diensten</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
          Software die <span className="hand text-[1.1em]">werk</span> uit uw week haalt.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/75">
          Wij bouwen geen alles-in-één platform. Wij zoeken het punt waar uw proces vastloopt en
          maken daar één ding voor dat het meteen beter doet.
        </p>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <div className="grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-2">
          {services.map((s) => (
            <article key={s.n} className="bg-cream p-9">
              <span className="font-display text-3xl text-sage">{s.n}</span>
              <h2 className="mt-3 text-2xl">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl leading-tight md:text-5xl">Niet zeker wat u nodig heeft?</h2>
          <p className="mt-5 text-lg text-cream/70">
            Dat hoeft ook niet. Beschrijf uw proces, wij wijzen aan waar de winst zit.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-copper px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Plan een gesprek
          </Link>
        </div>
      </Section>
    </>
  );
}
