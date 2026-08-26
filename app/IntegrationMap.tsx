"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const systemInputs = ["ERP + CRM", "Documents", "Operations", "Customer data"] as const;

const capabilities = [
  {
    title: "AI integration",
    signal: "Use existing data",
    copy: "Give teams one place to ask questions, find records, and trigger approved actions.",
    outcome: "Shared context without a system replacement",
    image: "/media/capability-ai-integration-v1.jpg",
    alt: "UAE operations leaders reviewing an integrated enterprise AI workspace",
  },
  {
    title: "Custom software",
    signal: "Fill the workflow gap",
    copy: "Build the interface or automation your current tools cannot provide.",
    outcome: "Software matched to the job",
    image: "/media/capability-custom-software-v1.jpg",
    alt: "A UAE product team testing custom operations software",
  },
  {
    title: "Consulting",
    signal: "Set the order of work",
    copy: "Choose a first use case, delivery plan, and measures before committing to a build.",
    outcome: "A scoped route to production",
    image: "/media/capability-consulting-v1.jpg",
    alt: "A Gulf leadership team planning an AI delivery roadmap",
  },
  {
    title: "SEO + AEO",
    signal: "Be easier to find",
    copy: "Structure product pages and knowledge so search engines and AI answers can understand them.",
    outcome: "Qualified discovery",
    image: "/media/capability-seo-aeo-v1.jpg",
    alt: "A search specialist reviewing structured product knowledge and discovery performance",
  },
  {
    title: "Marketing systems",
    signal: "Use customer signals",
    copy: "Connect campaign and customer data so teams can see what creates demand.",
    outcome: "Marketing tied to pipeline",
    image: "/media/capability-marketing-systems-v1.jpg",
    alt: "A marketing operator using a node based campaign and customer data workflow",
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
    <div className="integration-scroll-map" aria-label="How OneBonsai Gulf turns connected business systems into measurable capabilities">
      <aside className="integration-scroll-sticky">
        <div className="integration-scroll-heading">
          <p>Start with what is already there</p>
          <h3>Your current setup stays in place.</h3>
          <ul>
            {systemInputs.map((input) => <li key={input}>{input}</li>)}
          </ul>
        </div>

        <div className="integration-scroll-visual">
          <Image
            key={activeCapability.image}
            src={publicAsset(activeCapability.image)}
            alt={activeCapability.alt}
            data-active="true"
            width={1672}
            height={941}
            sizes="(max-width: 760px) 100vw, 52vw"
            loading="lazy"
            unoptimized
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
  );
}
