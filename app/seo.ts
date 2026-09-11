import type { Locale } from "./locale";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

const MAX_DESCRIPTION_LENGTH = 160;

export function trimMetaDescription(description: string) {
  if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
  const clipped = description.slice(0, MAX_DESCRIPTION_LENGTH - 1).replace(/\s+\S*$/, "").trimEnd();
  return `${clipped}…`;
}

export function compactSeoTitle(title: string, primaryKeyword: string) {
  if (title.length <= 42) return title;
  const keywordTitle = primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1);
  if (keywordTitle.length <= 42) return keywordTitle;
  return `${title.slice(0, 39).trimEnd()}…`;
}

export function localizedAlternates(path = "", locale: Locale = "en") {
  const normalizedPath = path === "/" ? "" : path;
  const englishUrl = `${siteUrl}${normalizedPath}`;
  const arabicUrl = `${siteUrl}/ar${normalizedPath}`;

  return {
    canonical: locale === "ar" ? arabicUrl : englishUrl,
    languages: {
      "en-AE": englishUrl,
      "ar-AE": arabicUrl,
      "x-default": englishUrl,
    },
  };
}
