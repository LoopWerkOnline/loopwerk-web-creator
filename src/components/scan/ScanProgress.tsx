/** Dunne copper voortgangslijn + stapteller + terugknop. Bewust geen dikke percentage-balk. */
export function ScanProgress({
  step,
  total,
  onBack,
}: {
  step: number;
  total: number;
  onBack?: () => void;
}) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center justify-between gap-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-ink/50 transition-colors hover:text-ink"
          >
            ← Terug
          </button>
        ) : (
          <span />
        )}
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
          {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-copper transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
