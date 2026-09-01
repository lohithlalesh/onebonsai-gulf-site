import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function AboutSection() {
  return (
    <section id="about" className="about-section section-pad" aria-labelledby="about-title">
      <div className="about-intro">
        <div className="about-parent-brand" aria-label="Regional sister company of OneBonsai">
          <span>Regional sister company of</span>
          <Image
            src={publicAsset("/brand/onebonsai-wordmark-black.png")}
            alt="OneBonsai"
            width={1600}
            height={181}
            sizes="(max-width: 760px) 62vw, 420px"
            loading="lazy"
            unoptimized
          />
        </div>
        <h2 id="about-title">Engineering, delivered in the Gulf.</h2>
        <div className="about-intro-copy">
          <p>
            OneBonsai Gulf brings proven AI and immersive engineering into the region with local strategy,
            implementation, software, marketing, and cybersecurity support.
          </p>
          <a href="https://onebonsai.com" target="_blank" rel="noreferrer">
            Explore OneBonsai
            <ArrowUpRight size={15} weight="thin" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
