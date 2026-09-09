import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Section, Eyebrow } from "@/components/Section";
import type { Richting } from "@/lib/scan/advice";
import type { ScanScore } from "@/lib/scan/types";

import { ScanAdvice } from "./ScanAdvice";
import { ScanMethodology } from "./ScanMethodology";

/**
 * De gebundelde sectie direct na het scorescherm: twee acties bovenaan
 * (analyse opvragen / gesprek plannen), en pas na het invullen een preview
 * van wat er (in een echte versie) per e-mail zou komen. Prototype: puur
 * visueel, geen POST, geen opslag, geen backend.
 */
export function ScanLeadPreview({
  score,
  richting,
  paragraphs,
  judgmentAdvice,
  firstStep,
  contactPrefill,
}: {
  score: ScanScore;
  richting: Richting;
  paragraphs: string[];
  judgmentAdvice: string;
  firstStep: { title: string; body: string } | null;
  contactPrefill: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 text-base outline-none transition-colors focus:border-forest";

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow tone="home-accent">Wat wil je met deze uitkomst?</Eyebrow>
        <h2 className="mt-4 text-2xl leading-tight md:text-3xl">Kies wat nu het handigst is</h2>
        <p className="mt-3 text-base leading-relaxed text-ink/70">
          De volledige analyse — waarom dit kansrijk is, een mogelijke eerste stap en een richting — sturen
          we je liever toe dan dat je hier eerst een lange tekst doorscrolt.
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
            {!sent ? (
              <form onSubmit={onSubmit}>
                <p className="text-sm font-medium text-ink/60">
                  Vul je gegevens in — dan sturen we je de volledige analyse.
                </p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Voornaam</span>
                    <input name="firstName" className={field} placeholder="Je voornaam" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Bedrijf</span>
                    <input name="company" className={field} placeholder="Bedrijfsnaam" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-ink">Zakelijk e-mailadres</span>
                    <input type="email" name="email" className={field} placeholder="naam@bedrijf.nl" />
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-home-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Stuur mij mijn analyse
                </button>
                <p className="mt-4 text-xs text-ink/45">
                  Prototype-onderdeel: dit formulier slaat nog niets op en verstuurt nog niets.
                </p>
              </form>
            ) : (
              <div className="fade-up">
                <p className="text-base leading-relaxed text-ink/80">
                  Dankjewel. (Prototype: dit is nog niet echt verstuurd of opgeslagen — dat koppelen we
                  later.)
                </p>
                <div className="mt-6 border-t border-line pt-6">
                  <p className="eyebrow text-ink/40">Dit zouden we (straks) naar je e-mail sturen</p>
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
