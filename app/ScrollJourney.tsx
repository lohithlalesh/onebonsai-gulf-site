"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { useLocale } from "./LocaleProvider";
import { usePlanIntegration } from "./PlanIntegrationModal";

type Act = {
  eyebrow: string;
  title: string;
  copy: string;
  signal: string;
};

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const acts: Record<"en" | "ar", Act[]> = { en: [
  {
    eyebrow: "AI company in Abu Dhabi",
    title: "Custom software and AI integration, built in Abu Dhabi.",
    copy: "AI that works with the business you already run. We advise, build, integrate, and help your team operate the result.",
    signal: "OneBonsai Gulf. Abu Dhabi.",
  },
  {
    eyebrow: "Start with the workflow",
    title: "Choose one job worth improving.",
    copy: "Map the people, data, and constraints around it before writing a line of software.",
    signal: "Workflow. Data. Constraint.",
  },
  {
    eyebrow: "Build around what exists",
    title: "Add only what the work needs.",
    copy: "Connect the right model, interface, and approval points to the tools already in use.",
    signal: "Model. Interface. Approval.",
  },
  {
    eyebrow: "Put it into daily use",
    title: "Make the result easy to act on.",
    copy: "Answers, alerts, and next steps appear inside the workflows where teams need them.",
    signal: "Answer. Action. Record.",
  },
  {
    eyebrow: "Hand over real capability",
    title: "Your team owns what works.",
    copy: "We document the system, train its users, and set the rules for expanding it.",
    signal: "Ownership. Control. Scale.",
  },
], ar: [
  {
    eyebrow: "البرمجيات المخصّصة وتكامل الذكاء الاصطناعي في أبوظبي",
    title: "برمجيات مخصّصة وذكاء اصطناعي يتكامل مع أعمالكم، من أبوظبي.",
    copy: "نستشير ونبني ونربط الأنظمة، ثم نمكّن فريقكم من تشغيل النتيجة وامتلاكها.",
    signal: "ون بونساي الخليج. أبوظبي.",
  },
  {
    eyebrow: "ابدأ بسير العمل",
    title: "اختر مهمة واحدة تستحق التحسين.",
    copy: "حدّد الأشخاص والبيانات والقيود المحيطة بها قبل كتابة أي سطر برمجي.",
    signal: "سير العمل. البيانات. القيود.",
  },
  {
    eyebrow: "ابنِ حول ما هو قائم",
    title: "أضف فقط ما يحتاجه العمل.",
    copy: "اربط النموذج والواجهة ونقاط الاعتماد المناسبة بالأدوات المستخدمة بالفعل.",
    signal: "النموذج. الواجهة. الاعتماد.",
  },
  {
    eyebrow: "أدخله في العمل اليومي",
    title: "اجعل النتيجة سهلة التنفيذ.",
    copy: "تظهر الإجابات والتنبيهات والخطوات التالية داخل مسارات العمل التي تحتاجها الفرق.",
    signal: "إجابة. إجراء. سجل.",
  },
  {
    eyebrow: "سلّم قدرة حقيقية",
    title: "فريقكم يمتلك ما ينجح.",
    copy: "نوثّق النظام، وندرّب مستخدميه، ونضع ضوابط واضحة لتوسّعه.",
    signal: "ملكية. تحكّم. توسّع.",
  },
] };

const ACT_COUNT = 5;

const flowNodes = {
  en: ["One workflow", "Business context", "Useful output", "Team ownership"],
  ar: ["سير عمل واحد", "سياق الأعمال", "مخرجات مفيدة", "ملكية الفريق"],
};

const ownershipVisuals = {
  en: [
  { label: "Connected context", image: "/media/icon-systems-1200.avif" },
  { label: "Useful decisions", image: "/media/icon-intelligence-1200.avif" },
  { label: "Team ownership", image: "/media/icon-scale-1200.avif" },
  ],
  ar: [
    { label: "سياق مترابط", image: "/media/icon-systems-1200.avif" },
    { label: "قرارات مفيدة", image: "/media/icon-intelligence-1200.avif" },
    { label: "ملكية الفريق", image: "/media/icon-scale-1200.avif" },
  ],
} as const;
const MOBILE_QUERY = "(max-width: 700px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FALLBACK_DURATION = 8;

