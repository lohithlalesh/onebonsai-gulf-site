import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "../JsonLd";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import { getInsightAuthor } from "../content/authors";
import { insights } from "../content/insights";
import { arabicInsightCards } from "../content/insights-ar";
import { getRequestLocale } from "../i18n";
import { localizedPath } from "../locale";
import { localizedAlternates } from "../seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export const metadata: Metadata = {
  title: "UAE AI Insights & Guides",
  description: "Twenty practical guides to AI consulting, implementation, custom software, governance, training, and industry use cases in the UAE.",
  alternates: localizedAlternates("/insights"),
  openGraph: {
    url: `${siteUrl}/insights`,
    title: "OneBonsai Gulf AI insights",
    description: "Practical guidance for leaders building and governing AI in the UAE.",
  },
};

export default async function InsightsPage() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "OneBonsai Gulf insights",
    description: metadata.description,
    url: `${siteUrl}/insights`,
    hasPart: insights.map((insight) => ({
      "@type": "Article",
      headline: insight.title,
      url: `${siteUrl}/insights/${insight.slug}`,
      author: {
        "@type": "Person",
        name: getInsightAuthor(insight.author).name,
        url: `${siteUrl}/authors/${getInsightAuthor(insight.author).slug}`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">{isArabic ? "الانتقال إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main insights-page">
        <section className="listing-hero section-pad" aria-labelledby="insights-title">
          <div>
            <p className="section-kicker">{isArabic ? "الرؤى" : "Insights"}</p>
            <h1 id="insights-title">{isArabic ? "رؤى عملية لقرارات الذكاء الاصطناعي في دولة الإمارات." : "Practical guidance for AI decisions in the UAE."}</h1>
          </div>
          <div>
            <p>{isArabic ? "عشرون دليلاً واضحاً للقيادات وفرق المنتجات والتشغيل والخبراء، تساعدهم على الانتقال من الاهتمام بالذكاء الاصطناعي إلى استخدام منضبط وقابل للقياس." : "Twenty clear guides for leaders, product teams, operators, and subject-matter experts moving from interest in AI to governed, measurable use."}</p>
          </div>
        </section>
        <figure className="listing-hero-media section-pad">
          <picture>
            <source media="(max-width: 760px)" srcSet={publicAsset("/media/higgsfield-ai-insights-uae-v1-mobile.avif")} type="image/avif" />
            <Image
              src={publicAsset("/media/higgsfield-ai-insights-uae-v1.avif")}
              alt="A UAE multidisciplinary team reviewing an enterprise AI architecture and governance map"
              width={1920}
              height={1071}
              sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 80px)"
              priority
              unoptimized
            />
          </picture>
        </figure>
        <section className="insight-directory section-pad" aria-label="AI insight articles">
          {insights.map((insight, index) => {
            const author = getInsightAuthor(insight.author);
            return (
              <article key={insight.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{isArabic ? arabicInsightCards[insight.slug].cluster : insight.cluster} · {isArabic ? "بقلم" : "By"} {author.name} · {insight.readTime}</p>
                  <h2><Link href={localizedPath(`/insights/${insight.slug}`, locale)}>{isArabic ? arabicInsightCards[insight.slug].title : insight.title}</Link></h2>
                  <p>{isArabic ? arabicInsightCards[insight.slug].description : insight.description}</p>
                </div>
                <Link href={localizedPath(`/insights/${insight.slug}`, locale)} aria-label={isArabic ? `اقرأ ${insight.title}` : `Read ${insight.title}`}>{isArabic ? "اقرأ الدليل" : "Read guide"} <b aria-hidden="true">{isArabic ? "↖" : "↗"}</b></Link>
              </article>
            );
          })}
        </section>
        <SiteContact />
      </main>
    </>
  );
}
