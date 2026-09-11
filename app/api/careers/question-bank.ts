export type CareerLocale = "en" | "ar";
export type QuestionDomain = "fundamentals" | "prompting" | "privacy" | "reliability" | "oversight";

type LocalizedText = { en: string; ar: string };

export type CareerQuestion = {
  id: string;
  domain: QuestionDomain;
  prompt: LocalizedText;
  choices: Array<{ id: "a" | "b" | "c" | "d"; label: LocalizedText }>;
  correctChoiceId: "a" | "b" | "c" | "d";
  rationale: LocalizedText;
};

export type PublicCareerQuestion = {
  id: string;
  domain: QuestionDomain;
  prompt: string;
  choices: Array<{ id: string; label: string }>;
};

const contexts: Array<{ id: string; en: string; ar: string }> = [
  { id: "hiring", en: "screening job applications", ar: "فرز طلبات التوظيف" },
  { id: "healthcare", en: "prioritising patient appointments", ar: "ترتيب أولوية مواعيد المرضى" },
  { id: "banking", en: "reviewing a banking customer request", ar: "مراجعة طلب أحد عملاء البنك" },
  { id: "government", en: "answering a government service enquiry", ar: "الإجابة عن استفسار لخدمة حكومية" },
  { id: "contracts", en: "summarising a supplier contract", ar: "تلخيص عقد مع مورّد" },
  { id: "insurance", en: "assessing an insurance claim", ar: "تقييم مطالبة تأمينية" },
  { id: "support", en: "drafting a customer-support reply", ar: "صياغة رد لخدمة العملاء" },
  { id: "finance", en: "preparing a financial forecast", ar: "إعداد توقعات مالية" },
  { id: "security", en: "triaging a cybersecurity alert", ar: "فرز تنبيه للأمن السيبراني" },
  { id: "education", en: "giving feedback on a student assignment", ar: "تقديم ملاحظات على واجب طالب" },
  { id: "procurement", en: "comparing procurement bids", ar: "مقارنة عروض المشتريات" },
  { id: "maintenance", en: "recommending industrial maintenance", ar: "التوصية بصيانة صناعية" },
  { id: "real-estate", en: "evaluating a real-estate opportunity", ar: "تقييم فرصة عقارية" },
  { id: "aviation", en: "supporting an aviation operations decision", ar: "دعم قرار في عمليات الطيران" },
  { id: "logistics", en: "rerouting a delayed shipment", ar: "إعادة توجيه شحنة متأخرة" },
  { id: "marketing", en: "personalising a marketing campaign", ar: "تخصيص حملة تسويقية" },
  { id: "legal", en: "researching a legal obligation", ar: "البحث في التزام قانوني" },
  { id: "energy", en: "optimising energy consumption", ar: "تحسين استهلاك الطاقة" },
  { id: "tourism", en: "recommending a visitor itinerary", ar: "اقتراح برنامج لزائر" },
  { id: "public-safety", en: "supporting a public-safety response", ar: "دعم استجابة للسلامة العامة" },
];

