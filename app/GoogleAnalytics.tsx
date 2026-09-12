"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "./LocaleProvider";
import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_CONSENT_CHANGE_EVENT,
  GA_MEASUREMENT_ID,
  OPEN_ANALYTICS_PREFERENCES_EVENT,
  trackEvent,
} from "./analytics";
import { localizedPath } from "./locale";

type ConsentChoice = "loading" | "unknown" | "granted" | "denied";

function readConsentChoice(): ConsentChoice {
  const storedChoice = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return storedChoice === "granted" || storedChoice === "denied" ? storedChoice : "unknown";
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, onChange);
  };
}

const copy = {
  en: {
    title: "Help us improve this website",
    body: "With your permission, we use Google Analytics to understand page use and enquiry journeys. We never send form entries, contact details, or résumés to analytics.",
    accept: "Allow analytics",
    decline: "Decline",
    privacy: "Privacy policy",
  },
  ar: {
    title: "ساعدنا على تحسين هذا الموقع",
    body: "بعد موافقتك، نستخدم Google Analytics لفهم استخدام الصفحات ومسار الاستفسارات. لا نرسل محتوى النماذج أو بيانات التواصل أو السير الذاتية إلى أدوات التحليل.",
    accept: "السماح بالتحليلات",
    decline: "رفض",
    privacy: "سياسة الخصوصية",
  },
} as const;

function initializeGoogleAnalytics() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
    document.cookie = `${name}=; Domain=.obgulf.com; Path=/; Max-Age=0; SameSite=Lax`;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const { locale, isArabic } = useLocale();
  const storedChoice = useSyncExternalStore(subscribeToConsent, readConsentChoice, () => "loading");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const choice: ConsentChoice = preferencesOpen ? "unknown" : storedChoice;
  const engagedPathRef = useRef("");
  const t = copy[locale];

  useEffect(() => {
    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_ANALYTICS_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (choice !== "granted") return;

    initializeGoogleAnalytics();
    if (!document.getElementById("obgulf-google-analytics")) {
      const script = document.createElement("script");
      script.id = "obgulf-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }
  }, [choice]);

  useEffect(() => {
    if (choice !== "granted" || !pathname || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
      language: locale,
    });
  }, [choice, locale, pathname]);

  useEffect(() => {
    if (choice !== "granted" || !pathname.includes("/insights/")) return;
    engagedPathRef.current = "";

    const measureEngagement = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY / scrollable < 0.75 || engagedPathRef.current === pathname) return;
      engagedPathRef.current = pathname;
      trackEvent("article_engagement", { article_path: pathname, scroll_depth: 75, locale });
      window.removeEventListener("scroll", measureEngagement);
    };

    window.addEventListener("scroll", measureEngagement, { passive: true });
    measureEngagement();
    return () => window.removeEventListener("scroll", measureEngagement);
  }, [choice, locale, pathname]);

  const accept = () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, "granted");
    setPreferencesOpen(false);
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));
  };

  const decline = () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, "denied");
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    clearGoogleAnalyticsCookies();
    setPreferencesOpen(false);
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));
  };

  if (choice !== "unknown") return null;

  return (
    <aside className="analytics-consent" aria-labelledby="analytics-consent-title" dir={isArabic ? "rtl" : "ltr"}>
      <div className="analytics-consent-copy">
        <p className="analytics-consent-kicker">{isArabic ? "الخصوصية والتحليلات" : "Privacy and analytics"}</p>
        <h2 id="analytics-consent-title">{t.title}</h2>
        <p>{t.body} <Link href={localizedPath("/privacy", locale)}>{t.privacy}</Link></p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="analytics-consent-accept" onClick={accept}>{t.accept}</button>
        <button type="button" className="analytics-consent-decline" onClick={decline}>{t.decline}</button>
      </div>
    </aside>
  );
}
