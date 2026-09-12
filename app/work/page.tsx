import type { Metadata } from "next";
import { getRequestLocale } from "../i18n";
import { localizedAlternates } from "../seo";
import CaseStudies from "../CaseStudies";
import ScrollReveal from "../ScrollReveal";
import SiteContact from "../SiteContact";
import SiteHeader from "../SiteHeader";
import WorkVisualStories from "../WorkVisualStories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://obgulf.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const title = isArabic ? "أعمال الذكاء الاصطناعي والبرمجيات" : "Custom Software Development Abu Dhabi";
  const description = isArabic
    ? "أمثلة على أعمال OneBonsai Gulf في الذكاء الاصطناعي والبرمجيات والتدريب الغامر، إضافة إلى Simplify Suite وشريك التحقق Blinking.id."
    : "Explore custom software development in Abu Dhabi, enterprise AI work, immersive training, Simplify Suite, and our Blinking.id partnership.";

  return {
    title,
    description,
    alternates: localizedAlternates("/work", locale),
    openGraph: {
      url: isArabic ? `${siteUrl}/ar/work` : `${siteUrl}/work`,
      locale: isArabic ? "ar_AE" : "en_AE",
      title: isArabic ? "أعمال مختارة | OneBonsai Gulf" : "Custom software development work in Abu Dhabi",
      description,
    },
  };
}

export default async function WorkPage() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";

  return (
    <>
      <a className="skip-link" href="#main-content">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader />
      <ScrollReveal />
      <main id="main-content" className="inner-page-main work-page">
        <section className="work-page-section section-pad" aria-labelledby="work-title">
          <header className="work-page-intro">
            <div>
              <p className="section-kicker">{isArabic ? "أعمال مختارة" : "Selected work"}</p>
              <h1 id="work-title">
                {isArabic
                  ? "ذكاء اصطناعي وبرمجيات وتدريب غامر للمهام عالية الأثر."
                  : "AI, software, and immersive training built for high-stakes work."}
              </h1>
            </div>
            <div>
              <p>
                {isArabic
                  ? "نستعرض مشكلات تشغيلية حقيقية، وخيار التنفيذ في كل حالة، والأدلة التي صُمم العمل لإنتاجها. تبقى هويات العملاء خاصة، بينما يظل منطق القرار واضحاً."
                  : "Our custom software development work in Abu Dhabi starts with a real operating problem, then makes the delivery choice and intended evidence explicit. Client identities remain private; the decision pattern stays visible."}
              </p>
            </div>
          </header>
          <WorkVisualStories locale={locale} />
          <section className="work-case-notes" aria-labelledby="work-case-notes-title">
            <header className="work-section-heading">
              <div>
                <p className="section-kicker">{isArabic ? "ملاحظات التنفيذ" : "Delivery notes"}</p>
                <h2 id="work-case-notes-title">
                  {isArabic ? "ما تغيّر ولماذا." : "What changed, and why."}
                </h2>
              </div>
              <p>
                {isArabic
                  ? "أربع حالات توضّح التحدي والنهج والنتيجة المقصودة من دون الكشف عن تفاصيل العميل."
                  : "Four sector-level cases set out the challenge, approach, and intended outcome without disclosing private client details."}
              </p>
            </header>
            <CaseStudies />
          </section>
        </section>
        <SiteContact />
      </main>
    </>
  );
}
