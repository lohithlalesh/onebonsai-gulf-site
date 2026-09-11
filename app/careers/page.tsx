import type { Metadata } from "next";
import CareerApplicationForm from "../CareerApplicationForm";
import JsonLd from "../JsonLd";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import { getRequestLocale } from "../i18n";
import { localizedAlternates } from "../seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const description = isArabic
    ? "انضم إلى فريق OneBonsai Gulf في أبوظبي. عرّفنا بمهاراتك في الذكاء الاصطناعي وأرسل ملفك على LinkedIn وأفضل أعمالك."
    : "Join OneBonsai Gulf in Abu Dhabi. Introduce your AI skill set with your name, LinkedIn profile, and one piece of work worth sharing.";

  return {
    title: isArabic ? "وظائف الذكاء الاصطناعي في أبوظبي" : "AI Careers in Abu Dhabi",
    description,
    alternates: localizedAlternates("/careers", locale),
    openGraph: {
      url: `${siteUrl}${isArabic ? "/ar" : ""}/careers`,
      locale: isArabic ? "ar_AE" : "en_AE",
      title: isArabic ? "انضم إلى فريق OneBonsai Gulf" : "Join OneBonsai Gulf",
      description,
    },
  };
}

export default async function CareersPage() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const pageUrl = `${siteUrl}${isArabic ? "/ar" : ""}/careers`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isArabic ? "العمل مع OneBonsai Gulf" : "Careers at OneBonsai Gulf",
    description: isArabic
      ? "صفحة التعارف للمتخصصين الراغبين في العمل مع فريق OneBonsai Gulf."
      : "An introduction page for specialists interested in working with OneBonsai Gulf.",
    url: pageUrl,
    about: { "@type": "Organization", "@id": `${siteUrl}/#organization` },
    inLanguage: isArabic ? "ar-AE" : "en-AE",
  };

  return (
    <>
      <JsonLd data={schema} />
      <a className="skip-link" href="#career-form">{isArabic ? "انتقل إلى نموذج التعارف" : "Skip to the introduction form"}</a>
      <SiteHeader />
      <ScrollReveal />
      <main className="inner-page-main careers-page">
        <section className="careers-hero section-pad" aria-labelledby="careers-title">
          <div className="careers-sticky-copy">
            <p className="section-kicker">{isArabic ? "اعمل معنا" : "Work with us"}</p>
            <h1 id="careers-title">
              <span>{isArabic ? "هل تشمل مهاراتك الذكاء الاصطناعي؟" : "Does your skill set include AI?"}</span>
              <span>{isArabic ? "نريدك معنا." : "We want you on board."}</span>
            </h1>
            <p className="careers-hero-intro">
              {isArabic ? "عرّفنا بنفسك. لا سيرة تقليدية ولا أسئلة لا تغيّر القرار." : "Introduce yourself. No traditional CV and no questions that should not change the decision."}
            </p>
          </div>
          <div id="career-form" className="careers-form-column">
            <CareerApplicationForm locale={locale} />
          </div>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
