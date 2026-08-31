import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

export default function SiteContact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-top">
        <span>Abu Dhabi, United Arab Emirates</span>
        <span>Enterprise AI across the Gulf</span>
      </div>
      <p className="section-kicker">Start with a real workflow</p>
      <h2 id="contact-title">Tell us what needs to work <em>better.</em></h2>
      <a href="mailto:info@onebonsai.com?subject=AI%20Strategy%20Consultation">Plan AI integration</a>
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
          <a href="mailto:info@onebonsai.com">info@onebonsai.com</a><br />
          <a href={publicAsset("/about")}>About</a> · <a href={publicAsset("/team")}>Team</a>
        </p>
        <p>© {new Date().getFullYear()} OneBonsai Gulf LLC</p>
      </footer>
    </section>
  );
}
