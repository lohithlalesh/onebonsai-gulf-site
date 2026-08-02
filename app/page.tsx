"use client";

import { useEffect, useRef, type CSSProperties } from "react";

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

const flowStages = [
  {
    number: "01",
    eyebrow: "Connect",
    title: "Your systems enter the flow.",
    copy: "ERP, CRM, documents, operations, and human knowledge connect without replacing the tools your teams already trust.",
  },
  {
    number: "02",
    eyebrow: "Understand",
    title: "Signals become context.",
    copy: "One governed intelligence layer reads relationships across data, decisions, and day-to-day work.",
  },
  {
    number: "03",
    eyebrow: "Activate",
    title: "Context becomes action.",
    copy: "Purpose-built agents, predictions, and automations move the right intelligence into the right workflow.",
  },
  {
    number: "04",
    eyebrow: "Scale",
    title: "Value flows through the business.",
    copy: "People stay in control while proven outcomes expand securely across teams, operations, and infrastructure.",
  },
];

function IntelligenceFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const filmRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const film = filmRef.current;
    if (!section || !film) return;

    let animationFrame = 0;

    const syncFlow = () => {
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const phase = Math.min(flowStages.length - 1, Math.floor(progress * flowStages.length));

      section.style.setProperty("--flow-progress", progress.toFixed(4));
      section.style.setProperty("--flow-fill", `${(progress * 100).toFixed(2)}%`);
      section.style.setProperty("--flow-y", `${(6 + progress * 88).toFixed(2)}%`);
      section.style.setProperty("--flow-turn", `${(progress * 180).toFixed(2)}deg`);
      section.style.setProperty("--flow-ribbon-scale", (0.58 + progress * 0.42).toFixed(4));
      section.style.setProperty("--flow-ribbon-opacity", (0.28 + progress * 0.42).toFixed(4));
      section.dataset.phase = String(phase);

      if (film.readyState >= 1 && Number.isFinite(film.duration) && film.duration > 0) {
        const targetTime = progress * Math.max(film.duration - 0.08, 0);
        if (Math.abs(film.currentTime - targetTime) > 0.025) film.currentTime = targetTime;
      }
    };

    const queueSync = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(syncFlow);
    };

    film.pause();
    film.addEventListener("loadedmetadata", queueSync);
    window.addEventListener("scroll", queueSync, { passive: true });
    window.addEventListener("resize", queueSync);
    queueSync();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      film.removeEventListener("loadedmetadata", queueSync);
      window.removeEventListener("scroll", queueSync);
      window.removeEventListener("resize", queueSync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="intelligence-flow"
      data-phase="0"
      style={{
        "--flow-progress": "0",
        "--flow-fill": "0%",
        "--flow-y": "6%",
        "--flow-turn": "0deg",
        "--flow-ribbon-scale": "0.58",
        "--flow-ribbon-opacity": "0.28",
      } as CSSProperties}
      aria-label="How OneBonsai Gulf cultivates intelligence"
    >
      <div className="flow-sticky">
        <video
          ref={filmRef}
          className="flow-film"
          muted
          playsInline
          preload="auto"
          poster="/media/onebonsai-brand-film-poster.jpg"
          aria-label="Scroll-controlled OneBonsai Gulf intelligence film"
        >
          <source src="/media/onebonsai-brand-film-hq.mp4" type="video/mp4" />
        </video>
        <div className="flow-shade" />

        <div className="flow-header" aria-hidden="true">
          <span>ONEBONSAI GULF / INTELLIGENCE FLOW</span>
          <span>SCROLL TO CULTIVATE ↓</span>
        </div>

        <div className="flow-narrative">
          <p className="flow-kicker">Independent AI consultancy · Abu Dhabi</p>
          <h2>Intelligence,<br /><em>cultivated.</em></h2>
          <div className="flow-stage-copy" aria-live="polite">
            {flowStages.map((stage, index) => (
              <article key={stage.number} data-stage={index}>
                <span>{stage.number} / {stage.eyebrow}</span>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flow-visual" aria-hidden="true">
          <div className="flow-plane flow-plane-top" />
          <div className="flow-plane flow-plane-bottom" />
          <div className="flow-spine"><i /></div>
          <div className="flow-pulse"><span /></div>

          <div className="flow-node flow-node-source">
            <b>INPUT</b><span>ERP · CRM · DOCS · OPS</span><i>01</i>
          </div>
          <div className="flow-node flow-node-context">
            <b>CONTEXT</b><span>GOVERNED INTELLIGENCE</span><i>02</i>
          </div>
          <div className="flow-core"><span>AI</span><i /><i /><i /></div>
          <div className="flow-node flow-node-action">
            <b>ACTION</b><span>AGENTS · PREDICTION · AUTOMATION</span><i>03</i>
          </div>
          <div className="flow-node flow-node-value">
            <b>VALUE</b><span>PEOPLE · OPERATIONS · SCALE</span><i>04</i>
          </div>

          <div className="flow-ribbons">
            {Array.from({ length: 7 }, (_, index) => (
              <i
                key={index}
                style={{
                  "--ribbon-left": `${12 + index * 10}%`,
                  "--ribbon-depth": `${index * -16}px`,
                  "--ribbon-angle": `${(index - 3) * 4}deg`,
                } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="flow-progress" aria-hidden="true">
          {flowStages.map((stage, index) => <span key={stage.number} data-index={index}>{stage.number}</span>)}
          <i />
        </div>

        <div className="flow-footer" aria-hidden="true">
          <span>00:00</span><b /><span>00:15 / HQ</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="OneBonsai Gulf home">
          <img src="/brand/onebonsai-gulf-black.png" alt="OneBonsai Gulf" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#academy">Academy</a>
          <a href="#work">Work</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <span>↗</span></a>
      </header>

      <section id="top" className="hero">
        <div className="edge-label edge-label-left" aria-hidden="true">ONEBONSAI</div>
        <div className="edge-label edge-label-right" aria-hidden="true">GULF / AI</div>
        <div className="hero-veil" aria-hidden="true"><span /><span /><span /></div>

        <div className="hero-heading">
          <p className="micro-label">Built around the business you already have</p>
          <h1>YOUR BUSINESS<br />ALREADY WORKS.<br /><span>WE MAKE IT INTELLIGENT.</span></h1>
          <div className="hero-support">
            <p>We integrate AI into the systems, workflows, and teams your organization already trusts.</p>
            <a className="pill-button dark" href="#contact">Book a consultation <span>↗</span></a>
          </div>
        </div>

        <IntelligenceFlow />

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
        <h2>AI SHOULD SIMPLIFY THE BUSINESS YOU ALREADY HAVE—NOT FORCE YOU TO START AGAIN.</h2>
        <div className="manifesto-notes">
          <p>Your organization already has valuable systems, knowledge, processes, and people.</p>
          <p>We connect them to useful intelligence—securely, practically, and with a clear commercial purpose.</p>
        </div>
      </section>

      <section id="work" className="system-section section-pad">
        <div className="system-image">
          <img src="/media/uae-ai-boardroom-v1.jpg" alt="OneBonsai Gulf consultants working with Emirati business leaders in Abu Dhabi" />
          <span>UAE / ENTERPRISE TRANSFORMATION</span>
        </div>
        <div className="system-signals" aria-label="AI integration outcomes">
          <article><p>Systems connected</p><strong>01</strong><div><span style={{ width: "88%" }} /></div></article>
          <article><p>Workflows automated</p><strong>02</strong><div><span style={{ width: "74%" }} /></div></article>
          <article><p>People enabled</p><strong>03</strong><div><span style={{ width: "82%" }} /></div></article>
          <article className="signal-ring"><p>Value scaled</p><strong>04</strong><i /></article>
        </div>
        <div className="system-copy">
          <p className="micro-label">One intelligent operating layer</p>
          <h2>YOUR EVERY SYSTEM CAN WORK AS ONE BUSINESS.</h2>
          <p>From ERP and CRM to documents, operations, and institutional knowledge—we create the connections that make intelligence useful.</p>
          <a className="pill-button dark" href="#contact">Plan your AI integration <span>↗</span></a>
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
          <img src="/media/uae-port-ai-v1.jpg" alt="OneBonsai Gulf consultant with Emirati logistics leaders" />
          <figcaption>LOGISTICS / OPERATIONS</figcaption>
        </figure>
        <figure>
          <img src="/media/uae-ai-workshop-v1.jpg" alt="OneBonsai Gulf consultant leading an AI workshop in the UAE" />
          <figcaption>PEOPLE / ADOPTION</figcaption>
        </figure>
      </section>

      <section className="infrastructure-section">
        <img src="/media/infrastructure-intelligence-v2.jpg" alt="UAE engineers using AI and a drone to inspect bridge infrastructure" />
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
              <div><span>P—0{index + 1}</span><span>{signal}</span></div>
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
          <img src="/brand/onebonsai-gulf-white.png" alt="OneBonsai Gulf" />
          <p>info@onebonsai.com<br />www.onebonsai.com</p>
          <p>© {new Date().getFullYear()} OneBonsai Gulf LLC</p>
        </footer>
      </section>
    </main>
  );
}
