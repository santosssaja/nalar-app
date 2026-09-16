import { Hono } from "hono";
import { storage } from "../db/storage";
import { AchievementRecord, ProgressRecord } from "../db/schema";
import { syncProgressSchema } from "../validations/schemas";

export const syncRouter = new Hono();

syncRouter.post("/", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    let userId = "guest_sync";

    if (token) {
      const sessionData = await storage.getSession(token);
      if (sessionData) {
        userId = sessionData.user.id;
      }
    }

    const rawBody = await c.req.json();
    const parsed = syncProgressSchema.safeParse(rawBody);
    if (!parsed.success) {
      return c.json(
        { error: parsed.error.issues.map((i) => i.message).join(", "), details: parsed.error.issues },
        400
      );
    }
    const { xp, completedLevels, unlockedBadges, streak } = parsed.data;

    const existingProgress = await storage.getProgress(userId);
    const existingStreak = await storage.getStreak(userId);
    const existingAchievements = await storage.getAchievements(userId);

    const serverXp = existingProgress.reduce((sum: number, p: ProgressRecord) => sum + p.xpEarned, 0);
    const resolvedXp = Math.max(xp, serverXp);

    const mergedCompletedLevels: Record<string, boolean> = { ...completedLevels };
    for (const p of existingProgress) {
      if (p.completed) {
        mergedCompletedLevels[`${p.topicSlug}:${p.levelId}`] = true;
      }
    }

    const mergedBadgesSet = new Set<string>([...unlockedBadges, ...existingAchievements.map((a: AchievementRecord) => a.badgeId)]);
    const resolvedBadges = Array.from(mergedBadgesSet);

    const resolvedStreak = {
      current: Math.max(streak.current || 0, existingStreak?.currentStreak || 0),
      longest: Math.max(streak.longest || 0, existingStreak?.longestStreak || 0),
      lastActiveDate: streak.lastActiveDate || existingStreak?.lastActiveDate || new Date().toISOString().split("T")[0],
    };

    await storage.syncFullProgress(userId, {
      xp: resolvedXp,
      completedLevels: mergedCompletedLevels,
      unlockedBadges: resolvedBadges,
      streak: resolvedStreak,
    });

    return c.json({
      success: true,
      syncedAt: new Date().toISOString(),
      resolved: {
        xp: resolvedXp,
        completedLevels: mergedCompletedLevels,
        unlockedBadges: resolvedBadges,
        streak: resolvedStreak,
      },
    });
  } catch (err) {
    console.error("[Backend Sync] Error:", err);
    return c.json({ error: "Gagal sinkronisasi data" }, 500);
  }
});
