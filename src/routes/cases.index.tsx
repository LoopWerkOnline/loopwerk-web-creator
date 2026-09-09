import { createFileRoute } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { CaseCard } from "@/components/CaseCard";
import { Reveal } from "@/components/Reveal";
import { cases } from "@/lib/cases";

const title = "Cases | tools die wij bouwden | LoopWerk";
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
      <Section tone="hero">
        <Reveal>
          <Eyebrow tone="sage">Cases</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
            Werk dat je kunt <span className="hand text-[1.1em]">openklikken</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
            Wij laten liever zien wat er draait dan wat wij zouden kunnen.
          </p>
        </Reveal>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <div className="space-y-8">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink/60">
          Meer cases volgen zodra lopende trajecten zijn opgeleverd.
        </p>
      </Section>
    </>
  );
}
