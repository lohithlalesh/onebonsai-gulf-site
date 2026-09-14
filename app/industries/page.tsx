import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "../JsonLd";
import PlanIntegrationButton from "../PlanIntegrationButton";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import { getRequestLocale } from "../i18n";
import { localizedPath } from "../locale";
import { localizedAlternates } from "../seo";
import { industries, industriesAr } from "../content/industries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const title = isArabic ? "حلول الذكاء الاصطناعي حسب القطاع في الإمارات" : "AI Solutions by Industry UAE";
  const description = isArabic
    ? "حلول عملية للذكاء الاصطناعي والبرمجيات والتكامل والتدريب بالمحاكاة عبر 11 قطاعاً رئيسياً في دولة الإمارات ودول الخليج."
    : "Explore practical AI, software, integration, training, and simulation opportunities across 11 priority industries in the UAE and Gulf.";

  return {
    title,
    description,
    alternates: localizedAlternates("/industries", locale),
    openGraph: {
      url: `${siteUrl}${localizedPath("/industries", locale)}`,
      locale: isArabic ? "ar_AE" : "en_AE",
      title: isArabic ? "ذكاء اصطناعي تطبيقي للقطاعات الرئيسية في الإمارات" : "Applied AI across priority UAE industries",
      description: isArabic
        ? "استشارات وتنفيذ ذكاء اصطناعي تراعي متطلبات الحكومة والبنية التحتية والتمويل والرعاية الصحية والطيران والطاقة وغيرها."
        : "Industry-aware AI consulting and implementation for government, critical infrastructure, finance, healthcare, aviation, energy, and more.",
    },
  };
}

export default async function IndustriesPage() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const localizedIndustries = isArabic ? industriesAr : industries;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isArabic ? "القطاعات التي تخدمها ون بونساي الخليج" : "Industries served by OneBonsai Gulf",
    inLanguage: isArabic ? "ar-AE" : "en-AE",
    itemListElement: localizedIndustries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.name,
      description: industry.summary,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#main-content">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main industries-page">
        <section className="listing-hero section-pad" aria-labelledby="industries-page-title">
          <div>
            <p className="section-kicker">{isArabic ? "القطاعات التي ندعمها" : "Industries where we can help"}</p>
            <h1 id="industries-page-title">{isArabic ? "ذكاء اصطناعي تطبيقي للأنظمة التي تعتمد عليها دول الخليج." : "Applied AI for the systems the Gulf depends on."}</h1>
          </div>
          <div>
            <p>{isArabic ? "لكل قطاع بياناته ومخاطره ومستخدموه وقيوده التشغيلية. ننطلق من هذا الواقع، ثم نجمع الاستراتيجية والبرمجيات والتكامل والخبرات المتخصصة والتدريب حول مسار عمل حقيقي." : "Every sector has different data, risk, users, and operating constraints. We start there, then combine strategy, software, integration, specialist expertise, and training around a real workflow."}</p>
            <PlanIntegrationButton className="primary-button">{isArabic ? "ناقش قطاعك" : "Discuss your sector"}</PlanIntegrationButton>
          </div>
        </section>
        <figure className="listing-hero-media section-pad">
          <picture>
            <source media="(max-width: 760px)" srcSet={publicAsset("/media/higgsfield-industries-uae-v1-mobile.avif")} type="image/avif" />
            <Image
              src={publicAsset("/media/higgsfield-industries-uae-v1.avif")}
              alt={isArabic ? "ذكاء اصطناعي تطبيقي يربط البنية التحتية والنقل والطاقة والرعاية الصحية والخدمات الحكومية في الإمارات" : "Applied AI connecting infrastructure, mobility, energy, healthcare, and public services in the UAE"}
              width={1920}
              height={1071}
              sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 80px)"
              priority
              unoptimized
            />
          </picture>
        </figure>
        <section className="industry-directory section-pad" aria-label={isArabic ? "فرص الذكاء الاصطناعي حسب القطاع" : "Industry AI opportunities"}>
          {localizedIndustries.map((industry, index) => (
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
          <p className="section-kicker">{isArabic ? "حد عملي واضح" : "A practical boundary"}</p>
          <h2 id="industry-boundary-title">{isArabic ? "معرفة القطاع تشكّل الحل، والأدلة تحدد ما إذا كان جديراً بالتوسّع." : "Industry knowledge shapes the solution. Evidence decides whether it should scale."}</h2>
          <p>{isArabic ? "لا نفترض أن نمطاً واحداً من الذكاء الاصطناعي يصلح لكل القطاعات. نُشرك مسؤولي العمليات وخبراء المجال، نختبر في البيئة المقصودة، ونُبقي القرارات المؤثرة بيد أشخاص يتحملون مسؤوليتها." : "We do not assume the same AI pattern works everywhere. We involve process owners and subject-matter experts, test in the intended setting, and keep consequential decisions with accountable people."}</p>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
