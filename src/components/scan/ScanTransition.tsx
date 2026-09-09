import { Section } from "@/components/Section";

/** Eén sterk overgangsmoment vóór het resultaat. Geen score, wel herkenning. */
export function ScanTransition({ lines, onContinue }: { lines: string[]; onContinue: () => void }) {
  return (
    <Section tone="forest">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="fade-up text-4xl leading-tight md:text-5xl">
          Dit begint ergens op te <span className="hand text-[1.1em]">lijken</span>.
        </h1>
        <div className="mt-7 space-y-4" style={{ animationDelay: "0.1s" }}>
          {lines.map((line, i) => (
            <p key={i} className="fade-up text-lg leading-relaxed text-cream/80" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
              {line}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="fade-up mt-10 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ animationDelay: "0.4s" }}
        >
          Bekijk mijn analyse →
        </button>
      </div>
    </Section>
  );
}
