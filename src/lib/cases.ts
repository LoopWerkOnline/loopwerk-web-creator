/**
 * Eén bron voor alle cases, zodat de Cases-pagina en de uitgelichte case op
 * de homepage niet uit elkaar lopen. Zo kost een nieuwe case straks alleen
 * een nieuwe entry + detailpagina, geen herontwerp.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  /** Pad naar het klantlogo. Optioneel: zonder logo tonen we de klantnaam als tekst. */
  logo?: string;
  logoAlt?: string;
  title: string;
  description: string;
  result: string;
  image: string;
  imageAlt: string;
  /** Interne route naar de volledige case. */
  href: string;
  liveUrl?: string;
  status: "live" | "in-productie";
};

/** Een echte klantreview, letterlijk overgenomen van de bron (bijv. Google). */
export type CaseReview = {
  /** Volledige tekst, zonder aanpassingen. */
  quote: string;
  /** Korte versie voor de homepage: een letterlijk deel van de review. */
  short: string;
  author: string;
  role: string;
  rating: number;
  source: string;
  url: string;
};

/** Google-review van Jacques Gastens (SSPW), 5 sterren. Tekst letterlijk, namen van het team staan er bewust in. */
export const SSPW_REVIEW: CaseReview = {
  quote:
    "Superblij met de nieuwe berekeningstool op onze website! Levi, Gianni en Shaquil, jullie hebben fantastisch werk geleverd. De tool werkt ontzettend soepel, ziet er strak uit en is heel gebruiksvriendelijk voor onze bezoekers. De communicatie verliep vlot en professioneel. Een absolute aanrader!",
  short: "Superblij met de nieuwe berekeningstool op onze website!",
  author: "Jacques Gastens",
  role: "Eigenaar Sun Sauna & Poolworld",
  rating: 5,
  source: "Google",
  url: "https://www.google.com/maps/search/?api=1&query=Loopwerk%20Online",
};

/** Configurator op de site van SSPW. Eén plek: case-kaart, casepagina en homepage linken hiernaar. */
export const SSPW_CONFIGURATOR_URL =
  "https://sspw.nl/verschillende-soorten-zwembaden/bouwkundige-zwembaden/";

export const cases: CaseStudy[] = [
  {
    slug: "sspw-zwembadconfigurator",
    client: "Sun Sauna & Poolworld",
    logo: "/cases/sspw-logo.png",
    logoAlt: "Logo van Sun Sauna & Poolworld",
    title: "Zwembadconfigurator",
    description:
      "Bezoekers stellen in drie stappen zelf hun zwembad samen, zien wat standaard inbegrepen is en krijgen een realistische prijsindicatie.",
    result:
      "Aanvraag komt compleet binnen: keuzes, afmetingen en contactgegevens, zonder overtypen.",
    image: "/cases/sspw-belfeld.jpg",
    imageAlt: "Bouwkundig zwembad, project van Sun Sauna & Poolworld te Belfeld",
    href: "/cases/sspw-zwembadconfigurator",
    liveUrl: SSPW_CONFIGURATOR_URL,
    status: "live",
  },
];
