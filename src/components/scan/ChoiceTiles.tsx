import { useState } from "react";

import type { ChoiceOption } from "@/lib/scan/types";

/**
 * Grote horizontale keuzetegels — geen dropdowns, geen dashboardkaarten.
 * Single-select gaat direct door (`onSelect`); multi-select verzamelt in
 * `selected` en wacht op een expliciete "Verder"-actie van de aanroeper.
 */
export function ChoiceTiles({
  options,
  multi,
  max,
  selected,
  onToggle,
  onSelectSingle,
  allowOther,
  otherValue,
  onOtherChange,
}: {
  options: ChoiceOption[];
  multi?: boolean | undefined;
  max?: number | undefined;
  selected: string[];
  onToggle: (value: string) => void;
  onSelectSingle?: ((value: string) => void) | undefined;
  allowOther?: boolean | undefined;
  otherValue?: string | undefined;
  onOtherChange?: ((value: string) => void) | undefined;
}) {
  const [showOther, setShowOther] = useState(Boolean(otherValue));

  function handleClick(value: string) {
    if (multi) {
      onToggle(value);
      return;
    }
    onSelectSingle?.(value);
  }

  const atMax = Boolean(multi && max && selected.length >= max);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => {
        const active = selected.includes(o.value);
        const disabled = multi && atMax && !active;
        return (
          <button
            key={o.value}
            type="button"
            disabled={disabled}
            onClick={() => handleClick(o.value)}
            className={`rounded-xl border px-5 py-4 text-left text-base transition-all duration-200 ${
              active
                ? "border-copper bg-copper/10 text-ink"
                : "border-line bg-cream text-ink/80 hover:border-copper/50 hover:bg-shell"
            } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
          >
            {o.label}
          </button>
        );
      })}
      {allowOther ? (
        <button
          type="button"
          onClick={() => {
            setShowOther(true);
            onSelectSingle?.("anders");
            if (multi) onToggle("anders");
          }}
          className={`rounded-xl border px-5 py-4 text-left text-base transition-all duration-200 ${
            selected.includes("anders")
              ? "border-copper bg-copper/10 text-ink"
              : "border-line bg-cream text-ink/80 hover:border-copper/50 hover:bg-shell"
          }`}
        >
          Anders
        </button>
      ) : null}

      {allowOther && showOther ? (
        <div className="sm:col-span-2">
          <input
            autoFocus
            value={otherValue ?? ""}
            onChange={(e) => onOtherChange?.(e.target.value)}
            placeholder="Beschrijf kort welk proces je bedoelt"
            className="mt-1 w-full rounded-lg border border-line bg-card px-4 py-3 text-base outline-none transition-colors focus:border-forest"
          />
        </div>
      ) : null}

      {multi && max ? (
        <p className="text-sm text-ink/45 sm:col-span-2">
          {selected.length} van max. {max} gekozen
        </p>
      ) : null}
    </div>
  );
}
