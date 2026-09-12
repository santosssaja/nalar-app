export interface StreakUpdateResult {
  consecutiveDays: number;
  lastActiveDate: string;
  activityDates: string[];
  isNewDay: boolean;
}

export function updateDailyStreak(
  lastActiveDate: string | null | undefined,
  currentStreak: number,
  existingActivityDates: string[] = []
): StreakUpdateResult {
  const todayStr = new Date().toISOString().split("T")[0];

  const activityDatesSet = new Set(existingActivityDates);
  activityDatesSet.add(todayStr);

  if (!lastActiveDate) {
    return {
      consecutiveDays: Math.max(1, currentStreak || 1),
      lastActiveDate: todayStr,
      activityDates: Array.from(activityDatesSet),
      isNewDay: true,
    };
  }

  if (lastActiveDate === todayStr) {
    return {
      consecutiveDays: Math.max(1, currentStreak),
      lastActiveDate: todayStr,
      activityDates: Array.from(activityDatesSet),
      isNewDay: false,
    };
  }

  const lastDate = new Date(lastActiveDate);
  const todayDate = new Date(todayStr);
  const diffDays = Math.round(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let newStreak = currentStreak;

  if (diffDays === 1) {
    // Exact next day: increment streak
    newStreak = currentStreak + 1;
  } else if (diffDays > 1) {
    // Skipped one or more days: reset to 1
    newStreak = 1;
  } else {
    newStreak = Math.max(1, currentStreak);
  }

  return {
    consecutiveDays: newStreak,
    lastActiveDate: todayStr,
    activityDates: Array.from(activityDatesSet),
    isNewDay: true,
  };
}
