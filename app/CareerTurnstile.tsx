"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "./locale";

type TurnstileApi = {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;
const SCRIPT_ID = "cloudflare-turnstile-api";

export default function CareerTurnstile({ locale, onToken }: { locale: Locale; onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const initialise = async () => {
      try {
        const configResponse = await fetch(publicAsset("/api/careers/config"), { cache: "no-store" });
        const config = (await configResponse.json()) as { siteKey?: string };
        if (!configResponse.ok || !config.siteKey) throw new Error("Turnstile configuration unavailable");

        const renderWidget = () => {
          if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: config.siteKey,
            theme: "dark",
            language: locale === "ar" ? "ar" : "en",
            appearance: "interaction-only",
            callback: (token: string) => {
              setError("");
              onToken(token);
            },
            "expired-callback": () => onToken(""),
            "error-callback": () => {
              onToken("");
              setError(locale === "ar" ? "تعذّر إكمال التحقق. أعد المحاولة." : "The human check could not load. Please retry.");
            },
          });
        };

        if (window.turnstile) {
          renderWidget();
          return;
        }

        const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener("load", renderWidget, { once: true });
          return;
        }

        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.addEventListener("load", renderWidget, { once: true });
        script.addEventListener("error", () => {
          if (!cancelled) setError(locale === "ar" ? "تعذّر تحميل التحقق البشري." : "The human check could not load.");
        }, { once: true });
        document.head.appendChild(script);
      } catch {
        if (!cancelled) setError(locale === "ar" ? "التحقق البشري غير متاح مؤقتاً." : "Human verification is temporarily unavailable.");
      }
    };

    void initialise();
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      onToken("");
    };
  }, [locale, onToken]);

  return (
    <div className="career-turnstile-wrap">
      <div ref={containerRef} aria-label={locale === "ar" ? "تحقق بشري" : "Human verification"} />
      {error ? <p className="career-field-error" role="alert">{error}</p> : null}
    </div>
  );
}
