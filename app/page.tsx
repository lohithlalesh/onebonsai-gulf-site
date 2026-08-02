"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "AI Strategy & Transformation",
    description: "A practical route from AI ambition to enterprise-wide adoption.",
    items: [
      "AI Readiness Assessments",
      "AI Strategy & Roadmaps",
      "Executive AI Workshops",
      "AI Governance & Policies",
      "Process Automation",
      "AI Productivity",
      "Generative AI Integration",
      "Enterprise AI Adoption",
      "Digital Transformation Strategy",
      "Change Management",
      "AI Risk Assessment",
    ],
  },
  {
    number: "02",
    title: "Custom AI Solutions",
    description: "Intelligent systems designed around your data, teams, and operations.",
    items: [
      "AI Assistants & Agents",
      "Workflow Automation",
      "Document Intelligence",
      "Knowledge Management Systems",
      "Computer Vision",
      "Predictive Analytics",
      "Voice AI & Chatbots",
      "AI Search",
      "Recommendation Systems",
      "Industry-Specific AI Platforms",
      "Enterprise AI Integration",
    ],
  },
  {
    number: "03",
    title: "Digital Engineering",
    description: "Scalable digital products engineered to solve real business problems.",
    items: [
      "Corporate Websites",
      "Enterprise Applications",
      "SaaS Platforms",
      "Mobile Applications",
      "Customer Portals",
      "Internal Business Systems",
      "CRM Solutions",
      "ERP Integration",
      "Cloud Platforms",
      "API Development",
      "UI/UX Design",
      "System Architecture",
    ],
  },
  {
    number: "04",
    title: "Business Strategy & International Growth",
    description: "Commercial strategy and networks for ambitious international growth.",
    items: [
      "Business Strategy",
      "International Expansion",
      "Market Entry",
      "Go-to-Market Strategy",
      "Government Relations Support",
      "Partner Development",
      "Distributor Networks",
      "Investment Readiness",
      "Business Development",
      "Corporate Growth Strategy",
      "Commercial Advisory",
    ],
  },
  {
    number: "05",
    title: "Marketing & Brand Growth",
    description: "Positioning, campaigns, and growth systems for innovation-led brands.",
    items: [
      "Marketing Strategy",
      "Brand Positioning",
      "Corporate Identity",
      "Website Strategy",
      "Digital & Performance Marketing",
      "Social Media Management",
      "Content Creation",
      "Campaign Management",
      "Lead Generation",
      "Employer Branding",
      "Sales Enablement",
    ],
  },
];

const academyPrograms = [
  {
    title: "Executive Programs",
    items: [
      "AI for CEOs",
      "AI for Board Members",
      "AI Strategy for Executives",
      "AI Governance & Ethics",
      "Building an AI-First Organization",
      "Executive AI Decision Making",
    ],
  },
  {
    title: "Department Training",
    items: [
      "AI for Sales Teams",
      "AI for Marketing Teams",
      "AI for HR",
      "AI for Finance",
      "AI for Legal",
      "AI for Operations",
      "AI for Customer Service",
      "AI for Procurement",
      "AI for Project Management",
    ],
  },
  {
    title: "Workforce Upskilling",
    items: [
      "AI Fundamentals",
      "ChatGPT for Business",
      "Microsoft Copilot Training",
      "Google Gemini Training",
      "AI Productivity Tools",
      "Prompt Engineering",
      "Responsible AI Usage",
      "AI Security Awareness",
      "AI Collaboration Best Practices",
    ],
  },
  {
    title: "Technical Programs",
    items: [
      "Building AI Agents",
      "AI Automation",
      "Workflow Automation",
      "No-Code AI Development",
      "Custom GPT Development",
      "AI APIs & Integration",
      "Enterprise AI Deployment",
    ],
  },
];

const products = [
  {
    index: "P—01",
    name: "Tarteeb",
    label: "AI-powered home & lifestyle management",
    description:
      "One intelligent place for family, finance, property, staff, travel, vehicles, subscriptions, documents, and everyday administration.",
    signal: "LIFE / ADMIN / AI",
  },
  {
    index: "P—02",
    name: "Marengo",
    label: "The intelligent equestrian platform",
    description:
      "A connected ecosystem for breeders, owners, buyers, veterinarians, trainers, stables, competitions, and service providers.",
    signal: "EQUINE / DATA / GLOBAL",
  },
  {
    index: "P—03",
    name: "MedHub",
    label: "AI healthcare navigation",
    description:
      "Simpler healthcare discovery, appointments, insurance navigation, medical records, directories, and intelligent recommendations.",
    signal: "CARE / ACCESS / AI",
  },
];

