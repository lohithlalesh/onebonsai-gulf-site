import type { Metadata } from "next";
import AboutPrinciples from "./AboutPrinciples";
import Link from "next/link";
import ClarityJourney from "./ClarityJourney";
import CustomerMarquee from "./CustomerMarquee";
import EditorialLoop from "./EditorialLoop";
import HomeIndustries from "./HomeIndustries";
import HomeInsights from "./HomeInsights";
import IntegrationMap from "./IntegrationMap";
import ScrollJourney from "./ScrollJourney";
import ScrollReveal from "./ScrollReveal";
import SiteContact from "./SiteContact";
import SiteHeader from "./SiteHeader";
import { getRequestLocale } from "./i18n";
import { localizedPath } from "./locale";
import { localizedAlternates } from "./seo";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const specialistServices = [
  {
    title: "VR Training & Simulation",
    copy: "Practise high-risk or complex work without interrupting live operations.",
    items: ["Safety training", "Digital twins", "Virtual humans", "Learning analytics"],
  },
  {
    title: "Cybersecurity & Secure AI",
    copy: "Design the controls, architecture, and training required for secure deployment.",
    items: ["Secure AI deployment", "Cyber training", "Risk governance", "Operational safeguards"],
  },
  {
    title: "AI Academy & Adoption",
    copy: "Train leaders and teams on the tools and decisions they face at work.",
    items: ["Executive programs", "Team training", "Workforce upskilling", "Responsible AI"],
  },
];

const arabicSpecialistServices = [
  {
    title: "التدريب والمحاكاة بالواقع الافتراضي",
    copy: "تدرّب على الأعمال عالية المخاطر أو المعقّدة من دون تعطيل العمليات الفعلية.",
    items: ["تدريب السلامة", "التوائم الرقمية", "الشخصيات الافتراضية", "تحليلات التعلّم"],
  },
  {
    title: "الأمن السيبراني والذكاء الاصطناعي الآمن",
    copy: "صمّم الضوابط والبنية والتدريب اللازم للتفعيل الآمن.",
    items: ["تفعيل آمن للذكاء الاصطناعي", "تدريب سيبراني", "حوكمة المخاطر", "ضوابط تشغيلية"],
  },
  {
    title: "أكاديمية الذكاء الاصطناعي والتبنّي",
    copy: "درّب القيادات والفرق على الأدوات والقرارات التي تواجهها في العمل.",
    items: ["برامج تنفيذية", "تدريب الفرق", "تطوير مهارات القوى العاملة", "ذكاء اصطناعي مسؤول"],
  },
];

const programs = [
  "AI for CEOs",
  "AI governance",
  "Copilot and Gemini",
  "Prompt engineering",
  "AI agents",
  "Responsible AI",
];

const arabicPrograms = ["الذكاء الاصطناعي للرؤساء التنفيذيين", "حوكمة الذكاء الاصطناعي", "Copilot وGemini", "هندسة الأوامر", "وكلاء الذكاء الاصطناعي", "الذكاء الاصطناعي المسؤول"];

const products = [
  ["Tarteeb", "Home and lifestyle intelligence", "Life admin powered by AI"],
  ["Marengo", "The intelligent equestrian platform", "Equine data, connected globally"],
  ["MedHub", "AI healthcare navigation", "Clearer access to care"],
];

const arabicProducts = [
  ["Tarteeb", "ذكاء المنزل وأسلوب الحياة", "إدارة الحياة اليومية بالذكاء الاصطناعي"],
  ["Marengo", "المنصة الذكية للفروسية", "بيانات الخيل مترابطة عالمياً"],
  ["MedHub", "التوجيه الصحي بالذكاء الاصطناعي", "وصول أوضح إلى الرعاية"],
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  if (locale === "ar") {
    return {
      title: { absolute: "تكامل الذكاء الاصطناعي والبرمجيات المخصّصة في أبوظبي | ون بونساي الخليج" },
      description: "شركة استشارات وهندسة ذكاء اصطناعي في أبوظبي، متخصصة في التكامل المؤسسي والوكلاء الأذكياء والبرمجيات المخصّصة والتدريب وبناء القدرات.",
      alternates: localizedAlternates("/", locale),
      openGraph: {
        locale: "ar_AE",
        title: "تكامل الذكاء الاصطناعي والبرمجيات المخصّصة في أبوظبي",
        description: "استشارات وهندسة وتكامل ذكاء اصطناعي مؤسسي من أبوظبي إلى دولة الإمارات ودول الخليج.",
      },
    };
  }

  return { alternates: localizedAlternates("/", locale) };
}

