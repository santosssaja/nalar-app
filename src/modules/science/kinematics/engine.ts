/**
 * Pure calculation functions for Kinematics (Flagship STEM Experience)
 * Strict type safety and defensive error handling (AGENTS.md)
 */

export interface Kinematics1DState {
  x0: number;
  v0: number;
  a: number;
  t: number;
}

export interface ProjectileState {
  x0: number;
  y0: number;
  v0: number;
  angleDeg: number;
  g: number;
  t: number;
}

export function position1D(x0: number, v0: number, a: number, t: number): number {
  if (!Number.isFinite(t) || t < 0) return x0;
  return x0 + v0 * t + 0.5 * a * t * t;
}

export function velocity1D(v0: number, a: number, t: number): number {
  if (!Number.isFinite(t) || t < 0) return v0;
  return v0 + a * t;
}

export function projectilePosition2D(state: ProjectileState): { x: number; y: number } {
  const safeT = Math.max(0, state.t);
  const theta = (state.angleDeg * Math.PI) / 180;
  const vx0 = state.v0 * Math.cos(theta);
  const vy0 = state.v0 * Math.sin(theta);
  const g = state.g > 0 ? state.g : 9.8;

  const x = state.x0 + vx0 * safeT;
  const y = Math.max(0, state.y0 + vy0 * safeT - 0.5 * g * safeT * safeT);

  return { x, y };
}

export function projectileMaxHeight(v0: number, angleDeg: number, g = 9.8): number {
  const theta = (angleDeg * Math.PI) / 180;
  const vy0 = v0 * Math.sin(theta);
  if (g <= 0) return 0;
  return (vy0 * vy0) / (2 * g);
}

export function projectileFlightTime(v0: number, angleDeg: number, g = 9.8): number {
  const theta = (angleDeg * Math.PI) / 180;
  const vy0 = v0 * Math.sin(theta);
  if (g <= 0) return 0;
  return (2 * vy0) / g;
}

export function projectileRange(v0: number, angleDeg: number, g = 9.8): number {
  const tTotal = projectileFlightTime(v0, angleDeg, g);
  const theta = (angleDeg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(theta);
  return vx0 * tTotal;
}
