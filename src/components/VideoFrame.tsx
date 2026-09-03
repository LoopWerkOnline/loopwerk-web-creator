/** Demo-video in een rustig browserframe, zodat duidelijk is dat het om echte software gaat. */
export function VideoFrame({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-cream shadow-sm ${className ?? ""}`}>
      <div className="flex items-center gap-2 border-b border-line bg-shell px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-sage" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage" aria-hidden="true" />
        {label ? (
          <span className="ml-3 truncate text-xs text-ink/50">{label}</span>
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
