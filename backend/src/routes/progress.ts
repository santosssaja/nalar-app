import { Hono } from "hono";
import { storage } from "../db/storage";

export const progressRouter = new Hono();

async function getUserIdFromReq(c: any): Promise<string> {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (token) {
    const sessionData = await storage.getSession(token);
    if (sessionData) return sessionData.user.id;
  }
  const guestHeader = c.req.header("X-Guest-Id");
  if (guestHeader) return guestHeader;
  return "guest_anonymous";
}

// GET /api/progress
progressRouter.get("/", async (c) => {
  const userId = await getUserIdFromReq(c);
  const progressList = await storage.getProgress(userId);
  const streak = await storage.getStreak(userId);
  const achievements = await storage.getAchievements(userId);

  return c.json({
    userId,
    progress: progressList,
    streak,
    achievements,
  });
});

// POST /api/progress/save
progressRouter.post("/save", async (c) => {
  try {
    const userId = await getUserIdFromReq(c);
    const body = await c.req.json();
    const { topicSlug, levelId, completed = true, score = 100, xpEarned = 40 } = body;

    if (!topicSlug || !levelId) {
      return c.json({ error: "topicSlug dan levelId diperlukan" }, 400);
    }

    const record = await storage.saveProgress(
      userId,
      topicSlug,
      levelId,
      completed,
      score,
      xpEarned
    );

    return c.json({ success: true, record });
  } catch (err) {
    console.error("[Backend Progress] Save error:", err);
    return c.json({ error: "Gagal menyimpan progres" }, 500);
  }
});

// POST /api/progress/sync
progressRouter.post("/sync", async (c) => {
  try {
    const userId = await getUserIdFromReq(c);
    const body = await c.req.json();
    const { xp, completedLevels, unlockedBadges, streak } = body;

    const synced = await storage.syncFullProgress(userId, {
      xp: xp || 0,
      completedLevels: completedLevels || {},
      unlockedBadges: unlockedBadges || [],
      streak: streak || { current: 0, longest: 0, lastActiveDate: null },
    });

    return c.json({ success: true, synced });
  } catch (err) {
    console.error("[Backend Progress] Sync error:", err);
    return c.json({ error: "Gagal sinkronisasi progres" }, 500);
  }
});
