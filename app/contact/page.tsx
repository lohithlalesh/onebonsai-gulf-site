import type { Metadata } from "next";
import { localizedAlternates } from "../seo";
import Link from "next/link";
import EnquiryConfirmationBanner from "../EnquiryConfirmationBanner";
import JsonLd from "../JsonLd";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

export const metadata: Metadata = {
  title: "Contact AI Consultants Abu Dhabi",
  description: "Contact OneBonsai Gulf in Abu Dhabi to discuss AI consulting, enterprise AI integration, agentic AI, custom software, training, or immersive simulation.",
  alternates: localizedAlternates("/contact"),
  openGraph: { url: `${siteUrl}/contact`, title: "Contact OneBonsai Gulf", description: "Discuss an AI, software, integration, or workforce initiative with our Abu Dhabi team." },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ enquiry?: string }> }) {
  const { enquiry } = await searchParams;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact OneBonsai Gulf",
    url: `${siteUrl}/contact`,
    mainEntity: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <EnquiryConfirmationBanner show={enquiry === "sent"} />
      <main id="main-content" className="inner-page-main contact-page">
        <section className="contact-page-hero section-pad" aria-labelledby="contact-page-title">
          <div>
            <p className="section-kicker">Abu Dhabi · United Arab Emirates</p>
            <h1 id="contact-page-title">Tell us which workflow, product, or capability needs to move.</h1>
          </div>
          <div>
            <p>Share the outcome you need, the systems or teams involved, and what has already been tried. We will help you identify a useful next conversation.</p>
            <a className="primary-button" href="mailto:info@onebonsai.com?subject=OneBonsai%20Gulf%20enquiry">Email info@onebonsai.com</a>
          </div>
        </section>
        <section className="contact-options section-pad" aria-labelledby="contact-options-title">
          <h2 id="contact-options-title">What we can discuss</h2>
          <div>
            <Link href="/services/ai-consulting-abu-dhabi">AI strategy and readiness</Link>
            <Link href="/services/ai-integration">Enterprise AI integration</Link>
            <Link href="/services/agentic-ai-implementation">Agentic AI implementation</Link>
            <Link href="/services/custom-software-development">Custom software development</Link>
            <Link href="/services/ai-training-academy">AI training and Academy</Link>
            <Link href="/services/vr-training-simulation">VR training and simulation</Link>
          </div>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
