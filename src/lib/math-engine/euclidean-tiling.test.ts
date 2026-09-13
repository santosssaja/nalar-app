import { describe, it, expect } from "vitest";
import {
  computeEuclideanDivisionSteps,
  computeEuclideanTiles,
  computeLCM,
  extendedEuclidBezout,
} from "./euclidean-tiling";

describe("Euclidean Tiling Math Engine", () => {
  it("computes division steps correctly for known GCD pairs", () => {
    // GCD(84, 52) = 4
    const steps = computeEuclideanDivisionSteps(84, 52);
    expect(steps.length).toBe(6);
    expect(steps[0]).toEqual({
      stepNumber: 1,
      dividend: 84,
      divisor: 52,
      quotient: 1,
      remainder: 32,
      isTerminal: false,
    });
    expect(steps[steps.length - 1]).toEqual({
      stepNumber: 6,
      dividend: 8,
      divisor: 4,
      quotient: 2,
      remainder: 0,
      isTerminal: true,
    });
  });

  it("handles coprimes correctly with GCD = 1", () => {
    const steps = computeEuclideanDivisionSteps(144, 89);
    // Fibonacci numbers 144 and 89 take 10 steps and GCD is 1
    expect(steps[steps.length - 1].divisor).toBe(1);
    expect(steps[steps.length - 1].remainder).toBe(0);
  });

  it("computes geometric tiles covering exact rectangle area", () => {
    const a = 12;
    const b = 8;
    const result = computeEuclideanTiles(a, b);

    expect(result.width).toBe(12);
    expect(result.height).toBe(8);
    expect(result.gcd).toBe(4);

    // Sum of areas of all squares must equal total rectangle area (12 * 8 = 96)
    const totalCoveredArea = result.tiles.reduce(
      (sum, tile) => sum + tile.size * tile.size,
      0
    );
    expect(totalCoveredArea).toBe(12 * 8);

    // First tile should be 8x8, second and third 4x4
    expect(result.tiles.length).toBe(3);
    expect(result.tiles[0].size).toBe(8);
    expect(result.tiles[1].size).toBe(4);
    expect(result.tiles[2].size).toBe(4);
  });

  it("handles square dimensions (a = b)", () => {
    const result = computeEuclideanTiles(10, 10);
    expect(result.gcd).toBe(10);
    expect(result.tiles.length).toBe(1);
    expect(result.tiles[0].size).toBe(10);
  });

  it("computes LCM correctly via duality with GCD", () => {
    // 60 and 45: gcd = 15, lcm = (60 * 45) / 15 = 180
    expect(computeLCM(60, 45)).toBe(180);
    expect(computeLCM(6, 8)).toBe(24);
  });

  it("finds Bezout coefficients correctly: a*x + b*y = gcd(a,b)", () => {
    const res = extendedEuclidBezout(7, 5);
    expect(res.gcd).toBe(1);
    expect(7 * res.x + 5 * res.y).toBe(1);

    const res2 = extendedEuclidBezout(42, 30);
    expect(res2.gcd).toBe(6);
    expect(42 * res2.x + 30 * res2.y).toBe(6);
  });
});
