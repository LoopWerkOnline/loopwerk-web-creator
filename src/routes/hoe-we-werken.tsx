import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BaseAndCustom } from "@/components/infographics";

const title = "Hoe we werken — LoopWerk";
const description =
  "Van bekend probleem naar werkende tool: eerst kijken wat er echt gebeurt, dan een bestaande basis inzetten en die op maat maken voor jullie proces.";

export const Route = createFileRoute("/hoe-we-werken")({
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
  component: HoeWeWerken,
});

const steps = [
  {
    n: "01",
    title: "Kijken wat er nu gebeurt",
    body:
      "We lopen het proces door zoals het vandaag loopt. Wie doet wat, waar blijft informatie hangen en hoeveel tijd kost dat per week? Geen workshop van twee dagen — meestal is één gesprek en wat meekijken genoeg.",
  },
  {
    n: "02",
    title: "Bepalen wat het waard is",
    body:
      "Voordat er iets gebouwd wordt, maken we het concreet: hoeveel tijd of hoeveel gemiste aanvragen gaat dit schelen? Levert het te weinig op, dan zeggen we dat en stoppen we hier.",
  },
  {
    n: "03",
    title: "Bestaande basis inzetten",
    body:
      "We beginnen zelden bij nul. Formulieren, keuzeflows, prijslogica, koppelingen en opvolging hebben we al werkend liggen. Dat scheelt tijd én risico.",
  },
  {
    n: "04",
    title: "Op maat maken",
    body:
      "Jullie producten, regels, uitzonderingen en systemen erin. Dit is het deel waar het verschil zit tussen een demo en iets dat je echt kunt gebruiken.",
  },
  {
    n: "05",
    title: "In gebruik nemen",
    body:
      "Live zetten, meekijken bij de eerste echte aanvragen en bijstellen op wat er in de praktijk gebeurt. Niet één oplevering, maar tot het werkt.",
  },
  {
    n: "06",
    title: "Doorontwikkelen",
    body:
      "Als het draait, wordt vanzelf duidelijk wat de volgende stap is. Dat pakken we op wanneer het nuttig is, niet omdat het in een contract staat.",
  },
];

function HoeWeWerken() {
  return (
    <>
      <Section tone="shell" className="!pb-14">
        <Eyebrow>Hoe we werken</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Geen traject van maanden, maar iets dat <span className="hand text-[1.15em]">werkt</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
          We bouwen software die aansluit op hoe jullie nu werken. De basis staat al; wat per bedrijf
          verschilt maken we passend. Daardoor duurt het weken in plaats van kwartalen.
        </p>
      </Section>

      <Section>
        <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-line pt-6">
              <span className="eyebrow text-copper">{s.n}</span>
              <h2 className="mt-3 text-2xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="shell">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <Eyebrow>Standaard én maatwerk</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-4xl">
              Waarom dat sneller is dan bouwen vanaf nul
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Volledig maatwerk kost tijd en geld aan onderdelen die overal hetzelfde zijn. Een kant-
              en-klaar pakket past juist net niet op jullie regels en uitzonderingen. Wij zetten een
              beproefde basis neer en maken alleen het deel op maat dat er echt toe doet.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Sneller iets werkends om op te reageren.",
                "Minder risico: de basis draait al ergens anders.",
                "Betaalbaar, omdat je alleen het unieke deel betaalt.",
              ].map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed text-ink/80">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <BaseAndCustom className="w-full" />
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl md:text-4xl">Benieuwd wat dit voor jullie betekent?</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
              Vertel kort wat er nu handmatig gaat. Wij komen terug met wat we ervan denken.
            </p>
          </div>
          <Link
            to="/contact"
            className="justify-self-start rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
        </div>
      </Section>
    </>
  );
}
