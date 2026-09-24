import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/LegalPage";
import { company } from "@/lib/company";

const title = "Privacyverklaring | LoopWerk";
const description = "Welke gegevens LoopWerk verwerkt, waarom, hoe lang en met wie.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage eyebrow="Privacy" title="Privacyverklaring" updated="24 september 2026">
      <p>
        {company.name} (hierna: LoopWerk), {company.address}, KvK {company.kvk}, is verantwoordelijk
        voor de verwerking van persoonsgegevens via deze website. Vragen? Mail naar{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Welke gegevens en waarom</h2>
      <ul>
        <li>
          <strong>Contactformulier:</strong> naam, e-mailadres, en als je die invult telefoonnummer,
          bedrijfsnaam en je bericht. We gebruiken dit om op je aanvraag te reageren. Grondslag: je
          verzoek om contact (uitvoering van een overeenkomst, of stappen daarvoor).
        </li>
        <li>
          <strong>Loopwerk Scan:</strong> voornaam, e-mailadres, bedrijfsnaam en je antwoorden en
          uitkomst van de scan. We gebruiken dit om je de analyse te sturen en daarover contact op
          te nemen. Grondslag: je verzoek om de analyse.
        </li>
        <li>
          <strong>Websitegebruik:</strong> alleen als je cookies accepteert, meten we met Google
          Analytics en HubSpot welke pagina's bezocht worden. Grondslag: toestemming. Zie het{" "}
          <Link to="/cookies">cookiebeleid</Link>.
        </li>
      </ul>

      <h2>Met wie we gegevens delen</h2>
      <p>We verkopen geen gegevens. We werken met deze verwerkers:</p>
      <ul>
        <li>Supabase: opslag van formulierinzendingen.</li>
        <li>HubSpot: ons klantsysteem (CRM), voor opvolging van aanvragen.</li>
        <li>Resend: het versturen van e-mailnotificaties.</li>
        <li>Vercel: hosting van de website.</li>
        <li>Google (Analytics): alleen na toestemming.</li>
      </ul>
      <p>
        Een deel van deze partijen zit (ook) buiten de EU. Doorgifte gebeurt op basis van het EU-VS
        Data Privacy Framework of standaardcontractbepalingen van de Europese Commissie.
      </p>

      <h2>Hoe lang we gegevens bewaren</h2>
      <p>
        Aanvragen en scan-uitkomsten bewaren we maximaal 2 jaar na het laatste contact, tenzij er
        een klantrelatie ontstaat. Dan gelden de wettelijke bewaartermijnen (bijvoorbeeld 7 jaar
        voor de administratie).
      </p>

      <h2>Je rechten</h2>
      <p>
        Je kunt je gegevens inzien, laten corrigeren of verwijderen, bezwaar maken of je toestemming
        intrekken. Mail naar <a href={`mailto:${company.email}`}>{company.email}</a>; we reageren
        binnen een maand. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een
        klacht indienen bij de Autoriteit Persoonsgegevens.
      </p>

      <h2>Beveiliging</h2>
      <p>
        De website werkt via een versleutelde verbinding (HTTPS). Formuliergegevens zijn alleen
        toegankelijk voor het LoopWerk-team.
      </p>
    </LegalPage>
  );
}
