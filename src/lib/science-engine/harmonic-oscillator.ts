/**
 * Pure physics calculations for Simple Harmonic Motion (Pendulum and Mass-Spring).
 */

export interface PendulumParams {
  length: number; // L in meters (> 0)
  gravity?: number; // g in m/s^2, default 9.8
  initialAngleDeg: number; // theta0 in degrees
}

export interface PendulumMetrics {
  period: number; // T = 2*pi*sqrt(L/g)
  frequency: number; // f = 1/T
  angularFrequency: number; // omega = sqrt(g/L)
  angleAtTime: (t: number) => number; // theta(t) in radians
  angularVelocityAtTime: (t: number) => number;
}

export interface SpringParams {
  springConstant: number; // k in N/m (> 0)
  mass: number; // m in kg (> 0)
  amplitude: number; // A in meters
}

export interface SpringMetrics {
  period: number; // T = 2*pi*sqrt(m/k)
  frequency: number; // f = 1/T
  angularFrequency: number; // omega = sqrt(k/m)
  totalEnergy: number; // E = 0.5 * k * A^2
  positionAtTime: (t: number) => number; // x(t) = A*cos(omega*t)
  velocityAtTime: (t: number) => number;
}

export function calculatePendulum(params: PendulumParams): PendulumMetrics {
  const L = Math.max(0.1, params.length);
  const g = params.gravity ?? 9.8;
  const theta0Rad = (Math.min(80, Math.max(1, params.initialAngleDeg)) * Math.PI) / 180;

  const omega = Math.sqrt(g / L);
  const period = (2 * Math.PI) / omega;
  const frequency = 1 / period;

  return {
    period: Number(period.toFixed(2)),
    frequency: Number(frequency.toFixed(2)),
    angularFrequency: Number(omega.toFixed(2)),
    angleAtTime: (t: number) => theta0Rad * Math.cos(omega * t),
    angularVelocityAtTime: (t: number) => -theta0Rad * omega * Math.sin(omega * t),
  };
}

export function calculateSpring(params: SpringParams): SpringMetrics {
  const k = Math.max(1, params.springConstant);
  const m = Math.max(0.1, params.mass);
  const A = Math.max(0.01, params.amplitude);

  const omega = Math.sqrt(k / m);
  const period = (2 * Math.PI) / omega;
  const frequency = 1 / period;
  const totalEnergy = 0.5 * k * A * A;

  return {
    period: Number(period.toFixed(2)),
    frequency: Number(frequency.toFixed(2)),
    angularFrequency: Number(omega.toFixed(2)),
    totalEnergy: Number(totalEnergy.toFixed(2)),
    positionAtTime: (t: number) => A * Math.cos(omega * t),
    velocityAtTime: (t: number) => -A * omega * Math.sin(omega * t),
  };
}
