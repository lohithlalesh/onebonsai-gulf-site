"use client";

import Image from "next/image";
import { useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const cases = [
  {
    shortTitle: "UKB nurse training",
    title: "Virtual nurse training for University Hospital Bonn",
    sector: "Healthcare",
    metric: "1,600 staff and students",
    copy: "A multilingual VR platform helps clinical teams practise complex procedures without putting patients at risk.",
    image: "/cases/ukb-vr-training.jpg",
    alt: "Virtual nurse training simulation created for University Hospital Bonn",
    href: "https://onebonsai.com/cases/projects/virtual-reality-nurse-training-program-vrntp-for-ukb",
  },
  {
    shortTitle: "Nike warehouse training",
    title: "Faster warehouse onboarding for Nike",
    sector: "Logistics",
    metric: "Five training days reduced to two",
    copy: "A 1:1 virtual packing environment made onboarding repeatable, multilingual, and easier to scale across sites.",
    image: "/cases/nike-warehouse-training.jpg",
    alt: "Nike warehouse employee using a VR packing training simulation",
    href: "https://onebonsai.com/cases/projects/vr-warehouse-packing",
  },
  {
    shortTitle: "Port mooring safety",
    title: "Risk-free mooring practice for dock workers",
    sector: "Industry",
    metric: "Dangerous procedures made repeatable",
    copy: "A digital twin of the harbor lets teams practise cable handling, safe positioning, and full mooring procedures.",
    image: "/cases/port-mooring-training.jpg",
    alt: "Virtual reality mooring safety simulation at a commercial port",
    href: "https://onebonsai.com/cases/projects/mooring",
  },
  {
    shortTitle: "Police VR training",
    title: "High-pressure training without live risk",
    sector: "Public safety",
    metric: "Safe and repeatable scenarios",
    copy: "Officers train decision-making, coordination, and tactical response inside realistic virtual environments.",
    image: "/cases/police-vr-training.jpg",
    alt: "Police officers training together in an immersive virtual reality scenario",
    href: "https://onebonsai.com/cases/projects/police-training",
  },
] as const;

const caseSectors = [
  "Training",
  "Healthcare",
  "Education",
  "Safety",
  "Defense",
  "Police",
  "Industry",
  "Logistics",
  "Retail",
  "Public sector",
] as const;

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = cases[activeIndex];
  const selectPrevious = () => {
    setActiveIndex((current) => (current - 1 + cases.length) % cases.length);
  };
  const selectNext = () => {
    setActiveIndex((current) => (current + 1) % cases.length);
  };

  return (
    <section id="about" className="about-section section-pad" aria-labelledby="about-title">
      <div className="about-intro">
        <p className="section-kicker">About OneBonsai Gulf</p>
        <h2 id="about-title">Global deep tech. Built for the Gulf.</h2>
        <div className="about-intro-copy">
          <p>
            OneBonsai Gulf is the Abu Dhabi based regional sister company and independent reseller for OneBonsai.
            We bring proven production AI and immersive training expertise into the UAE, then extend it with AI
            marketing, custom software, cybersecurity, and local delivery.
          </p>
          <a href="https://onebonsai.com" target="_blank" rel="noreferrer">Explore OneBonsai</a>
        </div>
      </div>

      <div className="about-body">
        <article className="about-story">
          <p>Abu Dhabi / Belgium</p>
          <h3>One team from strategy to deployment.</h3>
          <div className="about-story-copy">
            <p>
              OneBonsai builds production AI, immersive VR training, digital twins, and advanced simulation for
              organizations where security, safety, and operational reality matter.
            </p>
            <p>
              OneBonsai Gulf pairs that engineering depth with regional business knowledge, implementation support,
              workforce adoption, and products designed for organizations across the Gulf.
            </p>
          </div>
          <div className="about-case-sectors">
            <span>Delivered work across</span>
            <ul>
              {caseSectors.map((sector) => <li key={sector}>{sector}</li>)}
            </ul>
            <a href="https://onebonsai.com/cases" target="_blank" rel="noreferrer">Browse all case studies</a>
          </div>
        </article>

        <div className="about-case-carousel" aria-label="Selected OneBonsai case studies">
          <div className="about-case-stage">
            <Image
              key={activeCase.image}
              src={publicAsset(activeCase.image)}
              alt={activeCase.alt}
              width={1600}
              height={900}
              loading="lazy"
              unoptimized
            />
            <div className="about-case-stage-shade" aria-hidden="true" />
            <article className="about-case-stage-copy" key={activeCase.title} aria-live="polite">
              <p>
                <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
                {activeCase.sector}
              </p>
              <h3>{activeCase.title}</h3>
              <div>
                <strong>{activeCase.metric}</strong>
                <p>{activeCase.copy}</p>
              </div>
              <a href={activeCase.href} target="_blank" rel="noreferrer">View case study</a>
            </article>
          </div>

          <div className="about-case-index" role="tablist" aria-label="Choose a case study">
            {cases.map((caseStudy, index) => (
              <button
                type="button"
                role="tab"
                className={index === activeIndex ? "is-active" : undefined}
                key={caseStudy.shortTitle}
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
                <span>
                  <strong>{caseStudy.shortTitle}</strong>
                  <small>{caseStudy.sector}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="about-case-controls">
            <button type="button" onClick={selectPrevious} aria-label="Previous case study">←</button>
            <span>{activeCase.shortTitle}</span>
            <button type="button" onClick={selectNext} aria-label="Next case study">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