const templates: Record<QuestionDomain, (context: (typeof contexts)[number]) => CareerQuestion> = {
  fundamentals: (context) => ({
    id: `fundamentals-${context.id}`,
    domain: "fundamentals",
    prompt: {
      en: `An AI assistant produces a polished answer while ${context.en}. What does its confident wording prove?`,
      ar: `قدّم مساعد ذكاء اصطناعي إجابة مصقولة أثناء ${context.ar}. ماذا تثبت صياغته الواثقة؟`,
    },
    choices: [
      { id: "a", label: { en: "Nothing about whether the answer is accurate", ar: "لا تثبت شيئاً عن دقة الإجابة" } },
      { id: "b", label: { en: "The answer was checked against primary sources", ar: "أن الإجابة روجعت مقابل مصادر أصلية" } },
      { id: "c", label: { en: "The model understands the organisation's policy", ar: "أن النموذج يفهم سياسة المؤسسة" } },
      { id: "d", label: { en: "The answer is safe to automate", ar: "أن الإجابة آمنة للتنفيذ الآلي" } },
    ],
    correctChoiceId: "a",
    rationale: {
      en: "Fluent language is not evidence of accuracy, authority, or safety.",
      ar: "اللغة السلسة ليست دليلاً على الدقة أو الموثوقية أو السلامة.",
    },
  }),
  prompting: (context) => ({
    id: `prompting-${context.id}`,
    domain: "prompting",
    prompt: {
      en: `What is the strongest starting point for using AI to help with ${context.en}?`,
      ar: `ما نقطة البداية الأقوى لاستخدام الذكاء الاصطناعي للمساعدة في ${context.ar}؟`,
    },
    choices: [
      { id: "a", label: { en: "Ask for a creative answer and choose the longest one", ar: "طلب إجابة إبداعية واختيار الأطول" } },
      { id: "b", label: { en: "Define the goal, context, constraints, examples, and success checks", ar: "تحديد الهدف والسياق والقيود والأمثلة ومعايير النجاح" } },
      { id: "c", label: { en: "Add as many technical terms as possible", ar: "إضافة أكبر عدد ممكن من المصطلحات التقنية" } },
      { id: "d", label: { en: "Use the same prompt for every situation", ar: "استخدام الطلب نفسه في جميع الحالات" } },
    ],
    correctChoiceId: "b",
    rationale: {
      en: "Clear context and testable success criteria make outputs easier to evaluate and improve.",
      ar: "وضوح السياق ومعايير النجاح القابلة للاختبار يجعل المخرجات أسهل في التقييم والتحسين.",
    },
  }),
  privacy: (context) => ({
    id: `privacy-${context.id}`,
    domain: "privacy",
    prompt: {
      en: `Before sending records used for ${context.en} to an AI tool, what should happen first?`,
      ar: `قبل إرسال سجلات تُستخدم في ${context.ar} إلى أداة ذكاء اصطناعي، ما الذي يجب فعله أولاً؟`,
    },
    choices: [
      { id: "a", label: { en: "Paste everything so the model has maximum context", ar: "إرسال كل شيء كي يحصل النموذج على أكبر قدر من السياق" } },
      { id: "b", label: { en: "Remove the file name and treat the data as anonymous", ar: "حذف اسم الملف واعتبار البيانات مجهولة" } },
      { id: "c", label: { en: "Confirm authorisation, minimise the data, and use an approved environment", ar: "تأكيد الصلاحية وتقليل البيانات واستخدام بيئة معتمدة" } },
      { id: "d", label: { en: "Ask the model to promise not to retain it", ar: "مطالبة النموذج بالتعهد بعدم الاحتفاظ بها" } },
    ],
    correctChoiceId: "c",
    rationale: {
      en: "Authorisation, data minimisation, and an approved environment are controls; a prompt is not.",
      ar: "الصلاحية وتقليل البيانات والبيئة المعتمدة ضوابط فعلية؛ أما الطلب النصي فليس كذلك.",
    },
  }),
  reliability: (context) => ({
    id: `reliability-${context.id}`,
    domain: "reliability",
    prompt: {
      en: `While ${context.en}, the model contradicts an approved source. What is the best next step?`,
      ar: `أثناء ${context.ar}، خالفت مخرجات النموذج مصدراً معتمداً. ما الخطوة التالية الأفضل؟`,
    },
    choices: [
      { id: "a", label: { en: "Use the model output because it is newer", ar: "استخدام مخرجات النموذج لأنها أحدث" } },
      { id: "b", label: { en: "Ask the same question until the answer changes", ar: "تكرار السؤال حتى تتغير الإجابة" } },
      { id: "c", label: { en: "Blend both answers so neither is discarded", ar: "دمج الإجابتين حتى لا تُستبعد إحداهما" } },
      { id: "d", label: { en: "Defer to the approved source and flag the conflict for review", ar: "الاعتماد على المصدر المعتمد ورفع التعارض للمراجعة" } },
    ],
    correctChoiceId: "d",
    rationale: {
      en: "Approved evidence should win, and the disagreement should become a visible evaluation case.",
      ar: "يجب تقديم الدليل المعتمد وتحويل التعارض إلى حالة تقييم واضحة.",
    },
  }),
  oversight: (context) => ({
    id: `oversight-${context.id}`,
    domain: "oversight",
    prompt: {
      en: `An AI recommendation could materially affect a person while ${context.en}. Which control matters most?`,
      ar: `قد تؤثر توصية للذكاء الاصطناعي جوهرياً في شخص أثناء ${context.ar}. ما الضابط الأهم؟`,
    },
    choices: [
      { id: "a", label: { en: "A larger model with a higher benchmark score", ar: "نموذج أكبر بنتيجة أعلى في الاختبارات" } },
      { id: "b", label: { en: "Human approval, traceability, and a clear escalation path", ar: "اعتماد بشري وإمكانية تتبع ومسار تصعيد واضح" } },
      { id: "c", label: { en: "A shorter response time", ar: "زمن استجابة أقصر" } },
      { id: "d", label: { en: "A disclaimer placed below the result", ar: "إخلاء مسؤولية أسفل النتيجة" } },
    ],
    correctChoiceId: "b",
    rationale: {
      en: "Consequential decisions need accountable human oversight and an auditable route to challenge them.",
      ar: "القرارات المؤثرة تحتاج إلى إشراف بشري مسؤول ومسار قابل للتدقيق والاعتراض.",
    },
  }),
};

