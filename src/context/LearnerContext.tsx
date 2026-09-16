"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "@/lib/storage";
import {
  LearnerState,
  INITIAL_LEARNER_STATE,
  LEARNER_STORAGE_KEY,
  createDefault5DMastery,
  LabNotebookEntry,
} from "@/lib/learner/learner-model";
import { FiveDimensionMastery, LearningMode, CanonicalTopic } from "@/lib/curriculum/types";
import {
  getRecommendedNextTopic,
  calculateOverallMastery,
  isTopicUnlocked,
} from "@/lib/curriculum/prerequisite-engine";
import { CANONICAL_TOPICS } from "@/lib/curriculum/data/topics";

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

  const setLearningMode = useCallback(
    (mode: LearningMode) => {
      setLearnerState((prev) => ({ ...prev, learningMode: mode }));
    },
    [setLearnerState]
  );

  const updateTopicMastery = useCallback(
    (topicId: string, updates: Partial<FiveDimensionMastery>) => {
      setLearnerState((prev) => {
        const current = prev.topicMastery[topicId] || createDefault5DMastery();
        const nextConceptual = updates.conceptual ?? current.conceptual;
        const nextProcedural = updates.procedural ?? current.procedural;
        const nextReasoning = updates.reasoning ?? current.reasoning;
        const nextProblemSolving = updates.problemSolving ?? current.problemSolving;
        const nextTransfer = updates.transfer ?? current.transfer;

        const nextOverall = Math.round(
          (nextConceptual + nextProcedural + nextReasoning + nextProblemSolving + nextTransfer) / 5
        );

        const updatedMastery: FiveDimensionMastery = {
          conceptual: nextConceptual,
          procedural: nextProcedural,
          reasoning: nextReasoning,
          problemSolving: nextProblemSolving,
          transfer: nextTransfer,
          overall: nextOverall,
        };

        const isNowCompleted = nextOverall >= 70;
        const alreadyCompleted = prev.completedTopics.includes(topicId);
        const nextCompletedTopics =
          isNowCompleted && !alreadyCompleted
            ? [...prev.completedTopics, topicId]
            : prev.completedTopics;

        return {
          ...prev,
          topicMastery: {
            ...prev.topicMastery,
            [topicId]: updatedMastery,
          },
          completedTopics: nextCompletedTopics,
        };
      });
    },
    [setLearnerState]
  );

  const recordActivity = useCallback(
    ({
      topicId,
      topicTitle,
      activityId,
      activityType,
      route,
      success,
    }: {
      topicId: string;
      topicTitle: string;
      activityId: string;
      activityType: string;
      route: string;
      success: boolean;
    }) => {
      setLearnerState((prev) => {
        const alreadyHasActivity = prev.completedActivities.includes(activityId);
        const newCompletedActivities =
          success && !alreadyHasActivity
            ? [...prev.completedActivities, activityId]
            : prev.completedActivities;

        const newAttempt = {
          topicId,
          activityId,
          success,
          timestamp: new Date().toISOString(),
        };

        return {
          ...prev,
          completedActivities: newCompletedActivities,
          attemptHistory: [newAttempt, ...prev.attemptHistory].slice(0, 50),
          lastActivity: {
            topicId,
            topicTitle,
            activityType,
            route,
            timestamp: new Date().toISOString(),
          },
        };
      });
    },
    [setLearnerState]
  );

  const recordMistake = useCallback(
    (topicId: string, concept: string, note: string) => {
      setLearnerState((prev) => ({
        ...prev,
        mistakes: [
          {
            id: `mistake-${Date.now()}`,
            topicId,
            concept,
            note,
            timestamp: new Date().toISOString(),
          },
          ...prev.mistakes,
        ].slice(0, 30),
      }));
    },
    [setLearnerState]
  );

  const recordHintUsed = useCallback(
    (topicId: string) => {
      setLearnerState((prev) => ({
        ...prev,
        hintsUsedCount: {
          ...prev.hintsUsedCount,
          [topicId]: (prev.hintsUsedCount[topicId] || 0) + 1,
        },
      }));
    },
    [setLearnerState]
  );

  const saveLabNotebookEntry = useCallback(
    (entry: Omit<LabNotebookEntry, "id" | "updatedAt">) => {
      setLearnerState((prev) => {
        const newEntry: LabNotebookEntry = {
          ...entry,
          id: `lab-${Date.now()}`,
          updatedAt: new Date().toISOString(),
        };
        return {
          ...prev,
          labNotebook: [newEntry, ...prev.labNotebook],
        };
      });
    },
    [setLearnerState]
  );

  const resetLearnerData = useCallback(() => {
    setLearnerState(INITIAL_LEARNER_STATE);
  }, [setLearnerState]);

  const overallMastery = useMemo(() => {
    return calculateOverallMastery(learnerState.topicMastery);
  }, [learnerState.topicMastery]);

  const recommendedTopic = useMemo(() => {
    return getRecommendedNextTopic(learnerState.completedTopics, CANONICAL_TOPICS);
  }, [learnerState.completedTopics]);

  const isUnlocked = useCallback(
    (topicId: string) => {
      return isTopicUnlocked(topicId, learnerState.completedTopics, CANONICAL_TOPICS);
    },
    [learnerState.completedTopics]
  );

  const value = useMemo(
    () => ({
      learnerState,
      learningMode: learnerState.learningMode,
      setLearningMode,
      updateTopicMastery,
      recordActivity,
      recordMistake,
      recordHintUsed,
      saveLabNotebookEntry,
      resetLearnerData,
      overallMastery,
      recommendedTopic,
      isUnlocked,
    }),
    [
      learnerState,
      setLearningMode,
      updateTopicMastery,
      recordActivity,
      recordMistake,
      recordHintUsed,
      saveLabNotebookEntry,
      resetLearnerData,
      overallMastery,
      recommendedTopic,
      isUnlocked,
    ]
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
