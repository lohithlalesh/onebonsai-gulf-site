export type Industry = {
  name: string;
  summary: string;
  opportunities: string[];
};

export const industries: Industry[] = [
  {
    name: "Government & Smart Cities",
    summary: "Design citizen and employee services that connect trusted data, multilingual assistance, approvals, and accountable automation.",
    opportunities: ["Service orchestration", "Knowledge assistants", "Demand forecasting", "Responsible AI governance"],
  },
  {
    name: "Defence, Aerospace & Security",
    summary: "Support mission preparation, training, maintenance, situational analysis, and secure knowledge access within defined authority boundaries.",
    opportunities: ["Immersive simulation", "Maintenance intelligence", "Secure copilots", "Computer vision"],
  },
  {
    name: "Banking, Financial Services & Insurance",
    summary: "Improve regulated workflows while keeping evidence, review, privacy, and accountability visible to operators and risk owners.",
    opportunities: ["Document intelligence", "Fraud and risk support", "Service copilots", "Compliance workflows"],
  },
  {
    name: "Healthcare & Life Sciences",
    summary: "Help clinical, administrative, and research teams find information, coordinate work, train safely, and keep consequential decisions with qualified people.",
    opportunities: ["Clinical knowledge retrieval", "Patient navigation", "Workforce simulation", "Operational analytics"],
  },
  {
    name: "Aviation & Transportation",
    summary: "Connect operational signals across planning, assets, service, and safety workflows so teams can respond with better context.",
    opportunities: ["Predictive maintenance", "Disruption response", "Safety simulation", "Passenger service"],
  },
  {
    name: "Real Estate, Construction & Infrastructure",
    summary: "Turn project, asset, inspection, and tenant data into practical tools for delivery, maintenance, safety, and service operations.",
    opportunities: ["Visual inspection", "Project intelligence", "Digital twins", "Property operations"],
  },
  {
    name: "Tourism, Hospitality & Entertainment",
    summary: "Coordinate multilingual guest service, workforce knowledge, demand signals, and personalized experiences without losing operational control.",
    opportunities: ["Guest assistance", "Demand planning", "Workforce copilots", "Experience personalization"],
  },
  {
    name: "Energy, Utilities & Industrial",
    summary: "Support asset-intensive operations with inspection, maintenance, field knowledge, safety training, and controlled automation.",
    opportunities: ["Asset inspection", "Maintenance copilots", "Safety simulation", "Operations optimization"],
  },
  {
    name: "Retail & Consumer",
    summary: "Connect product, inventory, customer, and campaign signals to improve discovery, service, planning, and execution.",
    opportunities: ["Product intelligence", "Service assistants", "Demand forecasting", "Marketing systems"],
  },
  {
    name: "Education & Workforce Development",
    summary: "Build practical AI capability, adaptive learning support, and immersive training around the needs of learners, educators, and employers.",
    opportunities: ["Corporate AI training", "Learning assistants", "Skills analytics", "Immersive practice"],
  },
  {
    name: "Ecology & Sustainability",
    summary: "Use environmental, operational, and geospatial data to improve monitoring, resource decisions, reporting, and climate resilience.",
    opportunities: ["Environmental monitoring", "Energy optimization", "Geospatial analysis", "Sustainability reporting"],
  },
];

