import { ArrowLeft, ArrowRight, Layers, Settings, Users, Zap } from "lucide-react";

import { buildQuadrantText } from "@/lib/scan/advice";

/** Representatieve (repetition, judgment)-waarde per kwadrant — zelfde schaal (1–5) als voorheen. */
const quadrants = [
  {
    icon: Layers,
    title: "Eerst structureren",
    body: "Er zit logica in, maar het proces moet eerst duidelijker worden gemaakt.",
    repetition: 2,
    judgment: 4,
  },
  {
    icon: Zap,
    title: "Klaar voor automatisering",
    body: "Veel herhaling, weinig oordeel. Dit kan vaak direct slimmer.",
    repetition: 4,
    judgment: 4,
  },
  {
    icon: Users,
    title: "Menselijk maatwerk",
    body: "Veel variatie en veel oordeel. Eerst onderzoeken of standaardiseren zinvol is.",
    repetition: 2,
    judgment: 2,
  },
  {
    icon: Settings,
    title: "Automatiseren met controle",
    body: "De tool bereidt voor, de medewerker controleert of beslist.",
    repetition: 4,
    judgment: 2,
  },
] as const;

/**
 * 2x2 keuzematrix: x = herhaling, y = menselijk oordeel. Vier klikbare
 * kwadranten in plaats van een sleepbaar punt — elk kwadrant zet repetition/
 * judgment op een representatieve waarde voor dat kwadrant.
 */
export function AutomationMatrix({
  repetition,
  judgment,
  onChange,
}: {
  repetition: number;
  judgment: number;
  onChange: (repetition: number, judgment: number) => void;
}) {
  const highRepetition = repetition >= 3;
  const exceptionOnlyJudgment = judgment >= 3;

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-2 text-center text-xs text-ink/45">↑ Weinig menselijk oordeel</p>

      <div className="flex items-stretch justify-center gap-2 sm:gap-3">
        <div className="hidden shrink-0 flex-col items-center justify-center gap-2 sm:flex">
          <ArrowLeft className="h-4 w-4 shrink-0 text-ink/40" aria-hidden="true" />
          <span className="whitespace-nowrap text-xs text-ink/45 [writing-mode:vertical-rl] rotate-180">
            Elke keer anders
          </span>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-shell">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {quadrants.map((q) => {
              const Icon = q.icon;
              const isActive =
                highRepetition === q.repetition >= 3 && exceptionOnlyJudgment === q.judgment >= 3;
              return (
                <button
                  key={q.title}
                  type="button"
                  onClick={() => onChange(q.repetition, q.judgment)}
                  aria-pressed={isActive}
                  className={`flex flex-col items-start gap-1.5 p-3 text-left transition-colors sm:gap-2 sm:p-5 ${
                    isActive ? "bg-home-accent/10" : "hover:bg-cream/60"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
                      isActive ? "bg-home-accent text-white" : "bg-cream text-home-accent"
                    }`}
                  >
                    <Icon
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </span>
                  <p className="text-xs font-semibold leading-snug text-ink sm:text-sm">
                    {q.title}
                  </p>
                  <p className="hidden text-xs leading-snug text-ink/60 sm:block">{q.body}</p>
                </button>
              );
            })}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-line"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-line"
            aria-hidden="true"
          />
        </div>

        <div className="hidden shrink-0 flex-col items-center justify-center gap-2 sm:flex">
          <span className="whitespace-nowrap text-xs text-ink/45 [writing-mode:vertical-rl]">
            Vaak dezelfde stappen
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-ink/40" aria-hidden="true" />
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-ink/45">↓ Veel menselijk oordeel</p>

      <p
        className="fade-up mt-6 text-sm leading-relaxed text-ink/70"
        key={`quadrant-${highRepetition ? 1 : 0}-${exceptionOnlyJudgment ? 1 : 0}`}
      >
        {buildQuadrantText(repetition, judgment)}
      </p>
    </div>
  );
}
