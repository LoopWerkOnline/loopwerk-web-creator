import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Section, Eyebrow } from "@/components/Section";
import { formatDate, getPost, relatedPosts, type BlogBlock } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artikel niet gevonden | LoopWerk" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    const t = `${post.title} | LoopWerk`;
    return {
      meta: [
        { title: t },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: t },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
            publisher: { "@type": "Organization", name: "LoopWerk" },
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <Section>
      <h1 className="text-4xl">Dit artikel bestaat niet</h1>
      <Link to="/blog" className="mt-6 inline-block text-forest underline underline-offset-4">
        Terug naar de blog
      </Link>
    </Section>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-lg leading-relaxed text-ink/80">{block.text}</p>;
    case "h2":
      return <h2 className="pt-6 text-3xl leading-tight">{block.text}</h2>;
    case "list":
      return (
        <ul className="space-y-3 text-lg leading-relaxed text-ink/80">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-home-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="hand border-l-2 border-home-accent pl-6 text-3xl leading-snug">
          {block.text}
        </blockquote>
      );
    case "split":
      return (
        <div className="rounded-2xl border border-line bg-shell p-6 md:p-8">
          <p className="eyebrow text-home-accent">{block.title}</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {[
              { label: "Wat het systeem doet", items: block.machine },
              { label: "Wat jouw mensen doen", items: block.mens },
            ].map((col) => (
              <div key={col.label}>
                <p className="font-semibold text-ink">{col.label}</p>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-ink/75">
                  {col.items.map((item) => (
                    <li key={item}>– {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = relatedPosts(post);

  return (
    <>
      <Section tone="hero">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-sm text-cream/60 hover:text-cream">
            ← Alle artikelen
          </Link>
          <div className="mt-6">
            <Eyebrow tone="sage">{post.tags.join(" · ")}</Eyebrow>
          </div>
          <h1 className="mt-4 text-4xl leading-[1.1] md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-sm text-cream/60">
            {post.author} · {formatDate(post.date)} · {post.readingMinutes} min lezen
          </p>
        </div>
      </Section>

      <Section tone="cream">
        <article className="mx-auto max-w-3xl space-y-6">
          {post.image ? (
            <img
              src={post.image}
              alt={post.imageAlt ?? ""}
              className="mb-4 aspect-[16/9] w-full rounded-2xl object-cover"
            />
          ) : null}
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-ink-hero p-8 text-cream md:p-10">
          <h2 className="text-3xl leading-tight">Herken je dit in jullie proces?</h2>
          <p className="mt-3 leading-relaxed text-cream/75">
            Vertel wat er nu handmatig gaat, dan zeggen wij eerlijk of er iets te winnen valt.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bespreek je proces
            </Link>
            <Link
              to="/scan"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Doe de scan
            </Link>
          </div>
        </div>

        {related.length ? (
          <div className="mx-auto mt-16 max-w-3xl">
            <p className="eyebrow text-ink/50">Lees ook</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl border border-line bg-card p-6"
                >
                  <h3 className="text-xl leading-snug group-hover:underline group-hover:underline-offset-4">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink/60">{p.readingMinutes} min lezen</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
