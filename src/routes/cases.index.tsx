import { createFileRoute } from "@tanstack/react-router";

import { Section } from "@/components/Section";
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
      <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-ink-hero text-cream sm:min-h-[500px] md:min-h-[560px]">
        <img
          src="/cases/hero-cases.jpg"
          alt="Mensen die uitkijken over een stadssilhouet vanuit een hoog gebouw"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink-hero/40" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-hero/90 via-ink-hero/45 to-transparent md:from-ink-hero/85 md:via-ink-hero/30 md:to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-hero via-ink-hero/25 to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:pb-16 md:pt-32">
          <div className="max-w-3xl">
            <p className="fade-up eyebrow text-sage" style={{ animationDelay: "0s" }}>
              Cases
            </p>
            <h1 className="fade-up mt-6 text-5xl leading-[1.08] md:text-6xl" style={{ animationDelay: "0.08s" }}>
              Werk dat je kunt <span className="hand text-[1.1em]">openklikken</span>
            </h1>
            <p
              className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-cream/75"
              style={{ animationDelay: "0.16s" }}
            >
              Wij laten liever zien wat er draait dan wat wij zouden kunnen.
            </p>
          </div>
        </div>
      </section>

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
