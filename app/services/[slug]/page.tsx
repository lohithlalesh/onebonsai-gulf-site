import type { Metadata } from "next";
import Image from "next/image";
import { getRequestLocale } from "../../i18n";
import { localizedPath } from "../../locale";
import { localizedAlternates } from "../../seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../JsonLd";
import PlanIntegrationButton from "../../PlanIntegrationButton";
import ScrollReveal from "../../ScrollReveal";
import SiteContact from "../../SiteContact";
import SiteHeader from "../../SiteHeader";
import { getService, services } from "../../content/services";
import ServiceDiagram from "../../../components/ServiceDiagrams";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const visualAsset = (path: string) => path.endsWith(".jpg") ? path.replace(/\.jpg$/, ".avif") : path;

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const service = getService(slug, locale);
  if (!service) return {};
  const isArabic = locale === "ar";
  const path = `/services/${service.slug}`;
  const url = `${siteUrl}${localizedPath(path, locale)}`;
  const image = new URL(service.image, siteUrl).toString();

  return {
    title: service.eyebrow,
    description: service.description,
    keywords: [service.primaryKeyword, ...service.relatedKeywords],
    alternates: localizedAlternates(path, locale),
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url,
      title: service.eyebrow,
      description: service.description,
      images: [{ url: image, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.eyebrow,
      description: service.description,
      images: [image],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const service = getService(slug, locale);
  if (!service) notFound();
  const isArabic = locale === "ar";
  const servicePath = `/services/${service.slug}`;
  const url = `${siteUrl}${localizedPath(servicePath, locale)}`;
  const copy = isArabic ? {
    skip: "انتقل إلى المحتوى",
    home: "الرئيسية",
    services: "الخدمات",
    directAnswer: "إجابة مباشرة",
    twinQuestion: "ما هو التوأم الرقمي؟",
    twinAnswer: "التوأم الرقمي هو تمثيل افتراضي لأصل مادي أو مسار عمل أو منشأة. يستخدم بيانات التشغيل والسلوك المحدد لاختبار التغييرات قبل تطبيقها في الواقع، بما يتيح فحص القيود والتدرّب على الإجراءات ومقارنة القرارات من دون تعطيل العملية الحية.",
    searchQuestion: "ما هو تحسين البحث المدعوم بالذكاء الاصطناعي؟",
    searchAnswer: "هو تحسين دقة اكتشاف المؤسسة وخبرتها واسترجاعها وفهمها والاستشهاد بها في البحث التقليدي والإجابات المولدة. ويجمع بين تحسين البحث التقني وبنية المعلومات واتساق الكيانات والمحتوى القائم على الأدلة والسلطة الخارجية والقياس المستمر.",
    discuss: "ناقش هذه القدرة معنا",
    visual: "صورة الخدمة",
    visualCaption: "سياق تشغيلي.",
    outcomeKicker: "ما الذي يجب أن ينتجه العمل",
    outcomes: "النتائج قبل المخرجات.",
    capabilities: "القدرات",
    capabilitiesTitle: "العمل الذي تقف عليه الخدمة.",
    guidance: "إرشادات للمشترين",
    guidanceTitle: "قرارات ينبغي حسمها قبل التنفيذ.",
    delivery: "التنفيذ",
    deliveryTitle: "مسار مضبوط للوصول إلى أدلة مفيدة.",
    related: "تدريب ذو صلة",
    relatedTitle: "تدريب غامر لممارسة قابلة للتكرار.",
    relatedCopy: "تحصل المؤسسات التعليمية على خصم 50% على جميع وحدات التدريب الجاهزة بالواقع الافتراضي.",
    relatedLink: "استكشف التدريب والمحاكاة بالواقع الافتراضي",
    questions: "الأسئلة",
    questionsTitle: "ما الذي تسأل عنه الفرق قبل البدء.",
    references: "مصادر موثوقة",
    referencesTitle: "إرشادات وأبحاث أولية تدعم منهج العمل.",
  } : {
    skip: "Skip to content",
    home: "Home",
    services: "Services",
    directAnswer: "Direct answer",
    twinQuestion: "What is a digital twin?",
    twinAnswer: "A digital twin is a virtual replica of a physical asset, workflow, or facility. It uses operational data and defined behaviour to test changes before they are made in the real world, helping teams examine constraints, practise procedures, and compare decisions without interrupting the live operation.",
    searchQuestion: "What is AI search optimization?",
    searchAnswer: "AI search optimization improves how accurately an organization and its expertise can be discovered, retrieved, understood, and cited across conventional search and AI-generated answers. It combines technical SEO, information architecture, entity consistency, evidence-led content, external authority, and ongoing measurement.",
    discuss: "Discuss this capability",
    visual: "Visual",
    visualCaption: "Operational context.",
    outcomeKicker: "What the work should produce",
    outcomes: "Outcomes before outputs.",
    capabilities: "Capabilities",
    capabilitiesTitle: "The work behind the service.",
    guidance: "Buyer guidance",
    guidanceTitle: "Decisions to settle before delivery.",
    delivery: "Delivery",
    deliveryTitle: "A controlled path to useful evidence.",
    related: "Related training",
    relatedTitle: "Immersive training for repeatable practice.",
    relatedCopy: "Educational institutions receive 50% off all ready-made VR training modules.",
    relatedLink: "Explore VR training and simulation",
    questions: "Questions",
    questionsTitle: "What teams ask before starting.",
    references: "Primary sources",
    referencesTitle: "Guidance and research behind the working method.",
  };
  const directAnswer = service.slug === "digital-twins-simulation"
    ? { question: copy.twinQuestion, answer: copy.twinAnswer }
    : service.slug === "ai-search-optimization"
      ? { question: copy.searchQuestion, answer: copy.searchAnswer }
      : null;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.description,
      url,
      image: new URL(service.image, siteUrl).toString(),
      inLanguage: isArabic ? "ar-AE" : "en-AE",
      provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "OneBonsai Gulf" },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${siteUrl}${localizedPath("/", locale)}` },
        { "@type": "ListItem", position: 2, name: copy.services, item: `${siteUrl}${localizedPath("/services", locale)}` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main service-page">
        <nav className="breadcrumbs section-pad" aria-label="Breadcrumb">
          <Link href={localizedPath("/", locale)}>{copy.home}</Link><span>/</span><Link href={localizedPath("/services", locale)}>{copy.services}</Link><span>/</span><span aria-current="page">{service.name}</span>
        </nav>
        <section className="service-hero section-pad" aria-labelledby="service-title">
          <div>
            <p className="section-kicker">{service.eyebrow}</p>
            <h1 id="service-title">{service.headline}</h1>
            <p className="service-hero-tagline">{service.title}</p>
          </div>
          <div>
            {directAnswer ? (
              <section className="service-hero-direct-answer" aria-labelledby="service-definition-title">
                <p className="section-kicker">{copy.directAnswer}</p>
                <h2 id="service-definition-title">{directAnswer.question}</h2>
                <p>{directAnswer.answer}</p>
              </section>
            ) : null}
            <p>{service.summary}</p>
            <PlanIntegrationButton className="primary-button">{copy.discuss}</PlanIntegrationButton>
            <ServiceDiagram slug={service.slug} />
          </div>
        </section>
        <figure className="service-feature-media section-pad mechanical-reveal">
          <div>
            <Image
              src={publicAsset(visualAsset(service.image))}
              alt={isArabic ? `صورة توضيحية لخدمة ${service.name}` : service.imageAlt}
              width={1600}
              height={900}
              sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 80px)"
              loading="lazy"
              unoptimized
            />
          </div>
          <figcaption><span>{copy.visual}</span>{copy.visualCaption}</figcaption>
        </figure>
        <section className="service-outcomes section-pad" aria-labelledby="outcomes-title">
          <div><p className="section-kicker">{copy.outcomeKicker}</p><h2 id="outcomes-title">{copy.outcomes}</h2></div>
          <ol>{service.outcomes.map((outcome, index) => <li key={outcome}><span>{String(index + 1).padStart(2, "0")}</span>{outcome}</li>)}</ol>
        </section>
        <section className="service-capabilities section-pad" aria-labelledby="capabilities-title">
          <header><p className="section-kicker">{copy.capabilities}</p><h2 id="capabilities-title">{copy.capabilitiesTitle}</h2></header>
          <div>{service.capabilities.map((capability) => <article key={capability.title}><h3>{capability.title}</h3><p>{capability.copy}</p></article>)}</div>
        </section>
        {service.guidance?.length ? (
          <section className="service-guidance section-pad" aria-labelledby="guidance-title">
            <header>
              <p className="section-kicker">{copy.guidance}</p>
              <h2 id="guidance-title">{copy.guidanceTitle}</h2>
            </header>
            <div className="service-guidance-body">
              {service.guidance.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  {item.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {item.points?.length ? <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
        <section className="service-process section-pad" aria-labelledby="service-process-title">
          <header><p className="section-kicker">{copy.delivery}</p><h2 id="service-process-title">{copy.deliveryTitle}</h2></header>
          <ol>{service.process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
        </section>
        {service.slug === "ai-training-academy" ? (
          <aside className="service-related section-pad" aria-labelledby="academy-vr-title">
            <p className="section-kicker">{copy.related}</p>
            <h2 id="academy-vr-title">{copy.relatedTitle}</h2>
            <p>{copy.relatedCopy}</p>
            <Link href={localizedPath("/services/vr-training-simulation", locale)}>{copy.relatedLink} <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span></Link>
          </aside>
        ) : null}
        <section className="faq-section section-pad" aria-labelledby="faq-title">
          <header><p className="section-kicker">{copy.questions}</p><h2 id="faq-title">{copy.questionsTitle}</h2></header>
          <div>{service.faqs.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
        </section>
        {service.references?.length ? (
          <section className="service-references section-pad" aria-labelledby="service-references-title">
            <header>
              <p className="section-kicker">{copy.references}</p>
              <h2 id="service-references-title">{copy.referencesTitle}</h2>
            </header>
            <ol>
              {service.references.map((reference, index) => (
                <li key={reference.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href={reference.href} target="_blank" rel="noopener noreferrer">
                    {reference.label} <b className="directional-icon" aria-hidden="true">{isArabic ? "↖" : "↗"}</b>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        <SiteContact />
      </main>
    </>
  );
}
