import type { DurationOption, ScanStep, VolumeOption } from "./types";

export const volumeOptions: VolumeOption[] = [
  { value: "1-5", label: "1–5 per week", midpoint: 3 },
  { value: "6-15", label: "6–15 per week", midpoint: 10 },
  { value: "16-30", label: "16–30 per week", midpoint: 23 },
  { value: "31-75", label: "31–75 per week", midpoint: 53 },
  { value: "75+", label: "75+ per week", midpoint: 90 },
];

export const durationOptions: DurationOption[] = [
  { value: "5", label: "5 min", minutes: 5 },
  { value: "10", label: "10 min", minutes: 10 },
  { value: "20", label: "20 min", minutes: 20 },
  { value: "30", label: "30 min", minutes: 30 },
  { value: "45", label: "45 min", minutes: 45 },
  { value: "60", label: "60 min", minutes: 60 },
  { value: "90", label: "90 min", minutes: 90 },
  { value: "120", label: "120+ min", minutes: 120 },
];

/**
 * Alle scan-stappen, centraal configureerbaar. Volgorde in de array = volgorde
 * in de flow.
 */
export const scanSteps: ScanStep[] = [
  {
    id: "process",
    kind: "choice",
    heading: "Welk terugkerend werk wil je bekijken?",
    sub: "Kies het proces waar je nu het meest benieuwd naar bent.",
    allowOther: true,
    options: [
      { value: "aanvragen", label: "Aanvragen verwerken" },
      { value: "offertes", label: "Offertes maken" },
      { value: "calculaties", label: "Calculaties maken" },
      { value: "klantinformatie", label: "Klantinformatie verzamelen" },
      { value: "overnemen", label: "Gegevens overnemen" },
      { value: "planning", label: "Planning / werkvoorbereiding" },
      { value: "opvolgen", label: "Klanten opvolgen" },
      { value: "configuratieadvies", label: "Product- of configuratieadvies" },
      { value: "rapportage", label: "Rapportage / administratie" },
    ],
  },
  {
    id: "workload",
    kind: "workload",
    heading: "Hoeveel tijd gaat hierin zitten?",
    sub: "Hoe vaak dit ongeveer voorbijkomt, en hoeveel tijd het één keer kost.",
  },
  {
    id: "timeSinks",
    kind: "choice",
    heading: "Wat gebeurt er in die tijd?",
    sub: "Kies tot 4 dingen waar de tijd vooral in zit.",
    multi: true,
    max: 4,
    options: [
      { value: "verzamelen", label: "Informatie verzamelen" },
      { value: "opzoeken", label: "Dingen opzoeken" },
      { value: "vragen", label: "Klant aanvullende vragen stellen" },
      { value: "berekenen", label: "Berekenen" },
      { value: "overtypen", label: "Gegevens overtypen" },
      { value: "controleren", label: "Controleren" },
      { value: "afstemmen", label: "Intern afstemmen" },
      { value: "documenten", label: "Documenten / offertes maken" },
      { value: "plannen", label: "Planning bepalen" },
      { value: "opvolging", label: "Handmatige opvolging" },
    ],
  },
  {
    id: "automationMatrix",
    kind: "matrix",
    heading: "Hoe herhalend is dit, en hoeveel oordeel vraagt het?",
    sub: "Sleep het punt naar waar dit proces het beste past.",
  },
  {
    id: "sources",
    kind: "choice",
    heading: "Waar haal je de informatie voor dit werk vandaan?",
    multi: true,
    options: [
      { value: "email", label: "E-mail" },
      { value: "excel", label: "Excel / spreadsheets" },
      { value: "crm", label: "CRM" },
      { value: "erp", label: "ERP / boekhouding" },
      { value: "formulieren", label: "Website / formulieren" },
      { value: "pdf", label: "PDF / documenten" },
      { value: "planningsoftware", label: "Planningsoftware" },
      { value: "meerdere", label: "Verschillende systemen" },
      { value: "kennis", label: "Kennis van medewerkers" },
    ],
    note: (v) =>
      v.length >= 2
        ? "Informatie uit meerdere bronnen hoeft geen probleem te zijn. Handmatig zoeken en overnemen is vaak interessanter om naar te kijken."
        : null,
  },
  {
    id: "impact",
    kind: "choice",
    heading: "Wat merk je als dit proces niet soepel loopt?",
    sub: "Kies tot 3 dingen die het meest herkenbaar zijn.",
    multi: true,
    max: 3,
    options: [
      { value: "wachten", label: "Klant moet wachten" },
      { value: "voorwerk", label: "Veel tijd kwijt aan voorwerk" },
      { value: "blijven-liggen", label: "Aanvragen blijven liggen" },
      { value: "ontbreekt", label: "Informatie ontbreekt" },
      { value: "opnieuw-opvragen", label: "We moeten dingen opnieuw opvragen" },
      { value: "fouten", label: "Er ontstaan fouten" },
      { value: "afstemming", label: "Veel interne afstemming" },
      { value: "te-laat", label: "We reageren soms te laat" },
      { value: "interne-tijd", label: "Het kost vooral interne tijd" },
      { value: "geen-groot-probleem", label: "Eigenlijk niet zoveel — het kan alleen slimmer" },
    ],
  },
];
