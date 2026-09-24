import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { CONSENT_EVENT } from "@/lib/tracking";

const title = "Cookiebeleid | LoopWerk";
const description = "Welke cookies LoopWerk gebruikt en hoe je je keuze aanpast.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalPage eyebrow="Cookies" title="Cookiebeleid" updated="24 september 2026">
      <p>
        We plaatsen alleen analytische en marketingcookies als je daar toestemming voor geeft.
        Zonder toestemming werkt de site gewoon, en laden we geen meetscripts.
      </p>

      <h2>Noodzakelijk (altijd)</h2>
      <ul>
        <li>
          <strong>lw-cookie-consent</strong> (lokale opslag): onthoudt je cookiekeuze. Blijft tot je
          hem wist.
        </li>
      </ul>

      <h2>Alleen na toestemming</h2>
      <ul>
        <li>
          <strong>Google Analytics</strong> (<code>_ga</code>, <code>_ga_*</code>): meet hoe de site
          gebruikt wordt, met ingekort IP-adres. Bewaartermijn tot 2 jaar.
        </li>
        <li>
          <strong>HubSpot</strong> (<code>hubspotutk</code>, <code>__hstc</code>,{" "}
          <code>__hssc</code>, <code>__hssrc</code>): koppelt bezochte pagina's aan je aanvraag als
          je een formulier invult, zodat we je beter kunnen helpen. Bewaartermijn tot 6 maanden.
        </li>
      </ul>

      <h2>Je keuze aanpassen</h2>
      <p>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
          className="underline underline-offset-4"
        >
          Open de cookie-instellingen
        </button>{" "}
        of wis de cookies in je browser. Meer over hoe we met gegevens omgaan staat in de{" "}
        <Link to="/privacy">privacyverklaring</Link>.
      </p>
    </LegalPage>
  );
}
