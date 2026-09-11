type DiagramProps = { className?: string };

function ExpertsDesktopDiagram({ className = "" }: DiagramProps) {
  const steps = ["Define", "Match", "Deploy", "Operate", "Scale"];

  return (
    <svg className={`service-diagram-svg service-diagram-desktop ${className}`} viewBox="0 0 760 260" role="img" aria-labelledby="experts-flow-title" focusable="false">
      <title id="experts-flow-title">Five-step expert delivery flow from defining the capability gap to scaling capacity up or down</title>
      <g aria-hidden="true">
        <path className="diagram-route" d="M78 118H680" />
        {steps.map((step, index) => {
          const x = 78 + index * 150.5;
          return (
            <g key={step}>
              <circle className="diagram-node" cx={x} cy="118" r="36" />
              <text className="diagram-index" x={x} y="71" textAnchor="middle">0{index + 1}</text>
              <text className="diagram-label" x={x} y="123" textAnchor="middle">{step}</text>
            </g>
          );
        })}
        <path className="diagram-accent-route" d="M636 200H724M636 200l14-10M636 200l14 10M724 200l-14-10M724 200l-14 10" />
        <text className="diagram-note" x="680" y="229" textAnchor="middle">capacity up or down</text>
      </g>
    </svg>
  );
}

function ExpertsMobileDiagram({ className = "" }: DiagramProps) {
  const steps = ["Define", "Match", "Deploy", "Operate", "Scale"];

  return (
    <svg className={`service-diagram-svg service-diagram-mobile ${className}`} viewBox="0 0 360 570" role="img" aria-labelledby="experts-flow-mobile-title" focusable="false">
      <title id="experts-flow-mobile-title">Five-step expert delivery flow from defining the capability gap to scaling capacity up or down</title>
      <g aria-hidden="true">
        <path className="diagram-route" d="M72 58V474" />
        {steps.map((step, index) => {
          const y = 58 + index * 104;
          return (
            <g key={step}>
              <circle className="diagram-node" cx="72" cy={y} r="30" />
              <text className="diagram-index" x="22" y={y + 4}>0{index + 1}</text>
              <text className="diagram-label" x="122" y={y + 5}>{step}</text>
            </g>
          );
        })}
        <path className="diagram-accent-route" d="M122 526H310M122 526l14-10M122 526l14 10M310 526l-14-10M310 526l-14 10" />
        <text className="diagram-note" x="216" y="554" textAnchor="middle">capacity up or down</text>
      </g>
    </svg>
  );
}

function ExpertsDiagram() {
  return (
    <div className="service-diagram" data-diagram="experts">
      <ExpertsDesktopDiagram />
      <ExpertsMobileDiagram />
    </div>
  );
}

function DigitalTwinDiagram() {
  return (
    <div className="service-diagram" data-diagram="digital-twin">
      <svg className="service-diagram-svg" viewBox="0 0 760 400" role="img" aria-labelledby="digital-twin-title" focusable="false">
        <title id="digital-twin-title">A physical asset sends sensor data to a virtual replica, which returns tested operational changes</title>
        <g aria-hidden="true">
          <rect className="diagram-panel" x="40" y="92" width="250" height="216" rx="8" />
          <rect className="diagram-panel diagram-panel-accent" x="470" y="92" width="250" height="216" rx="8" />
          <path className="diagram-asset" d="M108 246v-72l38-30 38 30v72M184 190h34v56M126 196h40M126 218h40" />
          <circle className="diagram-asset" cx="164" cy="126" r="10" />
          <path className="diagram-asset" d="M548 242l22-72 24 38 24-64 34 98M535 242h132" />
          <circle className="diagram-asset" cx="644" cy="122" r="8" />
          <text className="diagram-label diagram-label-large" x="165" y="282" textAnchor="middle">Physical asset</text>
          <text className="diagram-label diagram-label-large" x="595" y="282" textAnchor="middle">Virtual replica</text>
          <path className="diagram-accent-route" d="M302 150H458M458 150l-14-10M458 150l-14 10" />
          <text className="diagram-note" x="380" y="132" textAnchor="middle">sensor data</text>
          <path className="diagram-route" d="M458 250H302M302 250l14-10M302 250l14 10" />
          <text className="diagram-note" x="380" y="278" textAnchor="middle">tested changes</text>
        </g>
      </svg>
    </div>
  );
}

