import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { ConfiguratorFlow } from "@/components/infographics";

const title = "Cases — tools die wij bouwden | LoopWerk";
const description =
  "Concrete voorbeelden van tools die wij bouwden, waaronder de zwembadconfigurator voor Sun Sauna & Poolworld.";

export const Route = createFileRoute("/cases/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Cases,
});

function Cases() {
  return (
    <>
      <Section>
        <Eyebrow>Cases</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
          Werk dat je kunt <span className="hand text-[1.1em]">openklikken</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/75">
          Wij laten liever zien wat er draait dan wat wij zouden kunnen.
        </p>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <article className="overflow-hidden rounded-2xl border border-line bg-cream">
          <div className="grid gap-10 p-9 md:grid-cols-[1fr_1.1fr] md:items-center md:p-12">
            <div>
              <p className="eyebrow text-forest">Sun Sauna &amp; Poolworld</p>
              <h2 className="mt-3 text-4xl leading-tight">Zwembadconfigurator</h2>
              <p className="mt-4 leading-relaxed text-ink/70">
                Bezoekers stellen in drie stappen zelf hun zwembad samen, zien wat standaard
                inbegrepen is en krijgen een realistische prijsindicatie. SSPW ontvangt automatisch
                een conceptofferte met alle klantgegevens.
              </p>
              <Link
                to="/cases/sspw-zwembadconfigurator"
                className="mt-7 inline-flex rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Lees de case
              </Link>
            </div>
            <ConfiguratorFlow className="w-full" />
          </div>
        </article>

        <p className="mt-10 text-sm text-ink/60">
          Meer cases volgen zodra lopende trajecten zijn opgeleverd.
        </p>
      </Section>
    </>
  );
}
