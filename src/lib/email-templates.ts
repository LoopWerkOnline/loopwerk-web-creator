import { company } from "./company";

/**
 * Mailtemplates in de LoopWerk-huisstijl. Tabelopmaak met inline stijlen, zodat ze ook in
 * Outlook en Gmail goed ogen. Alle invoer van bezoekers gaat door `esc`.
 */

const SITE = "https://www.loopwerkonline.nl";
const C = {
  page: "#fcf5ed",
  card: "#ffffff",
  shell: "#f5ede1",
  line: "#e5ddd0",
  ink: "#1f241f",
  muted: "#6b6a5f",
  accent: "#b07a5a",
  forest: "#233628",
  sage: "#a9b8a0",
  cream: "#fcf5ed",
};
const SANS = "Arial,Helvetica,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;",
  );
}

/** Tekst met regeleinden naar veilige HTML. */
const multiline = (value: string) => esc(value).replace(/\n/g, "<br>");

function button(href: string, label: string, primary = true): string {
  const style = primary
    ? `background:${C.accent};color:#ffffff;border:1px solid ${C.accent}`
    : `background:#ffffff;color:${C.ink};border:1px solid ${C.line}`;
  return `<a href="${esc(href)}" style="${style};display:inline-block;padding:12px 22px;border-radius:999px;font-family:${SANS};font-size:14px;font-weight:bold;text-decoration:none;margin:0 8px 8px 0">${esc(label)}</a>`;
}

/** Rijen label/waarde in een licht kader. Lege waarden worden overgeslagen. */
function details(rows: [string, string | undefined][]): string {
  const body = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v], i) =>
        `<tr><td style="padding:10px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${SANS};font-size:13px;color:${C.muted};width:130px;vertical-align:top">${esc(k)}</td><td style="padding:10px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${SANS};font-size:15px;color:${C.ink};vertical-align:top">${multiline(v!)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};border:1px solid ${C.line};border-radius:14px;padding:4px 20px;margin:0 0 28px">${body}</table>`;
}

const p = (html: string) =>
  `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink}">${html}</p>`;

const sectionLabel = (text: string) =>
  `<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.accent}">${esc(text)}</p>`;

const quote = (text: string) =>
  `<div style="margin:0 0 28px;padding:4px 0 4px 18px;border-left:3px solid ${C.accent};font-family:${SERIF};font-size:18px;line-height:1.5;color:${C.ink}">${multiline(text)}</div>`;

