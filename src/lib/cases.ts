import { sspwZwembad } from "@/lib/assets";

/**
 * Eén bron voor alle cases, zodat de Cases-pagina en de uitgelichte case op
 * de homepage niet uit elkaar lopen. Repeatable Probleem/Gebouwd/Resultaat-
 * format zodat een nieuwe case straks alleen een nieuwe entry + detailpagina
 * kost, geen herontwerp.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  /** Pad naar het klantlogo. Optioneel: zonder logo tonen we de klantnaam als tekst. */
  logo?: string;
  logoAlt?: string;
  title: string;
  problem: string;
  built: string;
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
    problem:
      "Elk gesprek begon bij nul: maat, uitvoering en prijs moesten in de showroom worden uitgevraagd.",
    built:
      "Een configurator die klanten vooraf door maat, uitvoering en prijsrichting leidt.",
    result:
      "Aanvraag komt compleet binnen — keuzes, afmetingen en contactgegevens, zonder overtypen.",
    image: sspwZwembad,
    imageAlt: "Bouwkundig zwembad in de tuin bij een woning",
    href: "/cases/sspw-zwembadconfigurator",
    liveUrl: "https://offer-calculator-sspw.vercel.app/",
    status: "live",
  },
];
