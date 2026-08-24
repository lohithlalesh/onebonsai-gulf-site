"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    const desktop = window.matchMedia("(min-width: 761px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let maxTravel = 0;
    let frame = 0;

    const render = () => {
      frame = 0;

      if (!desktop.matches || reducedMotion.matches) {
        track.style.removeProperty("transform");
        progress.style.removeProperty("transform");
        section.style.removeProperty("--team-scroll-span");
        return;
      }

      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const amount = (window.scrollY - sectionTop) / scrollRange;
      const clamped = Math.min(1, Math.max(0, amount));

      track.style.transform = `translate3d(${-maxTravel * clamped}px, 0, 0)`;
      progress.style.transform = `scaleX(${clamped})`;
    };

    const requestRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      if (!desktop.matches || reducedMotion.matches) {
        requestRender();
        return;
      }

      maxTravel = Math.max(0, track.scrollWidth - window.innerWidth);
      const breathingRoom = Math.min(420, window.innerHeight * 0.38);
      section.style.setProperty("--team-scroll-span", `${maxTravel + breathingRoom}px`);
      requestRender();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    desktop.addEventListener("change", measure);
    reducedMotion.addEventListener("change", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      reducedMotion.removeEventListener("change", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="team" className="team-section" aria-labelledby="team-title">
      <div className="team-pin">
        <div className="team-heading">
          <p className="section-kicker">People at OneBonsai Gulf</p>
          <h2 id="team-title">Meet the team behind the work.</h2>
          <div className="team-heading-copy">
            <p>Strategy, engineering, growth, and regional business development working as one team.</p>
            <span>Scroll to move through the team</span>
          </div>
        </div>

        <div className="team-rail" aria-label="OneBonsai Gulf team members">
          <div ref={trackRef} className="team-track">
            {team.map(([name, role, image]) => (
              <article className="team-card" key={name}>
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

        <div className="team-progress" aria-hidden="true"><i ref={progressRef} /></div>
      </div>
    </section>
  );
}
