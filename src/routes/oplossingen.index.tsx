import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { solutions } from "@/lib/content";

const title = "Oplossingen | configurator, aanvraagflows en koppelingen | LoopWerk";
const description =
  "Vier richtingen waarin we bedrijven helpen: een slimme configurator, complete aanvragen, systeemkoppelingen en automatische opvolging.";

export const Route = createFileRoute("/oplossingen/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OplossingenPage,
});

function OplossingenPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[440px] items-end overflow-hidden bg-ink-hero text-cream sm:min-h-[500px] md:min-h-[560px]">
        <img
          src="/oplossingen/hero-oplossingen.jpg"
          alt="Twee mensen die samen aan een laptop werken aan tafel"
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
            <p
              className="fade-up eyebrow text-sage"
              style={{ animationDelay: "0s", fontSize: "0.875rem" }}
            >
              Oplossingen
            </p>
            <h1 className="fade-up mt-6 text-4xl leading-[1.1] md:text-6xl" style={{ animationDelay: "0.08s" }}>
              Bekende problemen, een <span className="hand text-[1.15em]">bestaande</span> richting,
              jouw invulling
            </h1>
            <p
              className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-cream/75"
              style={{ animationDelay: "0.16s" }}
            >
              We beginnen zelden bij nul. De problemen die we tegenkomen lijken op elkaar: informatie
              die te laat compleet is, prijzen die handmatig worden opgezocht, gegevens die worden
              overgetypt. Daar hebben we werkende bouwstenen voor. Wat per bedrijf verschilt, maken we
              op maat.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-stretch">
          <Reveal className="flex h-full flex-col justify-center rounded-3xl bg-ink-hero p-8 text-cream md:p-10">
            <Eyebrow tone="home-accent">Van handwerk naar een slimmer proces</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight text-cream md:text-4xl">
              Minder stappen. Minder gedoe. Meer gedaan.
            </h2>
            <p className="mt-4 leading-relaxed text-cream/75">
              We kijken waar werk onnodig tijd kost, waar informatie blijft liggen en waar dezelfde
              handelingen steeds terugkomen. Vervolgens maken we het proces eenvoudiger en slimmer
              — passend bij hoe jullie bedrijf werkt.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center justify-center md:justify-end">
            <img
              src="/oplossingen/proces-loop.webp"
              alt="Vier stappen in een lus: handmatig werk, slimmer proces, automatisch waar het helpt, meer tijd voor echt werk"
              className="w-full max-w-sm"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="shell">
        <Reveal>
          <Eyebrow tone="home-accent">Oplossingen</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl leading-tight md:text-4xl">
            Alle oplossingen op een rij
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-6">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 3) * 0.06}>
              <div className="grid gap-6 rounded-2xl border border-line bg-cream p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
                <div>
                  <h3 className="text-2xl md:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink/70">{s.short}</p>
                </div>
                <Link
                  to="/oplossingen/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex justify-self-start rounded-full bg-home-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:justify-self-end"
                >
                  Bekijk deze oplossing →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Herken je er een? Of juist iets ertussenin?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              In een kort gesprek kijken we naar wat er nu gebeurt en waar de tijd echt in gaat. Is
              automatiseren niet de moeite waard, dan zeggen we dat.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap justify-self-start gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
            <Link
              to="/scan"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Doe de scan (4 min) →
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
