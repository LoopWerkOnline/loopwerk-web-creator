/**
 * Blogartikelen. Getypte data in plaats van markdown, zodat er geen extra dependency nodig is
 * en teksten net als in content.ts direct te bewerken zijn.
 *
 * Schrijfregels: persoonlijk, nuchter Nederlands, niet fancy. Het gaat over de markt en de lezer,
 * niet over ons; LoopWerk hooguit subtiel in de afsluiter. Begin bij een herkenbare situatie,
 * sluit af met iets bruikbaars. AI altijd concreet: wat AI doet en wat de mens doet.
 * Geen cijfers zonder bron.
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
    slug: "de-telefoon-gaat-de-klant-wil-een-prijs",
    title: "De telefoon gaat. De klant wil een prijs. Wat nu?",
    excerpt:
      "Iedereen kent het moment. Waarom klanten altijd eerst naar de prijs vragen, wat je nu waarschijnlijk doet en hoe het slimmer kan.",
    date: "2026-09-24",
    author: "Team LoopWerk",
    readingMinutes: 5,
    tags: ["Achter de aanvraag"],
    image: "/oplossingen/opl-2.jpg",
    imageAlt: "Aanvragen die binnenkomen op een werkplek",
    body: [
      {
        type: "p",
        text: "Dinsdagochtend, kwart over tien. Je staat met je handen in een klus, of je zit net achter je laptop met je eerste koffie. De telefoon gaat.",
      },
      {
        type: "p",
        text: "\u201cGoedemorgen, ik wil graag weten wat een \u2026 ongeveer kost.\u201d",
      },
      {
        type: "p",
        text: "Je weet het antwoord al. Het is: dat hangt ervan af. En je weet ook dat de klant precies dat antwoord niet wil horen.",
      },
      { type: "h2", text: "Waarom klanten altijd eerst naar de prijs vragen" },
      {
        type: "p",
        text: "Eerlijk is eerlijk: het is een logische vraag. De klant wil niet weten wat het tot op de euro kost. Hij wil weten of het in de buurt komt van wat hij in zijn hoofd heeft. Of het zin heeft om verder te praten.",
      },
      {
        type: "p",
        text: "Je doet het zelf ook. Nieuwe keuken, nieuwe auto, een verbouwing: je kijkt eerst of het ongeveer binnen je budget valt. Pas daarna ga je praten over kleuren, opties en levertijden.",
      },
      {
        type: "p",
        text: "Het probleem zit aan jouw kant. Voor jou hangt de prijs af van tien dingen die de klant nog niet weet, niet heeft verteld, of waarvan hij niet eens wist dat ze ertoe doen.",
      },
      { type: "h2", text: "Drie dingen die je nu waarschijnlijk doet" },
      {
        type: "list",
        items: [
          "Je noemt een bedrag uit je hoofd. Lekker snel. Maar noem je een te laag bedrag, dan moet je later een verwachting bijstellen. Dat is nooit een fijn gesprek. Noem je een te hoog bedrag, dan is de klant weg voordat je kon uitleggen waarom.",
          "Je zegt \u2018dat hangt ervan af\u2019 en plant een afspraak. Eerlijk en grondig. Maar het kost jou een uur en de klant een beetje geduld. En een deel van die afspraken eindigt alsnog bij dezelfde vraag: wat kost het nou?",
          "Je stuurt een lijst met vragen per mail. Netjes. Tot het pingpongen begint. De helft komt terug, jij vraagt de rest, er zit een weekend tussen, en ondertussen heeft de klant ook iemand anders gebeld.",
        ],
      },
      {
        type: "p",
        text: "Geen van die drie is fout. Ze zijn allemaal redelijk. Alleen doe je het elke keer weer, bij elke aanvraag, en dat tikt aan.",
      },
      { type: "h2", text: "Wat de klant eigenlijk wil" },
      {
        type: "p",
        text: "Meestal geen exacte prijs, maar een richting. \u201cDe meeste projecten zoals het jouwe vallen tussen dit en dat, afhankelijk van een paar keuzes.\u201d Daar kan iemand mee verder.",
      },
      {
        type: "p",
        text: "En mensen vinden het vaak helemaal niet erg om zelf een paar dingen te kiezen, als je ze de juiste vragen stelt in de juiste volgorde. Kijk maar hoe mensen online een fiets of een auto samenstellen. Dat doen ze voor hun plezier.",
      },
      {
        type: "quote",
        text: "De klant wil geen offerte aan de telefoon. Hij wil weten of het de moeite waard is om verder te praten.",
      },
      { type: "h2", text: "Vier manieren om het slimmer te doen" },
      {
        type: "list",
        items: [
          "Durf een richting te noemen. Zet op je site of in je mail een bandbreedte: de meeste projecten vallen tussen X en Y. Klinkt eng, maar het werkt als filter. Wie schrikt, had toch niet gekocht. Wie blijft, weet waar hij aan toe is.",
          "Vaste vragen, vaste volgorde. Schrijf de vijf vragen op die je eigenlijk altijd stelt. Zet ze in je formulier, naast de telefoon en in je standaardmail. Dan hoef je ze niet elke keer opnieuw te bedenken.",
          "Laat de klant zelf kiezen. Een simpele keuzehulp op je site: formaat, uitvoering, extra\u2019s, en meteen een indicatie. Dat hoeft geen groot project te zijn, en je gesprekken beginnen ineens een stuk verder.",
          "Maak het verschil tussen indicatie en offerte duidelijk. \u201cDit is een richting, de echte offerte volgt als we \u2026\u201d Zo voorkom je dat iemand later met een screenshot van je \u2018prijs\u2019 aan tafel zit.",
        ],
      },
      { type: "h2", text: "En AI dan?" },
      {
        type: "split",
        title: "Wie doet wat",
        machine: [
          "Leest de mail van de klant en ziet dat bijvoorbeeld de afmetingen ontbreken.",
          "Zet die vervolgvraag alvast voor je klaar.",
        ],
        mens: [
          "Checkt de vraag en drukt op verzenden.",
          "Bepaalt de prijs, met vaste rekenregels in plaats van AI.",
        ],
      },
      {
        type: "p",
        text: "Handig voor het voorwerk dus. Minder handig voor de prijs zelf. Een taalmodel rekent niet echt, het voorspelt hoe een antwoord eruit hoort te zien. Voor prijzen wil je regels die elke keer hetzelfde uitkomen. Twee dezelfde vragen, twee dezelfde prijzen.",
      },
      { type: "h2", text: "Een vraag om jezelf te stellen" },
      {
        type: "p",
        text: "Pak de laatste tien keer dat iemand je om een prijs vroeg. Bij hoeveel daarvan had je met drie antwoorden van de klant al een goede richting kunnen geven?",
      },
      {
        type: "p",
        text: "Is het antwoord \u201ceigenlijk bij de meeste\u201d, dan ligt daar tijd voor het oprapen. Voor jou, en voor je klant.",
      },
      {
        type: "p",
        text: "Tot slot: we bouwden zoiets voor een zwembadbouwer die precies dit probleem had. Benieuwd hoe dat eruitziet? Je vindt het bij onze cases.",
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
