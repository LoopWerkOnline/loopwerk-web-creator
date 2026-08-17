import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BrowserFrame } from "@/components/BrowserFrame";
import { ConfiguratorFlow } from "@/components/infographics";
import { sspwStap1, sspwStap2, sspwStap3 } from "@/lib/assets";
import { solutionBySlug, solutions, sectors } from "@/lib/content";

export const Route = createFileRoute("/oplossingen/$slug")({
  loader: ({ params }) => {
    const solution = solutionBySlug(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Oplossing niet gevonden — LoopWerk" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.solution.title} — LoopWerk`;
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
  const related = sectors.filter((s) => s.solutions.includes(solution.slug));
  const others = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <Section tone="shell" className="!pb-14">
        <Eyebrow>Oplossing {solution.n}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">{solution.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{solution.intro}</p>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <Eyebrow tone="copper">Wat we vaak zien</Eyebrow>
            <ul className="mt-6 space-y-4">
              {solution.signals.map((s) => (
                <li key={s} className="flex gap-3 leading-relaxed text-ink/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-shell p-8">
            <p className="hand text-2xl text-forest">Zo pakken we het aan</p>
            <p className="mt-3 leading-relaxed text-ink/75">
              We starten bij wat er al ligt en vullen aan met wat bij jullie anders is. Daardoor
              staat er sneller iets werkends dan bij bouwen vanaf nul.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Bestaande basis</Eyebrow>
            <p className="mt-4 text-sm text-ink/60">Dit hebben we al werkend liggen.</p>
            <ul className="mt-6 space-y-4">
              {solution.base.map((b) => (
                <li key={b} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow tone="copper">Maatwerk</Eyebrow>
            <p className="mt-4 text-sm text-ink/60">Dit maken we passend voor jullie.</p>
            <ul className="mt-6 space-y-4">
              {solution.custom.map((c) => (
                <li key={c} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {solution.featured ? (
        <Section>
          <Eyebrow>In de praktijk</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
            De zwembadconfigurator die we voor SSPW bouwden
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
            Drie stappen: formaat, uitvoering en gegevens. De bezoeker stelt zelf samen, ziet wat
            inbegrepen is en wat extra kost. SSPW ontvangt een conceptofferte plus een vastgelegde
            lead.
          </p>
          <ConfiguratorFlow className="mt-10 w-full max-w-3xl" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <BrowserFrame src={sspwStap1} alt="Stap 1 van de configurator: formaat kiezen" label="Stap 1 — Formaat" />
            <BrowserFrame src={sspwStap2} alt="Stap 2 van de configurator: uitvoering en opties" label="Stap 2 — Uitvoering" />
            <BrowserFrame src={sspwStap3} alt="Stap 3 van de configurator: gegevens en prijsindicatie" label="Stap 3 — Prijsindicatie" />
          </div>
          <Link
            to="/cases/sspw-zwembadconfigurator"
            className="mt-8 inline-block text-sm font-semibold text-forest underline underline-offset-4"
          >
            Lees de volledige case
          </Link>
        </Section>
      ) : null}

      {related.length ? (
        <Section tone="shell">
          <Eyebrow>Speelt vooral in</Eyebrow>
          <div className="mt-8 flex flex-wrap gap-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                to="/sectoren/$slug"
                params={{ slug: s.slug }}
                className="rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium transition-colors hover:border-forest"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="ink">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <h2 className="text-3xl md:text-4xl">Zullen we kijken of dit bij jullie past?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Eén gesprek van een half uur is meestal genoeg om te bepalen of hier iets te winnen
              valt.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
          </div>
          <div>
            <p className="eyebrow text-sage">Andere richtingen</p>
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
          </div>
        </div>
      </Section>
    </>
  );
}
