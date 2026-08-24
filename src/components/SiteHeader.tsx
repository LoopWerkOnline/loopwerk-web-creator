import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "./Logo";
import { solutions, sectors } from "@/lib/content";

type NavItem = { to: "/cases" | "/hoe-we-werken" | "/over-loopwerk"; label: string };

const plainNav: NavItem[] = [
  { to: "/cases", label: "Cases" },
  { to: "/hoe-we-werken", label: "Hoe we werken" },
  { to: "/over-loopwerk", label: "Over LoopWerk" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showMenu = open || hovered;

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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="LoopWerk home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {/* Oplossingen dropdown */}
          <div className="group relative">
            <Link
              to="/oplossingen"
              className="flex items-center gap-1 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
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
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-copper"
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
                        <span className="mt-0.5 text-xs font-semibold text-copper">{s.n}</span>
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

          {/* Sectoren dropdown */}
          <div className="group relative">
            <Link
              to="/sectoren"
              className="flex items-center gap-1 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Voor wie
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full w-[min(52rem,90vw)] -translate-x-1/2 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-2xl border border-border/70 bg-background/98 p-6 shadow-xl backdrop-blur">
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border/70 pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
                    Sectoren
                  </p>
                  <Link
                    to="/sectoren"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-copper"
                  >
                    Alle sectoren
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-1">
                  {sectors.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/sectoren/$slug"
                        params={{ slug: s.slug }}
                        className="group/item block rounded-xl p-3 transition-colors hover:bg-secondary"
                      >
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
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bespreek je proces
          </Link>
        </nav>

        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {/* Oplossingen mobile */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  setMobileExpanded((prev) => (prev === "oplossingen" ? null : "oplossingen"))
                }
                className="flex items-center justify-between rounded-md px-2 py-3 text-left text-base font-medium text-foreground/80 hover:bg-secondary"
              >
                Oplossingen
                <ChevronDown
                  className={`h-5 w-5 text-foreground/60 transition-transform ${mobileExpanded === "oplossingen" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {mobileExpanded === "oplossingen" ? (
                <ul className="ml-4 border-l border-border/70 pl-2">
                  <li>
                    <Link
                      to="/oplossingen"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-secondary"
                    >
                      Alle oplossingen
                    </Link>
                  </li>
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/oplossingen/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-2 py-2.5 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Sectoren mobile */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  setMobileExpanded((prev) => (prev === "sectoren" ? null : "sectoren"))
                }
                className="flex items-center justify-between rounded-md px-2 py-3 text-left text-base font-medium text-foreground/80 hover:bg-secondary"
              >
                Sectoren
                <ChevronDown
                  className={`h-5 w-5 text-foreground/60 transition-transform ${mobileExpanded === "sectoren" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {mobileExpanded === "sectoren" ? (
                <ul className="ml-4 border-l border-border/70 pl-2">
                  <li>
                    <Link
                      to="/sectoren"
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-2 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-secondary"
                    >
                      Alle sectoren
                    </Link>
                  </li>
                  {sectors.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/sectoren/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-2 py-2.5 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {plainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-copper px-5 py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}


