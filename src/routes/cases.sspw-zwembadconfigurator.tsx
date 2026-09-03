import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { BrowserFrame } from "@/components/BrowserFrame";
import { VideoFrame } from "@/components/VideoFrame";
import { sspwStap1, sspwStap2, sspwStap3, sspwZwembad } from "@/lib/assets";
import demoVideo from "@/assets/SSPW_configurator_demo_V2_HQ.mp4.asset.json";

const title = "Case: zwembadconfigurator voor SSPW | LoopWerk";
const description =
  "Hoe SSPW met een configurator klanten vooraf door de belangrijkste keuzes en de prijsrichting leidt, zodat het gesprek met Jacques een stuk verder begint.";

export const Route = createFileRoute("/cases/sspw-zwembadconfigurator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CaseSSPW,
});

function CaseSSPW() {
  return (
    <>
      {/* Hero — herkenbare situatie */}
      <Section tone="ink">
        <Eyebrow tone="sage">Case · Sun Sauna &amp; Poolworld</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.08] md:text-6xl">
          “Wat kost een <span className="hand text-[1.1em]">zwembad</span> ongeveer?”
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
          Die vraag krijgt Jacques regelmatig. Alleen hangt een goede prijsindicatie af van het
          formaat, de uitvoering en verschillende keuzes. Voordat hij een goede indicatie kan
          geven, moet dus eerst duidelijk worden wat iemand precies zoekt.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://offer-calculator-sspw.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bekijk de configurator ↗
          </a>
          <Link
            to="/contact"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Bespreek je proces
          </Link>
        </div>
      </Section>

      {/* De situatie */}
      <Section tone="forest">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow tone="sage">De situatie</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight text-cream md:text-4xl">
              Het gesprek begon pas echt in de zaak
            </h2>
            <p className="mt-5 leading-relaxed text-cream/75">
              Klanten kwamen langs om samen een zwembad samen te stellen. Zo’n gesprek kon al snel
              een uur duren — om er soms pas bij de uiteindelijke prijs achter te komen dat die
              helemaal niet aansloot bij wat de klant in gedachten had.
            </p>
            <p className="mt-4 leading-relaxed text-cream/75">
              En dan begon het vragen stellen opnieuw: welke maat, welke trap, welke filtering,
              welke afdekking. Informatie die de klant prima zelf kan doorgeven — mits je hem goed
              door de keuzes leidt.
            </p>
          </div>
          <BrowserFrame
            src={sspwZwembad}
            alt="Bouwkundig zwembad bij een woning, zoals SSPW die ontwerpt en bouwt"
            label="Zwembad op maat — maar elke aanvraag is anders"
            variant="dark"
          />
        </div>
      </Section>

      {/* De oplossing: configurator in drie stappen */}
      <Section tone="ink">
        <Eyebrow tone="sage">De oplossing</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight md:text-4xl">
          Een configurator die het eerste deel van de aanvraag opvangt
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-cream/75">
          De klant doorloopt zelf de belangrijkste keuzes, ziet direct wat standaard is inbegrepen
          en krijgt een prijsrichting. De aanvraag komt gestructureerd binnen — en het gesprek met
          Jacques begint een stuk verder.
        </p>
        <div className="mt-12">
          <VideoFrame
            src={demoVideo.url}
            alt="Demo van de SSPW-zwembadconfigurator: van opties kiezen tot complete aanvraag"
            label="Zwembadconfigurator — demo"
            variant="dark"
          />
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Stap 1 — Formaat",
              d: "Kies een veelgebruikte maat of geef eigen afmetingen door. Direct zichtbaar wat standaard is inbegrepen.",
              img: sspwStap1,
              alt: "Stap 1 van de configurator: formaat kiezen met een overzicht van wat standaard is inbegrepen",
            },
            {
              t: "Stap 2 — Uitvoering",
              d: "Trap, verlichting, filtering, waterbehandeling en afdekking. Per optie de meerprijs, in een lopende samenvatting.",
              img: sspwStap2,
              alt: "Stap 2 van de configurator: opties kiezen met meerprijzen en een meelopende samenvatting",
            },
            {
              t: "Stap 3 — Prijsindicatie",
              d: "De bezoeker laat zijn gegevens achter en ziet de prijsbandbreedte. SSPW krijgt de conceptofferte binnen.",
              img: sspwStap3,
              alt: "Stap 3 van de configurator: gegevensformulier voor de prijsindicatie",
            },
          ].map((s) => (
            <div key={s.t}>
              <BrowserFrame src={s.img} alt={s.alt} label={s.t} variant="dark" />
              <h3 className="mt-5 text-2xl text-cream">{s.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-cream/70">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Wat het oplevert */}
      <Section tone="forest">
        <Eyebrow tone="sage">Wat het oplevert</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight text-cream md:text-4xl">
          Mensen komen beter voorbereid binnen
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="text-2xl leading-snug text-cream">
            Ze hebben eerder een realistisch beeld van wat mogelijk is — en het gesprek met Jacques
            gaat over uitvoering in plaats van over budget.
          </p>
          <ul className="space-y-4 text-cream/75">
            {[
              "De bezoeker kent zijn prijsrichting vóór het eerste contact.",
              "De aanvraag komt gestructureerd binnen, met alle keuzes erbij — zonder overtypen.",
              "Het eerste gesprek begint verder: over wensen en uitvoering, niet over basisgegevens.",
              "Showroomtijd gaat naar de aanvragen die serieus verder willen.",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                <span className="leading-relaxed">{li}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Afsluiting */}
      <Section tone="shell">
        <Eyebrow>Herkenbaar?</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-3xl leading-tight md:text-4xl">
          “Wat kost dat ongeveer?” — krijg je die vraag ook vaak?
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-ink/75">
          Als een goed antwoord afhangt van keuzes die de klant zelf prima kan doorlopen, is er
          waarschijnlijk meer uit je aanvragen te halen. We kijken graag mee naar hoe het bij
          jullie nu gaat.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
          <Link
            to="/"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
          >
            Terug naar home
          </Link>
        </div>
      </Section>
    </>
  );
}
