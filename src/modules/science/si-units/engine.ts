/**
 * Pure calculation functions for SI Units & Dimensional Analysis
 * Strict type safety and defensive error handling (AGENTS.md)
 */

export interface PhysicalDimension {
  M: number; // Mass [kg]
  L: number; // Length [m]
  T: number; // Time [s]
}

export function areDimensionsEqual(d1: PhysicalDimension, d2: PhysicalDimension): boolean {
  return d1.M === d2.M && d1.L === d2.L && d1.T === d2.T;
}

export function multiplyDimensions(d1: PhysicalDimension, d2: PhysicalDimension): PhysicalDimension {
  return {
    M: d1.M + d2.M,
    L: d1.L + d2.L,
    T: d1.T + d2.T,
  };
}

export function divideDimensions(d1: PhysicalDimension, d2: PhysicalDimension): PhysicalDimension {
  return {
    M: d1.M - d2.M,
    L: d1.L - d2.L,
    T: d1.T - d2.T,
  };
}

export const BASE_DIMENSIONS = {
  length: { M: 0, L: 1, T: 0 },
  mass: { M: 1, L: 0, T: 0 },
  time: { M: 0, L: 0, T: 1 },
  velocity: { M: 0, L: 1, T: -1 },
  acceleration: { M: 0, L: 1, T: -2 },
  force: { M: 1, L: 1, T: -2 },
  energy: { M: 1, L: 2, T: -2 },
};

export function convertLength(value: number, from: "m" | "km" | "cm" | "mm", to: "m" | "km" | "cm" | "mm"): number {
  if (!Number.isFinite(value)) return 0;

  const toMetersMap: Record<string, number> = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
  };

  const inMeters = value * (toMetersMap[from] || 1);
  const outValue = inMeters / (toMetersMap[to] || 1);
  return outValue;
}
