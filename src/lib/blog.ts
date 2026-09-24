/**
 * Blogartikelen. Getypte data in plaats van markdown, zodat er geen extra dependency nodig is
 * en teksten net als in content.ts direct te bewerken zijn.
 *
 * Schrijfregels (zie Tone of Voice): eerst het herkenbare probleem, dan wat er nu gebeurt,
 * dan wat er verandert, pas daarna de techniek. AI altijd concreet: wat AI doet en wat de mens doet.
 * Geen percentages of resultaten zonder bewijs.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  /** Twee kolommen: wat AI of het systeem doet, en wat de mens doet. */
  | { type: "split"; title: string; machine: string[]; mens: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO-datum, bv. 2026-09-24 */
  date: string;
  author: string;
  readingMinutes: number;
  tags: string[];
  image?: string;
  imageAlt?: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "de-aanvraag-is-binnen-waarom-begint-het-werk-dan-pas",
    title: "De aanvraag is binnen. Waarom begint het werk dan pas?",
    excerpt:
      "Iedere aanvraag is anders. Het werk erna is opvallend vaak hetzelfde: uitvragen, overtypen, uitzoeken. Zo herken je waar de tijd blijft hangen.",
    date: "2026-09-24",
    author: "Team LoopWerk",
    readingMinutes: 4,
    tags: ["Aanvragen", "Proces"],
    image: "/oplossingen/opl-2.jpg",
    imageAlt: "Aanvragen die binnenkomen op een werkplek",
    body: [
      {
        type: "p",
        text: "Een klant vult een formulier in, stuurt een mail of belt. De aanvraag is binnen, en voor veel bedrijven voelt dat als het begin. Maar kijk wat er daarna gebeurt, en je ziet vaak een hele reeks stappen voordat iemand echt kan adviseren of een offerte kan maken.",
      },
      { type: "h2", text: "Wat er na een aanvraag meestal gebeurt" },
      {
        type: "list",
        items: [
          "Iemand leest de aanvraag en ziet dat er informatie ontbreekt: maten, aantallen, een adres, een deadline.",
          "Er gaat een mail terug met vragen. Het wachten begint.",
          "Het antwoord komt binnen, maar niet op alle vragen. Nog een mail, of een telefoontje.",
          "De gegevens worden overgetypt in Excel, het CRM of het offertepakket.",
          "Pas dan kan iemand rekenen, adviseren of een offerte opstellen.",
        ],
      },
      {
        type: "p",
        text: "Geen van die stappen is moeilijk. Maar ze kosten bij elke aanvraag weer tijd, en ze zitten precies tussen de klantvraag en het moment waarop je iets kunt verkopen.",
      },
      { type: "h2", text: "Het werk zit niet in de aanvraag, maar in het voorwerk" },
      {
        type: "p",
        text: "De meeste bedrijven die wij spreken klagen niet over te weinig aanvragen. Ze klagen over wat er daarna gebeurt: informatie die ontbreekt, dezelfde vragen die steeds terugkomen, en gegevens die op drie plekken moeten worden ingevoerd.",
      },
      {
        type: "quote",
        text: "Iedere aanvraag is anders. Het werk erna opvallend vaak hetzelfde.",
      },
      { type: "h2", text: "Wat je kunt doen" },
      {
        type: "p",
        text: "Laat klanten eerder vertellen en kiezen. Een slimme aanvraagflow vraagt meteen wat je nodig hebt, afhankelijk van wat de klant eerder koos. Laat systemen het voorwerk doen: gegevens komen direct op de juiste plek terecht. En laat je mensen doen waar ze goed in zijn: adviseren en verkopen.",
      },
      {
        type: "split",
        title: "Zo verdeel je het werk",
        machine: [
          "Vraagt door op wat ontbreekt, zodat de aanvraag compleet binnenkomt.",
          "Zet de gegevens direct in het CRM of het offertepakket.",
          "Laat zien welke aanvragen klaar zijn om op te pakken.",
        ],
        mens: [
          "Beoordeelt de aanvraag en geeft advies.",
          "Maakt de keuzes die ervaring vragen.",
          "Voert het gesprek met de klant.",
        ],
      },
      { type: "h2", text: "Begin met kijken, niet met bouwen" },
      {
        type: "p",
        text: "Voordat je iets automatiseert: loop één week lang bij tien aanvragen na wat er gebeurt tussen binnenkomst en offerte. Hoe vaak ontbreekt er informatie? Hoe vaak wordt er iets overgetypt? Dat is je nulmeting. Dan weet je waar de tijd zit, en kun je na een verbetering ook echt zien wat het heeft opgeleverd.",
      },
    ],
  },
  {
    slug: "wat-ai-wel-en-niet-doet-in-je-offerteproces",
    title: "Wat AI wél en niet doet in je offerteproces",
    excerpt:
      "AI kan veel voorwerk overnemen: ontbrekende informatie herkennen, mails omzetten naar gegevens, een conceptmail schrijven. Maar voor prijzen en rekenregels is het juist de verkeerde keuze.",
    date: "2026-09-24",
    author: "Team LoopWerk",
    readingMinutes: 5,
    tags: ["AI", "Offertes"],
    image: "/oplossingen/opl-3.jpg",
    imageAlt: "Offerte die wordt voorbereid",
    body: [
      {
        type: "p",
        text: "Bijna elk bedrijf krijgt de vraag: doen jullie al iets met AI? Het eerlijke antwoord is dat AI in een offerteproces op een paar plekken veel werk scheelt, en op andere plekken meer problemen maakt dan het oplost. Het verschil zit in het soort werk.",
      },
      { type: "h2", text: "Waar AI goed in is: rommelige informatie begrijpen" },
      {
        type: "p",
        text: "Klanten schrijven zoals ze praten. Een mail met een vraag, een foto, een half adres en een deadline ergens in de derde alinea. Een mens leest daar moeiteloos doorheen, maar het kost tijd. Dat is precies het werk waar een taalmodel goed in is.",
      },
      {
        type: "split",
        title: "Voorbeeld: een aanvraag per mail",
        machine: [
          "Haalt naam, adres, aantallen en gewenste datum uit de mail.",
          "Ziet dat de afmetingen ontbreken en stelt een gerichte vervolgvraag op.",
          "Zet de gegevens klaar in het CRM.",
        ],
        mens: [
          "Kijkt of de samenvatting klopt.",
          "Beslist of de aanvraag past en welke vervolgstap nodig is.",
          "Neemt contact op als het complex wordt.",
        ],
      },
      { type: "h2", text: "Waar AI niet goed in is: rekenen met jouw regels" },
      {
        type: "p",
        text: "Prijzen, staffels, toeslagen en productregels moeten elke keer hetzelfde uitkomen. Een taalmodel rekent niet, het voorspelt tekst. Daarom zetten we voor prijzen en configuraties juist geen AI in, maar vaste rekenregels. Die zijn sneller, goedkoper en altijd voorspelbaar. Een klant die twee keer dezelfde keuzes maakt, krijgt twee keer dezelfde prijs.",
      },
      { type: "h2", text: "Een mens blijft meekijken" },
      {
        type: "p",
        text: "AI maakt fouten, zeker bij onduidelijke input. Daarom bouwen we het zo dat er een mens meekijkt op de plekken waar het ertoe doet. Een conceptmail wordt pas verstuurd na een klik. Een samenvatting van een aanvraag is een voorstel, geen besluit.",
      },
      {
        type: "list",
        items: [
          "Wel AI: aanvragen lezen en samenvatten, ontbrekende informatie herkennen, gegevens uit mail of PDF halen, een eerste versie van een mail opstellen.",
          "Geen AI: prijzen berekenen, productregels toepassen, beslissingen die je moet kunnen uitleggen aan een klant.",
        ],
      },
      { type: "h2", text: "De vraag is niet óf je AI gebruikt, maar waar" },
      {
        type: "p",
        text: "Begin bij het werk dat nu tijd kost, niet bij de techniek. Waar zit het terugkerende voorwerk? Is dat werk dat begrip van taal vraagt, dan kan AI helpen. Is het werk dat altijd hetzelfde moet uitkomen, dan werkt gewone automatisering beter.",
      },
      { type: "quote", text: "AI waar het helpt. Gewone automatisering waar dat beter werkt." },
    ],
  },
  {
    slug: "van-losse-mail-naar-nette-crm-gegevens",
    title: "Van losse mail naar nette CRM-gegevens: zo werkt dat",
    excerpt:
      "Aanvragen komen binnen per mail, als PDF of via een formulier. Iemand typt ze over in het CRM. Zo haal je dat overtypen eruit, stap voor stap, met een mens die meekijkt.",
    date: "2026-09-24",
    author: "Team LoopWerk",
    readingMinutes: 5,
    tags: ["AI", "Koppelingen", "CRM"],
    image: "/oplossingen/opl-4.jpg",
    imageAlt: "Gegevens die in een CRM terechtkomen",
    body: [
      {
        type: "p",
        text: "In veel bedrijven ziet de dag van een binnendienstmedewerker er zo uit: mail openen, gegevens kopiëren, CRM openen, plakken, controleren, volgende mail. Het is geen moeilijk werk, maar het houdt nooit op. En elke keer dat iemand iets overtypt, kan er een fout in sluipen.",
      },
      { type: "h2", text: "Waarom een standaardkoppeling vaak niet genoeg is" },
      {
        type: "p",
        text: "Een formulier op je website koppelen aan je CRM is eenvoudig. Maar de meeste aanvragen komen niet via een net formulier binnen. Ze komen per mail, als bijlage, of via een doorgestuurd bericht van een collega. Die informatie heeft geen vaste vorm, en daar loopt een gewone koppeling vast.",
      },
      { type: "h2", text: "Hoe het werkt, stap voor stap" },
      {
        type: "list",
        items: [
          "Een aanvraag komt binnen op een vast mailadres of via een formulier.",
          "Het systeem leest de mail of de bijlage en haalt de belangrijke gegevens eruit: wie, wat, hoeveel, wanneer, waar.",
          "Ontbreekt er iets, dan staat dat er duidelijk bij, met een voorstel voor de vervolgvraag.",
          "De gegevens staan klaar als conceptrecord in het CRM.",
          "Een medewerker kijkt het na en keurt het goed met één klik, of past iets aan.",
        ],
      },
      {
        type: "split",
        title: "Wie doet wat",
        machine: [
          "Leest mail en bijlagen.",
          "Zet ongestructureerde tekst om in vaste velden.",
          "Signaleert wat ontbreekt.",
        ],
        mens: [
          "Controleert en keurt goed.",
          "Vult aan waar context nodig is.",
          "Pakt de aanvraag inhoudelijk op.",
        ],
      },
      { type: "h2", text: "Waarom die laatste controle belangrijk is" },
      {
        type: "p",
        text: "Het systeem doet het zware werk, maar het neemt geen beslissingen. Door een mens te laten meekijken, blijven de gegevens in je CRM betrouwbaar. En na een tijdje zie je vanzelf welke soort aanvragen altijd goed gaan en welke vaker aandacht nodig hebben.",
      },
      { type: "h2", text: "Wat je nodig hebt om te beginnen" },
      {
        type: "list",
        items: [
          "Een CRM of systeem waar de gegevens naartoe moeten, met een koppelmogelijkheid.",
          "Tien tot twintig echte voorbeelden van aanvragen zoals ze nu binnenkomen.",
          "Een lijstje met de velden die je per aanvraag nodig hebt.",
        ],
      },
      {
        type: "p",
        text: "Met die voorbeelden kun je al snel zien hoe goed het werkt, voordat je iets in je dagelijkse proces verandert.",
      },
    ],
  },
  {
    slug: "hoe-sun-sauna-poolworld-het-prijsgesprek-naar-voren-haalde",
    title: "Hoe Sun Sauna & Poolworld het prijsgesprek naar voren haalde",
    excerpt:
      "Veel aanvragen, veel gesprekken, en pas aan het eind de prijs. Een configurator liet bezoekers zelf maat, uitvoering en prijsrichting kiezen. Zo werd elk gesprek beter voorbereid.",
    date: "2026-09-24",
    author: "Team LoopWerk",
    readingMinutes: 4,
    tags: ["Case", "Configurator"],
    image: "/cases/sspw-belfeld.jpg",
    imageAlt: "Bouwkundig zwembad, project van Sun Sauna & Poolworld te Belfeld",
    body: [
      {
        type: "p",
        text: "Sun Sauna & Poolworld bouwt zwembaden. Aanvragen kwamen genoeg binnen, maar de meeste begonnen met dezelfde vraag: wat kost een zwembad ongeveer? Daar is geen goed antwoord op zonder maat, uitvoering en opties. Dus volgde er een afspraak in de showroom.",
      },
      { type: "h2", text: "Het probleem: de prijs kwam pas aan het eind" },
      {
        type: "p",
        text: "Filtering, waterbehandeling, verwarming en afdekking bepalen een groot deel van de prijs. Die onderwerpen kwamen pas laat in het gesprek ter sprake. Van ongeveer twintig aanvragen per maand leidden er tien tot een gesprek. Zeven daarvan haakten af op de prijs. Drie werden klant.",
      },
      {
        type: "quote",
        text: "Het gesprek liep vol met uitvragen, en het echte antwoord kwam pas aan het eind.",
      },
      { type: "h2", text: "De oplossing: laat de klant eerst zelf kiezen" },
      {
        type: "p",
        text: "We bouwden een configurator op de website. Bezoekers kiezen in drie stappen hun formaat, hun uitvoering en zien meteen een realistische prijsindicatie, inclusief wat er standaard bij zit. De aanvraag komt daarna compleet binnen: keuzes, afmetingen en contactgegevens.",
      },
      {
        type: "split",
        title: "Wie doet wat",
        machine: [
          "Leidt de bezoeker door maat, uitvoering en opties.",
          "Rekent de prijsindicatie uit met vaste rekenregels, zonder AI.",
          "Zet de complete aanvraag klaar, zonder overtypen.",
        ],
        mens: [
          "Begint het gesprek bij uitvoering en wensen, niet bij de basis.",
          "Adviseert op wat de klant echt wil.",
          "Volgt op, omdat elke aanvraag terug te vinden is.",
        ],
      },
      { type: "h2", text: "Wat er veranderde" },
      {
        type: "list",
        items: [
          "Mensen komen binnen met een realistisch beeld van maat, uitvoering en prijsrichting.",
          "De aanvraag staat compleet in het systeem, zonder overtypen.",
          "Het gesprek gaat over uitvoering, niet over de basisvragen.",
          "Opvolging hangt niet meer af van wie er die dag in de zaak stond.",
        ],
      },
      { type: "h2", text: "Waarom hier bewust geen AI in zit" },
      {
        type: "p",
        text: "Een prijsindicatie moet kloppen en elke keer hetzelfde uitkomen. Daarom werkt de configurator met vaste rekenregels, niet met AI. Dat maakt hem snel, voorspelbaar en eenvoudig aan te passen als prijzen veranderen.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function relatedPosts(post: BlogPost, count = 2): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ p }) => p);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
