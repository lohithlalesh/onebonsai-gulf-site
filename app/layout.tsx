import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import LocaleProvider from "./LocaleProvider";
import { PlanIntegrationProvider } from "./PlanIntegrationModal";
import { getRequestLocale } from "./i18n";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://obgulf.com");
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const absoluteAsset = (path: string) => new URL(publicAsset(path), siteUrl).toString();

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "OneBonsai Gulf",
      legalName: "OneBonsai Gulf LLC",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteAsset("/brand/onebonsai-gulf-black.png"),
      },
      image: absoluteAsset("/og-v2.jpg"),
      email: "info@onebonsai.com",
      // [VERIFY: telephone] Reconfirm against the live business profile before deployment.
      telephone: "+971 50 207 7215",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "info@onebonsai.com",
        telephone: "+971 50 207 7215",
        availableLanguage: ["English", "Arabic"],
        areaServed: ["AE", "GCC"],
      },
      founder: { "@type": "Person", name: "Ivan M Grey", jobTitle: "Founder and CEO" },
      foundingLocation: { "@type": "Place", name: "Abu Dhabi, United Arab Emirates" },
      description:
        "OneBonsai Gulf is an Abu Dhabi AI consulting and engineering company that advises, builds, integrates, and connects specialist capability for organizations in the UAE and GCC.",
      address: {
        "@type": "PostalAddress",
        // [VERIFY: streetAddress] Reconfirm against the live business profile before deployment.
        streetAddress: "SE45 02, Masdar City Free Zone, Masdar City",
        addressLocality: "Abu Dhabi",
        addressCountry: "AE",
      },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Place", name: "Gulf Cooperation Council" },
      ],
      sameAs: [
        "https://www.instagram.com/onebonsai_gulf/",
        "https://ae.linkedin.com/company/thegreyworld",
      ],
      knowsAbout: [
        "AI consulting",
        "Enterprise AI integration",
        "Agentic AI implementation",
        "AI workflow automation",
        "Custom software development",
        "AI talent and specialists",
        "Corporate AI training",
        "Virtual reality training and simulation",
        "Digital twins",
        "Industrial simulation",
        "AI talent and staff augmentation",
        "UAE market entry",
        "Cybersecurity",
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "OneBonsai",
        url: "https://onebonsai.com",
      },
      memberOf: {
        "@type": "Organization",
        name: "Masdar City Free Zone",
        description: "Strategic partner of OneBonsai Gulf in Abu Dhabi",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "OneBonsai Gulf",
      inLanguage: ["en-AE", "ar-AE"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI & Custom Software Abu Dhabi | OneBonsai Gulf",
    template: "%s | OneBonsai Gulf",
  },
  description:
    "OneBonsai Gulf is an Abu Dhabi AI consulting and engineering company for enterprise AI integration, agentic AI, custom software, training, and specialists.",
  applicationName: "OneBonsai Gulf",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-AE": siteUrl,
      "ar-AE": `${siteUrl}/ar`,
      "x-default": siteUrl,
    },
  },
  manifest: publicAsset("/site.webmanifest"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "OneBonsai Gulf", url: siteUrl }],
  creator: "OneBonsai Gulf",
  publisher: "OneBonsai Gulf",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "OneBonsai Gulf",
    title: "Custom Software & AI Integration in Abu Dhabi",
    description:
      "AI consulting, enterprise integration, agentic AI, custom software, training, and specialist talent from Abu Dhabi.",
    images: [
      {
        url: absoluteAsset("/og-v2.jpg"),
        width: 1200,
        height: 630,
        alt: "OneBonsai Gulf custom software and AI integration in Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software & AI Integration in Abu Dhabi",
    description: "AI consulting, enterprise integration, agentic AI, custom software, training, and specialist talent from Abu Dhabi.",
    images: [absoluteAsset("/og-v2.jpg")],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f4ef",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();

  preload(publicAsset("/fonts/hanken-grotesk.woff2"), {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  if (locale === "ar") {
    preload(publicAsset("/fonts/ibm-plex-sans-arabic-regular.woff2"), {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  }

  return (
    <html lang={locale === "ar" ? "ar-AE" : "en-AE"} dir={locale === "ar" ? "rtl" : "ltr"} data-locale={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <style>{`
          @font-face {
            font-family: "Hanken";
            src: url("${publicAsset("/fonts/hanken-grotesk.woff2")}") format("woff2");
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
          }
          @font-face {
            font-family: "IBM Plex Mono";
            src: url("${publicAsset("/fonts/ibm-plex-mono.woff2")}") format("woff2");
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: "IBM Plex Sans Arabic";
            src: url("${publicAsset("/fonts/ibm-plex-sans-arabic-regular.woff2")}") format("woff2");
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: "IBM Plex Sans Arabic";
            src: url("${publicAsset("/fonts/ibm-plex-sans-arabic-semibold.woff2")}") format("woff2");
            font-style: normal;
            font-weight: 600;
            font-display: swap;
          }
        `}</style>
        <LocaleProvider locale={locale}>
          <PlanIntegrationProvider>{children}</PlanIntegrationProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
