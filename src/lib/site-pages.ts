import { blogPosts } from "./blog";
import { cases } from "./cases";
import { solutions } from "./content";

/**
 * Eén bron voor alle publieke, indexeerbare pagina's. Gebruikt door /sitemap.xml en /sitemap.
 * Nieuwe vaste pagina: hier toevoegen. Oplossingen, cases en blogs komen vanzelf uit de content.
 */

declare const __GIT_DATES__: Record<string, string>;
declare const __BUILD_DATE__: string;

export const SITE_URL = "https://www.loopwerkonline.nl";

export type SitePage = { title: string; path: string; lastmod: string };
export type SiteSection = { title: string; pages: SitePage[] };

/** Laatste git-commitdatum van het nieuwste van deze bestanden; anders de builddatum. */
function changed(...files: string[]): string {
  const dates = files.map((f) => __GIT_DATES__[f]).filter((d): d is string => Boolean(d));
  return dates.length ? dates.sort().at(-1)! : __BUILD_DATE__;
}

const latest = (...dates: string[]) => [...dates].sort().at(-1)!;

export function getSiteSections(): SiteSection[] {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const postDate = (p: (typeof blogPosts)[number]) => p.updated ?? p.date;
  const newestPost = posts.length ? latest(...posts.map(postDate)) : __BUILD_DATE__;

  return [
    {
      title: "Algemeen",
      pages: [
        {
          title: "Home",
          path: "/",
          lastmod: changed("src/routes/index.tsx", "src/lib/content.ts"),
        },
        {
          title: "Oplossingen",
          path: "/oplossingen",
          lastmod: changed("src/routes/oplossingen.index.tsx", "src/lib/content.ts"),
        },
        {
          title: "Cases",
          path: "/cases",
          lastmod: changed("src/routes/cases.index.tsx", "src/lib/cases.ts"),
        },
        {
          title: "Blogs",
          path: "/blog",
          lastmod: latest(changed("src/routes/blog.index.tsx"), newestPost),
        },
        {
          title: "Over LoopWerk",
          path: "/over-loopwerk",
          lastmod: changed("src/routes/over-loopwerk.tsx"),
        },
        { title: "Loopwerk Scan", path: "/scan", lastmod: changed("src/routes/scan.tsx") },
        {
          title: "FAQ",
          path: "/faq",
          lastmod: changed("src/routes/faq.tsx", "src/lib/content.ts"),
        },
        { title: "Contact", path: "/contact", lastmod: changed("src/routes/contact.tsx") },
        {
          title: "Sitemap",
          path: "/sitemap",
          lastmod: changed("src/routes/sitemap.tsx", "src/lib/site-pages.ts"),
        },
      ],
    },
    {
      title: "Oplossingen",
      pages: solutions.map((s) => ({
        title: s.title,
        path: `/oplossingen/${s.slug}`,
        lastmod: changed("src/routes/oplossingen.$slug.tsx", "src/lib/content.ts"),
      })),
    },
    {
      title: "Cases",
      pages: cases.map((c) => ({
        title: `${c.client}: ${c.title}`,
        path: c.href,
        lastmod: changed(
          `src/routes${c.href.replace(/\//g, ".").replace(/^\./, "/")}.tsx`,
          "src/lib/cases.ts",
        ),
      })),
    },
    {
      title: "Blog",
      pages: posts.map((p) => ({ title: p.title, path: `/blog/${p.slug}`, lastmod: postDate(p) })),
    },
    {
      title: "Juridisch",
      pages: [
        {
          title: "Privacyverklaring",
          path: "/privacy",
          lastmod: changed("src/routes/privacy.tsx"),
        },
        { title: "Cookiebeleid", path: "/cookies", lastmod: changed("src/routes/cookies.tsx") },
      ],
    },
  ].filter((s) => s.pages.length > 0);
}

/** Canonieke URL: altijd https://www., zonder slash aan het eind (behalve de homepage). */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/+$/, "")}`;
}
