"use client";

import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";

export default function EnquiryConfirmationBanner({ show }: { show: boolean }) {
  const { isArabic } = useLocale();
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (!show) return;

    const url = new URL(window.location.href);
    url.searchParams.delete("enquiry");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    const timer = window.setTimeout(() => setIsVisible(false), 6500);
    return () => window.clearTimeout(timer);
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className="enquiry-confirmation" role="status" aria-live="polite">
      <p>{isArabic ? "شكراً، وصلنا طلبكم. سيتواصل معكم فريقنا قريباً." : "Thank you. Your enquiry has been sent, and our team will be in touch shortly."}</p>
      <button type="button" aria-label={isArabic ? "إغلاق التأكيد" : "Dismiss confirmation"} onClick={() => setIsVisible(false)}>×</button>
    </div>
  );
}
