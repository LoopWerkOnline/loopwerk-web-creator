/** Hulpjes voor gestructureerde data (schema.org) die Google in zoekresultaten gebruikt. */
export const SITE_URL = "https://www.loopwerkonline.nl";

export const publisher = {
  "@type": "Organization",
  name: "LoopWerk",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/loopwerk-mark.png` },
};

/** Kruimelpad, bv. [["Blogs", "/blog"], ["Titel", "/blog/slug"]]. Home komt er vanzelf voor. */
export function breadcrumbs(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as const, ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

/** FAQPage: vragen en antwoorden als paren, zodat zoekmachines en AI-tools ze herkennen. */
export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "nl-NL",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
