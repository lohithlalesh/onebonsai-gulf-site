import type { Metadata } from "next";
import { localizedAlternates } from "../seo";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../JsonLd";
import PlanIntegrationButton from "../PlanIntegrationButton";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import { services } from "../content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export const metadata: Metadata = {
  title: "AI Agency & Consulting Services UAE",
  description: "Explore OneBonsai Gulf, an Abu Dhabi AI agency for enterprise AI consulting, integration, agentic AI, custom software, corporate training, and VR simulation.",
  alternates: localizedAlternates("/services"),
  openGraph: {
    url: `${siteUrl}/services`,
      title: "AI agency and custom software services in the UAE",
    description: "From AI strategy to production integration, software delivery, training, and immersive simulation.",
  },
};

export default function ServicesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "OneBonsai Gulf services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${siteUrl}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main listing-page">
        <section className="listing-hero section-pad" aria-labelledby="services-page-title">
          <div>
            <p className="section-kicker">Services</p>
            <h1 id="services-page-title">AI consulting, integration, and custom software for UAE organizations.</h1>
          </div>
          <div>
            <p>OneBonsai Gulf is an Abu Dhabi AI agency for organizations that need more than a demo. Start with the decision, workflow, or capability that matters; we can advise the direction, build the system, connect specialist people, and help your team operate what comes next.</p>
            <PlanIntegrationButton className="primary-button">Discuss an AI initiative</PlanIntegrationButton>
          </div>
        </section>
        <figure className="listing-hero-media section-pad">
          <picture>
            <source media="(max-width: 760px)" srcSet={publicAsset("/media/higgsfield-ai-services-uae-v1-mobile.avif")} type="image/avif" />
            <Image
              src={publicAsset("/media/higgsfield-ai-services-uae-v1.avif")}
              alt="UAE leadership and engineering team mapping an enterprise AI workflow"
              width={1920}
              height={1071}
              sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 80px)"
              priority
              unoptimized
            />
          </picture>
        </figure>
        <section className="service-directory section-pad" aria-label="OneBonsai Gulf service areas">
          {services.map((service, index) => (
            <article key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{service.eyebrow}</p>
                <h2><Link href={`/services/${service.slug}`}>{service.title}</Link></h2>
                <p>{service.description}</p>
              </div>
              <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.name}`}>Explore service <b className="directional-icon" aria-hidden="true">↗</b></Link>
            </article>
          ))}
        </section>
        <SiteContact />
      </main>
    </>
  );
}
