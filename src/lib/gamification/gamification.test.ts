import { describe, it, expect } from "vitest";
import {
  getTierXp,
  calculateUserRank,
  checkLevelUp,
  evaluateBadges,
  updateDailyStreak,
  INITIAL_PROGRESS_STATE,
} from "./index";

describe("Gamification Engine", () => {
  describe("XP & Rank Engine", () => {
    it("calculates XP based on challenge tier", () => {
      expect(getTierXp(1)).toBe(30);
      expect(getTierXp(2)).toBe(60);
      expect(getTierXp(3)).toBe(100);
    });

    it("evaluates Explorer rank at low XP", () => {
      const rank = calculateUserRank(0);
      expect(rank.title).toBe("Explorer");
      expect(rank.minXp).toBe(0);
      expect(rank.nextXp).toBe(500);
    });

    it("evaluates Navigator rank at 500+ XP", () => {
      const rank = calculateUserRank(500);
      expect(rank.title).toBe("Navigator");
      expect(rank.minXp).toBe(500);
      expect(rank.nextXp).toBe(2000);
    });

    it("evaluates Scholar and Master ranks appropriately", () => {
      expect(calculateUserRank(2500).title).toBe("Scholar");
      expect(calculateUserRank(6000).title).toBe("Master");
    });

    it("detects level up crossing boundary", () => {
      const levelUp = checkLevelUp(450, 520);
      expect(levelUp.leveledUp).toBe(true);
      expect(levelUp.newRank).toBe("Navigator");

      const noLevelUp = checkLevelUp(50, 100);
      expect(noLevelUp.leveledUp).toBe(false);
    });
  });

  describe("Streak Engine", () => {
    it("starts 1 day streak for brand new user", () => {
      const result = updateDailyStreak(null, 0, []);
      expect(result.consecutiveDays).toBe(1);
      expect(result.isNewDay).toBe(true);
      expect(result.activityDates.length).toBe(1);
    });

    it("does not increment streak if accessed on the same date", () => {
      const today = new Date().toISOString().split("T")[0];
      const result = updateDailyStreak(today, 3, [today]);
      expect(result.consecutiveDays).toBe(3);
      expect(result.isNewDay).toBe(false);
    });

    it("increments streak if accessed exactly consecutive day", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];

      const result = updateDailyStreak(yStr, 4, [yStr]);
      expect(result.consecutiveDays).toBe(5);
      expect(result.isNewDay).toBe(true);
    });

    it("resets streak to 1 if more than 1 day missed", () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const str = threeDaysAgo.toISOString().split("T")[0];

      const result = updateDailyStreak(str, 10, [str]);
      expect(result.consecutiveDays).toBe(1);
      expect(result.isNewDay).toBe(true);
    });
  });

  describe("Badge Engine", () => {
    it("evaluates first step badge when 1 challenge solved", () => {
      const result = evaluateBadges({
        ...INITIAL_PROGRESS_STATE,
        solvedChallenges: ["c1"],
        completedTopics: [],
        consecutiveDays: 1,
        unlockedBadges: [],
      });

      expect(result.updatedUnlockedBadges.includes("first-step")).toBe(true);
      expect(result.newlyUnlockedBadges.some((b) => b.id === "first-step")).toBe(true);
    });

    it("evaluates master badge when all modules completed", () => {
      const result = evaluateBadges({
        ...INITIAL_PROGRESS_STATE,
        solvedChallenges: ["c1", "c2"],
        completedTopics: ["arithmetic-modular-clock", "linear-algebra-determinant-2d"],
        consecutiveDays: 1,
        unlockedBadges: [],
      });

      expect(result.updatedUnlockedBadges.includes("polymath")).toBe(true);
      expect(result.updatedUnlockedBadges.includes("modular-master")).toBe(true);
      expect(result.updatedUnlockedBadges.includes("matrix-master")).toBe(true);
    });
  });
});
