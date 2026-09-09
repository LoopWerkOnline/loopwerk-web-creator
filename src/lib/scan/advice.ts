import type { ScanAnswers, ScanScore } from "./types";

const sinkPhrase: Record<string, string> = {
  verzamelen: "het verzamelen van informatie",
  opzoeken: "het opzoeken van gegevens",
  vragen: "het stellen van aanvullende vragen aan de klant",
  berekenen: "het berekenen van prijzen of hoeveelheden",
  overtypen: "het overtypen van gegevens",
  controleren: "het controleren van informatie",
  afstemmen: "intern afstemmen",
  documenten: "het opstellen van documenten of offertes",
  plannen: "het bepalen van de planning",
  opvolging: "het handmatig opvolgen van openstaande zaken",
};

function joinPhrases(values: string[]): string {
  const phrases = values.map((v) => sinkPhrase[v]).filter((p): p is string => Boolean(p));
  if (phrases.length === 0) return "handmatig voorwerk";
  if (phrases.length === 1) return phrases[0]!;
  return `${phrases.slice(0, -1).join(", ")} en ${phrases[phrases.length - 1]}`;
}

export type Richting = { label: string; solutionSlug: string; explain: string };

/** Rule-based koppeling naar een van de bestaande oplossingsrichtingen op de site. */
export function pickRichting(answers: ScanAnswers): Richting {
  const s = answers.timeSinks;
  if (s.includes("overtypen") && answers.sources.length >= 2) {
    return {
      label: "Gegevensflow",
      solutionSlug: "gegevens-automatisch-verwerken",
      explain:
        "Koppelingen tussen de systemen die je noemt, zodat gegevens niet nog eens met de hand hoeven te worden overgenomen.",
    };
  }
  if (s.includes("berekenen")) {
    return {
      label: "Calculator + intake",
      solutionSlug: "calculaties-en-prijsindicaties",
      explain:
        "Vaste rekenregels en prijslogica op één plek, in plaats van in een rekenmodel dat vooral in iemands hoofd zit.",
    };
  }
  if (s.includes("opvolging")) {
    return {
      label: "Opvolgingsflow",
      solutionSlug: "opvolging-automatiseren",
      explain: "Automatische statussen en herinneringen, zodat opvolging niet van iemands geheugen afhangt.",
    };
  }
  if (s.some((v) => ["verzamelen", "opzoeken", "vragen"].includes(v))) {
    return {
      label: "Slimme intake",
      solutionSlug: "slimme-offerteflow",
      explain: "Een intake die relevante informatie vooraf verzamelt, zodat het gesprek er niet meer over hoeft te gaan.",
    };
  }
  return {
    label: "Gerichte procesanalyse",
    solutionSlug: "ander-terugkerend-werk",
    explain: "Dit past niet in een vaste richting — dat vraagt om eerst goed te kijken waar in dit proces de tijd echt zit.",
  };
}

/** Twee lopende alinea's: waar de tijd naartoe gaat, en wat dat waarschijnlijk betekent. */
export function buildAdviceParagraphs(answers: ScanAnswers, score: ScanScore): string[] {
  const dominant = joinPhrases(answers.timeSinks.slice(0, 2));
  const repetitionPart =
    answers.repetition >= 4
      ? "terwijl het proces grotendeels dezelfde stappen volgt"
      : answers.repetition <= 2
        ? "en het proces iedere keer net weer anders verloopt"
        : "en een deel van de stappen daarbij steeds terugkomt";

  if (score.band === "beperkt") {
    return [
      `Je geeft aan dat er tijd gaat naar ${dominant}, bij een relatief laag volume. ${
        answers.repetition <= 2
          ? "Bovendien verloopt het proces iedere keer net weer anders."
          : "De rest van de signalen wijst nu ook niet op een grote kans."
      }`,
      "Op basis hiervan lijkt dit nu niet de plek waar automatisering het meeste zou opleveren. Dat is geen probleem — niet elk proces hoeft prioriteit één te zijn, en dat zeggen we liever eerlijk dan dat we een kans verzinnen die er niet is.",
    ];
  }

  return [
    `Je geeft aan dat veel tijd verdwijnt in ${dominant}, ${repetitionPart}.`,
    "De eerste kans lijkt daarom niet te zitten in het automatiseren van de uiteindelijke beslissing, maar in alles wat daaraan voorafgaat.",
  ];
}

/** "Wat zouden we juist bij mensen laten" — gedreven door de judgment-vraag. */
export function buildJudgmentAdvice(answers: ScanAnswers): string {
  if (answers.judgment <= 2) {
    return "De uiteindelijke beoordeling vraagt volgens je antwoorden nog behoorlijk wat menselijk oordeel, bij bijna elke stap. Die zouden we voorlopig niet automatiseren.";
  }
  if (answers.judgment >= 4) {
    return "Het menselijk oordeel lijkt vooral nodig bij uitzonderingen. De rest eromheen is meestal wél de moeite van bekijken waard.";
  }
  return "Ergens in dit proces blijft een moment waarop iemand het laatste woord moet hebben. Dat zouden we laten zitten waar het zit.";
}

/** Eerste-stap-suggestie, alleen getoond als er echt een duidelijke kans is. */
export function buildFirstStep(answers: ScanAnswers): { title: string; body: string } | null {
  const dominant = answers.timeSinks[0];
  if (dominant === "berekenen") {
    return {
      title: "Zet de rekenregels één keer goed neer.",
      body: "Vaste staffels, toeslagen en uitzonderingen op één plek, zodat niet iedere aanvraag opnieuw wordt uitgerekend.",
    };
  }
  if (dominant === "overtypen") {
    return {
      title: "Laat gegevens één keer landen, niet drie keer.",
      body: "Een koppeling tussen de systemen die je noemde voorkomt dat dezelfde informatie steeds opnieuw wordt ingevoerd.",
    };
  }
  return {
    title: "Maak de aanvraag compleet vóór iemand ermee aan het werk gaat.",
    body: "Een slimme intake kan relevante informatie eerder verzamelen en, afhankelijk van de antwoorden, alleen de vervolgvragen stellen die nodig zijn.",
  };
}

/** Live duiding bij de 2D-matrix (herhaling × menselijk oordeel), op basis van het kwadrant. */
export function buildQuadrantText(repetition: number, judgment: number): string {
  const highRepetition = repetition >= 3;
  const exceptionOnlyJudgment = judgment >= 3;

  if (highRepetition && exceptionOnlyJudgment) {
    return "Dit is het meest kansrijke kwadrant: het proces herhaalt zich, en oordeel is vooral nodig bij uitzonderingen.";
  }
  if (highRepetition && !exceptionOnlyJudgment) {
    return "Het proces herhaalt zich, maar er blijft bij bijna elke stap een beoordeling nodig. De winst zit dan waarschijnlijk vooral in het voorbereidende werk, niet in de beslissing zelf.";
  }
  if (!highRepetition && exceptionOnlyJudgment) {
    return "Oordeel is vooral nodig bij uitzonderingen, maar het proces verloopt zelf iedere keer anders. Kijk dan eerst of er toch een vast deel in zit.";
  }
  return "Dit proces verloopt iedere keer anders én vraagt bij bijna elke stap een beoordeling. Dat is nu niet de sterkste kans.";
}
