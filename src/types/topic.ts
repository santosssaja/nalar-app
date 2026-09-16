import { Level } from "./level";

export * from "./level";

/**
 * Topic Lesson Schema as mandated by AGENTS.md contract.
 */
export interface Challenge {
  id: string;
  title: string;
  question: string;
  targetCondition: (vars: Record<string, number>) => boolean;
  hintText: string;
  successMessage: string;
  xpReward: number;
}

export interface TopicLesson {
  id: string;
  slug: string;
  title: string;
  category: "math" | "physics" | "chemistry" | "biology" | "softskill" | "science";
  summary: string;
  audioNarrationText: string;
  initialVariables: Record<string, number>;
  challenges: Challenge[];
}

/**
 * Topic Module Schema (Duolingo x Brilliant Level Hierarchy)
 */
export interface TopicModule {
  id: string;
  slug: string;
  title: string;
  category: "math" | "physics" | "chemistry" | "biology" | "softskill" | "science";
  summary: string;
  audioNarrationText: string;
  initialVariables: Record<string, number>;
  levels: Level[];
}
