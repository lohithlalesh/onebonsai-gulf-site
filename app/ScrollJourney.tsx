"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";

type Act = {
  eyebrow: string;
  title: string;
  copy: string;
  signal: string;
};

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const acts: Act[] = [
  {
    eyebrow: "Enterprise AI integration",
    title: "AI integration for the business you already run.",
    copy: "We help UAE companies connect AI to existing systems, automate real work, and keep people in control.",
    signal: "OneBonsai Gulf. Abu Dhabi.",
  },
  {
    eyebrow: "AI system integration",
    title: "Connect AI to your existing systems.",
    copy: "Bring your ERP, CRM, documents, data, and workflows into one secure AI layer.",
    signal: "Systems. Data. People.",
  },
  {
    eyebrow: "Custom AI solutions",
    title: "Turn business data into useful AI.",
    copy: "Give your teams practical AI agents, search, predictions, and automation built around daily work.",
    signal: "Context. Action. Control.",
  },
  {
    eyebrow: "Intelligent automation",
    title: "Move from data to decisions.",
    copy: "Connect the tools you trust to faster answers and actions your business can use.",
    signal: "Governed. Explainable. Secure.",
  },
  {
    eyebrow: "AI governance and scale",
    title: "Scale AI across your business.",
    copy: "Expand proven solutions across teams while governance, security, and ownership stay clear.",
    signal: "Pilot. Prove. Scale.",
  },
];

const capabilityCards = [
  {
    title: "AI integration",
    copy: "Connect software, data, and company knowledge in one secure flow.",
    image: publicAsset("/media/icon-systems.png"),
  },
  {
    title: "AI governance",
    copy: "Keep agents, predictions, and automation secure and accountable.",
    image: publicAsset("/media/icon-intelligence.png"),
  },
  {
    title: "Business scale",
    copy: "Expand proven results without losing human control or operational trust.",
    image: publicAsset("/media/icon-scale.png"),
  },
];

const flowNodes = ["Existing systems", "Governed context", "AI action", "Business value"];
const MOBILE_QUERY = "(max-width: 700px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FALLBACK_DURATION = 8;

