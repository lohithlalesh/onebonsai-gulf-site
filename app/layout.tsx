import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "www.onebonsai.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
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
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "/",
      siteName: "OneBonsai Gulf",
      title: "Your business already works. We make it intelligent.",
      description:
        "Practical AI integration, transformation, and engineering from Abu Dhabi.",
      images: [
        {
          url: "/og.png",
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
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
