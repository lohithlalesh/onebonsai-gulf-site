import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "../JsonLd";
import PlanIntegrationButton from "../PlanIntegrationButton";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import { localizedAlternates } from "../seo";
import { industries } from "../content/industries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export const metadata: Metadata = {
  title: "AI Solutions by Industry UAE",
  description: "Explore practical AI, software, integration, training, and simulation opportunities across 11 priority industries in the UAE and Gulf.",
  alternates: localizedAlternates("/industries"),
  openGraph: {
    url: `${siteUrl}/industries`,
    title: "Applied AI across priority UAE industries",
    description: "Industry-aware AI consulting and implementation for government, critical infrastructure, finance, healthcare, aviation, energy, and more.",
  },
};

export default function IndustriesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries served by OneBonsai Gulf",
    itemListElement: industries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.name,
      description: industry.summary,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main industries-page">
        <section className="listing-hero section-pad" aria-labelledby="industries-page-title">
          <div>
            <p className="section-kicker">Industries where we can help</p>
            <h1 id="industries-page-title">Applied AI for the systems the Gulf depends on.</h1>
          </div>
          <div>
            <p>Every sector has different data, risk, users, and operating constraints. We start there—then combine strategy, software, integration, specialist expertise, and training around a real workflow.</p>
            <PlanIntegrationButton className="primary-button">Discuss your sector</PlanIntegrationButton>
          </div>
        </section>
        <figure className="listing-hero-media section-pad">
          <picture>
            <source media="(max-width: 760px)" srcSet={publicAsset("/media/higgsfield-industries-uae-v1-mobile.avif")} type="image/avif" />
            <Image
              src={publicAsset("/media/higgsfield-industries-uae-v1.avif")}
              alt="Applied AI connecting infrastructure, mobility, energy, healthcare, and public services in the UAE"
              width={1920}
              height={1071}
              sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 80px)"
              priority
              unoptimized
            />
          </picture>
        </figure>
        <section className="industry-directory section-pad" aria-label="Industry AI opportunities">
          {industries.map((industry, index) => (
            <article key={industry.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{industry.name}</h2>
                <p>{industry.summary}</p>
              </div>
              <ul>{industry.opportunities.map((opportunity) => <li key={opportunity}>{opportunity}</li>)}</ul>
            </article>
          ))}
        </section>
        <section className="industry-boundary section-pad" aria-labelledby="industry-boundary-title">
          <p className="section-kicker">A practical boundary</p>
          <h2 id="industry-boundary-title">Industry knowledge shapes the solution. Evidence decides whether it should scale.</h2>
          <p>We do not assume the same AI pattern works everywhere. We involve process owners and subject-matter experts, test in the intended setting, and keep consequential decisions with accountable people.</p>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
