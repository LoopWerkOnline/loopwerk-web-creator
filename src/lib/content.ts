/**
 * Inhoudelijke bron voor oplossingen en sectoren.
 * Eén bestand, zodat overzichten, detailpagina's en homepageblokken niet uit elkaar lopen.
 */

/** Interactieve "herken je dit?"-check die doorlinkt naar een voorgevulde Scan. */
export type SolutionCheck = {
  items: { id: string; label: string }[];
  /** Duidingszinnen, oplopend. De tekst met de hoogste `min` die nog <= aantal aangevinkt is, wordt getoond. */
  readouts: { min: number; text: string }[];
  ctaLabel: string;
  /** Moet een bestaande waarde zijn uit de "process"-opties in lib/scan/questions.ts. */
  scanProcess: string;
  /** Bestaande waarden uit de "timeSinks"-opties. */
  scanTimeSinks?: string[];
  /** Bestaande waarden uit de "sources"-opties. */
  scanSources?: string[];
};

export type Solution = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  /** Wat we binnen bedrijven vaak zien gebeuren. */
  signals: string[];
  /** Wat we al als basis hebben liggen. */
  base: string[];
  /** Waar het maatwerk begint. */
  custom: string[];
  /** Specifieke aanpak voor déze oplossing (i.p.v. een generieke alinea). */
  approach?: string;
  /** Interactieve zelf-check i.p.v. de statische signals-bullets. */
  check?: SolutionCheck;
  /** Concrete, bescheiden scope-belofte voor de eerste maand. Geen resultaatclaim. */
  firstMonth?: string;
  /** Voor niet-featured oplossingen: eerlijke brug naar bewezen werk elders i.p.v. een stilzwijgend ontbrekende case. */
  proofNote?: string;
  /** Volgorde binnen de "Van aanvraag tot offerte"-flow op het overzicht. Ontbreekt = losse capability. */
  journeyStep?: number;
  featured?: boolean;
  /** Sfeerbeeld voor de oplossingsslider én de paginahero. */
  image?: string;
  imageAlt?: string;
};

