import { Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { HoneypotField } from "@/components/HoneypotField";
import { readHubspotUtk, submitLead } from "@/lib/leads.functions";
import type { Richting } from "@/lib/scan/advice";
import type { ScanAnswers, ScanScore } from "@/lib/scan/types";

import { ScanAdvice } from "./ScanAdvice";
import { ScanMethodology } from "./ScanMethodology";

/**
 * De gebundelde sectie direct na het scorescherm: twee acties bovenaan
 * (analyse opvragen / gesprek plannen), en pas na het invullen een preview
 * van de analyse. Het formulier gaat via submitLead naar Supabase, HubSpot
 * en een notificatiemail voor het team.
 */
export function ScanLeadPreview({
  answers,
  score,
  richting,
  paragraphs,
  judgmentAdvice,
  firstStep,
  contactPrefill,
}: {
  answers: ScanAnswers;
  score: ScanScore;
  richting: Richting;
  paragraphs: string[];
  judgmentAdvice: string;
  firstStep: { title: string; body: string } | null;
  contactPrefill: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");

    try {
      await submitLead({
        data: {
          kind: "scan",
          firstName: String(data.get("firstName") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? "") || undefined,
          website: String(data.get("website") ?? "") || undefined,
          answers,
          score,
          richting: richting.label,
          process: answers.process === "anders" ? answers.processOther : answers.process,
          startedAt: startedAt.current,
          hutk: readHubspotUtk(),
          pageUri: window.location.href,
        },
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  const field =
    "mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 text-base outline-none transition-colors focus:border-forest";

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow tone="home-accent">Wat wil je met deze uitkomst?</Eyebrow>
        <h2 className="mt-4 text-2xl leading-tight md:text-3xl">Kies wat nu het handigst is</h2>
        <p className="mt-3 text-base leading-relaxed text-ink/70">
          De volledige analyse — waarom dit kansrijk is, een mogelijke eerste stap en een richting —
          sturen we je liever toe dan dat je hier eerst een lange tekst doorscrolt.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Stuur me de volledige analyse →
          </button>
          <Link
            to="/contact"
            search={{ prefill: contactPrefill }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
          >
            Plan een vrijblijvend gesprek →
          </Link>
        </div>

        {expanded ? (
          <div className="fade-up mt-8 rounded-2xl border border-line bg-card p-7 md:p-9">
            {status !== "sent" ? (
              <form onSubmit={onSubmit}>
                <HoneypotField />
                <p className="text-sm font-medium text-ink/60">
                  Vul je gegevens in — dan sturen we je de volledige analyse.
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Voornaam</span>
                    <input name="firstName" required className={field} placeholder="Je voornaam" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Bedrijf</span>
                    <input name="company" className={field} placeholder="Bedrijfsnaam" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-ink">Zakelijk e-mailadres</span>
                    <input
                      type="email"
                      name="email"
                      required
                      className={field}
                      placeholder="naam@bedrijf.nl"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 w-full rounded-full bg-home-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? "Versturen..." : "Stuur mij mijn analyse"}
                </button>
                {status === "error" ? (
                  <p className="mt-4 text-sm text-destructive">
                    Er ging iets mis bij het versturen. Probeer het nog eens.
                  </p>
                ) : null}
                <p className="mt-4 text-xs text-ink/55">
                  Je gegevens gebruiken we alleen om je de analyse te sturen en op je uitkomst te
                  reageren.
                </p>
              </form>
            ) : (
              <div className="fade-up">
                <p className="text-base leading-relaxed text-ink/80">
                  Dankjewel. We hebben je uitkomst ontvangen en sturen je de volledige analyse
                  binnen één werkdag toe. Hieronder zie je hem alvast.
                </p>
                <div className="mt-6 border-t border-line pt-6">
                  <p className="eyebrow text-ink/40">Jouw analyse</p>
                  <div className="mt-4">
                    <ScanAdvice
                      paragraphs={paragraphs}
                      firstStep={firstStep}
                      judgmentAdvice={judgmentAdvice}
                      richting={richting}
                      score={score}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-14 border-t border-line pt-10">
          <ScanMethodology />
        </div>
      </div>
    </Section>
  );
}
