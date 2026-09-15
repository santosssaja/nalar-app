import { Hono } from "hono";
import { storage } from "../db/storage";

export const leaderboardRouter = new Hono();

leaderboardRouter.get("/", async (c) => {
  const limitParam = c.req.query("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const entries = await storage.getLeaderboard(limit);

  return c.json({
    leaderboard: entries,
    timestamp: new Date().toISOString(),
  });
});
