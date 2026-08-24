import markAsset from "@/assets/loopwerk-mark.png.asset.json";

type Props = {
  className?: string;
  variant?: "ink" | "cream";
  showTagline?: boolean;
};

/** LoopWerk-lockup: beeldmerk (ronde pijl) met woordmerk en tagline. */
export function Logo({ className, variant = "ink", showTagline = true }: Props) {
  const text = variant === "cream" ? "text-cream" : "text-ink";
  const sub = variant === "cream" ? "text-sage" : "text-forest";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <img
        src={markAsset.url}
        alt=""
        aria-hidden="true"
        className={`h-9 w-9 shrink-0 object-contain ${variant === "cream" ? "brightness-0 invert" : ""}`}
      />

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
