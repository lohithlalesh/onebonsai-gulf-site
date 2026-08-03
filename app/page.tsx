"use client";

import ScrollJourney from "./ScrollJourney";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const pathways = [
  {
    number: "01",
    title: "Connect your systems",
    copy: "We link the software, data, documents, and workflows your organization already trusts.",
  },
  {
    number: "02",
    title: "Activate intelligence",
    copy: "We apply the right AI capabilities to real operational friction and measurable opportunities.",
  },
  {
    number: "03",
    title: "Scale what works",
    copy: "We equip people, establish governance, and expand proven value across the enterprise.",
  },
];

const services = [
  {
    number: "01",
    title: "AI Strategy & Integration",
    copy: "Readiness, roadmaps, governance, enterprise integration, and transformation programs.",
    items: ["AI readiness", "Executive roadmaps", "Governance", "Enterprise adoption"],
  },
  {
    number: "02",
    title: "Custom AI Solutions",
    copy: "Useful intelligence engineered around your data, teams, and daily operations.",
    items: ["AI agents", "Document intelligence", "Computer vision", "Predictive analytics"],
  },
  {
    number: "03",
    title: "Digital Engineering",
    copy: "Secure applications, platforms, and connected products built for long-term scale.",
    items: ["Enterprise software", "SaaS platforms", "Cloud architecture", "System integration"],
  },
  {
    number: "04",
    title: "AI Academy",
    copy: "Practical programs that turn AI understanding into confident organizational capability.",
    items: ["Executive programs", "Team training", "Workforce upskilling", "Technical programs"],
  },
];

const products = [
  ["Tarteeb", "Home and lifestyle intelligence", "LIFE / ADMIN / AI"],
  ["Marengo", "The intelligent equestrian platform", "EQUINE / DATA / GLOBAL"],
  ["MedHub", "AI healthcare navigation", "CARE / ACCESS / AI"],
];

