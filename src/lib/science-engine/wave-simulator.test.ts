import { describe, it, expect } from "vitest";
import { calculateWave, calculateInterference } from "./wave-simulator";

describe("Wave Simulator Physics Engine", () => {
  it("calculates correct wave speed and parameters (v = f * lambda)", () => {
    // f = 2 Hz, lambda = 4 m -> v = 8 m/s, T = 0.5 s, k = 2pi/4 = pi/2 ≈ 1.571
    const w = calculateWave({ amplitude: 0.5, frequency: 2, wavelength: 4 });
    expect(w.waveSpeed).toBe(8.0);
    expect(w.period).toBe(0.5);
    expect(w.waveNumber).toBeCloseTo(1.571, 2);
  });

  it("calculates wave displacement according to sinusoidal equation", () => {
    const w = calculateWave({ amplitude: 1.0, frequency: 1, wavelength: 2, phaseDeg: 0 });
    // at x = 0, t = 0: y = 0
    expect(w.displacementAt(0, 0)).toBeCloseTo(0, 4);
    // at x = lambda/4 = 0.5, t = 0: k*x = (pi) * 0.5 = pi/2 -> sin(pi/2) = 1.0
    expect(w.displacementAt(0.5, 0)).toBeCloseTo(1.0, 4);
  });

  it("detects constructive and destructive interference", () => {
    const constr = calculateInterference({
      wave1: { amplitude: 0.5, frequency: 2, wavelength: 2, phaseDeg: 0 },
      wave2: { amplitude: 0.5, frequency: 2, wavelength: 2, phaseDeg: 0 },
    });
    expect(constr.isConstructive).toBe(true);
    expect(constr.isDestructive).toBe(false);
    expect(constr.resultantDisplacementAt(0.5, 0)).toBeCloseTo(2.0 * 0.5, 2); // Doubled amplitude!

    const destr = calculateInterference({
      wave1: { amplitude: 0.5, frequency: 2, wavelength: 2, phaseDeg: 0 },
      wave2: { amplitude: 0.5, frequency: 2, wavelength: 2, phaseDeg: 180 },
    });
    expect(destr.isDestructive).toBe(true);
    expect(destr.isConstructive).toBe(false);
    expect(destr.resultantDisplacementAt(0.5, 0)).toBeCloseTo(0, 4); // Canceled out!
  });

  it("handles extreme values defensively", () => {
    const w = calculateWave({ amplitude: 0, frequency: 0, wavelength: 0 });
    expect(Number.isFinite(w.waveSpeed)).toBe(true);
    expect(Number.isFinite(w.period)).toBe(true);
  });
});
