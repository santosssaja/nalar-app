import { FiveDimensionMastery, LearningMode } from "../curriculum/types";

/**
 * Learner Model definition according to docs/new-module.md Section 11 & Section 17.
 * Stores multi-dimensional mastery, history, mistakes, hints, and lab notebook.
 */

export interface ActivityAttempt {
  topicId: string;
  activityId: string;
  success: boolean;
  score?: number;
  timestamp: string;
}

export interface LearnerMistake {
  id: string;
  topicId: string;
  concept: string;
  note: string;
  timestamp: string;
}

export interface LabNotebookEntry {
  id: string;
  topicId: string;
  topicTitle: string;
  question: string;
  hypothesis: string;
  variables: string;
  prediction: string;
  observation: string;
  data: string;
  conclusion: string;
  updatedAt: string;
}

export interface LearnerLastActivity {
  topicId: string;
  topicTitle: string;
  activityType: string;
  route: string;
  timestamp: string;
}

export interface LearnerState {
  topicMastery: Record<string, FiveDimensionMastery>;
  completedTopics: string[];
  completedActivities: string[];
  attemptHistory: ActivityAttempt[];
  mistakes: LearnerMistake[];
  hintsUsedCount: Record<string, number>;
  lastActivity: LearnerLastActivity | null;
  learningMode: LearningMode;
  labNotebook: LabNotebookEntry[];
}

export function createDefault5DMastery(initialValue: number = 0): FiveDimensionMastery {
  return {
    conceptual: initialValue,
    procedural: initialValue,
    reasoning: initialValue,
    problemSolving: initialValue,
    transfer: initialValue,
    overall: initialValue,
  };
}

export const INITIAL_LEARNER_STATE: LearnerState = {
  topicMastery: {},
  completedTopics: [],
  completedActivities: [],
  attemptHistory: [],
  mistakes: [],
  hintsUsedCount: {},
  lastActivity: {
    topicId: "math-real-numbers",
    topicTitle: "Operasi Bilangan Riil & Garis Bilangan",
    activityType: "explore",
    route: "/topics/math-real-numbers",
    timestamp: new Date().toISOString(),
  },
  learningMode: "learn",
  labNotebook: [],
};

export const LEARNER_STORAGE_KEY = "nalar_learner_model_v2";
