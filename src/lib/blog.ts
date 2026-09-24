/**
 * Blogartikelen. Getypte data in plaats van markdown, zodat er geen extra dependency nodig is
 * en teksten net als in content.ts direct te bewerken zijn.
 *
 * Schrijfregels: sectorgericht en functioneel, iets wat de lezer vandaag kan toepassen.
 * Persoonlijk, nuchter Nederlands, niet fancy. Lopende tekst, geen opsommingen.
 * Het gaat over de lezer, niet over ons; LoopWerk hooguit subtiel in de afsluiter.
 * AI altijd concreet: wat AI doet en wat de mens doet. Geen cijfers zonder bron.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  /** Een prompt die de lezer kan kopiëren. Tekst tussen [haken] vult de lezer zelf in. */
  | { type: "prompt"; text: string };

export type BlogAuthor = { name: string; initials: string; role: string; color: string };

/** Schrijvers; gelijk aan het team op /over-loopwerk. */
export const blogAuthors = {
  levi: { name: "Levi Kempen", initials: "LK", role: "Mede-oprichter", color: "var(--forest)" },
  gianni: {
    name: "Gianni Geurtjens",
    initials: "GG",
    role: "Mede-oprichter",
    color: "var(--home-accent)",
  },
  shaquil: {
    name: "Shaquil Reyes",
    initials: "SR",
    role: "Mede-oprichter",
    color: "var(--ink-hero)",
  },
} satisfies Record<string, BlogAuthor>;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO-datum, bv. 2026-09-24 */
  date: string;
  author: BlogAuthor;
  readingMinutes: number;
  /** Reeks of sector, getoond boven de titel. */
  label: string;
  image: string;
  imageAlt: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "5-chatgpt-prompts-om-sneller-nieuwe-klanten-te-vinden-installatiebedrijf",
    title: "5 ChatGPT-prompts om sneller nieuwe klanten te vinden als installatiebedrijf",
    excerpt:
      "Geen verhaal over de toekomst van AI, maar vijf prompts die je vandaag kunt kopiëren. Van je ideale klant bepalen tot een aanvraag nalopen.",
    date: "2026-09-24",
    author: blogAuthors.levi,
    readingMinutes: 6,
    label: "Bouw & installatie",
    image: "/sectoren/sector-bouw.jpg",
    imageAlt: "Vakman aan het werk op een bouwplaats",
    body: [
      {
        type: "p",
        text: "Je bent goed in je vak. Warmtepompen, zonnepanelen, een complete badkamer: je weet precies hoe het moet. Waar je minder zin in hebt, is het zoekwerk eromheen. Uitzoeken wie je volgende klant kan zijn, een mail schrijven die niet klinkt als reclame, en aanvragen nalopen die half binnenkomen.",
      },
      {
        type: "p",
        text: "Dat zoek- en schrijfwerk kan ChatGPT prima voor je voorbereiden. Beslissen doe je nog steeds zelf. Hieronder staan vijf prompts die je zo kunt kopiëren. Alles tussen [haken] vul je zelf in. Hoe concreter je dat doet, hoe beter het antwoord.",
      },
      { type: "h2", text: "Eerst even dit" },
      {
        type: "p",
        text: "Zoek je naar echte bedrijven in jouw regio, gebruik dan een versie van ChatGPT die op internet kan zoeken. Zonder zoekfunctie verzint hij soms namen die heel echt klinken. Controleer daarom altijd even de website of het KvK-nummer voordat je iemand benadert. En plak geen namen, adressen of telefoonnummers van klanten in ChatGPT. Die heeft hij voor deze vragen ook niet nodig.",
      },
      { type: "h2", text: "1. Bepaal wie je eigenlijk zoekt" },
      {
        type: "p",
        text: "De meeste installateurs zeggen dat ze voor iedereen werken. Dat klopt, maar zo vind je niemand. Begin daarom bij je beste klussen van het afgelopen jaar en laat ChatGPT het patroon zoeken.",
      },
      {
        type: "prompt",
        text: "Ik heb een installatiebedrijf in [regio] en doe vooral [soort werk, bijv. warmtepompen en ventilatie]. Mijn drie beste klussen van het afgelopen jaar waren: [klus 1], [klus 2] en [klus 3]. Beschrijf op basis daarvan drie typen klanten waar ik me op zou moeten richten. Geef per type in een paar zinnen aan waarom ze interessant zijn, waar ze online naar zoeken en welk moment ze over de streep trekt.",
      },
      {
        type: "p",
        text: "Vaak komt er iets uit wat je al wist, maar nooit had opgeschreven. Denk aan VvE-beheerders met oude cv-installaties, of aannemers zonder eigen installateur. Dat is je vertrekpunt voor de rest.",
      },
      { type: "h2", text: "2. Zoek bedrijven in je regio" },
      {
        type: "p",
        text: "Nu je weet wie je zoekt, laat je ChatGPT een eerste lijst maken. Vraag altijd om de bron, dan kun je snel checken of het klopt.",
      },
      {
        type: "prompt",
        text: "Zoek op internet naar [type bedrijf, bijv. VvE-beheerders of woningcorporaties] binnen 30 kilometer van [plaats]. Maak een tabel met de naam, plaats, website en een korte reden waarom ze installatiewerk zouden kunnen uitbesteden. Noem alleen bedrijven waarvan je de website hebt gevonden en zet de link erbij.",
      },
      {
        type: "p",
        text: "Zie de lijst als ruwe grondstof. Streep weg wat niet past en houd er een stuk of tien over. Tien goede namen zijn meer waard dan honderd willekeurige.",
      },
      { type: "h2", text: "3. Bereid je eerste contact voor" },
      {
        type: "p",
        text: "Voordat je belt of mailt, wil je weten wat zo’n bedrijf doet en waar jij kunt helpen. Kopieer de tekst van hun website en laat ChatGPT de samenvatting maken.",
      },
      {
        type: "prompt",
        text: "Hieronder staat de tekst van de website van [bedrijf]. Vat in vijf regels samen wat ze doen, voor wie ze werken en waar ik als installateur voor [soort werk] bij kan helpen. Bedenk daarna twee open vragen die ik in een eerste gesprek kan stellen. [plak hier de tekst van de website]",
      },
      {
        type: "p",
        text: "Die twee vragen zijn goud waard. Je belt dan niet om iets te verkopen, maar om iets te vragen. Dat gesprek loopt bijna altijd beter.",
      },
      { type: "h2", text: "4. Schrijf een mail die niet klinkt als spam" },
      {
        type: "p",
        text: "ChatGPT schrijft uit zichzelf graag in reclametaal. Vol enthousiasme, veel uitroeptekens. Dat moet je hem dus uitdrukkelijk afleren in je prompt.",
      },
      {
        type: "prompt",
        text: "Schrijf een korte mail van maximaal 120 woorden aan de [functie, bijv. technisch beheerder] van [bedrijf]. Wij zijn [jouw bedrijf] en doen [soort werk] in [regio]. De aanleiding is [iets concreets, bijv. dat ze complexen uit de jaren zeventig beheren]. Geen verkooppraat, geen superlatieven en geen uitroeptekens. Schrijf in gewoon Nederlands in de je-vorm en eindig met één simpele vraag.",
      },
      {
        type: "p",
        text: "Lees de mail daarna hardop en maak hem van jou. Klinkt een zin niet als iets wat je zelf zou zeggen, dan haal je hem weg. En mail je ongevraagd naar bedrijven, houd je dan aan de regels voor zakelijke mail en geef altijd de mogelijkheid om je af te melden.",
      },
      { type: "h2", text: "5. Loop binnenkomende aanvragen na" },
      {
        type: "p",
        text: "Een lead die binnenkomt en daarna blijft liggen, is net zo goed verloren. Vaak blijft een aanvraag hangen omdat er informatie ontbreekt. Dan ben je twee mails verder voordat je een prijs kunt geven. Laat ChatGPT je helpen om die gaten in één keer te zien.",
      },
      {
        type: "prompt",
        text: "Hieronder staat een aanvraag die via onze website binnenkwam. Welke informatie mist er nog om een prijsindicatie te geven voor [soort werk]? Schrijf daarna een korte, vriendelijke mail waarin ik in één keer naar die ontbrekende punten vraag. [plak hier de aanvraag, zonder naam, adres of telefoonnummer]",
      },
      {
        type: "p",
        text: "Zo gaat er één mail de deur uit in plaats van drie, en weet de klant meteen dat je ermee bezig bent.",
      },
      { type: "h2", text: "Wat ChatGPT hier niet voor je doet" },
      {
        type: "p",
        text: "Hij bepaalt niet wie een goede klant voor jou is. Dat weet jij beter. Hij rekent ook geen betrouwbare prijzen uit, want een taalmodel voorspelt tekst en rekent niet echt. En bellen doet hij al helemaal niet. Zie hem als een snelle assistent die het voorwerk doet, zodat jij meer tijd overhoudt voor het gesprek zelf.",
      },
      {
        type: "p",
        text: "Wil je ergens beginnen? Trek deze week een halfuur uit voor prompt 1 en 2. Dan heb je aan het eind van dat halfuur een scherper beeld van je klant en een eerste lijst met namen. En merk je vooral dat prompt 5 steeds terugkomt, omdat aanvragen half binnenkomen? Dat is precies het stuk waar wij bij LoopWerk mee bezig zijn.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function relatedPosts(post: BlogPost, count = 2): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== post.slug).slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
