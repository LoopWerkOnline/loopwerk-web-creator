import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  CONSENT_EVENT,
  loadTracking,
  readConsent,
  saveConsent,
  trackingConfigured,
} from "@/lib/tracking";

/**
 * Toestemming voor analytische en marketingcookies (GA4, HubSpot).
 * Weigeren is even makkelijk als accepteren; vóór een keuze laadt er niets.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!trackingConfigured) return;
    const consent = readConsent();
    if (consent === "granted") loadTracking();
    if (consent === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  function choose(consent: "granted" | "denied") {
    saveConsent(consent);
    setOpen(false);
  }

  const button = "rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-instellingen"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-card p-6 text-ink shadow-xl"
    >
      <p className="text-sm leading-relaxed text-ink/80">
        We willen graag meten hoe de site gebruikt wordt (Google Analytics) en zien welke pagina's
        je bekeek als je contact opneemt (HubSpot). Daarvoor plaatsen we cookies, maar alleen als je
        dat goedvindt. Meer in ons{" "}
        <Link to="/cookies" className="underline underline-offset-4">
          cookiebeleid
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className={`${button} bg-forest text-cream`}
        >
          Akkoord
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className={`${button} bg-forest text-cream`}
        >
          Alleen noodzakelijk
        </button>
      </div>
    </div>
  );
}
