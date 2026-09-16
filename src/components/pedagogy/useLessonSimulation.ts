"use client";

import { useCallback, useState } from "react";
import { useGamification } from "@/context/GamificationContext";

export interface LessonSimulation {
  simVars: Record<string, number>;
  hintsUsedCount: number;
  handleSimVarsChange: (updated: Record<string, number>) => void;
  handleClaimXp: (amount: number, challengeId?: string) => void;
  registerHintUnlocked: (level: number) => void;
}

export function useLessonSimulation(
  slug: string,
  initialVariables: Record<string, number>
): LessonSimulation {
  const [simVars, setSimVars] = useState<Record<string, number>>(initialVariables);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const { completeChallenge } = useGamification();

  const handleSimVarsChange = useCallback((updated: Record<string, number>) => {
    setSimVars((prev) => ({ ...prev, ...updated }));
  }, []);

  const handleClaimXp = useCallback(
    (amount: number, challengeId = "challenge") => {
      completeChallenge({ topicSlug: slug, challengeId, xpReward: amount });
    },
    [completeChallenge, slug]
  );

  const registerHintUnlocked = useCallback((level: number) => {
    setHintsUsedCount((prev) => Math.max(prev, level));
  }, []);

  return { simVars, hintsUsedCount, handleSimVarsChange, handleClaimXp, registerHintUnlocked };
}