function layout(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  footerNote: string;
}): string {
  return `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><title>LoopWerk</title></head>
<body style="margin:0;padding:0;background:${C.shell};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${esc(opts.preheader)}&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.shell}"><tr><td align="center" style="padding:36px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:separate">

<tr><td style="background:${C.forest};border-radius:20px 20px 0 0;padding:28px 36px 36px">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle"><img src="${SITE}/email/loopwerk-mark-cream.png" width="30" height="31" alt="" style="display:block;border:0"></td>
<td style="vertical-align:middle;padding-left:10px;font-family:${SERIF};font-size:22px;color:${C.cream}">LoopWerk</td>
</tr></table>
<p style="margin:36px 0 12px;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2.5px;text-transform:uppercase;color:${C.sage}">${esc(opts.eyebrow)}</p>
<h1 style="margin:0;font-family:${SERIF};font-weight:normal;font-size:34px;line-height:1.15;color:${C.cream}">${esc(opts.title)}</h1>
<p style="margin:14px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:#d9d4c7">${esc(opts.lead)}</p>
</td></tr>

<tr><td style="background:${C.card};padding:32px 36px 36px;border-radius:0 0 20px 20px">${opts.body}</td></tr>

<tr><td style="padding:24px 36px 0;font-family:${SANS};font-size:12px;line-height:1.7;color:${C.muted};text-align:center">
${esc(opts.footerNote)}<br>
${esc(company.name)} · ${esc(company.address)} · KvK ${esc(company.kvk)}<br>
<a href="${SITE}" style="color:${C.muted};text-decoration:underline">loopwerkonline.nl</a> &nbsp;·&nbsp; <a href="mailto:${esc(company.email)}" style="color:${C.muted};text-decoration:underline">${esc(company.email)}</a>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

const signature = () =>
  `<p style="margin:24px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink}">Groet,<br>Levi, Gianni en Shaquil<br><span style="color:${C.accent}">LoopWerk</span></p>`;

type Base = {
  firstName: string;
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
};

/** Meldingsmail voor het team. */
export function teamEmail(
  lead: Base &
    (
      | { kind: "contact"; message?: string | undefined }
      | {
          kind: "scan";
          process: string;
          scoreLabel: string;
          score: number;
          richting: string;
          summary: string;
        }
    ),
): { subject: string; html: string; text: string } {
  const who = `${lead.name}${lead.company ? ` (${lead.company})` : ""}`;
  const subject =
    lead.kind === "contact"
      ? `Nieuwe aanvraag via de site: ${who}`
      : `Nieuwe scan: ${who} — ${lead.score}/100`;

  const rows: [string, string | undefined][] = [
    ["Naam", lead.name],
    ["E-mail", lead.email],
    ["Bedrijf", lead.company],
    ["Telefoon", lead.phone],
    ...(lead.kind === "contact"
      ? ([["Waar loopt het vast?", lead.message || "Geen toelichting gegeven."]] as [
          string,
          string,
        ][])
      : ([
          ["Proces", lead.process],
          ["Uitkomst", `${lead.scoreLabel} (${lead.score}/100)`],
          ["Richting", lead.richting],
        ] as [string, string][])),
  ];

  const body = [
    sectionLabel("Gegevens"),
    details(rows),
    ...(lead.kind === "scan"
      ? [sectionLabel("Antwoorden"), details([["Scan", lead.summary]])]
      : []),
    `<div style="margin-top:4px">${button(`mailto:${lead.email}?subject=${encodeURIComponent(lead.kind === "contact" ? "Re: je aanvraag bij LoopWerk" : "Je Loopwerk Scan")}`, `Beantwoord ${lead.firstName}`)}${lead.phone ? button(`tel:${lead.phone.replace(/[^+\d]/g, "")}`, "Bel", false) : ""}${button("https://app-eu1.hubspot.com/contacts/149185560/objects/0-1/views/all/list", "Open HubSpot", false)}</div>`,
  ].join("");

  const text = [
    subject,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    ...(lead.kind === "scan" ? ["", lead.summary] : []),
    "",
    "Antwoorden op deze mail gaat direct naar de aanvrager.",
  ].join("\n");

  return {
    subject,
    text,
    html: layout({
      preheader: `${who} · ${lead.email}`,
      eyebrow: lead.kind === "contact" ? "Nieuwe aanvraag" : "Nieuwe scan",
      title:
        lead.kind === "contact"
          ? `${lead.firstName} wil iets bespreken`
          : `${lead.firstName} deed de scan`,
      lead:
        lead.kind === "contact"
          ? "Binnengekomen via het contactformulier. We beloven een reactie binnen één werkdag."
          : "Binnengekomen via de Loopwerk Scan. We beloven binnen één werkdag een korte analyse.",
      body,
      footerNote:
        "Interne melding van het websiteformulier. Beantwoorden gaat direct naar de aanvrager.",
    }),
  };
}

/** Bevestigingsmail voor de bezoeker. */
export function confirmationEmail(
  lead: Base &
    (
      | { kind: "contact"; message?: string | undefined }
      | { kind: "scan"; process: string; scoreLabel: string }
    ),
): { subject: string; html: string; text: string } {
  const subject =
    lead.kind === "contact"
      ? "We hebben je aanvraag ontvangen | LoopWerk"
      : "Je Loopwerk Scan is binnen | LoopWerk";

  const intro =
    lead.kind === "contact"
      ? "We hebben je aanvraag goed ontvangen en kijken er zelf naar. Binnen één werkdag hoor je van ons."
      : `Dank je voor het invullen van de Loopwerk Scan${lead.process ? ` voor "${lead.process}"` : ""}. Je uitkomst: ${lead.scoreLabel}.`;

  const steps =
    lead.kind === "contact"
      ? [
          "We lezen je aanvraag en kijken waar in je proces het werk blijft hangen.",
          "Binnen één werkdag nemen we contact met je op.",
          "In een kort gesprek kijken we samen of er iets te winnen valt. Vrijblijvend.",
        ]
      : [
          "We bekijken je antwoorden en de uitkomst van de scan.",
          "Binnen één werkdag krijg je een korte analyse: wat we zien en waar je het beste kunt beginnen.",
          "Wil je het daarna bespreken? Dan plannen we een kort gesprek.",
        ];

  const stepsHtml = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px">${steps
    .map(
      (s, i) =>
        `<tr><td style="width:40px;vertical-align:top;padding:6px 0"><div style="width:28px;height:28px;border-radius:14px;background:${C.shell};border:1px solid ${C.line};color:${C.accent};font-family:${SANS};font-size:13px;font-weight:bold;line-height:28px;text-align:center">${i + 1}</div></td><td style="vertical-align:top;padding:10px 0 10px 4px;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink}">${esc(s)}</td></tr>`,
    )
    .join("")}</table>`;

  const body = [
    lead.kind === "contact" && lead.message ? sectionLabel("Je bericht") + quote(lead.message) : "",
    sectionLabel("Wat er nu gebeurt"),
    stepsHtml,
    p(
      "Wil je alvast iets aanvullen, zoals een voorbeeld van een aanvraag of offerte? Antwoord dan gewoon op deze mail.",
    ),
    `<div style="margin-top:8px">${button(`${SITE}/cases`, "Bekijk onze cases")}${button(`${SITE}/blog`, "Lees de blogs", false)}</div>`,
    signature(),
  ].join("");

  const text = [
    `Hoi ${lead.firstName},`,
    "",
    intro,
    ...(lead.kind === "contact" && lead.message ? ["", `Je schreef: "${lead.message}"`] : []),
    "",
    "Wat er nu gebeurt:",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Wil je alvast iets aanvullen? Antwoord dan gewoon op deze mail.",
    "",
    "Groet,",
    "Levi, Gianni en Shaquil",
    "LoopWerk · www.loopwerkonline.nl",
  ].join("\n");

  return {
    subject,
    text,
    html: layout({
      preheader:
        lead.kind === "contact"
          ? "Je hoort binnen één werkdag van ons."
          : "Binnen één werkdag krijg je een korte analyse.",
      eyebrow: lead.kind === "contact" ? "Aanvraag ontvangen" : "Scan ontvangen",
      title: `Dank je, ${lead.firstName}. We gaan ermee aan de slag.`,
      lead: intro,
      body,
      footerNote: "Je ontvangt deze mail omdat je een formulier invulde op loopwerkonline.nl.",
    }),
  };
}
