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

  const button =
    "w-full rounded-full bg-forest px-6 py-3.5 text-base font-semibold text-cream transition-opacity hover:opacity-90 sm:w-auto";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-card p-6 text-ink shadow-2xl md:p-7"
    >
      <h2 id="cookie-title" className="text-2xl leading-tight">
        Deze website gebruikt cookies
      </h2>
      <p className="mt-3 text-base leading-relaxed text-ink/80">
        We gebruiken cookies om te zien hoe de website gebruikt wordt, zodat we hem kunnen
        verbeteren. Weigeren kan altijd; de website werkt dan gewoon.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => choose("granted")} className={button}>
          Accepteren
        </button>
        <button type="button" onClick={() => choose("denied")} className={button}>
          Weigeren
        </button>
      </div>
      <p className="mt-4 text-sm text-ink/60">
        <Link to="/cookies" className="underline underline-offset-4 hover:text-ink">
          Meer informatie in ons cookiebeleid
        </Link>
      </p>
    </div>
  );
}