export const solutions: Solution[] = [
  {
    slug: "slimme-configurator",
    title: "Slimme configurator",
    short:
      "Klant stelt zelf maten en opties samen, ziet direct een prijsindicatie, en jullie krijgen een complete aanvraag.",
    intro:
      "Een offerteaanvraag begint met dezelfde vragen: maten, opties, budget. Laat de klant dat zelf samenstellen — met een prijs die meteen meetelt — en er blijft tijd over voor het gesprek dat er echt toe doet.",
    signals: [
      "Het eerste gesprek gaat vooral over informatie ophalen, niet over de opdracht.",
      "Calculeren gebeurt in een Excel die eigenlijk maar één persoon goed begrijpt.",
      "Prijswijzigingen moeten op meerdere plekken worden doorgevoerd.",
      "Een deel van de gesprekken loopt achteraf alsnog dood op prijs.",
    ],
    base: [
      "Stapsgewijze keuzeflow met een meelopende samenvatting en live prijsindicatie.",
      "Rekenmodel met staffels, toeslagen en marges, centraal te beheren.",
      "Automatische conceptofferte plus opslag van de aanvraag als lead.",
    ],
    custom: [
      "Jullie producten, varianten, opties en prijzen.",
      "Regels en uitzonderingen: welke opties samen kunnen, welke elkaar uitsluiten.",
      "Huisstijl, teksten en de plek waar de aanvraag naartoe moet.",
    ],
    approach:
      "Dit zetten we voor jullie op: een stapsgewijze keuzeflow, een rekenmodel met staffels en toeslagen, een automatische conceptofferte. Jullie producten, prijzen en regels bepalen de precieze invulling.",
    journeyStep: 2,
    featured: true,
    image: "/oplossingen/opl-1.jpg",
    imageAlt: "Laptop met een dashboard vol cijfers op een werktafel",
  },
  {
    slug: "complete-aanvragen",
    title: "Complete aanvragen",
    short:
      "Nooit meer drie keer mailen voor dezelfde informatie — vraag het in één keer, vooraf.",
    intro:
      "Een onvolledige aanvraag kost al snel drie mails en twee dagen. Wie vooraf weet wat nodig is, kan dat ook vooraf uitvragen — zonder er meteen een volledige configurator van te maken.",
    signals: [
      "Na iedere aanvraag moet iemand dezelfde informatie opnieuw opvragen.",
      "Bijlagen, maten of foto's ontbreken standaard.",
      "Het duurt dagen voordat een aanvraag inhoudelijk beoordeeld kan worden.",
    ],
    base: [
      "Aanvraagformulieren die meebewegen met eerdere antwoorden.",
      "Validatie en verplichte velden per type aanvraag.",
      "Bestand- en foto-upload met nette naamgeving.",
    ],
    custom: [
      "Welke gegevens jullie per aanvraagsoort echt nodig hebben.",
      "Wie welke aanvraag krijgt en in welke volgorde.",
      "Aansluiting op het systeem waarin jullie de aanvraag verder verwerken.",
    ],
    approach:
      "Dit bouwen we voor jullie: een aanvraagformulier dat meebeweegt met eerdere antwoorden, verplichte velden per aanvraagtype, nette bestand- en foto-upload. Welke informatie jullie precies nodig hebben en waar die naartoe moet, werken we samen uit.",
    journeyStep: 1,
    image: "/oplossingen/opl-2.jpg",
    imageAlt: "Materiaalstalen die op een tafel worden uitgelegd",
  },
  {
    slug: "systeemkoppelingen",
    title: "Systeemkoppelingen",
    short:
      "Dezelfde gegevens drie keer overtypen in mail, Excel en het CRM. Dat werk kan een koppeling net zo goed doen.",
    intro:
      "Overtypen kost tijd en levert fouten op. Meestal staat de informatie al ergens; hij moet alleen op de juiste plek terechtkomen.",
    signals: [
      "Dezelfde klantgegevens staan in vier systemen, drie keer net anders.",
      "Iemand exporteert wekelijks een bestand om het elders weer te importeren.",
      "Fouten komen pas aan het licht bij de facturatie.",
    ],
    base: [
      "Koppelingen tussen formulieren, mail, spreadsheets en administratie.",
      "Automatische verwerking van binnenkomende documenten.",
      "Logging, zodat je kunt terugzien wat er wanneer is verwerkt.",
    ],
    custom: [
      "De systemen die jullie gebruiken en wat die wel of niet toelaten.",
      "Welke velden leidend zijn als twee systemen het oneens zijn.",
      "Wat automatisch mag en wat een mens moet goedkeuren.",
    ],
    approach:
      "We beginnen bij de systemen die jullie al gebruiken — mail, Excel, het CRM — en leggen vast welk systeem leidend is per soort gegeven. Vanaf dat moment hoeft niemand meer hetzelfde drie keer in te voeren: het komt vanzelf op de juiste plek terecht.",
    check: {
      items: [
        { id: "drie-systemen", label: "Dezelfde klantgegevens staan in mail, Excel en het CRM — en niet altijd hetzelfde." },
        { id: "export-import", label: "Iemand exporteert of importeert wekelijks een bestand tussen twee systemen." },
        { id: "fouten-laat", label: "Fouten in gegevens komen pas aan het licht bij de facturatie of aflevering." },
        { id: "dubbel-bijwerken", label: "Nieuwe informatie moet in meerdere systemen apart worden bijgewerkt." },
      ],
      readouts: [
        { min: 0, text: "Klik aan wat herkenbaar is." },
        { min: 1, text: "Dat is al een concreet punt om te bekijken." },
        { min: 2, text: "Dit patroon — gegevens die je meerdere keren met de hand overneemt — komt vaker voor dan bedrijven zelf denken." },
        { min: 3, text: "Met dit patroon is een koppeling meestal de moeite van uitzoeken waard." },
        { min: 4, text: "Alle vier herkenbaar? Dan zit hier waarschijnlijk reële tijdswinst, en is dit een goed moment om het scherper te laten uitrekenen." },
      ],
      ctaLabel: "Wil je weten hoeveel tijd dit kost? Doe de scan (4 min) →",
      scanProcess: "overnemen",
      scanTimeSinks: ["overtypen", "controleren"],
      scanSources: ["email", "excel", "crm"],
    },
    firstMonth:
      "Een werkende koppeling tussen twee van jullie systemen — bijvoorbeeld de mailbox waar aanvragen binnenkomen en het CRM — getest op aanvragen die er al lagen. Geen demo met nepdata: gewoon jullie eigen gegevens, één keer goed verwerkt.",
    proofNote:
      "Mail, spreadsheet en CRM aan elkaar knopen is precies wat we bouwden binnen de zwembadconfigurator voor Sun Sauna & Poolworld — daar liep de koppeling van configurator naar CRM. Geen losse case voor dit exacte scenario, wel dezelfde bouwstenen en dezelfde manier van werken.",
    image: "/oplossingen/opl-4.jpg",
    imageAlt: "Tablet met grafieken naast papieren rapportages",
  },
  {
    slug: "automatische-opvolging",
    title: "Automatische opvolging",
    short:
      "Een offerte die blijft liggen omdat niemand het meer bijhoudt, hoeft niet van iemands geheugen af te hangen.",
    intro:
      "Opvolging die afhangt van iemands geheugen gaat een keer mis. Meestal bij de aanvraag waar je het minst graag iets misloopt.",
    signals: [
      "Offertes blijven open staan zonder dat iemand het merkt.",
      "Opvolgen gebeurt als het rustig is, dus zelden.",
      "Niemand weet precies hoeveel aanvragen er nu open staan.",
    ],
    base: [
      "Statussen per aanvraag met automatische vervolgacties.",
      "Herinneringen per mail of in het systeem dat jullie al gebruiken.",
      "Overzicht van wat er open staat en hoe lang al.",
    ],
    custom: [
      "Jullie eigen stappen en termijnen.",
      "Wie waarvan eigenaar is.",
      "De toon van de berichten die namens jullie uitgaan.",
    ],
    approach:
      "Dit richten we voor jullie in: statussen per aanvraag, automatische herinneringen, een overzicht van wat er open staat. Jullie eigen termijnen, eigenaarschap en de toon van de berichten bepalen de laatste invulling.",
    journeyStep: 3,
    image: "/oplossingen/opl-5.png",
    imageAlt: "Ondernemer aan de telefoon die aantekeningen maakt achter zijn laptop",
  },
];

