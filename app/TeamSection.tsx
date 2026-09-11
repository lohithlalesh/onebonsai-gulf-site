import Image from "next/image";
import type { Locale } from "./locale";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

type TeamMember = {
  name: string;
  role: string;
  image: string;
  crop?: boolean;
};

export const team: readonly TeamMember[] = [
  { name: "Niels Ongena", role: "Executive VP", image: "niels-ongena.jpg" },
  { name: "Jelena Skoric", role: "Head of Strategy", image: "jelena-skoric.jpg" },
  { name: "Lohith Lalesh", role: "Head of Digital Marketing", image: "lohith-lalesh.jpg" },
  { name: "Olfa Hachfi", role: "Head of Sales", image: "olfa-hachfi.jpg" },
  { name: "Hugo Mathias", role: "Head of OB Medicine", image: "hugo-mathias.jpg" },
  { name: "Caro Lozano Escalante", role: "Project Manager", image: "caro-lozano-escalante.jpg", crop: true },
  { name: "Valentina Scanu", role: "Chief Finance Officer", image: "valentina-scanu.jpg", crop: true },
  { name: "Hamad Al Khamais", role: "Business Development Partner", image: "hamad-al-khamais.jpg" },
  { name: "Lazar Miletic", role: "Financial Analyst", image: "lazar-miletic.jpg" },
  { name: "Aditya Varshney", role: "AI Developer", image: "aditya-varshney.jpg" },
  { name: "Pankaj Birla", role: "Web Developer", image: "pankaj-birla.jpg" },
  { name: "Riadh Ajroudi", role: "Business Development, Italy", image: "riadh-ajroudi.jpg" },
  { name: "Omar Abedlaziz", role: "Business Development, Greece and Cyprus", image: "omar-abedlaziz.jpg" },
  { name: "Rabeb Ben Hamouda", role: "Business Development, Canada", image: "rabeb-ben-hamouda.jpg" },
  { name: "Mohamed Ilyes Bouzayen", role: "Business Development, France", image: "mohamed-ilyes-bouzayen.jpg" },
  { name: "Khawla Zon", role: "Business Development, Middle East", image: "khawla-zon.jpg" },
  { name: "Slim Garbouj", role: "Business Development, Switzerland", image: "slim-garbouj.jpg" },
  { name: "Bharath Jethani", role: "Business Development, India", image: "bharath-jethani.jpg" },
];

const arabicRoles: Record<string, string> = {
  "Executive VP": "نائب الرئيس التنفيذي",
  "Head of Strategy": "رئيسة الاستراتيجية",
  "Head of Sales": "رئيسة المبيعات",
  "Head of OB Medicine": "رئيس ون بونساي للطب",
  "Project Manager": "مديرة المشاريع",
  "Chief Finance Officer": "الرئيسة التنفيذية للشؤون المالية",
  "Business Development Partner": "شريك تطوير الأعمال",
  "Financial Analyst": "محلل مالي",
  "Head of Digital Marketing": "رئيس التسويق الرقمي",
  "AI Developer": "مطوّر ذكاء اصطناعي",
  "Web Developer": "مطوّر ويب",
};

export default function TeamSection({ locale = "en" }: { locale?: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section id="team" className="team-wall-section" aria-labelledby="team-wall-title">
      <header className="team-wall-heading team-wall-heading-compact section-pad">
        <p className="section-kicker">{isArabic ? "فريقنا" : "The wider team"}</p>
        <h2 id="team-wall-title">{isArabic ? "الخبرات التي تقف خلف كل إنجاز." : "The people behind the work."}</h2>
      </header>

      <div className="team-wall" role="list">
        {team.map(({ name, role, image, crop }, index) => (
          <article className="team-person" role="listitem" tabIndex={0} key={name}>
            <div className={`team-person-portrait${crop ? " is-cover" : ""}`}>
              <Image
                src={publicAsset(`/team/${image}`)}
                alt={name}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 25vw"
                unoptimized
              />
            </div>
            <div className="team-person-copy">
              <span aria-hidden="true" />
              <h3>{name}</h3>
              <p>{isArabic ? (arabicRoles[role] ?? role.replace("Business Development", "تطوير الأعمال")) : role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
