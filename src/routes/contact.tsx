import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { supabase } from "@/integrations/supabase/client";

const title = "Contact — plan een gesprek met LoopWerk";
const description =
  "Vertel waar het werk in jullie proces blijft hangen. Eén gesprek is genoeg om te zien of hier een tool onder zit.";

export const Route = createFileRoute("/contact")({
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

type Status = "idle" | "sending" | "sent" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    const { error } = await supabase.from("contact_requests").insert({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? "") || null,
      phone: String(data.get("phone") ?? "") || null,
      message: String(data.get("message") ?? ""),
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

  return (
    <>
      <Section>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.08] md:text-6xl">
              Vertel ons eerst waar het <span className="hand text-[1.1em]">werk zit</span>
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink/75">
              Je hoeft de oplossing nog niet te kennen. Beschrijf jullie proces of het knelpunt, dan
              komen wij met een voorstel voor de eerste stap.
            </p>
            <ul className="mt-10 space-y-4 text-ink/75">
              {[
                "Reactie binnen één werkdag",
                "Vrijblijvend kennismakingsgesprek",
                "Concreet advies, ook als wij het niet bouwen",
              ].map((li) => (
                <li key={li} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-shell p-7 md:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Naam *</span>
                <input name="name" required className={field} placeholder="Je voor- en achternaam" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">E-mailadres *</span>
                <input type="email" name="email" required className={field} placeholder="naam@bedrijf.nl" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Telefoonnummer</span>
                <input name="phone" className={field} placeholder="06 ..." />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Bedrijfsnaam</span>
                <input name="company" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Waar loopt het vast? *</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={field}
                  placeholder="Beschrijf kort jullie proces of het knelpunt."
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-7 w-full rounded-full bg-copper px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Versturen..." : "Verstuur aanvraag"}
            </button>

            {status === "sent" ? (
              <p className="mt-4 text-sm text-forest">
                Dankjewel — je bericht is binnen. We reageren binnen één werkdag.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-destructive">
                Er ging iets mis bij het versturen. Probeer het nog eens.
              </p>
            ) : null}

            <p className="mt-4 text-xs text-ink/55">
              Je gegevens gebruiken we alleen om op je aanvraag te reageren.
            </p>
          </form>
        </div>
      </Section>
    </>
  );
}
