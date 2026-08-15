import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";

const title = "Over LoopWerk — praktische digitale tools uit Nederland";
const description =
  "LoopWerk bouwt digitale tools en automatiseringen voor Nederlandse bedrijven. Nuchter, concreet en met één vast aanspreekpunt.";

export const Route = createFileRoute("/over-ons")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: OverOns,
});

function OverOns() {
  return (
    <>
      <Section>
        <Eyebrow>Over ons</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
          Wij bouwen liever <span className="hand text-[1.1em]">iets kleins dat werkt</span>
        </h1>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-ink/75">
            LoopWerk maakt digitale tools en automatiseringen voor Nederlandse bedrijven. Wij komen
            binnen bij ondernemers die zien dat er tijd weglekt in hun proces, maar geen behoefte
            hebben aan een jarenlang softwaretraject.
          </p>
          <p className="text-lg leading-relaxed text-ink/75">
            Wij gebruiken AI waar het aantoonbaar helpt en laten het weg waar het alleen maar mooi
            klinkt. Wat wij opleveren moet uitlegbaar zijn aan de mensen die er elke dag mee werken.
          </p>
        </div>
      </Section>

      <Section tone="ink">
        <h2 className="max-w-3xl text-4xl leading-tight md:text-5xl">Waar wij op sturen</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-cream/15 md:grid-cols-3">
          {[
            { t: "Nuchter", d: "Geen beloftes die we niet kunnen onderbouwen. Wel cijfers uit uw eigen proces." },
            { t: "Concreet", d: "Elke opdracht eindigt met iets dat draait, niet met een rapport." },
            { t: "Dichtbij", d: "Eén aanspreekpunt dat uw bedrijf kent, ook na oplevering." },
          ].map((c) => (
            <div key={c.t} className="bg-ink p-8">
              <h3 className="text-2xl text-cream">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl leading-tight md:text-5xl">Even kennismaken?</h2>
          <p className="mt-5 text-lg text-ink/70">
            Een gesprek van een half uur is meestal genoeg om te zien of wij iets voor u kunnen
            betekenen.
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
