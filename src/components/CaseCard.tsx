import { Link } from "@tanstack/react-router";

import type { CaseStudy } from "@/lib/cases";

/** Herhaalbare case-kaart: klantnaam/logo, status, lopende tekst + één uitgelichte resultaatregel. */
export function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-cream">
      <div className="grid gap-10 p-9 md:grid-cols-[1fr_1.1fr] md:items-center md:p-12">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {c.logo ? (
              <img src={c.logo} alt={c.logoAlt ?? c.client} className="h-7 w-auto object-contain" />
            ) : (
              <p className="eyebrow text-forest">{c.client}</p>
            )}
            <span
              className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${
                c.status === "live" ? "bg-forest/10 text-forest" : "bg-copper/10 text-copper"
              }`}
            >
              {c.status === "live" ? "Live" : "In productie"}
            </span>
          </div>

          <h2 className="mt-3 text-4xl leading-tight">{c.title}</h2>

          <p className="mt-4 leading-relaxed text-ink/70">{c.description}</p>
          <p className="mt-4 font-medium leading-relaxed text-ink">{c.result}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={c.href}
              className="inline-flex rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Lees de case
            </Link>
            {c.liveUrl ? (
              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
              >
                Bekijk live ↗
              </a>
            ) : null}
          </div>
        </div>

        <img
          src={c.image}
          alt={c.imageAlt}
          loading="lazy"
          className="mx-auto aspect-[16/9] w-full max-w-2xl rounded-xl object-cover"
        />
      </div>
    </article>
  );
}
