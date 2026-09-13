/**
 * Pure physics engine for Electric Field & Coulomb's Law.
 * SI Units:
 * - Charges in microCoulombs (µC = 10^-6 C)
 * - Distances in meters (m)
 * - Force in Newtons (N)
 * - Electric field in N/C or V/m
 * - Electric potential in Volts (V)
 */

export const COULOMB_CONSTANT = 8.9875517923e9; // N·m²/C²

export interface PointCharge {
  id: string;
  q: number; // in microCoulombs (µC)
  x: number; // in meters
  y: number; // in meters
}

export interface ElectricFieldVector {
  ex: number; // N/C
  ey: number; // N/C
  magnitude: number; // N/C
  angleRad: number; // radians [-π, π]
}

export interface CoulombForceResult {
  forceN: number;
  isAttractive: boolean;
  isRepulsive: boolean;
  isNeutral: boolean;
}

export interface FieldGridSample {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  magnitude: number;
  potentialV: number;
}

/**
 * Calculates Coulomb electrostatic force between two point charges.
 * F = k * |q1 * q2| / r^2
 */
export function calculateCoulombForce(
  q1MicroC: number,
  q2MicroC: number,
  distanceMeters: number
): CoulombForceResult {
  const r = Math.max(0.01, Math.abs(distanceMeters));
  const q1 = q1MicroC * 1e-6;
  const q2 = q2MicroC * 1e-6;

  const forceN = (COULOMB_CONSTANT * Math.abs(q1 * q2)) / (r * r);
  const prod = q1MicroC * q2MicroC;

  return {
    forceN,
    isAttractive: prod < 0,
    isRepulsive: prod > 0,
    isNeutral: prod === 0,
  };
}

/**
 * Calculates net electric field vector at a specific point from an array of point charges.
 * E = sum( (k * qi / ri^3) * (r_vec) )
 */
export function calculateElectricFieldAtPoint(
  charges: PointCharge[],
  point: { x: number; y: number }
): ElectricFieldVector {
  let netEx = 0;
  let netEy = 0;

  for (const c of charges) {
    if (c.q === 0) continue;
    const dx = point.x - c.x;
    const dy = point.y - c.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    // Defensive cutoff near charge singularity
    if (dist < 0.05) continue;

    const qCoulombs = c.q * 1e-6;
    const fieldMag = (COULOMB_CONSTANT * qCoulombs) / distSq;

    // Unit direction from charge to point
    netEx += fieldMag * (dx / dist);
    netEy += fieldMag * (dy / dist);
  }

  const magnitude = Math.sqrt(netEx * netEx + netEy * netEy);
  const angleRad = Math.atan2(netEy, netEx);

  return {
    ex: netEx,
    ey: netEy,
    magnitude,
    angleRad,
  };
}

/**
 * Calculates electric potential (scalar V) at a given point.
 * V = sum( k * qi / ri )
 */
export function calculateElectricPotential(
  charges: PointCharge[],
  point: { x: number; y: number }
): number {
  let netV = 0;
  for (const c of charges) {
    if (c.q === 0) continue;
    const dx = point.x - c.x;
    const dy = point.y - c.y;
    const dist = Math.max(0.05, Math.sqrt(dx * dx + dy * dy));
    const qCoulombs = c.q * 1e-6;
    netV += (COULOMB_CONSTANT * qCoulombs) / dist;
  }
  return netV;
}

/**
 * Calculates electrostatic force experienced by a test charge in an electric field.
 * F = q_test * E
 */
export function calculateTestChargeForce(
  field: ElectricFieldVector,
  testChargeMicroC: number
): { forceX: number; forceY: number; forceMagnitude: number } {
  const qt = testChargeMicroC * 1e-6;
  const fx = qt * field.ex;
  const fy = qt * field.ey;
  const forceMagnitude = Math.abs(qt) * field.magnitude;

  return {
    forceX: fx,
    forceY: fy,
    forceMagnitude,
  };
}

/**
 * Computes 1D neutral point location along x-axis for 2 charges placed at -d/2 and +d/2.
 * Returns null if no finite neutral point or identical opposite charges.
 */
export function calculateNeutralPoint1D(
  q1: number,
  q2: number,
  separation: number
): number | null {
  if (q1 === 0 || q2 === 0) return null;
  // If both same sign
  if (q1 * q2 > 0) {
    const ratio = Math.sqrt(Math.abs(q2 / q1));
    // x1 = -separation / 2, x2 = separation / 2
    // Dist from q1: d / (1 + sqrt(q2/q1))
    const distFromQ1 = separation / (1 + ratio);
    return -separation / 2 + distFromQ1;
  }
  // Opposite signs
  if (Math.abs(q1) === Math.abs(q2)) return null; // No finite neutral point
  const ratio = Math.sqrt(Math.abs(q2 / q1));
  if (Math.abs(q1) > Math.abs(q2)) {
    // Neutral point is beyond q2
    return separation / 2 + separation / (ratio - 1 > 0 ? ratio - 1 : 1 - ratio);
  } else {
    // Neutral point is beyond q1
    return -separation / 2 - separation / (1 / ratio - 1 > 0 ? 1 / ratio - 1 : 1 - 1 / ratio);
  }
}

/**
 * Generates regular grid vector samples for visualization.
 */
export function generateFieldGrid(
  charges: PointCharge[],
  bounds: { minX: number; maxX: number; minY: number; maxY: number; cols: number; rows: number }
): FieldGridSample[] {
  const { minX, maxX, minY, maxY, cols, rows } = bounds;
  const stepX = (maxX - minX) / (cols - 1 || 1);
  const stepY = (maxY - minY) / (rows - 1 || 1);
  const samples: FieldGridSample[] = [];

  for (let r = 0; r < rows; r++) {
    const y = minY + r * stepY;
    for (let c = 0; c < cols; c++) {
      const x = minX + c * stepX;
      const field = calculateElectricFieldAtPoint(charges, { x, y });
      const potentialV = calculateElectricPotential(charges, { x, y });

      const dirX = field.magnitude > 0 ? field.ex / field.magnitude : 0;
      const dirY = field.magnitude > 0 ? field.ey / field.magnitude : 0;

      samples.push({
        x,
        y,
        dirX,
        dirY,
        magnitude: field.magnitude,
        potentialV,
      });
    }
  }

  return samples;
}
