import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { FaqList } from "@/components/faq/FaqList";
import { faq } from "@/lib/content";
import { breadcrumbs, faqPage, jsonLd } from "@/lib/schema";

const title = "Veelgestelde vragen | LoopWerk";
const description =
  "Kun je offertes automatisch laten maken? Kan je websiteformulier direct in je CRM? Antwoorden op de vragen die we het vaakst krijgen, met voorbeelden.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [jsonLd(faqPage(faq)), jsonLd(breadcrumbs([["Veelgestelde vragen", "/faq"]]))],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <Section tone="hero">
        <Eyebrow tone="sage">Veelgestelde vragen</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-4xl leading-tight md:text-5xl">
          Vragen die we vaak krijgen
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-cream/75">
          Staat je vraag er niet bij?{" "}
          <Link to="/contact" className="underline underline-offset-4 hover:text-cream">
            Stuur ons een bericht
          </Link>
          .
        </p>
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <FaqList items={faq} />
          </div>
        </Reveal>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Nog iets anders?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Een half uur is genoeg om te bepalen of er iets te halen valt.
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
