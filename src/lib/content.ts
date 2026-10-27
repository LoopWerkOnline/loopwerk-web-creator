/**
 * Inhoudelijke bron voor oplossingen en sectoren.
 * Eén bestand, zodat overzichten, detailpagina's en homepageblokken niet uit elkaar lopen.
 */

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
  /** Eerlijk en concreet: waar AI wel of juist niet in deze oplossing zit. Geen AI-hype, wel specifiek. */
  aiNote?: string;
  /** Concrete, bescheiden scope-belofte voor de eerste maand. Geen resultaatclaim. */
  firstMonth?: string;
  /** Voor niet-featured oplossingen: eerlijke brug naar bewezen werk elders i.p.v. een stilzwijgend ontbrekende case. */
  proofNote?: string;
  /** Volgorde binnen de "Van aanvraag tot offerte"-flow op het overzicht. Ontbreekt = losse capability. */
  journeyStep?: number;
  featured?: boolean;
  /** Drie vragen die bij deze oplossing horen; getoond op de pagina en als FAQPage-schema. */
  faq?: FaqItem[];
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
    aiNote:
      "Hier zit bewust geen AI in: vaste rekenregels voor prijzen en opties werken sneller en voorspelbaarder dan een taalmodel dat ernaar moet raden.",
    journeyStep: 2,
    featured: true,
    faq: [
      {
        q: "Kan ik de prijzen daarna zelf aanpassen?",
        a: "Ja. Prijzen, staffels en toeslagen staan op één plek. Pas je daar iets aan, dan rekenen de configurator en de conceptofferte meteen met de nieuwe prijs. Geen Excel meer die je op drie plekken moet bijwerken.",
      },
      {
        q: "Schrikt een prijs op de website klanten niet af?",
        a: "Het is een prijsindicatie, geen definitieve offerte. Bij Sun Sauna & Poolworld komen mensen daardoor binnen met een realistisch beeld van maat, uitvoering en prijsrichting, en gaat het gesprek over de uitvoering in plaats van over de basisvragen.",
        link: { label: "Bekijk de case van SSPW", path: "/cases/sspw-zwembadconfigurator" },
      },
      {
        q: "Werkt het ook als bijna elke klus anders is?",
        a: "Als er vaste regels in je prijs zitten, zoals maten, materialen en opties, dan wel. Wordt een aanvraag echt maatwerk, dan zegt de configurator dat eerlijk en stuurt hij de aanvraag door voor een persoonlijk voorstel. Je hebt dan nog steeds alle gegevens in één keer binnen.",
        link: { label: "Bespreek je proces", path: "/contact" },
      },
    ],
    image: "/oplossingen/opl-1.jpg",
    imageAlt: "Laptop met een dashboard vol cijfers op een werktafel",
  },
  {
    slug: "complete-aanvragen",
    title: "Complete aanvragen",
    short: "Nooit meer drie keer mailen voor dezelfde informatie — vraag het in één keer, vooraf.",
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
    aiNote:
      "Waar AI hier wel inzit: een binnenkomende aanvraag wordt gecheckt op ontbrekende informatie, en het systeem stelt zelf de gerichte vervolgvraag — een medewerker hoeft niet eerst te lezen wat er mist.",
    journeyStep: 1,
    faq: [
      {
        q: "Haakt een klant niet af als het formulier langer wordt?",
        a: "Het formulier vraagt alleen wat bij die aanvraag nodig is. De antwoorden bepalen de volgende vraag, dus niemand krijgt een lange lijst velden voor zijn neus. Een paar vragen vooraf scheelt jou drie mails achteraf.",
      },
      {
        q: "Kunnen klanten foto's en tekeningen meesturen?",
        a: "Ja. Bestanden worden meteen met een nette naam aan de juiste aanvraag gekoppeld, in plaats van dat ze los in een mailbox belanden en je ze later moet zoeken.",
      },
      {
        q: "Kan dit ook op het formulier dat ik al heb?",
        a: "Vaak wel. We kijken eerst wat je huidige formulier doet en waar de aanvragen nu terechtkomen. Soms is uitbreiden genoeg, soms is een nieuw formulier sneller. De scan laat zien waar bij jou het meeste te halen valt.",
        link: { label: "Doe de scan", path: "/scan" },
      },
    ],
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
    aiNote:
      "Waar AI hier wel inzit: een ongestructureerde aanvraag (mail, PDF) wordt omgezet in nette velden voor het CRM, in plaats van dat iemand het overtypt.",
    firstMonth:
      "Een werkende koppeling tussen twee van jullie systemen — bijvoorbeeld de mailbox waar aanvragen binnenkomen en het CRM — getest op aanvragen die er al lagen. Geen demo met nepdata: gewoon jullie eigen gegevens, één keer goed verwerkt.",
    proofNote:
      "Mail, spreadsheet en CRM aan elkaar knopen is precies wat we bouwden binnen de zwembadconfigurator voor Sun Sauna & Poolworld — daar liep de koppeling van configurator naar CRM. Geen losse case voor dit exacte scenario, wel dezelfde bouwstenen en dezelfde manier van werken.",
    faq: [
      {
        q: "Welke systemen kunnen jullie koppelen?",
        a: "Bijna alles wat een koppeling, een export of een mailbox heeft: je CRM, je boekhoudpakket, Excel of SharePoint en je mail. Ons eigen websiteformulier gaat bijvoorbeeld rechtstreeks naar HubSpot. We kijken eerst wat jouw systemen toelaten, voordat we iets beloven.",
      },
      {
        q: "Wat als twee systemen elkaar tegenspreken?",
        a: "Dat leggen we vooraf vast: per soort gegeven welk systeem leidend is. Klantgegevens komen bijvoorbeeld uit het CRM en prijzen uit de calculatie. Dan weet iedereen welke versie klopt.",
      },
      {
        q: "Kan ik terugzien wat er automatisch is doorgezet?",
        a: "Ja. Elke stap wordt bijgehouden, dus je ziet wat er wanneer is verwerkt en waar iets is blijven hangen. Lukt een stap niet, dan krijg je een melding en kun je hem met de hand afmaken.",
      },
    ],
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
    aiNote:
      "Waar AI hier wel inzit: een concept-vervolgmail die past bij de situatie wordt automatisch opgesteld; een mens keurt 'm goed voor verzending.",
    journeyStep: 3,
    faq: [
      {
        q: "Gaan er dan mails uit zonder dat ik het weet?",
        a: "Alleen als je dat wilt. Standaard staat er een concept-vervolgmail klaar die iemand nog naleest en verstuurt. Pas als je er vertrouwen in hebt, kun je bepaalde berichten vanzelf laten gaan.",
      },
      {
        q: "Werkt dit met het systeem dat we al gebruiken?",
        a: "Meestal wel. Herinneringen en statussen kunnen in je bestaande CRM of in je mail komen. Je hoeft er geen nieuw pakket voor te leren.",
        link: { label: "Bekijk systeemkoppelingen", path: "/oplossingen/systeemkoppelingen" },
      },
      {
        q: "Wat als de klant intussen al gebeld heeft?",
        a: "Dan zet je de status van de offerte op bijgewerkt en stoppen de herinneringen. De opvolging volgt wat er echt gebeurt, niet een vast schema dat doorloopt.",
      },
    ],
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
    short:
      "Aanvragen, opnames, materiaalkeuzes, calculaties, planning en terugkerende administratie.",
    flowLabel: "van opname naar offerte",
    image: "/sectoren/sector-bouw.jpg",
    imageAlt: "Vakman metselt een wand op een bouwplaats",
    intro:
      "Werk komt binnen via mail, telefoon en via-via. Voordat er een prijs op tafel ligt, is er al een opname geweest, een leverancier gebeld en een calculatie gemaakt.",
    seen: [
      "Veel tijd verdwijnt niet op de bouwplaats, maar ervoor en erna. Denk aan opnames verwerken, materiaal berekenen, werkbonnen bijhouden en administratie achteraf. Juist daar liggen vaak simpele kansen om werk te automatiseren.",
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
    short:
      "Technische aanvragen, opties, uitvoeringen, calculaties en overdracht naar andere systemen.",
    flowLabel: "configureren zonder engineering",
    image: "/sectoren/sector-machinebouw.jpg",
    imageAlt: "Rupsvoertuig met bak op een terrein in de mist",
    intro:
      "Een aanvraag is pas te beoordelen als de technische uitgangspunten kloppen. Dat uitvragen kost engineeringtijd die je liever aan het werk zelf besteedt.",
    seen: [
      "Hoe meer varianten en uitzonderingen, hoe meer kennis in hoofden en spreadsheets terechtkomt. Configuraties controleren, specificaties verwerken en informatie overzetten kost daardoor onnodig veel technische capaciteit.",
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
    short:
      "Productvragen, prijzen, voorwaarden, orders en gegevens die tussen systemen worden overgenomen.",
    flowLabel: "prijs en voorwaarden helder",
    image: "/sectoren/sector-handel.jpg",
    imageAlt: "Afgewerkte badkamer met sanitair en tegelwerk",
    intro:
      "Veel vragen zijn variaties op dezelfde vraag: wat kost dit bij deze afname, onder welke voorwaarden en wanneer is het er?",
    seen: [
      "Bij veel orders worden dezelfde controles steeds opnieuw gedaan: prijs, voorraad, korting, levertijd en klantafspraken. Als die informatie al beschikbaar is, hoeft een medewerker die niet iedere keer handmatig bij elkaar te zoeken.",
      "Orders die vanuit mail worden overgetypt.",
      "Voorraad- en levertijdvragen die telkens terugkomen.",
    ],
    friction: [
      "Dezelfde vraag wordt door meerdere mensen apart beantwoord.",
      "Gegevens lopen tussen webshop, ERP en administratie uit de pas.",
      "Kortingsstaffels zijn niet eenduidig vastgelegd.",
    ],
    solutions: ["slimme-configurator", "systeemkoppelingen", "complete-aanvragen"],
    custom:
      "Jullie klantafspraken, staffels en de systemen waar de order uiteindelijk in moet landen.",
  },
  {
    slug: "transport-en-logistiek",
    title: "Transport & logistiek",
    short: "Transportaanvragen, tarieven, toeslagen, planning en administratieve opvolging.",
    flowLabel: "van ritvraag naar prijs",
    image: "/sectoren/sector-transport.jpg",
    imageAlt: "Vrachtwagen met oplegger op de snelweg bij zonsondergang",
    intro:
      "Een ritvraag lijkt simpel. Maar voordat er een prijs ligt, moeten lading, afstand, toeslagen en beschikbaarheid bekend zijn. Dat uitzoeken en doorrekenen gebeurt nog vaak met de hand.",
    seen: [
      "In transport verandert de planning voortdurend. Zodra informatie verspreid staat over mail, Excel en verschillende systemen, ontstaat veel handmatig afstemwerk. Juist daar kunnen koppelingen en automatisering rust brengen.",
      "Specificaties die per mail heen en weer gaan.",
      "Administratieve opvolging na de opdracht.",
    ],
    friction: [
      "Opties en toeslagen staan verspreid over documenten.",
      "Het duurt lang voordat een klant een indicatie heeft.",
      "Aanvragen worden niet centraal vastgelegd.",
    ],
    solutions: ["slimme-configurator", "automatische-opvolging", "systeemkoppelingen"],
    custom:
      "Jullie uitvoeringen, toeslagen en de doorlooptijd die je richting klant wilt communiceren.",
  },
];

export function solutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export function sectorBySlug(slug: string) {
  return sectors.find((s) => s.slug === slug);
}

/** Het traject van een klant, getoond in "Zo pakken we het aan" op elke oplossingspagina. */
export const trajectSteps: { n: string; t: string; b: string; jij: string }[] = [
  {
    n: "01",
    t: "Kennismaken",
    b: "Je vertelt waar het werk blijft hangen. Wij stellen vragen tot we snappen wat er na een aanvraag gebeurt. Vrijblijvend, en je praat meteen met de mensen die het bouwen.",
    jij: "Een uur tijd en een paar voorbeelden van echte aanvragen.",
  },
  {
    n: "02",
    t: "Proces doorlopen en meten",
    b: "We lopen het proces stap voor stap door en leggen vast hoe het nu gaat: hoe lang een aanvraag kost, hoe vaak er informatie ontbreekt, hoe lang het duurt tot er een offerte ligt. Dat is de nulmeting.",
    jij: "Toegang tot de mensen die het werk nu doen, en inzicht in de huidige formulieren, mails of Excel-bestanden.",
  },
  {
    n: "03",
    t: "Voorstel",
    b: "Je krijgt een voorstel met wat we bouwen, wat het oplevert en wat het kost. Levert het te weinig op, of past standaardsoftware beter, dan zeggen we dat hier. Voordat er iets gebouwd is.",
    jij: "Een besluit: door, aanpassen of niet.",
  },
  {
    n: "04",
    t: "Bouwen",
    b: "We starten vanuit een bestaande basis en maken op maat wat bij jullie werk hoort: jullie vragen, producten, prijzen en regels. Tussendoor zie je werkende versies, geen rapporten.",
    jij: "Korte feedback op tussenversies.",
  },
  {
    n: "05",
    t: "Live en bijstellen",
    b: "De tool gaat live op jullie site of in jullie systemen. De eerste echte aanvragen kijken we mee en stellen we bij waar nodig.",
    jij: "Laten weten wat in de praktijk anders loopt dan gedacht.",
  },
  {
    n: "06",
    t: "Nameten",
    b: "Na livegang meten we dezelfde punten als bij de nulmeting. Dan zie je zwart op wit wat er veranderd is, zonder mooie praatjes.",
    jij: "Niets extra. We gebruiken dezelfde meetpunten als aan het begin.",
  },
];

/** Vraag en antwoord, met een link naar de pagina waar het verder gaat. */
export type FaqItem = { q: string; a: string; link?: { label: string; path: string } };

/**
 * Veelgestelde vragen op /faq, ook als FAQPage-schema. Vragen zoals klanten ze stellen, met
 * een voorbeeld en een link per antwoord. Basis: LoopWerk_FAQ.docx (akkoord Levi).
 * Geen prijsindicatie zolang het prijsmodel niet vaststaat.
 */
export const faq: FaqItem[] = [
  {
    q: "Kan ik offertes automatisch laten maken?",
    a: "Grotendeels wel. De klant kiest zelf maten en opties in een configurator op je website, vaste rekenregels maken daar een prijs en een conceptofferte van, en jij kijkt hem na voordat hij de deur uit gaat. Bij Sun Sauna & Poolworld werkt het zo: bezoekers stellen op sspw.nl hun zwembad samen en SSPW krijgt een conceptofferte plus de complete aanvraag binnen. Voor de prijs gebruiken we bewust geen AI, want rekenregels zijn voorspelbaar en een taalmodel is dat niet.",
    link: { label: "Bekijk de slimme configurator", path: "/oplossingen/slimme-configurator" },
  },
  {
    q: "Kan mijn websiteformulier direct in mijn CRM?",
    a: "Ja, en dat is vaak de snelste winst. Het formulier stuurt de gegevens naar je CRM en tegelijk een melding naar je inbox, zodat niemand meer hoeft over te typen. Op onze eigen site gaat elke aanvraag zo naar HubSpot en naar onze mail. Valt een van de twee uit, dan komt de aanvraag via de andere toch binnen.",
    link: { label: "Bekijk systeemkoppelingen", path: "/oplossingen/systeemkoppelingen" },
  },
  {
    q: "Moet ik mijn huidige software vervangen?",
    a: "Nee. We bouwen om je bestaande systemen heen: je mailbox, Excel, je CRM of je boekhoudpakket blijven gewoon in gebruik. Wat we toevoegen haalt het overtypen en het heen-en-weer mailen tussen die systemen weg. Bij SSPW draait de configurator gewoon op hun eigen website.",
    link: { label: "Bekijk systeemkoppelingen", path: "/oplossingen/systeemkoppelingen" },
  },
  {
    q: "Hoe snel staat er iets dat werkt?",
    a: "Een eerste versie staat er meestal binnen 3 à 6 weken. We beginnen bij het grootste knelpunt en bouwen niet alles tegelijk. Een koppeling tussen twee systemen, bijvoorbeeld je mailbox en je CRM, werkt vaak al in de eerste maand, getest op aanvragen die je al had liggen. Vooraf spreken we af wat er in die eerste versie zit.",
    link: { label: "Zo pakken we het aan", path: "/oplossingen" },
  },
  {
    q: "Wat kost het?",
    a: "Dat hangt vooral af van hoeveel systemen erbij komen kijken en hoeveel regels en uitzonderingen je proces heeft. Een formulier dat naar je CRM gaat is iets anders dan een configurator met honderden productcombinaties. Het eerste gesprek is gratis. Daarna krijg je een voorstel waarin staat wat we bouwen en wat het kost, voordat er iets gebeurt. Wil je eerst zelf zien waar de winst zit, doe dan de scan.",
    link: { label: "Doe de scan", path: "/scan" },
  },
  {
    q: "Hoe zorg ik dat aanvragen compleet binnenkomen?",
    a: "Door vooraf te vragen wat je anders achteraf moet navragen. Een formulier dat meebeweegt met de antwoorden vraagt per soort aanvraag alleen wat nodig is: maten, foto's, adres of gewenste planning. Bij SSPW kwam vroeger vaak alleen “Wat kost een zwembad ongeveer?” binnen. Nu komen aanvragen binnen met maat, uitvoering en contactgegevens.",
    link: { label: "Bekijk complete aanvragen", path: "/oplossingen/complete-aanvragen" },
  },
  {
    q: "Hoe voorkom ik dat offertes blijven liggen?",
    a: "Door opvolgen niet van iemands geheugen te laten afhangen. Elke offerte krijgt een status en een termijn. Hoor je bijvoorbeeld na een week niets, dan staat er een concept-vervolgmail voor je klaar die je alleen nog hoeft na te lezen. In één overzicht zie je wat er openstaat en hoe lang al.",
    link: { label: "Bekijk automatische opvolging", path: "/oplossingen/automatische-opvolging" },
  },
  {
    q: "Wie beheert het als het eenmaal draait?",
    a: "Je kunt de dagelijkse dingen zelf aanpassen, zoals prijzen, opties en teksten, zonder ons te bellen. We bouwen het zo dat die op één plek staan. Na de livegang kijken we de eerste echte aanvragen met je mee en stellen we bij waar het in de praktijk anders loopt. Voor grotere aanpassingen of onderhoud later kun je bij ons terecht.",
    link: { label: "Zo pakken we het aan", path: "/oplossingen" },
  },
  {
    q: "Wat als een koppeling een keer niet werkt?",
    a: "Daar houden we vanaf het begin rekening mee. We zorgen dat een aanvraag niet verloren gaat: die komt dan via een tweede route binnen, bijvoorbeeld per mail, en je krijgt een melding. Systemen van anderen kunnen we niet aanpassen, maar we kunnen wel zorgen dat je merkt wanneer er iets hapert en dat je de stap dan met de hand kunt doen.",
    link: { label: "Bekijk systeemkoppelingen", path: "/oplossingen/systeemkoppelingen" },
  },
  {
    q: "Waar staan onze gegevens en van wie zijn ze?",
    a: "Ze blijven van jou. We slaan alleen op wat het proces echt nodig heeft, liefst in de systemen die je al gebruikt, zoals je eigen CRM. Waar een eigen database nodig is, krijgt elke klant een aparte omgeving. Persoonsgegevens verwerken we alleen als het moet, en beveiliging en toegang nemen we mee in het ontwerp. Generieke bouwstenen hergebruiken we wel, maar jouw gegevens nemen we nooit mee naar een ander project.",
    link: { label: "Stel je vraag", path: "/contact" },
  },
  {
    q: "Gebruiken jullie AI?",
    a: "Alleen waar het aantoonbaar werk scheelt. Bijvoorbeeld om in een binnenkomende aanvraag te zien welke informatie ontbreekt, om een mail of pdf om te zetten in nette velden voor je CRM, of om een vervolgmail voor te bereiden die een mens nog goedkeurt. Voor prijzen en rekenregels gebruiken we het niet. In onze blogs laten we zien wat AI wel en niet goed doet.",
    link: { label: "Lees de blogs", path: "/blog" },
  },
  {
    q: "Kunnen mijn medewerkers zelf nog ingrijpen?",
    a: "Ja. Jij bepaalt wat vanzelf mag gaan en wat iemand eerst moet nakijken. Een conceptofferte of een vervolgmail kan bijvoorbeeld klaarstaan zonder dat hij automatisch verstuurd wordt. De tool neemt het overtypen en uitzoeken over, niet de beslissing.",
    link: { label: "Bekijk automatische opvolging", path: "/oplossingen/automatische-opvolging" },
  },
  {
    q: "Is gewone standaardsoftware niet beter?",
    a: "Soms wel, en dan zeggen we dat ook. Als een bestaand pakket je probleem goed en betaalbaar oplost, heeft maatwerk geen zin. Maatwerk loont vooral als je proces niet in een standaardpakket past, of als het werk juist tussen je systemen blijft liggen: overtypen, navragen, opvolgen. De scan geeft je in een paar minuten een eerste beeld.",
    link: { label: "Doe de scan", path: "/scan" },
  },
];
