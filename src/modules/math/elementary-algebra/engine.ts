/**
 * Pure mathematical functions for Elementary Algebra
 * Strict type safety and defensive error handling (AGENTS.md)
 */

export interface LinearEquationResult {
  hasSolution: boolean;
  isIdentity: boolean;
  solution: number;
}

export function solveLinearEquation(a: number, b: number, c: number): LinearEquationResult {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    return { hasSolution: false, isIdentity: false, solution: 0 };
  }

  // ax + b = c => ax = c - b
  if (Math.abs(a) < 1e-9) {
    // 0x = c - b
    const isIdentity = Math.abs(c - b) < 1e-9;
    return { hasSolution: isIdentity, isIdentity, solution: 0 };
  }

  const solution = (c - b) / a;
  return { hasSolution: true, isIdentity: false, solution };
}

export function isScaleBalanced(leftSum: number, rightSum: number, tolerance = 1e-4): boolean {
  if (!Number.isFinite(leftSum) || !Number.isFinite(rightSum)) return false;
  return Math.abs(leftSum - rightSum) <= tolerance;
}

export function solve2x2LinearSystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): { hasUniqueSolution: boolean; x: number; y: number } {
  // a1*x + b1*y = c1
  // a2*x + b2*y = c2
  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-9) {
    return { hasUniqueSolution: false, x: 0, y: 0 };
  }

  const x = (c1 * b2 - c2 * b1) / det;
  const y = (a1 * c2 - a2 * c1) / det;
  return { hasUniqueSolution: true, x, y };
}
