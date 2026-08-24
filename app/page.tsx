import Image from "next/image";
import CustomerMarquee from "./CustomerMarquee";
import ScrollJourney from "./ScrollJourney";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const pathways = [
  {
    title: "Connect what already works",
    copy: "We link the software, data, documents, and workflows your organization already trusts.",
  },
  {
    title: "Activate useful intelligence",
    copy: "We apply the right AI capability to operational friction and measurable opportunities.",
  },
  {
    title: "Scale with control",
    copy: "We equip people, establish governance, and expand proven value across the enterprise.",
  },
];

const outcomes = [
  {
    title: "Connected context",
    copy: "Systems and data move through one governed intelligence layer.",
  },
  {
    title: "Useful automation",
    copy: "Agents and workflows solve clear operational problems.",
  },
  {
    title: "Confident adoption",
    copy: "Teams understand, trust, and control the capability they use.",
  },
  {
    title: "Measured value",
    copy: "Proven outcomes expand without losing oversight or purpose.",
  },
];

const services = [
  {
    title: "AI Strategy & Integration",
    copy: "Readiness, roadmaps, governance, enterprise integration, and transformation programs.",
    items: ["AI readiness", "Executive roadmaps", "Governance", "Enterprise adoption"],
  },
  {
    title: "Custom AI Solutions",
    copy: "Useful intelligence engineered around your data, teams, and daily operations.",
    items: ["AI agents", "Document intelligence", "Computer vision", "Predictive analytics"],
  },
  {
    title: "Digital Engineering",
    copy: "Secure applications, platforms, and connected products built for long-term scale.",
    items: ["Enterprise software", "SaaS platforms", "Cloud architecture", "System integration"],
  },
  {
    title: "AI Academy",
    copy: "Practical programs that turn AI understanding into confident organizational capability.",
    items: ["Executive programs", "Team training", "Workforce upskilling", "Technical programs"],
  },
];

const programs = [
  "AI for CEOs",
  "AI governance",
  "Copilot and Gemini",
  "Prompt engineering",
  "AI agents",
  "Responsible AI",
];

