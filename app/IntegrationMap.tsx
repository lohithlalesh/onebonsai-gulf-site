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
    <div className="integration-map" aria-label="How OneBonsai Gulf connects business systems to useful software, AI, and growth">
      <div className="integration-map-grid" aria-hidden="true" />
      <div className="integration-flow-line" aria-hidden="true"><i /><i /><i /></div>

      <div className="integration-column integration-inputs">
        <p>What you already run</p>
        <ul>
          {systemInputs.map((input, index) => (
            <li key={input} style={{ "--node-index": index } as CSSProperties}>
              <span aria-hidden="true" />
              {input}
            </li>
          ))}
        </ul>
      </div>

      <div className="integration-core">
        <span>OneBonsai Gulf</span>
        <strong>AI + software layer</strong>
        <small>Secure. Useful. Measurable.</small>
      </div>

      <div className="integration-column integration-outputs">
        <p>What moves the product forward</p>
        <ul>
          {growthOutputs.map((output, index) => (
            <li key={output} style={{ "--node-index": index } as CSSProperties}>
              <span aria-hidden="true" />
              {output}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import type { CSSProperties } from "react";
