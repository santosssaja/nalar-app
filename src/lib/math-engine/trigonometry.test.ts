import { describe, it, expect } from "vitest";
import {
  degToRad,
  radToDeg,
  normalizeDegrees,
  getQuadrant,
  computeUnitCircle,
  generateWavePoints,
} from "./trigonometry";

describe("Trigonometry Pure Math Engine", () => {
  it("converts between degrees and radians accurately", () => {
    expect(degToRad(180)).toBeCloseTo(Math.PI, 6);
    expect(degToRad(90)).toBeCloseTo(Math.PI / 2, 6);
    expect(radToDeg(Math.PI)).toBeCloseTo(180, 6);
    expect(radToDeg(Math.PI / 4)).toBeCloseTo(45, 6);
  });

  it("normalizes arbitrary angle degrees into [0, 360)", () => {
    expect(normalizeDegrees(0)).toBe(0);
    expect(normalizeDegrees(360)).toBe(0);
    expect(normalizeDegrees(720)).toBe(0);
    expect(normalizeDegrees(-90)).toBe(270);
    expect(normalizeDegrees(450)).toBe(90);
  });

  it("identifies quadrants correctly", () => {
    expect(getQuadrant(45)).toBe(1);
    expect(getQuadrant(120)).toBe(2);
    expect(getQuadrant(210)).toBe(3);
    expect(getQuadrant(315)).toBe(4);
  });

  it("computes unit circle coordinates and exact values for special angles", () => {
    const at0 = computeUnitCircle(0);
    expect(at0.cos).toBe(1);
    expect(at0.sin).toBe(0);
    expect(at0.tan).toBe(0);
    expect(at0.exactLabel?.rad).toBe("0");

    const at45 = computeUnitCircle(45);
    expect(at45.cos).toBeCloseTo(Math.SQRT1_2, 5);
    expect(at45.sin).toBeCloseTo(Math.SQRT1_2, 5);
    expect(at45.tan).toBeCloseTo(1, 5);
    expect(at45.exactLabel?.tan).toBe("1");

    const at180 = computeUnitCircle(180);
    expect(at180.cos).toBe(-1);
    expect(at180.sin).toBe(0);
  });

  it("detects undefined tangent at 90 and 270 degrees", () => {
    const at90 = computeUnitCircle(90);
    expect(at90.isTanUndefined).toBe(true);
    expect(at90.tan).toBeNull();

    const at270 = computeUnitCircle(270);
    expect(at270.isTanUndefined).toBe(true);
    expect(at270.tan).toBeNull();
  });

  it("maintains Pythagorean identity sin²(θ) + cos²(θ) = 1 for random angles", () => {
    const testAngles = [13.7, 57.3, 133.2, 221.8, 305.4];
    for (const angle of testAngles) {
      const { sin, cos } = computeUnitCircle(angle);
      const identity = sin * sin + cos * cos;
      expect(identity).toBeCloseTo(1, 6);
    }
  });

  it("generates wave point series for visualization", () => {
    const { sinPoints, cosPoints } = generateWavePoints(45, 30);
    expect(sinPoints.length).toBe(31);
    expect(cosPoints.length).toBe(31);
    expect(sinPoints[0][1]).toBeCloseTo(0, 5); // sin(0)
    expect(cosPoints[0][1]).toBeCloseTo(1, 5); // cos(0)
  });
});
