/** 5-punts schaal. Twee visuele varianten zodat twee schaalvragen achter elkaar niet identiek aanvoelen. */
export function ScaleInput({
  value,
  onChange,
  leftLabel,
  rightLabel,
  variant,
  note,
}: {
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  variant: "dots" | "bar";
  note: string;
}) {
  const points = [1, 2, 3, 4, 5];

  return (
    <div>
      {variant === "dots" ? (
        <div className="flex items-center justify-between gap-2">
          {points.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-label={`${p} van 5`}
              className={`h-10 w-10 rounded-full border-2 transition-all duration-200 ${
                p === value
                  ? "border-copper bg-copper"
                  : p < value
                    ? "border-copper/40 bg-copper/10"
                    : "border-line bg-cream"
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="relative pt-2">
          <div className="h-1.5 w-full rounded-full bg-line">
            <div
              className="h-full rounded-full bg-copper transition-all duration-300 ease-out"
              style={{ width: `${((value - 1) / 4) * 100}%` }}
            />
          </div>
          <div className="mt-4 flex justify-between">
            {points.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onChange(p)}
                aria-label={`${p} van 5`}
                className={`h-4 w-4 rounded-full border-2 transition-all duration-200 ${
                  p === value ? "border-copper bg-copper" : "border-line bg-cream hover:border-copper/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between text-sm text-ink/55">
        <span className="max-w-[45%]">{leftLabel}</span>
        <span className="max-w-[45%] text-right">{rightLabel}</span>
      </div>

      <p className="fade-up mt-6 text-sm leading-relaxed text-ink/70" key={`${variant}-${value}`}>
        {note}
      </p>
    </div>
  );
}
