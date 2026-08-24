"use client";

import { useState } from "react";
import EditorialLoop from "./EditorialLoop";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const capabilities = [
  {
    label: "Production AI",
    title: "AI that works in real operations",
    copy: "Vision AI, digital assistants, knowledge systems, document processing, and automation built for real workloads.",
  },
  {
    label: "Immersive training",
    title: "Training people can practise",
    copy: "VR simulation, digital twins, virtual humans, and learning analytics for safety, healthcare, industry, and defense.",
  },
  {
    label: "Secure deployment",
    title: "AI deployed where your data lives",
    copy: "Cloud, edge, hybrid, sovereign, and on-premise architecture shaped around security and operational requirements.",
  },
  {
    label: "Custom software",
    title: "Software built around the business",
    copy: "Connected platforms, workflow automation, internal tools, and customer products that fit existing systems.",
  },
  {
    label: "AI marketing",
    title: "Smarter growth systems",
    copy: "AI-assisted marketing operations, content workflows, customer intelligence, and practical personalization.",
  },
  {
    label: "Cybersecurity",
    title: "Secure systems and prepared teams",
    copy: "Cybersecurity training, secure AI governance, risk awareness, and operational safeguards built into delivery.",
  },
] as const;

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapability = capabilities[activeIndex];
  const selectPrevious = () => {
    setActiveIndex((current) => (current - 1 + capabilities.length) % capabilities.length);
  };
  const selectNext = () => {
    setActiveIndex((current) => (current + 1) % capabilities.length);
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
          <a href="https://onebonsai.com" target="_blank" rel="noreferrer">
            Explore OneBonsai
          </a>
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
          <dl>
            <div>
              <dt>Global foundation</dt>
              <dd>Deep-tech engineering and proven delivery</dd>
            </div>
            <div>
              <dt>Regional execution</dt>
              <dd>Local context, relationships, and support</dd>
            </div>
            <div>
              <dt>Built to last</dt>
              <dd>Secure systems that move beyond demos</dd>
            </div>
          </dl>
        </article>

        <div className="about-capability" aria-label="OneBonsai Gulf capabilities">
          <div className="about-orbit">
            <div className="about-orbit-ring" aria-hidden="true" />
            <div className="about-orbit-media">
              <EditorialLoop
                source={publicAsset("/media/editorial-intelligence-higgs-v1.mp4")}
                poster={publicAsset("/media/editorial-intelligence-higgs-v1-poster.jpg")}
              />
              <div className="about-orbit-copy" aria-live="polite">
                <span>{String(activeIndex + 1).padStart(2, "0")} / 06</span>
                <h3>{activeCapability.title}</h3>
                <p>{activeCapability.copy}</p>
              </div>
            </div>

            <div className="about-orbit-items">
              {capabilities.map((capability, index) => (
                <button
                  type="button"
                  className={index === activeIndex ? "is-active" : undefined}
                  key={capability.label}
                  aria-label={`Show ${capability.label}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <i aria-hidden="true">{index + 1}</i>
                  <span>{capability.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="about-orbit-controls">
            <button type="button" onClick={selectPrevious} aria-label="Previous capability">←</button>
            <span>{activeCapability.label}</span>
            <button type="button" onClick={selectNext} aria-label="Next capability">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
