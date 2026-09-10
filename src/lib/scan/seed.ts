import { scanSteps } from "./questions";
import { initialAnswers, type ScanAnswers } from "./types";

function validOptionValues(stepId: string): string[] {
  const step = scanSteps.find((s) => s.id === stepId);
  if (step?.kind !== "choice") return [];
  return step.options.map((o) => o.value);
}

/**
 * Zet querystring-waarden (vanuit een oplossingspagina) om in geldige ScanAnswers.
 * Onbekende of ontbrekende `process` -> null, dan gedraagt /scan zich exact als
 * vandaag (start bij intro, lege antwoorden) — geen regressie voor direct verkeer.
 */
export function seedAnswersFromSearch(search: {
  process?: string | undefined;
  sinks?: string | undefined;
  sources?: string | undefined;
}): { answers: ScanAnswers; skipIntro: boolean } | null {
  const processValues = validOptionValues("process");
  const process = search.process && processValues.includes(search.process) ? search.process : undefined;
  if (!process) return null;

  const sinkValues = validOptionValues("timeSinks");
  const timeSinks = (search.sinks ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => sinkValues.includes(s));

  const sourceValues = validOptionValues("sources");
  const sources = (search.sources ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => sourceValues.includes(s));

  return {
    answers: { ...initialAnswers, process, timeSinks, sources },
    skipIntro: true,
  };
}
