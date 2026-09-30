import { createFileRoute, Link } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { getSiteSections } from "@/lib/site-pages";

const title = "Sitemap | LoopWerk";
const description = "Overzicht van alle pagina's op de website van LoopWerk, per onderdeel.";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SitemapPage,
});

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function SitemapPage() {
  const sections = getSiteSections();
  const total = sections.reduce((n, s) => n + s.pages.length, 0);

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Sitemap</Eyebrow>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">Alle pagina's op een rij</h1>
        <p className="mt-3 text-sm text-ink/55">{total} pagina's</p>

        <div className="mt-10 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-line bg-shell p-6">
              <h2 className="text-2xl text-ink">{section.title}</h2>
              <div className="mt-3 divide-y divide-line">
                {section.pages.map((page) => (
                  <div key={page.path} className="flex items-baseline justify-between gap-4 py-3">
                    <Link
                      to={page.path}
                      className="text-ink underline-offset-4 hover:text-home-accent hover:underline"
                    >
                      {page.title}
                    </Link>
                    <span className="shrink-0 text-sm text-ink/55">{formatDate(page.lastmod)}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink/55">
          Voor zoekmachines staat hetzelfde overzicht in{" "}
          <a href="/sitemap.xml" className="underline underline-offset-4">
            sitemap.xml
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
