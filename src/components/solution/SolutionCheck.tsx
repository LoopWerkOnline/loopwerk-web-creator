import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Interactieve "herken je dit?"-check: de signalen als klikbare, onder elkaar
 * gestapelde vakjes, met een live duidingszin en — vanaf 1 aangevinkt — een
 * link om een gesprek te plannen. Vervangt de statische signals-bullet-list.
 */
export function SolutionCheck({
  signals,
  tone = "light",
}: {
  signals: string[];
  tone?: "light" | "dark";
}) {
  const [checked, setChecked] = useState<number[]>([]);

  function toggle(index: number) {
    setChecked((prev) =>
      prev.includes(index) ? prev.filter((v) => v !== index) : [...prev, index],
    );
  }

  const readout =
    checked.length === 0
      ? "Klik aan wat herkenbaar is."
      : checked.length === signals.length
        ? "Allemaal herkenbaar? Dan zit hier waarschijnlijk reële tijdswinst."
        : checked.length === 1
          ? "Dat is al een concreet signaal om te bekijken."
          : "Meerdere herkenbare signalen — een goed moment om dit scherper te bekijken.";

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3">
        {signals.map((signal, i) => {
          const active = checked.includes(i);
          return (
            <button
              key={signal}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={active}
              className={`flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-base leading-relaxed transition-all duration-200 ${
                active
                  ? tone === "dark"
                    ? "border-home-accent bg-home-accent text-white"
                    : "border-ink-hero bg-ink-hero text-cream"
                  : tone === "dark"
                    ? "border-cream/25 bg-cream/5 text-cream/85 hover:border-home-accent/60 hover:bg-cream/10"
                    : "border-line bg-cream text-ink/80 hover:border-home-accent/50 hover:bg-shell"
              }`}
            >
              <span>{signal}</span>
              {active ? <Check className="h-4 w-4 shrink-0 text-white" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>

      <p
        key={checked.length}
        className={`fade-up mt-6 text-sm leading-relaxed ${tone === "dark" ? "text-cream/80" : "text-ink/70"}`}
      >
        {readout}
      </p>

      {checked.length > 0 ? (
        <Link
          to="/contact"
          className="mt-6 inline-flex rounded-full bg-home-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Plan een gesprek over dit proces →
        </Link>
      ) : null}
    </div>
  );
}
