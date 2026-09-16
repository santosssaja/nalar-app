/**
 * Pedagogical Architecture Types (docs/new-module.md)
 * 
 * Implements the 11 Pedagogical Phases, 3 Learning Modes,
 * 4-Level Progressive Hint System, Virtual Lab Notebook,
 * Cross-domain Math-Science bridges, and 5D STEM Mastery.
 */

import { CurriculumSubject, TopicDomain, FiveDimensionMastery } from "./types";

export type LearningMode = "learn" | "explore" | "master";

export type PedagogicalPhase =
  | "hook"
  | "prediction"
  | "explore"
  | "discover"
  | "formalize"
  | "derivation"
  | "guided_practice"
  | "independent_practice"
  | "virtual_lab"
  | "transfer"
  | "mastery_check";

export interface FourTierHint {
  level1Attention: string; // Focus attention
  level2Concept: string; // Orient towards underlying principle
  level3Strategy: string; // Provide formula or strategic relationship
  level4Scaffold: string; // Direct calculation scaffold
}

export interface PredictionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PredictionSpec {
  prompt: string;
  question: string;
  options: PredictionOption[];
  whatActuallyHappened: string;
}

export interface FormulaSpec {
  name: string;
  latex: string;
  meaning: string;
}

export interface DerivationStep {
  stepNumber: number;
  explanation: string;
  latex?: string;
}

export interface GuidedPracticeItem {
  id: string;
  title: string;
  question: string;
  hints: FourTierHint;
  targetCondition: (vars: Record<string, number>) => boolean;
  solutionExplanation: string;
  xpReward: number;
}

export interface IndependentPracticeItem {
  id: string;
  title: string;
  question: string;
  targetCondition: (vars: Record<string, number>) => boolean;
  solutionExplanation: string;
  xpReward: number;
}

export interface LabNotebookEntry {
  topicId: string;
  question: string;
  hypothesis: string;
  variables: Record<string, number>;
  observation: string;
  conclusion: string;
  recordedAt: number;
}

export interface VirtualLabSpec {
  question: string;
  hypothesisOptions: string[];
  parameterConfigs: {
    key: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
  }[];
  observationGuide: string;
  conclusionPrompt: string;
}

export interface TransferChallengeSpec {
  title: string;
  realWorldScenario: string;
  taskPrompt: string;
  targetCondition: (vars: Record<string, number>) => boolean;
  solutionExplanation: string;
  reflectionPrompt: string;
  xpReward: number;
}

export interface MasteryAssessmentItem {
  id: string;
  dimension: keyof Omit<FiveDimensionMastery, "overall">;
  dimensionLabel: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

/**
 * Comprehensive Pedagogical Lesson
 * Following docs/new-module.md Section 4 & Section 18
 */
export interface ComprehensiveLesson {
  id: string;
  slug: string;
  title: string;
  subject: CurriculumSubject;
  domain: TopicDomain;
  summary: string;
  audioNarrationText: string;
  prerequisites: string[];
  learningObjectives: string[];

  // 11 Pedagogical Phases
  hook: {
    question: string;
    phenomenonDescription: string;
    realWorldContext: string;
  };
  prediction: PredictionSpec;
  explore: {
    prompt: string;
    guidingQuestions: string[];
    initialVariables: Record<string, number>;
  };
  discover: {
    prompt: string;
    patternSummary: string;
    interactiveInsight: string;
  };
  formalize: {
    summary: string;
    definitions: { term: string; explanation: string }[];
    formulas: FormulaSpec[];
    variablesTable: { symbol: string; meaning: string; unit: string }[];
  };
  derivation?: {
    title: string;
    steps: DerivationStep[];
  };
  guidedPractice: GuidedPracticeItem[];
  independentPractice: IndependentPracticeItem[];
  virtualLab?: VirtualLabSpec;
  transferChallenge: TransferChallengeSpec;
  masteryCheck: MasteryAssessmentItem[];

  // Math-Science Connection (docs/new-module.md Section 15)
  crossDomainBridge?: {
    connectedTopicId: string;
    connectedTopicTitle: string;
    connectionNarrative: string;
    badgeText: string;
  };
}
