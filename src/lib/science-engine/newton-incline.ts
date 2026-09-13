/**
 * Pure physics calculations for Newton's laws on an inclined plane.
 * Zero external dependencies, pure functions for unit testing.
 */

export interface InclineParams {
  mass: number; // kg (> 0)
  angleDeg: number; // degrees [0, 85]
  frictionCoeff: number; // mu [0, 1.5]
  gravity?: number; // m/s^2, default 9.8
  inclineLength?: number; // meters (> 0), default 10
}

export interface InclineForces {
  weight: number; // W = m*g
  weightParallel: number; // W_parallel = m*g*sin(theta)
  weightPerpendicular: number; // W_perp = m*g*cos(theta)
  normalForce: number; // N = W_perp
  frictionForce: number; // f_k = mu*N (or static f_s = W_parallel if static)
  isSliding: boolean; // true if W_parallel > f_max
  netForce: number; // F_net = W_parallel - f_k
  acceleration: number; // a = F_net / m
  timeToBottom: number; // t = sqrt(2L/a) or Infinity if stationary
  finalVelocity: number; // v = sqrt(2*a*L) or 0
}

export function calculateInclineForces(params: InclineParams): InclineForces {
  const mass = Math.max(0.1, params.mass || 1);
  const angleDeg = Math.max(0, Math.min(85, params.angleDeg ?? 30));
  const mu = Math.max(0, params.frictionCoeff ?? 0.2);
  const g = params.gravity ?? 9.8;
  const length = Math.max(0.5, params.inclineLength ?? 10);

  const rad = (angleDeg * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);

  const weight = mass * g;
  const weightParallel = weight * sin;
  const weightPerpendicular = weight * cos;
  const normalForce = weightPerpendicular;

  const maxStaticFriction = mu * normalForce;
  const isSliding = weightParallel > maxStaticFriction;

  let frictionForce = 0;
  let netForce = 0;
  let acceleration = 0;
  let timeToBottom = Infinity;
  let finalVelocity = 0;

  if (isSliding) {
    frictionForce = mu * normalForce;
    netForce = Math.max(0, weightParallel - frictionForce);
    acceleration = netForce / mass;

    if (acceleration > 0.0001) {
      timeToBottom = Math.sqrt((2 * length) / acceleration);
      finalVelocity = Math.sqrt(2 * acceleration * length);
    }
  } else {
    // Static equilibrium
    frictionForce = weightParallel;
    netForce = 0;
    acceleration = 0;
    timeToBottom = Infinity;
    finalVelocity = 0;
  }

  return {
    weight: Number(weight.toFixed(2)),
    weightParallel: Number(weightParallel.toFixed(2)),
    weightPerpendicular: Number(weightPerpendicular.toFixed(2)),
    normalForce: Number(normalForce.toFixed(2)),
    frictionForce: Number(frictionForce.toFixed(2)),
    isSliding,
    netForce: Number(netForce.toFixed(2)),
    acceleration: Number(acceleration.toFixed(2)),
    timeToBottom: Number.isFinite(timeToBottom) ? Number(timeToBottom.toFixed(2)) : Infinity,
    finalVelocity: Number(finalVelocity.toFixed(2)),
  };
}
