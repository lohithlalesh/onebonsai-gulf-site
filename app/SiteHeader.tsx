"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} data-scrolled={isScrolled}>
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
      <nav aria-label="Primary navigation">
        <a href={publicAsset("/about")}>About</a>
        <a href={`${publicAsset("/")}#process`}>Process</a>
        <a href={`${publicAsset("/")}#services`}>Services</a>
        <a href={publicAsset("/team")}>Team</a>
        <a href={`${publicAsset("/")}#work`}>Work</a>
      </nav>
      <a className="nav-cta" href={`${publicAsset("/")}#contact`}>Plan AI integration <span aria-hidden="true">↗</span></a>
    </header>
  );
}
