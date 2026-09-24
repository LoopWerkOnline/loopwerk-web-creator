import { useCallback, useRef, useState, type PointerEvent } from "react";
import { Layers, Settings, Users, Zap } from "lucide-react";

import { buildQuadrantText } from "@/lib/scan/advice";

const SIZE = 100; // percentage-ruimte, niet pixels

function valueToPct(v: number): number {
  return ((v - 1) / 4) * SIZE;
}

function pctToValue(pct: number): number {
  const clamped = Math.max(0, Math.min(SIZE, pct));
  return 1 + (clamped / SIZE) * 4;
}

/** De vier kwadranten, in grid-volgorde: linksboven, rechtsboven, linksonder, rechtsonder. */
const quadrants = [
  {
    icon: Layers,
    title: "Eerst structureren",
    body: "Er zit logica in, maar het proces moet eerst duidelijker worden gemaakt.",
  },
  {
    icon: Zap,
    title: "Klaar voor automatisering",
    body: "Veel herhaling, weinig oordeel. Dit kan vaak direct slimmer.",
  },
  {
    icon: Users,
    title: "Menselijk maatwerk",
    body: "Veel variatie en veel oordeel. Eerst onderzoeken of standaardiseren zinvol is.",
  },
  {
    icon: Settings,
    title: "Automatiseren met controle",
    body: "De tool bereidt voor, de medewerker controleert of beslist.",
  },
] as const;

/**
 * 2D-sleepbare matrix: x = herhaling, y = menselijk oordeel. Vervangt de twee
 * losse 5-punts schalen (ScaleInput) door één scherm met live kwadrant-tekst.
 * Native Pointer Events, geen extra dependency.
 */
export function AutomationMatrix({
  repetition,
  judgment,
  onChange,
}: {
  repetition: number;
  judgment: number;
  onChange: (repetition: number, judgment: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const xPct = ((clientX - rect.left) / rect.width) * SIZE;
      const yPct = ((clientY - rect.top) / rect.height) * SIZE;
      const nextRepetition = Math.round(pctToValue(xPct) * 10) / 10;
      const nextJudgment = Math.round(pctToValue(SIZE - yPct) * 10) / 10;
      onChange(nextRepetition, nextJudgment);
    },
    [onChange],
  );

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromPoint(e.clientX, e.clientY);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromPoint(e.clientX, e.clientY);
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  const left = valueToPct(repetition);
  const top = SIZE - valueToPct(judgment);
  const labelAbove = top > 20;

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-2 text-center text-xs text-ink/45">↑ Weinig menselijk oordeel</p>

      <div className="flex items-stretch justify-center gap-2 sm:gap-3">
        <span className="hidden shrink-0 origin-center rotate-180 whitespace-nowrap text-xs text-ink/45 [writing-mode:vertical-rl] sm:flex sm:items-center">
          ← Elke keer anders
        </span>

        <div
          ref={containerRef}
          className="touch-none relative aspect-square w-full select-none overflow-hidden rounded-2xl border border-line bg-shell"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2">
            {quadrants.map((q) => {
              const Icon = q.icon;
              return (
                <div key={q.title} className="flex flex-col items-start gap-1.5 p-3 sm:gap-2 sm:p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-home-accent sm:h-9 sm:w-9">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <p className="text-xs font-semibold leading-snug text-ink sm:text-sm">{q.title}</p>
                  <p className="hidden text-xs leading-snug text-ink/60 sm:block">{q.body}</p>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-line" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-line" aria-hidden="true" />

          <span
            className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cream bg-home-accent shadow"
            style={{ left: `${left}%`, top: `${top}%` }}
            aria-hidden="true"
          />
          <span
            className={`pointer-events-none absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink shadow ${
              labelAbove ? "-translate-y-[calc(100%+10px)]" : "translate-y-[10px]"
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
            aria-hidden="true"
          >
            Jouw proces
          </span>
        </div>

        <span className="hidden shrink-0 origin-center whitespace-nowrap text-xs text-ink/45 [writing-mode:vertical-rl] sm:flex sm:items-center">
          Vaak dezelfde stappen →
        </span>
      </div>

      <p className="mt-2 text-center text-xs text-ink/45">↓ Veel menselijk oordeel</p>

      <p
        className="fade-up mt-6 text-sm leading-relaxed text-ink/70"
        key={`quadrant-${repetition >= 3 ? 1 : 0}-${judgment >= 3 ? 1 : 0}`}
      >
        {buildQuadrantText(repetition, judgment)}
      </p>
    </div>
  );
}
