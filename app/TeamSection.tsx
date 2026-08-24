"use client";

import Image from "next/image";
import { useState } from "react";

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
  ["Khawla Zon", "Business Development, Middle East", "khawla-zon.jpg"],
  ["Slim Garbouj", "Business Development, Switzerland", "slim-garbouj.jpg"],
] as const;

export default function TeamSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="team"
      className="team-section"
      aria-labelledby="team-title"
      data-paused={paused}
    >
      <div className="team-pin">
        <div className="team-heading">
          <p className="section-kicker">People at OneBonsai Gulf</p>
          <h2 id="team-title">Meet the team behind the work.</h2>
          <div className="team-heading-copy">
            <p>Strategy, engineering, growth, and regional business development working as one team.</p>
            <button
              type="button"
              aria-label={paused ? "Play team marquee" : "Pause team marquee"}
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              <i className="team-control-icon" aria-hidden="true" />
              {paused ? "Play team" : "Pause team"}
            </button>
          </div>
        </div>

        <div className="team-rail" aria-label="OneBonsai Gulf team members">
          <div className="team-track">
            {[0, 1].map((groupIndex) => (
              <div
                className="team-group"
                key={groupIndex}
                aria-hidden={groupIndex === 1 ? "true" : undefined}
              >
                {team.map(([name, role, image]) => (
                  <article className="team-card" key={`${groupIndex}-${name}`}>
                    <Image
                      src={publicAsset(`/team/${image}`)}
                      alt={groupIndex === 0 ? name : ""}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
