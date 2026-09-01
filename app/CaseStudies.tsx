"use client";

import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react/dist/icons/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/icons/ArrowRight";
import { ArrowUpRight } from "@phosphor-icons/react/dist/icons/ArrowUpRight";
import { useEffect, useRef, useState } from "react";

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

export default function CaseStudies() {
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
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1600px) 82vw, 1280px"
          unoptimized
        />
        <div className="about-case-stage-shade" aria-hidden="true" />
        <article className="about-case-stage-copy" key={activeCase.title} aria-live="polite">
          <p>
            <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            {activeCase.sector}
          </p>
          <h2>{activeCase.title}</h2>
          <div>
            <strong>{activeCase.metric}</strong>
            <p>{activeCase.copy}</p>
          </div>
          <a href={activeCase.href} target="_blank" rel="noreferrer">
            View case study <ArrowUpRight size={14} weight="thin" aria-hidden="true" />
          </a>
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
        <button type="button" onClick={selectPrevious} aria-label="Previous case study">
          <ArrowLeft size={17} weight="thin" aria-hidden="true" />
        </button>
        <span className="about-case-cycle">
          <b>{String(activeIndex + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}</b>
          <em>{activeCase.shortTitle}</em>
          <i aria-hidden="true"><b key={`${activeIndex}-${cycleSeed}`} /></i>
        </span>
        <button type="button" onClick={selectNext} aria-label="Next case study">
          <ArrowRight size={17} weight="thin" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
