import { describe, it, expect } from "vitest";
import {
  calculateDeterminant2D,
  transformVector2D,
  calculateAreaScaling,
  isOrientationReversed,
  isSingularMatrix,
} from "./linear-algebra";

describe("Linear Algebra Engine (Pure Math)", () => {
  it("computes standard identity matrix determinant as 1", () => {
    const identity = { a: 1, b: 0, c: 0, d: 1 };
    expect(calculateDeterminant2D(identity)).toBe(1);
    expect(calculateAreaScaling(identity)).toBe(1);
    expect(isSingularMatrix(identity)).toBe(false);
    expect(isOrientationReversed(identity)).toBe(false);
  });

  it("computes scaling matrix determinant correctly", () => {
    const scale = { a: 2, b: 0, c: 0, d: 3 };
    expect(calculateDeterminant2D(scale)).toBe(6);
    expect(calculateAreaScaling(scale)).toBe(6);
  });

  it("detects singular matrix when columns are linearly dependent", () => {
    const singular = { a: 2, b: 4, c: 1, d: 2 }; // det = (2)(2) - (4)(1) = 0
    expect(calculateDeterminant2D(singular)).toBe(0);
    expect(isSingularMatrix(singular)).toBe(true);
  });

  it("detects reversed orientation for negative determinant", () => {
    const reflection = { a: -1, b: 0, c: 0, d: 1 };
    expect(calculateDeterminant2D(reflection)).toBe(-1);
    expect(calculateAreaScaling(reflection)).toBe(1);
    expect(isOrientationReversed(reflection)).toBe(true);
  });

  it("safely transforms 2D vectors", () => {
    const shear = { a: 1, b: 2, c: 0, d: 1 };
    const vec = { x: 1, y: 1 };
    const transformed = transformVector2D(shear, vec);
    expect(transformed).toEqual({ x: 3, y: 1 });
  });

  it("defensively handles NaN or Infinity without crashing", () => {
    const invalid = { a: NaN, b: 0, c: Infinity, d: 1 };
    expect(calculateDeterminant2D(invalid)).toBe(0);
  });
});
