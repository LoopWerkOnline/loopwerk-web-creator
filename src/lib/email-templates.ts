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
const SANS = "'Instrument Sans',Arial,Helvetica,sans-serif";
const SERIF = "'Instrument Serif',Georgia,'Times New Roman',serif";

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
  return `<a href="${esc(href)}" style="${style};display:inline-block;padding:14px 26px;border-radius:999px;font-family:${SANS};font-size:14px;font-weight:600;text-decoration:none;margin:0 8px 10px 0">${esc(label)}</a>`;
}

/** Rijen label/waarde, rustig onder elkaar met dunne lijnen. Lege waarden worden overgeslagen. */
function details(rows: [string, string | undefined][]): string {
  const body = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:14px 0;border-top:1px solid ${C.line};font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};width:150px;vertical-align:top;line-height:20px">${esc(k)}</td><td style="padding:14px 0;border-top:1px solid ${C.line};font-family:${SANS};font-size:16px;line-height:1.5;color:${C.ink};vertical-align:top">${multiline(v!)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${C.line};margin:0 0 36px">${body}</table>`;
}

const p = (html: string) =>
  `<p style="margin:0 0 18px;font-family:${SANS};font-size:16px;line-height:1.65;color:${C.ink}">${html}</p>`;

const sectionLabel = (text: string) =>
  `<p style="margin:0 0 14px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:${C.accent}">${esc(text)}</p>`;

/** Citaat in een zacht vlak, met een groot aanhalingsteken. */
const quote = (text: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 36px"><tr><td bgcolor="${C.page}" style="background:${C.page};border-radius:16px;padding:22px 28px 24px"><div style="font-family:${SERIF};font-size:48px;line-height:36px;height:30px;color:${C.accent}">&ldquo;</div><div style="font-family:${SERIF};font-size:22px;line-height:1.45;color:${C.ink}">${multiline(text)}</div></td></tr></table>`;

