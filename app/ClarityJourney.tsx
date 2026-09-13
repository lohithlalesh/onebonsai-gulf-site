"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale } from "./LocaleProvider";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const steps = { en: [
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
], ar: [
  {
    label: "شخّص",
    title: "حدّد سير العمل الذي يستحق التحسين.",
    copy: "نرسم الأشخاص والأنظمة ونقاط التسليم والاختناقات خلف مهمة واحدة قبل تحديد موضع الذكاء الاصطناعي.",
    outcomes: ["خريطة الأنظمة", "أولويات حالات الاستخدام", "مقاييس نجاح واضحة"],
    image: "/media/clarity-diagnose-3d-v1.jpg",
  },
  {
    label: "ادمج",
    title: "ابنِ حول الأدوات المستخدمة بالفعل.",
    copy: "نربط النموذج والواجهة ونقاط الاعتماد المناسبة من دون فرض استبدال الأنظمة القائمة.",
    outcomes: ["تكاملات آمنة", "أدوات ذكاء اصطناعي مفيدة", "نقاط اعتماد بشرية"],
    image: "/media/clarity-integrate-3d-v1.jpg",
  },
  {
    label: "وسّع",
    title: "توسّع فقط بعد نجاح سير العمل الأول.",
    copy: "ندرّب المستخدمين، ونحدّد الملكية، ونضع الضوابط اللازمة قبل انتقال القدرة إلى فريق آخر.",
    outcomes: ["تبنّي الفريق", "حوكمة الذكاء الاصطناعي", "توسّع قابل للقياس"],
    image: "/media/clarity-scale-3d-v1.jpg",
  },
] } as const;

const STEP_COUNT = 3;

export default function ClarityJourney() {
  const { locale, isArabic } = useLocale();
  const localizedSteps = steps[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeStep = localizedSteps[activeIndex];

  useEffect(() => {
    let frame = 0;
    const desktopJourney = window.matchMedia("(min-width: 761px)");
    let isListening = false;

    const updateStep = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setActiveIndex(Math.round(progress * (STEP_COUNT - 1)));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStep);
    };

    const startListening = () => {
      if (isListening) return;
      isListening = true;
      updateStep();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);
    };

    const stopListening = () => {
      if (!isListening) return;
      isListening = false;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const syncJourneyMode = () => {
      if (desktopJourney.matches) {
        startListening();
      } else {
        stopListening();
        setActiveIndex(0);
      }
    };

    syncJourneyMode();
    desktopJourney.addEventListener("change", syncJourneyMode);

    return () => {
      desktopJourney.removeEventListener("change", syncJourneyMode);
      stopListening();
    };
  }, []);

  const selectStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const travel = Math.max(section.offsetHeight - window.innerHeight, 0);
    window.scrollTo({
      top: sectionTop + travel * (index / (STEP_COUNT - 1)),
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
      <h2 id="clarity-title" className="sr-only">{isArabic ? "أسلوب عملنا: من التعقيد إلى الوضوح في ثلاث خطوات." : "How we work: From complexity to clarity in 3 steps."}</h2>
      <div className="clarity-sticky">
        <nav className="clarity-orbit" aria-label={isArabic ? "اختر خطوة من خطوات التنفيذ" : "Choose a delivery step"}>
          <div className="clarity-orbit-track">
            <div className="clarity-orbit-line" />
            <div className="clarity-orbit-ticks" />
            <div className="clarity-orbit-sweep" />
            {localizedSteps.map((step, index) => (
              <button
                type="button"
                key={step.label}
                className={index === activeIndex ? "is-active" : undefined}
                onClick={() => selectStep(index)}
                aria-label={isArabic
                  ? `${String(index + 1).padStart(2, "0")}: اعرض الخطوة ${index + 1}: ${step.label}`
                  : `${String(index + 1).padStart(2, "0")}: Show step ${index + 1}: ${step.label}`}
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
          <i><b style={{ transform: `scaleX(${(activeIndex + 1) / STEP_COUNT})` }} /></i>
          <span>{String(STEP_COUNT).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="clarity-mobile-steps">
        {localizedSteps.map((step, index) => (
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
