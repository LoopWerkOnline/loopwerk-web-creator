import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [mobileExpanded, setMobileExpanded] = useState<"oplossingen" | "sectoren" | null>(null);

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
            <div className="pointer-events-none absolute -left-6 top-full w-80 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-xl border border-border/70 bg-background/95 p-2 shadow-lg backdrop-blur">
                <div className="border-b border-border/70 px-4 py-3">
                  <Link
                    to="/oplossingen"
                    className="text-sm font-semibold text-foreground hover:text-forest"
                  >
                    Alle oplossingen
                  </Link>
                </div>
                <ul className="py-2">
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/oplossingen/$slug"
                        params={{ slug: s.slug }}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {s.title}
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
              Sectoren
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="pointer-events-none absolute -left-6 top-full w-80 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-xl border border-border/70 bg-background/95 p-2 shadow-lg backdrop-blur">
                <div className="border-b border-border/70 px-4 py-3">
                  <Link
                    to="/sectoren"
                    className="text-sm font-semibold text-foreground hover:text-forest"
                  >
                    Alle sectoren
                  </Link>
                </div>
                <ul className="py-2">
                  {sectors.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/sectoren/$slug"
                        params={{ slug: s.slug }}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {s.title}
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


