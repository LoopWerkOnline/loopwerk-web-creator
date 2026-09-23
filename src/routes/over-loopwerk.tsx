import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { ThreePillars } from "@/components/infographics";
import { Reveal } from "@/components/Reveal";

/** Kleine tandwiel-lijntekening, in de stijl van de overige infographics. */
function GearMark({ className }: { className?: string }) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {teeth.map((deg) => (
          <line key={deg} x1="32" y1="3" x2="32" y2="19" transform={`rotate(${deg} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="17" />
        <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

const title = "Over LoopWerk | praktische tools voor Nederlandse bedrijven";
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

/**
 * Quotes zijn nog placeholders — nog geen echte, door henzelf goedgekeurde
 * uitspraken. Vervangen zodra Levi/Gianni/Shaquil hun eigen zin aanleveren.
 */
const team = [
  {
    name: "Levi Kempen",
    initials: "LK",
    role: "Mede-oprichter",
    color: "var(--forest)",
    quote: "Nog toe te voegen — jouw eigen zin in één regel.",
  },
  {
    name: "Gianni Geurtjens",
    initials: "GG",
    role: "Mede-oprichter",
    color: "var(--home-accent)",
    quote: "Nog toe te voegen — jouw eigen zin in één regel.",
  },
  {
    name: "Shaquil Reyes",
    initials: "SR",
    role: "Mede-oprichter",
    color: "var(--ink-hero)",
    quote: "Nog toe te voegen — jouw eigen zin in één regel.",
  },
];

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
      <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-ink-hero text-cream sm:min-h-[500px] md:min-h-[560px]">
        <img
          src="/over-loopwerk-hero.jpg"
          alt="Team dat samen achter laptops aan een project werkt"
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
        <img
          src="/loopwerk-mark.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 -z-10 h-56 w-56 opacity-[0.08] brightness-0 invert md:h-72 md:w-72"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:pb-16 md:pt-32">
          <div className="max-w-3xl">
            <p className="fade-up eyebrow text-sage" style={{ animationDelay: "0s" }}>
              Over LoopWerk
            </p>
            <h1
              className="fade-up mt-6 text-4xl leading-[1.1] md:text-6xl"
              style={{ animationDelay: "0.08s" }}
            >
              Wij houden van werk dat <span className="hand text-[1.15em]">vanzelf</span> gaat lopen
            </h1>
            <p
              className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
              style={{ animationDelay: "0.16s" }}
            >
              LoopWerk bouwt digitale tools en automatiseringen voor Nederlandse bedrijven. Meestal voor
              werk dat elke week terugkomt: aanvragen uitvragen, prijzen opzoeken, gegevens overtypen,
              opvolgen. Niet spannend, wel waar de tijd in gaat.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <GearMark className="h-11 w-11 text-forest" />
            <Eyebrow tone="home-accent">De naam</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">Het mechanisme dat blijft draaien</h2>
            <div className="mt-6 rounded-xl border border-line bg-shell p-6">
              <p className="font-display text-2xl text-ink">loop·werk</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
                zelfstandig naamwoord · het
              </p>
              <p className="mt-4 italic leading-relaxed text-ink/75">
                Het mechanisme dat een klok laat lopen: de tandwielen en veren die er samen voor
                zorgen dat hij vanzelf blijft draaien.
              </p>
            </div>
            <p className="mt-5 leading-relaxed text-ink/75">
              Dat is precies wat wij bouwen — alleen dan voor jullie proces: het mechanisme dat blijft
              draaien zonder dat iemand het iedere keer met de hand hoeft op te winden.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="home-accent">Hoe het begon</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">Ontstaan uit eigen frustratie</h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              We werkten zelf bij bedrijven waar het steeds op hetzelfde vastliep: een aanvraag die
              drie keer werd overgetypt, een prijs die telkens opnieuw werd uitgezocht, een klant die
              per ongeluk niet meer werd opgevolgd — niet omdat er slecht werk werd geleverd, maar
              omdat het proces zelf in de weg zat. Alle tijd die daarin verdween, ging niet naar het
              werk waar een bedrijf écht goed in is. Dat was frustrerend genoeg om zelf iets te bouwen
              dat die loop doorbreekt. Vandaar Loopwerk.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="shell">
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Waar we in geloven</h2>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {beliefs.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08} className="border-t border-line pt-5">
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink/70">{b.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <ThreePillars className="w-full" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Hoe we zijn in samenwerking</Eyebrow>
            <p className="mt-6 leading-relaxed text-ink/75">
              Korte lijnen, duidelijke taal en geen rapporten waar niemand op zit te wachten. Je
              praat met de mensen die het ook bouwen. We laten liever iets werkends zien dan dat we
              er nog een presentatie aan wijden.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="home-accent">Waar we goed in zijn</Eyebrow>
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
          </Reveal>
        </div>
      </Section>

      <Section tone="shell">
        <Reveal>
          <Eyebrow tone="home-accent">Het team</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
            Drie mensen, geen tussenlaag
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="flip-scene aspect-[3/4] w-full" tabIndex={0}>
                <div className="flip-inner h-full w-full">
                  <div className="flip-face absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-cream p-6 text-center">
                    <span
                      className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-white"
                      style={{ backgroundColor: member.color }}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </span>
                    <div>
                      <p className="font-display text-xl text-ink">{member.name}</p>
                      <p className="mt-1 text-sm text-ink/55">{member.role}</p>
                    </div>
                  </div>
                  <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-ink-hero p-7 text-center">
                    <p className="hand text-xl leading-snug text-cream">"{member.quote}"</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-sage">{member.name}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Even kennismaken?</h2>
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