function BouncyTitle({ children }: { children: string }) {
  return (
    <span className="journey-title-line">
      {children.split(" ").map((word, index) => (
        <span
          className="journey-word"
          key={`${word}-${index}`}
          style={{ "--word-index": index } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export default function ScrollJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeAct, setActiveAct] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const syncViewport = () => setIsSmallScreen(media.matches);

    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || isSmallScreen !== false) return;

    const motionPreference = window.matchMedia(REDUCED_MOTION_QUERY);
    let reduceMotion = motionPreference.matches;
    let targetTime = 0;
    let renderedTime = 0;
    let duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FALLBACK_DURATION;
    let animationFrame = 0;
    let visible = false;
    let running = false;
    let lastAct = -1;
    let lastReducedAct = -1;

    const updateReadyState = () => {
      if (video.readyState >= 2) setIsReady(true);
      if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
    };

    const renderFrame = () => {
      if (!visible) {
        running = false;
        return;
      }

      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const nextAct = Math.min(acts.length - 1, Math.floor(progress * acts.length));

      section.style.setProperty("--journey-progress", progress.toFixed(4));
      section.style.setProperty("--journey-fill", `${(progress * 100).toFixed(2)}%`);

      if (nextAct !== lastAct) {
        lastAct = nextAct;
        setActiveAct(nextAct);
      }

      if (video.readyState >= 2) {
        if (reduceMotion) {
          if (nextAct !== lastReducedAct) {
            lastReducedAct = nextAct;
            renderedTime = (nextAct / (acts.length - 1)) * Math.max(duration - 0.06, 0);
            targetTime = renderedTime;
            video.currentTime = renderedTime;
          }
        } else {
          targetTime = progress * Math.max(duration - 0.06, 0);
          renderedTime += (targetTime - renderedTime) * 0.16;
          if (Math.abs(renderedTime - video.currentTime) > 1 / 60) video.currentTime = renderedTime;
        }
      }

      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const startLoop = () => {
      if (running || !visible) return;
      running = true;
      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
      },
      { rootMargin: "120px 0px" },
    );

    const syncMotionPreference = () => {
      reduceMotion = motionPreference.matches;
      lastReducedAct = -1;
    };

    video.pause();
    void video.play().then(() => video.pause()).catch(() => {});
    updateReadyState();
    video.addEventListener("loadedmetadata", updateReadyState);
    video.addEventListener("loadeddata", updateReadyState);
    motionPreference.addEventListener("change", syncMotionPreference);
    observer.observe(section);

    return () => {
      visible = false;
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      video.removeEventListener("loadedmetadata", updateReadyState);
      video.removeEventListener("loadeddata", updateReadyState);
      motionPreference.removeEventListener("change", syncMotionPreference);
    };
  }, [isSmallScreen]);

  const updatePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    if (!shell || isSmallScreen !== false) return;
    const bounds = shell.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    shell.style.setProperty("--pointer-x", x.toFixed(3));
    shell.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const resetPointer = () => {
    shellRef.current?.style.setProperty("--pointer-x", "0");
    shellRef.current?.style.setProperty("--pointer-y", "0");
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="journey"
      data-act={activeAct}
      data-ready={isReady ? "true" : "false"}
      style={{ "--journey-progress": "0", "--journey-fill": "0%" } as CSSProperties}
      aria-label="OneBonsai Gulf: bringing AI into your business"
    >
      <div className="journey-pin">
        <div
          ref={shellRef}
          className="journey-shell"
          onPointerMove={updatePointer}
          onPointerLeave={resetPointer}
        >
          <div className="journey-topbar" aria-hidden="true">
            <span>ONEBONSAI GULF</span>
            <div className="journey-topbar-rail"><i /></div>
            <span>From systems to value</span>
          </div>

          <div className="journey-film" aria-hidden="true">
            {isSmallScreen === false && (
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                poster={publicAsset("/media/onebonsai-hero-poster-v2.jpg")}
                disableRemotePlayback
              >
                <source src={publicAsset("/media/onebonsai-hero-motion-4k.mp4")} type="video/mp4" />
              </video>
            )}
            {isSmallScreen !== false && (
              <Image
                src={publicAsset("/media/onebonsai-hero-poster-v2.jpg")}
                alt=""
                width={5504}
                height={3072}
                fetchPriority="high"
                unoptimized
              />
            )}
          </div>

          <div className="journey-copy">
            {acts.slice(0, 3).map((entry, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <article key={entry.eyebrow} data-index={index} aria-hidden={isSmallScreen === true ? false : activeAct !== index}>
                  <p className="journey-eyebrow">{entry.eyebrow}</p>
                  <Heading><BouncyTitle>{entry.title}</BouncyTitle></Heading>
                  <p className="journey-body">{entry.copy}</p>
                  <a className="journey-cta" href="#contact">Plan your AI integration</a>
                </article>
              );
            })}
          </div>

          <div className="journey-signal-card" aria-hidden="true">
            <span className="journey-signal-orb"><i /></span>
            <p>{acts[activeAct].signal}</p>
            <b>{activeAct < 3 ? "INTELLIGENCE TAKING ROOT" : "VALUE MOVING DOWNSTREAM"}</b>
          </div>

          <div className="journey-status" aria-hidden="true">
            <span><i /> Secure by design</span>
            <span>Built around your business</span>
          </div>

          <div className="journey-dark-panel">
            <div className="journey-dark-heading">
              {acts.slice(3).map((entry, offset) => (
                <article key={entry.eyebrow} data-index={offset + 3} aria-hidden={isSmallScreen === true ? false : activeAct !== offset + 3}>
                  <p>{entry.eyebrow}</p>
                  <h2><BouncyTitle>{entry.title}</BouncyTitle></h2>
                  <span>{entry.copy}</span>
                </article>
              ))}
            </div>

            <div className="journey-flow" aria-label="From existing systems to business value">
              <div className="journey-flow-line" aria-hidden="true"><i /></div>
              {flowNodes.map((node, index) => (
                <div className="journey-flow-node" key={node} style={{ "--flow-index": index } as CSSProperties}>
                  <span>{node}</span>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className="journey-capabilities">
              {capabilityCards.map((card, index) => (
                <article key={card.title} style={{ "--card-index": index } as CSSProperties}>
                  <div className="journey-icon-frame">
                    <Image src={card.image} alt="" width={2048} height={2048} loading="lazy" unoptimized />
                  </div>
                  <div className="journey-card-meta"><span>OneBonsai Gulf</span><span>Capability</span></div>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>

            <a className="journey-dark-cta" href="#services">Explore capabilities</a>
          </div>

          {!isReady && isSmallScreen === false && <div className="journey-loading" aria-hidden="true"><i /></div>}
        </div>
      </div>
    </section>
  );
}
