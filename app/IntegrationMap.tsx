"use client";

import EditorialLoop from "./EditorialLoop";
import { GlowEffect } from "@/components/core/glow-effect";
import { useEffect, useRef, useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const systemInputs = ["ERP + CRM", "Documents", "Operations", "Customer data"] as const;

const capabilities = [
  {
    title: "AI integration",
    signal: "Connect the systems",
    copy: "Connect ERP, CRM, documents, customer data, and operational tools through one governed AI layer.",
    outcome: "One secure source of context",
  },
  {
    title: "Custom software",
    signal: "Build what is missing",
    copy: "Add focused applications, interfaces, and automation around the workflows your teams already use.",
    outcome: "Software shaped around real work",
  },
  {
    title: "Consulting",
    signal: "Choose what matters",
    copy: "Prioritize useful AI cases, define delivery phases, and set clear measures for value, risk, and adoption.",
    outcome: "A practical route to production",
  },
  {
    title: "SEO + AEO",
    signal: "Make products discoverable",
    copy: "Structure websites, product knowledge, and content for search engines and AI answer experiences.",
    outcome: "More qualified discovery",
  },
  {
    title: "Marketing growth",
    signal: "Turn insight into demand",
    copy: "Use connected data to improve campaigns, personalization, customer journeys, and measurable pipeline.",
    outcome: "Growth tied to business signals",
  },
] as const;

export default function IntegrationMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeCapability = capabilities[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const nextIndex = Number((visible.target as HTMLElement).dataset.capabilityIndex);
        if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex);
      },
      { rootMargin: "-28% 0px -46%", threshold: [0.18, 0.45, 0.72] },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="glow-border-wrap">
      <GlowEffect
        colors={["#dcff22", "#0894FF", "#C959DD", "#FF9004"]}
        mode="static"
        blur="medium"
        intensity={0.6}
        style={{ borderRadius: "20px" }}
      />
      <div className="integration-scroll-map" aria-label="How OneBonsai Gulf turns connected business systems into measurable capabilities">
      <aside className="integration-scroll-sticky">
        <div className="integration-scroll-heading">
          <p>From systems to value</p>
          <h3>Your systems become one governed intelligence layer.</h3>
          <ul>
            {systemInputs.map((input) => <li key={input}>{input}</li>)}
          </ul>
        </div>

        <div className="integration-scroll-visual">
          <EditorialLoop
            source={publicAsset("/media/editorial-governed-intelligence-veo-v1.mp4")}
            poster={publicAsset("/media/editorial-governed-intelligence-veo-v1-poster.jpg")}
          />
          <div className="integration-scroll-shade" aria-hidden="true" />
          <div className="integration-live-capability" key={activeCapability.title} aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}</span>
            <strong>{activeCapability.title}</strong>
            <small>{activeCapability.outcome}</small>
          </div>
          <div className="integration-branch-meter" aria-hidden="true">
            {capabilities.map((capability, index) => (
              <i className={index <= activeIndex ? "is-active" : undefined} key={capability.title} />
            ))}
          </div>
        </div>
      </aside>

      <ol className="integration-capability-steps">
        {capabilities.map((capability, index) => (
          <li
            ref={(node) => { stepRefs.current[index] = node; }}
            data-capability-index={index}
            data-active={index === activeIndex}
            key={capability.title}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <article>
              <small>{capability.signal}</small>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
              <strong>{capability.outcome}</strong>
            </article>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}
