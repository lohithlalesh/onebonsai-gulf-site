"use client";

import { useState } from "react";
import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

type Customer = {
  name: string;
  image: string;
  treatment?: "screen";
};

const customers: readonly Customer[] = [
  { name: "Ajman", image: "/customers/ajman.webp" },
  { name: "ITC Pros", image: "/customers/itc-pros.png" },
  { name: "Masdar City", image: "/customers/masdar-city.svg" },
  { name: "NEXT", image: "/customers/next.png" },
  { name: "OneBonsai", image: "/customers/onebonsai.png" },
  { name: "Northstone", image: "/customers/northstone.png" },
  { name: "Stare", image: "/customers/stare.png" },
  { name: "Fuego Charcoal", image: "/customers/fuego.png" },
  { name: "Reqilo", image: "/customers/reqilo.svg" },
  { name: "FitHub", image: "/customers/fithub.jpeg", treatment: "screen" },
  { name: "Animalia", image: "/customers/animalia.png" },
  { name: "Buildin", image: "/customers/buildin.svg" },
  { name: "Motto Automotive", image: "/customers/motto.webp" },
  { name: "Casinos Austria International", image: "/customers/casinos-austria.png" },
  { name: "European External Action Service", image: "/customers/eeas.png" },
  { name: "Red Cross EU Office", image: "/customers/red-cross-eu.svg" },
  { name: "Mbare Drinks", image: "/customers/mbare.png" },
  { name: "Elite Labs", image: "/customers/elite-labs.png", treatment: "screen" },
  { name: "Vyonix", image: "/customers/vyonix.png", treatment: "screen" },
];

export default function CustomerMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="customer-marquee" aria-labelledby="customer-marquee-title" data-paused={paused}>
      <div className="customer-marquee-heading">
        <p id="customer-marquee-title">Trusted by organizations building what comes next</p>
        <button
          type="button"
          aria-label={paused ? "Play customer logos" : "Pause customer logos"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          UAE / GLOBAL
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
              {customers.map(({ name, image, treatment }) => (
                <div
                  className={`customer-logo${treatment === "screen" ? " customer-logo--screen" : ""}`}
                  key={`${groupIndex}-${name}`}
                >
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