export const industriesAr: Industry[] = [
  {
    name: "الحكومة والمدن الذكية",
    summary: "تصميم خدمات للمتعاملين والموظفين تربط البيانات الموثوقة بالدعم متعدد اللغات والموافقات والأتمتة الخاضعة للمساءلة.",
    opportunities: ["تنسيق الخدمات", "مساعدات معرفية", "التنبؤ بالطلب", "حوكمة الذكاء الاصطناعي المسؤول"],
  },
  {
    name: "الدفاع والفضاء والأمن",
    summary: "دعم الاستعداد للمهام، التدريب، الصيانة، التحليل الموقفي، والوصول الآمن إلى المعرفة ضمن حدود صلاحيات محددة.",
    opportunities: ["المحاكاة التفاعلية", "ذكاء الصيانة", "مساعدات ذكية آمنة", "الرؤية الحاسوبية"],
  },
  {
    name: "البنوك والخدمات المالية والتأمين",
    summary: "تحسين الإجراءات الخاضعة للرقابة مع إبقاء الأدلة والمراجعة والخصوصية والمساءلة واضحة للمشغّلين ومسؤولي المخاطر.",
    opportunities: ["ذكاء المستندات", "دعم مكافحة الاحتيال والمخاطر", "مساعدات خدمة العملاء", "مسارات الامتثال"],
  },
  {
    name: "الرعاية الصحية وعلوم الحياة",
    summary: "مساعدة الفرق السريرية والإدارية والبحثية على الوصول إلى المعرفة وتنسيق العمل والتدرّب بأمان، مع إبقاء القرارات المؤثرة بيد المختصين.",
    opportunities: ["استرجاع المعرفة السريرية", "توجيه المرضى", "محاكاة تدريب القوى العاملة", "التحليلات التشغيلية"],
  },
  {
    name: "الطيران والنقل",
    summary: "ربط الإشارات التشغيلية عبر التخطيط والأصول والخدمات والسلامة حتى تستجيب الفرق بسياق أوضح وفي الوقت المناسب.",
    opportunities: ["الصيانة التنبؤية", "الاستجابة للاضطرابات", "محاكاة السلامة", "خدمات المسافرين"],
  },
  {
    name: "العقارات والإنشاءات والبنية التحتية",
    summary: "تحويل بيانات المشاريع والأصول والفحص والمستأجرين إلى أدوات عملية للتنفيذ والصيانة والسلامة وتشغيل الخدمات.",
    opportunities: ["الفحص البصري", "ذكاء المشاريع", "التوائم الرقمية", "تشغيل العقارات"],
  },
  {
    name: "السياحة والضيافة والترفيه",
    summary: "تنسيق خدمات الضيوف متعددة اللغات ومعرفة فرق العمل وإشارات الطلب والتجارب المخصّصة من دون فقدان التحكم التشغيلي.",
    opportunities: ["مساعدة الضيوف", "تخطيط الطلب", "مساعدات فرق العمل", "تخصيص التجربة"],
  },
  {
    name: "الطاقة والمرافق والصناعة",
    summary: "دعم العمليات كثيفة الأصول بالفحص والصيانة والمعرفة الميدانية والتدريب على السلامة والأتمتة المنضبطة.",
    opportunities: ["فحص الأصول", "مساعدات الصيانة", "محاكاة السلامة", "تحسين العمليات"],
  },
  {
    name: "التجزئة والسلع الاستهلاكية",
    summary: "ربط بيانات المنتجات والمخزون والعملاء والحملات لتحسين الاكتشاف والخدمة والتخطيط والتنفيذ.",
    opportunities: ["ذكاء المنتجات", "مساعدات الخدمة", "التنبؤ بالطلب", "أنظمة التسويق"],
  },
  {
    name: "التعليم وتنمية القوى العاملة",
    summary: "بناء قدرات عملية في الذكاء الاصطناعي ودعم التعلّم التكيفي والتدريب بالمحاكاة حول احتياجات المتعلمين والمعلمين وجهات العمل.",
    opportunities: ["التدريب المؤسسي على الذكاء الاصطناعي", "مساعدات التعلّم", "تحليلات المهارات", "التدرّب بالمحاكاة"],
  },
  {
    name: "البيئة والاستدامة",
    summary: "استخدام البيانات البيئية والتشغيلية والجغرافية المكانية لتحسين المراقبة وقرارات الموارد والتقارير والمرونة المناخية.",
    opportunities: ["المراقبة البيئية", "تحسين الطاقة", "التحليل الجغرافي المكاني", "تقارير الاستدامة"],
  },
];
