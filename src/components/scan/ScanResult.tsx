import { Section } from "@/components/Section";
import type { ScanScore } from "@/lib/scan/types";

function ResultScale({ total }: { total: number }) {
  const pct = Math.max(2, Math.min(98, total));
  return (
    <div className="mt-10">
      <div className="relative h-1 w-full rounded-full bg-cream/20">
        <div
          className="absolute -top-[7px] h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-forest bg-copper shadow"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-5 grid grid-cols-4 text-xs text-cream/55">
        <span>Beperkt</span>
        <span className="text-center">Gerichte kans</span>
        <span className="text-center">Duidelijk</span>
        <span className="text-right">Hoog</span>
      </div>
    </div>
  );
}

/** Het sterkste visuele moment: één groot forest-vlak, geen dashboard, geen speedometer. */
export function ScanResult({ score }: { score: ScanScore }) {
  return (
    <Section tone="forest">
      <div className="mx-auto max-w-2xl">
        <p className="fade-up eyebrow flex items-center gap-3 text-sage">
          <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
          Jouw uitkomst
        </p>
        <h1 className="fade-up mt-6 text-4xl leading-[1.1] md:text-6xl" style={{ animationDelay: "0.06s" }}>
          {score.bandLabel}
        </h1>
        <p className="fade-up mt-4 text-lg text-cream/60" style={{ animationDelay: "0.12s" }}>
          {score.total} / 100 — een indicatie, geen exacte wetenschap.
        </p>

        <div className="fade-up" style={{ animationDelay: "0.18s" }}>
          <ResultScale total={score.total} />
        </div>

        <div className="fade-up mt-14 border-t border-cream/15 pt-10" style={{ animationDelay: "0.24s" }}>
          <p className="eyebrow text-copper">Hier zit nu ongeveer</p>
          <p className="mt-4 text-4xl leading-tight md:text-5xl">{score.hoursPerWeek} uur per week</p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-cream/70">
            aan terugkerend werk in. Niet al die tijd kan of moet verdwijnen.
          </p>

          <p className="mt-8 eyebrow text-sage">Mogelijk interessant om verder te onderzoeken</p>
          <p className="mt-3 text-2xl leading-tight md:text-3xl">
            {score.reviewLow}–{score.reviewHigh} uur per week
          </p>
        </div>

        <div className="fade-up mt-14 space-y-6 border-t border-cream/15 pt-10" style={{ animationDelay: "0.3s" }}>
          {score.dimensions.map((d) => (
            <div key={d.label} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <p className="eyebrow text-sage">{d.label}</p>
              <p className="text-base leading-relaxed text-cream/80">{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
