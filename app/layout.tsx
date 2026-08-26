import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://obgulf.com");
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const absoluteAsset = (path: string) => new URL(publicAsset(path), siteUrl).toString();

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "OneBonsai Gulf",
  url: siteUrl,
  logo: absoluteAsset("/brand/onebonsai-gulf-black.png"),
  image: absoluteAsset("/og.png"),
  email: "info@onebonsai.com",
  description:
    "AI integration, custom software, workflow automation, immersive training, and secure AI adoption for UAE organizations.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Gulf Cooperation Council" },
  ],
  knowsAbout: [
    "Enterprise AI integration",
    "AI workflow automation",
    "Custom software",
    "AI training",
    "Virtual reality training",
    "Cybersecurity",
    "SEO and answer engine optimization",
  ],
  sameAs: ["https://onebonsai.com"],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Consulting & Integration in Abu Dhabi, UAE | OneBonsai Gulf",
    template: "%s | OneBonsai Gulf",
  },
  description:
    "OneBonsai Gulf helps UAE organizations integrate AI, build custom software, automate workflows, train teams, and deploy secure AI from Abu Dhabi.",
  applicationName: "OneBonsai Gulf",
  alternates: { canonical: siteUrl },
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
  keywords: [
    "AI consulting Abu Dhabi",
    "AI consulting UAE",
    "AI integration UAE",
    "AI automation UAE",
    "custom AI solutions",
    "enterprise AI",
    "VR training UAE",
    "AI marketing UAE",
    "cybersecurity UAE",
    "custom software Abu Dhabi",
    "AI Academy",
  ],
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "OneBonsai Gulf",
    title: "AI Consulting & Integration in Abu Dhabi, UAE",
    description:
      "Integrate AI, automate workflows, build custom software, and train teams with OneBonsai Gulf in Abu Dhabi.",
    images: [
      {
        url: absoluteAsset("/og.png"),
        width: 1536,
        height: 1024,
        alt: "OneBonsai Gulf AI consulting and integration in Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting & Integration in Abu Dhabi, UAE",
    description: "Integrate AI, automate workflows, build custom software, and train teams with OneBonsai Gulf.",
    images: [absoluteAsset("/og.png")],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f4ef",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  preload(publicAsset("/fonts/hanken-grotesk.ttf"), {
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  });
  preload(publicAsset("/fonts/ibm-plex-mono.ttf"), {
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="en-AE">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <style>{`
          @font-face {
            font-family: "Hanken";
            src: url("${publicAsset("/fonts/hanken-grotesk.ttf")}") format("truetype");
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
          }
          @font-face {
            font-family: "IBM Plex Mono";
            src: url("${publicAsset("/fonts/ibm-plex-mono.ttf")}") format("truetype");
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
