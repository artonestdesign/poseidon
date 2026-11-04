export type SystemCard = {
  id: string;
  meta: string;
  title: string;
  description: string;
  tags: string[];
  visual: "memory" | "agents" | "modalities" | "graph" | "predict";
  spanClass: string;
};

export const systems: SystemCard[] = [
  {
    id: "SYS.01",
    meta: "Δ user state",
    title: "Personal Intelligence Model",
    description:
      "A continuously updated user-state representation encoding professional interests, goals, competitors, accounts, and domain expertise. Long-horizon memory, preference gradients, and contextual retrieval condition every generated insight.",
    tags: ["Long-term memory", "Preference learning", "Context retrieval"],
    visual: "memory",
    spanClass: "lg:col-span-8",
  },
  {
    id: "SYS.02",
    meta: "N-agent mesh",
    title: "Multi-Agent Reasoning Engine",
    description:
      "Specialized agents discover events, interpret discussions, investigate entities, validate evidence, and synthesize opportunities. A coordinator decomposes tasks, allocates compute, and resolves contradictory signals.",
    tags: ["Task routing", "Evidence validation", "Signal arbitration"],
    visual: "agents",
    spanClass: "lg:col-span-4",
  },
  {
    id: "SYS.03",
    meta: "5 modalities",
    title: "Multimodal Event Intelligence",
    description:
      "Authorized audio, transcripts, presentations, documents, and event metadata are aligned into a shared semantic space—recovering entities, claims, intent, provenance, and strategic implications.",
    tags: ["Cross-modal alignment", "Entity resolution", "Claim extraction"],
    visual: "modalities",
    spanClass: "lg:col-span-4",
  },
  {
    id: "SYS.04",
    meta: "G(V, E, t)",
    title: "Temporal Knowledge Graph",
    description:
      "An evolving graph of companies, people, products, competitors, events, and relationships. Bi-temporal edges preserve what changed, when it changed, and the evidence supporting every connection.",
    tags: ["Bi-temporal edges", "Provenance chains", "Entity memory"],
    visual: "graph",
    spanClass: "lg:col-span-4",
  },
  {
    id: "SYS.05",
    meta: "P(action | signal)",
    title: "Predictive Opportunity Intelligence",
    description:
      "A calibrated ranking layer scores emerging signals against the user model, estimates relevance and confidence, and recommends the next best action using retrieval, graph features, and temporal priors.",
    tags: ["Signal ranking", "Confidence calibration", "Next-best action"],
    visual: "predict",
    spanClass: "lg:col-span-4",
  },
];
