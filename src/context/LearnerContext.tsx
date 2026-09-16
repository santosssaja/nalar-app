"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "@/lib/storage";
import {
  LearnerState,
  INITIAL_LEARNER_STATE,
  LEARNER_STORAGE_KEY,
  LabNotebookEntry,
} from "@/lib/learner/learner-model";
import { FiveDimensionMastery, LearningMode, CanonicalTopic } from "@/lib/curriculum/types";
import {
  getRecommendedNextTopic,
  calculateOverallMastery,
  isTopicUnlocked,
} from "@/lib/curriculum/prerequisite-engine";
import { CANONICAL_TOPICS } from "@/lib/curriculum/data/topics";
import { useLearnerActions } from "./learner-actions";

interface LearnerContextType {
  learnerState: LearnerState;
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  updateTopicMastery: (topicId: string, updates: Partial<FiveDimensionMastery>) => void;
  recordActivity: (params: {
    topicId: string;
    topicTitle: string;
    activityId: string;
    activityType: string;
    route: string;
    success: boolean;
  }) => void;
  recordMistake: (topicId: string, concept: string, note: string) => void;
  recordHintUsed: (topicId: string) => void;
  saveLabNotebookEntry: (entry: Omit<LabNotebookEntry, "id" | "updatedAt">) => void;
  resetLearnerData: () => void;
  overallMastery: FiveDimensionMastery;
  recommendedTopic: CanonicalTopic | null;
  isUnlocked: (topicId: string) => boolean;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export function LearnerProvider({ children }: { children: React.ReactNode }) {
  const [learnerState, setLearnerState] = useLocalStorage<LearnerState>(
    LEARNER_STORAGE_KEY,
    INITIAL_LEARNER_STATE
  );

  const actions = useLearnerActions(setLearnerState);

  const overallMastery = useMemo(() => {
    return calculateOverallMastery(learnerState.topicMastery);
  }, [learnerState.topicMastery]);

  const recommendedTopic = useMemo(() => {
    return getRecommendedNextTopic(learnerState.completedTopics, CANONICAL_TOPICS);
  }, [learnerState.completedTopics]);

  const isUnlocked = useMemo(() => {
    const completed = learnerState.completedTopics;
    return (topicId: string) => isTopicUnlocked(topicId, completed, CANONICAL_TOPICS);
  }, [learnerState.completedTopics]);

  const value = useMemo(
    () => ({
      learnerState,
      learningMode: learnerState.learningMode,
      ...actions,
      overallMastery,
      recommendedTopic,
      isUnlocked,
    }),
    [learnerState, actions, overallMastery, recommendedTopic, isUnlocked]
  );

  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>;
}

export function useLearnerModel() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error("useLearnerModel must be used within a LearnerProvider");
  }
  return context;
}

export const useLearner = useLearnerModel;
