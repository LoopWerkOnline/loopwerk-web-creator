import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { solutionBySlug } from "@/lib/content";
import { scanStatements, scoreScan } from "@/lib/scan";

const title = "Automatiseringsscan | LoopWerk";
const description =
  "Twaalf korte stellingen over waar bij jullie de tijd nu heen gaat. Geen verplichtingen, geen account, klaar in twee minuten.";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Scan,
});

type Phase = "intro" | "question" | "result";

function Scan() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [recognized, setRecognized] = useState<Set<string>>(new Set());

  const total = scanStatements.length;
  const current = scanStatements[step];

  function answer(yes: boolean) {
    if (!current) return;
    if (yes) {
      setRecognized((prev) => {
        const next = new Set(prev);
        next.add(current.id);
        return next;
      });
    }
    if (step === total - 1) {
      setPhase("result");
    } else {
      setStep((s) => s + 1);
    }
  }

  function restart() {
    setPhase("intro");
    setStep(0);
    setRecognized(new Set());
  }

  if (phase === "intro") {
    return (
      <Section tone="hero">
        <Eyebrow tone="sage">Automatiseringsscan</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-5xl leading-[1.08] md:text-6xl">
          Herken je hier iets <span className="hand text-[1.1em]">van</span>?
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75">
          Twaalf korte stellingen over waar bij bedrijven de tijd vaak in blijft zitten. Vink aan wat
          herkenbaar is, en we laten zien welke richting bij jullie past.
        </p>
        <ul className="mt-9 space-y-3 text-sm text-cream/60">
          <li>· Twee minuten, twaalf stellingen</li>
          <li>· Geen account, geen verplichtingen</li>
          <li>· Alleen een advies, geen kant-en-klare uitslag met loze cijfers</li>
        </ul>
        <button
          type="button"
          onClick={() => setPhase("question")}
          className="mt-9 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Start de scan
        </button>
      </Section>
    );
  }

  if (phase === "question" && current) {
    return (
      <Section tone="hero">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            {scanStatements.map((s, i) => (
              <span
                key={s.id}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-copper" : i < step ? "w-1.5 bg-copper/50" : "w-1.5 bg-cream/20"
                }`}
              />
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-cream/50">
            Vraag {step + 1} van {total}
          </p>

          <div
            key={current.id}
            className="fade-up mt-8 rounded-2xl border border-cream/10 bg-cream/5 p-8 text-center shadow-lg shadow-black/10 backdrop-blur-sm md:p-12"
          >
            <p className="eyebrow text-sage">Herken je dit?</p>
            <p className="mt-6 text-2xl leading-snug md:text-3xl">{current.text}</p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => answer(true)}
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Ja, herkenbaar
              </button>
              <button
                type="button"
                onClick={() => answer(false)}
                className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Niet zo
              </button>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  const result = scoreScan(recognized);
  const solution = result ? solutionBySlug(result.slug) : null;

  if (!result || !solution) {
    return (
      <Section tone="hero">
        <Eyebrow tone="sage">Uitslag</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-4xl leading-tight md:text-5xl">
          Hier herken je weinig van
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
          Dat kan goed nieuws zijn: misschien valt er bij jullie nu weinig te winnen met automatiseren.
          Twijfel je toch, of speelt er iets dat niet in dit rijtje stond?
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
          <button
            type="button"
            onClick={restart}
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Doe de scan opnieuw
          </button>
        </div>
      </Section>
    );
  }

  const prefill = `Ik deed de automatiseringsscan op loopwerkonline.nl. Herkenbaar voor ons:\n${result.recognizedTexts
    .map((t) => `- ${t}`)
    .join("\n")}\n\nDaar kwam "${solution.title}" uit als richting.`;

  return (
    <>
      <Section tone="hero" className="!pb-14">
        <Eyebrow tone="sage">Dit herkennen we bij jou</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] md:text-6xl">{solution.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">{solution.short}</p>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="rounded-2xl border border-line bg-cream p-8">
            <p className="eyebrow text-copper">Je herkende</p>
            <ul className="mt-5 space-y-3">
              {result.recognizedTexts.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-cream p-8">
            <p className="eyebrow text-forest">Bestaande basis</p>
            <p className="mt-4 text-sm text-ink/60">Dit hebben we al werkend liggen voor deze richting.</p>
            <ul className="mt-5 space-y-3">
              {solution.base.map((b) => (
                <li key={b} className="border-t border-line pt-3 text-sm leading-relaxed text-ink/75">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            search={{ prefill }}
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
          <Link
            to="/oplossingen/$slug"
            params={{ slug: solution.slug }}
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
          >
            Bekijk deze oplossing
          </Link>
          <button
            type="button"
            onClick={restart}
            className="text-sm font-semibold text-ink/50 underline underline-offset-4 hover:text-ink"
          >
            Opnieuw doen
          </button>
        </div>
      </Section>
    </>
  );
}
