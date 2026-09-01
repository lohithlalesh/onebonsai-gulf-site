import type { Metadata } from "next";
import AboutPrinciples from "../AboutPrinciples";
import AboutSection from "../AboutSection";
import AboutPeople from "../AboutPeople";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import TeamSection from "../TeamSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

export const metadata: Metadata = {
  title: "About",
  description: "Meet OneBonsai Gulf, our founder, and the AI specialists connecting strategy, engineering, and implementation from Abu Dhabi.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    url: `${siteUrl}/about`,
    title: "About OneBonsai Gulf",
    description: "AI talent, local delivery, and proven DeepTech engineering brought together in Abu Dhabi.",
  },
};

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main about-page">
        <h1 className="sr-only">About OneBonsai Gulf</h1>
        <AboutSection />
        <AboutPrinciples />
        <AboutPeople />
        <TeamSection />
        <SiteContact />
      </main>
    </>
  );
}
