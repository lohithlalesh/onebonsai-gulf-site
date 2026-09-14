import Image from "next/image";
import Link from "next/link";
import { industries, industriesAr } from "./content/industries";
import { localizedPath, type Locale } from "./locale";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function HomeIndustries({ locale = "en" }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const localizedIndustries = isArabic ? industriesAr : industries;

  return (
    <section id="industries" className="home-industries section-pad" aria-labelledby="industries-title">
      <div className="home-industries-heading">
        <div>
          <p className="section-kicker">{isArabic ? "قطاعات نصنع فيها الفرق" : "Industries where we can help"}</p>
          <h2 id="industries-title">{isArabic ? "ذكاء اصطناعي تطبيقي للأنظمة التي تعتمد عليها دول الخليج." : "Applied AI for the systems the Gulf depends on."}</h2>
        </div>
        <div>
          <p>
            {isArabic ? "نجمع الاستشارات والبرمجيات المخصّصة وتكامل الأنظمة والخبرات المتخصصة والتدريب بالمحاكاة بما يلائم الواقع التشغيلي لكل قطاع." : "We combine AI consulting, custom software, integration, specialist talent, and immersive training around the operating realities of each sector."}
          </p>
          <Link href={localizedPath("/industries", locale)}>{isArabic ? "اكتشف فرص القطاعات" : "Explore industry opportunities"}</Link>
        </div>
      </div>
      <div className="home-industries-body">
        <figure className="home-industries-media">
          <Image
            src={publicAsset("/media/higgsfield-industries-uae-v1.jpg")}
            alt="Applied AI connecting UAE infrastructure, services, energy, and healthcare operations"
            width={1920}
            height={1071}
            sizes="(max-width: 760px) calc(100vw - 40px), 48vw"
            loading="lazy"
            unoptimized
          />
        </figure>
        <ol className="home-industry-index">
          {localizedIndustries.map((industry, index) => (
            <li key={industry.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{industry.name}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
