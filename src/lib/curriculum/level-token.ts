/**
 * Pure utility to generate and resolve non-guessable, obfuscated level tokens
 * and validate level unlock prerequisites.
 */

export const LEVEL_SALT = "nalar_stem_seed_2026";

/**
 * Generates an obfuscated, non-sequential token for a level.
 * Example output: "tk-8f2a1c"
 */
export function getLevelToken(topicSlug: string, levelIndex: number): string {
  const key = `${topicSlug}:level:${levelIndex}:${LEVEL_SALT}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;

  for (let i = 0; i < key.length; i++) {
    const code = key.charCodeAt(i);
    h1 ^= code;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= (h1 + code);
    h2 = Math.imul(h2, 0x5bd1e995);
  }

  const hex = ((h1 ^ h2) >>> 0).toString(16).padStart(8, "0");
  return `tk-${hex.slice(0, 6)}`;
}

/**
 * Resolves a URL parameter (e.g. "tk-8f2a1c") to its 1-indexed level number.
 * Raw numeric values like "1", "2", "3" will return null by default to prevent guessing.
 */
export function resolveLevelToken(
  topicSlug: string,
  param: string,
  maxLevels: number
): number | null {
  if (!param || typeof param !== "string") return null;

  for (let i = 1; i <= maxLevels; i++) {
    if (getLevelToken(topicSlug, i) === param) {
      return i;
    }
  }

  return null;
}

/**
 * Validates whether a specific level is unlocked for the user.
 * Level 1 is always unlocked.
 * Level N (N > 1) is unlocked only if level N-1 has been completed.
 */
export function isLevelUnlocked(
  levelIndex: number,
  completedLevelIndexes: number[]
): boolean {
  if (levelIndex <= 1) return true;
  return completedLevelIndexes.includes(levelIndex - 1);
}
