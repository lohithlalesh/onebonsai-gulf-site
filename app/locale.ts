export type Locale = "en" | "ar";

export const localeCookie = "obgulf-locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function localizedPath(pathname: string, locale: Locale) {
  const withoutArabicPrefix = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  return locale === "ar"
    ? `/ar${withoutArabicPrefix === "/" ? "" : withoutArabicPrefix}`
    : withoutArabicPrefix;
}
