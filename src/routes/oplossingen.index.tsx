import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BaseAndCustom } from "@/components/infographics";
import { Reveal } from "@/components/Reveal";
import { SolutionSlider } from "@/components/SolutionSlider";
import { solutions } from "@/lib/content";

const title = "Oplossingen | LoopWerk";
const description =
  "Vier richtingen waarin we bedrijven helpen: een slimme configurator, complete aanvragen, systeemkoppelingen en automatische opvolging.";

export const Route = createFileRoute("/oplossingen/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OplossingenPage,
});

function OplossingenPage() {
  return (
    <>
      <Section tone="hero" className="!pb-14">
        <Reveal>
          <Eyebrow tone="sage">Oplossingen</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
            Bekende problemen, een <span className="hand text-[1.15em]">bestaande</span> richting,
            jouw invulling
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
            We beginnen zelden bij nul. De problemen die we tegenkomen lijken op elkaar: informatie
            die te laat compleet is, prijzen die handmatig worden opgezocht, gegevens die worden
            overgetypt. Daar hebben we werkende bouwstenen voor. Wat per bedrijf verschilt, maken we
            op maat.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <BaseAndCustom tone="dark" className="mt-12 w-full max-w-2xl" />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SolutionSlider items={solutions} />
        </Reveal>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Herken je er een? Of juist iets ertussenin?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              In een kort gesprek kijken we naar wat er nu gebeurt en waar de tijd echt in gaat. Is
              automatiseren niet de moeite waard, dan zeggen we dat.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="justify-self-start">
            <Link
              to="/contact"
              className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
