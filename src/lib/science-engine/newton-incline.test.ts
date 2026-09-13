import { describe, it, expect } from "vitest";
import { calculateInclineForces } from "./newton-incline";

describe("Newton Incline Physics Engine", () => {
  it("calculates static equilibrium on a flat surface (0 degrees)", () => {
    const res = calculateInclineForces({ mass: 10, angleDeg: 0, frictionCoeff: 0.3, gravity: 9.8 });
    expect(res.weight).toBe(98);
    expect(res.normalForce).toBe(98);
    expect(res.weightParallel).toBe(0);
    expect(res.isSliding).toBe(false);
    expect(res.acceleration).toBe(0);
  });

  it("calculates sliding acceleration with friction on a 45 degree incline", () => {
    const res = calculateInclineForces({ mass: 2, angleDeg: 45, frictionCoeff: 0.2, gravity: 10 });
    // W = 20
    // W_par = 20 * sin(45) ~= 14.14
    // N = 20 * cos(45) ~= 14.14
    // f_k = 0.2 * 14.14 = 2.83
    // F_net = 14.14 - 2.83 = 11.31
    // a = 11.31 / 2 = 5.66
    expect(res.isSliding).toBe(true);
    expect(res.acceleration).toBeCloseTo(5.66, 1);
    expect(res.finalVelocity).toBeGreaterThan(0);
  });

  it("identifies static friction holding block at shallow angle", () => {
    // tan(15 deg) ~= 0.268. If mu = 0.5, block will not slide!
    const res = calculateInclineForces({ mass: 5, angleDeg: 15, frictionCoeff: 0.5, gravity: 9.8 });
    expect(res.isSliding).toBe(false);
    expect(res.acceleration).toBe(0);
    expect(res.timeToBottom).toBe(Infinity);
  });

  it("handles extreme boundary values without NaN or crash", () => {
    const zeroMass = calculateInclineForces({ mass: 0, angleDeg: 90, frictionCoeff: -1 });
    expect(Number.isNaN(zeroMass.acceleration)).toBe(false);
    expect(zeroMass.normalForce).toBeGreaterThanOrEqual(0);
  });
});
