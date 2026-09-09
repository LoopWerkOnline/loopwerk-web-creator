import { Eyebrow } from "@/components/Section";
import type { ScanScore } from "@/lib/scan/types";

import { LoopMotif } from "./LoopMotif";

function ResultScale({ total }: { total: number }) {
  const pct = Math.max(2, Math.min(98, total));
  return (
    <div className="mt-10">
      <div className="relative h-1 w-full rounded-full bg-cream/20">
        <div
          className="absolute -top-[7px] h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-cream bg-home-accent shadow"
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

/**
 * Zuivere resultaat-inhoud — geen eigen Section meer. Wordt gerenderd binnen
 * de groene paneel-kolom (ScanLivePanel) zodra die kolom is uitgegroeid.
 */
export function ScanResult({ score }: { score: ScanScore }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <LoopMotif
        activePhase={4}
        variant="background"
        className="pointer-events-none absolute inset-x-0 -top-10 h-40 w-full opacity-30"
      />

      <div className="relative">
        <Eyebrow tone="sage">Jouw uitkomst</Eyebrow>
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
          <Eyebrow tone="home-accent">Hier zit nu ongeveer</Eyebrow>
          <p className="mt-4 text-4xl leading-tight md:text-5xl">{score.hoursPerWeek} uur per week</p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-cream/70">
            aan terugkerend werk in. Niet al die tijd kan of moet verdwijnen.
          </p>

          <div className="mt-8">
            <Eyebrow tone="sage">Mogelijk interessant om verder te onderzoeken</Eyebrow>
          </div>
          <p className="mt-3 text-2xl leading-tight md:text-3xl">
            {score.reviewLow}–{score.reviewHigh} uur per week
          </p>
        </div>

        <div className="fade-up mt-14 space-y-6 border-t border-cream/15 pt-10" style={{ animationDelay: "0.3s" }}>
          {score.dimensions.map((d) => (
            <div key={d.label} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:items-baseline">
              <Eyebrow tone="sage">{d.label}</Eyebrow>
              <p className="text-base leading-relaxed text-cream/80">{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
