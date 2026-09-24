import type { ReactNode } from "react";

import { Section, Eyebrow } from "@/components/Section";

/** Eenvoudige layout voor juridische pagina's (privacy, cookies). */
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-ink/55">Laatst bijgewerkt: {updated}</p>
        <div className="legal mt-10 space-y-5 text-base leading-relaxed text-ink/80 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </Section>
  );
}
