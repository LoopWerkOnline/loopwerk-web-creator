import type { ReactNode } from "react";

/** Fotohero zoals op Cases, Oplossingen en Over: beeld met donkere verloop-lagen, tekst linksonder. */
export function PhotoHero({
  image,
  imageAlt,
  eyebrow,
  title,
  children,
}: {
  image: string;
  imageAlt: string;
  eyebrow: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-ink-hero text-cream sm:min-h-[500px] md:min-h-[560px]">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink-hero/40" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-hero/90 via-ink-hero/45 to-transparent md:from-ink-hero/85 md:via-ink-hero/30 md:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-hero via-ink-hero/25 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="max-w-3xl">
          <p className="fade-up eyebrow text-sage" style={{ animationDelay: "0s" }}>
            {eyebrow}
          </p>
          <h1
            className="fade-up mt-6 text-4xl leading-[1.1] md:text-6xl"
            style={{ animationDelay: "0.08s" }}
          >
            {title}
          </h1>
          {children ? (
            <div className="fade-up mt-6 max-w-2xl" style={{ animationDelay: "0.16s" }}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
