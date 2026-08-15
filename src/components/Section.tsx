import type { ReactNode } from "react";

export function Section({
  children,
  className,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "shell" | "ink";
}) {
  const tones = {
    cream: "bg-cream text-ink",
    shell: "bg-shell text-ink",
    ink: "bg-ink text-cream",
  } as const;

  return (
    <section className={`${tones[tone]} ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "forest" }: { children: ReactNode; tone?: "forest" | "sage" | "copper" }) {
  const colors = { forest: "text-forest", sage: "text-sage", copper: "text-copper" } as const;
  return (
    <p className={`eyebrow flex items-center gap-3 ${colors[tone]}`}>
      <span className="inline-block h-px w-8 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
