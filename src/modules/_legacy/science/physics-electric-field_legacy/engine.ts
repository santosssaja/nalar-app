export {
  calculateCoulombForce,
  calculateElectricFieldAtPoint,
  calculateElectricPotential,
  calculateTestChargeForce,
  calculateNeutralPoint1D,
  generateFieldGrid,
  COULOMB_CONSTANT,
} from "@/lib/science-engine/electric-field";

export type {
  PointCharge,
  ElectricFieldVector,
  CoulombForceResult,
  FieldGridSample,
} from "@/lib/science-engine/electric-field";

export interface ElectricFieldState {
  q1: number; // in µC (-10 to +10)
  q2: number; // in µC (-10 to +10)
  distance: number; // in meters (0.5 to 4)
  testCharge: number; // in µC (-5 to +5)
  testPosX: number; // meters
  testPosY: number; // meters
  showVectors: boolean;
  showPotential: boolean;
}
