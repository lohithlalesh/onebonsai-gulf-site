import Image from "next/image";
import type { Locale } from "./locale";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const copy = {
  en: {
    archiveKicker: "From the project archive",
    archiveTitle: "Systems people can see, practise, and improve.",
    archiveIntro:
      "The earlier OneBonsai work combined immersive environments, guided procedures, and measurable practice. For UAE operators, the useful pattern is consistent: make high-risk or high-cost work repeatable before it reaches the live environment.",
    archive: [
      {
        src: "/work/healthcare-simulation.avif",
        alt: "Clinician using an immersive healthcare training simulation",
        label: "Healthcare simulation",
        title: "Clinical practice without patient risk",
        body: "Rehearse procedures, decisions, and team coordination in a controlled environment before applying them in care settings.",
      },
      {
        src: "/work/logistics-onboarding.avif",
        alt: "Immersive warehouse and logistics training environment",
        label: "Logistics onboarding",
        title: "Consistent training across sites",
        body: "Standardise how new teams learn workflows, equipment zones, and safety decisions across distributed operations.",
      },
      {
        src: "/work/public-safety.avif",
        alt: "Scenario-based immersive public safety training",
        label: "Public safety",
        title: "Decision practice under pressure",
        body: "Create repeatable scenarios for communication, de-escalation, and operational judgement without staging a live incident.",
      },
      {
        src: "/work/port-safety.avif",
        alt: "Immersive port and mooring safety simulation",
        label: "Ports and industry",
        title: "Prepare for rare, high-consequence events",
        body: "Let crews practise sequencing and hazard recognition when access to real assets is limited, costly, or unsafe.",
      },
    ],
    productsKicker: "Products and partners",
    productsTitle: "Delivery capability that continues after the project.",
    productsIntro:
      "Some needs are better served by a durable product or a specialist platform. These two systems extend our delivery model into day-to-day operations and regulated customer journeys.",
    simplify: {
      type: "In-house product",
      title: "Simplify Suite turns fragmented business administration into one operating space.",
      intro:
        "Simplify Suite was built inside OneBonsai from a practical operating need: small teams were losing time and budget across disconnected subscriptions, duplicated data, and manual handovers. The product brings the work together instead of adding another isolated tool.",
      body:
        "Designed for teams of 1–25, it combines planning, tickets, CRM, documents, budgets, invoicing, people operations, and performance views. For UAE ventures, regional teams, and new market entrants, that means clearer ownership and lower software overhead while the organisation grows.",
      points: ["One shared operating view", "Fewer disconnected SaaS tools", "Built around real internal workflows"],
      link: "Visit Simplify Suite",
    },
    blinking: {
      type: "KYC partner",
      title: "Blinking.id makes regulated onboarding configurable and easier to govern.",
      intro:
        "Blinking.id is our specialist KYC partner for customer journeys that need reliable identity evidence without forcing every organisation into the same flow. Its platform supports remote verification while keeping review and process choices configurable.",
      body:
        "The platform brings together document validation, liveness checks, fraud signals, video identification, due-diligence data, and KYC, AML, and PEP workflows. This is relevant to UAE financial services, property, mobility, and digital-government services where onboarding speed must sit beside privacy, auditability, and human review.",
      points: ["Configurable verification journeys", "Automated and human review paths", "Privacy-conscious identity handling"],
      link: "Visit Blinking.id",
    },
  },
  ar: {
    archiveKicker: "من أرشيف المشاريع",
    archiveTitle: "أنظمة يمكن للفرق رؤيتها وتجربتها وتطويرها.",
    archiveIntro:
      "جمعت أعمال OneBonsai السابقة بين بيئات المحاكاة والإجراءات الموجّهة والتدريب القابل للقياس. وفي بيئات التشغيل الإماراتية، يبقى المبدأ واحداً: نجعل المهام مرتفعة المخاطر أو التكلفة قابلة للتكرار قبل تنفيذها في الواقع.",
    archive: [
      {
        src: "/work/healthcare-simulation.avif",
        alt: "مختص صحي يستخدم محاكاة تفاعلية للتدريب السريري",
        label: "المحاكاة الصحية",
        title: "تدريب سريري من دون تعريض المرضى للمخاطر",
        body: "تدريب الفرق على الإجراءات والقرارات والتنسيق ضمن بيئة مضبوطة قبل تطبيقها في مواقع الرعاية الصحية.",
      },
      {
        src: "/work/logistics-onboarding.avif",
        alt: "بيئة تدريب بالمحاكاة للمستودعات والخدمات اللوجستية",
        label: "تأهيل فرق الخدمات اللوجستية",
        title: "تدريب موحّد عبر مواقع متعددة",
        body: "توحيد طريقة تعلّم الفرق الجديدة لمسارات العمل ومناطق المعدات وقرارات السلامة في العمليات الموزعة.",
      },
      {
        src: "/work/public-safety.avif",
        alt: "تدريب بالمحاكاة قائم على سيناريوهات السلامة العامة",
        label: "السلامة العامة",
        title: "التدرّب على القرار تحت الضغط",
        body: "بناء سيناريوهات قابلة للتكرار للتواصل واحتواء المواقف والحكم التشغيلي من دون الحاجة إلى محاكاة حادث واقعي.",
      },
      {
        src: "/work/port-safety.avif",
        alt: "محاكاة تفاعلية لسلامة الموانئ وعمليات الربط",
        label: "الموانئ والصناعة",
        title: "الاستعداد للأحداث النادرة عالية الأثر",
        body: "تمكين الطواقم من التدرّب على التسلسل التشغيلي ورصد المخاطر عندما يكون استخدام الأصول الحقيقية محدوداً أو مكلفاً أو غير آمن.",
      },
    ],
    productsKicker: "منتجات وشركاء",
    productsTitle: "قدرات تشغيلية تستمر بعد انتهاء المشروع.",
    productsIntro:
      "بعض الاحتياجات تخدمها منصة متخصصة أو منتج دائم بصورة أفضل. هذان النظامان يمدّان نموذج التنفيذ إلى العمليات اليومية ومسارات العملاء الخاضعة للرقابة.",
    simplify: {
      type: "منتج مطوّر داخلياً",
      title: "يجمع Simplify Suite إدارة الأعمال المشتتة في مساحة تشغيل واحدة.",
      intro:
        "طُوّر Simplify Suite داخل OneBonsai انطلاقاً من حاجة تشغيلية حقيقية: كانت الفرق الصغيرة تهدر الوقت والميزانية بين اشتراكات منفصلة وبيانات مكررة وتسليمات يدوية. لذلك صُمم المنتج لتجميع العمل، لا لإضافة أداة معزولة أخرى.",
      body:
        "صُممت المنصة لفرق من شخص واحد إلى 25 شخصاً، وتجمع التخطيط والتذاكر وإدارة العملاء والوثائق والميزانيات والفوترة وعمليات الأفراد وقياس الأداء. وهذا يمنح المشاريع الإماراتية والفرق الإقليمية والشركات الداخلة إلى السوق وضوحاً أكبر في المسؤوليات وتكلفة برمجية أقل أثناء النمو.",
      points: ["رؤية تشغيلية مشتركة", "أدوات سحابية منفصلة أقل", "مصمم حول مسارات عمل فعلية"],
      link: "زيارة Simplify Suite",
    },
    blinking: {
      type: "شريك التحقق من الهوية",
      title: "يتيح Blinking.id بناء مسارات امتثال مرنة وأسهل في الحوكمة.",
      intro:
        "Blinking.id هو شريكنا المتخصص في إجراءات اعرف عميلك للمسارات التي تتطلب إثبات هوية موثوقاً من دون فرض تدفق واحد على كل مؤسسة. تدعم المنصة التحقق عن بُعد مع إبقاء خيارات المراجعة والإجراءات قابلة للضبط.",
      body:
        "تجمع المنصة التحقق من الوثائق واختبارات الحيوية ومؤشرات الاحتيال والتعريف عبر الفيديو وبيانات العناية الواجبة ومسارات اعرف عميلك ومكافحة غسل الأموال والأشخاص المعرّضين سياسياً. وتخدم هذه القدرات قطاعات الخدمات المالية والعقار والتنقل والخدمات الحكومية الرقمية في الإمارات، حيث يجب أن تتوازن سرعة الانضمام مع الخصوصية وقابلية التدقيق والمراجعة البشرية.",
      points: ["مسارات تحقق قابلة للضبط", "مراجعة آلية وبشرية", "معالجة واعية لخصوصية الهوية"],
      link: "زيارة Blinking.id",
    },
  },
} as const;

