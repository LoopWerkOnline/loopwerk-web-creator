import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import {
  FakeChoice,
  HandNote,
  IncomingRequest,
  MiniPanel,
  MissingList,
  MovedForwardItem,
  Statement,
  StructuredRequest,
  WhatHappensNext,
  WhatWeMeasure,
} from "@/components/sector-story";
import { solutionBySlug } from "@/lib/content";

const TITLE = "Bouw & installatie — meer uit iedere aanvraag | LoopWerk";
const DESC =
  "Een aanvraag voor een installatie of verbouwing bevat zelden genoeg informatie. LoopWerk haalt het voorwerk naar voren, zodat je met een bruikbare aanvraag start.";

export const Route = createFileRoute("/sectoren/bouw-en-installatie")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BouwEnInstallatiePage,
});

const linkedSlugs = [
  "aanvragen-compleet-binnenkrijgen",
  "calculaties-en-prijsindicaties",
  "opvolging-automatiseren",
];

function BouwEnInstallatiePage() {
  const linked = linkedSlugs.map(solutionBySlug).filter(Boolean);

  return (
    <>
      {/* 1 — Hero */}
      <Section tone="shell" className="!pb-16">
        <Eyebrow>Bouw &amp; installatie</Eyebrow>
        <div className="mt-6 grid gap-12 md:grid-cols-[1.05fr_1fr] md:items-start md:gap-16">
          <div>
            <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-6xl">
              De klant vraagt een prijs. Je krijgt er eerst tien vragen bij.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/70">
              Een aanvraag voor een installatie, verbouwing of technisch product bevat zelden direct
              genoeg informatie om verder te kunnen. Er volgen foto's, maten, technische gegevens,
              keuzes en berekeningen. LoopWerk zorgt dat meer van dat voorwerk gebeurt vóórdat iemand
              de aanvraag oppakt.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#waar-het-werk-ontstaat"
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Bekijk waar het werk ontstaat
              </a>
              <Link
                to="/contact"
                className="rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Bespreek je aanvraagproces
              </Link>
            </div>
            <p className="mt-6 text-base text-ink/55">
              Van losse vraag naar een aanvraag waarmee je echt verder kunt.
            </p>
          </div>

          {/* visuele reeks: losse vraag → ontbrekende info → complete aanvraag */}
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center md:gap-2">
            <HeroCard label="Aanvraag">
              <p className="text-sm leading-snug text-ink/70">
                "Wat kost een warmtepomp ongeveer?"
              </p>
            </HeroCard>
            <Arrow />
            <HeroCard label="Nog onbekend" tone="copper">
              <ul className="space-y-1 font-mono text-xs text-copper">
                <li>woning — ?</li>
                <li>m² — ?</li>
                <li>verbruik — ?</li>
                <li>foto's — ?</li>
              </ul>
            </HeroCard>
            <Arrow />
            <HeroCard label="Bruikbaar" tone="forest">
              <ul className="space-y-1 text-xs leading-snug text-ink/75">
                <li>Vrijstaand, 185 m²</li>
                <li>CV-ketel, vloerverw.</li>
                <li>1.850 m³ gas</li>
                <li>4 foto's</li>
              </ul>
            </HeroCard>
          </div>
        </div>
      </Section>

      {/* 2 — De echte aanvraag */}
      <Section>
        <h2 className="max-w-3xl text-3xl leading-tight md:text-5xl">
          Een prima aanvraag. Alleen nog niet erg bruikbaar.
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <IncomingRequest
            from="Peter"
            subject="Vraag over warmtepomp"
            lines={[
              "Goedemiddag,",
              "Wij zijn geïnteresseerd in een warmtepomp voor onze woning.",
              "Kunnen jullie aangeven wat dit ongeveer kost?",
            ]}
            signature="Groet, Peter"
          />
          <div className="md:pt-6">
            <MissingList
              title="Wat nog onbekend is"
              items={[
                { label: "Woningtype" },
                { label: "Oppervlakte" },
                { label: "Huidige installatie" },
                { label: "Jaarverbruik" },
                { label: "Foto's", value: "ontbreken" },
                { label: "Planning" },
              ]}
            />
            <p className="mt-6">
              <HandNote>En dus begint het vragen stellen.</HandNote>
            </p>
          </div>
        </div>
      </Section>

      {/* 3 — Wat er na versturen gebeurt */}
      <Section tone="shell" id="waar-het-werk-ontstaat">
        <Eyebrow tone="copper">Na 'versturen'</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
          De aanvraag is binnen. Waarom begint het werk dan pas?
        </h2>
        <WhatHappensNext
          steps={[
            { label: "Aanvraag binnen" },
            { label: "Wat wil deze klant precies?", note: "Welke woning?" },
            { label: "Terugbellen of mailen", note: "Heb je foto's?" },
            { label: "Foto's en gegevens verzamelen", note: "Wat is het huidige verbruik?" },
            { label: "Mogelijkheden bepalen" },
            { label: "Prijzen opzoeken en rekenen", note: "Even de calculator erbij." },
            { label: "Intern controleren", note: "Kan iemand hiernaar kijken?" },
            { label: "Advies, afspraak of offerte" },
          ]}
        />
        <div className="mt-14 border-t border-line pt-10">
          <Statement>
            De aanvraag kwam binnen bij stap één. Het waardevolle gesprek begint een stuk later.
          </Statement>
        </div>
      </Section>

      {/* 4 — Het LoopWerk-moment */}
      <Section>
        <Eyebrow>Dezelfde klant</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
          Wat als de aanvraag zelf al wat werk had gedaan?
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-16">
          <StructuredRequest
            name="Peter Jansen"
            place="Eindhoven"
            groups={[
              { label: "Woning", values: ["Vrijstaande woning", "Bouwjaar 1998", "185 m²"] },
              { label: "Huidige situatie", values: ["CV-ketel", "Vloerverwarming beneden"] },
              { label: "Jaarverbruik", values: ["1.850 m³ gas"] },
              { label: "Voorkeur", values: ["All-electric onderzoeken"] },
              { label: "Bijlagen", values: ["4 foto's toegevoegd"] },
              { label: "Planning", values: ["Binnen 6 maanden", "Wens: adviesgesprek"] },
            ]}
            outcome="Geschikt voor verdere beoordeling"
          />
          <div className="md:pt-8">
            <Statement>Dezelfde klant. Dezelfde interesse. Een totaal ander startpunt.</Statement>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">
              Iedere aanvraag is anders. Het werk erna is opvallend vaak hetzelfde. Precies dat deel
              kun je eerder laten gebeuren.
            </p>
          </div>
        </div>
      </Section>

      {/* 5 — Wat er naar voren schuift */}
      <Section tone="shell">
        <Eyebrow tone="copper">Wat er verschuift</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
          We halen het voorwerk naar voren.
        </h2>

        <div className="mt-10">
          <MovedForwardItem
            n="01"
            title="Slimmer uitvragen"
            body="Niet twintig vragen naar iedereen. Alleen vragen wat op dat moment relevant is."
            micro="Vraag het één keer. En meteen goed."
          >
            <FakeChoice
              question="Heeft de woning vloerverwarming?"
              options={["Ja", "Nee"]}
              followUp={{
                question: "Op welke verdieping(en)?",
                hint: "Verschijnt alleen bij 'ja'.",
              }}
            />
          </MovedForwardItem>

          <MovedForwardItem
            n="02"
            title="Klanten laten kiezen"
            body="Help iemand begrijpen welke producten, uitvoeringen of opties bij zijn situatie horen, voordat een collega alle mogelijkheden handmatig moet uitleggen."
            micro="Een voorbeeld — geen vast LoopWerk-product."
          >
            <MiniPanel>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Basis", "Comfort", "Uitgebreid"].map((o, i) => (
                  <div
                    key={o}
                    className={`rounded-lg border px-4 py-5 text-center text-base ${
                      i === 1 ? "border-forest bg-cream text-ink" : "border-line bg-cream text-ink/60"
                    }`}
                  >
                    {o}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink/45">
                Wat hier staat, hangt af van wat jullie verkopen.
              </p>
            </MiniPanel>
          </MovedForwardItem>

          <MovedForwardItem
            n="03"
            title="Regels direct toepassen"
            body="Sommige beslissingen liggen al vast. Die hoeft niemand elke keer opnieuw te nemen."
            micro="Niet iedere aanvraag hoeft dezelfde route te krijgen."
          >
            <MiniPanel>
              <ul className="space-y-4 text-base">
                {[
                  ["Buiten werkgebied?", "andere vervolgstap"],
                  ["Technische combinatie onmogelijk?", "optie niet aanbieden"],
                  ["Project vereist specialist?", "direct naar de juiste collega"],
                ].map(([q, a]) => (
                  <li key={q} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <p className="text-ink/80">{q}</p>
                    <p className="mt-1 text-forest">→ {a}</p>
                  </li>
                ))}
              </ul>
            </MiniPanel>
          </MovedForwardItem>

          <MovedForwardItem
            n="04"
            title="Berekeningen meenemen"
            body="De opbouw van een prijs zit meestal al in iemands hoofd of in een spreadsheet. Die logica kun je één keer vastleggen."
            micro="Als dezelfde Excel iedere dag opengaat, kan het waarschijnlijk slimmer."
          >
            <MiniPanel>
              <ul className="space-y-2 font-mono text-sm text-ink/75">
                <li>basis</li>
                <li>+ uitvoering</li>
                <li>+ montage</li>
                <li>+ opties</li>
                <li>+ locatie</li>
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-base text-forest">
                → prijsrichting, interne calculatie of offertevoorstel
              </p>
            </MiniPanel>
          </MovedForwardItem>

          <MovedForwardItem
            n="05"
            title="Gegevens doorzetten in plaats van overtypen"
            body="De aanvraag komt compleet binnen op de plek waar je verder werkt: in je mail, je overzicht of het systeem dat je al gebruikt. Inclusief bijlagen en een vervolgstap."
            micro="Niet alles past in standaardsoftware. Dat betekent niet dat je het met de hand moet blijven doen."
          >
            <MiniPanel>
              <div className="space-y-3 text-base text-ink/75">
                <p className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  Aanvraag <span className="text-forest">→ overzicht</span>
                </p>
                <p className="flex items-center justify-between gap-4 border-b border-line pb-3">
                  Bijlagen <span className="text-forest">→ dossier</span>
                </p>
                <p className="flex items-center justify-between gap-4">
                  Vervolgstap <span className="text-forest">→ juiste collega</span>
                </p>
              </div>
            </MiniPanel>
          </MovedForwardItem>
        </div>
      </Section>

      {/* 6 — Wat je erna kunt zien */}
      <Section>
        <Eyebrow>Wat je erna kunt zien</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
          Meer uit iedere aanvraag. Minder werk per aanvraag.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
          We beloven geen percentages. Wel is er na een paar weken vrij eenvoudig te zien of het
          voorwerk daadwerkelijk naar voren is geschoven.
        </p>
        <WhatWeMeasure
          items={[
            {
              label: "Hoe compleet een aanvraag binnenkomt",
              note: "Welke gegevens er standaard bij zitten, en welke nog steeds ontbreken.",
            },
            {
              label: "Hoeveel heen-en-weer er nog nodig is",
              note: "Het aantal mails en telefoontjes voordat je inhoudelijk kunt reageren.",
            },
            {
              label: "Hoe snel de eerste inhoudelijke reactie komt",
              note: "Niet een automatische ontvangstbevestiging, maar een echt antwoord.",
            },
          ]}
        />
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/70">
          Te complex voor een standaardformulier. Te specifiek voor standaardsoftware. Te veel
          terugkerend werk om zo te laten — dan is dit meestal de moeite waard.
        </p>
      </Section>

      {/* 7 — Eerlijk */}
      <Section tone="shell">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-16">
          <div>
            <Eyebrow tone="copper">Eerlijk gezegd</Eyebrow>
            <h2 className="mt-6 text-3xl leading-tight md:text-4xl">
              Soms blijkt bestaande software prima te passen. Dan zeggen we dat ook.
            </h2>
          </div>
          <div className="md:pt-16">
            <p className="text-lg leading-relaxed text-ink/70">
              We bouwen liever iets kleins dat werkt dan iets groots dat indruk maakt. En als het
              probleem eigenlijk in een afspraak zit in plaats van in een systeem, is dat ook een
              prima uitkomst.
            </p>
            <p className="mt-6">
              <HandNote>AI waar het helpt. Gewone automatisering waar dat beter werkt.</HandNote>
            </p>
          </div>
        </div>
      </Section>

      {/* Wat hier meestal bij past */}
      <Section>
        <Eyebrow>Wat hier meestal bij past</Eyebrow>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {linked.map((s) => (
            <Link
              key={s!.slug}
              to="/oplossingen/$slug"
              params={{ slug: s!.slug }}
              className="flex flex-col bg-cream p-8 transition-colors hover:bg-shell"
            >
              <span className="eyebrow text-copper">{s!.n}</span>
              <h3 className="mt-3 text-2xl">{s!.title}</h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink/70">{s!.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 8 — Slot-CTA */}
      <Section tone="ink">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <h2 className="max-w-2xl text-3xl leading-tight md:text-5xl">
              Wat gebeurt er bij jullie nadat iemand op 'versturen' klikt?
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Laat ons één echte aanvraag volgen. Vaak is dan snel zichtbaar waar informatie,
              keuzes, berekeningen en terugkerend werk slimmer kunnen worden ingericht.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link
              to="/contact"
              className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Breng een aanvraag met ons in kaart
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Plan een kennismaking
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function HeroCard({
  label,
  tone = "neutral",
  children,
}: {
  label: string;
  tone?: "neutral" | "copper" | "forest";
  children: React.ReactNode;
}) {
  const border =
    tone === "copper" ? "border-copper/40" : tone === "forest" ? "border-forest/40" : "border-line";
  const labelColor =
    tone === "copper" ? "text-copper" : tone === "forest" ? "text-forest" : "text-ink/45";
  return (
    <div className={`rounded-lg border bg-cream p-4 ${border}`}>
      <p className={`text-[0.65rem] uppercase tracking-[0.18em] ${labelColor}`}>{label}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Arrow() {
  return (
    <span className="hidden text-copper sm:block" aria-hidden="true">
      →
    </span>
  );
}