const industries = [
  "Government",
  "Healthcare",
  "Defence & Security",
  "Energy & Utilities",
  "Construction",
  "Real Estate",
  "Manufacturing",
  "Education",
  "Retail",
  "Hospitality",
  "Logistics",
  "Financial Services",
  "Aviation",
  "Maritime",
  "Smart Cities",
  "Public Sector",
];

const approach = [
  ["01", "Discover", "Understand your business, objectives, challenges, and opportunities."],
  ["02", "Strategize", "Develop an AI and digital transformation roadmap."],
  ["03", "Design", "Shape user experiences, processes, and solution architecture."],
  ["04", "Build", "Engineer secure, scalable, and intelligent solutions."],
  ["05", "Implement", "Deploy with structured adoption and change management."],
  ["06", "Scale", "Continuously optimize, expand, and improve performance."],
];

const reasons = [
  "Independent AI Consultancy",
  "AI-First Thinking",
  "Vendor-Neutral Advice",
  "Executive-Level Strategic Expertise",
  "End-to-End Delivery",
  "Custom AI Engineering",
  "International Business Network",
  "Long-Term Partnership Approach",
  "Enterprise Security Focus",
  "Practical Business Outcomes",
  "Innovation-Driven Culture",
  "Global Perspective with Regional Expertise",
];

const heroFrames = Array.from(
  { length: 8 },
  (_, index) => `/media/hero-frames/frame-${String(index + 1).padStart(2, "0")}.jpg`,
);

