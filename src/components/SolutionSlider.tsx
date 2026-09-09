import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import type { Solution } from "@/lib/content";

type Props = {
  items: Solution[];
};

export function SolutionSlider({ items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 24;
    setActive(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 24;
    const max = items.length - 1;
    const next = Math.min(Math.max(index, 0), max);
    el.scrollTo({ left: next * step, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollTo(active - 1)}
          aria-label="Vorige oplossing"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream transition-colors hover:border-forest disabled:opacity-40"
          disabled={active === 0}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollTo(active + 1)}
          aria-label="Volgende oplossing"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-cream transition-colors hover:border-forest disabled:opacity-40"
          disabled={active >= items.length - 1}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
      >
        {items.map((s) => (
          <Link
            key={s.slug}
            to="/oplossingen/$slug"
            params={{ slug: s.slug }}
            className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-line bg-cream transition-colors hover:border-forest sm:w-[60%] md:w-[calc((100%-1.5rem)/2)]"
          >
            {s.image ? (
              <img
                src={s.image}
                alt={s.imageAlt ?? ""}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center bg-shell">
                <span className="hand text-6xl text-forest/50">{s.n}</span>
              </div>
            )}
            <div className="flex flex-1 flex-col p-8 md:p-10">
              <span className="eyebrow text-home-accent">{s.n}</span>
              <h2 className="mt-4 text-2xl md:text-3xl">{s.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink/70">{s.short}</p>
              <span className="mt-6 text-sm font-semibold text-forest underline underline-offset-4">
                Bekijk deze richting
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Ga naar ${s.title}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-home-accent" : "w-2 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
