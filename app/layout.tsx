import type { Metadata, Viewport } from "next";
import FluidCursorBackground from "./FluidCursorBackground";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const absoluteAsset = (path: string) => new URL(publicAsset(path), siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneBonsai Gulf | AI Consulting & Integration UAE",
    template: "%s | OneBonsai Gulf",
  },
  description:
    "Production AI, immersive training, custom software, AI marketing, cybersecurity, and practical AI adoption for organizations across the UAE and Gulf.",
  applicationName: "OneBonsai Gulf",
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
  icons: {
    icon: publicAsset("/favicon-v2.png"),
    shortcut: publicAsset("/favicon-v2.png"),
    apple: publicAsset("/favicon-v2.png"),
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "OneBonsai Gulf",
    title: "Production AI and deep-tech solutions for UAE organizations",
    description:
      "Production AI, immersive training, custom software, AI marketing, cybersecurity, and team adoption from OneBonsai Gulf.",
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
    title: "Production AI and deep-tech solutions for UAE organizations",
    description: "Production AI, immersive training, custom software, AI marketing, cybersecurity, and team adoption from OneBonsai Gulf.",
    images: [absoluteAsset("/og.png")],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f4ef",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
        <FluidCursorBackground />
        <div className="site-shell">{children}</div>
      </body>
    </html>
  );
}
