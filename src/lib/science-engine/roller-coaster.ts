/**
 * Pure physics calculations for Mechanical Energy Conservation on a Roller Coaster.
 * E_total = E_k + E_p = 0.5 * m * v^2 + m * g * h = constant
 */

export interface RollerCoasterParams {
  initialHeight: number; // h0 in meters [10, 60]
  loopRadius: number; // R in meters [5, 20]
  mass: number; // m in kg [100, 2000]
  gravity?: number; // g in m/s^2, default 9.8
  initialVelocity?: number; // v0 at h0 in m/s, default 0
}

export interface RollerCoasterMetrics {
  totalEnergy: number; // E_total = m*g*h0 + 0.5*m*v0^2 (Joules)
  minLoopHeightRequired: number; // h_min = 2.5 * R for zero v0
  speedAtBottom: number; // v at h=0: sqrt(v0^2 + 2*g*h0)
  speedAtLoopTop: number; // v at h=2R: sqrt(max(0, v0^2 + 2*g*(h0 - 2R)))
  criticalSpeedAtLoopTop: number; // v_crit = sqrt(g*R)
  canCompleteLoop: boolean; // true if speedAtLoopTop >= criticalSpeedAtLoopTop
  normalForceAtLoopTop: number; // N = m*(v_top^2 / R) - m*g
  energyAtHeight: (h: number) => { ep: number; ek: number; speed: number };
}

export function calculateRollerCoaster(params: RollerCoasterParams): RollerCoasterMetrics {
  const h0 = Math.max(0, params.initialHeight);
  const R = Math.max(1, params.loopRadius);
  const m = Math.max(10, params.mass);
  const g = params.gravity ?? 9.8;
  const v0 = Math.max(0, params.initialVelocity ?? 0);

  const initialEp = m * g * h0;
  const initialEk = 0.5 * m * v0 * v0;
  const totalEnergy = initialEp + initialEk;

  // Speed at ground level (h = 0)
  const speedAtBottom = Math.sqrt(v0 * v0 + 2 * g * h0);

  // Critical speed at top of loop (h = 2*R) to avoid falling:
  // N + mg = m * v^2 / R -> at threshold N = 0 -> v_crit = sqrt(g * R)
  const criticalSpeedAtLoopTop = Math.sqrt(g * R);
  const minLoopHeightRequired = 2.5 * R - (v0 * v0) / (2 * g);

  // Actual speed at loop top (h = 2*R)
  const heightAtTop = 2 * R;
  let speedAtLoopTop = 0;
  let normalForceAtLoopTop = 0;

  if (totalEnergy >= m * g * heightAtTop) {
    const ekAtTop = totalEnergy - m * g * heightAtTop;
    speedAtLoopTop = Math.sqrt((2 * ekAtTop) / m);
    // N = m * (v^2 / R) - m * g
    normalForceAtLoopTop = m * ((speedAtLoopTop * speedAtLoopTop) / R) - m * g;
  }

  const canCompleteLoop = speedAtLoopTop >= criticalSpeedAtLoopTop;

  const energyAtHeight = (h: number) => {
    const ep = m * g * Math.max(0, h);
    const ek = Math.max(0, totalEnergy - ep);
    const speed = Math.sqrt((2 * ek) / m);
    return {
      ep: Number(ep.toFixed(1)),
      ek: Number(ek.toFixed(1)),
      speed: Number(speed.toFixed(2)),
    };
  };

  return {
    totalEnergy: Number(totalEnergy.toFixed(1)),
    minLoopHeightRequired: Number(minLoopHeightRequired.toFixed(2)),
    speedAtBottom: Number(speedAtBottom.toFixed(2)),
    speedAtLoopTop: Number(speedAtLoopTop.toFixed(2)),
    criticalSpeedAtLoopTop: Number(criticalSpeedAtLoopTop.toFixed(2)),
    canCompleteLoop,
    normalForceAtLoopTop: Number(normalForceAtLoopTop.toFixed(1)),
    energyAtHeight,
  };
}
