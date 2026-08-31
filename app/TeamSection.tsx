import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export const team = [
  ["Ivan M Grey", "Founder and CEO", "ivan-m-grey.jpg"],
  ["Hamad Al Khamais", "Business Development Partner", "hamad-al-khamais-900.jpg"],
  ["Jelena Skoric", "Head of Strategy", "jelena-skoric.jpg"],
  ["Lohith Lalesh", "Head of Digital Marketing", "lohith-lalesh.jpg"],
  ["Olfa Hachfi", "Head of Sales", "olfa-hachfi.jpg"],
  ["Aditya Varshney", "Junior AI Developer", "aditya-varshney.jpg"],
  ["Pankaj Birla", "Web Developer", "pankaj-birla.jpg"],
  ["Omar Abedlaziz", "Business Development, Greece and Cyprus", "omar-abedlaziz.jpg"],
  ["Mohamed Ilyes Bouzayen", "Business Development, France", "mohamed-ilyes-bouzayen.jpg"],
  ["Rabeb Ben Hamouda", "Business Development, Canada", "rabeb-ben-hamouda.jpg"],
  ["Khawla Zon", "Business Development, Middle East", "khawla-zon.jpg"],
  ["Slim Garbouj", "Business Development, Switzerland", "slim-garbouj.jpg"],
] as const;

export default function TeamSection() {
  return (
    <section id="team" className="team-wall-section" aria-labelledby="team-wall-title">
      <header className="team-wall-heading section-pad">
        <p className="section-kicker">One team, close to the work</p>
        <h2 id="team-wall-title">Strategy, engineering, growth, and regional delivery.</h2>
        <p>Meet the people who plan, build, launch, and support OneBonsai Gulf projects.</p>
      </header>

      <div className="team-wall" role="list">
        {team.map(([name, role, image], index) => (
          <article className="team-person" role="listitem" tabIndex={0} key={name}>
            <Image
              src={publicAsset(`/team/${image}`)}
              alt={name}
              width={900}
              height={900}
              loading={index < 3 ? "eager" : "lazy"}
              sizes="(max-width: 680px) 50vw, (max-width: 1080px) 33vw, 25vw"
              unoptimized
            />
            <div className="team-person-copy">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
