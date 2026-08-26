import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BaseAndCustom } from "@/components/infographics";
import { solutions } from "@/lib/content";

const title = "Oplossingen — LoopWerk";
const description =
  "Zes richtingen waarin we bedrijven helpen: offerteflow, complete aanvragen, calculaties, gegevensverwerking, opvolging en ander terugkerend werk.";

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
      <Section tone="shell" className="!pb-14">
        <Eyebrow>Oplossingen</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Bekende problemen, een <span className="hand text-[1.15em]">bestaande</span> richting,
          jouw invulling
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
          We beginnen zelden bij nul. De problemen die we tegenkomen lijken op elkaar: informatie
          die te laat compleet is, prijzen die handmatig worden opgezocht, gegevens die worden
          overgetypt. Daar hebben we werkende bouwstenen voor. Wat per bedrijf verschilt, maken we
          op maat.
        </p>
        <BaseAndCustom className="mt-12 w-full max-w-2xl" />
      </Section>

      <Section>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/oplossingen/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col bg-cream p-8 transition-colors hover:bg-shell md:p-10"
            >
              <span className="eyebrow text-copper">{s.n}</span>
              <h2 className="mt-4 text-2xl md:text-3xl">{s.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink/70">{s.short}</p>
              <span className="mt-6 text-sm font-semibold text-forest underline underline-offset-4">
                Bekijk deze richting
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Herken je er een? Of juist iets ertussenin?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              In een kort gesprek kijken we naar wat er nu gebeurt en waar de tijd echt in gaat. Is
              automatiseren niet de moeite waard, dan zeggen we dat.
            </p>
          </div>
          <Link
            to="/contact"
            className="justify-self-start rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
        </div>
      </Section>
    </>
  );
}