const domains = Object.keys(templates) as QuestionDomain[];

export const careerQuestionBank: CareerQuestion[] = contexts.flatMap((context) =>
  domains.map((domain) => templates[domain](context)),
);

export const careerQuestionsById = new Map(careerQuestionBank.map((question) => [question.id, question]));

function randomIndex(length: number) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % length;
}

function pickDomain(domainsToPick: QuestionDomain[]) {
  return domainsToPick[randomIndex(domainsToPick.length)];
}

function pickQuestion(domain: QuestionDomain, excludedIds: Set<string>) {
  const pool = careerQuestionBank.filter((question) => question.domain === domain && !excludedIds.has(question.id));
  return pool[randomIndex(pool.length)];
}

function shuffledChoiceIds() {
  const ids: Array<"a" | "b" | "c" | "d"> = ["a", "b", "c", "d"];
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const nextIndex = randomIndex(index + 1);
    [ids[index], ids[nextIndex]] = [ids[nextIndex], ids[index]];
  }
  return ids;
}

export type QuestionAssignment = Array<{ questionId: string; choiceOrder: string[] }>;

export function createQuestionAssignment(excludedIds: string[] = []): QuestionAssignment {
  const excluded = new Set(excludedIds);
  const selectedDomains: QuestionDomain[] = [
    pickDomain(["fundamentals", "prompting"]),
    "privacy",
    pickDomain(["reliability", "oversight"]),
  ];

  return selectedDomains.map((domain) => {
    const question = pickQuestion(domain, excluded);
    excluded.add(question.id);
    return { questionId: question.id, choiceOrder: shuffledChoiceIds() };
  });
}

export function toPublicQuestions(assignment: QuestionAssignment, locale: CareerLocale): PublicCareerQuestion[] {
  return assignment.map(({ questionId, choiceOrder }) => {
    const question = careerQuestionsById.get(questionId);
    if (!question) throw new Error(`Unknown career question: ${questionId}`);
    const choicesById = new Map(question.choices.map((choice) => [choice.id, choice]));

    return {
      id: question.id,
      domain: question.domain,
      prompt: question.prompt[locale],
      choices: choiceOrder.map((choiceId) => {
        const choice = choicesById.get(choiceId as "a" | "b" | "c" | "d");
        if (!choice) throw new Error(`Unknown choice ${choiceId} for ${questionId}`);
        return { id: choice.id, label: choice.label[locale] };
      }),
    };
  });
}
