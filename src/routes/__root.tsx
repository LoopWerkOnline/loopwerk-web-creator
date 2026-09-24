import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Section, Eyebrow } from "@/components/Section";
import { CookieBanner } from "@/components/CookieBanner";
import { trackPageView } from "@/lib/tracking";
import { reportLovableError } from "../lib/lovable-error-reporting";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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
  url: "https://www.loopwerkonline.nl",
  description:
    "LoopWerk bouwt praktische digitale tools en automatiseringen voor Nederlandse bedrijven.",
  email: "info@loopwerkonline.nl",
  areaServed: "NL",
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <HeadContent />
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
