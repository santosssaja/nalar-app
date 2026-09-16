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

// Allowed CORS origins
const allowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS ||
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Global CORS Whitelist
app.use(
  "*",
  cors({
    origin: (origin) => {
      // Allow requests with no origin (curl, same-origin, test runner, server-to-server)
      if (!origin) return "*";
      // Allow matching whitelist
      if (allowedOrigins.includes(origin)) return origin;
      // Allow localhost and local IP in development
      if (
        process.env.NODE_ENV !== "production" &&
        (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
          origin.endsWith(".vercel.app"))
      ) {
        return origin;
      }
      return null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Guest-Id"],
    credentials: true,
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

