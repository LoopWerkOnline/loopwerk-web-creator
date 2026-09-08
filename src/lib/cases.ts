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

export const cases: CaseStudy[] = [
  {
    slug: "sspw-zwembadconfigurator",
    client: "Sun Sauna & Poolworld",
    title: "Zwembadconfigurator",
    description:
      "Bezoekers stellen in drie stappen zelf hun zwembad samen, zien wat standaard inbegrepen is en krijgen een realistische prijsindicatie.",
    result:
      "Aanvraag komt compleet binnen — keuzes, afmetingen en contactgegevens, zonder overtypen.",
    image: "/cases/sspw-belfeld.jpg",
    imageAlt: "Bouwkundig zwembad, project van Sun Sauna & Poolworld te Belfeld",
    href: "/cases/sspw-zwembadconfigurator",
    liveUrl: "https://offer-calculator-sspw.vercel.app/",
    status: "live",
  },
];
