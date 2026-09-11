import type { Metadata } from "next";
import AboutSection from "../AboutSection";
import AboutPeople from "../AboutPeople";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import TeamSection from "../TeamSection";
import { getRequestLocale } from "../i18n";
import { localizedAlternates } from "../seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  return {
    title: isArabic ? "عن ون بونساي الخليج: فريق الذكاء الاصطناعي في أبوظبي" : "Abu Dhabi AI Consulting Team",
    description: isArabic ? "تعرّف إلى فريق ون بونساي الخليج الذي يجمع استراتيجية الذكاء الاصطناعي والهندسة والتكامل والخبرات المتخصصة انطلاقاً من أبوظبي." : "Meet the OneBonsai Gulf team connecting AI strategy, custom software, integration, specialist talent, and immersive engineering from Abu Dhabi.",
    alternates: localizedAlternates("/about", locale),
    openGraph: {
      url: `${siteUrl}${isArabic ? "/ar" : ""}/about`,
      locale: isArabic ? "ar_AE" : "en_AE",
      title: isArabic ? "عن ون بونساي الخليج" : "About OneBonsai Gulf",
      description: isArabic ? "استراتيجية وهندسة وتكامل ذكاء اصطناعي وخبرات متخصصة تجتمع في أبوظبي." : "AI strategy, engineering, integration, and specialist talent brought together in Abu Dhabi.",
    },
  };
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";

  return (
    <>
      <a className="skip-link" href="#main-content">{isArabic ? "الانتقال إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main about-page">
        <section className="inner-page-hero section-pad" aria-labelledby="about-page-title">
          <p className="section-kicker">{isArabic ? "عن ون بونساي الخليج" : "About OneBonsai Gulf"}</p>
          <h1 id="about-page-title">{isArabic ? "شركة ذكاء اصطناعي من أبوظبي، تحوّل الطموح إلى قدرات تشغيلية راسخة." : "An Abu Dhabi AI company built to turn ambition into operating capability."}</h1>
          <p>{isArabic ? "نساند القيادات في رسم الاتجاه، ونبني التقنية ونربطها بالأنظمة، ونستقطب الخبرات المتخصصة، ثم نمكّن الفرق من امتلاك ما يدخل حيّز التشغيل." : "We advise leaders, build and integrate technology, connect specialist people, and help teams take ownership of what enters production."}</p>
        </section>
        <AboutSection locale={locale} />
        <AboutPeople locale={locale} />
        <TeamSection locale={locale} />
        <SiteContact />
      </main>
    </>
  );
}
