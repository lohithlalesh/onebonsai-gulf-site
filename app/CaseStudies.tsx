import { getRequestLocale } from "./i18n";

const caseLibraries = {
  en: [
    {
      sector: "Healthcare",
      title: "Hospital group: from fragmented processes to an AI roadmap",
      challenge:
        "Patient information was spread across multiple systems. Appointment and administrative workflows were manual, waiting times were long, and staff repeated the same tasks. Leadership wanted to use AI but had no agreed starting point.",
      approach:
        "Interview leadership and operational teams, map the process, data, and technology landscape, rank high-impact opportunities, and build a phased roadmap that moves from quick wins into controlled pilots and then scale.",
      outcomes: [
        "A prioritised portfolio of use cases",
        "Clear business cases and named ownership",
        "Defined pilots with measurable KPIs",
        "A practical roadmap instead of scattered experiments",
      ],
    },
    {
      sector: "Banking",
      title: "AI-assisted quality assurance for digital delivery",
      challenge:
        "Large volumes of digital journeys required repeated testing. Manual quality assurance consumed significant team capacity, human testing missed edge cases, and continuous release pressure left little room for inconsistent coverage.",
      approach:
        "Build an AI-assisted quality-assurance and workflow platform, generate repeatable testing scenarios, flag anomalies and defects for human review, and integrate the result into the existing delivery workflow.",
      outcomes: [
        "Faster testing and release cycles",
        "More consistent quality assurance",
        "Reduced repetitive manual workload",
        "A scalable foundation for future digital products",
      ],
    },
    {
      sector: "Aviation",
      title: "Immersive maintenance training without live asset risk",
      challenge:
        "Physical training required expensive equipment, aircraft availability limited training windows, some procedures carried operational risk, and training quality varied by instructor and location.",
      approach:
        "Create a realistic immersive aircraft environment, guide technicians through procedures step by step, track actions, errors, and performance, and deploy standardised scenarios across teams.",
      outcomes: [
        "Repeatable training without real-world risk",
        "Less dependency on aircraft availability",
        "Consistent assessment standards",
        "Faster onboarding",
      ],
    },
    {
      sector: "Product traceability",
      title: "Vyonix: an AI-ready digital product passport",
      challenge:
        "A brand needed product traceability and compliance information. The requirement was not framed as an AI problem; it was a need to make product identity, material, origin, and lifecycle evidence usable.",
      approach:
        "Build a unique digital identity for each product, structure material and origin data, connect supply-chain and lifecycle traceability, and provide QR-based access to sourcing and lab-verification information.",
      outcomes: [
        "Structured data that can feed AI systems",
        "Intelligent querying of product information",
        "Analytics that surface patterns and risks",
        "A platform that evolves with regulation",
      ],
      note: "The need was compliance and traceability, not AI. It was translated into a digital product that is ready for intelligent use.",
    },
  ],
  ar: [
    {
      sector: "الرعاية الصحية",
      title: "مجموعة مستشفيات: من عمليات متفرقة إلى خارطة طريق للذكاء الاصطناعي",
      challenge:
        "كانت معلومات المرضى موزعة بين أنظمة متعددة، بينما اعتمدت المواعيد والإجراءات الإدارية على العمل اليدوي وتكرار المهام. أرادت الإدارة توظيف الذكاء الاصطناعي، لكن لم يكن هناك اتفاق على نقطة البداية.",
      approach:
        "أجرينا مقابلات مع القيادات والفرق التشغيلية، ورسمنا صورة العمليات والبيانات والتقنية، ثم رتبنا الفرص الأعلى أثراً وبنينا خارطة طريق تبدأ بمكاسب سريعة وتنتقل إلى تجارب مضبوطة ثم التوسع.",
      outcomes: [
        "محفظة مرتبة حسب الأولوية لحالات الاستخدام",
        "مبررات أعمال واضحة ومسؤوليات محددة",
        "تجارب بمؤشرات أداء قابلة للقياس",
        "خارطة طريق عملية بدلاً من مبادرات متفرقة",
      ],
    },
    {
      sector: "الخدمات المصرفية",
      title: "ضمان جودة مدعوم بالذكاء الاصطناعي للتسليم الرقمي",
      challenge:
        "تطلب العدد الكبير من الرحلات الرقمية اختبارات متكررة. استهلك ضمان الجودة اليدوي وقتاً كبيراً من الفرق، وفوّتت الاختبارات البشرية بعض الحالات الطرفية، بينما فرضت وتيرة الإصدارات المستمرة حاجة إلى تغطية أكثر اتساقاً.",
      approach:
        "بنينا منصة مدعومة بالذكاء الاصطناعي لضمان الجودة وسير العمل، تولّد سيناريوهات قابلة للتكرار، وترفع الحالات الشاذة والعيوب للمراجعة البشرية، وتتكامل مع مسار التسليم القائم.",
      outcomes: [
        "دورات اختبار وإصدار أسرع",
        "ضمان جودة أكثر اتساقاً",
        "تقليل العمل اليدوي المتكرر",
        "أساس قابل للتوسع للمنتجات الرقمية المقبلة",
      ],
    },
    {
      sector: "الطيران",
      title: "تدريب بالمحاكاة للصيانة من دون المخاطرة بالأصول الحية",
      challenge:
        "احتاج التدريب الميداني إلى معدات مرتفعة التكلفة، وحدّ توفر الطائرات من أوقات التدريب، وحملت بعض الإجراءات مخاطر تشغيلية، كما تفاوتت جودة التدريب بين المدربين والمواقع.",
      approach:
        "أنشأنا بيئة محاكاة طيران تفاعلية وواقعية ترشد الفنيين خلال الإجراءات خطوة بخطوة، تقيس الأفعال والأخطاء والأداء، وتتيح تفعيل سيناريوهات موحدة بين الفرق.",
      outcomes: [
        "تدريب قابل للتكرار من دون مخاطر ميدانية",
        "اعتماد أقل على توفر الطائرات",
        "معايير تقييم متسقة",
        "تأهيل أسرع للكوادر",
      ],
    },
    {
      sector: "تتبّع المنتجات",
      title: "Vyonix: جواز منتج رقمي مهيأ للذكاء الاصطناعي",
      challenge:
        "احتاجت إحدى العلامات إلى تتبع المنتجات وإتاحة معلومات الامتثال. لم تكن الحاجة مصاغة كمشكلة ذكاء اصطناعي، بل كضرورة لجعل هوية المنتج ومواده ومنشئه وأدلة دورة حياته قابلة للاستخدام.",
      approach:
        "أنشأنا هوية رقمية فريدة لكل منتج، ونظمنا بيانات المواد والمنشأ، وربطنا التتبع عبر سلسلة التوريد ودورة الحياة، وأتحنا الوصول عبر رمز QR إلى معلومات التوريد والتحقق المختبري.",
      outcomes: [
        "بيانات منظمة يمكن لأنظمة الذكاء الاصطناعي استخدامها",
        "استعلام ذكي عن معلومات المنتج",
        "تحليلات تكشف الأنماط والمخاطر",
        "منصة تتطور مع المتطلبات التنظيمية",
      ],
      note: "كانت الحاجة هي الامتثال والتتبع، لا الذكاء الاصطناعي بحد ذاته. وقد تحولت إلى منتج رقمي مهيأ للاستخدام الذكي.",
    },
  ],
} as const;

const labels = {
  en: { challenge: "Challenge", approach: "Approach", outcome: "Outcome" },
  ar: { challenge: "التحدي", approach: "النهج", outcome: "النتيجة" },
} as const;

export default async function CaseStudies() {
  const locale = await getRequestLocale();
  const cases = caseLibraries[locale];
  const t = labels[locale];

  return (
    <div className="work-case-library">
      {cases.map((caseStudy, index) => (
        <article className="work-case" key={caseStudy.title}>
          <header>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{caseStudy.sector}</p>
            <h2>{caseStudy.title}</h2>
          </header>
          <div className="work-case-story">
            <section>
              <p className="section-kicker">{t.challenge}</p>
              <p>{caseStudy.challenge}</p>
            </section>
            <section>
              <p className="section-kicker">{t.approach}</p>
              <p>{caseStudy.approach}</p>
            </section>
            <section>
              <p className="section-kicker">{t.outcome}</p>
              <ul>{caseStudy.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            </section>
            {"note" in caseStudy ? <p className="work-case-note">{caseStudy.note}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
