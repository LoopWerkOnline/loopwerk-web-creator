import { durationOptions, volumeOptions } from "./questions";
import type { ScanAnswers, ScanScore } from "./types";

const manualWorkSinks = ["verzamelen", "opzoeken", "vragen", "overtypen", "controleren", "documenten"];

/** Uren per week: frequentie (midden van de bandbreedte) × tijd per keer. */
export function hoursPerWeek(answers: ScanAnswers): number {
  const volume = volumeOptions.find((o) => o.value === answers.volume);
  const duration = durationOptions.find((o) => o.value === answers.duration);
  if (!volume || !duration) return 0;
  return (volume.midpoint * duration.minutes) / 60;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Simpele, transparante rule-based scoring. Geen AI, geen statistiek — vijf
 * meetbare deelscores die optellen tot maximaal 100. Bedoeld als indicatie,
 * niet als exacte wetenschap.
 */
export function scoreScan(answers: ScanAnswers): ScanScore {
  const hours = hoursPerWeek(answers);

  const volumeTimePts = Math.min(40, hours * 2);
  const repetitionPts = ((answers.repetition - 1) / 4) * 25;
  const manualWorkCount = answers.timeSinks.filter((s) => manualWorkSinks.includes(s)).length;
  const manualWorkPts = Math.min(15, (manualWorkCount / 4) * 15);
  const fragmentationPts = Math.min(10, (answers.sources.length / 4) * 10);
  const judgmentPts = ((answers.judgment - 1) / 4) * 10;

  const total = Math.max(
    0,
    Math.min(100, Math.round(volumeTimePts + repetitionPts + manualWorkPts + fragmentationPts + judgmentPts)),
  );

  const band: ScanScore["band"] = total >= 80 ? "hoog" : total >= 60 ? "duidelijk" : total >= 35 ? "gericht" : "beperkt";
  const bandLabel = {
    beperkt: "Beperkte kans",
    gericht: "Gerichte kans",
    duidelijk: "Duidelijke kans",
    hoog: "Hoog automatiseringspotentieel",
  }[band];

  // Welk deel van de tijd is waarschijnlijk de moeite van onderzoeken waard —
  // niet alle tijd, alleen het handmatige/versnipperde deel.
  const reviewFraction = Math.max(0.2, Math.min(0.7, (manualWorkPts / 15) * 0.6 + (fragmentationPts / 10) * 0.4));
  const reviewLow = round1(Math.max(0.5, hours * reviewFraction * 0.75));
  const reviewHigh = round1(Math.max(reviewLow + 0.5, hours * reviewFraction * 1.15));

  const dimensions = [
    {
      label: "Herhaling",
      text:
        answers.repetition >= 4
          ? "Veel stappen komen terug."
          : answers.repetition <= 2
            ? "Elke keer is dit net weer anders."
            : "Een deel van de stappen komt terug, een deel wisselt.",
    },
    {
      label: "Handmatig voorwerk",
      text:
        manualWorkCount >= 3
          ? "Een groot deel van de tijd zit in verzamelen en overnemen."
          : manualWorkCount >= 1
            ? "Een deel van de tijd zit in verzamelen of overnemen."
            : "Het voorwerk lijkt beperkt — de tijd zit vooral elders.",
    },
    {
      label: "Menselijk oordeel",
      text:
        answers.judgment <= 2
          ? "De uiteindelijke beoordeling blijft belangrijk, bij bijna elke stap."
          : answers.judgment >= 4
            ? "Het oordeel is vooral nodig bij uitzonderingen, niet bij elke stap."
            : "Het oordeel weegt mee, maar niet bij ieder onderdeel.",
    },
  ];

  return { total, band, bandLabel, hoursPerWeek: round1(hours), reviewLow, reviewHigh, dimensions };
}
