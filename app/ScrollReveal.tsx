"use client";

import { useEffect } from "react";

const revealSelector = [
  "main section:not(.journey):not(.clarity-journey) .section-kicker",
  "main .inner-page-hero h1",
  "main section:not(.journey):not(.clarity-journey) h2",
  "main section:not(.journey):not(.clarity-journey) h3",
  "main section:not(.journey):not(.clarity-journey) p",
  "main section:not(.journey):not(.clarity-journey) li",
  "main section:not(.journey):not(.clarity-journey) figcaption",
  "main section:not(.journey):not(.clarity-journey) .primary-button",
  "main section:not(.journey):not(.clarity-journey) .about-intro-copy > a",
  "main section:not(.journey):not(.clarity-journey) .about-parent-brand > span",
  "main section:not(.journey):not(.clarity-journey) .about-case-sectors > a",
  "main section:not(.journey):not(.clarity-journey) .about-case-stage-copy > a",
  "main section:not(.journey):not(.clarity-journey) .infrastructure-copy > span",
  "main section:not(.journey):not(.clarity-journey) .product-index article > span",
  "main section:not(.journey):not(.clarity-journey) .contact-top > span",
  "main section:not(.journey):not(.clarity-journey) .contact > a",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector)).filter(
      (target) => !target.closest(".team-card, .team-person"),
    );

    root.classList.add("scroll-reveal-enabled");

    targets.forEach((target, index) => {
      target.dataset.scrollReveal = reducedMotion.matches ? "visible" : "pending";
      target.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
    });

    if (reducedMotion.matches) {
      return () => {
        root.classList.remove("scroll-reveal-enabled");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.dataset.scrollReveal = "visible";
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      targets.forEach((target) => {
        target.dataset.scrollReveal = "visible";
      });
      root.classList.remove("scroll-reveal-enabled");
    };
  }, []);

  return null;
}
