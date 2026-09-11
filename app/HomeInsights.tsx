import Link from "next/link";
import { insights } from "./content/insights";
import { arabicInsightCards } from "./content/insights-ar";
import { localizedPath, type Locale } from "./locale";

export default function HomeInsights({ locale = "en" }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const featuredSlugs = [
    "agentic-ai-implementation-uae",
    "ai-consulting-uae-from-strategy-to-production",
    "ai-readiness-assessment-checklist",
    "enterprise-ai-integration-uae-guide",
  ];
  const featured = featuredSlugs.flatMap((slug) => insights.filter((insight) => insight.slug === slug));

  return (
    <section className="home-insights section-pad" aria-labelledby="home-insights-title">
      <header className="home-insights-heading">
        <div>
          <p className="section-kicker">{isArabic ? "الرؤى" : "Insights"}</p>
          <h2 id="home-insights-title">{isArabic ? "رؤى عملية لقرارات الذكاء الاصطناعي في دولة الإمارات." : "Practical guidance for AI decisions in the UAE."}</h2>
        </div>
        <Link href={localizedPath("/insights", locale)}>{isArabic ? "اقرأ الأدلة العشرين" : "Read all 20 guides"}</Link>
      </header>
      <div className="home-insights-list">
        {featured.map((insight, index) => (
          <article key={insight.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>{insight.cluster}</p>
              <h3><Link href={localizedPath(`/insights/${insight.slug}`, locale)}>{isArabic ? arabicInsightCards[insight.slug].title : insight.title}</Link></h3>
              <small>{insight.readTime}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
