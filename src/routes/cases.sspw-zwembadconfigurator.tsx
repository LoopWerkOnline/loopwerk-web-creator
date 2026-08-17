import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { ConfiguratorFlow, LeadFunnel } from "@/components/infographics";

const title = "Case: zwembadconfigurator voor SSPW | LoopWerk";
const description =
  "Hoe een configurator in drie stappen bezoekers zelf hun zwembad laat samenstellen, SSPW een conceptofferte oplevert en elke aanvraag als lead vastlegt.";

export const Route = createFileRoute("/cases/sspw-zwembadconfigurator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CaseSSPW,
});

const facts = [
  { k: "20", v: "serieuze aanvragen per maand" },
  { k: "10", v: "showroomgesprekken van ± 1 uur" },
  { k: "7", v: "haken af op prijs of concurrent" },
  { k: "€ 30.000", v: "gemiddelde orderwaarde" },
];

function CaseSSPW() {
  return (
    <>
      <Section>
        <Eyebrow>Case · Sun Sauna &amp; Poolworld</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.08] md:text-6xl">
          Een configurator die het <span className="hand text-[1.1em]">prijsgesprek</span>{" "}naar voren
          haalt
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/75">
          SSPW verkoopt bouwkundige zwembaden. Elke aanvraag begon met uitzoekwerk en een gesprek —
          ook de aanvragen die op prijs zouden stranden.
        </p>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="rounded-xl border border-line bg-cream p-7">
              <p className="font-display text-4xl text-forest">{f.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink/55">
          Cijfers afkomstig uit de intake bij SSPW, augustus 2026.
        </p>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>Het probleem</Eyebrow>
            <h2 className="mt-5 text-4xl leading-tight">De selectie gebeurde ná het gesprek</h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              Tien gesprekken van een uur, plus ongeveer een uur opvolging per gesprek: circa twintig
              uur per maand. Zeven van die trajecten eindigden op prijs of bij een concurrent. Die
              afweging kan de klant prima zelf maken — mits hij vooraf ziet wat een zwembad kost en
              wat er allemaal bij hoort.
            </p>
          </div>
          <LeadFunnel className="w-full" />
        </div>
      </Section>

      <Section tone="ink">
        <Eyebrow tone="sage">De oplossing</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">
          Drie stappen naar een conceptofferte
        </h2>
        <div className="mt-12 rounded-2xl bg-cream p-8 md:p-12">
          <ConfiguratorFlow className="w-full" />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Stap 1 — Formaat",
              d: "Kies een veelgebruikte maat of geef eigen afmetingen door. Direct zichtbaar wat standaard is inbegrepen.",
              img: sspwStap1,
              alt: "Stap 1 van de configurator: formaat kiezen met een overzicht van wat standaard is inbegrepen",
            },
            {
              t: "Stap 2 — Uitvoering",
              d: "Trap, verlichting, filtering, waterbehandeling en afdekking. Per optie de meerprijs, in een lopende samenvatting.",
              img: sspwStap2,
              alt: "Stap 2 van de configurator: opties kiezen met meerprijzen en een meelopende samenvatting",
            },
            {
              t: "Stap 3 — Prijsindicatie",
              d: "De bezoeker laat zijn gegevens achter en ziet de prijsbandbreedte. SSPW krijgt de conceptofferte binnen.",
              img: sspwStap3,
              alt: "Stap 3 van de configurator: gegevensformulier voor de prijsindicatie",
            },
          ].map((s) => (
            <div key={s.t}>
              <BrowserFrame src={s.img} alt={s.alt} label={s.t} />
              <h3 className="mt-5 text-2xl text-cream">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-cream/50">
          Schermafbeeldingen uit de werkende configurator; de tool staat klaar voor livegang bij
          SSPW.
        </p>
      </Section>


      <Section tone="shell">
        <Eyebrow>Het resultaat</Eyebrow>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <p className="text-2xl leading-snug">
            Gesprekken gaan over uitvoering in plaats van over budget — en elke aanvraag staat
            automatisch geregistreerd als lead.
          </p>
          <ul className="space-y-4 text-ink/75">
            {[
              "De bezoeker kent zijn prijsbandbreedte vóór het eerste contact.",
              "SSPW ontvangt een conceptofferte met alle klantgegevens, zonder overtypen.",
              "Aanvragen worden opgeslagen, dus opvolging hangt niet meer af van geheugen.",
              "Showroomtijd gaat naar de aanvragen die serieus verder willen.",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                <span className="leading-relaxed">{li}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Zoiets voor uw bedrijf?
          </Link>
          <a
            href="https://www.sspw.nl"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            Bekijk sspw.nl
          </a>
        </div>
      </Section>
    </>
  );
}
