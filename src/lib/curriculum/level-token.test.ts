import { describe, it, expect } from "vitest";
import {
  getLevelToken,
  resolveLevelToken,
  isLevelUnlocked,
} from "./level-token";

describe("level-token utility", () => {
  const slug = "linear-algebra-determinant-2d";

  it("generates unpatterned, non-sequential tokens for levels", () => {
    const t1 = getLevelToken(slug, 1);
    const t2 = getLevelToken(slug, 2);
    const t3 = getLevelToken(slug, 3);

    expect(t1).toMatch(/^tk-[a-f0-9]{6}$/);
    expect(t2).toMatch(/^tk-[a-f0-9]{6}$/);
    expect(t3).toMatch(/^tk-[a-f0-9]{6}$/);

    // Tokens must be unique and not simple arithmetic increments
    expect(t1).not.toBe(t2);
    expect(t2).not.toBe(t3);
    expect(t1).not.toBe(t3);
  });

  it("resolves valid tokens correctly to 1-indexed integers", () => {
    const t1 = getLevelToken(slug, 1);
    const t2 = getLevelToken(slug, 2);

    expect(resolveLevelToken(slug, t1, 3)).toBe(1);
    expect(resolveLevelToken(slug, t2, 3)).toBe(2);
  });

  it("strictly rejects raw integers ('1', '2', '3') and random strings", () => {
    expect(resolveLevelToken(slug, "1", 3)).toBeNull();
    expect(resolveLevelToken(slug, "2", 3)).toBeNull();
    expect(resolveLevelToken(slug, "3", 3)).toBeNull();
    expect(resolveLevelToken(slug, "random-token", 3)).toBeNull();
  });

  it("validates level unlock prerequisites accurately", () => {
    // Level 1 is always unlocked
    expect(isLevelUnlocked(1, [])).toBe(true);

    // Level 2 is locked when Level 1 is not completed
    expect(isLevelUnlocked(2, [])).toBe(false);

    // Level 2 unlocks once Level 1 is completed
    expect(isLevelUnlocked(2, [1])).toBe(true);

    // Level 3 is locked when only Level 1 is completed
    expect(isLevelUnlocked(3, [1])).toBe(false);

    // Level 3 unlocks once Level 2 is completed
    expect(isLevelUnlocked(3, [1, 2])).toBe(true);
  });
});
