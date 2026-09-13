import { describe, it, expect } from "vitest";
import { calculatePendulum, calculateSpring } from "./harmonic-oscillator";

describe("Harmonic Oscillator Physics Engine", () => {
  it("calculates 1-second pendulum period (L ≈ 0.248m under g = 9.8)", () => {
    // T = 1s -> L = g * (T/(2*pi))^2 = 9.8 / (4*pi^2) ≈ 0.2482 m
    const p = calculatePendulum({ length: 0.248, initialAngleDeg: 10, gravity: 9.8 });
    expect(p.period).toBeCloseTo(1.0, 1);
    expect(p.frequency).toBeCloseTo(1.0, 1);
  });

  it("oscillates periodically within expected amplitude bounds", () => {
    const p = calculatePendulum({ length: 1, initialAngleDeg: 20, gravity: 9.8 });
    const theta0 = (20 * Math.PI) / 180;
    expect(p.angleAtTime(0)).toBeCloseTo(theta0, 2);
    expect(p.angleAtTime(p.period / 2)).toBeCloseTo(-theta0, 2);
    expect(p.angleAtTime(p.period)).toBeCloseTo(theta0, 2);
  });

  it("calculates mass-spring period and energy", () => {
    // k = 100 N/m, m = 1 kg, A = 0.2 m
    // omega = sqrt(100/1) = 10 rad/s
    // T = 2*pi / 10 ≈ 0.628 s
    // E = 0.5 * 100 * 0.2^2 = 2.0 J
    const s = calculateSpring({ springConstant: 100, mass: 1, amplitude: 0.2 });
    expect(s.period).toBeCloseTo(0.63, 2);
    expect(s.totalEnergy).toBe(2.0);
    expect(s.positionAtTime(0)).toBe(0.2);
    expect(s.velocityAtTime(0)).toBeCloseTo(0, 2);
  });

  it("handles boundary values safely without NaN", () => {
    const p = calculatePendulum({ length: 0, initialAngleDeg: 0 });
    expect(Number.isFinite(p.period)).toBe(true);

    const s = calculateSpring({ springConstant: 0, mass: 0, amplitude: 0 });
    expect(Number.isFinite(s.period)).toBe(true);
  });
});