const customers = [
  ["Ajman", "/customers/ajman.webp"],
  ["ITC Pros", "/customers/itc-pros.png"],
  ["Masdar City", "/customers/masdar-city.svg"],
  ["NEXT", "/customers/next.png"],
  ["OneBonsai", "/customers/onebonsai.png"],
  ["Northstone", "/customers/northstone.png"],
  ["Stare", "/customers/stare.png"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="OneBonsai Gulf home">
          <img src={publicAsset("/brand/onebonsai-gulf-white.png")} alt="OneBonsai Gulf" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#academy">Academy</a>
          <a href="#work">Work</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <span>↗</span></a>
      </header>

      <ScrollJourney />

      <section className="hero">
        <div className="edge-label edge-label-left" aria-hidden="true">ONEBONSAI</div>
        <div className="edge-label edge-label-right" aria-hidden="true">GULF / AI</div>

        <div className="pathway-grid" aria-label="How OneBonsai Gulf creates value">
          {pathways.map((pathway) => (
            <article key={pathway.number}>
              <div className="pathway-top"><span>{pathway.number}</span><a href="#services" aria-label={`Explore ${pathway.title}`}>Go ↗</a></div>
              <h2>{pathway.title}</h2>
              <p>{pathway.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="manifesto section-pad">
        <div className="section-marker"><span>01</span><p>Our point of view</p><b>AI / PRACTICAL / VALUABLE</b></div>
        <div className="sculpture" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <span key={index} style={{ transform: `translate3d(${index * 7}px, ${index * 5}px, ${index * -8}px) rotate(${index * 4 - 16}deg)` }} />
          ))}
        </div>
        <h2>AI SHOULD SIMPLIFY THE BUSINESS YOU ALREADY HAVE, NOT FORCE YOU TO START AGAIN.</h2>
        <div className="manifesto-notes">
          <p>Your organization already has valuable systems, knowledge, processes, and people.</p>
          <p>We connect them to useful intelligence, securely, practically, and with a clear commercial purpose.</p>
        </div>
      </section>

      <section className="customer-marquee" aria-labelledby="customer-marquee-title">
        <div className="customer-marquee-heading">
          <p id="customer-marquee-title">Trusted by organizations building what comes next</p>
          <span>UAE / GLOBAL</span>
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
                    <img src={publicAsset(image)} alt={groupIndex === 0 ? name : ""} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="system-section section-pad">
        <div className="system-signals" aria-label="AI integration outcomes">
          <article><p>Systems connected</p><strong>01</strong><div><span style={{ width: "88%" }} /></div></article>
          <article><p>Workflows automated</p><strong>02</strong><div><span style={{ width: "74%" }} /></div></article>
          <article><p>People enabled</p><strong>03</strong><div><span style={{ width: "82%" }} /></div></article>
          <article className="signal-ring"><p>Value scaled</p><strong>04</strong><i /></article>
        </div>
        <div className="system-copy">
          <p className="micro-label">One intelligent operating layer</p>
          <h2>YOUR EVERY SYSTEM CAN WORK AS ONE BUSINESS.</h2>
          <p>From ERP and CRM to documents, operations, and institutional knowledge, we create the connections that make intelligence useful.</p>
          <a className="pill-button dark" href="#contact">Plan your AI integration</a>
        </div>
      </section>

      <section id="services" className="services section-pad">
        <div className="section-marker"><span>02</span><p>Services</p><b>STRATEGY / BUILD / ADOPT</b></div>
        <div className="services-heading">
          <h2>FROM FIRST<br />QUESTION TO<br />FULL-SCALE VALUE.</h2>
          <p>Strategy, engineering, adoption, and growth delivered as one integrated capability.</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <details key={service.number}>
              <summary>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <b>+</b>
              </summary>
              <div className="service-detail">
                {service.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="people-section section-pad">
        <div className="people-copy">
          <p className="micro-label">Regional intelligence · Human adoption</p>
          <h2>AI TRANSFORMATION IS A PEOPLE PROJECT.</h2>
          <p>We work beside leadership, technology teams, and operational experts to turn new capability into confident everyday practice.</p>
        </div>
        <figure>
          <img src={publicAsset("/media/uae-port-ai-v1.jpg")} alt="OneBonsai Gulf consultant with Emirati logistics leaders" />
          <figcaption>LOGISTICS / OPERATIONS</figcaption>
        </figure>
        <figure>
          <img src={publicAsset("/media/uae-ai-workshop-v1.jpg")} alt="OneBonsai Gulf consultant leading an AI workshop in the UAE" />
          <figcaption>PEOPLE / ADOPTION</figcaption>
        </figure>
      </section>

      <section className="infrastructure-section">
        <img src={publicAsset("/media/infrastructure-intelligence-v2.jpg")} alt="UAE engineers using AI and a drone to inspect bridge infrastructure" />
        <div className="infrastructure-copy">
          <p>Computer vision / UAE infrastructure</p>
          <h2>INFRASTRUCTURE INTELLIGENCE, AT SCALE.</h2>
          <span>INSPECT / DETECT / ACT</span>
        </div>
      </section>

      <section id="academy" className="academy section-pad">
        <div className="academy-mark" aria-hidden="true">AI<span>+</span></div>
        <div className="academy-copy">
          <p className="micro-label">OneBonsai Gulf AI Academy</p>
          <h2>BUILDING AI-READY ORGANIZATIONS.</h2>
          <p>Executive programs, department training, workforce upskilling, and technical learning designed for real organizational adoption.</p>
          <div className="academy-tags">
            {["AI for CEOs", "AI governance", "Copilot & Gemini", "Prompt engineering", "AI agents", "Responsible AI"].map((item) => <span key={item}>{item}</span>)}
          </div>
          <a className="pill-button lime" href="#contact">Bring the Academy to your team <span>↗</span></a>
        </div>
      </section>

      <section className="products section-pad">
        <div className="section-marker"><span>03</span><p>Our products</p><b>INNOVATION / BUILT IN-HOUSE</b></div>
        <div className="products-heading">
          <h2>INTELLIGENCE,<br />BUILT INTO<br />REAL LIFE.</h2>
        </div>
        <div className="product-grid">
          {products.map(([name, label, signal], index) => (
            <article key={name}>
              <div className="product-object" aria-hidden="true"><span>{name.slice(0, 1)}</span><i /><b /></div>
              <div><span>P-0{index + 1}</span><span>{signal}</span></div>
              <h3>{name}</h3>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-top"><span>Abu Dhabi, United Arab Emirates</span><span>Available for selected engagements</span></div>
        <p className="micro-label">Let’s build what comes next</p>
        <h2>READY TO MAKE<br />AI <em>VALUABLE?</em></h2>
        <a href="mailto:info@onebonsai.com?subject=AI%20Strategy%20Consultation">Book your AI strategy consultation <span>↗</span></a>
        <footer>
          <img src={publicAsset("/brand/onebonsai-gulf-white.png")} alt="OneBonsai Gulf" />
          <p>info@onebonsai.com<br />www.onebonsai.com</p>
          <p>© {new Date().getFullYear()} OneBonsai Gulf LLC</p>
        </footer>
      </section>
    </main>
  );
}
