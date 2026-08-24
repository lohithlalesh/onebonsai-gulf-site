"use client";

import { useState } from "react";
import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const customers = [
  ["Ajman", "/customers/ajman.webp"],
  ["ITC Pros", "/customers/itc-pros.png"],
  ["Masdar City", "/customers/masdar-city.svg"],
  ["NEXT", "/customers/next.png"],
  ["OneBonsai", "/customers/onebonsai.png"],
  ["Northstone", "/customers/northstone.png"],
  ["Stare", "/customers/stare.png"],
];

export default function CustomerMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="customer-marquee" aria-labelledby="customer-marquee-title" data-paused={paused}>
      <div className="customer-marquee-heading">
        <p id="customer-marquee-title">Trusted by organizations across the UAE and beyond</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          {paused ? "Play logos" : "Pause logos"}
        </button>
      </div>
      <div className="customer-marquee-viewport">
        <div className="customer-marquee-track">
          {[0, 1].map((groupIndex) => (
            <div
              className="customer-marquee-group"
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? "true" : undefined}
            >
              {customers.map(([name, image]) => (
                <div className="customer-logo" key={`${groupIndex}-${name}`}>
                  <Image
                    src={publicAsset(image)}
                    alt={groupIndex === 0 ? name : ""}
                    width={320}
                    height={90}
                    loading="lazy"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
