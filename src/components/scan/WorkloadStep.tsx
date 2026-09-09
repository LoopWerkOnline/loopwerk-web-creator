import { durationOptions, volumeOptions } from "@/lib/scan/questions";

import { TimeSlider } from "./TimeSlider";

/** Volume + tijdsduur op één scherm, met een live doorgerekende regel eronder. */
export function WorkloadStep({
  volume,
  duration,
  onVolumeChange,
  onDurationChange,
}: {
  volume: string;
  duration: string;
  onVolumeChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}) {
  const v = volumeOptions.find((o) => o.value === volume) ?? volumeOptions[2]!;
  const d = durationOptions.find((o) => o.value === duration) ?? durationOptions[3]!;
  const hours = Math.round(((v.midpoint * d.minutes) / 60) * 10) / 10;

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm font-medium text-ink/60">Hoe vaak komt dit ongeveer voorbij?</p>
        <div className="mt-5">
          <TimeSlider options={volumeOptions} value={volume} onChange={onVolumeChange} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink/60">Hoeveel tijd kost één keer ongeveer?</p>
        <div className="mt-5">
          <TimeSlider options={durationOptions} value={duration} onChange={onDurationChange} />
        </div>
      </div>

      <p
        className="fade-up rounded-xl border border-line bg-shell px-5 py-4 text-sm leading-relaxed text-ink/75"
        key={`calc-${volume}-${duration}`}
      >
        Bij {v.label.toLowerCase()} × {d.label.toLowerCase()} is dat ±{hours} uur per week.
      </p>
    </div>
  );
}
