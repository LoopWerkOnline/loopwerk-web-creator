import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Section } from "@/components/Section";

const points = [
  "hoe vaak werk terugkomt",
  "hoeveel tijd erin zit",
  "hoeveel stappen voorspelbaar zijn",
  "hoeveel vaste regels er zijn",
  "hoeveel informatie handmatig wordt verzameld of verplaatst",
  "hoeveel menselijk oordeel nodig blijft",
];

/** Rustige accordion — geen opdringerige uitleg, wel transparant over de methode. */
export function ScanMethodology() {
  const [open, setOpen] = useState(false);

  return (
    <Section tone="shell" className="!py-14">
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 text-left"
          aria-expanded={open}
        >
          <h2 className="text-2xl leading-snug">Hoe komen we tot deze indicatie?</h2>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-ink/50 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {open ? (
          <div className="fade-up mt-6">
            <p className="text-base leading-relaxed text-ink/75">We kijken naar:</p>
            <ul className="mt-4 space-y-2">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-home-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              De uitkomst is geen businesscase of garantie. Het is een eerste indicatie van waar verder kijken
              waarschijnlijk wel of niet zinvol is.
            </p>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
