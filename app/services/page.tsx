import type { Metadata } from "next";
import { localizedAlternates } from "../seo";
import Image from "next/image";
import Link from "next/link";
import { getRequestLocale } from "../i18n";
import { localizedPath } from "../locale";
import JsonLd from "../JsonLd";
import PlanIntegrationButton from "../PlanIntegrationButton";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import { getService, services } from "../content/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const title = isArabic ? "خدمات الذكاء الاصطناعي والبرمجيات في الإمارات" : "AI Agency & Consulting Services UAE";
  const description = isArabic
    ? "خدمات استشارات وتكامل الذكاء الاصطناعي والبرمجيات المخصّصة والتدريب وتحسين الظهور في البحث الذكي من أبوظبي للمؤسسات الإماراتية."
    : "Explore OneBonsai Gulf, an Abu Dhabi AI agency for enterprise AI consulting, integration, agentic AI, custom software, AI search optimization, training, and VR simulation.";

  return {
    title,
    description,
    alternates: localizedAlternates("/services", locale),
    openGraph: {
      url: `${siteUrl}${localizedPath("/services", locale)}`,
      locale: isArabic ? "ar_AE" : "en_AE",
      title: isArabic ? "خدمات الذكاء الاصطناعي والبرمجيات المخصّصة في الإمارات" : "AI agency and custom software services in the UAE",
      description: isArabic ? "من استراتيجية الذكاء الاصطناعي إلى التكامل والإطلاق والظهور في البحث والتدريب والمحاكاة." : "From AI strategy to production integration, software delivery, AI search visibility, training, and immersive simulation.",
    },
  };
}

export default async function ServicesPage() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const localizedServices = services.map((service) => getService(service.slug, locale) ?? service);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "OneBonsai Gulf services",
    itemListElement: localizedServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${siteUrl}${localizedPath(`/services/${service.slug}`, locale)}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <a className="skip-link" href="#main-content">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main listing-page">
        <section className="listing-hero section-pad" aria-labelledby="services-page-title">
          <div>
            <p className="section-kicker">{isArabic ? "الخدمات" : "Services"}</p>
            <h1 id="services-page-title">{isArabic ? "استشارات الذكاء الاصطناعي وتكامله والبرمجيات المخصّصة للمؤسسات الإماراتية." : "AI consulting, integration, and custom software for UAE organizations."}</h1>
          </div>
          <div>
            <p>{isArabic ? "ون بونساي الخليج شركة ذكاء اصطناعي في أبوظبي للمؤسسات التي تحتاج إلى ما يتجاوز العرض التجريبي. ابدأ بالقرار أو سير العمل أو القدرة التي تهمكم، وسنساعدكم على تحديد الاتجاه وبناء النظام وربط الخبرات المتخصصة وتشغيل ما يلي." : "OneBonsai Gulf is an Abu Dhabi AI agency for organizations that need more than a demo. Start with the decision, workflow, or capability that matters; we can advise the direction, build the system, connect specialist people, and help your team operate what comes next."}</p>
            <PlanIntegrationButton className="primary-button">{isArabic ? "ناقش مبادرة ذكاء اصطناعي" : "Discuss an AI initiative"}</PlanIntegrationButton>
          </div>
        </section>
        <figure className="listing-hero-media section-pad">
          <picture>
            <source media="(max-width: 760px)" srcSet={publicAsset("/media/higgsfield-ai-services-uae-v1-mobile.avif")} type="image/avif" />
            <Image
              src={publicAsset("/media/higgsfield-ai-services-uae-v1.avif")}
              alt={isArabic ? "فريق قيادة وهندسة إماراتي يرسم سير عمل للذكاء الاصطناعي المؤسسي" : "UAE leadership and engineering team mapping an enterprise AI workflow"}
              width={1920}
              height={1071}
              sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 80px)"
              priority
              unoptimized
            />
          </picture>
        </figure>
        <section className="service-directory section-pad" aria-label={isArabic ? "مجالات خدمات ون بونساي الخليج" : "OneBonsai Gulf service areas"}>
          {localizedServices.map((service, index) => (
            <article key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{service.eyebrow}</p>
                <h2><Link href={localizedPath(`/services/${service.slug}`, locale)}>{service.title}</Link></h2>
                <p>{service.description}</p>
              </div>
              <Link href={localizedPath(`/services/${service.slug}`, locale)} aria-label={isArabic ? `استكشف ${service.name}` : `Explore ${service.name}`}>{isArabic ? "استكشف الخدمة" : "Explore service"} <b className="directional-icon" aria-hidden="true">{isArabic ? "↖" : "↗"}</b></Link>
            </article>
          ))}
        </section>
        <SiteContact />
      </main>
    </>
  );
}
