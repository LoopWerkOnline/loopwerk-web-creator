import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { FocusVsChaos, ThreePillars, LeadFunnel } from "@/components/infographics";

const title = "LoopWerk — digitale tools en automatisering voor Nederlandse bedrijven";
const description =
  "Wij bouwen praktische tools en automatiseringen die handmatig werk uit uw proces halen. Van zwembadconfigurator tot offerteflow: werk dat vanaf dag één tijd bespaart.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero — donker statement */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-16 pt-16 md:grid-cols-[1.15fr_1fr] md:items-center md:pb-20 md:pt-24">
          <div>
            <p className="eyebrow flex items-center gap-3 text-sage">
              <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
              Workflows. Connected.
            </p>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-[4.4rem]">
              Uw proces kost te veel <span className="hand text-[1.15em]">handwerk</span>. Dat lossen
              wij op.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75">
              LoopWerk bouwt digitale tools en automatiseringen voor Nederlandse bedrijven. Geen
              vaag AI-verhaal, maar één werkende oplossing voor het knelpunt dat u elke week tijd
              kost.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Plan een gesprek
              </Link>
              <Link
                to="/cases/sspw-zwembadconfigurator"
                className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Bekijk een echte tool
              </Link>
            </div>
          </div>

          <FocusVsChaos tone="dark" className="mx-auto w-full max-w-sm" />
        </div>

        {/* Cijferbalk */}
        <div className="border-t border-cream/15">
          <div className="mx-auto max-w-6xl px-5">
           <div className="grid gap-px bg-cream/15 sm:grid-cols-3">
            {[
              { k: "20 u", v: "handwerk per maand bij één klant" },
              { k: "3 stappen", v: "van aanvraag naar conceptofferte" },
              { k: "1 tool", v: "per knelpunt, geen platform" },
            ].map((s) => (
              <div key={s.k} className="bg-ink py-8 sm:px-6">
                <p className="font-display text-4xl text-copper md:text-5xl">{s.k}</p>
                <p className="mt-2 text-sm text-cream/65">{s.v}</p>
              </div>
            ))}
           </div>
          </div>
        </div>
      </section>


      {/* Herkenbaar probleem */}
      <Section tone="shell">
        <Eyebrow>Herkenbaar?</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-4xl leading-tight md:text-5xl">
          Het werk gebeurt, maar het kost u elke week uren die nergens naartoe gaan.
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line md:grid-cols-3">
          {[
            {
              t: "Alles gaat via mail en Excel",
              d: "Gegevens worden meerdere keren overgetypt. Eén fout en het hele traject loopt vertraging op.",
            },
            {
              t: "Offertes maken duurt te lang",
              d: "Elke aanvraag wordt handmatig uitgerekend, ook de aanvragen die uiteindelijk niets worden.",
            },
            {
              t: "Leads verdwijnen tussen wal en schip",
              d: "Er is geen plek waar aanvragen automatisch landen, dus opvolging hangt af van geheugen.",
            },
          ].map((c) => (
            <div key={c.t} className="bg-cream p-8">
              <h3 className="text-2xl">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Aanpak in drie beelden */}
      <Section tone="ink">
        <div className="text-center">
          <p className="eyebrow text-sage">Onze aanpak</p>
          <h2 className="mx-auto mt-6 max-w-2xl text-4xl leading-tight md:text-5xl">
            Klein beginnen, meteen resultaat.
          </h2>
        </div>
        <ThreePillars className="mt-16" />
        <p className="mt-16 text-center text-lg text-cream/70">
          Geen jarenlang traject. Eén knelpunt, één tool, meetbaar tijdwinst.
        </p>
      </Section>

      {/* Case */}
      <Section>
        <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <Eyebrow>Case · SSPW</Eyebrow>
            <h2 className="mt-6 text-4xl leading-tight md:text-5xl">
              Een zwembadconfigurator die <span className="hand text-[1.1em]">voorselecteert</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              Sun Sauna &amp; Poolworld kreeg 20 serieuze aanvragen per maand. Tien daarvan werden
              showroomgesprekken van een uur, plus een uur opvolging. Zeven haakten alsnog af op
              prijs. Die selectie hoort vóór het gesprek te gebeuren, niet erna.
            </p>
            <Link
              to="/cases/sspw-zwembadconfigurator"
              className="mt-8 inline-flex rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Lees de case
            </Link>
          </div>
          <LeadFunnel className="w-full" />
        </div>
      </Section>

      {/* CTA */}
      <Section tone="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl leading-tight md:text-5xl">
            Vertel ons waar het werk blijft hangen.
          </h2>
          <p className="mt-5 text-lg text-ink/70">
            U hoeft de oplossing nog niet te kennen. Eén gesprek is genoeg om te zien of hier een
            tool onder zit.
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
