import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "./Logo";
import { solutions } from "@/lib/content";

type NavItem = { to: "/cases" | "/scan" | "/over-loopwerk"; label: string };

const plainNav: NavItem[] = [
  { to: "/cases", label: "Cases" },
  { to: "/scan", label: "Scan" },
  { to: "/over-loopwerk", label: "Over Ons" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showMenu = open || hovered;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || showMenu;

  const startHoverClose = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setHovered(false), 200);
  };

  const cancelHoverClose = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  };

  const closeMenu = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpen(false);
    setHovered(false);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6">
      <div className="mx-auto max-w-6xl">
      <div
        className={`flex items-center rounded-full border px-5 py-3 transition-colors duration-300 md:px-7 ${
          solid
            ? "border-border/70 bg-cream/90 shadow-lg shadow-black/5 backdrop-blur"
            : "border-cream/15 bg-ink-hero/70 shadow-sm shadow-black/10 backdrop-blur-md"
        }`}
      >
        <Link to="/" aria-label="LoopWerk home" className="shrink-0">
          <Logo variant={solid ? "ink" : "cream"} />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-12 lg:flex">
          {/* Oplossingen dropdown */}
          <div className="group relative">
            <Link
              to="/oplossingen"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                solid ? "text-foreground/75 hover:text-foreground" : "text-cream/80 hover:text-cream"
              }`}
              activeProps={{ className: solid ? "text-foreground" : "text-cream" }}
            >
              Oplossingen
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full w-[min(58rem,90vw)] -translate-x-1/2 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-2xl border border-border/70 bg-background/98 p-6 shadow-xl backdrop-blur">
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border/70 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                    Oplossingen
                  </p>
                  <Link
                    to="/oplossingen"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-home-accent"
                  >
                    Alle oplossingen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-1">
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/oplossingen/$slug"
                        params={{ slug: s.slug }}
                        className="group/item flex gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                      >
                        <span className="mt-0.5 text-xs font-semibold text-home-accent">{s.n}</span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-base font-semibold text-foreground">
                            {s.title}
                            <ArrowRight
                              className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-foreground/60">
                            {s.short}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>



          {plainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium transition-colors ${
                solid ? "text-foreground/75 hover:text-foreground" : "text-cream/80 hover:text-cream"
              }`}
              activeProps={{ className: solid ? "text-foreground" : "text-cream" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden shrink-0 rounded-full bg-home-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:block"
        >
          Bespreek je proces
        </Link>

        <button
          type="button"
          className={`ml-auto transition-colors lg:hidden ${solid ? "text-foreground" : "text-cream"}`}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={showMenu}
          onClick={() => setOpen((v) => !v)}
          onMouseOver={cancelHoverClose}
          onMouseOut={startHoverClose}
        >
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {showMenu ? (
        <div
          className="mt-2 overflow-hidden rounded-2xl border border-border bg-background shadow-lg lg:hidden"
          onMouseOver={cancelHoverClose}
          onMouseOut={startHoverClose}
        >
          <nav className="flex flex-col gap-1 px-5 py-4">
            <Link
              to="/oplossingen"
              onClick={closeMenu}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
            >
              Oplossingen
            </Link>
            <Link
              to="/cases"
              onClick={closeMenu}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
            >
              Cases
            </Link>
            <Link
              to="/scan"
              onClick={closeMenu}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
            >
              Scan
            </Link>

            <Link
              to="/over-loopwerk"
              onClick={closeMenu}
              className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
            >
              Over Ons
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-2 rounded-full bg-home-accent px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
          </nav>
        </div>
      ) : null}
      </div>
    </header>
  );
}


