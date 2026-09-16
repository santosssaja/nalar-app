import { describe, it, expect } from "vitest";
import { app } from "./index";

describe("Hono Server API", () => {
  it("GET /api/health returns 200 OK", async () => {
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe("ok");
    expect(data.service).toBe("nalar-backend");
  });

  it("GET /api/leaderboard returns ranked learners", async () => {
    const res = await app.request("/api/leaderboard");
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.leaderboard)).toBe(true);
    expect(data.leaderboard.length).toBeGreaterThan(0);
    expect(data.leaderboard[0].rank).toBe(1);
    expect(data.leaderboard[0].totalXp).toBeGreaterThanOrEqual(data.leaderboard[1]?.totalXp || 0);
  });

  it("POST /api/auth/register and login flow", async () => {
    const email = `test_${Date.now()}@example.com`;
    const regRes = await app.request("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Siswa Perintis",
        email,
        password: "secretpassword123",
      }),
    });
    expect(regRes.status).toBe(200);
    const regData = await regRes.json();
    expect(regData.user.email).toBe(email);
    expect(regData.token).toBeDefined();

    // Verify /api/auth/me with token
    const meRes = await app.request("/api/auth/me", {
      headers: { Authorization: `Bearer ${regData.token}` },
    });
    expect(meRes.status).toBe(200);
    const meData = await meRes.json();
    expect(meData.user.email).toBe(email);
  });

  it("POST /api/progress/save and sync flow", async () => {
    const guestRes = await app.request("/api/auth/guest", { method: "POST" });
    const guestData = await guestRes.json();
    const token = guestData.token;

    // Save progress
    const saveRes = await app.request("/api/progress/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        topicSlug: "math-real-numbers-line",
        levelId: "tk-1b1d42",
        completed: true,
        score: 100,
        xpEarned: 40,
      }),
    });
    expect(saveRes.status).toBe(200);

    // Sync with conflict resolution
    const syncRes = await app.request("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        xp: 120, // client has 120, server had 40 -> resolved should be 120
        completedLevels: { "physics-projectile-motion:tk-cannon-1": true },
        unlockedBadges: ["first-step"],
        streak: { current: 3, longest: 5, lastActiveDate: "2026-09-15" },
      }),
    });
    expect(syncRes.status).toBe(200);
    const syncData = await syncRes.json();
    expect(syncData.resolved.xp).toBe(120);
    expect(syncData.resolved.completedLevels["math-real-numbers-line:tk-1b1d42"]).toBe(true);
    expect(syncData.resolved.completedLevels["physics-projectile-motion:tk-cannon-1"]).toBe(true);
    expect(syncData.resolved.unlockedBadges).toContain("first-step");
  });

  it("POST /api/hints returns pedagogical guidance", async () => {
    const hintRes = await app.request("/api/hints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicSlug: "math-real-numbers-line",
        challengeQuestion: "Tentukan posisi titik setelah translasi",
        hintLevel: 3,
        userAttempts: [{ value: 5, timestamp: Date.now() }],
      }),
    });
    expect(hintRes.status).toBe(200);
    const hintData = await hintRes.json();
    expect(hintData.hintLevel).toBe(3);
    expect(hintData.title).toBeDefined();
    expect(hintData.text).toBeDefined();
    expect(["gemma", "mock"]).toContain(hintData.source);
  });

  it("POST /api/hints rejects invalid input with 400 Bad Request", async () => {
    const res = await app.request("/api/hints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicSlug: "invalid topic with spaces & symbols!",
        challengeQuestion: "",
        hintLevel: 99, // out of range
      }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("POST /api/progress/save rejects malformed requests with 400", async () => {
    const res = await app.request("/api/progress/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicSlug: "",
      }),
    });
    expect(res.status).toBe(400);
  });
});

