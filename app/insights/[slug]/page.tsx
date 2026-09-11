import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../JsonLd";
import PlanIntegrationButton from "../../PlanIntegrationButton";
import SiteContact from "../../SiteContact";
import SiteHeader from "../../SiteHeader";
import { getInsightAuthor } from "../../content/authors";
import { getInsight, insights } from "../../content/insights";
import { arabicInsightCards } from "../../content/insights-ar";
import { getRequestLocale } from "../../i18n";
import { localizedPath } from "../../locale";
import { compactSeoTitle, localizedAlternates, trimMetaDescription } from "../../seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const dateFormatters = {
  en: new Intl.DateTimeFormat("en-AE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  ar: new Intl.DateTimeFormat("ar-AE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};

function formatEditorialDate(date: string, locale: "en" | "ar") {
  return dateFormatters[locale].format(new Date(`${date}T00:00:00Z`));
}

type InsightPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  const locale = await getRequestLocale();
  const author = getInsightAuthor(insight.author);
  const localizedCard = locale === "ar" ? arabicInsightCards[insight.slug] : insight;
  const url = `${siteUrl}${locale === "ar" ? "/ar" : ""}/insights/${insight.slug}`;
  const seoTitle = locale === "ar"
    ? (localizedCard.title.length <= 42 ? localizedCard.title : `${localizedCard.title.slice(0, 39).trimEnd()}…`)
    : (insight.seoTitle ?? compactSeoTitle(localizedCard.title, insight.primaryKeyword));
  const seoDescription = trimMetaDescription(localizedCard.description);
  return {
    title: seoTitle,
    description: seoDescription,
    authors: [{ name: author.name, url: `${siteUrl}/authors/${author.slug}` }],
    alternates: localizedAlternates(`/insights/${insight.slug}`, locale),
    openGraph: {
      type: "article",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      url,
      title: localizedCard.title,
      description: localizedCard.description,
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
      authors: [`${siteUrl}/authors/${author.slug}`],
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const author = getInsightAuthor(insight.author);
  const localizedCard = isArabic ? arabicInsightCards[insight.slug] : insight;
  const url = `${siteUrl}${isArabic ? "/ar" : ""}/insights/${insight.slug}`;
  const authorUrl = `${siteUrl}${isArabic ? "/ar" : ""}/authors/${author.slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: localizedCard.title,
      description: localizedCard.description,
      image: `${siteUrl}/media/higgsfield-ai-insights-uae-v1.jpg`,
      datePublished: insight.publishedAt,
      ...(insight.updatedAt ? { dateModified: insight.updatedAt } : {}),
      mainEntityOfPage: url,
      author: {
        "@type": "Person",
        "@id": `${siteUrl}/authors/${author.slug}#person`,
        name: author.name,
        jobTitle: author.role,
        description: isArabic ? author.bioAr : author.bio,
        image: `${siteUrl}/team/${author.image}`,
        url: authorUrl,
        worksFor: { "@id": `${siteUrl}/#organization` },
      },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "OneBonsai Gulf" },
      about: insight.primaryKeyword,
      inLanguage: isArabic ? "ar-AE" : "en-AE",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: insight.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isArabic ? "الرئيسية" : "Home", item: `${siteUrl}${isArabic ? "/ar" : ""}` },
        { "@type": "ListItem", position: 2, name: isArabic ? "الرؤى" : "Insights", item: `${siteUrl}${isArabic ? "/ar" : ""}/insights` },
        { "@type": "ListItem", position: 3, name: localizedCard.title, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">{isArabic ? "الانتقال إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <main id="main-content" className="inner-page-main insight-page">
        <nav className="breadcrumbs section-pad" aria-label="Breadcrumb">
          <Link href={localizedPath("/", locale)}>{isArabic ? "الرئيسية" : "Home"}</Link><span>/</span><Link href={localizedPath("/insights", locale)}>{isArabic ? "الرؤى" : "Insights"}</Link><span>/</span><span aria-current="page">{localizedCard.cluster}</span>
        </nav>
        <article>
          <header className="insight-hero section-pad">
            <p className="section-kicker">{localizedCard.cluster}</p>
            <h1>{localizedCard.title}</h1>
            <p>{localizedCard.description}</p>
            <div className="insight-hero-meta">
              <span>{isArabic ? "بقلم" : "Written by"} <Link href={localizedPath(`/authors/${author.slug}`, locale)}>{author.name}</Link></span>
              <span>
                {insight.updatedAt ? (isArabic ? "حُدّث في" : "Updated") : (isArabic ? "نُشر في" : "Published")} {" "}
                <time dateTime={insight.updatedAt ?? insight.publishedAt}>{formatEditorialDate(insight.updatedAt ?? insight.publishedAt, locale)}</time>
              </span>
              <span>{insight.readTime}</span>
            </div>
          </header>
          <div className="insight-layout section-pad">
            <aside className="insight-tldr" aria-labelledby="tldr-title">
              <p className="section-kicker">TL;DR</p>
              <h2 id="tldr-title">{isArabic ? "الخلاصة التنفيذية" : "What to take away"}</h2>
              <ul>{insight.tldr.map((item) => <li key={item}>{item}</li>)}</ul>
              <PlanIntegrationButton>{isArabic ? "ناقش هذا الموضوع" : "Discuss this topic"}</PlanIntegrationButton>
            </aside>
            <div className="insight-body">
              {insight.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                  {section.matrix ? (
                    <div className="insight-table-wrap" tabIndex={0} role="region" aria-label={section.matrix.caption}>
                      <table>
                        <caption>{section.matrix.caption}</caption>
                        <thead><tr>{section.matrix.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                        <tbody>{section.matrix.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  ) : null}
                </section>
              ))}
              <section className="insight-faq" aria-labelledby="article-faq-title">
                <h2 id="article-faq-title">{isArabic ? "أسئلة شائعة" : "Frequently asked questions"}</h2>
                {insight.faqs.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}
              </section>
              {insight.sources?.length ? (
                <section className="insight-sources" aria-labelledby="sources-title">
                  <h2 id="sources-title">{isArabic ? "المصادر الرسمية وقراءات إضافية" : "Official sources and further reading"}</h2>
                  <ul>{insight.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
                </section>
              ) : null}
              <aside className="insight-author" aria-labelledby="article-author-title">
                <Image
                  src={publicAsset(`/team/${author.image}`)}
                  alt=""
                  width={240}
                  height={300}
                  sizes="96px"
                  loading="lazy"
                  unoptimized
                />
                <div>
                  <p className="section-kicker">{isArabic ? "عن الكاتب" : "About the author"}</p>
                  <h2 id="article-author-title"><Link href={localizedPath(`/authors/${author.slug}`, locale)}>{author.name}</Link></h2>
                  <p className="insight-author-role">{isArabic ? author.roleAr : author.role}</p>
                  <p>{isArabic ? author.bioAr : author.bio}</p>
                </div>
              </aside>
              <p className="insight-disclaimer">{isArabic ? "تقدّم هذه المقالة إرشادات تشغيلية عامة، ولا تمثّل استشارة قانونية أو تنظيمية أو سريرية أو هندسية أو مالية. يجب التحقق من المتطلبات وفق المؤسسة والقطاع وحالة الاستخدام." : "This article provides general operational guidance, not legal, regulatory, clinical, engineering, or financial advice. Requirements should be confirmed for the organization, sector, and use case."}</p>
            </div>
          </div>
        </article>
        <SiteContact />
      </main>
    </>
  );
}
