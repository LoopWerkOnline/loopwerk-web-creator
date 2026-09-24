import { Section, Eyebrow } from "@/components/Section";
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
 * Resultaatpagina: een set afgeronde kaarten (groen voor de uitkomst en het
 * belangrijkste cijfer, beige voor de duiding eromheen) i.p.v. één
 * doorlopend vol paneel — zelfde opbouw als de rest van de site.
 */
export function ScanResult({ score }: { score: ScanScore }) {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-4xl">
        <div
          className="fade-up relative overflow-hidden rounded-3xl bg-ink-hero p-8 text-cream md:p-12"
          style={{ animationDelay: "0s" }}
        >
          <LoopMotif
            activePhase={4}
            variant="background"
            className="pointer-events-none absolute inset-x-0 -top-10 h-40 w-full opacity-30"
          />
          <div className="relative">
            <Eyebrow tone="sage">Jouw uitkomst</Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.1] md:text-6xl">{score.bandLabel}</h1>
            <p className="mt-4 text-lg text-cream/60">
              {score.total} / 100 — een indicatie, geen exacte wetenschap.
            </p>
            <ResultScale total={score.total} />
          </div>
        </div>

        <div className="fade-up mt-6 grid gap-6 md:grid-cols-2" style={{ animationDelay: "0.08s" }}>
          <div className="rounded-2xl bg-ink-hero p-8 text-cream md:p-9">
            <Eyebrow tone="home-accent">Hier zit nu ongeveer</Eyebrow>
            <p className="mt-4 text-4xl leading-tight md:text-5xl">
              {score.hoursPerWeek} uur per week
            </p>
            <p className="mt-3 leading-relaxed text-cream/70">
              aan terugkerend werk in. Niet al die tijd kan of moet verdwijnen.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-shell p-8 md:p-9">
            <Eyebrow tone="forest">Mogelijk interessant om verder te onderzoeken</Eyebrow>
            <p className="mt-4 text-2xl leading-tight text-ink md:text-3xl">
              {score.reviewLow}–{score.reviewHigh} uur per week
            </p>
          </div>
        </div>

        <div
          className="fade-up mt-6 rounded-2xl border border-line bg-cream p-8 md:p-9"
          style={{ animationDelay: "0.16s" }}
        >
          <Eyebrow tone="forest">Wat hierin meespeelt</Eyebrow>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">
            Meestal zit de winst hier niet in één grote ingreep, maar in een paar losse dingen die
            je tegelijk zou automatiseren.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {score.dimensions.map((d) => (
              <div key={d.label} className="rounded-xl bg-shell p-5">
                <p className="eyebrow text-ink/45">{d.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