function MarketEntryDiagram() {
  return (
    <div className="service-diagram" data-diagram="market-entry">
      <svg className="service-diagram-svg" viewBox="0 0 760 430" role="img" aria-labelledby="market-entry-title" focusable="false">
        <title id="market-entry-title">Two market-entry paths meet at an Abu Dhabi gateway through Masdar City Free Zone</title>
        <g aria-hidden="true">
          <path className="diagram-route" d="M84 112C216 112 238 214 344 214M676 112C544 112 522 214 416 214" />
          <path className="diagram-route" d="M344 214l-16-8M344 214l-10-16M416 214l16-8M416 214l10-16" />
          <circle className="diagram-node diagram-node-large" cx="380" cy="214" r="72" />
          <circle className="diagram-node-dot" cx="84" cy="112" r="10" />
          <circle className="diagram-node-dot" cx="676" cy="112" r="10" />
          <text className="diagram-label diagram-label-large" x="84" y="78" textAnchor="middle">Into the GCC</text>
          <text className="diagram-label diagram-label-large" x="676" y="78" textAnchor="middle">Out to the world</text>
          <text className="diagram-label diagram-label-large" x="380" y="207" textAnchor="middle">Abu Dhabi</text>
          <text className="diagram-note" x="380" y="235" textAnchor="middle">gateway</text>
          <path className="diagram-accent-route" d="M380 286v48" />
          <rect className="diagram-panel diagram-panel-accent" x="268" y="334" width="224" height="54" rx="27" />
          <text className="diagram-label" x="380" y="367" textAnchor="middle">Masdar City Free Zone</text>
        </g>
      </svg>
    </div>
  );
}

function VrModulesDiagram() {
  const modules = [
    { label: "Fire", mark: "F" },
    { label: "First Aid", mark: "+" },
    { label: "Hazard", mark: "!" },
    { label: "Cybersecurity", mark: "C" },
  ];

  return (
    <div className="service-diagram" data-diagram="vr-modules">
      <svg className="service-diagram-svg" viewBox="0 0 760 470" role="img" aria-labelledby="vr-modules-title" focusable="false">
        <title id="vr-modules-title">Four ready-made VR modules for fire response, first aid, hazard spotting, and cybersecurity, each with an AI avatar</title>
        <g aria-hidden="true">
          {modules.map((module, index) => {
            const x = index % 2 === 0 ? 40 : 400;
            const y = index < 2 ? 34 : 246;
            return (
              <g key={module.label}>
                <rect className="diagram-panel" x={x} y={y} width="320" height="188" rx="8" />
                <circle className="diagram-node" cx={x + 52} cy={y + 52} r="28" />
                <text className="diagram-glyph" x={x + 52} y={y + 60} textAnchor="middle">{module.mark}</text>
                <text className="diagram-label diagram-label-large" x={x + 28} y={y + 116}>{module.label}</text>
                <path className="diagram-accent-route" d={`M${x + 28} ${y + 145}h18`} />
                <text className="diagram-note" x={x + 56} y={y + 150}>AI avatar included</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default function ServiceDiagram({ slug }: { slug: string }) {
  if (slug === "ai-experts-on-demand") return <ExpertsDiagram />;
  if (slug === "digital-twins-simulation") return <DigitalTwinDiagram />;
  if (slug === "uae-market-entry") return <MarketEntryDiagram />;
  if (slug === "vr-training-simulation") return <VrModulesDiagram />;
  return null;
}
