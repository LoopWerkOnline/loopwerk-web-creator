/** Gedeelde types voor de Loopwerk Scan. Prototype: alles client-side, geen backend. */

export type ChoiceOption = {
  value: string;
  label: string;
};

/** Eén stap in de scan. `kind` bepaalt welk input-component wordt gerenderd. */
export type ScanStep =
  | {
      id: string;
      kind: "choice";
      heading: string;
      sub?: string;
      options: ChoiceOption[];
      multi?: boolean;
      max?: number;
      allowOther?: boolean;
      note?: (value: string[]) => string | null;
    }
  | {
      id: "workload";
      kind: "workload";
      heading: string;
      sub?: string;
    }
  | {
      id: "automationMatrix";
      kind: "matrix";
      heading: string;
      sub?: string;
    };

export type ScanAnswers = {
  process: string;
  processOther: string;
  /** Aantal keer per week, continu (1 t/m 75; 75 betekent "75+"). */
  volume: number;
  /** Minuten per keer, continu (5 t/m 120; 120 betekent "120+"). */
  duration: number;
  timeSinks: string[];
  repetition: number;
  judgment: number;
  sources: string[];
  impact: string[];
};

export const initialAnswers: ScanAnswers = {
  process: "",
  processOther: "",
  volume: 23,
  duration: 30,
  timeSinks: [],
  repetition: 3,
  judgment: 3,
  sources: [],
  impact: [],
};

export type ScanScore = {
  total: number;
  band: "beperkt" | "gericht" | "duidelijk" | "hoog";
  bandLabel: string;
  hoursPerWeek: number;
  reviewLow: number;
  reviewHigh: number;
  dimensions: { label: string; text: string }[];
};
