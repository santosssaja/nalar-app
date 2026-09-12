import { RankTitle, UserRankInfo } from "./types";

export const RANK_THRESHOLDS: { title: RankTitle; min: number; next: number }[] = [
  { title: "Explorer", min: 0, next: 500 },
  { title: "Navigator", min: 500, next: 2000 },
  { title: "Scholar", min: 2000, next: 5000 },
  { title: "Master", min: 5000, next: 10000 },
];

export function calculateUserRank(xp: number): UserRankInfo {
  let matched = RANK_THRESHOLDS[0];

  for (const threshold of RANK_THRESHOLDS) {
    if (xp >= threshold.min) {
      matched = threshold;
    }
  }

  const range = matched.next - matched.min;
  const currentInRange = Math.max(0, xp - matched.min);
  const progressPercent = Math.min(100, Math.round((currentInRange / range) * 100));

  return {
    title: matched.title,
    currentXp: xp,
    minXp: matched.min,
    nextXp: matched.next,
    progressPercent,
  };
}

export function checkLevelUp(oldXp: number, newXp: number): { leveledUp: boolean; newRank?: RankTitle } {
  const oldRank = calculateUserRank(oldXp);
  const newRank = calculateUserRank(newXp);

  if (oldRank.title !== newRank.title) {
    return { leveledUp: true, newRank: newRank.title };
  }

  return { leveledUp: false };
}

export function getTierXp(tier: 1 | 2 | 3): number {
  switch (tier) {
    case 1:
      return 30;
    case 2:
      return 60;
    case 3:
      return 100;
    default:
      return 30;
  }
}
