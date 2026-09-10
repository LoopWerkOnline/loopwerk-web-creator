import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Reveal } from "@/components/Reveal";
import { SolutionCheck } from "@/components/solution/SolutionCheck";
import { ConfiguratorFlow } from "@/components/infographics";
import { sspwStap1, sspwStap2, sspwStap3 } from "@/lib/assets";
import { solutionBySlug, solutions } from "@/lib/content";

export const Route = createFileRoute("/oplossingen/$slug")({
  loader: ({ params }) => {
    const solution = solutionBySlug(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Oplossing niet gevonden | LoopWerk" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.solution.title} | LoopWerk`;
    const d = loaderData.solution.short;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: SolutionNotFound,
  component: SolutionPage,
});

function SolutionNotFound() {
  return (
    <Section>
      <h1 className="text-4xl">Deze oplossing bestaat niet</h1>
      <Link to="/oplossingen" className="mt-6 inline-block text-forest underline underline-offset-4">
        Terug naar alle oplossingen
      </Link>
    </Section>
  );
}

function SolutionPage() {
  const { solution } = Route.useLoaderData();
  const others = solution.journeyStep
    ? solutions
        .filter((s) => s.journeyStep !== undefined && s.slug !== solution.slug)
        .sort((a, b) => (a.journeyStep ?? 0) - (b.journeyStep ?? 0))
    : solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      {solution.image ? (
        <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-ink-hero text-cream sm:min-h-[500px] md:min-h-[560px]">
          <img
            src={solution.image}
            alt={solution.imageAlt ?? ""}
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
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:pb-16 md:pt-32">
            <div className="max-w-3xl">
              <p className="fade-up eyebrow text-sage" style={{ animationDelay: "0s" }}>
                Oplossing
              </p>
              <h1 className="fade-up mt-6 text-4xl leading-[1.1] md:text-6xl" style={{ animationDelay: "0.08s" }}>
                {solution.title}
              </h1>
              <p
                className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
                style={{ animationDelay: "0.16s" }}
              >
                {solution.intro}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <Section tone="hero" className="!pb-14">
          <Reveal>
            <Eyebrow tone="sage">Oplossing</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">{solution.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">{solution.intro}</p>
          </Reveal>
        </Section>
      )}

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <Reveal>
            {solution.check ? (
              <>
                <Eyebrow tone="home-accent">Herken je dit bij jullie?</Eyebrow>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  Vink aan wat herkenbaar is. Hoe meer het is, hoe groter de kans dat hier iets te winnen valt.
                </p>
                <SolutionCheck check={solution.check} />
              </>
            ) : (
              <>
                <Eyebrow tone="home-accent">Wat we vaak zien</Eyebrow>
                <ul className="mt-6 space-y-4">
                  {solution.signals.map((s) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-ink/80">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-home-accent" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-line bg-shell p-8">
              <p className="hand text-2xl text-forest">Zo pakken we het aan</p>
              <p className="mt-3 leading-relaxed text-ink/75">
                {solution.approach ??
                  "We starten bij wat er al ligt en vullen aan met wat bij jullie anders is. Daardoor staat er sneller iets werkends dan bij bouwen vanaf nul."}
              </p>
            </div>
            {solution.firstMonth ? (
              <div className="mt-6 rounded-xl border border-line bg-shell p-8">
                <p className="hand text-2xl text-forest">Wat je er de eerste maand van ziet</p>
                <p className="mt-3 leading-relaxed text-ink/75">{solution.firstMonth}</p>
              </div>
            ) : null}
          </Reveal>
        </div>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Bestaande basis</Eyebrow>
            <p className="mt-4 text-sm text-ink/60">Dit weten we hoe we moeten bouwen.</p>
            <ul className="mt-6 space-y-4">
              {solution.base.map((b) => (
                <li key={b} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow tone="home-accent">Maatwerk</Eyebrow>
            <p className="mt-4 text-sm text-ink/60">Dit maken we passend voor jullie.</p>
            <ul className="mt-6 space-y-4">
              {solution.custom.map((c) => (
                <li key={c} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {solution.featured ? (
        <Section>
          <Reveal>
            <Eyebrow>In de praktijk</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
              De zwembadconfigurator die we voor SSPW bouwden
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
              Drie stappen: formaat, uitvoering en gegevens. De bezoeker stelt zelf samen, ziet wat
              inbegrepen is en wat extra kost. SSPW ontvangt een conceptofferte plus een vastgelegde
              lead.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ConfiguratorFlow className="mt-10 w-full max-w-3xl" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal><BrowserFrame src={sspwStap1} alt="Stap 1 van de configurator: formaat kiezen" label="Stap 1: Formaat" /></Reveal>
            <Reveal delay={0.08}><BrowserFrame src={sspwStap2} alt="Stap 2 van de configurator: uitvoering en opties" label="Stap 2: Uitvoering" /></Reveal>
            <Reveal delay={0.16}><BrowserFrame src={sspwStap3} alt="Stap 3 van de configurator: gegevens en prijsindicatie" label="Stap 3: Prijsindicatie" /></Reveal>
          </div>
          <Link
            to="/cases/sspw-zwembadconfigurator"
            className="mt-8 inline-block text-sm font-semibold text-forest underline underline-offset-4"
          >
            Lees de volledige case
          </Link>
        </Section>
      ) : solution.proofNote ? (
        <Section>
          <Reveal>
            <Eyebrow>Nog geen losse case</Eyebrow>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{solution.proofNote}</p>
            <Link
              to="/cases/sspw-zwembadconfigurator"
              className="mt-4 inline-block text-sm font-semibold text-forest underline underline-offset-4"
            >
              Bekijk die case
            </Link>
          </Reveal>
        </Section>
      ) : null}

      <Section tone="ink">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Zullen we kijken of dit bij jullie past?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Eén gesprek van een half uur is meestal genoeg om te bepalen of hier iets te winnen
              valt.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-sage">
              {solution.journeyStep ? "Andere stappen in dit proces" : "Andere richtingen"}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to="/oplossingen/$slug"
                    params={{ slug: o.slug }}
                    className="text-cream/75 underline underline-offset-4 hover:text-cream"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
