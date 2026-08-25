import GrowthTreeMotion from "./GrowthTreeMotion";

const systemInputs = ["ERP + CRM", "Documents", "Operations", "Customer data"] as const;

const growthOutputs = [
  "AI integration",
  "Custom software",
  "Consulting",
  "SEO + AEO",
  "Marketing growth",
] as const;

export default function IntegrationMap() {
  return (
    <div className="integration-map" aria-label="How OneBonsai Gulf grows useful AI capabilities from the systems a business already runs">
      <div className="integration-process">
        <p className="integration-process-label">Feed the roots</p>
        <h3>Your systems become one governed intelligence layer.</h3>

        <ul className="integration-root-nodes">
          {systemInputs.map((input) => (
            <li key={input}><span aria-hidden="true" />{input}</li>
          ))}
        </ul>

        <div className="integration-trunk" aria-hidden="true"><i /><i /><i /></div>

        <div className="integration-core">
          <span>OneBonsai Gulf</span>
          <strong>AI + software layer</strong>
          <small>Secure. Useful. Measurable.</small>
        </div>
      </div>

      <div className="integration-tree-scene">
        <GrowthTreeMotion />

        <div className="integration-canopy">
          <p>Capabilities branch into measurable growth</p>
          <ul>
            {growthOutputs.map((output) => <li key={output}>{output}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
