"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const navigation = [
  ["About", "/about"],
  ["Process", "/#process"],
  ["Services", "/#services"],
  ["Team", "/team"],
  ["Work", "/#work"],
] as const;

export default function SiteHeader() {
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
      <a className="brand" href={publicAsset("/")} aria-label="OneBonsai Gulf home">
        <Image
          src={publicAsset("/brand/onebonsai-gulf-white-800.png")}
          alt="OneBonsai Gulf"
          width={800}
          height={221}
          sizes="208px"
          unoptimized
        />
      </a>
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {navigation.map(([label, path]) => <a href={publicAsset(path)} key={label}>{label}</a>)}
      </nav>
      <div className="site-header-actions">
        <a className="nav-cta" href={`${publicAsset("/")}#contact`}>Plan AI integration <span aria-hidden="true">↗</span></a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
        {navigation.map(([label, path], index) => (
          <a href={publicAsset(path)} key={label} onClick={() => setIsMenuOpen(false)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{label}
          </a>
        ))}
      </nav>
    </header>
  );
}
