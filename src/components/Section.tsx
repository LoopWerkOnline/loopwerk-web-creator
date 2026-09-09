import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "shell" | "ink" | "forest" | "hero";
}) {
  const tones = {
    cream: "bg-cream text-ink",
    shell: "bg-shell text-ink",
    ink: "bg-ink-hero text-cream",
    forest: "bg-forest text-cream",
    hero: "bg-ink-hero text-cream",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "forest",
}: {
  children: ReactNode;
  tone?: "forest" | "sage" | "copper" | "home-accent";
}) {
  const colors = {
    forest: "text-forest",
    sage: "text-sage",
    copper: "text-copper",
    "home-accent": "text-home-accent",
  } as const;
  return <p className={`eyebrow ${colors[tone]}`}>{children}</p>;
}
