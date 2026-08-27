"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const steps = [
  {
    label: "Diagnose",
    title: "Find the workflow worth fixing.",
    copy: "We map the people, systems, handoffs, and bottlenecks behind one job before choosing where AI belongs.",
    outcomes: ["System map", "Use-case priorities", "Clear success measures"],
    image: "/media/clarity-diagnose-3d-v1.jpg",
  },
  {
    label: "Integrate",
    title: "Build around the tools already in use.",
    copy: "We connect the right model, interface, and approval points without forcing a system replacement.",
    outcomes: ["Secure integrations", "Useful AI tools", "Human approval points"],
    image: "/media/clarity-integrate-3d-v1.jpg",
  },
  {
    label: "Scale",
    title: "Expand only after the first workflow works.",
    copy: "We train its users, assign ownership, and set the controls required before another team adopts it.",
    outcomes: ["Team adoption", "AI governance", "Measured expansion"],
    image: "/media/clarity-scale-3d-v1.jpg",
  },
] as const;

export default function ClarityJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeStep = steps[activeIndex];

  useEffect(() => {
    let frame = 0;

    const updateStep = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setActiveIndex(Math.round(progress * (steps.length - 1)));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStep);
    };

    updateStep();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const travel = Math.max(section.offsetHeight - window.innerHeight, 0);
    window.scrollTo({
      top: sectionTop + travel * (index / (steps.length - 1)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="clarity-journey"
      data-step={activeIndex}
      aria-labelledby="clarity-title"
      style={{
        "--clarity-step": activeIndex,
        "--clarity-orbit-turn": `${(1 - activeIndex) * 42}deg`,
      } as CSSProperties}
    >
      <h2 id="clarity-title" className="sr-only">How we work: From complexity to clarity in 3 steps.</h2>
      <div className="clarity-sticky">
        <nav className="clarity-orbit" aria-label="Choose a delivery step">
          <div className="clarity-orbit-track">
            <div className="clarity-orbit-line" />
            <div className="clarity-orbit-ticks" />
            <div className="clarity-orbit-sweep" />
            {steps.map((step, index) => (
              <button
                type="button"
                key={step.label}
                className={index === activeIndex ? "is-active" : undefined}
                onClick={() => selectStep(index)}
                aria-label={`Show step ${index + 1}: ${step.label}`}
                aria-pressed={index === activeIndex}
              >
                <span className="clarity-orbit-marker">
                  <i aria-hidden="true" />
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </span>
              </button>
            ))}
          </div>
        </nav>

        <article className="clarity-copy" key={activeStep.label} aria-live="polite">
          <p><span>{String(activeIndex + 1).padStart(2, "0")}</span>{activeStep.label}</p>
          <h3>{activeStep.title}</h3>
          <p>{activeStep.copy}</p>
          <ul>
            {activeStep.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
          </ul>
        </article>

        <div className="clarity-sculpture" key={activeStep.image} aria-hidden="true">
          <Image
            src={publicAsset(activeStep.image)}
            alt=""
            width={1254}
            height={1254}
            loading="lazy"
            unoptimized
          />
        </div>

        <div className="clarity-counter" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i><b style={{ transform: `scaleX(${(activeIndex + 1) / steps.length})` }} /></i>
          <span>{String(steps.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="clarity-mobile-steps">
        {steps.map((step, index) => (
          <article key={step.label}>
            <Image src={publicAsset(step.image)} alt="" width={1254} height={1254} loading="lazy" unoptimized />
            <div>
              <p>{String(index + 1).padStart(2, "0")} / {step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <ul>{step.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
