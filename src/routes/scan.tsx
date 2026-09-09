import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Eyebrow } from "@/components/Section";
import { ScanProgress } from "@/components/scan/ScanProgress";
import { ChoiceTiles } from "@/components/scan/ChoiceTiles";
import { WorkloadStep } from "@/components/scan/WorkloadStep";
import { AutomationMatrix } from "@/components/scan/AutomationMatrix";
import { LoopMotif } from "@/components/scan/LoopMotif";
import { ScanLivePanel } from "@/components/scan/ScanLivePanel";
import { ScanLeadPreview } from "@/components/scan/ScanLeadPreview";
import { scanSteps } from "@/lib/scan/questions";
import { scoreScan } from "@/lib/scan/scoring";
import { pickRichting, buildAdviceParagraphs, buildJudgmentAdvice, buildFirstStep } from "@/lib/scan/advice";
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

type Phase = "intro" | "step" | "result";

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
      setPhase("result");
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
      <div className="flex min-h-[100dvh] flex-col md:flex-row">
        <div className="order-2 flex w-full flex-col justify-center bg-cream px-5 py-16 md:order-1 md:w-3/5 md:px-16 md:py-20">
          <div className="mx-auto w-full max-w-xl">
            <Eyebrow tone="forest">Loopwerk Scan</Eyebrow>
            <h1 className="mt-6 text-4xl leading-[1.1] md:text-6xl">
              Waar blijft binnen jullie bedrijf onnodig tijd liggen?
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink/70">
              Terugkerend werk hoort bij ieder bedrijf. Wanneer mensen steeds dezelfde informatie verzamelen,
              berekenen of overnemen, is dat vaak de moeite van bekijken waard.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Kies één proces en krijg in ± 4 minuten een eerste, concrete diagnose: hoeveel tijd erin zit, hoe
              groot de kans is, en waar je zelf niets aan zou veranderen.
            </p>
            <button
              type="button"
              onClick={() => setPhase("step")}
              className="mt-8 rounded-full bg-home-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Start de scan →
            </button>
            <p className="mt-5 text-sm font-medium text-ink/50">
              ± 4 minuten · direct inzicht · geen technische kennis nodig
            </p>
          </div>
        </div>

        <div className="order-1 flex w-full flex-col justify-center bg-ink-hero px-5 py-16 text-cream md:order-2 md:w-2/5 md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-sm">
            <Eyebrow tone="sage">Voorbeeld van een uitkomst</Eyebrow>
            <LoopMotif activePhase={4} variant="inline" className="mx-auto mt-8 w-full max-w-xs" />
            <p className="mt-8 text-2xl leading-snug text-cream md:text-3xl">Aanvragen &amp; calculaties</p>
            <p className="mt-4 text-4xl leading-tight text-cream md:text-5xl">10,5 u</p>
            <p className="mt-2 text-sm text-cream/60">per week aan terugkerend werk</p>
            <p className="mt-4 eyebrow text-home-accent">Duidelijke kans</p>
            <p className="hand mt-6 text-lg text-home-accent">zo ziet een diagnose eruit</p>
          </div>
        </div>
      </div>
    );
  }

  const isResult = phase === "result";
  const score = isResult ? scoreScan(answers) : undefined;
  const richting = isResult ? pickRichting(answers) : undefined;
  const paragraphs = score ? buildAdviceParagraphs(answers, score) : undefined;
  const judgmentAdvice = isResult ? buildJudgmentAdvice(answers) : undefined;
  const firstStep = isResult ? buildFirstStep(answers) : undefined;
  const contactPrefill =
    score && richting
      ? `Ik deed de Loopwerk Scan. Uitkomst: ${score.bandLabel} (${score.total}/100), richting "${richting.label}".`
      : "";

  const isProcessOther = step?.id === "process" && answers.process === "anders";
  const showNextButton =
    step?.kind === "workload" ||
    step?.kind === "matrix" ||
    (step?.kind === "choice" && (step.multi === true || isProcessOther));
  const nextDisabled =
    (step?.kind === "choice" &&
      step.multi === true &&
      answers[step.id as "timeSinks" | "sources" | "impact"].length === 0) ||
    (isProcessOther && answers.processOther.trim().length === 0);

  return (
    <>
      <div className="flex min-h-[100dvh] flex-col md:flex-row">
        <div
          className={`order-2 w-full flex-col justify-center bg-cream px-5 py-16 transition-all duration-500 ease-in-out md:order-1 md:px-12 md:py-20 ${
            isResult ? "hidden md:flex md:w-0 md:overflow-hidden md:px-0 md:py-0 md:opacity-0" : "flex md:w-3/5"
          }`}
        >
          {!isResult && step ? (
            <div className="mx-auto w-full max-w-xl">
              <ScanProgress step={stepIndex} total={total} onBack={goBack} />

              <div key={step.id} className="fade-up mt-10">
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
                    />
                  ) : null}

                  {step.kind === "workload" ? (
                    <WorkloadStep
                      volume={answers.volume}
                      duration={answers.duration}
                      onVolumeChange={(v) => setAnswer("volume", v)}
                      onDurationChange={(v) => setAnswer("duration", v)}
                    />
                  ) : null}

                  {step.kind === "matrix" ? (
                    <AutomationMatrix
                      repetition={answers.repetition}
                      judgment={answers.judgment}
                      onChange={(r, j) => {
                        setAnswer("repetition", r);
                        setAnswer("judgment", j);
                      }}
                    />
                  ) : null}
                </div>

                {showNextButton ? (
                  <div className="mt-9 flex justify-end">
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={nextDisabled}
                      className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                      Verder
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div
          className={`order-1 w-full bg-ink-hero px-5 py-16 text-cream transition-all duration-500 ease-in-out md:order-2 md:px-10 md:py-20 ${
            isResult ? "md:w-full" : "md:w-2/5"
          }`}
        >
          <ScanLivePanel answers={answers} stepIndex={stepIndex} score={score} />
        </div>
      </div>

      {isResult && score && richting && paragraphs && judgmentAdvice !== undefined ? (
        <>
          <ScanLeadPreview
            score={score}
            richting={richting}
            paragraphs={paragraphs}
            judgmentAdvice={judgmentAdvice}
            firstStep={firstStep ?? null}
            contactPrefill={contactPrefill}
          />

          <div className="bg-cream pb-16 text-center">
            <div className="mx-auto max-w-6xl px-5">
              <button
                type="button"
                onClick={restart}
                className="text-sm font-semibold text-ink/50 underline underline-offset-4 hover:text-ink"
              >
                Doe de scan opnieuw
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
