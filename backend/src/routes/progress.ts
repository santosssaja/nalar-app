import { Hono } from "hono";
import { storage } from "../db/storage";
import { saveProgressSchema, syncProgressSchema } from "../validations/schemas";

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
    const rawBody = await c.req.json();
    const parsed = saveProgressSchema.safeParse(rawBody);

    if (!parsed.success) {
      return c.json(
        { error: parsed.error.issues.map((i) => i.message).join(", "), details: parsed.error.issues },
        400
      );
    }

    const { topicSlug, levelId, completed, score, xpEarned } = parsed.data;

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
    const rawBody = await c.req.json();
    const parsed = syncProgressSchema.safeParse(rawBody);

    if (!parsed.success) {
      return c.json(
        { error: parsed.error.issues.map((i) => i.message).join(", "), details: parsed.error.issues },
        400
      );
    }

    const { xp, completedLevels, unlockedBadges, streak } = parsed.data;

    const synced = await storage.syncFullProgress(userId, {
      xp,
      completedLevels,
      unlockedBadges,
      streak: {
        current: streak.current,
        longest: streak.longest,
        lastActiveDate: streak.lastActiveDate ?? null,
      },
    });

    return c.json({ success: true, synced });
  } catch (err) {
    console.error("[Backend Progress] Sync error:", err);
    return c.json({ error: "Gagal sinkronisasi progres" }, 500);
  }
});
