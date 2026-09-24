import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { Section, Eyebrow } from "@/components/Section";
import {
  formatDate,
  getPost,
  relatedPosts,
  type BlogAuthor,
  type BlogBlock,
  type BlogPost,
} from "@/lib/blog";

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
        Terug naar de blog
      </Link>
    </Section>
  );
}

/** Splitst een item in de eerste zin (vet) en de rest. */
function leadSentence(text: string): [string, string] {
  const i = text.search(/[.?!]\s/);
  return i === -1 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 2)];
}

function Title({ post }: { post: BlogPost }) {
  const at = post.highlight ? post.title.indexOf(post.highlight) : -1;
  if (!post.highlight || at === -1) return <>{post.title}</>;
  return (
    <>
      {post.title.slice(0, at)}
      <span className="hand text-[1.1em]">{post.highlight}</span>
      {post.title.slice(at + post.highlight.length)}
    </>
  );
}

function Avatar({ author, size = "md" }: { author: BlogAuthor; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${
        size === "lg" ? "h-16 w-16 text-xl" : "h-11 w-11 text-sm"
      }`}
      style={{ backgroundColor: author.color }}
    >
      {author.initials}
    </span>
  );
}

function Block({ block, first }: { block: BlogBlock; first: boolean }) {
  switch (block.type) {
    case "p":
      return first ? (
        <p className="text-xl leading-relaxed text-ink md:text-2xl md:leading-relaxed">
          {block.text}
        </p>
      ) : (
        <p className="text-lg leading-relaxed text-ink/80">{block.text}</p>
      );
    case "h2":
      return <h2 className="pt-10 text-3xl leading-tight md:text-4xl">{block.text}</h2>;
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
    case "steps":
      return (
        <ol className="grid gap-4">
          {block.items.map((item, i) => {
            const [lead, rest] = leadSentence(item);
            return (
              <li
                key={item}
                className="flex gap-5 rounded-2xl border border-line bg-card p-6 md:p-7"
              >
                <span className="font-display text-3xl leading-none text-home-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl leading-snug text-ink">{lead}</p>
                  {rest ? (
                    <p className="mt-2 text-base leading-relaxed text-ink/75">{rest}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="hand my-4 border-l-2 border-home-accent py-2 pl-6 text-3xl leading-snug md:text-4xl">
          {block.text}
        </blockquote>
      );
    case "split":
      return (
        <div className="rounded-2xl border border-line bg-shell p-6 md:p-8">
          <p className="eyebrow text-home-accent">{block.title}</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {[
              { label: block.machineLabel ?? "Wat het systeem doet", items: block.machine },
              { label: block.mensLabel ?? "Wat jouw mensen doen", items: block.mens },
            ].map((col) => (
              <div key={col.label}>
                <p className="font-display text-xl text-ink">{col.label}</p>
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
        <Reveal>
          <Eyebrow tone="sage">Blog · {post.tags.join(" · ")}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.08] md:text-6xl">
            <Title post={post} />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">{post.excerpt}</p>
          <div className="mt-9 flex items-center gap-4">
            <Avatar author={post.author} />
            <div className="text-sm leading-snug">
              <p className="font-semibold text-cream">{post.author.name}</p>
              <p className="text-cream/60">
                {formatDate(post.date)} · {post.readingMinutes} min lezen
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="cream">
        {post.image ? (
          <Reveal>
            <img
              src={post.image}
              alt={post.imageAlt ?? ""}
              className="mx-auto mb-16 aspect-[21/9] w-full max-w-5xl rounded-2xl object-cover"
            />
          </Reveal>
        ) : null}

        <article className="mx-auto max-w-3xl space-y-6">
          {post.body.map((block, i) => (
            <Block key={i} block={block} first={i === 0} />
          ))}
        </article>

        <div className="mx-auto mt-16 flex max-w-3xl items-center gap-5 border-t border-line pt-10">
          <Avatar author={post.author} size="lg" />
          <div>
            <p className="eyebrow text-ink/50">Geschreven door</p>
            <p className="mt-2 font-display text-2xl text-ink">{post.author.name}</p>
            <p className="text-sm text-ink/60">{post.author.role} van LoopWerk</p>
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
