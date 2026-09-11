export type Industry = {
  name: string;
  summary: string;
  opportunities: string[];
};

export const industries: Industry[] = [
  {
    name: "Government & Smart Cities",
    summary: "Design citizen and employee services that connect trusted data, multilingual assistance, approvals, and accountable automation.",
    opportunities: ["Service orchestration", "Knowledge assistants", "Demand forecasting", "Responsible AI governance"],
  },
  {
    name: "Defence, Aerospace & Security",
    summary: "Support mission preparation, training, maintenance, situational analysis, and secure knowledge access within defined authority boundaries.",
    opportunities: ["Immersive simulation", "Maintenance intelligence", "Secure copilots", "Computer vision"],
  },
  {
    name: "Banking, Financial Services & Insurance",
    summary: "Improve regulated workflows while keeping evidence, review, privacy, and accountability visible to operators and risk owners.",
    opportunities: ["Document intelligence", "Fraud and risk support", "Service copilots", "Compliance workflows"],
  },
  {
    name: "Healthcare & Life Sciences",
    summary: "Help clinical, administrative, and research teams find information, coordinate work, train safely, and keep consequential decisions with qualified people.",
    opportunities: ["Clinical knowledge retrieval", "Patient navigation", "Workforce simulation", "Operational analytics"],
  },
  {
    name: "Aviation & Transportation",
    summary: "Connect operational signals across planning, assets, service, and safety workflows so teams can respond with better context.",
    opportunities: ["Predictive maintenance", "Disruption response", "Safety simulation", "Passenger service"],
  },
  {
    name: "Real Estate, Construction & Infrastructure",
    summary: "Turn project, asset, inspection, and tenant data into practical tools for delivery, maintenance, safety, and service operations.",
    opportunities: ["Visual inspection", "Project intelligence", "Digital twins", "Property operations"],
  },
  {
    name: "Tourism, Hospitality & Entertainment",
    summary: "Coordinate multilingual guest service, workforce knowledge, demand signals, and personalized experiences without losing operational control.",
    opportunities: ["Guest assistance", "Demand planning", "Workforce copilots", "Experience personalization"],
  },
  {
    name: "Energy, Utilities & Industrial",
    summary: "Support asset-intensive operations with inspection, maintenance, field knowledge, safety training, and controlled automation.",
    opportunities: ["Asset inspection", "Maintenance copilots", "Safety simulation", "Operations optimization"],
  },
  {
    name: "Retail & Consumer",
    summary: "Connect product, inventory, customer, and campaign signals to improve discovery, service, planning, and execution.",
    opportunities: ["Product intelligence", "Service assistants", "Demand forecasting", "Marketing systems"],
  },
  {
    name: "Education & Workforce Development",
    summary: "Build practical AI capability, adaptive learning support, and immersive training around the needs of learners, educators, and employers.",
    opportunities: ["Corporate AI training", "Learning assistants", "Skills analytics", "Immersive practice"],
  },
  {
    name: "Ecology & Sustainability",
    summary: "Use environmental, operational, and geospatial data to improve monitoring, resource decisions, reporting, and climate resilience.",
    opportunities: ["Environmental monitoring", "Energy optimization", "Geospatial analysis", "Sustainability reporting"],
  },
];
