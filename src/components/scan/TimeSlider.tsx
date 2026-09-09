/** Discrete slider over een reeks bandbreedtes (gebruikt voor zowel volume als tijdsduur). */
export function TimeSlider({
  options,
  value,
  onChange,
  insight,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  insight?: string | undefined;
}) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const current = options[index] ?? options[0];

  return (
    <div>
      <p className="fade-up text-center text-4xl font-semibold text-forest md:text-5xl" key={current?.value}>
        {current?.label}
      </p>

      <input
        type="range"
        className="scan-range mt-8"
        min={0}
        max={options.length - 1}
        step={1}
        value={index}
        onChange={(e) => {
          const opt = options[Number(e.target.value)];
          if (opt) onChange(opt.value);
        }}
      />

      <div className="mt-2 flex justify-between text-xs text-ink/40">
        <span>{options[0]?.label}</span>
        <span>{options[options.length - 1]?.label}</span>
      </div>

      {insight ? (
        <p className="fade-up mt-7 rounded-xl border border-line bg-shell px-5 py-4 text-sm leading-relaxed text-ink/75" key={`insight-${insight}`}>
          {insight}
        </p>
      ) : null}
    </div>
  );
}
