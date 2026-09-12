export type StepType = "explanation" | "playground" | "challenge" | "validation";

export interface ExplanationContent {
  title: string;
  conceptText: string;
  analogyText?: string;
  keyFormulas?: string[]; // KaTeX formula strings
  audioNarrationText?: string;
  actionText?: string;
}

export interface PlaygroundConfig {
  title: string;
  instructions: string;
  interactiveComponentSlug: string;
  initialVariables?: Record<string, number>;
}

export interface ChallengeConfig {
  id: string;
  title: string;
  question: string;
  targetCondition: (vars: Record<string, number>) => boolean;
  hint1Static: string; // Hint 1: Encouragement / rule-based
  hint2Static: string; // Hint 2: Directional pointer
  solutionVariables?: Record<string, number>; // For Hint 4 auto-movement
  solutionExplanation: string; // Complete solution explanation
  xpReward: number;
}

export interface ValidationConfig {
  title: string;
  summaryText: string;
  keyTakeaway: string;
  formulaKaTeX: string;
  badgeToUnlock?: string;
}

export interface Step {
  id: string;
  type: StepType;
  title: string;
  explanation?: ExplanationContent;
  playground?: PlaygroundConfig;
  challenge?: ChallengeConfig;
  validation?: ValidationConfig;
}

export interface Level {
  id: string;
  index: number;
  title: string;
  tier: 1 | 2 | 3; // ⭐ (1) / ⭐⭐ (2) / ⭐⭐⭐ (3)
  description: string;
  steps: Step[];
}
