import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Section, Eyebrow } from "@/components/Section";

/**
 * Prototype: puur visueel. Geen POST, geen opslag, geen backend — alleen een
 * demo-successtate zodat het ontwerp van het toekomstige leadmoment te
 * beoordelen is. Koppeling volgt in een latere versie.
 */
export function ScanLeadPreview({ contactPrefill }: { contactPrefill: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 text-base outline-none transition-colors focus:border-forest";

  return (
    <Section tone="shell">
      <div className="mx-auto max-w-xl text-center">
        <Eyebrow tone="home-accent">Liever verder praten dan lezen?</Eyebrow>
        <h2 className="mt-6 text-3xl leading-tight md:text-4xl">Plan een gesprek over deze uitkomst</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/70">
          Eén gesprek is genoeg om te zien of hier een tool onder zit. Reactie binnen één werkdag.
        </p>
        <Link
          to="/contact"
          search={{ prefill: contactPrefill }}
          className="mt-7 inline-flex rounded-full bg-home-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Gesprek inplannen →
        </Link>

        <div className="mt-14 border-t border-line pt-10">
          <p className="text-sm font-medium text-ink/60">Of stuur deze analyse eerst naar jezelf</p>

          {sent ? (
            <div className="fade-up mt-6 rounded-2xl border border-line bg-cream p-8">
              <p className="text-base leading-relaxed text-ink/80">
                Dankjewel. (Prototype: dit is nog niet echt verstuurd of opgeslagen — dat koppelen we later.)
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-line bg-cream p-7 text-left md:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
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
                className="mt-6 w-full rounded-full border border-line bg-cream px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-shell"
              >
                Stuur mij mijn analyse
              </button>
              <p className="mt-4 text-xs text-ink/45">
                Prototype-onderdeel: dit formulier slaat nog niets op en verstuurt nog niets.
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