const filmChapters = [
  {
    at: 0.18,
    label: "Your systems",
    accent: ".",
    copy: "Keep the platforms, data, and workflows your business already trusts.",
  },
  {
    at: 0.34,
    label: "Mapped",
    accent: ".",
    copy: "We find the friction, the opportunity, and the path to measurable value.",
  },
  {
    at: 0.5,
    label: "Connected",
    accent: ".",
    copy: "Your people, tools, and knowledge become one connected operating layer.",
  },
  {
    at: 0.66,
    label: "AI integrated",
    accent: ".",
    copy: "The right intelligence is engineered into the way your company already works.",
  },
  {
    at: 0.82,
    label: "Activated",
    accent: ".",
    copy: "Manual work gets lighter. Decisions get faster. Capability compounds.",
  },
  {
    at: 0.955,
    label: "Built to",
    accent: "scale.",
    copy: "One secure intelligence layer, ready to grow across the enterprise.",
    final: true,
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function ScrollFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    let lastProgress = -1;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const next = clamp(-rect.top / distance);

      if (Math.abs(next - lastProgress) > 0.001) {
        lastProgress = next;
        setProgress(next);
      }
    };

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const heroOpacity = clamp(1 - progress * 9);
  const framePosition = progress * (heroFrames.length - 1);
  const baseFrame = Math.min(heroFrames.length - 1, Math.floor(framePosition));
  const frameMix = framePosition - baseFrame;

  return (
    <section ref={sectionRef} className="film" aria-label="OneBonsai Gulf introduction">
      <div className="film-sticky">
        <div className="film-frames" aria-hidden="true">
          {heroFrames.map((frame, index) => {
            const visible = index === baseFrame ? 1 : index === baseFrame + 1 ? frameMix : 0;
            return (
              <img
                className="film-frame"
                key={frame}
                src={frame}
                alt=""
                fetchPriority={index === 0 ? "high" : "auto"}
                style={{
                  opacity: visible,
                  transform: `scale(${1.012 + progress * 0.014}) translate3d(${progress * -0.35}%, 0, 0)`,
                }}
              />
            );
          })}
        </div>
        <div className="hero-objects" aria-hidden="true">
          <span className="hero-orbit hero-orbit-one" style={{ transform: `rotateX(67deg) rotateZ(${progress * 210 - 18}deg)` }} />
          <span className="hero-orbit hero-orbit-two" style={{ transform: `rotateY(58deg) rotateZ(${progress * -160 + 30}deg)` }} />
          <span className="hero-glass-plane" style={{ transform: `rotateY(${progress * 48 - 24}deg) rotateX(${progress * 18 - 9}deg) translateZ(${progress * 90}px)` }} />
          <span className="hero-core" style={{ opacity: clamp((progress - 0.45) * 3), transform: `scale(${0.75 + progress * 0.35}) rotate(${progress * 135}deg)` }}>✦</span>
        </div>
        <div className="film-grade" />
        <div className="film-grain" />

        <header className="site-header">
          <a className="brand" href="#top" aria-label="OneBonsai Gulf home">
            <img src="/brand/onebonsai-gulf-white.png" alt="OneBonsai Gulf" />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#academy">Academy</a>
            <a href="#products">Products</a>
          </nav>
          <a className="header-cta" href="#contact">
            Start a conversation <span>↗</span>
          </a>
          <details className="mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile navigation">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#academy">Academy</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </header>

        <div
          id="top"
          className="hero-copy"
          style={{ opacity: heroOpacity, transform: `translate3d(0, ${progress * -70}px, 0)` }}
        >
          <p className="eyebrow"><span /> Independent AI consultancy · Abu Dhabi</p>
          <h1>
            Your business already works. We make it <em>intelligent.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              If your company was not built with AI, we integrate intelligence into the systems you already trust.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#contact">Book a consultation <span>↗</span></a>
              <a className="text-link" href="#services">Explore our services <span>↓</span></a>
            </div>
          </div>
        </div>

        {filmChapters.map((chapter, index) => {
          const intensity = clamp(1 - Math.abs(progress - chapter.at) / (chapter.final ? 0.075 : 0.092));
          return (
            <div
              className={`film-chapter${chapter.final ? " film-chapter-final" : ""}`}
              key={chapter.label}
              style={{
                opacity: intensity,
                transform: `translate3d(${(1 - intensity) * -26}px, 0, 0)`,
                pointerEvents: intensity > 0.4 ? "auto" : "none",
              }}
            >
              {chapter.final && (
                <img className="chapter-logo" src="/brand/onebonsai-gulf-white.png" alt="OneBonsai Gulf" />
              )}
              <div className="film-chapter-inner">
                <p className="chapter-count">{chapter.final ? "BRAND REVEAL" : `0${index + 1} / 05`}</p>
                <h2>{chapter.label}<span>{chapter.accent}</span></h2>
                <p>{chapter.copy}</p>
              </div>
            </div>
          );
        })}

        <div className="film-meta" aria-hidden="true">
          <span>24.4539° N</span>
          <span>54.3773° E</span>
        </div>
        <div className="scroll-meter" aria-hidden="true">
          <span style={{ width: `${Math.max(2, progress * 100)}%` }} />
        </div>
        <p className="scroll-label">Scroll to explore</p>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    let raf = 0;
    const updatePointer = (event: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
        raf = 0;
      });
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <main>
      <ScrollFilm />

      <section id="about" className="section about-section glow-surface">
        <div className="section-index">
          <p className="eyebrow dark"><span /> Who we are</p>
          <span>OBG / 01</span>
        </div>
        <div className="about-grid">
          <div>
            <h2 className="display-title">Your strategic<br />AI partner.</h2>
          </div>
          <div className="about-copy">
            <p className="lead">
              You do not need to replace the business you have built to become an AI-powered company.
            </p>
            <p>
              OneBonsai Gulf connects your current data, software, workflows, and teams to the right AI capabilities. We start with the business reality, then integrate intelligence where it can create measurable value.
            </p>
            <p>
              We do not simply deliver software. We build long-term partnerships that enable organizations to innovate, grow, and stay ahead of change—from Abu Dhabi to the GCC, Europe, and international markets.
            </p>
          </div>
        </div>
        <div className="mission-line">
          <p>Our mission is simple</p>
          <h3>Making AI practical, accessible, and <em>commercially valuable.</em></h3>
        </div>
      </section>

      <section id="integration" className="section integration-section">
        <div className="section-index light">
          <p className="eyebrow"><span /> AI integration</p>
          <span>OBG / 02</span>
        </div>
        <div className="integration-intro">
          <div>
            <p className="integration-kicker">Already running.<br /><span>Ready for intelligence.</span></p>
            <h2>AI, integrated into the business you already have.</h2>
          </div>
          <div className="integration-copy">
            <p>Your organization already has systems, knowledge, processes, and people. We connect them to useful AI—securely, practically, and without forcing you to start again.</p>
            <ul>
              <li><span>01</span>Connect ERP, CRM, documents, data, and knowledge</li>
              <li><span>02</span>Automate high-friction operational work</li>
              <li><span>03</span>Equip teams to use AI safely and confidently</li>
              <li><span>04</span>Scale what proves real commercial value</li>
            </ul>
          </div>
        </div>

        <figure className="integration-feature">
          <img src="/media/uae-ai-boardroom-v1.jpg" alt="OneBonsai Gulf consultants helping Emirati leaders plan AI integration in Abu Dhabi" />
          <figcaption>
            <span>UAE / ENTERPRISE TRANSFORMATION</span>
            <p>Strategy becomes useful when people can see how it changes the work.</p>
          </figcaption>
        </figure>

        <div className="human-proof-grid">
          <figure>
            <img src="/media/uae-port-ai-v1.jpg" alt="OneBonsai Gulf consultant working with Emirati logistics leaders at a UAE port" />
            <figcaption><span>LOGISTICS / OPERATIONS</span><p>Intelligence connected to live operational systems.</p></figcaption>
          </figure>
          <figure>
            <img src="/media/uae-ai-workshop-v1.jpg" alt="OneBonsai Gulf consultant leading an AI integration workshop with Emirati professionals" />
            <figcaption><span>PEOPLE / ADOPTION</span><p>AI capability that grows with the people using it.</p></figcaption>
          </figure>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="section-index light">
          <p className="eyebrow"><span /> Our services</p>
          <span>OBG / 03</span>
        </div>
        <div className="section-heading-row">
          <h2 className="display-title light-title">From first question<br />to full-scale impact.</h2>
          <p>Strategy, engineering, adoption, and growth—delivered as one integrated capability.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span>{service.number}</span>
                <span className="service-arrow">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <details>
                <summary>Explore capabilities <span>+</span></summary>
                <ul>
                  {service.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </details>
            </article>
          ))}
          <article className="service-card service-card-featured">
            <p className="eyebrow dark"><span /> Built for adoption</p>
            <h3>Technology alone does not create transformation. People do.</h3>
            <a href="#academy">Explore the AI Academy <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="work-showcase" aria-label="Selected technology capabilities">
        <article className="showcase-panel showcase-wide">
          <img src="/media/infrastructure-intelligence-v2.jpg" alt="UAE engineers using AI and a drone to inspect bridge infrastructure" />
          <div className="showcase-overlay">
            <p>Computer Vision</p>
            <h3>Infrastructure intelligence, at scale.</h3>
            <span>INSPECT / DETECT / ACT</span>
          </div>
        </article>
        <article className="showcase-panel">
          <img src="/media/portshield.avif" alt="AI-supported autonomous port security system" />
          <div className="showcase-overlay">
            <p>AI & Security</p>
            <h3>Faster decisions in complex environments.</h3>
            <span>SIMULATE / PREDICT / PROTECT</span>
          </div>
        </article>
        <article className="showcase-panel">
          <img src="/media/digital-platform.avif" alt="Enterprise software platform on two laptops" />
          <div className="showcase-overlay">
            <p>Digital Engineering</p>
            <h3>Products that turn operations into advantage.</h3>
            <span>DESIGN / BUILD / SCALE</span>
          </div>
        </article>
      </section>

      <section id="academy" className="section academy-section glow-surface">
        <div className="section-index">
          <p className="eyebrow dark"><span /> AI Academy</p>
          <span>OBG / 04</span>
        </div>
        <div className="academy-intro">
          <div>
            <p className="academy-number">AI<span>+</span></p>
            <h2 className="display-title">Building AI-ready organizations.</h2>
          </div>
          <div className="academy-copy">
            <p className="lead">Transformation moves at the speed of understanding.</p>
            <p>
              Our AI Academy equips executives, managers, and employees with the practical knowledge to adopt Artificial Intelligence confidently across every part of the organization.
            </p>
            <div className="format-tags" aria-label="Training delivery formats">
              {["Executive workshops", "Company bootcamps", "Team training", "Certification", "Online learning", "On-site programs"].map((format) => <span key={format}>{format}</span>)}
            </div>
          </div>
        </div>
        <div className="academy-list">
          {academyPrograms.map((program, index) => (
            <details key={program.title} open={index === 0}>
              <summary>
                <span>0{index + 1}</span>
                <h3>{program.title}</h3>
                <span className="academy-plus">+</span>
              </summary>
              <ul>
                {program.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="industries-section">
        <div className="industries-title">
          <p className="eyebrow"><span /> Industries</p>
          <h2>One intelligence.<br />Many realities.</h2>
        </div>
        <div className="marquee" aria-label={`Industries: ${industries.join(", ")}`}>
          <div className="marquee-track" aria-hidden="true">
            {[...industries, ...industries].map((industry, index) => (
              <span key={`${industry}-${index}`}>{industry}<b>✦</b></span>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="section products-section">
        <div className="section-index light">
          <p className="eyebrow"><span /> Our products</p>
          <span>OBG / 05</span>
        </div>
        <div className="section-heading-row">
          <h2 className="display-title light-title">Innovation,<br /><em>built in-house.</em></h2>
          <p>Intelligent platforms designed to solve specific, real-world challenges.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-visual" aria-hidden="true">
                <div className="product-orbit" />
                <span>{product.name.slice(0, 1)}</span>
              </div>
              <div className="product-meta">
                <span>{product.index}</span>
                <span>{product.signal}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="product-label">{product.label}</p>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
        <div className="startup-card">
          <div>
            <p className="eyebrow dark"><span /> Startup Hub</p>
            <h3>We don’t simply advise startups. <em>We help build them.</em></h3>
          </div>
          <div>
            <p>Strategic guidance, AI expertise, product design, technology development, investment readiness, and international market access.</p>
            <div className="startup-list"><span>Reqilo</span><span>FitHub</span><span>Vyonix</span></div>
          </div>
        </div>
      </section>

      <section id="approach" className="section approach-section">
        <div className="section-index">
          <p className="eyebrow dark"><span /> Our approach</p>
          <span>OBG / 06</span>
        </div>
        <h2 className="display-title">A proven framework<br />for innovation.</h2>
        <div className="approach-grid">
          {approach.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div className="approach-dot" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reasons-section">
        <div className="reasons-intro">
          <p className="eyebrow"><span /> Why OneBonsai Gulf</p>
          <h2>Global perspective.<br />Regional intelligence.</h2>
          <p>
            Independent, vendor-neutral, and focused on practical outcomes—from boardroom strategy to secure implementation.
          </p>
        </div>
        <ol className="reason-list">
          {reasons.map((reason, index) => (
            <li key={reason}><span>{String(index + 1).padStart(2, "0")}</span>{reason}</li>
          ))}
        </ol>
      </section>

      <section className="section vision-section">
        <div className="vision-card vision-card-main">
          <p className="eyebrow dark"><span /> About us</p>
          <h2>We believe AI should simplify business—not complicate it.</h2>
          <p>
            Headquartered in Abu Dhabi, OneBonsai Gulf combines strategy, AI engineering, software development, and business advisory to transform ideas into measurable commercial success.
          </p>
          <blockquote>Technology should always create meaningful business value.</blockquote>
        </div>
        <div className="vision-card">
          <span>V / 01</span>
          <h3>Our vision</h3>
          <p>To become the Middle East’s leading independent AI consultancy and innovation company, empowering organizations to build the next generation of intelligent businesses.</p>
        </div>
        <div className="vision-card">
          <span>M / 02</span>
          <h3>Our mission</h3>
          <p>To simplify AI and enable sustainable growth by combining strategic consulting, advanced technology, digital engineering, and world-class execution.</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-topline">
          <span>Abu Dhabi, United Arab Emirates</span>
          <span>Available for selected engagements</span>
        </div>
        <p className="eyebrow dark"><span /> Let’s build the future together</p>
        <h2>Ready to make AI<br /><em>valuable?</em></h2>
        <a className="contact-button" href="mailto:info@onebonsai.com?subject=AI%20Strategy%20Consultation">
          <span>Book your AI strategy consultation</span><b>↗</b>
        </a>
        <div className="contact-footer">
          <img src="/brand/onebonsai-gulf-black.png" alt="OneBonsai Gulf" />
          <div>
            <a href="mailto:info@onebonsai.com">info@onebonsai.com</a>
            <a href="https://www.onebonsai.com">www.onebonsai.com</a>
          </div>
          <p>© {new Date().getFullYear()} OneBonsai Gulf LLC</p>
        </div>
      </section>
    </main>
  );
}
