import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { solutionBySlug } from "@/lib/content";
import { scanStatements, scoreScan } from "@/lib/scan";
import { supabase } from "@/integrations/supabase/client";

const title = "Gratis advies | LoopWerk";
const description =
  "Twaalf korte stellingen over waar bij jullie de tijd nu heen gaat. Geen verplichtingen, geen account, klaar in twee minuten. Direct een concreet advies, geen loze cijfers.";

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
        <Eyebrow tone="sage">Gratis advies</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-5xl leading-[1.08] md:text-6xl">
          Ontdek of jouw bedrijf <span className="hand text-[1.1em]">automatisering</span> nodig heeft
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/75">
          Twaalf korte stellingen over waar bij bedrijven de tijd vaak in blijft zitten. Vink aan wat
          herkenbaar is, en je krijgt meteen een concreet advies: welke richting past, en wat we
          daarvoor al klaar hebben liggen.
        </p>
        <ul className="mt-9 space-y-3 text-sm text-cream/60">
          <li>· Twee minuten, twaalf stellingen</li>
          <li>· Geen account, geen verplichtingen</li>
          <li>· Direct een concreet advies, geen kant-en-klare uitslag met loze cijfers</li>
        </ul>
        <button
          type="button"
          onClick={() => setPhase("question")}
          className="mt-9 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Start het advies
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

  const prefill = `Ik deed de scan op loopwerkonline.nl. Herkenbaar voor ons:\n${result.recognizedTexts
    .map((t) => `- ${t}`)
    .join("\n")}\n\nDaar kwam "${solution.title}" uit als richting.`;

  return (
    <>
      <Section tone="hero" className="!pb-14">
        <Eyebrow tone="sage">Dit herkennen we bij jou</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] md:text-6xl">{solution.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">{solution.intro}</p>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <div className="rounded-2xl border border-line bg-cream p-8">
          <p className="eyebrow text-copper">Je herkende</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {result.recognizedTexts.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
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

          <div className="rounded-2xl border border-line bg-cream p-8">
            <p className="eyebrow text-copper">Maatwerk</p>
            <p className="mt-4 text-sm text-ink/60">Dit maken we passend voor jullie.</p>
            <ul className="mt-5 space-y-3">
              {solution.custom.map((c) => (
                <li key={c} className="border-t border-line pt-3 text-sm leading-relaxed text-ink/75">
                  {c}
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

        <div className="mt-8">
          <LeadForm message={prefill} />
        </div>
      </Section>
    </>
  );
}

type LeadStatus = "idle" | "sending" | "sent" | "error";

/** Los, niet-blokkerend leadformulier onder het resultaat. Zelfde tabel als het contactformulier. */
function LeadForm({ message }: { message: string }) {
  const [status, setStatus] = useState<LeadStatus>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const { error } = await supabase.from("contact_requests").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: null,
      phone: null,
      message,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  const field =
    "mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 text-base outline-none transition-colors focus:border-forest";

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-shell p-8">
        <p className="eyebrow text-forest">Verstuurd</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/75">
          Dankjewel, we hebben je uitslag ontvangen. We nemen contact op als hier iets te winnen valt.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-shell p-8">
      <p className="eyebrow text-copper">Liever dat wij contact opnemen?</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/60">
        Bijzaak, maar wel handig: laat je naam en e-mail achter, dan denken we vast mee.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Naam</span>
          <input name="name" required className={field} placeholder="Je voor- en achternaam" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">E-mailadres</span>
          <input type="email" name="email" required className={field} placeholder="naam@bedrijf.nl" />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Versturen..." : "Verstuur"}
      </button>
      {status === "error" ? (
        <p className="mt-3 text-sm text-destructive">Er ging iets mis bij het versturen. Probeer het nog eens.</p>
      ) : null}
    </form>
  );
}
