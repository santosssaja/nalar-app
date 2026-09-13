import { NaiExpression } from "@/components/nai/nai-sprites";

/**
 * Screen / Step Types in Nalar STEM Learning Architecture.
 * Supports the 8 Guided Discovery Learning screen types alongside legacy aliases.
 */
export type ScreenType =
  | "provoke"
  | "predict"
  | "guided"
  | "formalize"
  | "check"
  | "sandbox"
  | "challenge"
  | "reflect"
  // Legacy Aliases
  | "explanation"
  | "playground"
  | "validation";

export type StepType = ScreenType;

// --- 1. PROVOKE SCREEN PAYLOAD ---
export interface ProvokeOption {
  id: string;
  text: string;
  responseText: string;
}

export interface ProvokeConfig {
  hookTitle: string;
  hookText: string;
  imageUrl?: string;
  interactiveComponentSlug?: string;
  initialVariables?: Record<string, number>;
  question: string;
  options: ProvokeOption[];
}

// --- 2. PREDICT SCREEN PAYLOAD ---
export interface PredictOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface PredictConfig {
  scenarioTitle: string;
  scenarioText: string;
  question: string;
  options: PredictOption[];
  simulationLabel?: string;
  interactiveComponentSlug?: string;
  initialVariables?: Record<string, number>;
  simulationVariables?: Record<string, number>;
}

// --- 3. GUIDED EXPLORATION SCREEN PAYLOAD ---
export interface GuidedObservationRow {
  parameter: string;
  expectedValue: string | number;
  unit?: string;
}

export interface GuidedConfig {
  instructionTitle: string;
  instructionText: string;
  interactiveComponentSlug: string;
  initialVariables?: Record<string, number>;
  targetVariableKey?: string;
  targetVariableValue?: number;
  tolerance?: number;
  observationTable?: {
    headers: string[];
    rows: GuidedObservationRow[];
  };
  discoveryQuestion?: {
    prompt: string;
    options: string[];
    correctOption: string;
    insight: string;
  };
}

// --- 4. FORMALIZE SCREEN PAYLOAD ---
export interface FormalizeBlank {
  id: string;
  label: string;
  options: string[];
  correctOption: string;
}

export interface FormalizeConfig {
  title: string;
  prompt: string;
  formulaTemplate: string;
  blanks: FormalizeBlank[];
  resolvedFormulaKaTeX: string;
  explanation: string;
}

// --- 5. CHECK SCREEN PAYLOAD ---
export interface CheckOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface CheckConfig {
  question: string;
  checkType: "multiple_choice" | "true_false";
  options?: CheckOption[];
  trueFalseAnswer?: boolean;
  explanation: string;
}

// --- 6. REFLECT SCREEN PAYLOAD ---
export interface ReflectConfig {
  title: string;
  takeaways: string[];
  connectionText?: string;
  nextLevelTitle?: string;
  badgeToUnlock?: string;
  xpReward: number;
  formulaKaTeX?: string;
}

// --- LEGACY STEP PAYLOADS (Backward Compatibility) ---
export interface ExplanationContent {
  title: string;
  conceptText: string;
  analogyText?: string;
  keyFormulas?: string[];
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
  hint1Static: string;
  hint2Static: string;
  solutionVariables?: Record<string, number>;
  solutionExplanation: string;
  xpReward: number;
}

export interface ValidationConfig {
  title: string;
  summaryText: string;
  keyTakeaway: string;
  formulaKaTeX: string;
  badgeToUnlock?: string;
}

/**
 * Unified Step / Screen Model.
 */
export interface Step {
  id: string;
  type: StepType;
  title: string;
  naiExpression?: NaiExpression;
  naiDialogue?: string;

  // Guided Discovery Screen Payloads
  provoke?: ProvokeConfig;
  predict?: PredictConfig;
  guided?: GuidedConfig;
  formalize?: FormalizeConfig;
  check?: CheckConfig;
  sandbox?: PlaygroundConfig;
  reflect?: ReflectConfig;

  // Legacy Step Payloads
  explanation?: ExplanationContent;
  playground?: PlaygroundConfig;
  challenge?: ChallengeConfig;
  validation?: ValidationConfig;
}

export interface Level {
  id: string;
  index: number;
  title: string;
  tier: 1 | 2 | 3;
  description: string;
  ahaMoment?: string;
  steps: Step[];
}
