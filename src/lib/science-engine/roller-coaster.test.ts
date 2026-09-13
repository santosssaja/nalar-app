import { describe, it, expect } from "vitest";
import { calculateRollerCoaster } from "./roller-coaster";

describe("Roller Coaster Physics Engine", () => {
  it("calculates correct minimum height for vertical loop (h = 2.5 R)", () => {
    const res = calculateRollerCoaster({ initialHeight: 25, loopRadius: 10, mass: 500, gravity: 9.8 });
    expect(res.minLoopHeightRequired).toBe(25);
    expect(res.canCompleteLoop).toBe(true);
    expect(res.normalForceAtLoopTop).toBeCloseTo(0, 0); // At exact threshold N ≈ 0
  });

  it("identifies when cart cannot complete loop because height is insufficient (h < 2.5 R)", () => {
    // R = 10 -> h_min = 25m. If h0 = 20m, loop top (20m) can be reached, but speed is insufficient!
    const res = calculateRollerCoaster({ initialHeight: 20, loopRadius: 10, mass: 500, gravity: 9.8 });
    expect(res.canCompleteLoop).toBe(false);
    expect(res.speedAtLoopTop).toBeLessThan(res.criticalSpeedAtLoopTop);
  });

  it("conserves mechanical energy across different heights", () => {
    const res = calculateRollerCoaster({ initialHeight: 30, loopRadius: 8, mass: 400, gravity: 10 });
    // Total = 400 * 10 * 30 = 120,000 J
    expect(res.totalEnergy).toBe(120000);

    const bottom = res.energyAtHeight(0);
    expect(bottom.ep).toBe(0);
    expect(bottom.ek).toBe(120000);

    const mid = res.energyAtHeight(15);
    expect(mid.ep + mid.ek).toBeCloseTo(120000, 0);
  });

  it("handles extreme inputs defensively", () => {
    const res = calculateRollerCoaster({ initialHeight: 0, loopRadius: 0, mass: 0 });
    expect(Number.isFinite(res.speedAtBottom)).toBe(true);
    expect(res.canCompleteLoop).toBe(false);
  });
});
