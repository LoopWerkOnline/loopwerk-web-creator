// Controleert of de privacyverklaring en het cookiebeleid zijn nagelopen na elke wijziging in
// de bestanden die bepalen welke gegevens we verwerken. Bron: src/lib/legal.ts.
// Gebruik: npm run check:privacy (vóór elke push). Heeft de volledige git-geschiedenis nodig.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/legal.ts", "utf8");
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

if (git("rev-parse", "--is-shallow-repository") === "true") {
  // Ondiepe clone (zoals in cloudsessies): eerst de volledige geschiedenis ophalen.
  try {
    git("fetch", "--quiet", "--unshallow");
  } catch {
    console.log("check:privacy overgeslagen: ondiepe git-clone, datums zijn niet betrouwbaar.");
    process.exit(0);
  }
}

let failed = false;
for (const page of ["privacy", "cookies"]) {
  const block = src.slice(src.indexOf(`${page}: {`));
  const reviewed = block.match(/reviewed: "(\d{4}-\d{2}-\d{2})"/)[1];
  const watches = [...block.slice(0, block.indexOf("]")).matchAll(/"(src\/[^"]+)"/g)].map(
    (m) => m[1],
  );
  // Ook nog niet gecommitte wijzigingen tellen mee (datum van vandaag).
  const dirty = git("status", "--porcelain", "--", ...watches);
  const today = new Date().toISOString().slice(0, 10);
  for (const file of watches) {
    const date = dirty.includes(file) ? today : git("log", "-1", "--format=%cs", "--", file);
    if (date && date > reviewed) {
      failed = true;
      console.error(`✗ ${page}: ${file} gewijzigd op ${date}, tekst nagelopen op ${reviewed}.`);
    }
  }
}

if (failed) {
  console.error(
    "\nLoop /privacy en /cookies na, pas de tekst aan als er iets is veranderd in wat we verwerken,\n" +
      "en werk de datums bij in src/lib/legal.ts (updated alleen bij een tekstwijziging, reviewed altijd).",
  );
  process.exit(1);
}
console.log("✓ Privacyverklaring en cookiebeleid zijn bijgewerkt.");
