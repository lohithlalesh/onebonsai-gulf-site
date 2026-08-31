import ClarityJourney from "./ClarityJourney";
import CustomerMarquee from "./CustomerMarquee";
import EditorialLoop from "./EditorialLoop";
import IntegrationMap from "./IntegrationMap";
import ScrollJourney from "./ScrollJourney";
import ScrollReveal from "./ScrollReveal";
import SiteContact from "./SiteContact";
import SiteHeader from "./SiteHeader";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

const services = [
  {
    title: "VR Training & Simulation",
    copy: "Practise high-risk or complex work without interrupting live operations.",
    items: ["Safety training", "Digital twins", "Virtual humans", "Learning analytics"],
  },
  {
    title: "Cybersecurity & Secure AI",
    copy: "Design the controls, architecture, and training required for secure deployment.",
    items: ["Secure AI deployment", "Cyber training", "Risk governance", "Operational safeguards"],
  },
  {
    title: "AI Academy & Adoption",
    copy: "Train leaders and teams on the tools and decisions they face at work.",
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

      <SiteHeader />
      <ScrollReveal />

      <main id="main-content">
        <ScrollJourney />
        <CustomerMarquee />

        <ClarityJourney />

        <section id="work" className="system-section section-pad" aria-labelledby="system-title">
          <div className="system-heading">
            <div className="system-copy">
              <p className="section-kicker">What we build</p>
              <h2 id="system-title">Add the capability your business needs next.</h2>
            </div>
            <div className="system-summary">
              <p>Keep the systems that work. Add AI integration, custom software, search visibility, or marketing automation where it creates measurable value.</p>
              <a className="primary-button" href="#contact">Plan AI integration</a>
            </div>
          </div>
          <IntegrationMap />
        </section>

        <section id="services" className="services section-pad" aria-labelledby="services-title">
          <div className="services-heading">
            <div>
              <p className="section-kicker">Specialist services</p>
              <h2 id="services-title">Train teams and secure every deployment.</h2>
            </div>
            <p>Extend the core system with immersive simulation, cybersecurity, and practical AI training for each role.</p>
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

        <section className="infrastructure-section" aria-labelledby="infrastructure-title">
          <EditorialLoop
            source={publicAsset("/media/infrastructure-inspection-higgsfield-web-v1.mp4")}
            poster={publicAsset("/media/infrastructure-intelligence-v2.jpg")}
          />
          <div className="infrastructure-copy">
            <p>Computer vision for infrastructure</p>
            <h2 id="infrastructure-title">Inspect assets without closing them down.</h2>
            <span>Capture. Review. Repair.</span>
          </div>
        </section>

        <section id="academy" className="academy section-pad" aria-labelledby="academy-title">
          <div className="academy-mark" aria-hidden="true">AI<span>+</span></div>
          <div className="academy-copy">
            <p className="section-kicker">AI Academy</p>
            <h2 id="academy-title">Train every role to use AI at work.</h2>
            <p>Practical programs for executives, departments, and technical teams, built around the tools and decisions they handle every day.</p>
            <ul className="academy-programs">
              {programs.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a className="primary-button" href="#contact">Bring the Academy to your team</a>
          </div>
        </section>

        <section className="products section-pad" aria-labelledby="products-title">
          <div className="products-heading">
            <p className="section-kicker">Products built in-house</p>
            <h2 id="products-title">Products we build and run.</h2>
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

        <SiteContact />
      </main>
    </>
  );
}
