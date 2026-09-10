import { describe, it, expect } from "vitest";
import {
  safeModulo,
  calculateGCD,
  areCoprime,
  isPrimeNumber,
  generateClockNodes,
  generateModularChords,
} from "./number-theory";

describe("Number Theory & Modular Arithmetic Engine", () => {
  it("computes standard and negative modulo correctly", () => {
    expect(safeModulo(14, 12)).toBe(2);
    expect(safeModulo(12, 12)).toBe(0);
    expect(safeModulo(-1, 12)).toBe(11);
    expect(safeModulo(-15, 12)).toBe(9);
    expect(safeModulo(0, 7)).toBe(0);
  });

  it("handles edge cases defensivly (division by zero)", () => {
    expect(safeModulo(5, 0)).toBe(0);
    expect(safeModulo(NaN, 12)).toBe(0);
  });

  it("calculates GCD using Euclidean algorithm", () => {
    expect(calculateGCD(48, 18)).toBe(6);
    expect(calculateGCD(101, 10)).toBe(1);
    expect(calculateGCD(12, 4)).toBe(4);
    expect(calculateGCD(0, 5)).toBe(5);
  });

  it("identifies coprime pairs", () => {
    expect(areCoprime(8, 9)).toBe(true);
    expect(areCoprime(14, 21)).toBe(false);
  });

  it("checks prime numbers accurately", () => {
    expect(isPrimeNumber(1)).toBe(false);
    expect(isPrimeNumber(2)).toBe(true);
    expect(isPrimeNumber(17)).toBe(true);
    expect(isPrimeNumber(18)).toBe(false);
    expect(isPrimeNumber(97)).toBe(true);
  });

  it("generates clock nodes spaced evenly", () => {
    const nodes = generateClockNodes(4, 100, { x: 0, y: 0 });
    expect(nodes.length).toBe(4);
    // Node 0 should be at 12 o'clock: x ≈ 0, y ≈ -100
    expect(Math.abs(nodes[0].x)).toBeLessThan(0.01);
    expect(nodes[0].y).toBe(-100);
  });

  it("generates modular chords for multiplication", () => {
    const chords = generateModularChords(10, 2, 0);
    expect(chords.length).toBe(10);
    // Node 3 connects to (3 * 2) mod 10 = 6
    expect(chords[3]).toEqual({ fromIndex: 3, toIndex: 6 });
    // Node 7 connects to (7 * 2) mod 10 = 14 mod 10 = 4
    expect(chords[7]).toEqual({ fromIndex: 7, toIndex: 4 });
  });
});
