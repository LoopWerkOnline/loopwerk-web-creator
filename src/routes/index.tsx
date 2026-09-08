import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { VideoFrame } from "@/components/VideoFrame";
import { FocusVsChaos, ManualSteps } from "@/components/infographics";
import demoVideo from "@/assets/SSPW_configurator_demo_V2_HQ.mp4.asset.json";
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
              <span className="hand text-copper text-[1.15em]">handwerk</span>{" "}te blijven
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

          <FocusVsChaos tone="dark" accent="var(--copper)" className="mx-auto w-full max-w-sm" />
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
          <ManualSteps accent="var(--copper)" className="w-full" />
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/oplossingen/$slug"
              params={{ slug: s.slug }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-cream p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-copper hover:shadow-lg"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-copper text-sm font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-5 text-2xl">{s.title}</h3>
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
              <div
                className="group relative grid items-center gap-4 py-7 transition-colors hover:bg-shell md:grid-cols-[1fr_14rem_1fr] md:gap-6 md:px-4"
              >
                <h3 className="text-2xl md:text-3xl">{s.title}</h3>

                {s.flowLabel && (
                  <div className="relative hidden h-28 items-center justify-center md:flex">
                    <svg
                      className="absolute inset-0 h-full w-full overflow-visible"
                      viewBox="0 0 200 56"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0,28 C12,12 28,44 44,28 S72,8 96,32 S124,16 148,36 S176,12 200,28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="5 4"
                        strokeLinecap="round"
                        className="text-copper"
                      />
                      <circle cx="0" cy="28" r="3" className="fill-copper" />
                      <circle cx="200" cy="28" r="3" className="fill-copper" />
                    </svg>
                    <span className="hand relative z-10 max-w-[12rem] rounded-full border border-copper/20 bg-cream px-4 py-2 text-center text-base leading-tight text-copper shadow-sm">
                      {s.flowLabel}
                    </span>
                  </div>
                )}

                <div className="w-full md:w-[18rem] md:justify-self-end">
                  {s.image ? (
                    <div className="flip-scene h-40 w-full md:h-32">
                      <div className="flip-inner h-full w-full">
                        <img
                          src={s.image}
                          alt={s.imageAlt ?? s.title}
                          loading="lazy"
                          className="flip-face absolute inset-0 h-full w-full rounded-lg object-cover"
                        />
                        <div className="flip-face flip-back absolute inset-0 flex flex-col justify-center gap-2 rounded-lg bg-ink-hero p-5">
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-copper">
                            Herkenbaar?
                          </span>
                          <p className="text-sm leading-relaxed text-cream/90">{s.seen[0]}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-base leading-relaxed text-ink/70">{s.short}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>


      {/* Uitgelichte case */}
      <Section tone="ink">
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-[1.65fr_1fr] lg:items-start lg:gap-16">
          <div>
            <VideoFrame
              src={demoVideo.url}
              alt="Demo van de SSPW-zwembadconfigurator: van opties kiezen tot complete aanvraag"
              label="Zwembadconfigurator — demo"
              variant="dark"
            />
          </div>
          <div>
            <Eyebrow tone="copper">UITGELICHTE CASE</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight text-cream md:text-4xl">Sun Sauna &amp; Poolworld</h2>
            <p className="hand text-copper mt-8 text-2xl leading-snug text-sage md:text-3xl">
              “Wat kost een zwembad ongeveer?”
            </p>
            <p className="mt-6 leading-relaxed text-cream/75">
              Voor Jacques begon een aanvraag vaak pas echt in de zaak. Klanten kwamen langs om samen een zwembad samen te stellen. Zo’n gesprek kon al snel een uur duren — om er soms pas bij de uiteindelijke prijs achter te komen dat die helemaal niet aansloot bij wat de klant in gedachten had.
            </p>
            <p className="mt-4 leading-relaxed text-cream/75">
              Samen met SSPW bouwden we daarom een configurator die klanten vooraf door de belangrijkste keuzes en de bijbehorende prijsrichting leidt. Zo komen mensen beter voorbereid binnen, hebben ze eerder een realistisch beeld van wat mogelijk is en begint het gesprek met Jacques een stuk verder.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <Link
                to="/cases/sspw-zwembadconfigurator"
                className="inline-flex items-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Lees de hele case
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://offer-calculator-sspw.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-cream/90 underline underline-offset-4"
              >
                Bekijk de configurator ↗
              </a>
            </div>
          </div>
        </div>
      </Section>


      {/* Hoe we werken */}
      <Section tone="cream">
        <Eyebrow>Hoe we werken</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
          Kijken naar jou proces, bepalen wat beter kan, dan pas bouwen
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
      </Section>

      {/* Over + CTA */}
      <Section tone="ink">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow tone="sage">OVER ONS</Eyebrow>
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
