export const GA_MEASUREMENT_ID = "G-PMNVHH19JT";
export const ANALYTICS_CONSENT_KEY = "obgulf-analytics-consent-v1";
export const OPEN_ANALYTICS_PREFERENCES_EVENT = "obgulf:open-analytics-preferences";
export const ANALYTICS_CONSENT_CHANGE_EVENT = "obgulf:analytics-consent-change";

type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted";
}

export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (!hasAnalyticsConsent() || typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}

export function openAnalyticsPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_ANALYTICS_PREFERENCES_EVENT));
}
