export type CurriculumDomain =
  | "all"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "softskill";

export type CurriculumStage = "all" | "explorer" | "navigator" | "scholar";

export type CurriculumPhase = "mvp" | "v1.1" | "v2.0" | "optional";

export type TopicNodeStatus = "locked" | "active" | "done";

export interface TopicCurriculumItem {
  id: string;
  slug: string;
  title: string;
  domain: "math" | "physics" | "chemistry" | "biology" | "softskill";
  stage: "explorer" | "navigator" | "scholar";
  phase: CurriculumPhase;
  level: number;
  description: string;
  xp: number;
  isAvailable: boolean;
  route?: string;
  position: { x: number; y: number };
}

export interface PrerequisiteEdgeItem {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface CurriculumTreeData {
  nodes: TopicCurriculumItem[];
  edges: PrerequisiteEdgeItem[];
}
