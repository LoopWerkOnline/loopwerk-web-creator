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
        <Eyebrow tone="forest">Wil je deze uitkomst bewaren?</Eyebrow>
        <h2 className="mt-6 text-3xl leading-tight md:text-4xl">Stuur mij mijn analyse</h2>

        {sent ? (
          <div className="fade-up mt-8 rounded-2xl border border-line bg-cream p-8">
            <p className="text-base leading-relaxed text-ink/80">
              Dankjewel. (Prototype: dit is nog niet echt verstuurd of opgeslagen — dat koppelen we later.)
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-line bg-cream p-7 text-left md:p-9">
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
              className="mt-6 w-full rounded-full bg-home-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Stuur mij mijn analyse
            </button>
            <p className="mt-4 text-xs text-ink/45">
              Prototype-onderdeel: dit formulier slaat nog niets op en verstuurt nog niets.
            </p>
          </form>
        )}

        <Link
          to="/contact"
          search={{ prefill: contactPrefill }}
          className="mt-6 inline-block text-sm font-semibold text-ink/60 underline underline-offset-4 hover:text-ink"
        >
          Liever eerst even praten? Bespreek je uitkomst →
        </Link>
      </div>
    </Section>
  );
}
