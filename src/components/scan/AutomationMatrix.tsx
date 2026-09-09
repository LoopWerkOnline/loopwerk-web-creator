import { useCallback, useRef, useState, type PointerEvent } from "react";

import { buildQuadrantText } from "@/lib/scan/advice";

const SIZE = 100; // percentage-ruimte, niet pixels

function valueToPct(v: number): number {
  return ((v - 1) / 4) * SIZE;
}

function pctToValue(pct: number): number {
  const clamped = Math.max(0, Math.min(SIZE, pct));
  return 1 + (clamped / SIZE) * 4;
}

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

  return (
    <div className="mx-auto max-w-sm">
      <p className="mb-2 text-center text-xs text-ink/45">↑ Oordeel vooral bij uitzonderingen</p>

      <div
        ref={containerRef}
        className="touch-none relative aspect-square w-full select-none rounded-2xl border border-line bg-shell"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-line" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-line" aria-hidden="true" />

        <span
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cream bg-home-accent shadow"
          style={{ left: `${left}%`, top: `${top}%` }}
          aria-hidden="true"
        />
      </div>

      <p className="mt-2 text-center text-xs text-ink/45">↓ Oordeel bij vrijwel iedere stap</p>

      <div className="mt-4 flex justify-between text-xs text-ink/45">
        <span>Vrijwel iedere keer anders →</span>
        <span className="text-right">← Dezelfde stappen</span>
      </div>

      <p
        className="fade-up mt-6 text-sm leading-relaxed text-ink/70"
        key={`quadrant-${repetition >= 3 ? 1 : 0}-${judgment >= 3 ? 1 : 0}`}
      >
        {buildQuadrantText(repetition, judgment)}
      </p>
    </div>
  );
}
