/**
 * Canonical Curriculum & Knowledge Graph Types
 * Aligned with docs/new-module.md, docs/roadmap-math.md, docs/roadmap-science.md, and AGENTS.md
 */

export type CurriculumSubject = "math" | "science";

export type CurriculumDomain =
  | "all"
  | "math"
  | "science"
  | "physics"
  | "chemistry"
  | "biology"
  | "softskill";

export type CurriculumStage = "all" | "explorer" | "navigator" | "scholar";

export type CurriculumPhase = "mvp" | "v1.1" | "v2.0" | "optional";

export type TopicNodeStatus = "locked" | "active" | "completed" | "done";

export type LearningMode = "explore" | "learn" | "master";

export type TopicDomain =
  | "math"
  | "science"
  | "physics"
  | "chemistry"
  | "biology"
  | "softskill"
  | "arithmetic"
  | "algebra"
  | "calculus"
  | "geometry"
  | "logic";

/**
 * 5 Dimensions of STEM Mastery as mandated by docs/new-module.md Section 11 & Section 21
 */
export interface FiveDimensionMastery {
  conceptual: number; // 0 - 100
  procedural: number; // 0 - 100
  reasoning: number; // 0 - 100
  problemSolving: number; // 0 - 100
  transfer: number; // 0 - 100
  overall: number; // 0 - 100
}

/**
 * Cross-domain concept bridge connecting Mathematics to Science
 * (docs/new-module.md Section 15)
 */
export interface ConceptConnection {
  id: string;
  mathTopicId: string;
  mathTopicTitle: string;
  scienceTopicId: string;
  scienceTopicTitle: string;
  title: string;
  description: string;
  formulaTeX?: string;
  badgeText: string;
}

/**
 * Static Section definition within a topic module (docs/new-module.md Section 18)
 */
export interface TopicSection {
  id: string;
  title: string;
  type: "hook" | "prediction" | "explore" | "discover" | "formalize" | "derivation" | "practice" | "lab" | "transfer";
  summary: string;
}

/**
 * Canonical Topic definition in the Knowledge Graph DAG
 */
export interface CanonicalTopic {
  id: string; // e.g. "math-real-numbers", "science-kinematics"
  slug: string;
  title: string;
  subject: CurriculumSubject;
  domain: TopicDomain;
  level: number;
  stage: "explorer" | "navigator" | "scholar";
  phase: CurriculumPhase;
  summary: string;
  description: string;
  audioNarrationText: string;
  prerequisites: string[]; // List of topic IDs this topic requires
  unlocks: string[]; // List of topic IDs unlocked by completing this topic
  learningObjectives: string[];
  concepts: string[];
  sections: TopicSection[];
  xp?: number;
  xpReward: number;
  isMvpFlagship?: boolean; // Specifically for Kinematics
  isAvailable: boolean; // True for MVP vertical slice
  route: string;
  position: { x: number; y: number };
}

/**
 * Knowledge Graph edge connecting topic prerequisites
 */
export interface KnowledgeGraphEdge {
  id: string;
  source: string; // topic id
  target: string; // topic id
  isCrossDomain?: boolean; // Math -> Science bridge
  label?: string;
}

/**
 * Knowledge Graph DAG
 */
export interface KnowledgeGraph {
  nodes: CanonicalTopic[];
  edges: KnowledgeGraphEdge[];
  connections: ConceptConnection[];
}

/**
 * Backward compatibility aliases
 */
export type TopicCurriculumItem = CanonicalTopic;
export type PrerequisiteEdgeItem = KnowledgeGraphEdge;
export interface CurriculumTreeData {
  nodes: CanonicalTopic[];
  edges: KnowledgeGraphEdge[];
}
