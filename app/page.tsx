import Image from "next/image";
import CustomerMarquee from "./CustomerMarquee";
import EditorialLoop from "./EditorialLoop";
import ScrollJourney from "./ScrollJourney";
import TeamSection from "./TeamSection";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const pathways = [
  {
    title: "Connect your existing systems",
    copy: "Bring your ERP, CRM, documents, data, and workflows into one secure AI layer.",
    video: "/media/editorial-connect-higgs-v1.mp4",
    poster: "/media/editorial-connect-higgs-v1-poster.jpg",
  },
  {
    title: "Build useful AI solutions",
    copy: "Use AI agents, search, predictions, and automation to solve real work problems.",
    video: "/media/editorial-intelligence-higgs-v1.mp4",
    poster: "/media/editorial-intelligence-higgs-v1-poster.jpg",
  },
  {
    title: "Scale AI with control",
    copy: "Train your teams, set clear governance, and expand what works across the business.",
    video: "/media/editorial-scale-higgs-v1.mp4",
    poster: "/media/editorial-scale-higgs-v1-poster.jpg",
  },
];

const outcomes = [
  {
    title: "Connected systems",
    copy: "Your business tools and data work together in one secure AI layer.",
  },
  {
    title: "AI automation",
    copy: "AI agents handle repetitive work and support faster decisions.",
  },
  {
    title: "Team adoption",
    copy: "People understand the tools and stay in control of how they are used.",
  },
  {
    title: "Business value",
    copy: "The best solutions scale with clear goals, ownership, and results.",
  },
];

const services = [
  {
    title: "AI Consulting & Strategy",
    copy: "Find the right AI opportunities, build a clear roadmap, and set practical governance.",
    items: ["AI readiness", "Executive roadmaps", "Governance", "Enterprise adoption"],
  },
  {
    title: "AI Integration & Automation",
    copy: "Connect AI to your existing software, data, documents, and business workflows.",
    items: ["ERP and CRM integration", "Workflow automation", "AI agents", "Enterprise search"],
  },
  {
    title: "Custom AI Solutions",
    copy: "Build secure AI software around the way your teams and customers already work.",
    items: ["Custom AI apps", "Document AI", "Computer vision", "Predictive analytics"],
  },
  {
    title: "AI Training & Academy",
    copy: "Give leaders and teams the practical skills to use AI safely and confidently.",
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
                  <EditorialLoop
                    source={publicAsset(pathway.video)}
                    poster={publicAsset(pathway.poster)}
                  />
                </div>
                <div className="pathway-content">
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
            <h2 id="manifesto-title">AI should improve how your business works.</h2>
          </div>
          <div className="manifesto-proof">
            <p>Your company already has valuable systems, data, processes, and people.</p>
            <p>We connect them with practical AI that solves a clear problem and supports your team.</p>
          </div>
        </section>

        <section id="work" className="system-section section-pad" aria-labelledby="system-title">
          <div className="system-copy">
            <p className="section-kicker">Connected business systems</p>
            <h2 id="system-title">Connect your systems. Put your data to work.</h2>
            <p>We integrate AI with your ERP, CRM, documents, operations, and internal knowledge so teams can act faster.</p>
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
              <h2 id="services-title">AI consulting, development, and training in one team.</h2>
            </div>
            <p>One partner for AI strategy, system integration, custom solutions, governance, and team adoption.</p>
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
          <figure>
            <EditorialLoop
              source={publicAsset("/media/editorial-people-team-higgs-v1.mp4")}
              poster={publicAsset("/media/editorial-people-team-higgs-v1-poster.jpg")}
            />
            <figcaption>Teams learning together</figcaption>
          </figure>
          <figure>
            <EditorialLoop
              source={publicAsset("/media/editorial-people-adoption-higgs-v1.mp4")}
              poster={publicAsset("/media/editorial-people-adoption-higgs-v1-poster.jpg")}
            />
            <figcaption>Practical adoption at work</figcaption>
          </figure>
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
