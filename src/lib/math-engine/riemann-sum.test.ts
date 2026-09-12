import { describe, it, expect } from "vitest";
import {
  computeRiemannMetrics,
} from "./riemann-sum";

describe("Riemann Sum Pure Math Engine", () => {
  it("evaluates analytical definite integrals correctly", () => {
    // int_0^2 x^2 dx = 8/3 ~ 2.6667
    const resX2 = computeRiemannMetrics("x2", 0, 2, 10, "midpoint");
    expect(resX2.exactArea).toBeCloseTo(8 / 3, 5);

    // int_0^pi sin(x) dx = 2.0
    const resSin = computeRiemannMetrics("sin", 0, Math.PI, 10, "midpoint");
    expect(resSin.exactArea).toBeCloseTo(2.0, 5);
  });

  it("proves error converges to 0 as partition n increases", () => {
    const lowN = computeRiemannMetrics("x2", 0, 2, 4, "left");
    const highN = computeRiemannMetrics("x2", 0, 2, 50, "left");

    expect(highN.absError).toBeLessThan(lowN.absError);
    expect(highN.relErrorPercent).toBeLessThan(lowN.relErrorPercent);
  });

  it("verifies midpoint rule is more accurate than left rule for n = 4", () => {
    const leftRes = computeRiemannMetrics("x2", 0, 2, 4, "left");
    const midRes = computeRiemannMetrics("x2", 0, 2, 4, "midpoint");

    expect(midRes.absError).toBeLessThan(leftRes.absError);
  });

  it("produces exact area for linear functions using trapezoid rule", () => {
    // int_0^4 (0.5x + 1) dx = [0.25*16 + 4] = 8.0
    const trapRes = computeRiemannMetrics("linear", 0, 4, 2, "trapezoid");
    expect(trapRes.approxArea).toBeCloseTo(8.0, 5);
    expect(trapRes.absError).toBeCloseTo(0, 5);
  });
});
