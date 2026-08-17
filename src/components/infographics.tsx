/**
 * Handgetekende SVG-infographics in de merkkleuren.
 * Bewust geen stockbeeld: diagrammen die het verhaal dragen.
 */

const forest = "var(--forest)";
const sage = "var(--sage)";
const copper = "var(--copper)";
const ink = "var(--ink)";

/** Rechte lijn (geautomatiseerd) versus zigzag met afleidingen (handmatig). */
export function FocusVsChaos({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "var(--cream)" : ink;
  const rail = tone === "dark" ? sage : forest;
  const chaos = [
    [250, 30],
    [310, 70],
    [232, 120],
    [300, 168],
    [340, 210],
    [268, 252],
    [200, 296],
    [280, 330],
    [236, 380],
    [312, 420],
  ];
  const path = chaos.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const noise = [
    [190, 96],
    [352, 118],
    [206, 200],
    [356, 292],
    [178, 350],
    [352, 372],
  ];

  return (
    <svg viewBox="0 0 400 470" className={className} role="img" aria-label="Vergelijking: geautomatiseerd proces versus handmatig proces met onderbrekingen">
      <text x="6" y="18" className="eyebrow" fill={rail} fontSize="11">
        GEAUTOMATISEERD
      </text>
      <text x="248" y="18" className="eyebrow" fill={base} fontSize="11" opacity="0.6">
        HANDMATIG
      </text>

      <line x1="70" y1="40" x2="70" y2="420" stroke={rail} strokeWidth="2.5" />
      {[40, 166, 293, 420].map((y) => (
        <circle key={y} cx="70" cy={y} r="8" fill={copper} />
      ))}

      <path d={path} fill="none" stroke={base} strokeOpacity="0.45" strokeWidth="2" strokeLinejoin="round" />
      {chaos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 7 : 5} fill={i % 3 === 0 ? base : sage} opacity={i % 3 === 0 ? 0.85 : 0.6} />
      ))}
      {noise.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r="5" fill={sage} opacity="0.75" />
      ))}

      <g fontSize="11" fill={base} opacity="0.7">
        <line x1="24" y1="450" x2="52" y2="450" stroke={rail} strokeWidth="2.5" />
        <text x="60" y="454">Doorlooptijd</text>
        <circle cx="170" cy="450" r="6" fill={copper} />
        <text x="182" y="454">Stap</text>
        <circle cx="248" cy="450" r="5" fill={sage} />
        <text x="260" y="454">Onderbreking</text>
      </g>
    </svg>
  );
}

/** Flow: aanvraag -> configurator -> conceptofferte + lead. */
export function ConfiguratorFlow({ className }: { className?: string }) {
  const steps = ["Formaat", "Uitvoering", "Prijsindicatie"];
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Flow van de zwembadconfigurator in drie stappen naar conceptofferte en lead">
      <line x1="60" y1="70" x2="660" y2="70" stroke={sage} strokeWidth="2" strokeDasharray="6 8" />
      {steps.map((s, i) => {
        const x = 110 + i * 190;
        return (
          <g key={s}>
            <circle cx={x} cy="70" r="26" fill="none" stroke={forest} strokeWidth="2" />
            <text x={x} y="76" textAnchor="middle" fontSize="18" fill={forest} fontFamily="var(--font-display)">
              {i + 1}
            </text>
            <text x={x} y="124" textAnchor="middle" fontSize="14" fill={ink}>
              {s}
            </text>
          </g>
        );
      })}
      <circle cx="660" cy="70" r="26" fill={copper} />
      <path d="M650 70 l7 8 14 -16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <text x="660" y="124" textAnchor="middle" fontSize="14" fill={ink}>
        Conceptofferte
      </text>
      <text x="660" y="144" textAnchor="middle" fontSize="12" fill={ink} opacity="0.6">
        + lead opgeslagen
      </text>
    </svg>
  );
}

