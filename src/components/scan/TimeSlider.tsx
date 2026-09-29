/** Continue slider over een numeriek bereik (gebruikt voor zowel volume als tijdsduur). */
export function TimeSlider({
  min,
  max,
  value,
  onChange,
  format,
  minLabel,
  maxLabel,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  minLabel: string;
  maxLabel: string;
}) {
  return (
    <div>
      <p className="text-center text-4xl font-semibold text-forest md:text-5xl">{format(value)}</p>

      <input
        type="range"
        className="scan-range mt-8"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      <div className="mt-2 flex justify-between text-xs text-ink/40">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
