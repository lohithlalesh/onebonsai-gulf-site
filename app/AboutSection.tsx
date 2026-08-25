"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlowEffect } from "@/components/core/glow-effect";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const CASE_ROTATION_MS = 7200;

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
  const [cycleSeed, setCycleSeed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeCase = cases[activeIndex];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let isInView = false;
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      timer = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % cases.length);
      }, CASE_ROTATION_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView && !document.hidden) start();
        else stop();
      },
      { threshold: 0.42 },
    );
    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (isInView) start();
    };

    observer.observe(carousel);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [cycleSeed, isPaused]);

  const selectCase = (index: number) => {
    setActiveIndex(index);
    setCycleSeed((current) => current + 1);
  };
  const selectPrevious = () => {
    setActiveIndex((current) => (current - 1 + cases.length) % cases.length);
    setCycleSeed((current) => current + 1);
  };
  const selectNext = () => {
    setActiveIndex((current) => (current + 1) % cases.length);
    setCycleSeed((current) => current + 1);
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

        <div className="glow-border-wrap">
          <GlowEffect
            colors={["#dcff22", "#0894FF", "#C959DD", "#FF9004"]}
            mode="static"
            blur="medium"
            intensity={0.6}
            style={{ borderRadius: "20px" }}
          />
          <div
            ref={carouselRef}
            className="about-case-carousel"
            aria-label="Selected OneBonsai case studies"
            data-paused={isPaused}
            onPointerEnter={() => setIsPaused(true)}
            onPointerLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
            }}
          >
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
                onClick={() => selectCase(index)}
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
            <span className="about-case-cycle">
              {activeCase.shortTitle}
              <i aria-hidden="true"><b key={`${activeIndex}-${cycleSeed}`} /></i>
            </span>
            <button type="button" onClick={selectNext} aria-label="Next case study">→</button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
