import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";

const title = "Werkwijze — van knelpunt naar werkende tool | LoopWerk";
const description =
  "In vier stappen van gesprek naar een tool die draait: knelpunt scherp krijgen, ontwerp, bouwen en opleveren, doorontwikkelen.";

export const Route = createFileRoute("/werkwijze")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Werkwijze,
});

const steps = [
  {
    n: "1",
    t: "Knelpunt scherp krijgen",
    d: "Eén gesprek over hoe het werk nu loopt. Wij rekenen uit hoeveel tijd de huidige route kost en waar die weglekt.",
    meta: "1 gesprek",
  },
  {
    n: "2",
    t: "Ontwerp en afbakening",
    d: "U ziet vooraf wat de tool doet, hoe hij eruitziet en wat er expliciet buiten valt. Geen verrassingen achteraf.",
    meta: "Vaste scope",
  },
  {
    n: "3",
    t: "Bouwen en opleveren",
    d: "Wij bouwen in korte rondes en laten tussentijds zien wat er staat, zodat u bijstuurt terwijl het nog goedkoop is.",
    meta: "Weken, geen jaren",
  },
  {
    n: "4",
    t: "Doorontwikkelen",
    d: "Na oplevering kijken we naar het gebruik: wat werkt, wat kan weg, wat verdient een volgende stap.",
    meta: "Blijvend aanspreekbaar",
  },
];

function Werkwijze() {
  return (
    <>
      <Section>
        <Eyebrow>Werkwijze</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
          Van knelpunt naar werkende tool, <span className="hand text-[1.1em]">stap voor stap</span>
        </h1>
      </Section>

      <Section tone="shell" className="!pt-0 md:!pt-0">
        <ol className="relative border-l border-sage pl-8 md:pl-12">
          {steps.map((s) => (
            <li key={s.n} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[2.55rem] flex h-9 w-9 items-center justify-center rounded-full bg-copper font-display text-lg text-white md:-left-[3.55rem]">
                {s.n}
              </span>
              <p className="eyebrow text-forest">{s.meta}</p>
              <h2 className="mt-2 text-3xl">{s.t}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { t: "Vaste afspraken", d: "Vooraf duidelijk wat u krijgt en wat het kost." },
            { t: "Uw data blijft van u", d: "Alles draait op omgevingen die u zelf in handen houdt." },
            { t: "Nederlandstalig", d: "Eén aanspreekpunt dat uw sector begrijpt." },
          ].map((c) => (
            <div key={c.t}>
              <h2 className="text-2xl text-cream">{c.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Link
            to="/contact"
            className="inline-flex rounded-full bg-copper px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Plan een gesprek
          </Link>
        </div>
      </Section>
    </>
  );
}
