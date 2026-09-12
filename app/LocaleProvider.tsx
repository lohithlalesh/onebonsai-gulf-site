"use client";

import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { localeCookie, localizedPath, type Locale } from "./locale";
import { trackEvent } from "./analytics";

type LocaleContextValue = {
  locale: Locale;
  isArabic: boolean;
  directionArrow: "↗" | "↖";
  switchLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const router = useRouter();

  useLayoutEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "en-AE";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const switchLocale = () => {
    const nextLocale: Locale = locale === "ar" ? "en" : "ar";
    trackEvent("locale_switch", { from_locale: locale, to_locale: nextLocale });
    document.cookie = `${localeCookie}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLocale === "ar" ? "ar" : "en-AE";
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
    router.push(`${localizedPath(window.location.pathname, nextLocale)}${window.location.search}${window.location.hash}`);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        isArabic: locale === "ar",
        directionArrow: locale === "ar" ? "↖" : "↗",
        switchLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
