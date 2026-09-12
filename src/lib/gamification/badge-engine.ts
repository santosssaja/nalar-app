import { ALL_BADGES, Badge, UserProgressState } from "./types";

export function evaluateBadges(
  progress: UserProgressState,
  context?: { completedTopicSlug?: string; requestedBadgeId?: string }
): { updatedUnlockedBadges: string[]; newlyUnlockedBadges: Badge[] } {
  const currentSet = new Set(progress.unlockedBadges);
  const newlyUnlocked: Badge[] = [];

  const grantBadge = (badgeId: string) => {
    if (!currentSet.has(badgeId)) {
      const badge = ALL_BADGES.find((b) => b.id === badgeId);
      if (badge) {
        currentSet.add(badgeId);
        newlyUnlocked.push(badge);
      }
    }
  };

  // 1. First step: any solved challenge
  if ((progress.solvedChallenges || []).length >= 1) {
    grantBadge("first-step");
  }

  // 2. Explicit requested badge (from challenge or validation step)
  if (context?.requestedBadgeId) {
    grantBadge(context.requestedBadgeId);
  }

  const completed = progress.completedTopics || [];

  // 3. Modular clock full module
  if (context?.completedTopicSlug === "arithmetic-modular-clock" || completed.includes("arithmetic-modular-clock")) {
    grantBadge("modular-master");
  }

  // 4. Matrix determinant full module
  if (context?.completedTopicSlug === "linear-algebra-determinant-2d" || completed.includes("linear-algebra-determinant-2d")) {
    grantBadge("matrix-master");
  }

  // 5. Streak badges
  if ((progress.consecutiveDays || 0) >= 3) {
    grantBadge("streak-3");
  }

  // 6. Polymath: 2 or more distinct topics
  if (completed.length >= 2) {
    grantBadge("polymath");
  }

  return {
    updatedUnlockedBadges: Array.from(currentSet),
    newlyUnlockedBadges: newlyUnlocked,
  };
}
