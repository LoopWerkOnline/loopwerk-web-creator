import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";
import { solutions } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="cream" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              Wij bouwen praktische digitale tools en automatiseringen voor Nederlandse bedrijven.
              Werk dat elke week terugkomt, hoeft niet elke week handwerk te zijn.
            </p>
          </div>

          <div>
            <p className="eyebrow text-sage">Pagina's</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/oplossingen", label: "Oplossingen" },
                { to: "/sectoren", label: "Sectoren" },
                { to: "/cases", label: "Cases" },
                { to: "/hoe-we-werken", label: "Hoe we werken" },
                { to: "/over-loopwerk", label: "Over LoopWerk" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-cream/75 transition-colors hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sage">Oplossingen</p>
            <ul className="mt-4 space-y-2 text-sm">
              {solutions.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/oplossingen/$slug"
                    params={{ slug: s.slug }}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-sage">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/75">
              <li>Nederland</li>
              <li>
                <Link to="/contact" className="underline underline-offset-4 hover:text-cream">
                  Stuur een bericht
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} LoopWerk</span>
          <span>Workflows. Connected.</span>
        </div>
      </div>
    </footer>
  );
}
