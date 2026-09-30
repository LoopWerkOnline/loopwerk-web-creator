// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Laatste git-commitdatum (JJJJ-MM-DD) per bron- en routebestand, voor lastmod in de sitemap.
 * Zonder git-geschiedenis (bv. een ondiepe clone) valt een bestand terug op de builddatum.
 */
const buildDate = new Date().toISOString().slice(0, 10);
function gitDates(): Record<string, string> {
  const files = [
    ...readdirSync("src/routes").map((f) => `src/routes/${f}`),
    "src/lib/content.ts",
    "src/lib/cases.ts",
    "src/lib/blog.ts",
  ];
  const out: Record<string, string> = {};
  for (const file of files) {
    try {
      // Zonder shell, zodat namen als oplossingen.$slug.tsx niet worden uitgeklapt.
      const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
        encoding: "utf8",
      }).trim();
      if (date) out[file] = date;
    } catch {
      /* geen git: builddatum wordt gebruikt */
    }
  }
  return out;
}

export default defineConfig({
  vite: {
    define: {
      __GIT_DATES__: JSON.stringify(gitDates()),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
  },
  // Hosting draait op Vercel (niet Lovable/Cloudflare): bouw expliciet voor Vercel.
  nitro: { preset: "vercel" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
