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
  category: "math" | "science";
  summary: string;
  audioNarrationText: string;
  initialVariables: Record<string, number>;
  challenges: Challenge[];
}
