import { CompassTool } from "@phosphor-icons/react/dist/ssr/CompassTool";
import { Code } from "@phosphor-icons/react/dist/ssr/Code";
import { UsersThree } from "@phosphor-icons/react/dist/ssr/UsersThree";
import type { Locale } from "./locale";

const principles = {
  en: [
  {
    label: "We advise",
    title: "AI strategy and transformation",
    copy: "Choose where AI can create value, define the operating model, and turn ambition into a practical delivery plan.",
    icon: CompassTool,
  },
  {
    label: "We build",
    title: "Custom AI solutions and integrations",
    copy: "Design and deliver the software, platforms, agents, and integrations that make AI useful in everyday work.",
    icon: Code,
  },
  {
    label: "We connect",
    title: "Vetted AI specialists and SMEs",
    copy: "Bring the right expertise into your internal team for a defined project, a critical capability, or long-term growth.",
    icon: UsersThree,
  },
  ],
  ar: [
    {
      label: "نستشير",
      title: "استراتيجية الذكاء الاصطناعي والتحول",
      copy: "نحدّد أين يضيف الذكاء الاصطناعي قيمة حقيقية، نبني نموذج التشغيل، ونحوّل الطموح إلى خطة تنفيذ قابلة للقياس.",
      icon: CompassTool,
    },
    {
      label: "نبني",
      title: "حلول ذكاء اصطناعي وتكاملات مخصّصة",
      copy: "نصمّم ونطوّر البرمجيات والمنصات والوكلاء والتكاملات التي تجعل الذكاء الاصطناعي جزءاً مفيداً من العمل اليومي.",
      icon: Code,
    },
    {
      label: "نربط",
      title: "خبراء ذكاء اصطناعي ومتخصصون موثوقون",
      copy: "نوفّر لفريقك الداخلي الخبرات المناسبة لمشروع محدّد، لتعزيز قدرة محورية أو لتحقيق نمو مستدام على المدى الطويل.",
      icon: UsersThree,
    },
  ],
} as const;

export default function AboutPrinciples({ locale = "en" }: { locale?: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section className="about-page-principles section-pad" aria-labelledby="about-principles-title">
      <div className="about-principles-heading">
        <p className="section-kicker">{isArabic ? "ثلاثة مسارات للعمل معاً" : "Three ways to work together"}</p>
        <h2 id="about-principles-title">{isArabic ? "نستشير. نبني. نربط." : "Advise. Build. Connect."}</h2>
        <p className="about-principles-summary">
          {isArabic ? "شريك واحد يجمع الاستراتيجية والتقنية والكفاءات اللازمة لنقل الذكاء الاصطناعي إلى التشغيل الفعلي." : "One partner for the strategy, technology, and people required to move AI into production."}
        </p>
      </div>
      <div className="about-principle-list">
        {principles[locale].map(({ label, title, copy, icon: Icon }, index) => (
          <article className="mechanical-reveal" key={title}>
            <span className="about-principle-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="mechanical-icon" aria-hidden="true">
              <Icon size={34} weight="thin" />
            </span>
            <div>
              <p className="about-principle-label">{label}</p>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
        <p className="about-principles-closing">
          {isArabic ? "نرشدكم، نبني الحل لكم، أو نساعدكم على تشكيل الفريق المناسب لتنفيذ المشروع بأنفسكم." : "We can advise you, build it for you, or help you build the right team to do it yourself."}
        </p>
      </div>
    </section>
  );
}