export type Sector = {
  slug: string;
  title: string;
  short: string;
  /** Korte handgeschreven tag die de sectorrij op de homepage verbindt. */
  flowLabel?: string;
  /** Sfeerbeeld voor de sectorkaart op de homepage. */
  image?: string;
  imageAlt?: string;
  intro: string;
  /** Wat we binnen dit soort bedrijven vaak zien gebeuren. */
  seen: string[];
  /** Waar onnodig handwerk ontstaat of informatie blijft hangen. */
  friction: string[];
  /** Slugs van passende oplossingen. */
  solutions: string[];
  /** Wat we vervolgens op maat maken. */
  custom: string;
};

export const sectors: Sector[] = [
  {
    slug: "bouw-en-installatie",
    title: "Bouw & installatie",
    short: "Aanvragen, opnames, materiaalkeuzes, calculaties, planning en terugkerende administratie.",
    flowLabel: "van opname naar offerte",
    image: "/sectoren/sector-bouw.jpg",
    imageAlt: "Vakman metselt een wand op een bouwplaats",
    intro:
      "Werk komt binnen via mail, telefoon en via-via. Voordat er een prijs op tafel ligt, is er al een opname geweest, een leverancier gebeld en een calculatie gemaakt.",
    seen: [
      "Aanvragen zonder maten, foto's of situatieschets.",
      "Calculaties in een spreadsheet die per project wordt gekopieerd.",
      "Planning en administratie die achter de uitvoering aan lopen.",
    ],
    friction: [
      "Opnamegegevens worden op papier genoteerd en later overgetypt.",
      "Materiaalprijzen staan op meerdere plekken en lopen uiteen.",
      "Opvolging van open offertes hangt aan één persoon.",
    ],
    solutions: ["complete-aanvragen", "slimme-configurator", "automatische-opvolging"],
    custom:
      "Jullie werksoorten, materiaalprijzen en de manier waarop een opname bij jullie verloopt.",
  },
  {
    slug: "maakindustrie-en-machinebouw",
    title: "Maakindustrie & machinebouw",
    short: "Technische aanvragen, opties, uitvoeringen, calculaties en overdracht naar andere systemen.",
    flowLabel: "configureren zonder engineering",
    image: "/sectoren/sector-machinebouw.jpg",
    imageAlt: "Rupsvoertuig met bak op een terrein in de mist",
    intro:
      "Een aanvraag is pas te beoordelen als de technische uitgangspunten kloppen. Dat uitvragen kost engineeringtijd die je liever aan het werk zelf besteedt.",
    seen: [
      "Technische aanvragen die incompleet binnenkomen.",
      "Optielijsten met combinaties die elkaar uitsluiten.",
      "Overdracht naar productie of ERP met de hand.",
    ],
    friction: [
      "Engineering wordt ingezet om basisgegevens op te halen.",
      "Configuratieregels zitten in hoofden, niet in een systeem.",
      "Dezelfde specificatie wordt meermaals ingevoerd.",
    ],
    solutions: ["slimme-configurator", "complete-aanvragen", "systeemkoppelingen"],
    custom: "Jullie opties, uitvoeringen en de regels die bepalen wat wel en niet samen kan.",
  },
  {
    slug: "handel-en-groothandel",
    title: "Handel & groothandel",
    short: "Productvragen, prijzen, voorwaarden, orders en gegevens die tussen systemen worden overgenomen.",
    flowLabel: "prijs en voorwaarden helder",
    image: "/sectoren/sector-handel.jpg",
    imageAlt: "Afgewerkte badkamer met sanitair en tegelwerk",
    intro:
      "Veel vragen zijn variaties op dezelfde vraag: wat kost dit bij deze afname, onder welke voorwaarden en wanneer is het er?",
    seen: [
      "Prijsafspraken per klant die per mail worden nagezocht.",
      "Orders die vanuit mail worden overgetypt.",
      "Voorraad- en levertijdvragen die telkens terugkomen.",
    ],
    friction: [
      "Dezelfde vraag wordt door meerdere mensen apart beantwoord.",
      "Gegevens lopen tussen webshop, ERP en administratie uit de pas.",
      "Kortingsstaffels zijn niet eenduidig vastgelegd.",
    ],
    solutions: ["slimme-configurator", "systeemkoppelingen", "complete-aanvragen"],
    custom: "Jullie klantafspraken, staffels en de systemen waar de order uiteindelijk in moet landen.",
  },
  {
    slug: "mobiliteit-en-transport",
    title: "Mobiliteit & transport",
    short: "Configuraties, specificaties, aanvragen, offertes en administratieve opvolging.",
    flowLabel: "opties helder uitgeschreven",
    image: "/sectoren/sector-transport.jpg",
    imageAlt: "Vrachtwagen met oplegger op de snelweg bij zonsondergang",
    intro:
      "Van opbouw tot uitvoering: de keuzes liggen vast, maar het samenstellen en doorrekenen gebeurt nog met de hand.",
    seen: [
      "Configuraties die per aanvraag opnieuw worden uitgeschreven.",
      "Specificaties die per mail heen en weer gaan.",
      "Administratieve opvolging na de opdracht.",
    ],
    friction: [
      "Opties en toeslagen staan verspreid over documenten.",
      "Het duurt lang voordat een klant een indicatie heeft.",
      "Aanvragen worden niet centraal vastgelegd.",
    ],
    solutions: ["slimme-configurator", "automatische-opvolging", "systeemkoppelingen"],
    custom: "Jullie uitvoeringen, toeslagen en de doorlooptijd die je richting klant wilt communiceren.",
  },
];

export function solutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export function sectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
