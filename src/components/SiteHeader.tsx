import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "./Logo";
import { solutions, sectors } from "@/lib/content";

const nav = [
  { to: "/oplossingen", label: "Oplossingen", children: solutions },
  { to: "/sectoren", label: "Sectoren", children: sectors },
  { to: "/cases", label: "Cases" },
  { to: "/hoe-we-werken", label: "Hoe we werken" },
  { to: "/over-loopwerk", label: "Over LoopWerk" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMobileSections, setOpenMobileSections] = useState<Record<string, boolean>>({});

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="LoopWerk home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center gap-1 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
                </Link>
                <div className="pointer-events-none absolute -left-6 top-full w-72 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="rounded-xl border border-border/70 bg-background/95 p-2 shadow-lg backdrop-blur">
                    <div className="border-b border-border/70 px-4 py-3">
                      <Link
                        to={item.to}
                        className="text-sm font-semibold text-foreground hover:text-forest"
                      >
                        Alle {item.label.toLowerCase()}
                      </Link>
                    </div>
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.slug}>
                          <Link
                            to={`${item.to}/$slug`}
                            params={{ slug: child.slug }}
                            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            )
          )}
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
            {[
              ...nav.map((n) => (n.children ? { ...n, to: `${n.to}/` as const } : n)),
              { to: "/contact", label: "Contact" },
            ].map((item) => {
              const hasChildren = "children" in item && item.children;
              const expanded = hasChildren ? openMobileSections[item.to] : false;
              return (
                <div key={item.to} className="flex flex-col">
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileSections((prev) => ({ ...prev, [item.to]: !prev[item.to] }))
                      }
                      className="flex items-center justify-between rounded-md px-2 py-3 text-left text-base font-medium text-foreground/80 hover:bg-secondary"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 text-foreground/60 transition-transform ${expanded ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
                    >
                      {item.label}
                    </Link>
                  )}
                  {hasChildren && expanded ? (
                    <ul className="ml-4 border-l border-border/70 pl-2">
                      <li>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-2 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-secondary"
                        >
                          Alle {item.label.toLowerCase()}
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.slug}>
                          <Link
                            to={`${item.to}$slug`}
                            params={{ slug: child.slug }}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-2 py-2.5 text-sm text-foreground/70 hover:bg-secondary hover:text-foreground"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

