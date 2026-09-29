import { durationRange, formatDuration, formatVolume, volumeRange } from "@/lib/scan/questions";

import { TimeSlider } from "./TimeSlider";

/** Volume + tijdsduur op één scherm, met een live doorgerekende regel eronder. */
export function WorkloadStep({
  volume,
  duration,
  onVolumeChange,
  onDurationChange,
}: {
  volume: number;
  duration: number;
  onVolumeChange: (value: number) => void;
  onDurationChange: (value: number) => void;
}) {
  const hours = Math.round(((volume * duration) / 60) * 10) / 10;

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm font-medium text-ink/60">Hoe vaak komt dit ongeveer voorbij?</p>
        <div className="mt-5">
          <TimeSlider
            min={volumeRange.min}
            max={volumeRange.max}
            value={volume}
            onChange={onVolumeChange}
            format={formatVolume}
            minLabel={`${volumeRange.min}–5 per week`}
            maxLabel={`${volumeRange.max}+ per week`}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink/60">Hoeveel tijd kost één keer ongeveer?</p>
        <div className="mt-5">
          <TimeSlider
            min={durationRange.min}
            max={durationRange.max}
            value={duration}
            onChange={onDurationChange}
            format={formatDuration}
            minLabel={`${durationRange.min} min`}
            maxLabel={`${durationRange.max}+ min`}
          />
        </div>
      </div>

      <p className="rounded-xl border border-line bg-shell px-5 py-4 text-sm leading-relaxed text-ink/75">
        Bij {formatVolume(volume).toLowerCase()} × {formatDuration(duration).toLowerCase()} is dat ±
        {hours} uur per week.
      </p>
    </div>
  );
}
