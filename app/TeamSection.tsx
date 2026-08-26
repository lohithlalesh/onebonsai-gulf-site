"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const team = [
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

const marqueeGroups = [0, 1] as const;

export default function TeamSection() {
  const [paused, setPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    if (!("IntersectionObserver" in window)) {
      marquee.dataset.active = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        marquee.dataset.active = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0.2 },
    );

    observer.observe(marquee);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      className="team-section"
      aria-labelledby="team-title"
    >
      <div className="team-pin">
        <div className="team-heading">
          <p className="section-kicker">Team</p>
          <h2 id="team-title">The people doing the work.</h2>
          <div className="team-heading-copy">
            <p>Strategy, engineering, sales, marketing, and regional delivery.</p>
            <button
              className="team-marquee-toggle"
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? "Play team" : "Pause team"}
            </button>
          </div>
        </div>

        <div
          ref={marqueeRef}
          className="team-marquee group flex overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="OneBonsai Gulf team carousel"
          data-active="false"
          data-paused={paused}
          tabIndex={0}
        >
          <div className="team-marquee-track flex w-max">
            {marqueeGroups.map((groupIndex) => (
              <div
                className="team-marquee-group flex shrink-0"
                aria-hidden={groupIndex === 1 || undefined}
                key={groupIndex}
              >
                {team.map(([name, role, image]) => (
                  <article className="team-card shrink-0" key={`${groupIndex}-${name}`}>
                    <Image
                      src={publicAsset(`/team/${image}`)}
                      alt={groupIndex === 0 ? name : ""}
                      width={900}
                      height={900}
                      loading="lazy"
                      sizes="(max-width: 760px) 78vw, (max-width: 1080px) 42vw, 410px"
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
