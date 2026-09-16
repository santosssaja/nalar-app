/**
 * Pure mathematical functions for Real Numbers & Number Line
 * Strict type safety and defensive error handling (AGENTS.md)
 */

export interface RealNumberState {
  point1: number;
  point2: number;
  scaleFactor: number;
  zoomLevel: number;
}

export function translatePoint(point: number, delta: number): number {
  if (!Number.isFinite(point) || !Number.isFinite(delta)) return 0;
  return point + delta;
}

export function scalePoint(point: number, factor: number): number {
  if (!Number.isFinite(point) || !Number.isFinite(factor)) return 0;
  return point * factor;
}

export function midpoint(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  return (a + b) / 2;
}

export function distanceBetween(a: number, b: number): number {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  return Math.abs(a - b);
}

export function distributiveLawArea(a: number, b: number, c: number): {
  leftArea: number;
  rightArea: number;
  totalArea: number;
} {
  const safeA = Number.isFinite(a) ? a : 0;
  const safeB = Number.isFinite(b) ? b : 0;
  const safeC = Number.isFinite(c) ? c : 0;

  const leftArea = safeA * safeB;
  const rightArea = safeA * safeC;
  const totalArea = safeA * (safeB + safeC);

  return { leftArea, rightArea, totalArea };
}