export default async function Home() {
  const locale = await getRequestLocale();
  const isArabic = locale === "ar";
  const renderedServices = isArabic ? arabicSpecialistServices : specialistServices;
  const renderedPrograms = isArabic ? arabicPrograms : programs;
  const renderedProducts = isArabic ? arabicProducts : products;

  return (
    <>
      <a className="skip-link" href="#main-content">{isArabic ? "الانتقال إلى المحتوى" : "Skip to content"}</a>

      <SiteHeader />
      <ScrollReveal />

      <main id="main-content">
        <ScrollJourney />
        <CustomerMarquee />

        <AboutPrinciples locale={locale} />

        <ClarityJourney />

        <section id="work" className="system-section section-pad" aria-labelledby="system-title">
          <div className="system-heading">
            <div className="system-copy">
              <p className="section-kicker">{isArabic ? "قدرات التنفيذ" : "Delivery capabilities"}</p>
              <h2 id="system-title">{isArabic ? "تعزيز قدرات عملك للمرحلة القادمة." : "Add the capability your business needs next."}</h2>
            </div>
            <div className="system-summary">
              <p>{isArabic ? "بعد وضوح الاتجاه، نضيف البرمجيات، التكامل، البحث، أو القدرات التسويقية التي تُحدث أثراً ملموساً وقابلاً للقياس." : "After the direction is clear, we add the software, integration, search, or marketing capability that creates measurable value."}</p>
              <Link className="primary-button" href={localizedPath("/services", locale)}>{isArabic ? "اكتشف خدمات الذكاء الاصطناعي والبرمجيات" : "Explore AI and software services"}</Link>
            </div>
          </div>
          <IntegrationMap />
        </section>

        <section id="services" className="services section-pad" aria-labelledby="services-title">
          <div className="services-heading">
            <div>
              <p className="section-kicker">{isArabic ? "خدمات متخصصة" : "Specialist services"}</p>
              <h2 id="services-title">{isArabic ? "تدريب الفرق وتأمين كل عملية تفعيل." : "Train teams and secure every deployment."}</h2>
            </div>
            <p>{isArabic ? "توسيع النظام الأساسي ليشمل بيئات المحاكاة التفاعلية، الأمن السيبراني، والتدريب العملي على الذكاء الاصطناعي بما يلائم كل دور." : "Extend the core system with immersive simulation, cybersecurity, and practical AI training for each role."}</p>
          </div>
          <div className="service-list">
            {renderedServices.map((service) => (
              <details key={service.title}>
                <summary>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="service-detail">
                  {service.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </details>
            ))}
          </div>
        </section>

        <HomeIndustries locale={locale} />

        <section className="infrastructure-section" aria-labelledby="infrastructure-title">
          <EditorialLoop
            source={publicAsset("/media/infrastructure-inspection-higgsfield-web-v1.mp4")}
            poster={publicAsset("/media/infrastructure-intelligence-v2.avif")}
          />
          <div className="infrastructure-copy">
            <p>{isArabic ? "الرؤية الحاسوبية للبنية التحتية" : "Computer vision for infrastructure"}</p>
            <h2 id="infrastructure-title">{isArabic ? "فحص المعدات وهي قيد التشغيل." : "Inspect assets without closing them down."}</h2>
            <span>{isArabic ? "التقط. راجع. أصلح." : "Capture. Review. Repair."}</span>
          </div>
        </section>

        <section id="academy" className="academy section-pad" aria-labelledby="academy-title">
          <div className="academy-mark" aria-hidden="true">AI<span>+</span></div>
          <div className="academy-copy">
            <p className="section-kicker">{isArabic ? "أكاديمية الذكاء الاصطناعي" : "AI Academy"}</p>
            <h2 id="academy-title">{isArabic ? "مكّن كل دور من استخدام الذكاء الاصطناعي في العمل." : "Train every role to use AI at work."}</h2>
            <p>{isArabic ? "برامج عملية للقيادات والإدارات والفرق التقنية، مبنية حول الأدوات والقرارات التي تتعامل معها يومياً." : "Practical programs for executives, departments, and technical teams, built around the tools and decisions they handle every day."}</p>
            <ul className="academy-programs">
              {renderedPrograms.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a className="primary-button" href="#contact">{isArabic ? "الأكاديمية في متناول فريقك" : "Bring the Academy to your team"}</a>
          </div>
        </section>

        <section className="products section-pad" aria-labelledby="products-title">
          <div className="products-heading">
            <p className="section-kicker">{isArabic ? "منتجات نطوّرها داخلياً" : "Products built in-house"}</p>
            <h2 id="products-title">{isArabic ? "منتجات نبنيها ونديرها." : "Products we build and run."}</h2>
          </div>
          <div className="product-index">
            {renderedProducts.map(([name, label, signal]) => (
              <article key={name}>
                <h3>{name}</h3>
                <p>{label}</p>
                <span>{signal}</span>
              </article>
            ))}
          </div>
        </section>

        <HomeInsights locale={locale} />

        <SiteContact />
      </main>
    </>
  );
}
