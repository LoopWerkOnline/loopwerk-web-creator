import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { ManualSteps } from "@/components/infographics";
import { sectorBySlug, sectors, solutionBySlug } from "@/lib/content";

export const Route = createFileRoute("/sectoren/$slug")({
  loader: ({ params }) => {
    const sector = sectorBySlug(params.slug);
    if (!sector) throw notFound();
    return { sector };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Sector niet gevonden — LoopWerk" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.sector.title} — LoopWerk`;
    const d = loaderData.sector.short;
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
  notFoundComponent: SectorNotFound,
  component: SectorPage,
});

function SectorNotFound() {
  return (
    <Section>
      <h1 className="text-4xl">Deze sector bestaat niet</h1>
      <Link to="/sectoren" className="mt-6 inline-block text-forest underline underline-offset-4">
        Terug naar alle sectoren
      </Link>
    </Section>
  );
}

function SectorPage() {
  const { sector } = Route.useLoaderData();
  const linked = sector.solutions.map(solutionBySlug).filter(Boolean);
  const others = sectors.filter((s) => s.slug !== sector.slug);

  return (
    <>
      <Section tone="shell" className="!pb-14">
        <Eyebrow>Sector</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">{sector.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{sector.intro}</p>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <Eyebrow>Wat we vaak zien</Eyebrow>
            <ul className="mt-6 space-y-4">
              {sector.seen.map((s) => (
                <li key={s} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow tone="copper">Waar het handwerk ontstaat</Eyebrow>
            <ul className="mt-6 space-y-4">
              {sector.friction.map((s) => (
                <li key={s} className="border-t border-line pt-4 leading-relaxed text-ink/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ManualSteps className="mt-16 w-full max-w-3xl" />
      </Section>

      <Section tone="shell">
        <Eyebrow>Wat hier meestal bij past</Eyebrow>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {linked.map((s) => (
            <Link
              key={s!.slug}
              to="/oplossingen/$slug"
              params={{ slug: s!.slug }}
              className="flex flex-col bg-cream p-8 transition-colors hover:bg-shell"
            >
              <span className="eyebrow text-copper">{s!.n}</span>
              <h2 className="mt-3 text-xl">{s!.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{s!.short}</p>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-2xl leading-relaxed text-ink/70">
          <span className="hand text-xl text-forest">En dan het maatwerk: </span>
          {sector.custom}
        </p>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <h2 className="text-3xl md:text-4xl">Herkenbaar bij jullie?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Vertel wat er nu gebeurt, dan zeggen wij of er iets te winnen valt — en zo niet, ook
              dat.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Plan een gesprek
            </Link>
          </div>
          <div>
            <p className="eyebrow text-sage">Andere sectoren</p>
            <ul className="mt-4 space-y-3 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to="/sectoren/$slug"
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