function BouncyTitle({ children }: { children: string }) {
  const words = children.split(" ");

  return (
    <span className="journey-title-line">
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className="journey-word"
            style={{ "--word-index": index } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

export default function ScrollJourney() {
  const { locale, isArabic } = useLocale();
  const { openPlanIntegration } = usePlanIntegration();
  const localizedActs = acts[locale];
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
    if (!section || !video || isSmallScreen !== true) return;

    const motionPreference = window.matchMedia(REDUCED_MOTION_QUERY);
    let reduceMotion = motionPreference.matches;
    let duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FALLBACK_DURATION;
    let animationFrame = 0;
    let lastAct = -1;
    let lastReducedAct = -1;
    let hasRequestedMobileVideo = Boolean(video.currentSrc);

    const updateReadyState = () => {
      if (video.readyState >= 2) setIsReady(true);
      if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
      requestMobileUpdate();
    };

    const updateMobileJourney = () => {
      animationFrame = 0;
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const nextAct = Math.min(ACT_COUNT - 1, Math.floor(progress * ACT_COUNT));

      section.style.setProperty("--journey-progress", progress.toFixed(4));
      section.style.setProperty("--journey-fill", `${(progress * 100).toFixed(2)}%`);

      if (nextAct !== lastAct) {
        lastAct = nextAct;
        setActiveAct(nextAct);
      }

      if (video.readyState >= 2) {
        const availableDuration = Math.max(duration - 0.06, 0);
        const targetTime = reduceMotion
          ? (nextAct / (ACT_COUNT - 1)) * availableDuration
          : progress * availableDuration;

        if (!reduceMotion || nextAct !== lastReducedAct) {
          lastReducedAct = nextAct;
          if (Math.abs(targetTime - video.currentTime) > 1 / 48) video.currentTime = targetTime;
        }
      }
    };

    const requestMobileUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateMobileJourney);
    };

    const ensureMobileVideo = () => {
      if (hasRequestedMobileVideo) return;
      hasRequestedMobileVideo = true;
      video.src = publicAsset("/media/onebonsai-hero-motion-mobile-v1.mp4");
      video.load();
    };

    const handleMobileScroll = () => {
      ensureMobileVideo();
      requestMobileUpdate();
    };

    updateMobileJourney();
    video.pause();
    video.addEventListener("loadedmetadata", updateReadyState);
    video.addEventListener("loadeddata", updateReadyState);
    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    window.addEventListener("resize", requestMobileUpdate);

    const syncMotionPreference = () => {
      reduceMotion = motionPreference.matches;
      lastReducedAct = -1;
      requestMobileUpdate();
    };
    motionPreference.addEventListener("change", syncMotionPreference);
    if (window.scrollY > 8) ensureMobileVideo();

    return () => {
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("resize", requestMobileUpdate);
      video.removeEventListener("loadedmetadata", updateReadyState);
      video.removeEventListener("loadeddata", updateReadyState);
      motionPreference.removeEventListener("change", syncMotionPreference);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [isSmallScreen]);

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
      const nextAct = Math.min(ACT_COUNT - 1, Math.floor(progress * ACT_COUNT));

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
            renderedTime = (nextAct / (ACT_COUNT - 1)) * Math.max(duration - 0.06, 0);
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
      aria-label={isArabic ? "ون بونساي الخليج: إدخال الذكاء الاصطناعي إلى أعمالكم" : "OneBonsai Gulf: bringing AI into your business"}
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
            <span>{isArabic ? "من الأنظمة إلى القيمة" : "From systems to value"}</span>
          </div>

          <div className="journey-film" aria-hidden="true">
            <Image
              src={publicAsset(
                isSmallScreen === false
                  ? "/media/onebonsai-hero-poster-web-v3.jpg"
                  : "/media/onebonsai-hero-poster-mobile-v2.jpg",
              )}
              alt=""
              width={isSmallScreen === false ? 2400 : 1200}
              height={isSmallScreen === false ? 1350 : 675}
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              unoptimized
            />
            {isSmallScreen !== null && (
              <video
                key={isSmallScreen ? "mobile" : "desktop"}
                ref={videoRef}
                muted
                playsInline
                preload={isSmallScreen ? "none" : "auto"}
                poster={publicAsset(
                  isSmallScreen
                    ? "/media/onebonsai-hero-poster-mobile-v2.jpg"
                    : "/media/onebonsai-hero-poster-web-v3.jpg",
                )}
                disableRemotePlayback
              >
                {isSmallScreen === false && (
                  <source src={publicAsset("/media/onebonsai-hero-motion-web-v2.mp4")} type="video/mp4" />
                )}
              </video>
            )}
          </div>

          <div className="journey-copy">
            {localizedActs.slice(0, 3).map((entry, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <article key={entry.eyebrow} data-index={index} aria-hidden={index === 0 ? undefined : true}>
                  <p className="journey-eyebrow">{entry.eyebrow}</p>
                  <Heading><BouncyTitle>{entry.title}</BouncyTitle></Heading>
                  <p className="journey-body">{entry.copy}</p>
                  {index === 0 && <button className="journey-cta" type="button" onClick={openPlanIntegration}>{isArabic ? "خطّط لتكامل الذكاء الاصطناعي" : "Plan your AI integration"}</button>}
                </article>
              );
            })}
          </div>

          <div className="journey-status" aria-hidden="true">
            <span><i /> {isArabic ? "الأمان جزء من التصميم" : "Secure by design"}</span>
            <span>{isArabic ? "مصمّم حول أعمالكم" : "Built around your business"}</span>
          </div>

          <div className="journey-dark-panel">
            <div className="journey-dark-heading">
              {localizedActs.slice(3).map((entry, offset) => (
                <article key={entry.eyebrow} data-index={offset + 3} aria-hidden="true">
                  <p>{entry.eyebrow}</p>
                  <h2><BouncyTitle>{entry.title}</BouncyTitle></h2>
                  <span>{entry.copy}</span>
                </article>
              ))}
            </div>

            <div className="journey-flow" aria-label={isArabic ? "من الأنظمة القائمة إلى قيمة الأعمال" : "From existing systems to business value"}>
              <div className="journey-flow-line" aria-hidden="true"><i /></div>
              {flowNodes[locale].map((node, index) => (
                <div className="journey-flow-node" key={node} style={{ "--flow-index": index } as CSSProperties}>
                  <span>{node}</span>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className="journey-ownership-visuals" aria-label={isArabic ? "سياق مترابط وقرارات مفيدة وملكية الفريق" : "Connected context, useful decisions, and team ownership"}>
              {ownershipVisuals[locale].map((visual, index) => (
                <figure key={visual.label} style={{ "--visual-index": index } as CSSProperties}>
                  <Image
                    src={publicAsset(visual.image)}
                    alt=""
                    width={1200}
                    height={1200}
                    loading="lazy"
                    sizes="(max-width: 700px) calc(100vw - 52px), 28vw"
                    unoptimized
                  />
                  <figcaption>{visual.label}</figcaption>
                </figure>
              ))}
            </div>

            <a className="journey-dark-cta" href="#process">{isArabic ? "تعرّف إلى أسلوب عملنا" : "See how we work"}</a>
          </div>

          {!isReady && isSmallScreen === false && <div className="journey-loading" aria-hidden="true"><i /></div>}
        </div>
      </div>
      <div className="sr-only journey-accessible-steps">
        <h2>{isArabic ? "كيف ننتقل من الفكرة إلى قدرة يملكها فريقكم" : "How we move from an idea to capability your team owns"}</h2>
        <ol>
          {localizedActs.slice(1).map((entry) => (
            <li key={entry.eyebrow}>
              <h3>{entry.title}</h3>
              <p>{entry.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
