/**
 * Inhoudelijke bron voor oplossingen en sectoren.
 * Eén bestand, zodat overzichten, detailpagina's en homepageblokken niet uit elkaar lopen.
 */

export type Solution = {
  slug: string;
  n: string;
  title: string;
  short: string;
  intro: string;
  /** Wat we binnen bedrijven vaak zien gebeuren. */
  signals: string[];
  /** Wat we al als basis hebben liggen. */
  base: string[];
  /** Waar het maatwerk begint. */
  custom: string[];
  featured?: boolean;
  /** Sfeerbeeld voor de oplossingsslider. */
  image?: string;
  imageAlt?: string;
};

export const solutions: Solution[] = [
  {
    slug: "slimme-offerteflow",
    n: "01",
    title: "Slimme offerteflow",
    short:
      "Laat klanten vooraf relevante vragen en keuzes doorlopen, zodat sales direct met de juiste informatie start.",
    intro:
      "Het eerste verkoopgesprek draait vaak vooral om het verzamelen van basisinformatie. Door klanten vooraf gericht door maten, opties en uitvoering te leiden, blijft er meer tijd over voor het echte gesprek.",
    signals: [
      "Het eerste gesprek gaat vooral over informatie ophalen, niet over de opdracht.",
      "Aanvragen komen binnen zonder maten, wensen of budgetkader.",
      "Een deel van de gesprekken loopt achteraf alsnog dood op prijs.",
    ],
    base: [
      "Stapsgewijze keuzeflow met een meelopende samenvatting.",
      "Prijslogica met inbegrepen onderdelen, meerprijzen en uitsluitingen.",
      "Automatische conceptofferte plus opslag van de aanvraag als lead.",
    ],
    custom: [
      "Jullie producten, varianten en prijzen.",
      "Regels en uitzonderingen: welke opties samen kunnen, welke elkaar uitsluiten.",
      "Huisstijl, teksten en de plek waar de aanvraag naartoe moet.",
    ],
    featured: true,
    image: "/__l5e/assets-v1/fc87a63e-bc55-44a4-9575-071b00f079ff/opl-1.jpg",
    imageAlt: "Laptop met een dashboard vol cijfers op een werktafel",
  },
  {
    slug: "aanvragen-compleet-binnenkrijgen",
    n: "02",
    title: "Aanvragen compleet binnenkrijgen",
    short:
      "Informatie eerder en gestructureerd verzamelen, zodat er minder heen en weer contact nodig is.",
    intro:
      "Een onvolledige aanvraag kost al snel drie mails en twee dagen. Als je vooraf weet welke gegevens je nodig hebt, kun je die ook vooraf vragen.",
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
    image: "/__l5e/assets-v1/cf6c23b0-1e5e-446d-b771-4627c8c60323/opl-2.jpg",
    imageAlt: "Materiaalstalen die op een tafel worden uitgelegd",
  },
  {
    slug: "calculaties-en-prijsindicaties",
    n: "03",
    title: "Calculaties en prijsindicaties versnellen",
    short: "Vaste keuzes, prijzen en regels digitaal verwerken waar dat kan.",
    intro:
      "Veel calculatiewerk is geen rekenwerk maar opzoekwerk: welke prijs geldt, welke toeslag hoort erbij, welke uitzondering geldt hier. Dat deel is prima vast te leggen.",
    signals: [
      "Calculeren gebeurt in een Excel die één persoon echt begrijpt.",
      "Prijswijzigingen moeten op meerdere plekken worden doorgevoerd.",
      "Er wordt uit voorzichtigheid een marge bovenop een marge gelegd.",
    ],
    base: [
      "Rekenmodel met staffels, toeslagen en marges.",
      "Beheerscherm waarin prijzen op één plek worden bijgewerkt.",
      "Indicatie- versus definitieve prijs, duidelijk gescheiden.",
    ],
    custom: [
      "Jullie prijsstructuur, staffels en kortingsafspraken.",
      "Uitzonderingen die alleen in jullie werk voorkomen.",
      "Wie wat mag zien: klant, verkoop of calculatie.",
    ],
    image: "/__l5e/assets-v1/cd74ebc9-688e-49f0-b9e0-986e7d6c2792/opl-3.jpg",
    imageAlt: "Rekenmachine op een vel met handgeschreven berekeningen",
  },
  {
    slug: "gegevens-automatisch-verwerken",
    n: "04",
    title: "Gegevens automatisch verwerken",
    short:
      "Voorkomen dat dezelfde informatie steeds opnieuw wordt ingevoerd in mail, Excel, CRM of andere systemen.",
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
    image: "/__l5e/assets-v1/06304c01-21ee-4b99-b878-71fe23b78fdc/opl-4.jpg",
    imageAlt: "Tablet met grafieken naast papieren rapportages",
  },
  {
    slug: "opvolging-automatiseren",
    n: "05",
    title: "Opvolging automatiseren",
    short: "Taken, reminders en vervolgstappen logisch laten aansluiten op wat er gebeurt.",
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
    image: "/__l5e/assets-v1/47c06f93-e8cf-4723-bd8f-30cc1f551ad8/opl-5.png",
    imageAlt: "Ondernemer aan de telefoon die aantekeningen maakt achter zijn laptop",
  },
  {
    slug: "ander-terugkerend-werk",
    n: "06",
    title: "Ander terugkerend werk",
    short: "Voor processen die we herkennen maar niet onder een vaste oplossing vallen.",
    intro:
      "Niet alles past in een hokje. Als er werk is dat elke week terugkomt en telkens hetzelfde patroon volgt, is er meestal wel iets aan te doen.",
    signals: [
      "Werk dat iedere week terugkomt en telkens dezelfde stappen kent.",
      "Handelingen die alleen bestaan omdat twee systemen niet met elkaar praten.",
      "Rapportages die met de hand worden samengesteld.",
    ],
    base: [
      "Bouwstenen uit eerdere trajecten: formulieren, verwerking, dashboards.",
      "Inzet van AI waar dat aantoonbaar tijd scheelt, met een mens die controleert.",
    ],
    custom: [
      "De analyse van jullie proces: waar zit de tijd echt?",
      "Een eerlijk antwoord als automatiseren de moeite niet waard is.",
    ],
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
    image: "/__l5e/assets-v1/dc327e92-719e-4781-8022-db0710361100/sector-bouw.jpg",
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
    solutions: ["aanvragen-compleet-binnenkrijgen", "calculaties-en-prijsindicaties", "opvolging-automatiseren"],
    custom:
      "Jullie werksoorten, materiaalprijzen en de manier waarop een opname bij jullie verloopt.",
  },
  {
    slug: "maakindustrie-en-machinebouw",
    title: "Maakindustrie & machinebouw",
    short: "Technische aanvragen, opties, uitvoeringen, calculaties en overdracht naar andere systemen.",
    flowLabel: "configureren zonder engineering",
    image: "/__l5e/assets-v1/ef85d15a-b9a4-4176-aa2f-6f708552594a/sector-machinebouw.jpg",
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
    solutions: ["slimme-offerteflow", "calculaties-en-prijsindicaties", "gegevens-automatisch-verwerken"],
    custom: "Jullie opties, uitvoeringen en de regels die bepalen wat wel en niet samen kan.",
  },
  {
    slug: "handel-en-groothandel",
    title: "Handel & groothandel",
    short: "Productvragen, prijzen, voorwaarden, orders en gegevens die tussen systemen worden overgenomen.",
    flowLabel: "prijs en voorwaarden helder",
    image: "/__l5e/assets-v1/4134bf38-95f7-44cd-bb60-19d54c44ab1e/sector-handel.jpg",
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
    solutions: ["calculaties-en-prijsindicaties", "gegevens-automatisch-verwerken", "aanvragen-compleet-binnenkrijgen"],
    custom: "Jullie klantafspraken, staffels en de systemen waar de order uiteindelijk in moet landen.",
  },
  {
    slug: "mobiliteit-en-transport",
    title: "Mobiliteit & transport",
    short: "Configuraties, specificaties, aanvragen, offertes en administratieve opvolging.",
    flowLabel: "opties helder uitgeschreven",
    image: "/__l5e/assets-v1/181b0c5c-509d-4f99-af57-cb0859f5348e/sector-transport.jpg",
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
    solutions: ["slimme-offerteflow", "opvolging-automatiseren", "gegevens-automatisch-verwerken"],
    custom: "Jullie uitvoeringen, toeslagen en de doorlooptijd die je richting klant wilt communiceren.",
  },
];

export function solutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export function sectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
