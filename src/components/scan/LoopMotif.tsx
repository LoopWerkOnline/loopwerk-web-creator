const PHASES = ["Proces", "Tijd", "Handwerk", "Informatie", "Impact"];

/**
 * Gedeeld lijnmotief door de hele scan heen: proces -> tijd -> handwerk ->
 * informatie -> impact. Copper markeert de actieve fase. Zelfde stijlpatroon
 * als de andere infographics (draw-in lijn, punten als stappen).
 */
export function LoopMotif({
  activePhase,
  variant = "inline",
  className,
}: {
  activePhase: number;
  variant?: "inline" | "background";
  className?: string;
}) {
  const width = 460;
  const height = variant === "background" ? 200 : 60;
  const y = variant === "background" ? 100 : 30;
  const startX = 20;
  const endX = width - 20;
  const step = (endX - startX) / (PHASES.length - 1);
  const railOpacity = variant === "background" ? 0.3 : 0.55;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={variant === "inline" ? "Voortgang door de vijf fases van de scan" : undefined}
      aria-hidden={variant === "background"}
    >
      <line
        x1={startX}
        y1={y}
        x2={endX}
        y2={y}
        className="draw-in"
        stroke="var(--sage)"
        strokeWidth="1.5"
        strokeOpacity={railOpacity}
      />
      {PHASES.map((label, i) => {
        const x = startX + i * step;
        const isActive = i === activePhase;
        const isPast = i < activePhase;
        return (
          <g key={label}>
            <circle
              cx={x}
              cy={y}
              r={isActive ? 7 : 5}
              fill={isActive ? "var(--home-accent)" : isPast ? "var(--sage)" : "var(--ink-hero)"}
              stroke={isActive ? "var(--home-accent)" : "var(--sage)"}
              strokeWidth="1.5"
              opacity={isActive ? 1 : isPast ? 0.8 : 0.4}
            />
            {variant === "inline" ? (
              <text
                x={x}
                y={y + 24}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="0.06em"
                fill="var(--cream)"
                opacity={isActive ? 0.9 : 0.4}
              >
                {label.toUpperCase()}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
