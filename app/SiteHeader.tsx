"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";
import { localizedPath } from "./locale";
import { usePlanIntegration } from "./PlanIntegrationModal";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const navigation = {
  en: [
    ["About", "/about"],
    ["Services", "/services"],
    ["Industries", "/industries"],
    ["Work", "/work"],
    ["Careers", "/careers"],
    ["Insights", "/insights"],
  ],
  ar: [
    ["من نحن", "/about"],
    ["خدماتنا", "/services"],
    ["القطاعات", "/industries"],
    ["أعمالنا", "/work"],
    ["الوظائف", "/careers"],
    ["الرؤى", "/insights"],
  ],
} as const;

export default function SiteHeader() {
  const { locale, isArabic, directionArrow, switchLocale } = useLocale();
  const { openPlanIntegration } = usePlanIntegration();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 72;
      if (nextScrolled === scrolledRef.current) return;
      scrolledRef.current = nextScrolled;
      setIsScrolled(nextScrolled);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const closeAtDesktop = () => {
      if (window.innerWidth > 840) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeAtDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeAtDesktop);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " is-menu-open" : ""}`}
      data-scrolled={isScrolled}
    >
      <a className="brand" href={publicAsset(localizedPath("/", locale))} aria-label={isArabic ? "الصفحة الرئيسية لون بونساي الخليج" : "OneBonsai Gulf home"}>
        <Image
          src={publicAsset("/brand/onebonsai-gulf-white-800.png")}
          alt="OneBonsai Gulf"
          width={800}
          height={221}
          sizes="208px"
          unoptimized
        />
      </a>
      <nav className="desktop-navigation" aria-label={isArabic ? "التنقل الرئيسي" : "Primary navigation"}>
        {navigation[locale].map(([label, path]) => <a href={publicAsset(localizedPath(path, locale))} key={label}>{label}</a>)}
      </nav>
      <div className="site-header-actions">
        <button className="language-toggle language-toggle-desktop" type="button" onClick={switchLocale} lang={isArabic ? "en" : "ar"}>
          {isArabic ? "English" : "العربية"}
        </button>
        <button className="nav-cta" type="button" onClick={openPlanIntegration}>
          {isArabic ? "خطّط لتكامل الذكاء الاصطناعي" : "Plan AI integration"} <span aria-hidden="true">{directionArrow}</span>
        </button>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isArabic ? (isMenuOpen ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل") : (isMenuOpen ? "Close navigation" : "Open navigation")}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label={isArabic ? "التنقل عبر الهاتف" : "Mobile navigation"}>
        {navigation[locale].map(([label, path], index) => (
          <a href={publicAsset(localizedPath(path, locale))} key={label} onClick={() => setIsMenuOpen(false)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </a>
        ))}
        <button className="language-toggle language-toggle-mobile" type="button" onClick={switchLocale} lang={isArabic ? "en" : "ar"}>
          {isArabic ? "Switch to English" : "التبديل إلى العربية"}
        </button>
      </nav>
    </header>
  );
}
