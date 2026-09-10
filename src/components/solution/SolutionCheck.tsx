import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { ChoiceTiles } from "@/components/scan/ChoiceTiles";
import type { SolutionCheck as SolutionCheckData } from "@/lib/content";

/**
 * Interactieve "herken je dit?"-check: klikbare tegels (hergebruikt ChoiceTiles
 * van de Scan), een live duidingszin, en vanaf 1 aangevinkt een link naar een
 * voorgevulde Scan. Vervangt de statische signals-bullet-list.
 */
export function SolutionCheck({ check }: { check: SolutionCheckData }) {
  const [checked, setChecked] = useState<string[]>([]);

  function toggle(id: string) {
    setChecked((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  }

  const readout = [...check.readouts].reverse().find((r) => checked.length >= r.min)?.text;

  return (
    <div className="mt-6">
      <ChoiceTiles
        options={check.items.map((i) => ({ value: i.id, label: i.label }))}
        multi
        selected={checked}
        onToggle={toggle}
      />

      {readout ? (
        <p key={checked.length} className="fade-up mt-6 text-sm leading-relaxed text-ink/70">
          {readout}
        </p>
      ) : null}

      {checked.length > 0 ? (
        <Link
          to="/scan"
          search={{
            process: check.scanProcess,
            sinks: check.scanTimeSinks?.join(",") || undefined,
            sources: check.scanSources?.join(",") || undefined,
          }}
          className="mt-6 inline-flex rounded-full bg-home-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {check.ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
