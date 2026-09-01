import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export const team = [
  ["Niels Ongena", "Executive VP", "niels-ongena.jpg"],
  ["Jelena Skoric", "Head of Strategy", "jelena-skoric.jpg"],
  ["Olfa Hachfi", "Head of Sales", "olfa-hachfi.jpg"],
  ["Hugo Mathias", "Head of OB Medicine", "hugo-mathias.jpg"],
  ["Hamad Al Khamais", "Business Development Partner", "hamad-al-khamais.jpg"],
  ["Lazar Miletic", "Financial Analyst", "lazar-miletic.jpg"],
  ["Lohith Lalesh", "Head of Digital Marketing", "lohith-lalesh.jpg"],
  ["Aditya Varshney", "AI Developer", "aditya-varshney.jpg"],
  ["Pankaj Birla", "Web Developer", "pankaj-birla.jpg"],
  ["Riadh Ajroudi", "Business Development, Italy", "riadh-ajroudi.jpg"],
  ["Omar Abedlaziz", "Business Development, Greece and Cyprus", "omar-abedlaziz.jpg"],
  ["Rabeb Ben Hamouda", "Business Development, Canada", "rabeb-ben-hamouda.jpg"],
  ["Mohamed Ilyes Bouzayen", "Business Development, France", "mohamed-ilyes-bouzayen.jpg"],
  ["Khawla Zon", "Business Development, Middle East", "khawla-zon.jpg"],
  ["Slim Garbouj", "Business Development, Switzerland", "slim-garbouj.jpg"],
  ["Bharath Jethani", "Business Development, India", "bharath-jethani.jpg"],
] as const;

export default function TeamSection() {
  return (
    <section id="team" className="team-wall-section" aria-labelledby="team-wall-title">
      <header className="team-wall-heading team-wall-heading-compact section-pad">
        <p className="section-kicker">The wider team</p>
        <h2 id="team-wall-title">The people behind the work.</h2>
      </header>

      <div className="team-wall" role="list">
        {team.map(([name, role, image], index) => (
          <article className="team-person" role="listitem" tabIndex={0} key={name}>
            <div className="team-person-portrait">
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
              <p>{role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
