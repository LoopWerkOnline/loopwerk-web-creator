import { Eyebrow } from "@/components/Section";
import { scanSteps } from "@/lib/scan/questions";
import { hoursPerWeek } from "@/lib/scan/scoring";
import type { ScanAnswers, ScanScore } from "@/lib/scan/types";

import { LoopMotif } from "./LoopMotif";
import { ScanResult } from "./ScanResult";

function labelForOption(stepId: string, value: string): string {
  const step = scanSteps.find((s) => s.id === stepId);
  if (step?.kind !== "choice") return value;
  return step.options.find((o) => o.value === value)?.label ?? value;
}

/**
 * 6 stappen, 5 motief-fases: de matrix-stap (herhaling/oordeel) hoort
 * inhoudelijk nog bij "Handwerk", dus die schuift het motief niet verder.
 */
const PHASE_BY_STEP = [0, 1, 2, 2, 3, 4];

function processName(answers: ScanAnswers): string {
  if (answers.process === "anders") return answers.processOther || "Dit proces";
  return answers.process ? labelForOption("process", answers.process) : "";
}

/** Radiaal diagram: proces centraal, gekozen bronnen eromheen met dunne verbindingslijnen. */
function SourcesFlow({ sources }: { sources: string[] }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-52 w-52" role="img" aria-label="Informatiebronnen rondom het proces">
      {sources.map((s, i) => {
        const angle = (i / sources.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const label = labelForOption("sources", s);
        return (
          <g key={s}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              className="draw-in"
              stroke="var(--sage)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeOpacity="0.6"
            />
            <circle cx={x} cy={y} r="22" fill="var(--ink-hero)" stroke="var(--sage)" strokeWidth="1.5" />
            <text x={x} y={y + 3.5} textAnchor="middle" fontSize="7.5" fill="var(--cream)" opacity="0.85">
              {label.length > 10 ? `${label.slice(0, 9)}…` : label}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="28" fill="var(--home-accent)" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="#fff">
        Proces
      </text>
    </svg>
  );
}

/**
 * Het permanente groene paneel: tijdens de vragen bouwt het live het
 * procesprofiel op, na de laatste vraag toont het (via dezelfde DOM-wrapper
 * in scan.tsx, die alleen van breedte wisselt) het resultaat.
 */
export function ScanLivePanel({
  answers,
  stepIndex,
  score,
}: {
  answers: ScanAnswers;
  stepIndex: number;
  score?: ScanScore | undefined;
}) {
  if (score) {
    return <ScanResult score={score} />;
  }

  const name = processName(answers);
  const hours = hoursPerWeek(answers);

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col justify-center">
      <LoopMotif activePhase={PHASE_BY_STEP[stepIndex] ?? 4} variant="inline" className="mx-auto w-full max-w-xs" />

      {name ? (
        <div className="fade-up mt-10" key={`process-${name}`}>
          <Eyebrow tone="sage">Live procesprofiel</Eyebrow>
          <p className="mt-3 text-2xl leading-snug text-cream md:text-3xl">{name}</p>
        </div>
      ) : (
        <p className="mt-10 text-center text-sm leading-relaxed text-cream/50">
          Zodra je een proces kiest, bouwt dit paneel live mee.
        </p>
      )}

      {hours > 0 ? (
        <p className="fade-up mt-6 text-lg text-cream/80" key={`hours-${hours}`}>
          ±{Math.round(hours * 10) / 10} uur per week
        </p>
      ) : null}

      {answers.timeSinks.length > 0 ? (
        <div className="fade-up mt-6 flex flex-wrap justify-center gap-2" key={`sinks-${answers.timeSinks.join(",")}`}>
          {answers.timeSinks.map((s) => (
            <span key={s} className="rounded-full border border-cream/20 px-3 py-1 text-xs text-cream/70">
              {labelForOption("timeSinks", s)}
            </span>
          ))}
        </div>
      ) : null}

      {answers.sources.length > 0 ? (
        <div className="fade-up mt-8" key={`sources-${answers.sources.join(",")}`}>
          <SourcesFlow sources={answers.sources} />
        </div>
      ) : null}
    </div>
  );
}
