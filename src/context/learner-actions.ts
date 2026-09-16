"use client";

import { useCallback, useMemo } from "react";
import {
  LearnerState,
  INITIAL_LEARNER_STATE,
  createDefault5DMastery,
  LabNotebookEntry,
} from "@/lib/learner/learner-model";
import { FiveDimensionMastery, LearningMode } from "@/lib/curriculum/types";

export type LearnerStateSetter = (
  valOrFn: LearnerState | ((prev: LearnerState) => LearnerState)
) => void;

export interface LearnerActions {
  setLearningMode: (mode: LearnerState["learningMode"]) => void;
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
}

/**
 * Stateful learner action callbacks. Split from LearnerContext.tsx (<250 lines rule).
 * LabNotebookEntry import stays local to avoid widening this module's API.
 */
export function useLearnerActions(setLearnerState: LearnerStateSetter) {
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

  return useMemo(
    () => ({
      setLearningMode,
      updateTopicMastery,
      recordActivity,
      recordMistake,
      recordHintUsed,
      saveLabNotebookEntry,
      resetLearnerData,
    }),
    [
      setLearningMode,
      updateTopicMastery,
      recordActivity,
      recordMistake,
      recordHintUsed,
      saveLabNotebookEntry,
      resetLearnerData,
    ]
  );
}
