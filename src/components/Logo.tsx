type Props = {
  className?: string;
  variant?: "ink" | "cream";
  showTagline?: boolean;
};

/**
 * LoopWerk-lockup, nagetekend als SVG op basis van het bestaande logo:
 * twee gekruiste strepen (forest + sage) met een copper accentstreep.
 */
export function Logo({ className, variant = "ink", showTagline = true }: Props) {
  const text = variant === "cream" ? "text-cream" : "text-ink";
  const sub = variant === "cream" ? "text-sage" : "text-forest";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M9 9 L39 39" stroke="var(--forest)" strokeWidth="7" />
        <path d="M39 12 L18 33" stroke="var(--sage)" strokeWidth="7" />
        <path d="M9 39 L21 27" stroke="var(--copper)" strokeWidth="7" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl tracking-tight ${text}`}>LoopWerk</span>
        {showTagline ? (
          <span className={`mt-1 text-[0.55rem] font-semibold tracking-[0.28em] ${sub}`}>
            WORKFLOWS. CONNECTED.
          </span>
        ) : null}
      </span>
    </span>
  );
}
