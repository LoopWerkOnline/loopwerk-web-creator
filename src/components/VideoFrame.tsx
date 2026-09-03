/** Demo-video in een rustig browserframe, zodat duidelijk is dat het om echte software gaat. */
export function VideoFrame({
  src,
  alt,
  label,
  className,
  variant = "light",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <figure
      className={`overflow-hidden rounded-xl border shadow-sm ${
        isDark ? "border-cream/10 bg-ink/30" : "border-line bg-cream"
      } ${className ?? ""}`}
    >
      <div
        className={`flex items-center gap-2 border-b px-4 py-3 ${
          isDark ? "border-cream/10 bg-ink/40" : "border-line bg-shell"
        }`}
      >
        <span className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-sage/70" : "bg-sage"}`} aria-hidden="true" />
        <span className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-sage/70" : "bg-sage"}`} aria-hidden="true" />
        <span className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-sage/70" : "bg-sage"}`} aria-hidden="true" />
        {label ? (
          <span className={`ml-3 truncate text-xs ${isDark ? "text-cream/50" : "text-ink/50"}`}>{label}</span>
        ) : null}
      </div>
      <video
        src={src}
        aria-label={alt}
        controls
        autoPlay
        muted
        loop
        playsInline
        className="block w-full"
      />
    </figure>
  );
}
