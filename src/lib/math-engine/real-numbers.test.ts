import { describe, it, expect } from "vitest";
import {
  absoluteDistance,
  translatePoint,
  scaleVector,
  findMidpoint,
  simplifyFraction,
  approximateSquareRootBounds,
  computeDistributiveAreas,
  generateNumberLineTicks,
} from "./real-numbers";

describe("real-numbers math engine", () => {
  it("computes absolute distance correctly on 1D line", () => {
    expect(absoluteDistance(-4, 5)).toBe(9);
    expect(absoluteDistance(7, 2)).toBe(5);
    expect(absoluteDistance(-8, -2)).toBe(6);
    expect(absoluteDistance(0, 0)).toBe(0);
  });

  it("handles translation on number line including negative numbers", () => {
    expect(translatePoint(3, -7)).toBe(-4);
    expect(translatePoint(-5, 8)).toBe(3);
    expect(translatePoint(2, -5)).toBe(-3);
  });

  it("scales vectors from origin correctly, including reflection (-1) and dilatation", () => {
    expect(scaleVector(0, 3, 2)).toBe(6);
    expect(scaleVector(0, 3, -1)).toBe(-3);
    expect(scaleVector(0, -3, -2)).toBe(6);
    expect(scaleVector(2, 6, 0.5)).toBe(4);
  });

  it("finds midpoints between fractions and decimals", () => {
    expect(findMidpoint(0, 10)).toBe(5);
    expect(findMidpoint(-3, 7)).toBe(2);
    // 1/3 (approx 0.333333) and 1/2 (0.5) -> 5/12 (approx 0.416667)
    expect(findMidpoint(1 / 3, 1 / 2)).toBeCloseTo(5 / 12, 4);
  });

  it("simplifies fractions accurately", () => {
    expect(simplifyFraction(6, 8)).toEqual({ numerator: 3, denominator: 4 });
    expect(simplifyFraction(-15, 20)).toEqual({ numerator: -3, denominator: 4 });
    expect(simplifyFraction(14, 7)).toEqual({ numerator: 2, denominator: 1 });
    expect(() => simplifyFraction(5, 0)).toThrow();
  });

  it("finds correct integer bounds for square roots", () => {
    expect(approximateSquareRootBounds(2)).toEqual([1, 2]);
    expect(approximateSquareRootBounds(45)).toEqual([6, 7]);
    expect(approximateSquareRootBounds(25)).toEqual([5, 5]);
    expect(() => approximateSquareRootBounds(-4)).toThrow();
  });

  it("verifies distributive property areas", () => {
    const res = computeDistributiveAreas(4, 5, 3);
    expect(res.area1).toBe(20);
    expect(res.area2).toBe(12);
    expect(res.areaTotal).toBe(32);
    expect(res.isConsistent).toBe(true);
  });

  it("generates appropriate ticks for number line rendering", () => {
    const ticks = generateNumberLineTicks(0, 1, 400);
    expect(ticks.length).toBeGreaterThan(0);
    expect(ticks.some((t) => t.value === 0)).toBe(true);
  });
});
