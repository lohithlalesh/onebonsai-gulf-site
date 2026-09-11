"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Image from "next/image";
import { useLocale } from "./LocaleProvider";
import { localizedPath } from "./locale";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\p{Nd}\s().-]{7,30}$/u;

type Requirement =
  | "agentic-ai"
  | "sovereign-cloud-integration"
  | "custom-software"
  | "ai-readiness"
  | "corporate-academy"
  | "tech-catch-up"
  | "other";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "contact" | "requirement", string>>;
type SubmissionState = "idle" | "submitting" | "error";

const requirementOptions: Array<{
  value: Requirement;
  en: string;
  ar: string;
}> = [
  { value: "agentic-ai", en: "Agentic AI", ar: "الذكاء الاصطناعي الوكيلي" },
  { value: "sovereign-cloud-integration", en: "Sovereign Cloud Integration", ar: "تكامل السحابة السيادية" },
  { value: "custom-software", en: "Custom Software", ar: "برمجيات مخصّصة" },
  { value: "ai-readiness", en: "AI Readiness", ar: "الجاهزية للذكاء الاصطناعي" },
  { value: "corporate-academy", en: "Corporate Academy", ar: "أكاديمية مؤسسية" },
  { value: "tech-catch-up", en: "Just want to catch up on tech", ar: "مجرد دردشة حول التقنية" },
  { value: "other", en: "Other", ar: "أخرى" },
];

const modalCopy = {
  en: {
    eyebrow: "A direct conversation with the CEO",
    title: "Talk to the CEO about what needs to move.",
    intro: "Share the workflow or opportunity you are weighing. Ivan will help you see what to improve, build, or leave alone.",
    close: "Close enquiry form",
    name: "Full name",
    namePlaceholder: "Your name",
    email: "Work email",
    emailPlaceholder: "name@company.com",
    phone: "Phone / WhatsApp",
    phonePlaceholder: "+971",
    contactHint: "Provide at least one way for us to reach you.",
    requirement: "Requirement scope",
    requirementPlaceholder: "Select a requirement",
    enquire: "Enquire",
    submitting: "Sending…",
    skip: "Skip",
    nameError: "Enter your full name.",
    contactError: "Add a work email or phone / WhatsApp number.",
    emailError: "Enter a valid work email.",
    phoneError: "Enter a valid phone or WhatsApp number.",
    requirementError: "Select the requirement closest to your need.",
    submitError: "We could not send your enquiry. Please try again or email ivan@obgulf.com.",
  },
  ar: {
    eyebrow: "محادثة مباشرة مع الرئيس التنفيذي",
    title: "لنتحدث عمّا يحتاج إلى التقدّم.",
    intro: "شاركنا سير العمل أو الفرصة التي تقيّمها. يساعدك إيفان على تحديد ما يستحق التحسين أو البناء أو الإبقاء عليه كما هو.",
    close: "إغلاق نموذج الاستفسار",
    name: "الاسم الكامل",
    namePlaceholder: "الاسم الكامل",
    email: "البريد الإلكتروني للعمل",
    emailPlaceholder: "name@company.com",
    phone: "الهاتف / واتساب",
    phonePlaceholder: "+971",
    contactHint: "أدخل وسيلة تواصل واحدة على الأقل.",
    requirement: "نطاق الاحتياج",
    requirementPlaceholder: "اختر نطاق الاحتياج",
    enquire: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    skip: "تخطَّ الآن",
    nameError: "يرجى إدخال الاسم الكامل.",
    contactError: "أدخل البريد الإلكتروني للعمل أو رقم الهاتف / واتساب.",
    emailError: "يرجى إدخال بريد إلكتروني صحيح.",
    phoneError: "يرجى إدخال رقم هاتف أو واتساب صحيح.",
    requirementError: "اختر النطاق الأقرب إلى احتياجك.",
    submitError: "تعذّر إرسال الطلب. يرجى المحاولة مجدداً أو مراسلة ivan@obgulf.com.",
  },
} as const;

type PlanIntegrationContextValue = {
  openPlanIntegration: () => void;
};

const PlanIntegrationContext = createContext<PlanIntegrationContextValue | null>(null);

export function PlanIntegrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openPlanIntegration = useCallback(() => setIsOpen(true), []);
  const closePlanIntegration = useCallback(() => setIsOpen(false), []);
  const contextValue = useMemo(() => ({ openPlanIntegration }), [openPlanIntegration]);

  return (
    <PlanIntegrationContext.Provider value={contextValue}>
      {children}
      <PlanIntegrationModal isOpen={isOpen} onClose={closePlanIntegration} />
    </PlanIntegrationContext.Provider>
  );
}

export function usePlanIntegration() {
  const context = useContext(PlanIntegrationContext);
  if (!context) throw new Error("usePlanIntegration must be used within PlanIntegrationProvider");
  return context;
}

