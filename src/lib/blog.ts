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
  /** Datum van de laatste inhoudelijke wijziging (optioneel, voor de sitemap). */
  updated?: string;
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
  {
    slug: "6-redenen-waarom-kleine-bedrijven-achterlopen-met-digitalisering",
    title: "6 redenen waarom kleine bedrijven achterlopen met digitalisering",
    excerpt:
      "Grote bedrijven digitaliseren gemiddeld sneller dan kleine. Dat is niet per se een probleem, en al helemaal geen reden om zelf maar alles tegelijk aan te pakken. Zes redenen waarom kleinere bedrijven achterblijven, en wanneer digitalisering wél de moeite waard is.",
    date: "2026-09-30",
    author: blogAuthors.gianni,
    readingMinutes: 7,
    label: "Eerlijk advies",
    image: "/oplossingen/opl-5.png",
    imageAlt: "Ondernemer aan de telefoon die aantekeningen maakt achter zijn laptop",
    body: [
      {
        type: "p",
        text: "Grote bedrijven gebruiken gemiddeld meer digitale systemen, automatisering en AI dan kleine bedrijven. Dat klinkt misschien alsof kleinere ondernemingen simpelweg achterlopen en zo snel mogelijk moeten digitaliseren.",
      },
      { type: "p", text: "Maar zo eenvoudig is het niet." },
      {
        type: "p",
        text: "Een bedrijf met vijf medewerkers heeft andere processen, budgetten en behoeften dan een organisatie met vijfhonderd medewerkers. Meer software betekent daarom niet automatisch een beter bedrijf.",
      },
      {
        type: "p",
        text: "De belangrijkere vraag is: waarom digitaliseren kleinere bedrijven minder snel, en wanneer is dat eigenlijk een probleem?",
      },
      { type: "h2", text: "Kleine bedrijven zijn gemiddeld minder digitaal" },
      {
        type: "p",
        text: "Cijfers van Eurostat laten zien dat kleinere bedrijven in Europa duidelijk minder digitaal zijn dan grote organisaties.",
      },
      {
        type: "p",
        text: "In 2025 had 31,2% van de kleine Europese bedrijven een zeer lage digitale intensiteit. Bij grote bedrijven was dat slechts 3,7%. Aan de andere kant had 42,7% van de grote bedrijven een zeer hoge digitale intensiteit, tegenover 7,3% van de kleine bedrijven (bron: Eurostat, 2026).",
      },
      {
        type: "p",
        text: "Eurostat kijkt hierbij onder andere naar het gebruik van technologieën zoals cloudoplossingen, e-commerce en kunstmatige intelligentie.",
      },
      {
        type: "p",
        text: "Daarbij is wel een belangrijke kanttekening nodig: in deze Eurostat-statistiek betekent een klein bedrijf een onderneming met 10 tot 49 werkzame personen. Bedrijven met minder dan 10 medewerkers zijn hierin dus niet meegenomen.",
      },
      {
        type: "p",
        text: "Juist voor die kleinere bedrijven geeft onderzoek van het CBS meer inzicht. Het CBS onderzocht Nederlandse microbedrijven met 2 tot 9 werkzame personen. In 2025 gebruikte 13,8% van deze bedrijven minimaal één van zeven onderzochte AI-technologieën. Bij bedrijven met 10 tot 249 werkzame personen was dat 29,8%, en bij grote bedrijven met 250 of meer werkzame personen 66,2% (bron: CBS, 2026).",
      },
      {
        type: "p",
        text: "AI is natuurlijk maar één onderdeel van digitalisering, maar de cijfers laten wel hetzelfde patroon zien: hoe groter het bedrijf, hoe vaker geavanceerdere digitale technologie wordt gebruikt.",
      },
      { type: "p", text: "Waarom is dat zo?" },
      { type: "h2", text: "1. Er is minder tijd om nieuwe systemen uit te zoeken" },
      {
        type: "p",
        text: "In een klein bedrijf zijn medewerkers vaak verantwoordelijk voor meerdere taken tegelijk. De eigenaar houdt zich bijvoorbeeld niet alleen bezig met klanten en verkoop, maar ook met planning, administratie, personeel en leveranciers. Het onderzoeken, testen en implementeren van een nieuw systeem moet daar tussendoor gebeuren.",
      },
      {
        type: "p",
        text: "De OECD noemt beperkte interne capaciteit daarom als een belangrijke belemmering voor digitalisering bij kleinere bedrijven. Ook uit de OECD D4SME Survey van 2025 blijkt dat tijd een rol speelt: 39% van de ondervraagde mkb-bedrijven noemde onvoldoende tijd voor training als uitdaging bij digitalisering (bron: OECD, 2025).",
      },
      {
        type: "p",
        text: "Een oplossing kan dus interessant zijn, maar wanneer de implementatie veel tijd vraagt, wordt deze gemakkelijk uitgesteld.",
      },
      { type: "h2", text: "2. De investering is relatief groter" },
      {
        type: "p",
        text: "Een systeem dat voor een groot bedrijf relatief goedkoop is, kan voor een klein bedrijf een flinke investering zijn. Niet alleen de aanschaf telt mee: denk ook aan implementatie, abonnementskosten, onderhoud, training en koppelingen met bestaande systemen.",
      },
      {
        type: "p",
        text: "In de OECD D4SME Survey noemde 40% van de onderzochte bedrijven onderhoudskosten van digitale oplossingen als uitdaging. Hardwarekosten werden door 32% genoemd (bron: OECD, 2025).",
      },
      {
        type: "p",
        text: "Voor een klein bedrijf moet daarom vaak veel duidelijker zijn wat een investering daadwerkelijk oplevert. Een automatisering die €5.000 kost maar slechts enkele minuten per maand bespaart, is waarschijnlijk niet interessant. Een kleinere oplossing die iedere week meerdere uren handmatig werk voorkomt, kan juist wel aantrekkelijk zijn.",
      },
      { type: "h2", text: "3. Digitale kennis is niet altijd intern aanwezig" },
      {
        type: "p",
        text: "Grote organisaties kunnen IT-specialisten, developers of data-analisten in dienst hebben. Bij een bedrijf met vijf medewerkers is dat meestal niet realistisch.",
      },
      {
        type: "p",
        text: "Dat betekent dat een ondernemer zelf moet bepalen welke software geschikt is, welke processen geautomatiseerd kunnen worden, hoe verschillende systemen gekoppeld worden en wat veilig en betrouwbaar is.",
      },
      {
        type: "p",
        text: "De OECD noemt een gebrek aan digitale kennis en vaardigheden als één van de structurele obstakels voor digitalisering binnen het mkb. Daardoor kan het lastig zijn om onderscheid te maken tussen iets dat daadwerkelijk waarde toevoegt en technologie die vooral interessant klinkt.",
      },
      { type: "h2", text: "4. Niet ieder handmatig proces hoeft geautomatiseerd te worden" },
      {
        type: "p",
        text: "Dit is misschien wel de belangrijkste nuance. Minder digitalisering betekent niet automatisch dat een bedrijf inefficiënt werkt.",
      },
      {
        type: "p",
        text: "Stel dat iemand twee keer per maand een eenvoudig Excel-bestand bijwerkt en daar vijf minuten mee bezig is. Daar een compleet softwaresysteem voor bouwen, heeft waarschijnlijk weinig zin.",
      },
      {
        type: "p",
        text: "Het wordt anders wanneer iemand iedere dag gegevens uit e-mails overtypt, dezelfde berekening opnieuw maakt, ontbrekende informatie moet opvragen of offertes handmatig moet opvolgen. Digitalisering wordt vooral interessant wanneer hetzelfde probleem vaak terugkomt.",
      },
      {
        type: "p",
        text: "De vraag moet daarom niet zijn: “Wat kunnen we automatiseren?” Maar: “Waar verliezen we structureel tijd aan?”",
      },
      {
        type: "h2",
        text: "5. Veel bedrijven beginnen bij de technologie in plaats van bij het probleem",
      },
      {
        type: "p",
        text: "AI, automatisering en nieuwe software krijgen veel aandacht. Daardoor ontstaat al snel de gedachte dat een bedrijf iets met AI moet doen omdat andere bedrijven dat ook doen. Maar voor veel processen is AI helemaal niet nodig.",
      },
      {
        type: "p",
        text: "Van de Nederlandse microbedrijven die in 2025 AI gebruikten, zette 32,7% deze technologie in voor marketing en verkoop en 25,9% voor administratieve processen of bestuurstaken (bron: CBS, 2026). Tegelijkertijd gebruikte het grootste deel van de Nederlandse microbedrijven helemaal geen AI. Dat hoeft geen probleem te zijn.",
      },
      {
        type: "p",
        text: "Een aanvraagformulier dat voorkomt dat gegevens ontbreken, heeft bijvoorbeeld geen AI nodig. Een automatische herinnering voor een openstaande offerte meestal ook niet. En een calculator die iedere keer dezelfde bedrijfsregels toepast, kan vaak betrouwbaarder werken met vaste logica. De technologie moet volgen uit het probleem, niet andersom.",
      },
      { type: "h2", text: "6. De voordelen zijn vooraf niet altijd duidelijk" },
      {
        type: "p",
        text: "Digitalisering kost eerst tijd en geld, terwijl de opbrengst niet altijd direct zichtbaar is. Dat maakt het begrijpelijk dat kleine ondernemers terughoudend kunnen zijn.",
      },
      {
        type: "p",
        text: "De beste kansen zitten daarom vaak bij processen waarvan de verspilling relatief eenvoudig zichtbaar gemaakt kan worden. Stel bijvoorbeeld dat het voorbereiden van één offerte gemiddeld twintig minuten aan handmatig voorwerk kost. Bij 25 offertes per maand is dat 25 × 20 minuten = 500 minuten, ruim acht uur per maand.",
      },
      {
        type: "p",
        text: "Wanneer een betere aanvraagflow en een eenvoudige calculator dat voorwerk kunnen halveren, levert dat ongeveer vier uur per maand terug. Dan wordt veel duidelijker wat een verbetering waard kan zijn. Het hoeft daarbij niet direct om een groot softwareproject te gaan.",
      },
      { type: "h2", text: "Wanneer wordt digitalisering wél interessant?" },
      {
        type: "p",
        text: "Voor kleine bedrijven wordt digitalisering vooral interessant wanneer werkzaamheden vaak terugkomen, relatief veel tijd kosten, foutgevoelig zijn, steeds ongeveer hetzelfde verlopen of weinig menselijk oordeel vereisen.",
      },
      {
        type: "p",
        text: "Denk bijvoorbeeld aan gegevens die meerdere keren worden overgenomen, aanvragen waarbij informatie ontbreekt, terugkerende calculaties of offertes die handmatig opgevolgd moeten worden. Daar kan een relatief kleine verbetering al merkbaar verschil maken.",
      },
      { type: "h2", text: "Klein beginnen is vaak verstandiger" },
      {
        type: "p",
        text: "De cijfers laten zien dat grote bedrijven gemiddeld verder zijn met digitalisering. Maar een klein bedrijf hoeft een grote organisatie niet na te bootsen. Integendeel.",
      },
      {
        type: "p",
        text: "Kleine bedrijven hebben vaak juist het voordeel dat processen overzichtelijk zijn en veranderingen sneller doorgevoerd kunnen worden. Eén gerichte verbetering kan daardoor al direct verschil maken.",
      },
      {
        type: "p",
        text: "Bijvoorbeeld: een klant vult zijn gegevens één keer goed in, de informatie komt direct op de juiste plek, een berekening wordt voorbereid, een medewerker controleert het resultaat, en de offerte kan sneller worden verstuurd.",
      },
      { type: "p", text: "Geen compleet nieuw IT-landschap. Wel minder onnodig werk." },
      { type: "h2", text: "Niet méér digitaliseren, maar slimmer kiezen" },
      {
        type: "p",
        text: "Onderzoek laat duidelijk zien dat kleinere bedrijven gemiddeld minder digitale technologie gebruiken dan grotere organisaties. Kosten, beschikbare tijd, kennis en interne capaciteit spelen daarbij een belangrijke rol.",
      },
      {
        type: "p",
        text: "Maar het doel moet niet zijn om zoveel mogelijk processen te digitaliseren. Voor een klein bedrijf is het vaak verstandiger om eerst te zoeken naar werkzaamheden die vaak terugkomen, relatief veel tijd kosten en op ongeveer dezelfde manier worden uitgevoerd. Daar zit meestal de eerste kans.",
      },
      {
        type: "p",
        text: "Soms is de oplossing een automatisering. Soms een calculator, een betere aanvraagflow of een koppeling tussen twee bestaande systemen. En soms werkt het huidige proces prima en is veranderen helemaal niet nodig.",
      },
      {
        type: "p",
        text: "Goede digitalisering begint daarom niet met software. Het begint met de vraag: welk werk zou eigenlijk makkelijker moeten kunnen?",
      },
      {
        type: "p",
        text: "Precies dat stuk — het ene proces dat steeds terugkomt maar nooit goed is opgelost — is waar wij bij LoopWerk mee bezig zijn.",
      },
      {
        type: "p",
        text: "Bronnen: Eurostat, Key figures on European business (2026-editie); CBS, onderzoek naar het gebruik van AI-technologie door Nederlandse microbedrijven (16 maart 2026); OECD, SME Digitalisation for Competitiveness — de D4SME Survey (2025) en Digitalisation of SMEs.",
      },
    ],
  },
  {
    slug: "6-terugkerende-werkzaamheden-die-je-het-beste-kunt-automatiseren",
    title: "6 terugkerende werkzaamheden die je het beste kunt automatiseren",
    excerpt:
      "Niet iedere handmatige taak hoeft geautomatiseerd te worden. Zes soorten terugkerend werk waar automatisering wél vaak loont, wat je beter laat liggen, en wanneer je er geen AI voor nodig hebt.",
    date: "2026-10-13",
    author: blogAuthors.shaquil,
    readingMinutes: 9,
    label: "Achter de aanvraag",
    image: "/oplossingen/opl-1.jpg",
    imageAlt: "Laptop met een dashboard vol cijfers op een werktafel",
    body: [
      {
        type: "p",
        text: "Niet iedere handmatige taak hoeft geautomatiseerd te worden. Een medewerker die één keer per maand vijf minuten bezig is met het bijwerken van een bestand, hoeft daar waarschijnlijk geen nieuwe digitale oplossing voor te krijgen.",
      },
      {
        type: "p",
        text: "Maar wanneer hetzelfde werk iedere dag of iedere week terugkomt, steeds volgens ongeveer dezelfde stappen verloopt en weinig menselijk oordeel vereist, wordt automatisering een stuk interessanter.",
      },
      {
        type: "p",
        text: "De vraag is daarom niet: “Wat kunnen we allemaal automatiseren?” Maar: “Welke terugkerende werkzaamheden kosten structureel tijd zonder dat daar veel menselijke aandacht voor nodig is?”",
      },
      {
        type: "p",
        text: "Onderzoek naar automatisering laat al langer hetzelfde patroon zien. Vooral het verzamelen en verwerken van gegevens en werkzaamheden in voorspelbare omgevingen zijn technisch relatief geschikt voor automatisering. Taken waarbij persoonlijke interactie, expertise of complexe beslissingen nodig zijn, zijn veel moeilijker volledig te automatiseren.",
      },
      { type: "h2", text: "Wanneer is een taak geschikt voor automatisering?" },
      {
        type: "p",
        text: "Voordat je naar specifieke werkzaamheden kijkt, helpt het om een terugkerende taak langs een paar simpele vragen te leggen. Komt de taak vaak terug? Worden ongeveer dezelfde stappen iedere keer opnieuw uitgevoerd? Kost het iedere keer enkele minuten of langer? Worden gegevens handmatig gekopieerd of overgetypt? Ontstaan er regelmatig fouten of ontbreekt er informatie? Hoeft een medewerker meestal geen complexe beslissing te nemen, en is redelijk duidelijk wat er in verschillende situaties moet gebeuren?",
      },
      {
        type: "p",
        text: "Hoe vaker het antwoord ja is, hoe interessanter de taak meestal wordt.",
      },
      {
        type: "p",
        text: "Dat betekent overigens niet dat alles volledig automatisch moet verlopen. Vaak is het juist beter om het voorbereidende werk te automatiseren en een medewerker de laatste controle te laten uitvoeren.",
      },
      {
        type: "p",
        text: "Dat idee zien we ook terug in onderzoek van de International Labour Organization. De ILO concludeert dat de invloed van AI op werk waarschijnlijk vaker leidt tot verandering van taken binnen een functie dan tot volledige vervanging van functies. Administratieve beroepen en werkzaamheden zoals data-invoer en boekhoudkundige verwerking behoren daarbij tot de werkzaamheden met de hoogste blootstelling aan automatisering (bron: ILO, 2025).",
      },
      { type: "h2", text: "1. Gegevens handmatig overnemen" },
      {
        type: "p",
        text: "Een klant vult informatie in via een formulier. Een medewerker opent vervolgens de aanvraag, kopieert de naam naar een Excel-bestand, zet het adres in het administratiesysteem en neemt andere gegevens opnieuw over in een offerte.",
      },
      {
        type: "p",
        text: "Op zichzelf kost iedere handeling misschien maar een paar minuten. Maar wanneer dit tientallen keren per maand gebeurt, loopt dat snel op. Dit soort gegevensverwerking is een logisch startpunt voor automatisering, omdat de stappen meestal goed voorspelbaar zijn.",
      },
      {
        type: "p",
        text: "Zo ziet het er handmatig uit: de aanvraag komt binnen, een medewerker opent de e-mail, kopieert de gegevens, opent een ander systeem, plakt de gegevens en controleert alles. Slimmer ingericht komt de aanvraag binnen, worden de gegevens automatisch opgeslagen, is de relevante informatie direct beschikbaar voor de volgende stap en controleert de medewerker alleen waar dat nodig is.",
      },
      {
        type: "p",
        text: "Dat bespaart niet alleen handelingen, maar verkleint ook de kans dat informatie verkeerd wordt overgenomen. Ook onderzoek van McKinsey naar duizenden verschillende werkzaamheden wijst gegevens verzamelen en verwerken al langere tijd aan als activiteiten met relatief veel automatiseringspotentieel (bron: McKinsey Global Institute).",
      },
      { type: "h2", text: "2. Incomplete aanvragen controleren en aanvullen" },
      {
        type: "p",
        text: "Een nieuwe aanvraag klinkt positief. Totdat blijkt dat de helft van de informatie ontbreekt. Welke afmetingen heeft het product? Wat is het adres? Welke uitvoering wil de klant? Zijn er foto’s beschikbaar?",
      },
      {
        type: "p",
        text: "Wanneer medewerkers dat iedere keer achteraf moeten uitzoeken, ontstaat er een proces van e-mails, telefoontjes en wachten op antwoorden.",
      },
      {
        type: "p",
        text: "Een betere oplossing is vaak niet om het beantwoorden van die vragen te automatiseren, maar om ervoor te zorgen dat de juiste informatie eerder wordt verzameld. Een digitale aanvraagflow kan bijvoorbeeld afhankelijk van eerdere antwoorden andere vragen stellen en controleren of verplichte informatie aanwezig is voordat de aanvraag wordt verstuurd.",
      },
      {
        type: "p",
        text: "Daardoor verandert het proces van aanvraag, ontbrekende informatie, contact opnemen, wachten op de klant, aanvullen en pas dan verwerken, naar: complete aanvraag, controle, verwerking.",
      },
      {
        type: "p",
        text: "Automatisering betekent dus niet altijd dat een computer het werk van een medewerker overneemt. Soms betekent het vooral dat het proces zo wordt ingericht dat onnodig werk überhaupt niet meer ontstaat.",
      },
      { type: "h2", text: "3. Terugkerende calculaties en prijsberekeningen" },
      {
        type: "p",
        text: "Veel bedrijven maken regelmatig ongeveer dezelfde berekening. Denk aan prijzen op basis van oppervlakte, aantallen, materiaalkeuze, reistijd, formaat, type werkzaamheden, vaste toeslagen of combinaties van opties.",
      },
      {
        type: "p",
        text: "Wanneer iemand iedere aanvraag opnieuw in Excel opent, waardes invoert en dezelfde formules toepast, is het interessant om te onderzoeken of een deel hiervan geautomatiseerd kan worden. Een eenvoudige calculator kan bijvoorbeeld direct een interne calculatie voorbereiden. Of een klant kan eerst zelf een indicatieve prijs krijgen, waarna een medewerker alleen uitzonderingen of definitieve offertes beoordeelt.",
      },
      {
        type: "p",
        text: "Dat betekent niet dat iedere offerte automatisch verstuurd moet worden. Juist bij prijsstelling is menselijke controle vaak belangrijk. De automatisering kan vooral het voorwerk uitvoeren. En omdat het hier om vaste rekenregels gaat, is AI daar bewust niet voor nodig.",
      },
      {
        type: "p",
        text: "Stel dat een bedrijf 30 calculaties per maand maakt en het verzamelen, invoeren en berekenen gemiddeld 15 minuten kost. Dat is 450 minuten, oftewel 7,5 uur per maand. Wanneer een digitale flow de helft van dat voorbereidende werk wegneemt, scheelt dat al bijna vier uur per maand.",
      },
      {
        type: "p",
        text: "De exacte winst verschilt natuurlijk per bedrijf. Daarom moet eerst gekeken worden naar het bestaande proces voordat bepaald kan worden of automatisering financieel interessant is.",
      },
      { type: "h2", text: "4. Opvolging en reminders" },
      {
        type: "p",
        text: "Een offerte is verstuurd. En daarna? Bij veel kleine bedrijven hangt opvolging af van iemand die onthoudt dat er nog gereageerd moet worden. Dat werkt zolang het aantal aanvragen beperkt blijft. Maar zodra er meerdere klanten, offertes en projecten tegelijk lopen, worden dingen makkelijker vergeten.",
      },
      {
        type: "p",
        text: "Juist eenvoudige opvolging laat zich vaak goed automatiseren. Bijvoorbeeld: een offerte is verstuurd, na zeven dagen is er geen reactie, en de medewerker krijgt een herinnering. Of: een aanvraag wordt ontvangen, de klant krijgt automatisch een ontvangstbevestiging en een medewerker krijgt de taak om de aanvraag te beoordelen.",
      },
      {
        type: "p",
        text: "Het hoeft dus niet altijd automatisch een e-mail naar de klant te zijn. Soms is een interne reminder voldoende. Het voordeel zit vooral in het feit dat de volgende stap niet meer afhankelijk is van iemands geheugen.",
      },
      { type: "h2", text: "5. Documenten en bestanden verwerken" },
      {
        type: "p",
        text: "Ook bestanden veroorzaken verrassend veel handmatig werk. Een offerte komt binnen als pdf. Een foto wordt per mail verstuurd. Een formulier staat ergens anders opgeslagen. Vervolgens moet iemand het bestand downloaden, een naam geven, in de juiste map plaatsen en misschien gegevens eruit overnemen.",
      },
      {
        type: "p",
        text: "Wanneer dit incidenteel gebeurt, is dat geen probleem. Wanneer dezelfde handelingen iedere dag terugkomen, wordt het interessant. Een oplossing kan bijvoorbeeld automatisch bestanden op de juiste plek opslaan, een vaste bestandsnaam gebruiken, documenten aan een aanvraag koppelen, informatie uit een formulier verwerken of een collega informeren dat een bestand beschikbaar is.",
      },
      {
        type: "p",
        text: "Ook hier hoeft AI niet automatisch onderdeel van de oplossing te zijn. Wanneer de regels vooraf duidelijk zijn, is een normale automatisering vaak eenvoudiger en betrouwbaarder. AI wordt pas interessanter wanneer informatie minder gestructureerd is, bijvoorbeeld wanneer gegevens uit verschillende soorten documenten of vrije tekst moeten worden herkend.",
      },
      { type: "h2", text: "6. Standaard administratieve voorbereiding" },
      {
        type: "p",
        text: "Administratief werk is een brede categorie, maar juist hier zitten vaak veel kleine terugkerende taken. Denk aan gegevens klaarzetten voor facturatie, standaardgegevens verwerken, lijsten bijwerken, informatie tussen systemen verplaatsen, periodieke overzichten voorbereiden en standaarddocumenten genereren.",
      },
      {
        type: "p",
        text: "Dat sluit ook aan bij recente Nederlandse cijfers. Het CBS onderzocht in 2025 het AI-gebruik bij Nederlandse microbedrijven met 2 tot 9 werkzame personen. Van de microbedrijven die AI gebruikten, zette 25,9% AI in voor administratieve processen of bestuurstaken. Marketing en verkoop stonden met 32,7% op de eerste plaats (bron: CBS, 2026).",
      },
      {
        type: "p",
        text: "Dat betekent niet dat administratief werk automatisch met AI opgelost moet worden. Integendeel. Veel administratieve processen bestaan uit vaste regels en hebben helemaal geen AI nodig.",
      },
      {
        type: "p",
        text: "Ook breder neemt automatisering een belangrijkere plaats in bij Nederlandse bedrijven. Uit de Conjunctuurenquête Nederland van april 2026 bleek dat bedrijven met personeelstekorten automatisering steeds vaker als maatregel inzetten. Van alle bedrijven had 64% last van personeelstekorten; voor bijna de helft van de bedrijven mét een personeelstekort was meer automatiseren de belangrijkste maatregel (bron: CBS, 3 juni 2026).",
      },
      { type: "h2", text: "Wat moet je juist niet als eerste automatiseren?" },
      {
        type: "p",
        text: "Er zijn ook werkzaamheden waarbij automatisering meestal niet het beste startpunt is. Denk aan complexe gesprekken met klanten, uitzonderlijke situaties die iedere keer anders zijn, strategische beslissingen, werk waarbij ervaring en vakkennis centraal staan, processen die zelf nog voortdurend veranderen en taken die nauwelijks voorkomen.",
      },
      {
        type: "p",
        text: "Ook werkzaamheden waarbij fouten grote financiële, juridische of veiligheidsgevolgen kunnen hebben verdienen extra voorzichtigheid.",
      },
      {
        type: "p",
        text: "Een belangrijk uitgangspunt is daarom: automatiseer eerst het voorspelbare werk rondom de beslissing, niet automatisch de beslissing zelf. Een systeem kan bijvoorbeeld alle informatie voor een offerte verzamelen en een calculatie voorbereiden. De medewerker kan vervolgens bepalen of de offerte daadwerkelijk klopt. Dat combineert snelheid met menselijke controle.",
      },
      { type: "h2", text: "AI is niet automatisch de oplossing" },
      {
        type: "p",
        text: "Automatisering en AI worden tegenwoordig vaak in één adem genoemd. Maar ze betekenen niet hetzelfde.",
      },
      {
        type: "p",
        text: "Stel dat iedere aanvraag boven €10.000 door een medewerker gecontroleerd moet worden. Daar is geen AI voor nodig. Een simpele regel kan voldoende zijn: ligt het bedrag boven €10.000, dan gaat de aanvraag naar een medewerker.",
      },
      {
        type: "p",
        text: "AI wordt interessanter wanneer informatie niet netjes gestructureerd is of wanneer er bijvoorbeeld tekst geïnterpreteerd, gecategoriseerd of samengevat moet worden.",
      },
      {
        type: "p",
        text: "Dat onderscheid is belangrijk, zeker voor kleine bedrijven. Een eenvoudige regelgestuurde oplossing is vaak goedkoper, beter uitlegbaar, makkelijker te onderhouden en voorspelbaarder. Gebruik AI daarom alleen wanneer het daadwerkelijk iets toevoegt aan het proces.",
      },
      { type: "h2", text: "Begin niet met de grootste automatisering" },
      {
        type: "p",
        text: "Het is verleidelijk om direct naar het volledige bedrijfsproces te kijken. Van eerste klantcontact tot factuur. Maar voor een klein bedrijf is het vaak verstandiger om één duidelijk knelpunt te pakken.",
      },
      {
        type: "p",
        text: "Bijvoorbeeld: aanvragen komen regelmatig incompleet binnen. De gewenste situatie is dat iedere aanvraag de informatie bevat die nodig is om een offerte te maken. De oplossing is dan een gestructureerde aanvraagflow die controleert of de noodzakelijke gegevens aanwezig zijn.",
      },
      {
        type: "p",
        text: "Of: offertes worden regelmatig te laat opgevolgd. De gewenste situatie is dat iedere openstaande offerte automatisch opnieuw onder de aandacht komt. De oplossing is dan een eenvoudige automatische opvolgflow.",
      },
      {
        type: "p",
        text: "Dat is overzichtelijker, goedkoper en makkelijker te testen dan direct het volledige bedrijf te digitaliseren.",
      },
      { type: "h2", text: "Zoek naar werk dat vaak terugkomt" },
      {
        type: "p",
        text: "De interessantste automatiseringen zijn meestal niet de meest indrukwekkende. Het zijn vaak simpele werkzaamheden die medewerkers iedere dag opnieuw uitvoeren: gegevens overtypen, informatie controleren, een berekening voorbereiden, een bestand verplaatsen of een reminder sturen.",
      },
      {
        type: "p",
        text: "Per handeling lijkt de tijdwinst klein. Maar juist doordat het werk steeds opnieuw terugkomt, kan het totaal groot worden.",
      },
      {
        type: "p",
        text: "Onderzoek van de OECD onder mkb-bedrijven laat zien dat bedrijven die AI gebruiken vooral waarde ervaren wanneer technologie praktisch werk verbetert. In de 2025 D4SME Survey gaf 43% van de AI-gebruikende respondenten aan een gematigde impact te ervaren, bijvoorbeeld door minder handmatige taken of een hogere nauwkeurigheid. Nog eens 18% rapporteerde een duidelijke verbetering in efficiëntie, productiviteit of besluitvorming. Slechts 6% noemde de impact echt transformerend (bron: OECD, 2025).",
      },
      {
        type: "p",
        text: "Dat is eigenlijk precies de juiste verwachting voor een klein bedrijf. Digitalisering hoeft je onderneming niet volledig te veranderen. Als één terugkerend proces iedere week eenvoudiger, sneller en betrouwbaarder wordt, kan dat al genoeg zijn.",
      },
      {
        type: "p",
        text: "Dat ene terugkerende proces uitzoeken, en samen kijken of het de moeite van automatiseren waard is: daar helpen wij bij LoopWerk graag bij.",
      },
      {
        type: "p",
        text: "Bronnen: CBS, Gebruik van AI-technologie door Nederlandse microbedrijven (2026) en Bedrijven zetten meer in op automatisering door personeelstekort (3 juni 2026); OECD, SME Digitalisation for Competitiveness — de 2025 D4SME Survey; International Labour Organization, Generative AI and Jobs: A Refined Global Index of Occupational Exposure (2025); McKinsey Global Institute, AI, automation, and the future of work.",
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