const products = [
  ["Tarteeb", "Home and lifestyle intelligence", "Life admin powered by AI"],
  ["Marengo", "The intelligent equestrian platform", "Equine data, connected globally"],
  ["MedHub", "AI healthcare navigation", "Clearer access to care"],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="OneBonsai Gulf home">
          <Image
            src={publicAsset("/brand/onebonsai-gulf-white.png")}
            alt="OneBonsai Gulf"
            width={3390}
            height={938}
            unoptimized
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#academy">Academy</a>
          <a href="#work">Work</a>
        </nav>
        <a className="nav-cta" href="#contact">Plan AI integration</a>
      </header>

      <main id="main-content">
        <ScrollJourney />
        <CustomerMarquee />

        <section className="pathways section-pad" aria-labelledby="pathways-title">
          <div className="section-intro">
            <p className="section-kicker">From system to outcome</p>
            <h2 id="pathways-title">AI that fits the business already in motion.</h2>
            <p>We start with your operating reality, then build the shortest responsible path to useful intelligence.</p>
          </div>

          <div className="pathway-grid">
            {pathways.map((pathway, index) => (
              <article className={index === 0 ? "pathway-feature" : undefined} key={pathway.title}>
                <div>
                  <h3>{pathway.title}</h3>
                  <p>{pathway.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="manifesto section-pad" aria-labelledby="manifesto-title">
          <div className="manifesto-heading">
            <p className="section-kicker">Our point of view</p>
            <h2 id="manifesto-title">AI should simplify the business you already have.</h2>
          </div>
          <div className="manifesto-proof">
            <p>Your organization already has valuable systems, knowledge, processes, and people.</p>
            <p>We connect them to useful intelligence, securely, practically, and with a clear commercial purpose.</p>
          </div>
        </section>

        <section id="work" className="system-section section-pad" aria-labelledby="system-title">
          <div className="system-copy">
            <p className="section-kicker">One intelligent operating layer</p>
            <h2 id="system-title">Every system can work as one business.</h2>
            <p>From ERP and CRM to documents, operations, and institutional knowledge, we create the connections that make intelligence useful.</p>
            <a className="primary-button" href="#contact">Plan AI integration</a>
          </div>
          <div className="outcome-ledger" aria-label="AI integration outcomes">
            {outcomes.map((outcome) => (
              <article key={outcome.title}>
                <h3>{outcome.title}</h3>
                <p>{outcome.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="services section-pad" aria-labelledby="services-title">
          <div className="services-heading">
            <div>
              <p className="section-kicker">Services</p>
              <h2 id="services-title">From first question to full-scale value.</h2>
            </div>
            <p>Strategy, engineering, adoption, and growth delivered as one integrated capability.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <details key={service.title}>
                <summary>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="service-detail">
                  {service.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="people-section section-pad" aria-labelledby="people-title">
          <div className="people-copy">
            <p className="section-kicker">Regional intelligence. Human adoption.</p>
            <h2 id="people-title">AI transformation is a people project.</h2>
            <p>We work beside leadership, technology teams, and operational experts to turn new capability into confident everyday practice.</p>
          </div>
          <figure>
            <Image
              src={publicAsset("/media/uae-port-ai-v1.jpg")}
              alt="OneBonsai Gulf consultant with Emirati logistics leaders"
              width={1672}
              height={941}
              loading="lazy"
              unoptimized
            />
            <figcaption>Logistics and operations</figcaption>
          </figure>
          <figure>
            <Image
              src={publicAsset("/media/uae-ai-workshop-v1.jpg")}
              alt="OneBonsai Gulf consultant leading an AI workshop in the UAE"
              width={1672}
              height={941}
              loading="lazy"
              unoptimized
            />
            <figcaption>People and adoption</figcaption>
          </figure>
        </section>

        <section className="infrastructure-section" aria-labelledby="infrastructure-title">
          <Image
            src={publicAsset("/media/infrastructure-intelligence-v2.jpg")}
            alt="UAE engineers using AI and a drone to inspect bridge infrastructure"
            width={1672}
            height={941}
            loading="lazy"
            unoptimized
          />
          <div className="infrastructure-copy">
            <p>Computer vision for UAE infrastructure</p>
            <h2 id="infrastructure-title">Infrastructure intelligence, at scale.</h2>
            <span>Inspect. Detect. Act.</span>
          </div>
        </section>

        <section id="academy" className="academy section-pad" aria-labelledby="academy-title">
          <div className="academy-mark" aria-hidden="true">AI<span>+</span></div>
          <div className="academy-copy">
            <p className="section-kicker">OneBonsai Gulf AI Academy</p>
            <h2 id="academy-title">Building AI-ready organizations.</h2>
            <p>Executive programs, department training, workforce upskilling, and technical learning designed for real organizational adoption.</p>
            <ul className="academy-programs">
              {programs.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a className="primary-button" href="#contact">Bring the Academy to your team</a>
          </div>
        </section>

        <section className="products section-pad" aria-labelledby="products-title">
          <div className="products-heading">
            <p className="section-kicker">Products built in-house</p>
            <h2 id="products-title">Intelligence built into real life.</h2>
          </div>
          <div className="product-index">
            {products.map(([name, label, signal]) => (
              <article key={name}>
                <h3>{name}</h3>
                <p>{label}</p>
                <span>{signal}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="contact-top">
            <span>Abu Dhabi, United Arab Emirates</span>
            <span>Enterprise AI across the Gulf</span>
          </div>
          <p className="section-kicker">Let&apos;s build what comes next</p>
          <h2 id="contact-title">Ready to make AI <em>valuable?</em></h2>
          <a href="mailto:info@onebonsai.com?subject=AI%20Strategy%20Consultation">Plan AI integration</a>
          <footer>
            <Image
              src={publicAsset("/brand/onebonsai-gulf-white.png")}
              alt="OneBonsai Gulf"
              width={3390}
              height={938}
              loading="lazy"
              unoptimized
            />
            <p><a href="mailto:info@onebonsai.com">info@onebonsai.com</a><br /><a href="https://obgulf.com">obgulf.com</a></p>
            <p>© {new Date().getFullYear()} OneBonsai Gulf LLC</p>
          </footer>
        </section>
      </main>
    </>
  );
}
