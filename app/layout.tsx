import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const absoluteAsset = (path: string) => new URL(publicAsset(path), siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneBonsai Gulf | AI Strategy & DeepTech",
    template: "%s | OneBonsai Gulf",
  },
  description:
    "OneBonsai Gulf integrates AI into the systems, workflows, and teams that UAE organizations already trust.",
  applicationName: "OneBonsai Gulf",
  keywords: [
    "AI consultancy Abu Dhabi",
    "AI strategy UAE",
    "DeepTech",
    "AI transformation",
    "enterprise AI",
    "AI Academy",
  ],
  icons: {
    icon: publicAsset("/favicon.png"),
    shortcut: publicAsset("/favicon.png"),
    apple: publicAsset("/favicon.png"),
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "OneBonsai Gulf",
    title: "Your business already works. We make it intelligent.",
    description:
      "Practical AI integration, transformation, and engineering from Abu Dhabi.",
    images: [
      {
        url: absoluteAsset("/og.png"),
        width: 1536,
        height: 1024,
        alt: "OneBonsai Gulf: Your business already works. We make it intelligent.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your business already works. We make it intelligent.",
    description: "Practical AI integration, transformation, and engineering from Abu Dhabi.",
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
        {children}
      </body>
    </html>
  );
}
