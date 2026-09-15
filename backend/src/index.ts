import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { serve } from "@hono/node-server";
import { authRouter } from "./routes/auth";
import { progressRouter } from "./routes/progress";
import { hintsRouter } from "./routes/hints";
import { leaderboardRouter } from "./routes/leaderboard";
import { syncRouter } from "./routes/sync";
import { authMiddleware } from "./middleware/auth";
import { rateLimitMiddleware } from "./middleware/rate-limit";

export const app = new Hono().basePath("/api");

// Global CORS
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Guest-Id"],
  })
);

// Global session resolver
app.use("*", authMiddleware);

// Health check
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "nalar-backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// Mount routes
app.route("/auth", authRouter);
app.route("/progress", progressRouter);
app.use("/hints/*", rateLimitMiddleware(15, 60 * 1000));
app.route("/hints", hintsRouter);
app.route("/leaderboard", leaderboardRouter);
app.route("/sync", syncRouter);

app.notFound((c) => c.json({ error: "Endpoint tidak ditemukan" }, 404));

app.onError((err, c) => {
  console.error("[Nalar Backend Error]:", err);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

// Only start standalone HTTP listener if executed directly as entrypoint
const isDirectEntry =
  typeof process !== "undefined" &&
  process.argv[1] &&
  (process.argv[1].endsWith("index.ts") || process.argv[1].endsWith("index.js"));

if (isDirectEntry) {
  const port = Number(process.env.PORT) || 8000;
  console.log(`[Nalar Backend] Server running on http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}

export const vercelHandlers = {
  GET: handle(app),
  POST: handle(app),
  PUT: handle(app),
  DELETE: handle(app),
  OPTIONS: handle(app),
};

