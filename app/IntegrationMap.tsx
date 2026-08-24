import Image from "next/image";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const publicAsset = (path: string) => `${assetBase}${path}`;

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
        <Image
          src={publicAsset("/media/onebonsai-hero-poster-v2.jpg")}
          alt="A sculptural black and chrome technology tree representing connected business intelligence"
          fill
          sizes="(max-width: 760px) 100vw, 62vw"
          loading="lazy"
          unoptimized
        />
        <div className="integration-tree-glow" aria-hidden="true" />
        <span className="integration-tree-spark integration-tree-spark-one" aria-hidden="true" />
        <span className="integration-tree-spark integration-tree-spark-two" aria-hidden="true" />

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
