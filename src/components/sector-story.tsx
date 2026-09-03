/**
 * Loopwerk-beeldtaal voor sectorverhalen.
 * Bewust generiek gehouden: elke sector vult eigen voorbeelden in,
 * de visuele grammatica blijft hetzelfde.
 */
import type { ReactNode } from "react";

/* ---------- kleine bouwstenen ---------- */

export function Statement({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "cream" }) {
  return (
    <p
      className={`max-w-3xl text-2xl leading-snug md:text-3xl ${
        tone === "cream" ? "text-cream" : "text-ink"
      }`}
    >
      {children}
    </p>
  );
}

export function HandNote({ children }: { children: ReactNode }) {
  return <span className="hand text-xl leading-none text-copper">{children}</span>;
}

/* ---------- 1. De binnenkomende aanvraag ---------- */

export function IncomingRequest({
  from,
  subject,
  lines,
  signature,
}: {
  from: string;
  subject: string;
  lines: string[];
  signature: string;
}) {
  return (
    <article className="rounded-xl border border-line bg-cream shadow-[0_1px_0_0_var(--line)]">
      <header className="flex items-center gap-2 border-b border-line px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="ml-3 text-xs uppercase tracking-[0.18em] text-ink/45">Nieuw bericht</span>
      </header>
      <div className="space-y-1 border-b border-line px-5 py-4 text-sm text-ink/60">
        <p>
          <span className="text-ink/40">Van </span>
          {from}
        </p>
        <p>
          <span className="text-ink/40">Onderwerp </span>
          {subject}
        </p>
      </div>
      <div className="space-y-4 px-5 py-6 text-lg leading-relaxed text-ink/85">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        <p className="text-ink/60">{signature}</p>
      </div>
    </article>
  );
}

export function MissingList({
  title,
  items,
}: {
  title: string;
  items: { label: string; value?: string }[];
}) {
  return (
    <div>
      <p className="eyebrow text-copper">{title}</p>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {items.map((i) => (
          <li key={i.label} className="flex items-baseline justify-between gap-6 py-4">
            <span className="text-lg text-ink/80">{i.label}</span>
            <span className="font-mono text-sm text-copper">{i.value ?? "?"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 2. Wat er daarna gebeurt ---------- */

export function WhatHappensNext({
  steps,
}: {
  steps: { label: string; note?: string }[];
}) {
  return (
    <ol className="relative mt-12 space-y-0 border-l border-line pl-8 md:pl-12">
      {steps.map((s, i) => (
        <li key={s.label} className="relative pb-10 last:pb-0">
          <span
            className={`absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full md:-left-[calc(3rem+5px)] ${
              i === 0 ? "bg-copper" : "bg-sage"
            }`}
            aria-hidden="true"
          />
          <p className="text-xl leading-snug text-ink md:text-2xl">{s.label}</p>
          {s.note ? (
            <p className="mt-2">
              <HandNote>{s.note}</HandNote>
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* ---------- 3. De aanvraag na Loopwerk ---------- */

export function StructuredRequest({
  name,
  place,
  groups,
  outcome,
}: {
  name: string;
  place: string;
  groups: { label: string; values: string[] }[];
  outcome?: string;
}) {
  return (
    <article className="rounded-xl border border-forest/25 bg-cream">
      <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-forest/20 px-6 py-5">
        <h3 className="text-2xl">{name}</h3>
        <span className="text-sm text-ink/55">{place}</span>
      </header>
      <dl className="grid gap-px bg-line sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.label} className="bg-cream px-6 py-5">
            <dt className="eyebrow text-forest">{g.label}</dt>
            <dd className="mt-2 space-y-1 text-lg leading-snug text-ink/85">
              {g.values.map((v) => (
                <p key={v}>{v}</p>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      {outcome ? (
        <footer className="flex items-center gap-3 border-t border-forest/20 px-6 py-4">
          <span className="h-2 w-2 rounded-full bg-forest" aria-hidden="true" />
          <span className="text-sm text-forest">{outcome}</span>
        </footer>
      ) : null}
    </article>
  );
}

/* ---------- 4. Wat er naar voren schuift ---------- */

export function MovedForwardItem({
  n,
  title,
  body,
  micro,
  children,
}: {
  n: string;
  title: string;
  body: string;
  micro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid gap-8 border-t border-line py-12 md:grid-cols-[1.05fr_1fr] md:gap-16">
      <div>
        <span className="eyebrow text-copper">{n}</span>
        <h3 className="mt-3 text-2xl md:text-3xl">{title}</h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">{body}</p>
        {micro ? (
          <p className="mt-5">
            <HandNote>{micro}</HandNote>
          </p>
        ) : null}
      </div>
      {children ? <div className="self-start">{children}</div> : null}
    </div>
  );
}

export function MiniPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-shell p-6 md:p-7">{children}</div>
  );
}

export function FakeChoice({
  question,
  options,
  followUp,
}: {
  question: string;
  options: string[];
  followUp?: { question: string; hint: string };
}) {
  return (
    <MiniPanel>
      <p className="text-base text-ink/80">{question}</p>
      <div className="mt-3 flex gap-2">
        {options.map((o, i) => (
          <span
            key={o}
            className={`rounded-full border px-5 py-2 text-sm ${
              i === 0 ? "border-forest bg-forest text-cream" : "border-line bg-cream text-ink/70"
            }`}
          >
            {o}
          </span>
        ))}
      </div>
      {followUp ? (
        <div className="mt-6 border-l-2 border-copper/50 pl-5">
          <p className="text-base text-ink/80">{followUp.question}</p>
          <p className="mt-2 text-sm text-ink/45">{followUp.hint}</p>
        </div>
      ) : null}
    </MiniPanel>
  );
}

/* ---------- 5. Wat je erna kunt zien ---------- */

export function WhatWeMeasure({ items }: { items: { label: string; note: string }[] }) {
  return (
    <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
      {items.map((i) => (
        <div key={i.label} className="bg-cream p-7">
          <p className="text-xl leading-snug text-ink">{i.label}</p>
          <p className="mt-3 text-base leading-relaxed text-ink/65">{i.note}</p>
        </div>
      ))}
    </div>
  );
}