type WorkVisualStoriesProps = { locale: Locale };

export default function WorkVisualStories({ locale }: WorkVisualStoriesProps) {
  const t = copy[locale];
  const arrow = locale === "ar" ? "↖" : "↗";

  return (
    <>
      <section className="work-archive" aria-labelledby="work-archive-title">
        <header className="work-section-heading">
          <div>
            <p className="section-kicker">{t.archiveKicker}</p>
            <h2 id="work-archive-title">{t.archiveTitle}</h2>
          </div>
          <p>{t.archiveIntro}</p>
        </header>
        <div className="work-archive-grid">
          {t.archive.map((item, index) => (
            <figure className="work-archive-card mechanical-reveal" key={item.src}>
              <div className="work-archive-image">
                <Image
                  src={publicAsset(item.src)}
                  alt={item.alt}
                  width={1600}
                  height={index === 3 ? 826 : 900}
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 42vw"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")} / {item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="work-products" aria-labelledby="work-products-title">
        <header className="work-section-heading">
          <div>
            <p className="section-kicker">{t.productsKicker}</p>
            <h2 id="work-products-title">{t.productsTitle}</h2>
          </div>
          <p>{t.productsIntro}</p>
        </header>

        <article className="work-product-story">
          <figure className="work-product-media work-product-media-simplify mechanical-reveal">
            <Image
              src={publicAsset("/work/simplify-suite-v2.avif")}
              alt={locale === "ar" ? "وحدات Simplify Suite للمشاريع والموارد البشرية والعملاء والمصروفات والتوظيف والفوترة" : "Simplify Suite modules for projects, HR, CRM, expenses, recruitment, and invoicing"}
              width={1072}
              height={1336}
              sizes="(max-width: 900px) calc(100vw - 40px), 55vw"
              loading="lazy"
              unoptimized
            />
          </figure>
          <div className="work-product-copy">
            <p className="section-kicker">{t.simplify.type}</p>
            <h3>{t.simplify.title}</h3>
            <p>{t.simplify.intro}</p>
            <p>{t.simplify.body}</p>
            <ul>{t.simplify.points.map((point) => <li key={point}>{point}</li>)}</ul>
            <a href="https://www.simplifysuite.io/" target="_blank" rel="noreferrer">
              {t.simplify.link} <span aria-hidden="true">{arrow}</span>
            </a>
          </div>
        </article>

        <article className="work-product-story work-product-story-reverse">
          <figure className="work-product-media work-product-media-contain mechanical-reveal">
            <Image
              src={publicAsset("/work/blinking-id.avif")}
              alt={locale === "ar" ? "مسار التحقق من هوية العميل في Blinking.id" : "Blinking.id customer identity verification flow"}
              width={1600}
              height={1250}
              sizes="(max-width: 900px) calc(100vw - 40px), 55vw"
              loading="lazy"
              unoptimized
            />
          </figure>
          <div className="work-product-copy">
            <p className="section-kicker">{t.blinking.type}</p>
            <h3>{t.blinking.title}</h3>
            <p>{t.blinking.intro}</p>
            <p>{t.blinking.body}</p>
            <ul>{t.blinking.points.map((point) => <li key={point}>{point}</li>)}</ul>
            <a href="https://www.blinking.id/" target="_blank" rel="noreferrer">
              {t.blinking.link} <span aria-hidden="true">{arrow}</span>
            </a>
          </div>
        </article>
      </section>
    </>
  );
}
