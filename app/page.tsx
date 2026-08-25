import Image from "next/image";
import AboutSection from "./AboutSection";
import CapabilityMotion from "./CapabilityMotion";
import CustomerMarquee from "./CustomerMarquee";
import EditorialLoop from "./EditorialLoop";
import IntegrationMap from "./IntegrationMap";
import ScrollJourney from "./ScrollJourney";
import TeamSection from "./TeamSection";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

type Pathway = {
  title: string;
  copy: string;
  signal: string;
  media:
    | { type: "video"; video: string; poster: string }
    | { type: "motion"; kind: "activate" | "scale" };
};

const pathways: Pathway[] = [
  {
    title: "Connect your existing systems",
    copy: "Bring your ERP, CRM, documents, data, and workflows into one secure AI layer.",
    signal: "01 / Connect",
    media: {
      type: "video",
      video: "/media/editorial-connect-systems-higgs-v2.mp4",
      poster: "/media/editorial-connect-systems-higgs-v2-poster.jpg",
    },
  },
  {
    title: "Build useful AI solutions",
    copy: "Use AI agents, search, predictions, and automation to solve real work problems.",
    signal: "02 / Activate",
    media: { type: "motion", kind: "activate" },
  },
  {
    title: "Scale AI with control",
    copy: "Train your teams, set clear governance, and expand what works across the business.",
    signal: "03 / Scale",
    media: { type: "motion", kind: "scale" },
  },
];

const services = [
  {
    title: "Enterprise AI & Integration",
    copy: "Move from AI strategy to secure production systems connected to your data and daily operations.",
    items: ["AI roadmaps", "Vision and language AI", "Digital assistants", "Knowledge systems"],
  },
  {
    title: "VR Training & Simulation",
    copy: "Build immersive training and digital twins for safety, healthcare, defense, and industry.",
    items: ["VR safety training", "Digital twins", "Virtual humans", "Learning analytics"],
  },
  {
    title: "Custom Software & Automation",
    copy: "Create connected software, internal platforms, and automation around the way your business works.",
    items: ["Custom platforms", "ERP and CRM integration", "Workflow automation", "Data products"],
  },
  {
    title: "AI Marketing & Growth",
    copy: "Use AI to improve marketing operations, customer intelligence, content, and personalization.",
    items: ["Marketing automation", "Content systems", "Customer intelligence", "Personalization"],
  },
  {
    title: "Cybersecurity & Secure AI",
    copy: "Protect systems and prepare people with secure architecture, governance, and practical cyber training.",
    items: ["Secure AI deployment", "Cybersecurity training", "Risk governance", "Operational safeguards"],
  },
  {
    title: "AI Academy & Adoption",
    copy: "Give leaders and teams the practical skills to use AI safely, confidently, and consistently.",
    items: ["Executive programs", "Team training", "Workforce upskilling", "Responsible AI"],
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
          <a href="#team">Team</a>
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
            <h2 id="pathways-title">Connect AI to your business. Make it useful. Scale it safely.</h2>
            <p>We help UAE companies move from AI strategy to working solutions without replacing the systems they already trust.</p>
          </div>

          <div className="pathway-grid">
            {pathways.map((pathway, index) => (
              <article className={index === 0 ? "pathway-feature" : undefined} key={pathway.title}>
                <div className="pathway-media">
                  {pathway.media.type === "video" ? (
                    <EditorialLoop
                      source={publicAsset(pathway.media.video)}
                      poster={publicAsset(pathway.media.poster)}
                    />
                  ) : (
                    <CapabilityMotion kind={pathway.media.kind} />
                  )}
                </div>
                <div className="pathway-content">
                  <span>{pathway.signal}</span>
                  <h3>{pathway.title}</h3>
                  <p>{pathway.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <AboutSection />

        <section id="work" className="system-section section-pad" aria-labelledby="system-title">
          <div className="system-heading">
            <div className="system-copy">
              <p className="section-kicker">Connected systems, measurable growth</p>
              <h2 id="system-title">Connect your systems. Put your data to work.</h2>
            </div>
            <div className="system-summary">
              <p>We map what you already use, build the software that is missing, integrate AI securely, and improve how customers discover your product through SEO, AEO, and smarter marketing.</p>
              <a className="primary-button" href="#contact">Plan AI integration</a>
            </div>
          </div>
          <IntegrationMap />
        </section>

        <section id="services" className="services section-pad" aria-labelledby="services-title">
          <div className="services-heading">
            <div>
              <p className="section-kicker">Services</p>
              <h2 id="services-title">Deep tech, software, growth, and security in one team.</h2>
            </div>
            <p>One regional partner for production AI, immersive training, custom software, AI marketing, cybersecurity, and team adoption.</p>
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
            <p className="section-kicker">AI adoption across UAE teams</p>
            <h2 id="people-title">AI works when people know how to use it.</h2>
            <p>We work with leaders, technology teams, and operational experts to make AI part of everyday work.</p>
          </div>
          <div className="people-rail">
          <figure className="people-still people-boardroom">
            <Image
              src={publicAsset("/media/uae-ai-boardroom-v1.jpg")}
              alt="UAE leaders and OneBonsai Gulf consultants reviewing an AI system together"
              width={1672}
              height={941}
              loading="lazy"
              unoptimized
            />
            <figcaption>Leaders shaping the AI roadmap together</figcaption>
          </figure>
          <figure className="people-logistics">
            <EditorialLoop
              source={publicAsset("/media/editorial-people-logistics-higgs-v2.mp4")}
              poster={publicAsset("/media/editorial-people-logistics-higgs-v2-poster.jpg")}
            />
            <figcaption>Operational teams learning in the workflow</figcaption>
          </figure>
          <figure className="people-still people-port">
            <Image
              src={publicAsset("/media/uae-port-ai-v1.jpg")}
              alt="A UAE port operations team studying live infrastructure data with an AI consultant"
              width={1672}
              height={941}
              loading="lazy"
              unoptimized
            />
            <figcaption>AI decisions grounded in operational context</figcaption>
          </figure>
          <figure className="people-healthcare">
            <EditorialLoop
              source={publicAsset("/media/editorial-people-healthcare-higgs-v2.mp4")}
              poster={publicAsset("/media/editorial-people-healthcare-higgs-v2-poster.jpg")}
            />
            <figcaption>Guided adoption in real workflows</figcaption>
          </figure>
          </div>
        </section>

        <TeamSection />

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
            <h2 id="infrastructure-title">AI-powered infrastructure inspection at scale.</h2>
            <span>Inspect. Detect. Act.</span>
          </div>
        </section>

        <section id="academy" className="academy section-pad" aria-labelledby="academy-title">
          <div className="academy-mark" aria-hidden="true">AI<span>+</span></div>
          <div className="academy-copy">
            <p className="section-kicker">AI training for UAE teams</p>
            <h2 id="academy-title">Practical AI training for every level.</h2>
            <p>Clear programs for executives, departments, technical teams, and employees who need to use AI at work.</p>
            <ul className="academy-programs">
              {programs.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a className="primary-button" href="#contact">Bring the Academy to your team</a>
          </div>
        </section>

        <section className="products section-pad" aria-labelledby="products-title">
          <div className="products-heading">
            <p className="section-kicker">Products built in-house</p>
            <h2 id="products-title">AI products built for everyday work.</h2>
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
          <h2 id="contact-title">Ready to use AI in your <em>business?</em></h2>
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
