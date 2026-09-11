"use client";

import React, { createContext, useContext, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  AVAILABLE_BADGES,
  Badge,
  INITIAL_PROGRESS_STATE,
  UserProgressState,
} from "@/types/gamification";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/storage";

interface GamificationContextType {
  progress: UserProgressState;
  unlockedBadgeList: Badge[];
  completeChallenge: (params: {
    topicSlug: string;
    challengeId: string;
    xpReward: number;
    badgeToUnlock?: string;
  }) => { isNewSuccess: boolean; earnedXp: number };
  triggerCelebration: () => void;
  resetProgress: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<UserProgressState>(
    STORAGE_KEYS.USER_PROGRESS,
    INITIAL_PROGRESS_STATE
  );

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#38bdf8", "#facc15", "#10b981"],
      });
    } catch (e) {
      console.warn("[Confetti] could not launch:", e);
    }
  }, []);

  const completeChallenge = useCallback(
    ({
      topicSlug,
      challengeId,
      xpReward,
      badgeToUnlock,
    }: {
      topicSlug: string;
      challengeId: string;
      xpReward: number;
      badgeToUnlock?: string;
    }) => {
      let isNewSuccess = false;

      setProgress((prev) => {
        const isAlreadySolved = prev.solvedChallenges.includes(challengeId);
        if (isAlreadySolved) {
          return prev;
        }

        isNewSuccess = true;
        const newSolved = [...prev.solvedChallenges, challengeId];
        const newBadges = [...prev.unlockedBadges];

        // Unlock first-step badge on any first challenge
        if (!newBadges.includes("first-step")) {
          newBadges.push("first-step");
        }

        if (badgeToUnlock && !newBadges.includes(badgeToUnlock)) {
          newBadges.push(badgeToUnlock);
        }

        const newCompletedTopics = [...prev.completedTopics];
        if (!newCompletedTopics.includes(topicSlug)) {
          newCompletedTopics.push(topicSlug);
        }

        return {
          ...prev,
          xp: prev.xp + xpReward,
          solvedChallenges: newSolved,
          unlockedBadges: newBadges,
          completedTopics: newCompletedTopics,
        };
      });

      triggerCelebration();
      return { isNewSuccess, earnedXp: xpReward };
    },
    [triggerCelebration, setProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS_STATE);
  }, [setProgress]);

  const unlockedBadgeList = AVAILABLE_BADGES.filter((b) =>
    progress.unlockedBadges.includes(b.id)
  );

  return (
    <GamificationContext.Provider
      value={{
        progress,
        unlockedBadgeList,
        completeChallenge,
        triggerCelebration,
        resetProgress,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
}