/** Genummerde stappen in redactionele stijl: groot serif-cijfer, dunne lijn erboven. */
function steps(items: string[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px">${items
    .map(
      (s, i) =>
        `<tr><td style="width:56px;vertical-align:top;padding:16px 0;border-top:1px solid ${C.line};font-family:${SERIF};font-size:28px;line-height:28px;color:${C.accent}">0${i + 1}</td><td style="vertical-align:top;padding:18px 0 16px;border-top:1px solid ${C.line};font-family:${SANS};font-size:16px;line-height:1.55;color:${C.ink}">${esc(s)}</td></tr>`,
    )
    .join("")}</table>`;
}

function layout(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  footerNote: string;
}): string {
  return `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light"><title>LoopWerk</title>
<link href="${SITE}/fonts/fonts.css" rel="stylesheet">
<style>@media (max-width:620px){.px{padding-left:24px!important;padding-right:24px!important}.h1{font-size:32px!important}}</style></head>
<body style="margin:0;padding:0;background:${C.shell};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${esc(opts.preheader)}&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.shell}" style="background:${C.shell}"><tr><td align="center" style="padding:32px 12px 40px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:separate">

<tr><td style="padding:0 8px 20px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle;width:34px"><img src="${SITE}/email/loopwerk-mark.png" width="26" height="27" alt="" style="display:block;border:0"></td>
<td style="vertical-align:middle;font-family:${SERIF};font-size:24px;color:${C.ink}">LoopWerk</td>
<td align="right" style="vertical-align:middle;font-family:${SANS};font-size:12px;color:${C.muted}"><a href="${SITE}" style="color:${C.muted};text-decoration:none">loopwerkonline.nl</a></td>
</tr></table>
</td></tr>

<tr><td bgcolor="${C.forest}" style="background:${C.forest};border-radius:24px 24px 0 0;line-height:0;font-size:0"><img src="${SITE}/email/header.jpg" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:24px 24px 0 0"></td></tr>

<tr><td class="px" bgcolor="${C.forest}" style="background:${C.forest};padding:4px 44px 44px">
<p style="margin:0 0 14px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:${C.sage}">${esc(opts.eyebrow)}</p>
<h1 class="h1" style="margin:0;font-family:${SERIF};font-weight:normal;font-size:40px;line-height:1.1;color:${C.cream}">${esc(opts.title)}</h1>
<p style="margin:18px 0 0;font-family:${SANS};font-size:16px;line-height:1.65;color:#d9d4c7">${esc(opts.lead)}</p>
</td></tr>

<tr><td class="px" bgcolor="${C.card}" style="background:${C.card};padding:40px 44px 44px;border-radius:0 0 24px 24px">${opts.body}</td></tr>

<tr><td align="center" style="padding:32px 24px 0;font-family:${SANS};font-size:12px;line-height:1.8;color:${C.muted};text-align:center">
<img src="${SITE}/email/loopwerk-mark.png" width="20" height="21" alt="" style="display:block;margin:0 auto 12px;border:0;opacity:.7">
${esc(opts.footerNote)}<br>
${esc(company.name)} · ${esc(company.city)} · KvK ${esc(company.kvk)}<br>
<a href="${SITE}" style="color:${C.muted};text-decoration:underline">loopwerkonline.nl</a> &nbsp;·&nbsp; <a href="mailto:${esc(company.email)}" style="color:${C.muted};text-decoration:underline">${esc(company.email)}</a>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

const signature = () =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px"><tr><td style="padding-top:24px;border-top:1px solid ${C.line}"><p style="margin:0 0 4px;font-family:${SANS};font-size:15px;color:${C.muted}">Groet,</p><p style="margin:0;font-family:${SERIF};font-size:24px;line-height:1.3;color:${C.ink}">Levi, Gianni en Shaquil</p><p style="margin:4px 0 0;font-family:${SANS};font-size:13px;color:${C.accent}">LoopWerk</p></td></tr></table>`;

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
      ? []
      : ([
          ["Proces", lead.process],
          ["Uitkomst", `${lead.scoreLabel} (${lead.score}/100)`],
          ["Richting", lead.richting],
        ] as [string, string][])),
  ];

  const body = [
    lead.kind === "contact"
      ? sectionLabel("Waar loopt het vast?") +
        (lead.message ? quote(lead.message) : p("Geen toelichting gegeven."))
      : "",
    sectionLabel("Gegevens"),
    details(rows),
    ...(lead.kind === "scan"
      ? [sectionLabel("Antwoorden"), details([["Scan", lead.summary]])]
      : []),
    `<div>${button(`mailto:${lead.email}?subject=${encodeURIComponent(lead.kind === "contact" ? "Re: je aanvraag bij LoopWerk" : "Je LoopWerk Scan")}`, `Beantwoord ${lead.firstName}`)}${lead.phone ? button(`tel:${lead.phone.replace(/[^+\d]/g, "")}`, "Bel", false) : ""}${button("https://app-eu1.hubspot.com/contacts/149185560/objects/0-1/views/all/list", "Open HubSpot", false)}</div>`,
  ].join("");

  const text = [
    subject,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    ...(lead.kind === "contact" ? [`Waar loopt het vast?: ${lead.message || "-"}`] : []),
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
          : "Binnengekomen via de LoopWerk Scan. We beloven binnen één werkdag een korte analyse.",
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
      : "Je LoopWerk Scan is binnen | LoopWerk";

  const intro =
    lead.kind === "contact"
      ? "We hebben je aanvraag goed ontvangen en kijken er zelf naar. Binnen één werkdag hoor je van ons."
      : `Dank je voor het invullen van de LoopWerk Scan${lead.process ? ` voor "${lead.process}"` : ""}. Je uitkomst: ${lead.scoreLabel}.`;

  const stepList =
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

  const body = [
    lead.kind === "contact" && lead.message ? sectionLabel("Je bericht") + quote(lead.message) : "",
    sectionLabel("Wat er nu gebeurt"),
    steps(stepList),
    p(
      "Wil je alvast iets aanvullen, zoals een voorbeeld van een aanvraag of offerte? Antwoord dan gewoon op deze mail.",
    ),
    `<div style="margin-top:12px">${button(`${SITE}/cases`, "Bekijk onze cases")}${button(`${SITE}/blog`, "Lees de blogs", false)}</div>`,
    signature(),
  ].join("");

  const text = [
    `Hoi ${lead.firstName},`,
    "",
    intro,
    ...(lead.kind === "contact" && lead.message ? ["", `Je schreef: "${lead.message}"`] : []),
    "",
    "Wat er nu gebeurt:",
    ...stepList.map((s, i) => `${i + 1}. ${s}`),
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