/** Trechter met de echte SSPW-cijfers. */
export function LeadFunnel({ className }: { className?: string }) {
  const rows = [
    { label: "Serieuze aanvragen", value: 20, w: 100 },
    { label: "Showroomgesprekken", value: 10, w: 62 },
    { label: "Afhakers op prijs", value: 7, w: 44 },
    { label: "Klant", value: 3, w: 22 },
  ];
  return (
    <svg viewBox="0 0 420 260" className={className} role="img" aria-label="Trechter: 20 aanvragen, 10 gesprekken, 7 afhakers op prijs, 3 klanten per maand">
      {rows.map((r, i) => {
        const y = 20 + i * 60;
        const w = (r.w / 100) * 300;
        const x = 60 + (300 - w) / 2;
        const highlight = r.label === "Afhakers op prijs";
        return (
          <g key={r.label}>
            <rect
              x={x}
              y={y}
              width={w}
              height="36"
              rx="4"
              fill={highlight ? copper : forest}
              opacity={highlight ? 0.9 : 0.12 + i * 0.16}
              stroke={highlight ? copper : forest}
              strokeWidth="1.5"
            />
            <text x={x + w / 2} y={y + 24} textAnchor="middle" fontSize="15" fill={highlight ? "#fff" : ink}>
              {r.value}
            </text>
            <text x="210" y={y + 54} textAnchor="middle" fontSize="12" fill={ink} opacity="0.65">
              {r.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Drie iconen met korte labels, in de stijl van de referentiebeelden. */
export function ThreePillars({ className }: { className?: string }) {
  const items = [
    {
      label: "Eén concreet knelpunt",
      icon: (
        <path d="M12 40 h40 a4 4 0 0 0 4 -4 v-22 a4 4 0 0 0 -4 -4 h-18 l-5 -6 h-17 a4 4 0 0 0 -4 4 v28 a4 4 0 0 0 4 4 z" />
      ),
    },
    {
      label: "Eén werkende tool",
      icon: <path d="M18 8 h28 M18 56 h28 M20 8 c0 14 12 18 12 24 s-12 10 -12 24 M44 8 c0 14 -12 18 -12 24 s12 10 12 24" />,
    },
    {
      label: "Elke maand tijd terug",
      icon: (
        <>
          <rect x="10" y="14" width="44" height="42" rx="4" />
          <path d="M10 26 h44 M22 8 v10 M42 8 v10" />
        </>
      ),
    },
  ];

  return (
    <div className={`grid gap-10 sm:grid-cols-3 ${className ?? ""}`}>
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center text-center">
          <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" stroke={copper} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {it.icon}
          </svg>
          <p className="mt-5 max-w-[14rem] text-base text-cream/85">{it.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Bestaande basis + maatwerk: één bouwsteen die per bedrijf wordt aangevuld. */
export function BaseAndCustom({ className }: { className?: string }) {
  const parts = ["Producten", "Regels", "Uitzonderingen", "Systemen"];
  return (
    <svg viewBox="0 0 520 300" className={className} role="img" aria-label="Een bestaande basis wordt aangevuld met producten, regels, uitzonderingen en systemen van het bedrijf">
      <rect x="26" y="96" width="150" height="108" rx="8" fill={forest} opacity="0.12" stroke={forest} strokeWidth="2" />
      <text x="101" y="140" textAnchor="middle" fontSize="15" fill={ink} fontFamily="var(--font-display)">
        Bestaande
      </text>
      <text x="101" y="164" textAnchor="middle" fontSize="15" fill={ink} fontFamily="var(--font-display)">
        basis
      </text>

      {parts.map((p, i) => {
        const y = 30 + i * 62;
        return (
          <g key={p}>
            <path d={`M300 ${y + 18} C 250 ${y + 18}, 236 150, 186 150`} fill="none" stroke={sage} strokeWidth="2" strokeDasharray="5 7" />
            <rect x="300" y={y} width="194" height="38" rx="19" fill="none" stroke={forest} strokeWidth="1.5" />
            <text x="397" y={y + 24} textAnchor="middle" fontSize="13" fill={ink}>
              {p}
            </text>
          </g>
        );
      })}

      <circle cx="186" cy="150" r="9" fill={copper} />
      <text x="26" y="248" fontSize="12" fill={ink} opacity="0.6">
        Wat we al hebben
      </text>
      <text x="300" y="290" fontSize="12" fill={ink} opacity="0.6">
        Wat we per bedrijf passend maken
      </text>
    </svg>
  );
}

/** Herkenning: vier handmatige stappen rondom één aanvraag. */
export function ManualSteps({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "var(--cream)" : ink;
  const rail = tone === "dark" ? sage : forest;
  const steps = ["Informatie ophalen", "Opties en prijzen zoeken", "Gegevens overtypen", "Later opvolgen"];
  return (
    <svg viewBox="0 0 560 190" className={className} role="img" aria-label="Vier handmatige stappen na één klantvraag: informatie ophalen, prijzen zoeken, gegevens overtypen en opvolgen">
      <text x="6" y="22" fontSize="13" fill={base} opacity="0.65">
        Eén klantvraag
      </text>
      <line x1="10" y1="70" x2="546" y2="70" stroke={rail} strokeWidth="2" strokeDasharray="6 8" />
      {steps.map((s, i) => {
        const x = 74 + i * 136;
        return (
          <g key={s}>
            <circle cx={x} cy="70" r="16" fill={i === 3 ? copper : tone === "dark" ? "var(--ink)" : "var(--cream)"} stroke={i === 3 ? copper : rail} strokeWidth="2" />
            <text x={x} y="75" textAnchor="middle" fontSize="13" fill={i === 3 ? "#fff" : base} fontFamily="var(--font-display)">
              {i + 1}
            </text>
            <text x={x} y="112" textAnchor="middle" fontSize="12" fill={base} opacity="0.75">
              {s.split(" ").slice(0, 2).join(" ")}
            </text>
            <text x={x} y="130" textAnchor="middle" fontSize="12" fill={base} opacity="0.75">
              {s.split(" ").slice(2).join(" ")}
            </text>
          </g>
        );
      })}
      <text x="6" y="176" fontSize="12" fill={base} opacity="0.55">
        Iedere week opnieuw
      </text>
    </svg>
  );
}
