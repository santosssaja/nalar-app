/**
 * Pure Science Engine: Kinematika Gerak Proyektil (Projectile Motion)
 * Menghitung lintasan parabola, komponen kecepatan horizontal & vertikal,
 * waktu terbang, tinggi maksimum, dan jangkauan tembak.
 */

export interface ProjectileParams {
  angleDegrees: number;
  v0: number; // Kecepatan awal (m/s)
  g: number; // Percepatan gravitasi (m/s^2)
  h0: number; // Ketinggian awal peluncuran (m)
}

export interface ProjectileMetrics {
  angleDegrees: number;
  angleRadians: number;
  v0: number;
  g: number;
  h0: number;
  v0x: number;
  v0y: number;
  timeToPeak: number;
  maxHeight: number;
  flightTime: number;
  range: number;
  trajectoryPoints: [number, number][];
}

export function computeProjectileMetrics(
  params: ProjectileParams,
  sampleCount: number = 60
): ProjectileMetrics {
  const { angleDegrees, v0, g, h0 } = params;
  const safeG = Math.max(0.1, g);
  const angleRadians = (angleDegrees * Math.PI) / 180;

  const v0x = v0 * Math.cos(angleRadians);
  const v0y = v0 * Math.sin(angleRadians);

  const timeToPeak = Math.max(0, v0y / safeG);
  const maxHeight = h0 + (v0y * v0y) / (2 * safeG);

  // Waktu jatuh ke tanah: h0 + v0y*t - 0.5*g*t^2 = 0
  const discriminant = v0y * v0y + 2 * safeG * h0;
  const flightTime = Math.max(0, (v0y + Math.sqrt(Math.max(0, discriminant))) / safeG);
  const range = v0x * flightTime;

  const trajectoryPoints: [number, number][] = [];
  for (let i = 0; i <= sampleCount; i++) {
    const t = (i / sampleCount) * flightTime;
    const x = v0x * t;
    const y = Math.max(0, h0 + v0y * t - 0.5 * safeG * t * t);
    trajectoryPoints.push([x, y]);
  }

  return {
    angleDegrees,
    angleRadians,
    v0,
    g: safeG,
    h0,
    v0x,
    v0y,
    timeToPeak,
    maxHeight,
    flightTime,
    range,
    trajectoryPoints,
  };
}

export function computeInstantaneousState(
  params: ProjectileParams,
  t: number
): {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  isGrounded: boolean;
} {
  const metrics = computeProjectileMetrics(params, 10);
  const clampedT = Math.max(0, Math.min(metrics.flightTime, t));

  const x = metrics.v0x * clampedT;
  const y = Math.max(0, params.h0 + metrics.v0y * clampedT - 0.5 * metrics.g * clampedT * clampedT);
  const vx = metrics.v0x;
  const vy = metrics.v0y - metrics.g * clampedT;
  const speed = Math.sqrt(vx * vx + vy * vy);
  const isGrounded = clampedT >= metrics.flightTime;

  return { x, y, vx, vy, speed, isGrounded };
}
