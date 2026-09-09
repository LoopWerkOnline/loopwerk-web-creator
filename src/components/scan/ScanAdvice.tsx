import { Link } from "@tanstack/react-router";

import { Eyebrow } from "@/components/Section";
import type { Richting } from "@/lib/scan/advice";
import type { ScanScore } from "@/lib/scan/types";

/**
 * Compacte weergave van de volledige analyse — leeft binnen het uitgeklapte
 * paneel van ScanLeadPreview, niet meer over de volle paginabreedte.
 */
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
  const showFirstStep = Boolean(firstStep) && score.band !== "beperkt";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/80">
            {p}
          </p>
        ))}
      </div>

      <div className="space-y-4">
        {showFirstStep && firstStep ? (
          <div className="rounded-xl bg-shell p-5">
            <Eyebrow tone="forest">Mogelijke eerste stap</Eyebrow>
            <p className="mt-2 text-base leading-snug">{firstStep.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{firstStep.body}</p>
          </div>
        ) : null}

        <div className="rounded-xl bg-shell p-5">
          <Eyebrow tone="forest">Wat zouden we juist bij mensen laten?</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed text-ink/80">{judgmentAdvice}</p>
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <p className="eyebrow text-ink/40">Mogelijke richting</p>
        <p className="mt-2 text-2xl leading-tight">{richting.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{richting.explain}</p>
        <Link
          to="/oplossingen/$slug"
          params={{ slug: richting.solutionSlug }}
          className="mt-4 inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
        >
          Bekijk deze richting
        </Link>
      </div>
    </div>
  );
}
