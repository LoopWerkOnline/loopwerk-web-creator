import { solutionBySlug } from "@/lib/content";

/**
 * Herkenningsstellingen voor de automatiseringsscan. Rechtstreeks afgeleid
 * van de al goedgekeurde `signals` per oplossing in content.ts, zodat de
 * scan niet met andere taal gaat werken dan de rest van de site.
 */
export type ScanStatement = {
  id: string;
  text: string;
  solutionSlug: string;
};

export const scanStatements: ScanStatement[] = [
  {
    id: "s1",
    text: "Het eerste gesprek gaat vooral over informatie ophalen, niet over de opdracht.",
    solutionSlug: "slimme-offerteflow",
  },
  {
    id: "s2",
    text: "Een deel van de gesprekken loopt achteraf alsnog dood op prijs.",
    solutionSlug: "slimme-offerteflow",
  },
  {
    id: "s3",
    text: "Na iedere aanvraag moet iemand dezelfde informatie opnieuw opvragen.",
    solutionSlug: "aanvragen-compleet-binnenkrijgen",
  },
  {
    id: "s4",
    text: "Bijlagen, maten of foto's ontbreken standaard.",
    solutionSlug: "aanvragen-compleet-binnenkrijgen",
  },
  {
    id: "s5",
    text: "Calculeren gebeurt in een Excel die één persoon echt begrijpt.",
    solutionSlug: "calculaties-en-prijsindicaties",
  },
  {
    id: "s6",
    text: "Prijswijzigingen moeten op meerdere plekken worden doorgevoerd.",
    solutionSlug: "calculaties-en-prijsindicaties",
  },
  {
    id: "s7",
    text: "Dezelfde klantgegevens staan in vier systemen, drie keer net anders.",
    solutionSlug: "gegevens-automatisch-verwerken",
  },
  {
    id: "s8",
    text: "Iemand exporteert wekelijks een bestand om het elders weer te importeren.",
    solutionSlug: "gegevens-automatisch-verwerken",
  },
  {
    id: "s9",
    text: "Offertes blijven open staan zonder dat iemand het merkt.",
    solutionSlug: "opvolging-automatiseren",
  },
  {
    id: "s10",
    text: "Niemand weet precies hoeveel aanvragen er nu open staan.",
    solutionSlug: "opvolging-automatiseren",
  },
  {
    id: "s11",
    text: "Werk dat iedere week terugkomt en telkens dezelfde stappen kent.",
    solutionSlug: "ander-terugkerend-werk",
  },
  {
    id: "s12",
    text: "Rapportages die met de hand worden samengesteld.",
    solutionSlug: "ander-terugkerend-werk",
  },
];

export type ScanResult = {
  slug: string;
  count: number;
  recognizedTexts: string[];
};

/**
 * Telt per oplossing hoeveel stellingen herkend zijn. Geeft null terug als
 * er te weinig herkenning is om eerlijk een match te claimen.
 */
export function scoreScan(recognizedIds: Set<string>): ScanResult | null {
  const counts = new Map<string, { count: number; texts: string[] }>();

  for (const statement of scanStatements) {
    if (!recognizedIds.has(statement.id)) continue;
    const entry = counts.get(statement.solutionSlug) ?? { count: 0, texts: [] };
    entry.count += 1;
    entry.texts.push(statement.text);
    counts.set(statement.solutionSlug, entry);
  }

  let best: { slug: string; count: number; texts: string[] } | null = null;
  for (const [slug, entry] of counts) {
    if (!best || entry.count > best.count) {
      best = { slug, ...entry };
    }
  }

  if (!best || best.count === 0) return null;
  if (!solutionBySlug(best.slug)) return null;

  return { slug: best.slug, count: best.count, recognizedTexts: best.texts };
}
