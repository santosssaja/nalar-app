/**
 * Pure mathematical functions for Functions & Graphs
 * Strict type safety and defensive error handling (AGENTS.md)
 */

export function evaluateLinear(x: number, m: number, c: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(m) || !Number.isFinite(c)) return 0;
  return m * x + c;
}

export function evaluateQuadratic(x: number, a: number, b: number, c: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) return 0;
  return a * x * x + b * x + c;
}

export function transformPoint(
  x: number,
  y: number,
  horizontalShift: number,
  verticalShift: number,
  verticalScale: number
): { x: number; y: number } {
  const safeScale = Number.isFinite(verticalScale) ? verticalScale : 1;
  const safeH = Number.isFinite(horizontalShift) ? horizontalShift : 0;
  const safeK = Number.isFinite(verticalShift) ? verticalShift : 0;

  return {
    x: x + safeH,
    y: safeScale * y + safeK,
  };
}

export function averageRateOfChange(
  fn: (x: number) => number,
  x1: number,
  x2: number
): number {
  if (Math.abs(x2 - x1) < 1e-9) return 0;
  const y1 = fn(x1);
  const y2 = fn(x2);
  if (!Number.isFinite(y1) || !Number.isFinite(y2)) return 0;
  return (y2 - y1) / (x2 - x1);
}
