"use client";

import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  ALL_BADGES,
  Badge,
  INITIAL_PROGRESS_STATE,
  UserProgressState,
  RankTitle,
  UserRankInfo,
  calculateUserRank,
  checkLevelUp,
  evaluateBadges,
  updateDailyStreak,
} from "@/lib/gamification";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/storage";

interface GamificationContextType {
  progress: UserProgressState;
  rankInfo: UserRankInfo;
  unlockedBadgeList: Badge[];
  levelUpModalRank: RankTitle | null;
  closeLevelUpModal: () => void;
  completeChallenge: (params: {
    topicSlug: string;
    challengeId: string;
    xpReward: number;
    badgeToUnlock?: string;
  }) => { isNewSuccess: boolean; earnedXp: number };
  completeModule: (topicSlug: string) => void;
  triggerCelebration: () => void;
  resetProgress: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<UserProgressState>(
    STORAGE_KEYS.USER_PROGRESS,
    INITIAL_PROGRESS_STATE
  );

  const [levelUpModalRank, setLevelUpModalRank] = useState<RankTitle | null>(null);

  // Daily streak check on initial mount
  useEffect(() => {
    setProgress((prev) => {
      const streakResult = updateDailyStreak(
        prev.lastActiveDate,
        prev.consecutiveDays,
        prev.activityDates
      );

      if (streakResult.isNewDay) {
        return {
          ...prev,
          consecutiveDays: streakResult.consecutiveDays,
          lastActiveDate: streakResult.lastActiveDate,
          activityDates: streakResult.activityDates,
        };
      }
      return prev;
    });
  }, [setProgress]);

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#38bdf8", "#facc15", "#10b981", "#ec4899"],
      });
    } catch (e) {
      console.warn("[Confetti] launch error:", e);
    }
  }, []);

  const closeLevelUpModal = useCallback(() => {
    setLevelUpModalRank(null);
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
        const newXp = prev.xp + xpReward;

        // Check level up
        const levelUpCheck = checkLevelUp(prev.xp, newXp);
        if (levelUpCheck.leveledUp && levelUpCheck.newRank) {
          setLevelUpModalRank(levelUpCheck.newRank);
        }

        // Daily streak update
        const streakUpdate = updateDailyStreak(
          prev.lastActiveDate,
          prev.consecutiveDays,
          prev.activityDates
        );

        // Evaluate Badges
        const tempState: UserProgressState = {
          ...prev,
          xp: newXp,
          solvedChallenges: newSolved,
          consecutiveDays: streakUpdate.consecutiveDays,
          lastActiveDate: streakUpdate.lastActiveDate,
          activityDates: streakUpdate.activityDates,
        };

        const badgeEval = evaluateBadges(tempState, {
          completedTopicSlug: topicSlug,
          requestedBadgeId: badgeToUnlock,
        });

        return {
          ...tempState,
          unlockedBadges: badgeEval.updatedUnlockedBadges,
        };
      });

      triggerCelebration();
      return { isNewSuccess, earnedXp: xpReward };
    },
    [triggerCelebration, setProgress]
  );

  const completeModule = useCallback(
    (topicSlug: string) => {
      setProgress((prev) => {
        if (prev.completedTopics.includes(topicSlug)) return prev;

        const newCompleted = [...prev.completedTopics, topicSlug];
        const tempState: UserProgressState = {
          ...prev,
          completedTopics: newCompleted,
        };

        const badgeEval = evaluateBadges(tempState, {
          completedTopicSlug: topicSlug,
        });

        return {
          ...tempState,
          unlockedBadges: badgeEval.updatedUnlockedBadges,
        };
      });
      triggerCelebration();
    },
    [triggerCelebration, setProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS_STATE);
    setLevelUpModalRank(null);
  }, [setProgress]);

  const rankInfo = useMemo(() => calculateUserRank(progress.xp), [progress.xp]);

  const unlockedBadgeList = useMemo(
    () => ALL_BADGES.filter((b) => progress.unlockedBadges.includes(b.id)),
    [progress.unlockedBadges]
  );

  const value = useMemo(
    () => ({
      progress,
      rankInfo,
      unlockedBadgeList,
      levelUpModalRank,
      closeLevelUpModal,
      completeChallenge,
      completeModule,
      triggerCelebration,
      resetProgress,
    }),
    [
      progress,
      rankInfo,
      unlockedBadgeList,
      levelUpModalRank,
      closeLevelUpModal,
      completeChallenge,
      completeModule,
      triggerCelebration,
      resetProgress,
    ]
  );

  return (
    <GamificationContext.Provider value={value}>
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
