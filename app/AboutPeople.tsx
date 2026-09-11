import Image from "next/image";
import type { Locale } from "./locale";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function AboutPeople({ locale = "en" }: { locale?: Locale }) {
  const isArabic = locale === "ar";

  return (
      <section className="founder-section" aria-labelledby="founder-title">
        <div className="founder-stage mechanical-reveal">
          <figure className="founder-portrait">
            <div className="founder-portrait-media">
              <Image
                src={publicAsset("/team/ivan-founder-office.jpg")}
                alt="OneBonsai Gulf founder seated in an Abu Dhabi office"
                fill
                loading="lazy"
                sizes="100vw"
                unoptimized
              />
            </div>
            <div className="founder-stage-shade" aria-hidden="true" />
            <p className="founder-display">
              <span>{isArabic ? "المؤسس والرئيس التنفيذي" : "CEO & Founder"}</span>
              <span>Ivan M Grey</span>
            </p>
          </figure>

          <article className="founder-story">
            <p className="section-kicker">{isArabic ? "من رؤية المؤسس" : "A note from our founder"}</p>
            <h2 id="founder-title">
              {isArabic ? (
                <><span>«العالم لا يحتاج إلى مزيد من الحديث عن الذكاء الاصطناعي.</span><span>بل يحتاج إلى شركات تعرف كيف تحوّله إلى نتائج.»</span></>
              ) : (
                <><span>“The world does not need more conversations about AI.</span><span>It needs companies that know how to turn AI into results.”</span></>
              )}
            </h2>
          </article>

        </div>

        <div className="founder-after">
          <div>
            <div className="founder-story-copy">
              <p>
                {isArabic ? "لهذا أسّسنا ون بونساي الخليج في أبوظبي: لننقل المؤسسات من الطموح والتجربة إلى أنظمة تعمل فعلاً." : "That is why we built OneBonsai Gulf in Abu Dhabi: to move organizations from ambition and experimentation into working systems."}
              </p>
              <p>
                {isArabic ? "نبني على خبرة شركتنا الشقيقة البلجيكية الممتدة منذ 2014 في التقنيات العميقة، ونجمع بين هندسة أثبتت جدواها وفهم محلي للاستراتيجية والتكامل والتنفيذ." : "We build on DeepTech delivery experience dating to 2014 through our Belgian sister company, combining proven engineering with local strategy, integration, and implementation."}
              </p>
            </div>
            <p className="founder-ambition">
              {isArabic ? "طموحنا أن نكون من أكثر شركات التحول بالذكاء الاصطناعي ثقةً في المنطقة: ننطلق من أبوظبي، وننافس عالمياً. وهذه ليست إلا البداية." : "Our ambition is to become one of the region's most trusted AI transformation companies, built in Abu Dhabi and able to compete globally. We are only getting started."}
            </p>
          </div>
        </div>
      </section>
  );
}
