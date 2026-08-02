import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onebonsai.com"),
  title: {
    default: "OneBonsai Gulf — AI Strategy & DeepTech",
    template: "%s — OneBonsai Gulf",
  },
  description:
    "An independent AI consultancy and DeepTech company in Abu Dhabi, helping organizations understand, adopt, build, and scale Artificial Intelligence.",
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    siteName: "OneBonsai Gulf",
    title: "Building the next generation of intelligent businesses.",
    description:
      "Independent AI strategy, transformation, engineering, and innovation from Abu Dhabi.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "OneBonsai Gulf — Building the next generation of intelligent businesses.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building the next generation of intelligent businesses.",
    description: "AI strategy, transformation, and DeepTech from Abu Dhabi.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
