import { Buildings } from "@phosphor-icons/react/dist/ssr/Buildings";
import { CompassTool } from "@phosphor-icons/react/dist/ssr/CompassTool";
import { Cpu } from "@phosphor-icons/react/dist/ssr/Cpu";

const principles = [
  {
    title: "Local context",
    copy: "Delivery shaped around UAE teams, operations, regulation, and buying cycles.",
    icon: Buildings,
  },
  {
    title: "Proven engineering",
    copy: "AI, custom software, cybersecurity, simulation, and immersive technology in one delivery network.",
    icon: Cpu,
  },
  {
    title: "Ownership by design",
    copy: "Governance, training, and documentation that leave your team able to run what we build.",
    icon: CompassTool,
  },
] as const;

export default function AboutPrinciples() {
  return (
    <section className="about-page-principles section-pad" aria-labelledby="about-principles-title">
      <div className="about-principles-heading">
        <h2 id="about-principles-title">From a first use case to a system your team can run.</h2>
      </div>
      <div className="about-principle-list">
        {principles.map(({ title, copy, icon: Icon }) => (
          <article className="mechanical-reveal" key={title}>
            <span className="mechanical-icon" aria-hidden="true">
              <Icon size={34} weight="thin" />
            </span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
