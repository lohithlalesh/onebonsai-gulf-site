import type { Metadata } from "next";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import TeamSection from "../TeamSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the OneBonsai Gulf team working across AI strategy, engineering, growth, and regional delivery from Abu Dhabi.",
  alternates: { canonical: `${siteUrl}/team` },
  openGraph: {
    url: `${siteUrl}/team`,
    title: "Meet the OneBonsai Gulf team",
    description: "The people planning, building, launching, and supporting enterprise AI across the Gulf.",
  },
};

export default function TeamPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main team-page">
        <section className="inner-page-hero team-page-hero" aria-labelledby="team-page-title">
          <div>
            <p className="section-kicker">People</p>
            <h1 id="team-page-title">A team built around the work, not around handoffs.</h1>
          </div>
          <p>Our Gulf team stays close to the business while OneBonsai engineering brings deep AI, software, and immersive technology experience.</p>
        </section>
        <TeamSection />
        <section className="team-page-note section-pad" aria-labelledby="team-page-note-title">
          <p className="section-kicker">How we collaborate</p>
          <h2 id="team-page-note-title">The person who understands the problem stays involved through delivery.</h2>
          <p>That keeps decisions clear, reduces rework, and makes the finished system easier for your team to own.</p>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
