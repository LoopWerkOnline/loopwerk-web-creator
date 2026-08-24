import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BrowserFrame } from "@/components/BrowserFrame";
import { FocusVsChaos, ManualSteps, BaseAndCustom, ConfiguratorFlow } from "@/components/infographics";
import { sspwStap2 } from "@/lib/assets";
import { solutions, sectors } from "@/lib/content";

const title = "LoopWerk — digitale tools en automatisering voor Nederlandse bedrijven";
const description =
  "Wij bouwen praktische tools en automatiseringen die handmatig werk uit je proces halen. Bekende problemen, een bestaande basis en maatwerk waar het telt.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  const featured = solutions.find((s) => s.featured)!;

  return (
    <>
      {/* Hero */}
      <section className="bg-ink-hero text-cream">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-16 pt-16 md:grid-cols-[1.15fr_1fr] md:items-center md:pb-20 md:pt-24">
          <div>
            <p className="eyebrow flex items-center gap-3 text-sage">
              <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
              Workflows. Connected.
            </p>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-[4.4rem]">
              Werk dat elke week terugkomt, hoeft geen{" "}
              <span className="hand text-[1.15em]">handwerk</span>{" "}te blijven
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75">
              LoopWerk bouwt digitale tools en automatiseringen voor Nederlandse bedrijven. Vanuit een herkenbaar probleem ontwikkelen wij een oplossing die aansluit op jullie proces.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Bespreek je proces
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

        <div className="mx-auto max-w-6xl px-5 pb-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-cream/15 bg-cream/15 sm:grid-cols-3">
            {[
              { k: "20 u", v: "handwerk per maand dat we bij één klant weghaalden" },
              { k: "3 stappen", v: "van klantvraag naar complete aanvraag" },
              { k: "1 tool", v: "die vanaf dag één in gebruik is" },
            ].map((s) => (
              <div key={s.k} className="bg-ink-hero p-7">
                <p className="text-3xl text-copper">{s.k}</p>
                <p className="mt-2 text-base leading-relaxed text-cream/65">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herkenning */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <Eyebrow tone="copper">Herkenbaar?</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              Eén klantvraag, vier keer handwerk
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Informatie opvragen bij de klant, opties en prijzen bij elkaar zoeken, gegevens
              verwerken in een ander systeem en later nog eens opvolgen. Elk stuk kost weinig tijd.
              Bij elkaar meer dan je denkt.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Wij besparen onnodig werk door processen slimmer in te richten.
            </p>
          </div>
          <ManualSteps className="w-full" />
        </div>
      </Section>

      {/* Oplossingen */}
      <Section tone="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Oplossingen</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
              Bekende problemen, waar we al een richting voor hebben
            </h2>
          </div>
          <Link to="/oplossingen" className="text-sm font-semibold text-forest underline underline-offset-4">
            Alle oplossingen
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/oplossingen/$slug"
              params={{ slug: s.slug }}
              className="flex flex-col bg-cream p-8 transition-colors hover:bg-shell"
            >
              <span className="eyebrow text-copper">{s.n}</span>
              <h3 className="mt-3 text-2xl">{s.title}</h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink/70">{s.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Sectoren */}
      <Section>
        <Eyebrow>Sectoren</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
          We kennen het werk waar de tijd in gaat zitten
        </h2>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {sectors.map((s) => (
            <li key={s.slug}>
              <Link
                to="/sectoren/$slug"
                params={{ slug: s.slug }}
                className="group grid items-center gap-4 py-7 transition-colors hover:bg-shell md:grid-cols-[1fr_1fr_18rem] md:gap-8 md:px-4"
              >
                <h3 className="text-2xl md:text-3xl">{s.title}</h3>

                {s.flowLabel && (
                  <div className="relative hidden h-20 items-center justify-center md:flex">
                    <svg
                      className="absolute inset-0 h-full w-full overflow-visible"
                      viewBox="0 0 200 40"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0,20 C50,20 70,5 100,20 S150,35 200,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                        className="text-copper/50"
                      />
                      <circle cx="0" cy="20" r="2.5" className="fill-copper/70" />
                      <circle cx="200" cy="20" r="2.5" className="fill-copper/70" />
                    </svg>
                    <span className="hand relative z-10 rotate-[-2deg] text-xl md:text-2xl">
                      {s.flowLabel}
                    </span>
                  </div>
                )}

                {s.image ? (
                  <div className="flip-scene h-40 w-full md:h-32">
                    <div className="flip-inner h-full w-full">
                      <img
                        src={s.image}
                        alt={s.imageAlt ?? s.title}
                        loading="lazy"
                        className="flip-face absolute inset-0 h-full w-full rounded-lg object-cover"
                      />
                      <div className="flip-face flip-back absolute inset-0 flex items-center rounded-lg bg-ink-hero p-5">
                        <p className="text-sm leading-relaxed text-cream/85">{s.short}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-base leading-relaxed text-ink/70">{s.short}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Section>


      {/* Uitgelichte oplossing */}
      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <Eyebrow tone="copper">Uitgelicht</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">{featured.title}</h2>
            <p className="mt-4 leading-relaxed text-ink/70">{featured.intro}</p>
            <ul className="mt-8 space-y-4">
              {featured.base.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-ink/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/oplossingen/$slug"
              params={{ slug: featured.slug }}
              className="mt-8 inline-block text-sm font-semibold text-forest underline underline-offset-4"
            >
              Bekijk de slimme offerteflow
            </Link>
          </div>
          <div>
            <BrowserFrame
              src={sspwStap2}
              alt="Stap 2 van de zwembadconfigurator: opties kiezen met een meelopende samenvatting"
              label="Zwembadconfigurator — stap 2"
            />
            <ConfiguratorFlow className="mt-8 w-full" />
          </div>
        </div>
      </Section>

      {/* Case */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <Eyebrow>Case</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              SSPW: van elk gesprek opnieuw uitvragen naar een complete aanvraag
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Twintig serieuze aanvragen per maand, tien showroomgesprekken van een uur en toch
              zeven trajecten die stukliepen op prijs. De configurator laat de klant vooraf zelf
              samenstellen — inclusief wat inbegrepen is en wat extra kost.
            </p>
            <Link
              to="/cases/sspw-zwembadconfigurator"
              className="mt-8 inline-block text-sm font-semibold text-forest underline underline-offset-4"
            >
              Lees de case
            </Link>
          </div>
          <BaseAndCustom className="w-full" />
        </div>
      </Section>

      {/* Hoe we werken */}
      <Section tone="shell">
        <Eyebrow>Hoe we werken</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
          Kijken wat er gebeurt, bepalen wat het waard is, dan pas bouwen
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { n: "01", t: "Proces doorlopen", b: "We kijken mee met hoe het nu gaat en waar de tijd blijft hangen." },
            { n: "02", t: "Waarde bepalen", b: "Levert het te weinig op, dan zeggen we dat voordat er iets gebouwd wordt." },
            { n: "03", t: "Bouwen en bijstellen", b: "Bestaande basis, maatwerk waar nodig, en meekijken bij de eerste echte aanvragen." },
          ].map((s) => (
            <div key={s.n} className="border-t border-line pt-6">
              <span className="eyebrow text-copper">{s.n}</span>
              <h3 className="mt-3 text-2xl">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{s.b}</p>
            </div>
          ))}
        </div>
        <Link to="/hoe-we-werken" className="mt-10 inline-block text-sm font-semibold text-forest underline underline-offset-4">
          De volledige werkwijze
        </Link>
      </Section>

      {/* Over + CTA */}
      <Section tone="ink">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow tone="sage">Over LoopWerk</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              Nuchter, concreet en eerlijk over wat iets oplevert
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Je praat met de mensen die het ook bouwen. Geen rapporten waar niemand op zit te
              wachten, maar iets werkends om op te reageren.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Bespreek je proces
              </Link>
              <Link
                to="/over-loopwerk"
                className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Over LoopWerk
              </Link>
            </div>
          </div>
          <p className="hand text-3xl text-sage">
            Vertel wat er nu handmatig gaat — dan zeggen wij of er iets te winnen valt.
          </p>
        </div>
      </Section>
    </>
  );
}