export default function PlanIntegrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { locale, isArabic } = useLocale();
  const copy = modalCopy[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const isSubmitting = submissionState === "submitting";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      document.body.classList.add("plan-modal-open");
    } else if (!isOpen && dialog.open) {
      dialog.close();
      document.body.classList.remove("plan-modal-open");
      previousFocusRef.current?.focus();
    }

    return () => document.body.classList.remove("plan-modal-open");
  }, [isOpen]);

  const resetAndClose = useCallback(() => {
    if (isSubmitting) return;
    formRef.current?.reset();
    setErrors({});
    setSubmissionState("idle");
    onClose();
  }, [isSubmitting, onClose]);

  const skipToContact = () => {
    resetAndClose();
    window.requestAnimationFrame(() => {
      const contact = document.getElementById("contact");
      if (contact) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        contact.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        return;
      }

      window.location.assign(`${publicAsset(localizedPath("/contact", locale))}#contact`);
    });
  };

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) resetAndClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const requirement = String(data.get("requirement") ?? "") as Requirement;
    const website = String(data.get("website") ?? "").trim();
    const nextErrors: FormErrors = {};

    if (name.length < 2) nextErrors.name = copy.nameError;
    if (!email && !phone) nextErrors.contact = copy.contactError;
    if (email && !EMAIL_PATTERN.test(email)) nextErrors.email = copy.emailError;
    if (phone && !PHONE_PATTERN.test(phone)) nextErrors.phone = copy.phoneError;
    if (!requirementOptions.some((option) => option.value === requirement)) {
      nextErrors.requirement = copy.requirementError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmissionState("idle");
      return;
    }

    setErrors({});
    setSubmissionState("submitting");

    try {
      const response = await fetch(publicAsset("/api/enquire"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, requirement, locale, website }),
      });

      if (!response.ok) throw new Error("Enquiry delivery failed");

      form.reset();
      setSubmissionState("idle");
      onClose();
      window.location.assign(`${publicAsset(localizedPath("/contact", locale))}?enquiry=sent`);
    } catch {
      setSubmissionState("error");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="plan-integration-dialog"
      aria-labelledby="plan-integration-title"
      aria-describedby="plan-integration-intro"
      onClick={handleBackdropClick}
      onCancel={(event) => {
        if (isSubmitting) event.preventDefault();
      }}
      onClose={() => {
        if (isOpen) resetAndClose();
      }}
    >
      <div className="plan-modal-shell" dir={isArabic ? "rtl" : "ltr"}>
        <div className="plan-modal-header">
          <div className="plan-modal-header-copy">
            <p className="plan-modal-kicker"><span>01</span>{copy.eyebrow}</p>
            <h2 id="plan-integration-title">{copy.title}</h2>
            <p id="plan-integration-intro">{copy.intro}</p>
          </div>
          <div className="plan-modal-portrait">
            <Image
              src={publicAsset("/team/ivan-ceo-conversation.png")}
              alt="Ivan M Grey"
              width={626}
              height={632}
              sizes="(max-width: 640px) 180px, 220px"
              unoptimized
            />
          </div>
          <button
            className="plan-modal-close"
            type="button"
            aria-label={copy.close}
            disabled={isSubmitting}
            onClick={resetAndClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <form ref={formRef} className="plan-modal-form" noValidate aria-busy={isSubmitting} onSubmit={handleSubmit}>
          <div className="plan-modal-field plan-modal-field-wide">
            <label htmlFor="plan-name">{copy.name}<span aria-hidden="true"> *</span></label>
            <input
              id="plan-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              placeholder={copy.namePlaceholder}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "plan-name-error" : undefined}
            />
            {errors.name ? <p id="plan-name-error" className="plan-modal-error">{errors.name}</p> : null}
          </div>

          <div className="plan-modal-field">
            <label htmlFor="plan-email">{copy.email}</label>
            <input
              id="plan-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={180}
              placeholder={copy.emailPlaceholder}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email || errors.contact)}
              aria-describedby={errors.email ? "plan-email-error" : errors.contact ? "plan-contact-error" : "plan-contact-hint"}
            />
            {errors.email ? <p id="plan-email-error" className="plan-modal-error">{errors.email}</p> : null}
          </div>

          <div className="plan-modal-field">
            <label htmlFor="plan-phone">{copy.phone}</label>
            <input
              id="plan-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder={copy.phonePlaceholder}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.phone || errors.contact)}
              aria-describedby={errors.phone ? "plan-phone-error" : errors.contact ? "plan-contact-error" : "plan-contact-hint"}
            />
            {errors.phone ? <p id="plan-phone-error" className="plan-modal-error">{errors.phone}</p> : null}
          </div>

          <p id={errors.contact ? "plan-contact-error" : "plan-contact-hint"} className={errors.contact ? "plan-modal-error plan-modal-contact-hint" : "plan-modal-contact-hint"}>
            {errors.contact ?? copy.contactHint}
          </p>

          <div className="plan-modal-field plan-modal-field-wide">
            <label htmlFor="plan-requirement">{copy.requirement}<span aria-hidden="true"> *</span></label>
            <select
              id="plan-requirement"
              name="requirement"
              defaultValue=""
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.requirement)}
              aria-describedby={errors.requirement ? "plan-requirement-error" : undefined}
            >
              <option value="" disabled>{copy.requirementPlaceholder}</option>
              {requirementOptions.map((option) => (
                <option value={option.value} key={option.value}>{isArabic ? option.ar : option.en}</option>
              ))}
            </select>
            {errors.requirement ? <p id="plan-requirement-error" className="plan-modal-error">{errors.requirement}</p> : null}
          </div>

          <div className="plan-modal-honeypot" aria-hidden="true">
            <label htmlFor="plan-website">Website</label>
            <input id="plan-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {submissionState === "error" ? <p className="plan-modal-submit-error" role="alert">{copy.submitError}</p> : null}

          <div className="plan-modal-actions">
            <button className="plan-modal-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <span className="plan-modal-spinner" aria-hidden="true" /> : null}
              {isSubmitting ? copy.submitting : copy.enquire}
            </button>
            <button className="plan-modal-skip" type="button" disabled={isSubmitting} onClick={skipToContact}>
              {copy.skip}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
