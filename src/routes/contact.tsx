import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { HoneypotField } from "@/components/HoneypotField";
import { HubspotFormError, submitHubspotForm } from "@/lib/hubspot-form";
import { contactFollowUp } from "@/lib/leads.functions";

const title = "Contact | plan een gesprek met LoopWerk";
const description =
  "Vertel waar het werk in jullie proces blijft hangen. Eén gesprek is genoeg om te zien of hier een tool onder zit.";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { prefill?: string | undefined } => ({
    prefill: typeof search["prefill"] === "string" ? (search["prefill"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact,
});

type Status = "idle" | "sending" | "sent" | "error" | "blocked";

function Contact() {
  const { prefill } = Route.useSearch();
  const [status, setStatus] = useState<Status>("idle");

  const startedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "");

    // Honeypot ingevuld: waarschijnlijk een bot. Niets versturen, wel het bedankbericht tonen.
    if (value("website_hp")) {
      setStatus("sent");
      return;
    }

    const lead = {
      kind: "contact" as const,
      name: `${value("voornaam")} ${value("achternaam")}`.trim(),
      email: value("email"),
      company: value("bedrijf"),
      phone: value("telefoon") || undefined,
      message: value("knelpunt") || undefined,
      startedAt: startedAt.current,
      pageUri: window.location.href,
    };

    setStatus("sending");
    try {
      await submitHubspotForm([
        { name: "firstname", value: value("voornaam") },
        { name: "lastname", value: value("achternaam") },
        { name: "email", value: value("email") },
        { name: "company", value: value("bedrijf") },
        { name: "phone", value: value("telefoon") },
        { name: "loopwerk_knelpunt", value: value("knelpunt") },
        { name: "loopwerk_leadbron", value: "websiteformulier" },
      ]);
    } catch (error) {
      // Gratis e-mailadres (gmail e.d.) geweigerd: de bezoeker kan dat zelf oplossen.
      if (error instanceof HubspotFormError && error.blockedEmail) {
        setStatus("blocked");
        return;
      }
      // Anders: lead via de server alsnog binnenhalen (deal + mail, of noodopslag).
      try {
        const res = await contactFollowUp({ data: { ...lead, fallback: true } });
        setStatus(res.delivered ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }
    setStatus("sent");

    // Meldingsmail en deal op de achtergrond; een fout hier raakt de bezoeker niet.
    contactFollowUp({ data: lead }).catch(() =>
      console.error("[contact] vervolgstap (mail/deal) mislukt"),
    );
  }

  // Vaste tekstkleuren: anders erft het veld de lichte hero-kleur en is getypte tekst onzichtbaar.
  const field =
    "mt-2 w-full rounded-lg border border-line bg-card px-4 py-3 text-base outline-none transition-colors focus:border-forest text-[#1f241f] caret-[#1f241f] placeholder:text-[#8a8579] contact-field";

  return (
    <>
      <Section tone="hero">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow tone="sage">Contact</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.08] md:text-6xl">
              Vertel ons eerst waar het <span className="hand text-[1.1em]">werk zit</span>
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-cream/75">
              Je hoeft de oplossing nog niet te kennen. Beschrijf jullie proces of het knelpunt, dan
              komen wij met een voorstel voor de eerste stap.
            </p>
            <ul className="mt-10 space-y-4 text-cream/75">
              {[
                "Reactie binnen één werkdag",
                "Vrijblijvend kennismakingsgesprek",
                "Concreet advies, ook als wij het niet bouwen",
              ].map((li) => (
                <li key={li} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-home-accent"
                  />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="h-full rounded-2xl border border-line bg-shell p-7 md:p-9">
                <p className="text-lg leading-relaxed text-forest" role="status">
                  Dank je, we hebben je aanvraag. Je hoort binnen één werkdag van ons.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="relative h-full rounded-2xl border border-line bg-shell p-7 md:p-9"
              >
                <HoneypotField name="website_hp" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Voornaam *</span>
                    <input name="voornaam" required autoComplete="given-name" className={field} />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Achternaam *</span>
                    <input
                      name="achternaam"
                      required
                      autoComplete="family-name"
                      className={field}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Zakelijk e-mailadres *</span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className={field}
                      placeholder="naam@bedrijf.nl"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-ink">Bedrijfsnaam *</span>
                    <input name="bedrijf" required autoComplete="organization" className={field} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-ink">Telefoonnummer</span>
                    <input
                      type="tel"
                      name="telefoon"
                      autoComplete="tel"
                      className={field}
                      placeholder="06 ..."
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-ink">Waar loopt het vast?</span>
                    <textarea
                      name="knelpunt"
                      rows={3}
                      className={field}
                      defaultValue={prefill}
                      placeholder="Eén of twee zinnen is genoeg."
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-7 w-full rounded-full bg-home-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "sending" ? "Versturen…" : "Verstuur aanvraag"}
                </button>

                {status === "blocked" ? (
                  <p className="mt-4 text-sm text-destructive" role="alert">
                    Vul je zakelijke e-mailadres in. Adressen van bijvoorbeeld Gmail of Hotmail
                    kunnen we via dit formulier niet aannemen.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mt-4 text-sm text-destructive" role="alert">
                    Er ging iets mis bij het versturen. Mail ons op{" "}
                    <a href="mailto:info@loopwerkonline.nl" className="underline">
                      info@loopwerkonline.nl
                    </a>
                    .
                  </p>
                ) : null}

                <p className="mt-4 text-xs text-ink/55">
                  Je gegevens gebruiken we alleen om op je aanvraag te reageren. We slaan ze op in
                  ons CRM (HubSpot, EU-datacenter).
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
