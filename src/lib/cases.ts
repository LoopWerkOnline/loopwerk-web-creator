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
  /** Optionele kernregel, als eerste getoond op de case-kaart. */
  highlight?: string;
  image: string;
  imageAlt: string;
  /** Interne route naar de volledige case. */
  href: string;
  liveUrl?: string;
  status: "live" | "in-productie";
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
    highlight: "Van 45 naar 3 minuten per offerte.",
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
