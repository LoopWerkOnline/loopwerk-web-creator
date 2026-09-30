import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faq } from "@/lib/content";

const title = "Veelgestelde vragen | LoopWerk";
const description =
  "Antwoord op de vragen die we het vaakst krijgen over maatwerkautomatisering, bestaande systemen, gegevens en AI.";

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
            <Accordion type="single" collapsible>
              {faq.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg leading-snug text-ink">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-ink/70">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
