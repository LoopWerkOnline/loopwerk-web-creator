/**
 * Handgetekende SVG-infographics in de merkkleuren.
 * Bewust geen stockbeeld: diagrammen die het verhaal dragen.
 */
import { Calendar, Check, Clock, Copy, Database, FileSpreadsheet, FileText, Mail, MessageSquare, Plus, Search, Sliders } from "lucide-react";
import { Link } from "@tanstack/react-router";

const forest = "var(--forest)";
const sage = "var(--sage)";
const copper = "var(--home-accent)";
const ink = "var(--ink)";

/** Rechte lijn (geautomatiseerd) versus zigzag met afleidingen (handmatig). */
export function FocusVsChaos({ className, tone = "light", accent = copper }: { className?: string; tone?: "light" | "dark"; accent?: string }) {
  const base = tone === "dark" ? "var(--cream)" : ink;
  const rail = tone === "dark" ? sage : forest;
  const chaos = [
    [250, 40],
    [310, 78],
    [232, 125],
    [300, 170],
    [340, 210],
    [268, 250],
    [200, 292],
    [280, 325],
    [236, 373],
    [312, 412],
  ];
  const path = chaos.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const noise = [
    [190, 102],
    [352, 124],
    [206, 204],
    [356, 292],
    [178, 348],
    [352, 368],
  ];

  return (
    <svg viewBox="-16 0 416 470" className={className} role="img" aria-label="Vergelijking: geautomatiseerd proces versus handmatig proces met onderbrekingen">
      <text x="70" y="18" textAnchor="middle" className="eyebrow" fill={base} fontSize="11" opacity="0.6">
        GEAUTOMATISEERD
      </text>
      <text x="250" y="18" textAnchor="middle" className="eyebrow" fill={base} fontSize="11" opacity="0.6">
        HANDMATIG
      </text>



      <line x1="70" y1="40" x2="70" y2="420" stroke={rail} strokeWidth="1.5" strokeOpacity="0.7" />
      {[40, 166, 293, 420].map((y) => (
        <circle key={y} cx="70" cy={y} r="6" fill={accent} opacity="0.9" />
      ))}

      <path
        d={path}
        className="draw-in"
        fill="none"
        stroke={base}
        strokeOpacity="0.32"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {chaos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5.5 : 4} fill={i % 3 === 0 ? base : sage} opacity={i % 3 === 0 ? 0.55 : 0.4} />
      ))}
      {noise.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r="3.5" fill={sage} opacity="0.45" />
      ))}

      <g fontSize="11" fill={base} opacity="0.55">
        <line x1="24" y1="450" x2="52" y2="450" stroke={rail} strokeWidth="2.5" />
        <text x="60" y="454">Doorlooptijd</text>
        <circle cx="170" cy="450" r="6" fill={accent} />
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
export function BaseAndCustom({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "var(--cream)" : ink;
  const boxFill = tone === "dark" ? "var(--forest)" : forest;
  const boxStroke = tone === "dark" ? "var(--sage)" : forest;
  const parts = ["Producten", "Regels", "Uitzonderingen", "Systemen"];
  return (
    <svg viewBox="0 0 520 300" className={className} role="img" aria-label="Een bestaande basis wordt aangevuld met producten, regels, uitzonderingen en systemen van het bedrijf">
      <rect x="26" y="96" width="150" height="108" rx="8" fill={boxFill} opacity={tone === "dark" ? 0.25 : 0.12} stroke={boxStroke} strokeWidth="2" />
      <text x="101" y="140" textAnchor="middle" fontSize="15" fill={base} fontFamily="var(--font-display)">
        Bestaande
      </text>
      <text x="101" y="164" textAnchor="middle" fontSize="15" fill={base} fontFamily="var(--font-display)">
        basis
      </text>

      {parts.map((p, i) => {
        const y = 30 + i * 62;
        return (
          <g key={p}>
            <path d={`M300 ${y + 18} C 250 ${y + 18}, 236 150, 186 150`} fill="none" stroke={sage} strokeWidth="2" strokeDasharray="5 7" />
            <rect x="300" y={y} width="194" height="38" rx="19" fill="none" stroke={boxStroke} strokeWidth="1.5" />
            <text x="397" y={y + 24} textAnchor="middle" fontSize="13" fill={base}>
              {p}
            </text>
          </g>
        );
      })}

      <circle cx="186" cy="150" r="9" fill={copper} />
      <text x="26" y="248" fontSize="12" fill={base} opacity="0.6">
        Wat we al hebben
      </text>
      <text x="300" y="290" fontSize="12" fill={base} opacity="0.6">
        Wat we per bedrijf passend maken
      </text>
    </svg>
  );
}

/** Herkenning: vier handmatige stappen rondom één aanvraag. */
export function ManualSteps({ className, tone = "light", accent = copper }: { className?: string; tone?: "light" | "dark"; accent?: string }) {
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
            <circle cx={x} cy="70" r="16" fill={i === 3 ? accent : tone === "dark" ? "var(--ink-hero)" : "var(--cream)"} stroke={i === 3 ? accent : rail} strokeWidth="2" />
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

/** Herkenning: klantvraag die via vier handmatige stappen wordt afgehandeld. */
export function ManualStepsFlow({ className }: { className?: string }) {
  const steps = [
    { icon: FileText, label: "Info aanvullen" },
    { icon: Search, label: "Prijzen zoeken" },
    { icon: Copy, label: "Gegevens overtypen" },
    { icon: Calendar, label: "Opvolgen", badge: Clock },
  ];

  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <div className="flex w-max items-start gap-3 px-1 sm:w-full sm:justify-between sm:gap-2">
        <div className="flex flex-col items-center pt-4">
          <span className="rounded-full bg-cream px-5 py-3 text-sm font-medium text-ink shadow-sm">
            Klantvraag
          </span>
        </div>

        {steps.map((s, i) => {
          const Icon = s.icon;
          const Badge = s.badge;
          return (
            <div key={s.label} className="flex items-start gap-3">
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                className="mt-9 shrink-0 text-home-accent"
                aria-hidden="true"
              >
                <path d="M0 10 H22" stroke="currentColor" strokeWidth="2" />
                <path d="M16 3 L23 10 L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="flex w-24 flex-col items-center text-center sm:w-28">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-shell sm:h-20 sm:w-20">
                  <Icon className="h-7 w-7 text-forest" strokeWidth={1.75} aria-hidden="true" />
                  {Badge && (
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-home-accent">
                      <Badge className="h-3.5 w-3.5 text-white" strokeWidth={2} aria-hidden="true" />
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-snug text-forest">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const journeyIcons: Record<string, typeof FileText> = {
  "complete-aanvragen": FileText,
  "slimme-configurator": Sliders,
  "automatische-opvolging": Clock,
};

/** Klikbare flow: de oplossingen die samen "van aanvraag tot offerte" vormen. */
export function SolutionJourney({
  items,
  className,
}: {
  items: { slug: string; title: string }[];
  className?: string;
}) {
  const Arrow = () => (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mt-9 shrink-0 text-home-accent" aria-hidden="true">
      <path d="M0 10 H22" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3 L23 10 L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <div className="flex w-max items-start gap-3 px-1 sm:w-full sm:justify-between sm:gap-2">
        {items.map((s, i) => {
          const Icon = journeyIcons[s.slug] ?? FileText;
          return (
            <div key={s.slug} className="flex items-start gap-3">
              {i > 0 ? <Arrow /> : null}
              <Link
                to="/oplossingen/$slug"
                params={{ slug: s.slug }}
                className="group flex w-24 flex-col items-center text-center sm:w-28"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shell transition-colors group-hover:bg-home-accent/15 sm:h-20 sm:w-20">
                  <Icon className="h-7 w-7 text-forest" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm leading-snug text-forest group-hover:underline group-hover:underline-offset-4">
                  {s.title}
                </p>
              </Link>
            </div>
          );
        })}

        <div className="flex items-start gap-3">
          <Arrow />
          <div className="flex w-24 flex-col items-center text-center sm:w-28">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-home-accent sm:h-20 sm:w-20">
              <Check className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm leading-snug text-forest">Offerte</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sierlijk sterretje naast een icoon, in de accentkleur. */
function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 4 L8 8" stroke="var(--home-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12 L7 12" stroke="var(--home-accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 20 L8 16" stroke="var(--home-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Herkenning: klantvraag die in een zigzag via vier stappen wordt afgehandeld. */
export function RecognitionFlow({ className }: { className?: string }) {
  const grayBadge = "bg-shell text-ink";
  const accentBadge = "bg-home-accent text-white";

  return (
    <div
      className={`relative aspect-square w-full ${className ?? ""}`}
      role="img"
      aria-label="Eén klantvraag doorloopt vier stappen: info aanvullen, prijzen zoeken, gegevens overtypen en opvolgen"
    >
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <marker id="rf-arrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--home-accent)" />
          </marker>
        </defs>
        <path d="M200,128 C240,165 250,95 300,118" fill="none" stroke="var(--home-accent)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#rf-arrow)" />
        <path d="M405,178 C470,205 460,272 322,215" fill="none" stroke="var(--home-accent)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#rf-arrow)" />
        <path d="M188,255 C138,250 108,265 117,289" fill="none" stroke="var(--home-accent)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#rf-arrow)" />
        <path d="M199,368 C240,345 270,385 299,378" fill="none" stroke="var(--home-accent)" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#rf-arrow)" />
      </svg>

      {/* 1. Klantvraag */}
      <div
        className="absolute flex items-center justify-center gap-3 rounded-full bg-card px-5 shadow-[0_10px_30px_-12px_rgba(20,30,25,0.25)]"
        style={{ left: "5%", top: "9%", width: "37%", height: "23%" }}
      >
        <Spark className="absolute -left-2 -top-3 h-5 w-5" />
        <MessageSquare className="h-7 w-7 shrink-0 text-forest" strokeWidth={1.75} aria-hidden="true" />
        <p className="font-display text-lg text-forest">Klantvraag</p>
        <span className={`absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${accentBadge}`}>
          1
        </span>
      </div>

      {/* 2. Info aanvullen */}
      <div
        className="absolute flex flex-col items-center justify-center gap-2 rounded-full bg-card text-center shadow-[0_10px_30px_-12px_rgba(20,30,25,0.25)]"
        style={{ left: "60%", top: "6%", width: "32%", height: "32%" }}
      >
        <div className="relative">
          <FileText className="h-7 w-7 text-forest" strokeWidth={1.75} aria-hidden="true" />
          <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-home-accent">
            <Plus className="h-3 w-3 text-white" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
        <p className="font-display text-base text-forest">Info aanvullen</p>
        <span className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${grayBadge}`}>
          2
        </span>
      </div>

      {/* 3. Prijzen zoeken */}
      <div
        className="absolute flex flex-col items-center justify-center gap-2 rounded-full bg-card text-center shadow-[0_10px_30px_-12px_rgba(20,30,25,0.25)]"
        style={{ left: "37%", top: "34%", width: "28%", height: "28%" }}
      >
        <Spark className="absolute -left-3 bottom-4 h-5 w-5" />
        <Search className="h-6 w-6 text-forest" strokeWidth={1.75} aria-hidden="true" />
        <p className="font-display text-sm text-forest">Prijzen zoeken</p>
        <span className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${grayBadge}`}>
          3
        </span>
      </div>

      {/* 4. Gegevens overtypen */}
      <div
        className="absolute flex flex-col items-center justify-center gap-2 rounded-full bg-card px-2 text-center shadow-[0_10px_30px_-12px_rgba(20,30,25,0.25)]"
        style={{ left: "8%", top: "58%", width: "32%", height: "32%" }}
      >
        <Copy className="h-7 w-7 text-forest" strokeWidth={1.75} aria-hidden="true" />
        <p className="font-display text-base text-forest">Gegevens overtypen</p>
        <span className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${accentBadge}`}>
          4
        </span>
      </div>

      {/* 5. Opvolgen */}
      <div
        className="absolute flex flex-col items-center justify-center gap-2 rounded-full bg-card text-center shadow-[0_10px_30px_-12px_rgba(20,30,25,0.25)]"
        style={{ left: "60%", top: "60%", width: "32%", height: "32%" }}
      >
        <Spark className="absolute right-8 -top-4 h-5 w-5" />
        <div className="relative">
          <Calendar className="h-7 w-7 text-forest" strokeWidth={1.75} aria-hidden="true" />
          <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-home-accent">
            <Clock className="h-3 w-3 text-white" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
        <p className="font-display text-base text-forest">Opvolgen</p>
        <span className={`absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${accentBadge}`}>
          5
        </span>
      </div>
    </div>
  );
}

/** Nu (los overtypen) versus met een koppeling (automatisch synchroon). */
export function DataSyncFlow({ className }: { className?: string }) {
  const systems = [
    { icon: Mail, label: "Mail" },
    { icon: FileSpreadsheet, label: "Excel" },
    { icon: Database, label: "CRM" },
  ];

  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${className ?? ""}`}>
      <div className="rounded-2xl border border-line bg-shell p-7">
        <p className="eyebrow text-ink/40">Nu</p>
        <div className="relative mt-8 h-24" role="img" aria-label="Mail, Excel en CRM apart, met iemand die ertussen overtypt">
          <svg viewBox="0 0 240 96" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M40 18 L120 48 L200 18" fill="none" stroke={ink} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 5" />
            <path d="M40 78 L120 48 L200 78" fill="none" stroke={ink} strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 5" />
          </svg>
          <div className="relative flex h-full items-center justify-between">
            {systems.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream">
                  <s.icon className="h-5 w-5 text-ink/50" aria-hidden="true" />
                </div>
                <span className="text-xs text-ink/55">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-ink/70">
          Iemand typt dezelfde klantgegevens drie keer over — en drie keer kan het net iets anders.
        </p>
      </div>

      <div className="rounded-2xl border border-forest/20 bg-cream p-7">
        <p className="eyebrow text-forest">Met een koppeling</p>
        <div className="relative mt-8 h-24" role="img" aria-label="Mail, Excel en CRM automatisch aan elkaar gekoppeld">
          <svg viewBox="0 0 240 96" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M40 18 L120 48" fill="none" stroke={forest} strokeWidth="1.5" />
            <path d="M200 18 L120 48" fill="none" stroke={forest} strokeWidth="1.5" />
            <path d="M40 78 L120 48" fill="none" stroke={forest} strokeWidth="1.5" />
            <path d="M200 78 L120 48" fill="none" stroke={forest} strokeWidth="1.5" />
          </svg>
          <div className="relative flex h-full items-center justify-between">
            {systems.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/30 bg-forest/10">
                  <s.icon className="h-5 w-5 text-forest" aria-hidden="true" />
                </div>
                <span className="text-xs text-forest/80">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-home-accent">
            <Check className="h-4 w-4 text-white" strokeWidth={2.5} aria-hidden="true" />
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-forest">
          Eén keer invoeren. De rest komt vanzelf op de juiste plek terecht.
        </p>
      </div>
    </div>
  );
}
