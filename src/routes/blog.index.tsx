import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { blogPosts, formatDate } from "@/lib/blog";

const title = "Blog | praktisch over aanvragen, automatisering en AI | LoopWerk";
const description =
  "Nuchtere artikelen over aanvragen, offertes, koppelingen en waar AI wél en niet helpt. Voor ondernemers die minder voorwerk willen.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const tags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
  const [active, setActive] = useState<string | null>(null);
  const posts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((p) => !active || p.tags.includes(active));
  const [featured, ...rest] = posts;

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      on ? "border-forest bg-forest text-cream" : "border-line text-ink/70 hover:bg-shell"
    }`;

  return (
    <>
      <Section tone="hero">
        <Reveal>
          <Eyebrow tone="sage">Blog</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.08] md:text-6xl">
            Minder voorwerk, <span className="hand text-[1.1em]">meer</span> uit iedere aanvraag
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
            Praktisch over aanvragen, offertes, koppelingen en AI. Zonder jargon, met voorbeelden
            uit de praktijk.
          </p>
        </Reveal>
      </Section>

      <Section tone="cream">
        {tags.length > 1 ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setActive(null)} className={chip(active === null)}>
              Alles
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={chip(active === t)}
              >
                {t}
              </button>
            ))}
          </div>
        ) : null}

        {featured ? (
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group mt-10 grid overflow-hidden rounded-2xl border border-line bg-card md:grid-cols-2"
          >
            {featured.image ? (
              <img
                src={featured.image}
                alt={featured.imageAlt ?? ""}
                className="h-64 w-full object-cover md:h-full"
                loading="lazy"
              />
            ) : null}
            <div className="p-7 md:p-10">
              <p className="eyebrow text-home-accent">{featured.tags.join(" · ")}</p>
              <h2 className="mt-4 text-3xl leading-tight group-hover:underline group-hover:underline-offset-4">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink/75">{featured.excerpt}</p>
              <p className="mt-6 text-sm text-ink/55">
                {featured.author.name} · {formatDate(featured.date)} · {featured.readingMinutes} min
                lezen
              </p>
            </div>
          </Link>
        ) : null}

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.imageAlt ?? ""}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-home-accent">{p.tags.join(" · ")}</p>
                <h3 className="mt-3 text-xl leading-snug group-hover:underline group-hover:underline-offset-4">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{p.excerpt}</p>
                <p className="mt-5 text-xs text-ink/55">
                  {p.author.name} · {formatDate(p.date)} · {p.readingMinutes} min lezen
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
