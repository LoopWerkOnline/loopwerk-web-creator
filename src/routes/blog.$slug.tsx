import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PhotoHero } from "@/components/PhotoHero";
import { Reveal } from "@/components/Reveal";
import { Section, Eyebrow } from "@/components/Section";
import { formatDate, getPost, relatedPosts, type BlogAuthor, type BlogBlock } from "@/lib/blog";

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
        { property: "og:image", content: `https://www.loopwerkonline.nl${post.image}` },
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
            author: { "@type": "Person", name: post.author.name },
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
        Terug naar de blogs
      </Link>
    </Section>
  );
}

function Avatar({ author }: { author: BlogAuthor }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
      style={{ backgroundColor: author.color }}
    >
      {author.initials}
    </span>
  );
}

function PromptBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Kopiëren niet toegestaan; de tekst blijft selecteerbaar. */
    }
  };
  return (
    <div className="rounded-2xl border border-line bg-shell p-6 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-forest">Prompt</p>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-cream"
        >
          {copied ? "Gekopieerd" : "Kopieer"}
        </button>
      </div>
      <p className="mt-4 text-base leading-relaxed text-ink">{text}</p>
    </div>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-lg leading-relaxed text-ink/80">{block.text}</p>;
    case "h2":
      return <h2 className="pt-8 text-3xl leading-tight">{block.text}</h2>;
    case "prompt":
      return <PromptBlock text={block.text} />;
  }
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = relatedPosts(post);

  return (
    <>
      <PhotoHero
        image={post.image}
        imageAlt={post.imageAlt}
        eyebrow={post.label}
        title={post.title}
      >
        <div className="flex items-center gap-4">
          <Avatar author={post.author} />
          <div className="text-sm leading-snug">
            <p className="font-semibold text-cream">{post.author.name}</p>
            <p className="text-cream/65">
              {formatDate(post.date)} · {post.readingMinutes} min lezen
            </p>
          </div>
        </div>
      </PhotoHero>

      <Section tone="cream">
        <article className="mx-auto max-w-2xl space-y-6">
          <p className="text-xl leading-relaxed text-ink">{post.excerpt}</p>
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        <div className="mx-auto mt-14 flex max-w-2xl items-center gap-4 border-t border-line pt-8">
          <Avatar author={post.author} />
          <p className="text-sm text-ink/70">
            Geschreven door <span className="font-semibold text-ink">{post.author.name}</span>,{" "}
            {post.author.role.toLowerCase()} van LoopWerk.
          </p>
        </div>

        {related.length ? (
          <div className="mx-auto mt-14 max-w-2xl">
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

      <Section tone="ink">
        <Reveal>
          <Eyebrow tone="sage">Verder praten</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-4xl leading-tight md:text-5xl">
            Herken je dit in jullie proces?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/75">
            Vertel wat er nu handmatig gaat, dan zeggen wij eerlijk of er iets te winnen valt.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
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
        </Reveal>
      </Section>
    </>
  );
}
