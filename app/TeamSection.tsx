import Image from "next/image";
import type { CSSProperties } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const team = [
  ["Ivan M Grey", "Founder and CEO", "ivan-m-grey.jpg"],
  ["Jelena Skoric", "Head of Strategy", "jelena-skoric.jpg"],
  ["Lohith Lalesh", "Head of Digital Marketing", "lohith-lalesh.jpg"],
  ["Olfa Hachfi", "Head of Sales", "olfa-hachfi.jpg"],
  ["Aditya Varshney", "Junior AI Developer", "aditya-varshney.jpg"],
  ["Pankaj Birla", "Web Developer", "pankaj-birla.jpg"],
  ["Omar Abedlaziz", "Business Development, Greece and Cyprus", "omar-abedlaziz.jpg"],
  ["Mohamed Ilyes Bouzayen", "Business Development, France", "mohamed-ilyes-bouzayen.jpg"],
  ["Rabeb Ben Hamouda", "Business Development, Canada", "rabeb-ben-hamouda.jpg"],
] as const;

export default function TeamSection() {
  return (
    <section id="team" className="team-section" aria-labelledby="team-title">
      <div className="team-heading">
        <p className="section-kicker">People at OneBonsai Gulf</p>
        <h2 id="team-title">Meet the team behind the work.</h2>
        <p>Strategy, engineering, growth, and regional business development working as one team.</p>
      </div>

      <div className="team-rail" aria-label="OneBonsai Gulf team members">
        <div className="team-track">
          {team.map(([name, role, image], index) => (
            <article className="team-card" key={name} style={{ "--team-index": index } as CSSProperties}>
              <Image
                src={publicAsset(`/team/${image}`)}
                alt={name}
                width={900}
                height={900}
                loading="lazy"
                unoptimized
              />
              <div className="team-card-copy">
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
