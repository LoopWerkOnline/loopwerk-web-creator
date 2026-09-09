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
      id: string;
      kind: "scale";
      heading: string;
      sub?: string;
      leftLabel: string;
      rightLabel: string;
      variant: "dots" | "bar";
      note: (value: number) => string;
    }
  | {
      id: "volume";
      kind: "volume";
      heading: string;
      sub?: string;
      options: { value: string; label: string; midpoint: number }[];
    }
  | {
      id: "duration";
      kind: "duration";
      heading: string;
      sub?: string;
      options: { value: string; label: string; minutes: number }[];
    };

export type ScanAnswers = {
  process: string;
  processOther: string;
  volume: string;
  duration: string;
  timeSinks: string[];
  repetition: number;
  judgment: number;
  sources: string[];
  impact: string[];
  team: string;
};

export const initialAnswers: ScanAnswers = {
  process: "",
  processOther: "",
  volume: "16-30",
  duration: "30",
  timeSinks: [],
  repetition: 3,
  judgment: 3,
  sources: [],
  impact: [],
  team: "",
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
