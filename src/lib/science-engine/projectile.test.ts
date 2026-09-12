import { describe, it, expect } from "vitest";
import {
  computeProjectileMetrics,
  computeInstantaneousState,
} from "./projectile";

describe("Projectile Motion Science Engine", () => {
  it("proves 45 degrees yields maximum range on flat terrain", () => {
    const p45 = computeProjectileMetrics({ angleDegrees: 45, v0: 20, g: 9.8, h0: 0 });
    const p40 = computeProjectileMetrics({ angleDegrees: 40, v0: 20, g: 9.8, h0: 0 });
    const p50 = computeProjectileMetrics({ angleDegrees: 50, v0: 20, g: 9.8, h0: 0 });

    expect(p45.range).toBeGreaterThan(p40.range);
    expect(p45.range).toBeGreaterThan(p50.range);
  });

  it("proves complementary angles (30° and 60°) have identical range", () => {
    const p30 = computeProjectileMetrics({ angleDegrees: 30, v0: 25, g: 9.8, h0: 0 });
    const p60 = computeProjectileMetrics({ angleDegrees: 60, v0: 25, g: 9.8, h0: 0 });

    expect(p30.range).toBeCloseTo(p60.range, 3);
    // 60° achieves higher peak than 30°
    expect(p60.maxHeight).toBeGreaterThan(p30.maxHeight);
  });

  it("verifies instantaneous velocity at peak is strictly horizontal", () => {
    const params = { angleDegrees: 45, v0: 20, g: 9.8, h0: 0 };
    const metrics = computeProjectileMetrics(params);

    const peakState = computeInstantaneousState(params, metrics.timeToPeak);
    expect(peakState.vy).toBeCloseTo(0, 3);
    expect(peakState.vx).toBeCloseTo(metrics.v0x, 3);
    expect(peakState.speed).toBeCloseTo(metrics.v0x, 3);
    expect(peakState.y).toBeCloseTo(metrics.maxHeight, 3);
  });

  it("generates continuous sampled trajectory points", () => {
    const metrics = computeProjectileMetrics({ angleDegrees: 45, v0: 20, g: 9.8, h0: 5 }, 40);
    expect(metrics.trajectoryPoints.length).toBe(41);
    expect(metrics.trajectoryPoints[0]).toEqual([0, 5]); // starts at h0 = 5
    expect(metrics.trajectoryPoints[40][1]).toBeCloseTo(0, 2); // ends at ground
  });
});
