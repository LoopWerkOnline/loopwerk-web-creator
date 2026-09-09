import { Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import type { Richting } from "@/lib/scan/advice";
import type { ScanScore } from "@/lib/scan/types";

export function ScanAdvice({
  paragraphs,
  firstStep,
  judgmentAdvice,
  richting,
  score,
}: {
  paragraphs: string[];
  firstStep: { title: string; body: string } | null;
  judgmentAdvice: string;
  richting: Richting;
  score: ScanScore;
}) {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow tone="home-accent">Waar wij als eerste naar zouden kijken</Eyebrow>
        <div className="mt-6 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink/80">
              {p}
            </p>
          ))}
        </div>

        {firstStep && score.band !== "beperkt" ? (
          <div className="mt-8 rounded-2xl border border-line bg-shell p-7">
            <Eyebrow tone="forest">Mogelijke eerste stap</Eyebrow>
            <p className="mt-3 text-xl leading-snug">{firstStep.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{firstStep.body}</p>
          </div>
        ) : null}

        <div className="mt-12 rounded-2xl border border-line bg-shell p-7">
          <Eyebrow tone="forest">Wat zouden we juist bij mensen laten?</Eyebrow>
          <p className="mt-4 text-base leading-relaxed text-ink/80">{judgmentAdvice}</p>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <p className="eyebrow text-ink/40">Mogelijke richting</p>
          <p className="mt-3 text-3xl leading-tight">{richting.label}</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/70">{richting.explain}</p>
          <Link
            to="/oplossingen/$slug"
            params={{ slug: richting.solutionSlug }}
            className="mt-6 inline-flex rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
          >
            Bekijk deze richting
          </Link>
        </div>
      </div>
    </Section>
  );
}
