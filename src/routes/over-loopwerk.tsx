import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { ThreePillars } from "@/components/infographics";
import { Reveal } from "@/components/Reveal";

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

/** Bestandsnamen in public/team/ (staand 3:4, min. 900×1200, WebP). Staat er geen foto, dan initialen. */
declare const __TEAM_PHOTOS__: string[];
const teamPhotos = __TEAM_PHOTOS__;

const team = [
  {
    name: "Levi Kempen",
    initials: "LK",
    photo: "levi-kempen.webp",
    role: "Mede-oprichter",
    color: "var(--forest)",
    quote: "Lui genoeg om alles te automatiseren, fanatiek genoeg om het goed te doen.",
  },
  {
    name: "Gianni Geurtjens",
    initials: "GG",
    photo: "gianni-geurtjens.webp",
    role: "Mede-oprichter",
    color: "var(--home-accent)",
    quote:
      "We zijn LoopWerk begonnen omdat we zagen hoeveel tijd bedrijven kwijt zijn aan kleine dingen die steeds opnieuw terugkomen.",
  },
  {
    name: "Shaquil Reyes",
    initials: "SR",
    photo: "shaquil-reyes.webp",
    role: "Mede-oprichter",
    color: "var(--ink-hero)",
    quote:
      "Het leukste vind ik als we iets bouwen waarvan een ondernemer achteraf zegt: dit had ik eigenlijk veel eerder moeten doen.",
  },
];

const beliefs = [
  {
    title: "Eerst het proces, dan de techniek",
    body: "Een tool is pas nuttig als hij aansluit op hoe er nu gewerkt wordt. We beginnen bij wat er gebeurt, niet bij wat er technisch kan.",
  },
  {
    title: "Liever iets kleins dat werkt",
    body: "Een werkende oplossing voor één knelpunt levert meer op dan een plan voor een compleet systeem dat er nooit komt.",
  },
  {
    title: "Eerlijk over wat het oplevert",
    body: "Als automatiseren de moeite niet waard is, zeggen we dat. Dat is op de lange termijn prettiger samenwerken.",
  },
  {
    title: "AI waar het helpt, niet als etalage",
    body: "We zetten AI in als het aantoonbaar tijd scheelt, met een mens die controleert waar het ertoe doet.",
  },
];

function OverLoopwerk() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-hero text-cream">
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 pb-14 pt-28 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-14 md:pb-16 md:pt-36">
          <div>
            <p
              className="fade-up eyebrow text-sage"
              style={{ animationDelay: "0s", fontSize: "0.875rem" }}
            >
              Over LoopWerk
            </p>
            <h1
              className="fade-up mt-6 text-balance text-4xl leading-[1.1] md:text-6xl"
              style={{ animationDelay: "0.08s" }}
            >
              Wij houden van werk dat <span className="hand text-[1.15em]">vanzelf</span> gaat lopen
            </h1>
            <p
              className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
              style={{ animationDelay: "0.16s" }}
            >
              LoopWerk bouwt digitale tools en automatiseringen voor Nederlandse bedrijven, vooral
              voor het werk dat elke week terugkomt: aanvragen uitvragen, prijzen opzoeken, gegevens
              overtypen en klanten opvolgen. Niet het spannendste werk, maar wel waar de meeste tijd
              in gaat zitten.
            </p>
          </div>
          <figure
            className="fade-up mx-auto w-full max-w-[520px]"
            style={{ animationDelay: "0.24s" }}
          >
            <img
              src="/team/team-groep.webp"
              alt="Shaquil Reyes, Levi Kempen en Gianni Geurtjens, de oprichters van LoopWerk"
              width={534}
              height={357}
              className="w-full rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-cream/10"
            />
          </figure>
        </div>
      </section>

      <Section tone="shell">
        <Reveal>
          <Eyebrow tone="home-accent">Ontmoet het team</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
            Drie mensen, geen tussenlaag
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="flip-scene aspect-[3/4] w-full" tabIndex={0}>
                <div className="flip-inner h-full w-full">
                  {teamPhotos.includes(member.photo) ? (
                    <div className="flip-face absolute inset-0 overflow-hidden rounded-2xl border border-line bg-[#2b1a10]">
                      <img
                        src={`/team/${member.photo}`}
                        alt={`${member.name}, ${member.role.toLowerCase()} LoopWerk`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#1c110a]/90 via-[#1c110a]/40 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="font-display text-2xl text-cream">{member.name}</p>
                        <p className="mt-1 text-sm text-cream/75">{member.role}</p>
                      </div>
                    </div>
                  ) : (
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
                  )}
                  <div className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-ink-hero p-7 text-center">
                    <p className="hand text-2xl leading-snug text-cream">"{member.quote}"</p>
                    <p className="text-sm uppercase tracking-[0.14em] text-home-accent">
                      {member.name}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            <Eyebrow tone="home-accent">De naam</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              Het mechanisme dat blijft draaien
            </h2>
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-line bg-shell p-7 md:p-9">
              <img
                src="/loopwerk-mark.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-[0.06]"
              />
              <p className="font-display text-5xl leading-none text-ink md:text-6xl">loop·werk</p>
              <ol className="mt-7 space-y-5 border-t border-line pt-6">
                <li className="flex gap-4">
                  <span className="font-display text-xl leading-7 text-home-accent">1</span>
                  <p className="font-display text-xl leading-snug text-ink/85">
                    Het mechanisme dat een klok laat lopen: de tandwielen en veren die er samen voor
                    zorgen dat hij vanzelf blijft draaien.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-xl leading-7 text-home-accent">2</span>
                  <p className="leading-relaxed text-ink/75">
                    Hetzelfde, maar dan voor jullie bedrijf: tools en automatiseringen die vanzelf
                    blijven lopen, zonder dat iemand ze elke dag opnieuw hoeft op te winden.
                  </p>
                </li>
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="home-accent">Hoe het begon</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              Ontstaan uit eigen frustratie
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              We werkten zelf bij bedrijven waar het steeds op hetzelfde vastliep: een aanvraag die
              drie keer werd overgetypt, een prijs die telkens opnieuw werd uitgezocht, een klant
              die per ongeluk niet meer werd opgevolgd — niet omdat er slecht werk werd geleverd,
              maar omdat het proces zelf in de weg zat. Alle tijd die daarin verdween, ging niet
              naar het werk waar een bedrijf écht goed in is. Dat was frustrerend genoeg om zelf
              iets te bouwen dat die loop doorbreekt. Vandaar LoopWerk.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="shell">
        <Reveal>
          <Eyebrow tone="home-accent">Onze principes</Eyebrow>
          <h2 className="mt-6 text-3xl leading-tight md:text-4xl">Waar we in geloven</h2>
        </Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 0.08}
                className="rounded-2xl border border-line bg-cream p-6"
              >
                <h3 className="text-xl leading-snug text-home-accent">{b.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink/70">{b.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal
            delay={0.1}
            className="flex h-full flex-col justify-center rounded-3xl bg-ink-hero p-8 text-cream md:p-10"
          >
            <Eyebrow tone="home-accent">In de praktijk</Eyebrow>
            <h3 className="mt-4 text-xl leading-snug text-cream md:text-2xl">
              Hoe we dat waarmaken
            </h3>
            <ThreePillars layout="col" className="mt-8 w-full" />
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
