import type { Metadata } from "next";
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
        <section className="about-page-principles section-pad" aria-labelledby="about-principles-title">
          <div>
            <p className="section-kicker">One delivery team</p>
            <h2 id="about-principles-title">From first use case to a system your team can run.</h2>
          </div>
          <div className="about-principle-list">
            <article>
              <span>01</span>
              <h3>Local context</h3>
              <p>Delivery shaped around UAE teams, operations, regulation, and buying cycles.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Deep engineering</h3>
              <p>AI, custom software, cybersecurity, virtual reality, and simulation expertise in one network.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Practical ownership</h3>
              <p>Clear governance, training, and documentation so capability stays with your people.</p>
            </article>
          </div>
        </section>
        <AboutPeople />
        <TeamSection />
        <SiteContact />
      </main>
    </>
  );
}
