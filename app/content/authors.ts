export type InsightAuthorKey = "aditya" | "jelena" | "lohith" | "pankaj";

export type InsightAuthor = {
  slug: InsightAuthorKey;
  name: string;
  role: string;
  roleAr: string;
  image: string;
  bio: string;
  bioAr: string;
  topics: string[];
};

export const insightAuthors: Record<InsightAuthorKey, InsightAuthor> = {
  aditya: {
    slug: "aditya",
    name: "Aditya Varshney",
    role: "AI Developer",
    roleAr: "مطوّر ذكاء اصطناعي",
    image: "aditya-varshney.jpg",
    bio: "Aditya writes about agentic systems, enterprise AI integration, automation, evaluation, and the technical controls required to move AI into production.",
    bioAr: "يكتب أديتيا عن الأنظمة الوكيلة، وتكامل الذكاء الاصطناعي المؤسسي، والأتمتة، والتقييم، والضوابط التقنية اللازمة لنقل حلول الذكاء الاصطناعي إلى بيئات الإنتاج.",
    topics: ["Agentic AI", "AI integration", "Automation", "Production evaluation"],
  },
  jelena: {
    slug: "jelena",
    name: "Jelena Skoric",
    role: "Head of Strategy",
    roleAr: "رئيسة الاستراتيجية",
    image: "jelena-skoric.jpg",
    bio: "Jelena writes about AI strategy, organisational readiness, governance, and responsible adoption across complex enterprise and public-sector environments.",
    bioAr: "تكتب يلينا عن استراتيجية الذكاء الاصطناعي، والجاهزية المؤسسية، والحوكمة، والتبنّي المسؤول ضمن بيئات المؤسسات والجهات الحكومية المعقّدة.",
    topics: ["AI strategy", "AI readiness", "Governance", "Responsible adoption"],
  },
  lohith: {
    slug: "lohith",
    name: "Lohith Lalesh",
    role: "Head of Digital Marketing",
    roleAr: "رئيس التسويق الرقمي",
    image: "lohith-lalesh.jpg",
    bio: "Lohith writes about applied AI adoption, workforce enablement, digital experience, and the communication required to turn new capability into daily practice.",
    bioAr: "يكتب لوهيث عن تبنّي الذكاء الاصطناعي التطبيقي، وتمكين القوى العاملة، والتجربة الرقمية، والتواصل اللازم لتحويل القدرات الجديدة إلى ممارسة يومية.",
    topics: ["AI adoption", "Workforce enablement", "Digital experience", "Corporate training"],
  },
  pankaj: {
    slug: "pankaj",
    name: "Pankaj Birla",
    role: "Web Developer",
    roleAr: "مطوّر ويب",
    image: "pankaj-birla.jpg",
    bio: "Pankaj writes about application engineering, software delivery, vendor evaluation, maintainable architecture, and production handover.",
    bioAr: "يكتب بانكاج عن هندسة التطبيقات، وتسليم البرمجيات، وتقييم المورّدين، والبنية القابلة للصيانة، وتسليم الأنظمة إلى فرق التشغيل.",
    topics: ["Application engineering", "Software delivery", "Vendor evaluation", "Technical architecture"],
  },
};

export const authorList = Object.values(insightAuthors);

export function getInsightAuthor(slug: string) {
  return insightAuthors[slug as InsightAuthorKey];
}
