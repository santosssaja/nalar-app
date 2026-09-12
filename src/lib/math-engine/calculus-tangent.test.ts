import { describe, it, expect } from "vitest";
import {
  CALCULUS_FUNCTIONS,
  computeTangentMetrics,
  evaluateLinePoints,
} from "./calculus-tangent";

describe("Calculus Tangent Pure Engine", () => {
  it("evaluates functions and analytical derivatives accurately", () => {
    const x2 = CALCULUS_FUNCTIONS.x2;
    expect(x2.evaluate(3)).toBe(9);
    expect(x2.derivative(3)).toBe(6);

    const sin = CALCULUS_FUNCTIONS.sin;
    expect(sin.evaluate(0)).toBe(0);
    expect(sin.derivative(0)).toBe(1);

    const cubic = CALCULUS_FUNCTIONS.x3_minus_3x;
    expect(cubic.evaluate(2)).toBe(2); // 8 - 6
    expect(cubic.derivative(2)).toBe(9); // 12 - 3
  });

  it("proves secant slope approaches tangent slope as deltaX approaches 0", () => {
    // f(x) = x^2 at a = 2. f'(2) = 4.
    const largeDelta = computeTangentMetrics("x2", 2, 1.0);
    expect(largeDelta.secantSlope).toBe(5); // (3^2 - 2^2)/1 = 5
    expect(largeDelta.error).toBe(1.0);

    const smallDelta = computeTangentMetrics("x2", 2, 0.1);
    expect(smallDelta.secantSlope).toBeCloseTo(4.1, 4);
    expect(smallDelta.error).toBeCloseTo(0.1, 4);

    const tinyDelta = computeTangentMetrics("x2", 2, 0.001);
    expect(tinyDelta.secantSlope).toBeCloseTo(4.001, 3);
    expect(tinyDelta.tangentSlope).toBe(4);
    expect(tinyDelta.isConverged).toBe(true);
  });

  it("identifies horizontal tangents (zero derivative) at local extrema", () => {
    // f(x) = x^3 - 3x has extrema at x = 1 (local min) and x = -1 (local max)
    const at1 = computeTangentMetrics("x3_minus_3x", 1, 0.01);
    expect(at1.tangentSlope).toBe(0);

    const atMinus1 = computeTangentMetrics("x3_minus_3x", -1, 0.01);
    expect(atMinus1.tangentSlope).toBe(0);
  });

  it("evaluates line segment endpoints for cartesian plotting", () => {
    // Line passing through (0, 0) with slope 2: y = 2x
    const pts = evaluateLinePoints(2, 0, 0, -5, 5);
    expect(pts[0]).toEqual([-5, -10]);
    expect(pts[1]).toEqual([5, 10]);
  });
});
