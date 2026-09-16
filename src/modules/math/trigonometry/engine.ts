/**
 * Pure mathematical functions for Trigonometry & Unit Circle
 * Strict type safety and defensive error handling (AGENTS.md)
 */

export function degToRad(degrees: number): number {
  if (!Number.isFinite(degrees)) return 0;
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  if (!Number.isFinite(radians)) return 0;
  return (radians * 180) / Math.PI;
}

export function polarToCartesian(radius: number, angleRad: number): { x: number; y: number } {
  const safeR = Number.isFinite(radius) ? radius : 1;
  const safeTheta = Number.isFinite(angleRad) ? angleRad : 0;

  return {
    x: safeR * Math.cos(safeTheta),
    y: safeR * Math.sin(safeTheta),
  };
}

export function decomposeVector(magnitude: number, angleDeg: number): { vx: number; vy: number } {
  const safeMag = Number.isFinite(magnitude) ? magnitude : 0;
  const theta = degToRad(angleDeg);

  return {
    vx: safeMag * Math.cos(theta),
    vy: safeMag * Math.sin(theta),
  };
}

export function verifyPythagoreanIdentity(angleRad: number, tolerance = 1e-6): boolean {
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  return Math.abs(sinVal * sinVal + cosVal * cosVal - 1) <= tolerance;
}
