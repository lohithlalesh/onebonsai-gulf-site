import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import CaseStudies from "../CaseStudies";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

export const metadata: Metadata = {
  title: "Work",
  description: "Explore OneBonsai case studies in healthcare, logistics, industry, and public safety.",
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    url: `${siteUrl}/work`,
    title: "Selected work | OneBonsai Gulf",
    description: "Proven technology delivered in complex, high-stakes environments.",
  },
};

export default function WorkPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main work-page">
        <section className="work-page-section section-pad" aria-labelledby="work-title">
          <header className="work-page-intro">
            <div>
              <p className="section-kicker">Selected work</p>
              <h1 id="work-title">Built for complex, high-stakes environments.</h1>
            </div>
            <div>
              <p>
                A selection of systems delivered by OneBonsai across healthcare, logistics, industry, and public safety.
              </p>
              <a href="https://onebonsai.com/cases" target="_blank" rel="noreferrer">
                Browse all case studies
                <ArrowUpRight size={15} weight="thin" aria-hidden="true" />
              </a>
            </div>
          </header>
          <CaseStudies />
        </section>
        <SiteContact />
      </main>
    </>
  );
}
