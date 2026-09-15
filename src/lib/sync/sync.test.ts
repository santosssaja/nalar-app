import { describe, it, expect } from "vitest";
import { resolveProgressConflict, LocalGamificationState, ServerSyncData } from "./conflict-resolver";
import { importBackupFromJson } from "./export-import";

describe("Phase 3 - Conflict Resolver & Sync Engine", () => {
  it("resolves XP monotonically (takes highest XP)", () => {
    const local: LocalGamificationState = {
      xp: 240,
      level: 3,
      unlockedBadges: ["first-step"],
      completedLevels: { "math-real-numbers-line:tk-1": true },
      streak: { currentStreak: 2, longestStreak: 4, lastActiveDate: "2026-09-14" },
    };

    const server: ServerSyncData = {
      xp: 320, // server has more XP
      completedLevels: { "physics-projectile-motion:tk-cannon-1": true },
      unlockedBadges: ["first-step", "modular-master"],
      streak: { current: 3, longest: 5, lastActiveDate: "2026-09-15" },
    };

    const resolved = resolveProgressConflict(local, server);
    expect(resolved.xp).toBe(320);
    expect(resolved.level).toBe(4); // floor(320/100) + 1 = 4
  });

  it("unions completed levels from both local and server without data loss", () => {
    const local: LocalGamificationState = {
      xp: 100,
      level: 2,
      unlockedBadges: [],
      completedLevels: {
        "math-real-numbers-line:tk-1": true,
        "math-real-numbers-line:tk-2": true,
      },
      streak: { currentStreak: 1, longestStreak: 1, lastActiveDate: null },
    };

    const server: ServerSyncData = {
      xp: 80,
      completedLevels: {
        "physics-projectile-motion:tk-cannon-1": true,
      },
      unlockedBadges: ["first-step"],
      streak: { current: 1, longest: 1, lastActiveDate: null },
    };

    const resolved = resolveProgressConflict(local, server);
    expect(resolved.completedLevels["math-real-numbers-line:tk-1"]).toBe(true);
    expect(resolved.completedLevels["math-real-numbers-line:tk-2"]).toBe(true);
    expect(resolved.completedLevels["physics-projectile-motion:tk-cannon-1"]).toBe(true);
    expect(resolved.unlockedBadges).toContain("first-step");
  });

  it("validates backup JSON import schema", () => {
    const validJson = JSON.stringify({
      version: "1.0",
      app: "nalar",
      exportedAt: "2026-09-15T00:00:00.000Z",
      data: {
        xp: 500,
        level: 6,
        unlockedBadges: ["first-step", "modular-master"],
        completedLevels: {},
        streak: { currentStreak: 5, longestStreak: 7, lastActiveDate: null },
      },
    });

    const res = importBackupFromJson(validJson);
    expect(res.success).toBe(true);

    const invalidJson = JSON.stringify({
      version: "1.0",
      app: "unknown-app",
      data: {},
    });
    const resInvalid = importBackupFromJson(invalidJson);
    expect(resInvalid.success).toBe(false);
  });
});
