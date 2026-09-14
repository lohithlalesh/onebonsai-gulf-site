import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import type { Locale } from "./locale";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function AboutSection({ locale = "en" }: { locale?: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section id="about" className="about-section section-pad" aria-labelledby="about-title">
      <div className="about-intro">
        <div className="about-parent-brand" aria-label={isArabic ? "الشركة الإقليمية الشقيقة لون بونساي" : "Regional sister company of OneBonsai"}>
          <span>{isArabic ? "الشركة الإقليمية الشقيقة لـ" : "Regional sister company of"}</span>
          <Image
            src={publicAsset("/brand/onebonsai-wordmark-black.png")}
            alt="OneBonsai"
            width={1600}
            height={181}
            sizes="(max-width: 760px) 62vw, 420px"
            loading="lazy"
            unoptimized
          />
        </div>
        <h2 id="about-title">{isArabic ? "خبرة أوروبية في التقنيات العميقة، بحضور محلي في أبوظبي." : "European DeepTech heritage. Built for sovereign delivery in Abu Dhabi."}</h2>
        <div className="about-intro-copy">
          <p>
            {isArabic
              ? "انطلقت ون بونساي في أوروبا عام 2014 لتطوير حلول التقنيات العميقة للبيئات المعقّدة. وفي 2026 توسّعت الخبرة إلى أبوظبي عبر ون بونساي الخليج، لمساعدة الجهات الحكومية والمؤسسات على بناء قدرات ذكاء اصطناعي سيادية، قابلة للتشغيل والقياس والنمو بثقة."
              : "Founded in Europe in 2014, OneBonsai has spent more than a decade delivering DeepTech for complex environments. In 2026, that experience expanded into Abu Dhabi through OneBonsai Gulf: a local team combining AI consulting, custom software, integration, and specialist expertise to build sovereign capability that can be operated, measured, and scaled with confidence."}
          </p>
          <a href="https://onebonsai.com" target="_blank" rel="noreferrer">
            {isArabic ? "اكتشف ون بونساي" : "Explore OneBonsai"}
            <ArrowUpRight className="directional-icon" size={15} weight="thin" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
