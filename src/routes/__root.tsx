import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Section, Eyebrow } from "@/components/Section";
import { CookieBanner } from "@/components/CookieBanner";
import { trackPageView } from "@/lib/tracking";
import { reportLovableError } from "../lib/lovable-error-reporting";

/** Het enige adres dat zoekmachines moeten indexeren (ook als de site op vercel.app draait). */
const SITE_URL = "https://www.loopwerkonline.nl";

function NotFoundComponent() {
  return (
    <Section tone="cream">
      <div className="mx-auto max-w-xl py-10 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">Deze pagina bestaat niet (meer)</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          Misschien is de link verouderd of zit er een typfout in. Zoek je iets specifieks, dan
          helpen we je graag verder.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Naar de homepage
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
          >
            Bespreek je proces
          </Link>
        </div>
      </div>
    </Section>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-xl py-10 text-center">
        <Eyebrow>Foutmelding</Eyebrow>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">Deze pagina laadde niet goed</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          Er ging aan onze kant iets mis. Probeer het opnieuw, of ga terug naar de homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-home-accent px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Opnieuw proberen
          </button>
          <a
            href="/"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-shell"
          >
            Naar de homepage
          </a>
        </div>
      </div>
    </Section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LoopWerk | Terugkerend werk. Geregeld." },
      {
        name: "description",
        content:
          "LoopWerk bouwt praktische digitale tools en automatiseringen voor Nederlandse bedrijven.",
      },
      { name: "author", content: "LoopWerk" },
      { property: "og:site_name", content: "LoopWerk" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:locale", content: "nl_NL" },
      // Google Search Console (openbare verificatiecode, geen geheim).
      { name: "google-site-verification", content: "5tVJV2s7YnpT70MagSk-KMXRnok6dQ_Lo6r2TntpUSk" },
      { property: "og:image", content: `${SITE_URL}/hero/hero-kantoor.jpg` },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Favicon (ook wat Google naast de zoekresultaten toont): vierkant, veelvouden van 48px.
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { rel: "icon", href: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=Caveat:wght@500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LoopWerk",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512.png`,
  description:
    "LoopWerk bouwt praktische digitale tools en automatiseringen voor Nederlandse bedrijven.",
  email: "info@loopwerkonline.nl",
  areaServed: "NL",
};

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;

  return (
    <html lang="nl">
      <head>
        <HeadContent />
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    // Eerste pageview komt van de scripts zelf; dit dekt navigatie binnen de app.
    return router.subscribe("onResolved", (event) => {
      if (event.fromLocation && event.fromLocation.pathname !== event.toLocation.pathname) {
        trackPageView(event.toLocation.pathname);
      }
    });
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <CookieBanner />
    </QueryClientProvider>
  );
}
