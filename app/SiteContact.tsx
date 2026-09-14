"use client";

import Image from "next/image";
import { useLocale } from "./LocaleProvider";
import PlanIntegrationButton from "./PlanIntegrationButton";
import { localizedPath } from "./locale";
import { openAnalyticsPreferences, trackEvent } from "./analytics";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function SiteContact() {
  const { locale, isArabic } = useLocale();

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-top">
        <span>{isArabic ? "أبوظبي، الإمارات العربية المتحدة" : "Abu Dhabi, United Arab Emirates"}</span>
        <span>{isArabic ? "ذكاء اصطناعي مؤسسي في دول الخليج" : "Enterprise AI across the Gulf"}</span>
      </div>
      <p className="section-kicker">{isArabic ? "ابدأ بسير عمل حقيقي" : "Start with a real workflow"}</p>
      <h2 id="contact-title">{isArabic ? "انقل اهتمامك بالذكاء الاصطناعي إلى نظام يستخدمه فريقك بثقة." : "Move from AI interest to a system your team can use."}</h2>
      <PlanIntegrationButton>{isArabic ? "ناقش مبادرة ذكاء اصطناعي" : "Discuss an AI initiative"}</PlanIntegrationButton>
      <footer>
        <Image
          src={publicAsset("/brand/onebonsai-gulf-white-800.png")}
          alt="OneBonsai Gulf"
          width={800}
          height={221}
          loading="lazy"
          unoptimized
        />
        <p>
          {isArabic ? "SE45 02، المنطقة الحرة بمدينة مصدر، أبوظبي" : "SE45 02, Masdar City Free Zone, Abu Dhabi"}<br />
          <a href="tel:+971502077215" dir="ltr" onClick={() => trackEvent("outbound_contact_click", { channel: "phone", locale })}>+971 50 207 7215</a><br />
          <a href="mailto:info@onebonsai.com" onClick={() => trackEvent("outbound_contact_click", { channel: "email", locale })}>info@onebonsai.com</a><br />
          <a href={publicAsset(localizedPath("/about", locale))}>{isArabic ? "من نحن" : "About"}</a> · <a href={publicAsset(localizedPath("/services", locale))}>{isArabic ? "الخدمات" : "Services"}</a> · <a href={publicAsset(localizedPath("/industries", locale))}>{isArabic ? "القطاعات" : "Industries"}</a> · <a href={publicAsset(localizedPath("/work", locale))}>{isArabic ? "الأعمال" : "Work"}</a> · <a href={publicAsset(localizedPath("/careers", locale))}>{isArabic ? "الوظائف" : "Careers"}</a> · <a href={publicAsset(localizedPath("/insights", locale))}>{isArabic ? "الرؤى" : "Insights"}</a><br />
          <a href={publicAsset(localizedPath("/privacy", locale))}>{isArabic ? "الخصوصية" : "Privacy"}</a> · <a href={publicAsset(localizedPath("/terms", locale))}>{isArabic ? "الشروط" : "Terms"}</a> · <button className="analytics-preferences-button" type="button" onClick={openAnalyticsPreferences}>{isArabic ? "إعدادات ملفات الارتباط" : "Cookie settings"}</button><br />
          <span className="contact-socials" aria-label={isArabic ? "تابع ون بونساي الخليج" : "Follow OneBonsai Gulf"}>
            <a href="https://www.instagram.com/onebonsai_gulf/" target="_blank" rel="me noopener noreferrer">{isArabic ? "إنستغرام" : "Instagram"} <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span></a>
            <a href="https://ae.linkedin.com/company/thegreyworld" target="_blank" rel="me noopener noreferrer">{isArabic ? "لينكدإن" : "LinkedIn"} <span aria-hidden="true">{isArabic ? "↖" : "↗"}</span></a>
          </span>
        </p>
        <p>© {new Date().getFullYear()} OneBonsai Gulf LLC</p>
      </footer>
    </section>
  );
}
