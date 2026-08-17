import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { sectors } from "@/lib/content";

const title = "Sectoren — LoopWerk";
const description =
  "Bouw & installatie, maakindustrie, handel, mobiliteit en maatwerkverkoop: waar in deze sectoren onnodig handwerk ontstaat en wat eraan te doen is.";

export const Route = createFileRoute("/sectoren/")({
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
  component: SectorenPage,
});

function SectorenPage() {
  return (
    <>
      <Section tone="shell" className="!pb-14">
        <Eyebrow>Sectoren</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          We kennen het werk waar de <span className="hand text-[1.15em]">tijd</span> in gaat zitten
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
          Elk bedrijf is anders, maar per sector zijn de knelpunten herkenbaar. Hieronder wat we
          tegenkomen en welke richting daar meestal bij past.
        </p>
      </Section>

      <Section>
        <ul className="divide-y divide-line border-y border-line">
          {sectors.map((s) => (
            <li key={s.slug}>
              <Link
                to="/sectoren/$slug"
                params={{ slug: s.slug }}
                className="group grid gap-4 py-10 transition-colors hover:bg-shell md:grid-cols-[1fr_1.4fr] md:items-baseline md:px-4"
              >
                <h2 className="text-2xl md:text-3xl">{s.title}</h2>
                <div>
                  <p className="leading-relaxed text-ink/70">{s.short}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-forest underline underline-offset-4">
                    Bekijk deze sector
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl leading-relaxed text-ink/60">
          Staat jullie sector er niet bij? De onderliggende problemen — informatie te laat compleet,
          prijzen met de hand opzoeken, gegevens overtypen — komen overal terug.
        </p>
      </Section>
    </>
  );
}
