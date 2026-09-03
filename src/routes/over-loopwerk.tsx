import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { ThreePillars } from "@/components/infographics";

const title = "Over LoopWerk — praktische tools voor Nederlandse bedrijven";
const description =
  "LoopWerk bouwt digitale tools en automatiseringen die aansluiten op hoe bedrijven echt werken. Nuchter, concreet en gericht op werk dat elke week terugkomt.";

export const Route = createFileRoute("/over-loopwerk")({
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
  component: OverLoopwerk,
});

const beliefs = [
  {
    title: "Eerst het proces, dan de techniek",
    body:
      "Een tool is pas nuttig als hij aansluit op hoe er nu gewerkt wordt. We beginnen bij wat er gebeurt, niet bij wat er technisch kan.",
  },
  {
    title: "Liever iets kleins dat werkt",
    body:
      "Een werkende oplossing voor één knelpunt levert meer op dan een plan voor een compleet systeem dat er nooit komt.",
  },
  {
    title: "Eerlijk over wat het oplevert",
    body:
      "Als automatiseren de moeite niet waard is, zeggen we dat. Dat is op de lange termijn prettiger samenwerken.",
  },
  {
    title: "AI waar het helpt, niet als etalage",
    body:
      "We zetten AI in als het aantoonbaar tijd scheelt, met een mens die controleert waar het ertoe doet.",
  },
];

function OverLoopwerk() {
  return (
    <>
      <Section tone="hero" className="!pb-14">
        <Eyebrow tone="sage">Over LoopWerk</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Wij houden van werk dat <span className="hand text-[1.15em]">vanzelf</span> gaat lopen
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
          LoopWerk bouwt digitale tools en automatiseringen voor Nederlandse bedrijven. Meestal voor
          werk dat elke week terugkomt: aanvragen uitvragen, prijzen opzoeken, gegevens overtypen,
          opvolgen. Niet spannend, wel waar de tijd in gaat.
        </p>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Waar we in geloven</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {beliefs.map((b) => (
                <div key={b.title} className="border-t border-line pt-5">
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink/70">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
          <ThreePillars className="w-full" />
        </div>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Hoe we zijn in samenwerking</Eyebrow>
            <p className="mt-6 leading-relaxed text-ink/75">
              Korte lijnen, duidelijke taal en geen rapporten waar niemand op zit te wachten. Je
              praat met de mensen die het ook bouwen. We laten liever iets werkends zien dan dat we
              er nog een presentatie aan wijden.
            </p>
          </div>
          <div>
            <Eyebrow tone="copper">Waar we goed in zijn</Eyebrow>
            <ul className="mt-6 space-y-4">
              {[
                "Complexe keuzes en prijsregels begrijpelijk maken voor de klant.",
                "Losse systemen met elkaar laten praten.",
                "Software die er verzorgd uitziet en aanvoelt als jullie merk.",
              ].map((t) => (
                <li key={t} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Even kennismaken?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Een half uur is genoeg om te bepalen of er iets te halen valt.
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
