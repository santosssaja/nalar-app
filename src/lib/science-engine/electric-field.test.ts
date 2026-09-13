import { describe, it, expect } from "vitest";
import {
  calculateCoulombForce,
  calculateElectricFieldAtPoint,
  calculateElectricPotential,
  calculateTestChargeForce,
  calculateNeutralPoint1D,
  generateFieldGrid,
  COULOMB_CONSTANT,
} from "./electric-field";

describe("electric-field engine", () => {
  it("calculates Coulomb force between two charges correctly", () => {
    // Two positive charges: +2 µC and +3 µC separated by 1 meter
    const res = calculateCoulombForce(2, 3, 1);
    const expected = (COULOMB_CONSTANT * (2e-6) * (3e-6)) / (1 * 1);
    expect(res.forceN).toBeCloseTo(expected, 3);
    expect(res.isRepulsive).toBe(true);
    expect(res.isAttractive).toBe(false);

    // Opposite charges: attractive
    const resOpposite = calculateCoulombForce(2, -3, 1);
    expect(resOpposite.isAttractive).toBe(true);
    expect(resOpposite.isRepulsive).toBe(false);

    // Neutral charge
    const resZero = calculateCoulombForce(0, 5, 1);
    expect(resZero.forceN).toBe(0);
    expect(resZero.isNeutral).toBe(true);
  });

  it("calculates net electric field vector at symmetric midpoint", () => {
    // Two identical charges at (-1, 0) and (+1, 0) with q = +5 µC
    const charges = [
      { id: "q1", q: 5, x: -1, y: 0 },
      { id: "q2", q: 5, x: 1, y: 0 },
    ];

    // At exact center (0, 0), E vectors cancel out -> net E = 0
    const centerField = calculateElectricFieldAtPoint(charges, { x: 0, y: 0 });
    expect(centerField.magnitude).toBeCloseTo(0, 4);

    // Dipole: q1 = +5 µC at (-1, 0), q2 = -5 µC at (+1, 0)
    const dipole = [
      { id: "q1", q: 5, x: -1, y: 0 },
      { id: "q2", q: -5, x: 1, y: 0 },
    ];
    // At center (0, 0), E vectors from both point in +x direction
    const dipoleCenter = calculateElectricFieldAtPoint(dipole, { x: 0, y: 0 });
    expect(dipoleCenter.ex).toBeGreaterThan(0);
    expect(dipoleCenter.ey).toBeCloseTo(0, 4);
    expect(dipoleCenter.magnitude).toBeCloseTo(dipoleCenter.ex, 4);
  });

  it("calculates electric potential superposition and test charge force", () => {
    const charges = [
      { id: "q1", q: 2, x: 0, y: 0 }, // +2 µC at origin
    ];

    // Potential at r = 2m: V = k * q / r
    const pot = calculateElectricPotential(charges, { x: 2, y: 0 });
    const expectedV = (COULOMB_CONSTANT * 2e-6) / 2;
    expect(pot).toBeCloseTo(expectedV, 1);

    // Test charge +1 µC experiencing field
    const field = calculateElectricFieldAtPoint(charges, { x: 2, y: 0 });
    const testForce = calculateTestChargeForce(field, 1);
    expect(testForce.forceX).toBeGreaterThan(0); // repelled to the right
    expect(testForce.forceMagnitude).toBeCloseTo((expectedV / 2) * 1e-6, 3);
  });

  it("identifies 1D neutral point and generates field grid", () => {
    // Equal positive charges separated by 2m (at -1 and +1)
    const neutralX = calculateNeutralPoint1D(4, 4, 2);
    expect(neutralX).toBeCloseTo(0, 4); // exactly at 0

    // Grid generation bounds
    const grid = generateFieldGrid(
      [{ id: "q1", q: 1, x: 0, y: 0 }],
      { minX: -2, maxX: 2, minY: -2, maxY: 2, cols: 3, rows: 3 }
    );
    expect(grid.length).toBe(9);
    expect(grid[0].x).toBe(-2);
    expect(grid[0].y).toBe(-2);
  });
});
