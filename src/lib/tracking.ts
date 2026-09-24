/**
 * Analytics en HubSpot-tracking, alleen na expliciete toestemming.
 * Configuratie via build-time env-variabelen (niet geheim):
 * - VITE_GA4_ID            bv. G-XXXXXXX
 * - VITE_HUBSPOT_PORTAL_ID bv. 1234567
 * - VITE_HUBSPOT_REGION    "eu1" voor EU-portals (zie embedcode in HubSpot), anders leeg
 * Zonder ID's laadt er niets en verschijnt er ook geen cookiebanner.
 */

type Consent = "granted" | "denied";

const STORAGE_KEY = "lw-cookie-consent";
export const CONSENT_EVENT = "lw:open-cookie-settings";

// Measurement ID is openbaar (staat in de paginabron); env-variabele kan hem overschrijven.
const GA4_ID = (import.meta.env["VITE_GA4_ID"] as string | undefined) || "G-13SJXB5RW7";
const HUBSPOT_PORTAL_ID = import.meta.env["VITE_HUBSPOT_PORTAL_ID"] as string | undefined;
const HUBSPOT_REGION = import.meta.env["VITE_HUBSPOT_REGION"] as string | undefined;

export const trackingConfigured = Boolean(GA4_ID || HUBSPOT_PORTAL_ID);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _hsq?: unknown[][];
  }
}

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Opslag geblokkeerd: keuze geldt dan alleen voor dit bezoek.
  }
  if (consent === "granted") {
    loadTracking();
  } else {
    // Al geladen scripts kunnen we niet uitladen; bij de volgende pageload laden ze niet meer.
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    window._hsq?.push(["doNotTrack"]);
  }
}

let loaded = false;

export function loadTracking() {
  if (loaded || typeof document === "undefined") return;
  loaded = true;

  if (GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    // Google Consent Mode v2: alleen meten na toestemming, geen advertentiecookies.
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`, "ga4");
  }

  if (HUBSPOT_PORTAL_ID) {
    const host = HUBSPOT_REGION ? `js-${HUBSPOT_REGION}.hs-scripts.com` : "js.hs-scripts.com";
    window._hsq = window._hsq || [];
    addScript(`https://${host}/${encodeURIComponent(HUBSPOT_PORTAL_ID)}.js`, "hs-script-loader");
  }
}

/** Voor client-side navigatie; de eerste pageview doen de scripts zelf. */
export function trackPageView(path: string) {
  if (!loaded) return;
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href });
  window._hsq?.push(["setPath", path], ["trackPageView"]);
}

function addScript(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}
