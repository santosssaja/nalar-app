export interface LocalGamificationState {
  xp: number;
  level: number;
  unlockedBadges: string[];
  completedLevels: Record<string, boolean>;
  streak: {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;
  };
}

export interface ServerSyncData {
  xp: number;
  completedLevels: Record<string, boolean>;
  unlockedBadges: string[];
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string | null;
  };
}

export function resolveProgressConflict(
  local: LocalGamificationState,
  server: ServerSyncData
): LocalGamificationState {
  // 1. Monotonic Max XP
  const resolvedXp = Math.max(local.xp, server.xp);

  // 2. Union of completed levels (once completed, always completed)
  const mergedLevels: Record<string, boolean> = { ...local.completedLevels };
  for (const [key, completed] of Object.entries(server.completedLevels)) {
    if (completed) {
      mergedLevels[key] = true;
    }
  }

  // 3. Union of unlocked badges
  const badgeSet = new Set<string>([...local.unlockedBadges, ...server.unlockedBadges]);
  const mergedBadges = Array.from(badgeSet);

  // 4. Streak resolution
  const resolvedStreak = {
    currentStreak: Math.max(local.streak.currentStreak, server.streak.current),
    longestStreak: Math.max(local.streak.longestStreak, server.streak.longest),
    lastActiveDate: local.streak.lastActiveDate || server.streak.lastActiveDate,
  };

  // Recalculate level threshold (XP / 100 + 1)
  const resolvedLevel = Math.floor(resolvedXp / 100) + 1;

  return {
    xp: resolvedXp,
    level: resolvedLevel,
    unlockedBadges: mergedBadges,
    completedLevels: mergedLevels,
    streak: resolvedStreak,
  };
}
