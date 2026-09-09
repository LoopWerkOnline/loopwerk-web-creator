import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { ScanProgress } from "@/components/scan/ScanProgress";
import { ChoiceTiles } from "@/components/scan/ChoiceTiles";
import { ScaleInput } from "@/components/scan/ScaleInput";
import { TimeSlider } from "@/components/scan/TimeSlider";
import { ScanTransition } from "@/components/scan/ScanTransition";
import { ScanResult } from "@/components/scan/ScanResult";
import { ScanAdvice } from "@/components/scan/ScanAdvice";
import { ScanMethodology } from "@/components/scan/ScanMethodology";
import { ScanLeadPreview } from "@/components/scan/ScanLeadPreview";
import { scanSteps } from "@/lib/scan/questions";
import { scoreScan } from "@/lib/scan/scoring";
import { pickRichting, buildAdviceParagraphs, buildJudgmentAdvice, buildFirstStep, buildTransitionSummary } from "@/lib/scan/advice";
import { initialAnswers, type ScanAnswers } from "@/lib/scan/types";

const title = "Loopwerk Scan | LoopWerk";
const description =
  "Waar blijft binnen jullie bedrijf onnodig tijd liggen? Kies één terugkerend proces en krijg in ± 4 minuten een eerste, concrete indicatie.";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ScanPage,
});

type Phase = "intro" | "step" | "transition" | "result";

function ScanPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ScanAnswers>(initialAnswers);

  const total = scanSteps.length;
  const step = scanSteps[stepIndex];

  function restart() {
    setPhase("intro");
    setStepIndex(0);
    setAnswers(initialAnswers);
  }

  function goNext() {
    if (stepIndex === total - 1) {
      setPhase("transition");
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (stepIndex === 0) {
      setPhase("intro");
    } else {
      setStepIndex((i) => i - 1);
    }
  }

  function setAnswer<K extends keyof ScanAnswers>(key: K, value: ScanAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMulti(key: "timeSinks" | "sources" | "impact", value: string, max?: number) {
    setAnswers((prev) => {
      const current = prev[key];
      const has = current.includes(value);
      if (has) return { ...prev, [key]: current.filter((v) => v !== value) };
      if (max && current.length >= max) return prev;
      return { ...prev, [key]: [...current, value] };
    });
  }

  if (phase === "intro") {
    return (
      <Section tone="cream">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="forest">Loopwerk Scan</Eyebrow>
          <h1 className="mt-6 text-4xl leading-[1.1] md:text-6xl">
            Waar blijft binnen jullie bedrijf <span className="hand text-[1.1em]">onnodig</span> tijd liggen?
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-ink/70">
            Terugkerend werk hoort bij ieder bedrijf. Maar wanneer mensen steeds dezelfde informatie
            verzamelen, berekenen, overnemen of opnieuw opvragen, kan het interessant zijn om te kijken wat
            slimmer kan.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">De Loopwerk Scan kijkt naar één terugkerend proces en geeft een eerste indicatie van:</p>
          <ul className="mx-auto mt-5 max-w-md space-y-2 text-left text-base text-ink/70">
            <li>· hoeveel tijd erin zit</li>
            <li>· hoeveel automatiseringspotentieel er is</li>
            <li>· waar de grootste kans ligt</li>
            <li>· en wat je juist níét als eerste zou automatiseren</li>
          </ul>
          <p className="mt-8 text-sm font-medium text-ink/50">
            ± 4 minuten · direct inzicht · geen technische kennis nodig
          </p>
          <button
            type="button"
            onClick={() => setPhase("step")}
            className="mt-8 rounded-full bg-copper px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Start de scan
          </button>

          <div className="mt-16 rounded-2xl border border-line bg-shell p-7 text-left">
            <p className="text-sm font-medium text-ink/70">
              Kies één proces dat regelmatig terugkomt en waarvan je vermoedt dat er onnodig handwerk in zit.
            </p>
            <p className="mt-2 text-sm text-ink/50">
              Aanvragen · calculaties · offertes · administratie · opvolging · werkvoorbereiding
            </p>
          </div>
        </div>
      </Section>
    );
  }

  if (phase === "step" && step) {
    const isProcessOther = step.id === "process" && answers.process === "anders";
    const showNextButton =
      step.kind === "scale" ||
      step.kind === "volume" ||
      step.kind === "duration" ||
      (step.kind === "choice" && (step.multi || isProcessOther));
    const nextDisabled =
      (step.kind === "choice" &&
        step.multi &&
        answers[step.id as "timeSinks" | "sources" | "impact"].length === 0) ||
      (isProcessOther && answers.processOther.trim().length === 0);

    return (
      <Section tone="cream">
        <ScanProgress step={stepIndex} total={total} onBack={goBack} />

        <div key={step.id} className="fade-up mx-auto mt-10 max-w-xl">
          <h2 className="text-3xl leading-tight md:text-4xl">{step.heading}</h2>
          {step.sub ? <p className="mt-3 text-base leading-relaxed text-ink/60">{step.sub}</p> : null}

          <div className="mt-8">
            {step.kind === "choice" && step.id === "process" ? (
              <ChoiceTiles
                options={step.options}
                selected={answers.process ? [answers.process] : []}
                onToggle={() => {}}
                allowOther={step.allowOther}
                otherValue={answers.processOther}
                onOtherChange={(v) => setAnswer("processOther", v)}
                onSelectSingle={(value) => {
                  setAnswer("process", value);
                  if (value !== "anders") setTimeout(goNext, 220);
                }}
              />
            ) : null}

            {step.kind === "choice" && step.id !== "process" ? (
              <ChoiceTiles
                options={step.options}
                multi={step.multi}
                max={step.max}
                selected={answers[step.id as "timeSinks" | "sources" | "impact"]}
                onToggle={(value) => toggleMulti(step.id as "timeSinks" | "sources" | "impact", value, step.max)}
                onSelectSingle={(value) => {
                  setAnswer("team", value);
                  setTimeout(goNext, 220);
                }}
              />
            ) : null}

            {step.kind === "scale" ? (
              <ScaleInput
                value={answers[step.id as "repetition" | "judgment"]}
                onChange={(v) => setAnswer(step.id as "repetition" | "judgment", v)}
                leftLabel={step.leftLabel}
                rightLabel={step.rightLabel}
                variant={step.variant}
                note={step.note(answers[step.id as "repetition" | "judgment"])}
              />
            ) : null}

            {step.kind === "volume" ? (
              <TimeSlider
                options={step.options}
                value={answers.volume || step.options[2]!.value}
                onChange={(v) => setAnswer("volume", v)}
              />
            ) : null}

            {step.kind === "duration" ? (
              <TimeSlider
                options={step.options}
                value={answers.duration || step.options[3]!.value}
                onChange={(v) => setAnswer("duration", v)}
                insight={
                  answers.volume
                    ? (() => {
                        const vol = scanSteps.find((s) => s.id === "volume");
                        if (vol?.kind !== "volume") return undefined;
                        const v = vol.options.find((o) => o.value === answers.volume);
                        const durationValue = answers.duration || step.options[3]!.value;
                        const d = step.options.find((o) => o.value === durationValue);
                        if (!v || !d) return undefined;
                        const hours = Math.round(((v.midpoint * d.minutes) / 60) * 10) / 10;
                        return `Bij ${v.label.toLowerCase()} is dat al ruim ${hours} uur.`;
                      })()
                    : undefined
                }
              />
            ) : null}
          </div>

          {showNextButton ? (
            <div className="mt-9 flex justify-end">
              <button
                type="button"
                onClick={goNext}
                disabled={nextDisabled}
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Verder
              </button>
            </div>
          ) : null}
        </div>
      </Section>
    );
  }

  if (phase === "transition") {
    return <ScanTransition lines={buildTransitionSummary(answers)} onContinue={() => setPhase("result")} />;
  }

  const score = scoreScan(answers);
  const richting = pickRichting(answers);
  const paragraphs = buildAdviceParagraphs(answers, score);
  const judgmentAdvice = buildJudgmentAdvice(answers);
  const firstStep = buildFirstStep(answers);
  const contactPrefill = `Ik deed de Loopwerk Scan. Uitkomst: ${score.bandLabel} (${score.total}/100), richting "${richting.label}".`;

  return (
    <>
      <ScanResult score={score} />
      <ScanAdvice
        paragraphs={paragraphs}
        firstStep={firstStep}
        judgmentAdvice={judgmentAdvice}
        richting={richting}
        score={score}
      />
      <ScanMethodology />
      <ScanLeadPreview contactPrefill={contactPrefill} />

      <div className="bg-cream pb-16 text-center">
        <button type="button" onClick={restart} className="text-sm font-semibold text-ink/50 underline underline-offset-4 hover:text-ink">
          Doe de scan opnieuw
        </button>
      </div>
    </>
  );
}
