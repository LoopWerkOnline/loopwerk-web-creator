import { createFileRoute, Link } from "@tanstack/react-router";

import { PhotoHero } from "@/components/PhotoHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { blogPosts, formatDate } from "@/lib/blog";

const title = "Blogs | praktisch over aanvragen, automatisering en AI | LoopWerk";
const description =
  "Praktische blogs per sector: direct toepasbare tips over aanvragen, offertes, klanten vinden en waar AI wél en niet helpt.";

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
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PhotoHero
        image="/oplossingen/opl-3.jpg"
        imageAlt="Een offerte die aan tafel wordt voorbereid"
        eyebrow="Blogs"
        title={
          <>
            Praktisch en direct <span className="hand text-[1.1em]">toepasbaar</span>
          </>
        }
      >
        <p className="text-lg leading-relaxed text-cream/75">
          Praktische tips over aanvragen, offertes en klanten vinden. Zonder jargon, zodat je er
          vandaag mee aan de slag kunt.
        </p>
      </PhotoHero>

      <Section tone="cream">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 3) * 0.08}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow hover:shadow-md"
              >
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow text-home-accent">{p.label}</p>
                  <h2 className="mt-4 text-2xl leading-snug group-hover:underline group-hover:underline-offset-4">
                    {p.title}
                  </h2>
                  <p className="mt-4 flex-1 leading-relaxed text-ink/70">{p.excerpt}</p>
                  <p className="mt-6 text-sm text-ink/55">
                    {p.author.name} · {formatDate(p.date)} · {p.readingMinutes} min lezen
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
